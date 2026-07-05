import {
  CacheFirst,
  ExpirationPlugin,
  Serwist,
  StaleWhileRevalidate,
} from "serwist";

const oneDay = 24 * 60 * 60;
const oneWeek = 7 * oneDay;
const oneMonth = 30 * oneDay;
const oneYear = 365 * oneDay;

const isSameOriginAppRequest = ({ sameOrigin, url }) =>
  sameOrigin &&
  !url.pathname.startsWith("/api/") &&
  !url.pathname.startsWith("/serwist/");

const isNavigationRequest = ({ request, sameOrigin, url }) =>
  isSameOriginAppRequest({ sameOrigin, url }) && request.mode === "navigate";

let serwist;

const runtimeCaching = [
  {
    matcher: isNavigationRequest,
    handler: async ({ request }) => {
      try {
        return await fetch(request);
      } catch {
        return (
          (await serwist.matchPrecache("/")) ??
          (await serwist.matchPrecache("/~offline"))
        );
      }
    },
  },
  {
    matcher: ({ sameOrigin, url }) =>
      sameOrigin && /\/_next\/static\/.+\.js$/i.test(url.pathname),
    handler: new CacheFirst({
      cacheName: "next-static-js-assets",
      plugins: [
        new ExpirationPlugin({
          maxEntries: 64,
          maxAgeSeconds: oneYear,
          maxAgeFrom: "last-used",
        }),
      ],
    }),
  },
  {
    matcher: ({ sameOrigin, url }) =>
      sameOrigin && /\/_next\/static\/.+\.css$/i.test(url.pathname),
    handler: new CacheFirst({
      cacheName: "next-static-css-assets",
      plugins: [
        new ExpirationPlugin({
          maxEntries: 32,
          maxAgeSeconds: oneYear,
          maxAgeFrom: "last-used",
        }),
      ],
    }),
  },
  {
    matcher: ({ sameOrigin, url }) =>
      sameOrigin && /\.(?:eot|otf|ttc|ttf|woff|woff2|font\.css)$/i.test(url.pathname),
    handler: new StaleWhileRevalidate({
      cacheName: "static-font-assets",
      plugins: [
        new ExpirationPlugin({
          maxEntries: 8,
          maxAgeSeconds: oneMonth,
          maxAgeFrom: "last-used",
        }),
      ],
    }),
  },
  {
    matcher: ({ sameOrigin, url }) =>
      sameOrigin && /\.(?:avif|gif|ico|jpg|jpeg|png|svg|webp)$/i.test(url.pathname),
    handler: new StaleWhileRevalidate({
      cacheName: "static-image-assets",
      plugins: [
        new ExpirationPlugin({
          maxEntries: 96,
          maxAgeSeconds: oneMonth,
          maxAgeFrom: "last-used",
        }),
      ],
    }),
  },
  {
    matcher: ({ sameOrigin, url }) =>
      sameOrigin && /\.(?:json|webmanifest|xml|csv)$/i.test(url.pathname),
    handler: new StaleWhileRevalidate({
      cacheName: "static-data-assets",
      plugins: [
        new ExpirationPlugin({
          maxEntries: 32,
          maxAgeSeconds: oneWeek,
          maxAgeFrom: "last-used",
        }),
      ],
    }),
  },
];

serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching,
  fallbacks: {
    entries: [
      {
        url: "/",
        matcher({ request }) {
          return request.mode === "navigate";
        },
      },
      {
        url: "/~offline",
        matcher({ request }) {
          return request.mode === "navigate";
        },
      },
    ],
  },
});

serwist.addEventListeners();

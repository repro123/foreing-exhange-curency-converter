export const metadata = {
  title: "Offline | FXConvert",
};

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold">You&apos;re offline</h1>

        <p className="mt-4 text-muted-foreground">
          FXConvert can&apos;t fetch live exchange rates right now because your
          device isn&apos;t connected to the internet. If you&apos;ve already
          used FXConvert on this device, your previously cached exchange rates
          may still be available after you reconnect.
        </p>

        <p className="mt-2 text-muted-foreground">
          Once you&apos;re back online, refresh the page to continue.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="mt-8 rounded-lg bg-primary px-4 py-2 text-primary-foreground"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}

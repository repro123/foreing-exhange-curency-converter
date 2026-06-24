import PanelSkeleton from "@/features/tabs/PanelSkeleton";
import { useFavoritesStore } from "@/store/useFavoritesStore";

function FavoritesPanel() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const favHydrated = useFavoritesStore((state) => state.hydrated);
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const removeAllFavorites = useFavoritesStore(
    (state) => state.removeAllFavorites,
  );

  if (!favHydrated) return <PanelSkeleton />;

  return <div>favorites</div>;
}

export default FavoritesPanel;

function LogPanel() {
  if (!logs.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-8 text-center bg-card-base rounded-2xl">
        <div className="flex size-14 items-center justify-center rounded-full bg-foreground/5">
          <ClipboardList className="size-6 text-foreground/40" />
        </div>
        <div className="flex flex-col gap-2">
          <p className="preset-3-medium text-foreground">
            No conversions logged
          </p>
          <p className="preset-5 text-nav">
            Your logged conversions will appear here, and are private to this
            browser.
          </p>
        </div>
      </div>
    );
  }
}

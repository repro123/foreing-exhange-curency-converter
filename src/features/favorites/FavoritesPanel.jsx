import EmptyPanelState from "@/features/tabs/EmptyPanelState";
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

  if (!favorites.length) {
    return (
      <EmptyPanelState
        heading="No pinned pairs yet"
        paragraph="Pin a pair to track its rate here. Tap the star icon on any conversion or comparison row."
      />
    );
  }

  return <div>favorites</div>;
}

export default FavoritesPanel;

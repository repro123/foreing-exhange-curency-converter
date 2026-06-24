import { Button } from "@/components/ui/button";

import EmptyPanelState from "@/features/tabs/EmptyPanelState";
import PanelSkeleton from "@/features/tabs/PanelSkeleton";
import FavoriteRowsSkeleton from "@/features/favorites/FavoriteRowsSkeleton";

import { useFavoritesStore } from "@/store/useFavoritesStore";

import FavoriteRow from "@/features/favorites/FavoriteRow";
import { getLiveMarketRates } from "@/lib/live-market";
import { today, yesterday } from "@/lib/utils";
import { useEffect, useState } from "react";

function FavoritesPanel() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const favHydrated = useFavoritesStore((state) => state.hydrated);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const removeAllFavorites = useFavoritesStore(
    (state) => state.removeAllFavorites,
  );
  const [favoriteRates, setFavoriteRates] = useState({});

  useEffect(() => {
    if (!favHydrated || !favorites.length) return;

    let isActive = true;

    async function loadFavoriteRates() {
      const entries = await Promise.all(
        favorites.map(async (favorite) => {
          try {
            const [todayRate, yesterdayRate] = await Promise.all([
              getLiveMarketRates(favorite.from, favorite.to, today),
              getLiveMarketRates(favorite.from, favorite.to, yesterday),
            ]);

            const change = yesterdayRate?.rate
              ? ((todayRate.rate - yesterdayRate.rate) / yesterdayRate.rate) *
                100
              : 0;

            return [
              favorite.id,
              {
                change: Number(change.toFixed(2)),
                rate: todayRate.rate,
                status: "success",
              },
            ];
          } catch (error) {
            console.error(error);

            return [
              favorite.id,
              {
                change: null,
                rate: null,
                status: "error",
              },
            ];
          }
        }),
      );

      if (!isActive) return;

      setFavoriteRates((currentRates) => ({
        ...currentRates,
        ...Object.fromEntries(entries),
      }));
    }

    loadFavoriteRates();

    return () => {
      isActive = false;
    };
  }, [favHydrated, favorites]);

  if (!favHydrated) return <PanelSkeleton />;

  if (!favorites.length) {
    return (
      <EmptyPanelState
        heading="No pinned pairs yet"
        paragraph="Pin a pair to track its rate here. Tap the star icon on any conversion or comparison row."
      />
    );
  }

  const ratesLoading = favorites.some(
    (favorite) => !favoriteRates[favorite.id],
  );

  return (
    <div className="bg-card-base rounded-2xl p-4">
      <div className="flex flex-col gap-4 w-full md:flex-row md:items-center md:justify-between">
        <p className="uppercase preset-3-medium">pinned pairs</p>

        <div className="flex items-center max-md:justify-between gap-2">
          <p className="preset-5 text-nav uppercase">
            {favorites.length} favorites
          </p>
          <Button variant="destructive" onClick={removeAllFavorites}>
            Clear all
          </Button>
        </div>
      </div>

      {ratesLoading ? (
        <FavoriteRowsSkeleton count={favorites.length} />
      ) : (
        <ul className="grid gap-4 mt-8">
          {favorites.map((favorite) => (
            <FavoriteRow
              favorite={favorite}
              key={favorite.id}
              marketData={favoriteRates[favorite.id]}
              onRemove={removeFavorite}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default FavoritesPanel;

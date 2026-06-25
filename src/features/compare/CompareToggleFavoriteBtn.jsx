"use client";

import Star from "@/components/SVGs/Star";
import StarFilled from "@/components/SVGs/StarFilled";
import { useFavoritesStore } from "@/store/useFavoritesStore";

import { Toggle } from "@/components/ui/toggle";
import { Skeleton } from "@/components/ui/skeleton";

function CompareToggleFavoriteBtn({ rateItem }) {
  const favorites = useFavoritesStore((state) => state.favorites);
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const hydrated = useFavoritesStore((state) => state.hydrated);

  if (!hydrated)
    return (
      <div className="size-12">
        <Skeleton className="w-full h-full" />
      </div>
    );

  const from = rateItem.base;
  const to = rateItem.quote;

  const id = `${from}-${to}`;
  const isFavorited = hydrated && favorites.some((f) => f.id === id);

  function handlePressedChange(pressed) {
    pressed
      ? addFavorite({ from, to, id, date: new Date().toISOString() })
      : removeFavorite(id);
  }

  return (
    <Toggle
      aria-label="Toggle favorite"
      size="lg"
      variant="outline"
      pressed={isFavorited}
      onPressedChange={handlePressedChange}
      className="uppercase preset-5-medium"
    >
      {isFavorited ? (
        <StarFilled className="text-primary" />
      ) : (
        <Star className="text-foreground" />
      )}
      <span className="sr-only">{isFavorited ? "Favorited" : "Favorite"}</span>
    </Toggle>
  );
}

export default CompareToggleFavoriteBtn;

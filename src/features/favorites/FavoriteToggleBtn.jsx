"use client";

import { Star } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useCurrencyParams } from "@/hooks/useCurrencyParams";

import { useFavoritesStore } from "@/store/useFavoritesStore";

function FavoriteToggleBtn() {
  const { from, to } = useCurrencyParams();

  const favorites = useFavoritesStore((state) => state.favorites);
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const hydrated = useFavoritesStore((state) => state.hydrated);

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
      <Star className={isFavorited ? "fill-black" : ""} />
      {isFavorited ? "Favorited" : "Favorite"}
    </Toggle>
  );
}

export default FavoriteToggleBtn;

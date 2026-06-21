"use client";

import { Star } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useCurrencyParams } from "@/hooks/useCurrencyParams";
import { useLocalStorage } from "@/hooks/useLocalStorage";

function FavoriteToggleBtn() {
  const { from, to } = useCurrencyParams();
  const [favorites, setFavorites, hydrated] = useLocalStorage(
    "favorite-currencies",
    [],
  );

  const id = `${from}-${to}`;
  const isFavorited = hydrated && favorites.some((f) => f.id === id);

  function handlePressedChange(pressed) {
    setFavorites((prev) =>
      pressed ? [...prev, { from, to, id }] : prev.filter((f) => f.id !== id),
    );
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

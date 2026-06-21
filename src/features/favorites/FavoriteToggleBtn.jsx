// "use client";

// import { Star } from "lucide-react";
// import { Toggle } from "@/components/ui/toggle";
// import { useCurrencyParams } from "@/hooks/useCurrencyParams";

// function FavoriteToggleBtn() {
//   const { from, to, amount } = useCurrencyParams();

//   function addFavorite(from, to, amount) {
//     const favorites = JSON.parse(
//       localStorage.getItem("favorite-currencies") || "[]",
//     );

//     const exists = favorites.some((f) => f.id === `${from}-${to}-${amount}`);

//     if (exists) return;

//     favorites.push({ from, to, amount, id: `${from}-${to}-${amount}` });

//     localStorage.setItem("favorite-currencies", JSON.stringify(favorites));
//   }

//   function removeFavorite(from, to, amount) {
//     const favorites = JSON.parse(
//       localStorage.getItem("favorite-currencies") || "[]",
//     );

//     const filtered = favorites.filter(
//       (f) => !(f.id === `${from}-${to}-${amount}`),
//     );

//     localStorage.setItem("favorite-currencies", JSON.stringify(filtered));
//   }

//   function toggleFavorite(from, to, amount) {
//     const favorites = JSON.parse(
//       localStorage.getItem("favorite-currencies") || "[]",
//     );

//     const exists = favorites.some((f) => f.id === `${from}-${to}-${amount}`);

//     if (exists) {
//       removeFavorite(from, to, amount);
//     } else {
//       addFavorite(from, to, amount);
//     }
//   }

//   return (
//     <Toggle
//       aria-label="Toggle fvorite"
//       size="lg"
//       variant="outline"
//       className="uppercase preset-5-medium"
//       onPressedChange={() => toggleFavorite(from, to, amount)}
//     >
//       <Star className="group-aria-pressed/toggle:fill-black" />
//       Favorite
//     </Toggle>
//   );
// }

// export default FavoriteToggleBtn;

"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useCurrencyParams } from "@/hooks/useCurrencyParams";

function getFavorites() {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("favorite-currencies") || "[]");
}

function FavoriteToggleBtn() {
  const { from, to } = useCurrencyParams();
  const [favorites, setFavorites] = useState([]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    setFavorites(getFavorites());
  }, []);

  const id = `${from}-${to}`;
  const isFavorited = mounted && favorites.some((f) => f.id === id);

  function handlePressedChange(pressed) {
    let updated;

    if (pressed) {
      updated = [...favorites, { from, to, id }];
    } else {
      updated = favorites.filter((f) => f.id !== id);
    }

    setFavorites(updated);
    localStorage.setItem("favorite-currencies", JSON.stringify(updated));
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

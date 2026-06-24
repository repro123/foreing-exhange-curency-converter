import { useState } from "react";
import ArrowRight from "@/components/SVGs/ArrowRight";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function FavoriteRow({ favorite, marketData, onRemove }) {
  const searchParams = useSearchParams();
  const [isLinkHovered, setIsLinkHovered] = useState(false);
  const [isLinkFocused, setIsLinkFocused] = useState(false);
  const isLinkActive = isLinkHovered || isLinkFocused;
  const change = marketData?.change ?? 0;
  const isPositive = change > 0;
  const isNegative = change < 0;
  const hasError = marketData?.status === "error";
  const changeClassName = isPositive
    ? "text-success"
    : isNegative
      ? "text-destructive"
      : "text-nav";
  const changePrefix = isPositive ? "▲" : isNegative ? "▼" : "";
  const nextParams = new URLSearchParams(searchParams.toString());

  nextParams.set("from", favorite.from);
  nextParams.set("to", favorite.to);

  return (
    <li className="bg-card border rounded-xl">
      <div
        className={`flex items-center gap-2 justify-between pr-2 rounded-xl overflow-hidden transition  ${isLinkActive ? " bg-muted/50 outline-2 outline-offset-2 outline-primary" : ""}`}
      >
        <Link
          href={`?${nextParams.toString()}`}
          aria-label={`Load ${favorite.from} to ${favorite.to} in the converter`}
          onMouseEnter={() => setIsLinkHovered(true)}
          onMouseLeave={() => setIsLinkHovered(false)}
          onFocus={() => setIsLinkFocused(true)}
          onBlur={() => setIsLinkFocused(false)}
          className="flex min-w-0 flex-1 items-center justify-between gap-4  p-2 py-4 border-0 outline-0"
        >
          <p className="flex items-center gap-2 preset-4">
            <span>{favorite.from}</span> <ArrowRight className="text-nav" />{" "}
            <span>{favorite.to}</span>
          </p>

          {hasError ? (
            <p className="preset-5 text-destructive">Rate unavailable</p>
          ) : (
            <div className="text-right space-y-2">
              <p className="preset-3">{marketData?.rate ?? 0}</p>
              <p className={`preset-5 ${changeClassName}`}>
                <span aria-hidden="true">{changePrefix}</span>
                {Math.abs(change)}%
              </p>
            </div>
          )}
        </Link>

        <Button
          variant="outline"
          size="icon"
          aria-label={`Remove ${favorite.from} to ${favorite.to} from favorites`}
          onClick={() => onRemove(favorite.id)}
          className="text-primary bg-background"
        >
          <Star className="fill-current" />
        </Button>
      </div>
    </li>
  );
}

export default FavoriteRow;

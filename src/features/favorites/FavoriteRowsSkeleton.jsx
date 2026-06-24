import { Skeleton } from "@/components/ui/skeleton";

function FavoriteRowsSkeleton({ count }) {
  return (
    <ul className="grid gap-4 mt-8">
      {Array.from({ length: count }).map((_, index) => (
        <li
          key={index}
          className="bg-card border rounded-xl p-2 py-4 flex items-center gap-4 justify-between"
        >
          <Skeleton className="h-4 w-24" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-14" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default FavoriteRowsSkeleton;

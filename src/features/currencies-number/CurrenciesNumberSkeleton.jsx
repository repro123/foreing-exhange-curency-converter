import { Skeleton } from "@/components/ui/skeleton";

function CurrenciesNumberSkeleton() {
  return (
    <div className="w-20 max-w-xs">
      <Skeleton className="h-2 w-full" />
    </div>
  );
}

export default CurrenciesNumberSkeleton;

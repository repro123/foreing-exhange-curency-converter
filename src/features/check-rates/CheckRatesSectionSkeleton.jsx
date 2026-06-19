import { Skeleton } from "@/components/ui/skeleton";

function CheckRatesSectionSkeleton() {
  return (
    <section>
      <div className="max-w-[20ch]">
        <Skeleton className="h-4 w-full" />
      </div>
      <div className="bg-card-base mt-4 rounded-[20px] h-112.5 md:h-56.25">
        <Skeleton className="w-full h-full" />
      </div>
    </section>
  );
}

export default CheckRatesSectionSkeleton;

import { Skeleton } from "@/components/ui/skeleton";

function TickerWrapperSkeleton() {
  return (
    <div className="overflow-hidden w-full h-full grid place-items-center ticker-wrapper">
      <div className="ticker-track flex items-stretch h-full w-max gap-4  preset-6 md:preset-5">
        {Array.from({ length: 20 }, (_, index) => (
          <div
            key={index}
            className="flex items-center gap-2 whitespace-nowrap self-stretch border-r border-foreground/20 pr-4"
          >
            <Skeleton className="h-2 w-30" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TickerWrapperSkeleton;

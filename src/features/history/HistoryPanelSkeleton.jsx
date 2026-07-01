import { Skeleton } from "@/components/ui/skeleton";

function HistoryPanelSkeleton() {
  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8 xl:gap-12">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="bg-card-base flex flex-col gap-8 rounded-2xl p-4 px-6"
            >
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-7 w-24" />
            </div>
          ))}
        </div>

        <div className="bg-muted flex w-fit items-center gap-2 rounded-lg px-2.5 py-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-9 w-10 rounded-lg" />
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-xl bg-card py-4 ring-1 ring-foreground/10">
        <div className="flex flex-col gap-2 px-4 md:flex-row md:items-center md:justify-between">
          <Skeleton className="h-6 w-24" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>

        <div className="px-4 pt-8">
          <div className="relative h-120 w-full overflow-hidden rounded-lg">
            <div className="absolute inset-x-0 top-4 bottom-12 flex flex-col justify-between">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-px w-full rounded-none" />
              ))}
            </div>

            <div className="absolute left-0 top-8 bottom-16 flex w-14 flex-col justify-between">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-3 w-12" />
              ))}
            </div>

            <Skeleton className="absolute left-18 right-4 top-16 h-52 rounded-2xl opacity-70" />

            <div className="absolute right-4 bottom-2 left-18 flex justify-between">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-3 w-14" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryPanelSkeleton;

import { Skeleton } from "@/components/ui/skeleton";

function ComparePanelSkeleton() {
  return (
    <div className="bg-card-base rounded-2xl p-4">
      <div className="flex flex-col gap-4 w-full md:flex-row md:items-center md:justify-between">
        <div className="uppercase flex items-center gap-2">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-4 w-32" />
        </div>

        <Skeleton className="h-3 w-16" />
      </div>

      <ul className="grid gap-4 mt-8">
        {Array.from({ length: 5 }).map((_, index) => (
          <li
            key={index}
            className="bg-card border rounded-xl flex items-center gap-4 justify-between p-4"
          >
            <div className="flex items-center gap-2">
              <Skeleton className="size-5 rounded-full" />

              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-3 w-28" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-1 items-end">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 w-14" />
              </div>

              <Skeleton className="size-8 rounded-lg" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ComparePanelSkeleton;

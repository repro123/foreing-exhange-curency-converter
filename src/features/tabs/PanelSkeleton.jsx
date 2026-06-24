import { Skeleton } from "@/components/ui/skeleton";

function PanelSkeleton() {
  return (
    <div className="w-full h-40 bg-card-base rounded-2xl">
      <Skeleton className="w-full h-full" />
    </div>
  );
}

export default PanelSkeleton;

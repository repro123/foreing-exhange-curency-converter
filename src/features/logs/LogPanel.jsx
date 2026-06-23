import { Skeleton } from "@/components/ui/skeleton";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useLogsStore } from "@/store/useLogsStore";
import { ClipboardList } from "lucide-react";

function LogPanel() {
  const logs = useLogsStore((state) => state.logs);
  const logsHydrated = useLogsStore((state) => state.hydrated);
  const removeLog = useLogsStore((state) => state.removeLog);

  if (!logsHydrated)
    return (
      <div className="w-full h-40 bg-card-base rounded-2xl">
        <Skeleton className="w-full h-full" />
      </div>
    );

  if (!logs.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-8 text-center bg-card-base rounded-2xl">
        <div className="flex size-14 items-center justify-center rounded-full bg-foreground/5">
          <ClipboardList className="size-6 text-foreground/40" />
        </div>
        <div className="flex flex-col gap-2">
          <p className="preset-3-medium text-foreground">
            No conversions logged
          </p>
          <p className="preset-5 text-nav">
            Your logged conversions will appear here, and are private to this
            browser.
          </p>
        </div>
      </div>
    );
  }

  return <div className="bg-card-base rounded-2xl p-4"></div>;
}

export default LogPanel;

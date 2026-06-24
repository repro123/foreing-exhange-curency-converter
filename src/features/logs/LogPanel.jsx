import { Button } from "@/components/ui/button";
import LogPanelList from "@/features/logs/LogPanelList";
import PanelSkeleton from "@/features/tabs/PanelSkeleton";
import { LogPanelTable } from "@/features/logs/LogPanelTable";

import { useLogsStore } from "@/store/useLogsStore";
import { Download } from "lucide-react";
import { ClipboardList } from "lucide-react";

function LogPanel() {
  const logs = useLogsStore((state) => state.logs);
  const logsHydrated = useLogsStore((state) => state.hydrated);
  const removeLog = useLogsStore((state) => state.removeLog);
  const removeAll = useLogsStore((state) => state.removeAllLog);
  const exportLog = useLogsStore((state) => state.exportAsCSV);

  if (!logsHydrated) return <PanelSkeleton />;

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

  return (
    <div className="bg-card-base rounded-2xl p-4">
      <div className="flex flex-col gap-4 w-full md:flex-row md:items-center md:justify-between">
        <p className="uppercase preset-3-medium">conversion log</p>
        <div className="flex items-center max-md:justify-between gap-2">
          <p className="preset-5 text-nav">{logs.length} logged</p>{" "}
          <div className="flex items-center gap-2">
            {" "}
            <Button variant="destructive" onClick={removeAll}>
              Clear all
            </Button>{" "}
            <Button variant="outline" onClick={exportLog}>
              <Download className="size-4" />
              Export CSV
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-8 md:hidden">
        <LogPanelList logs={logs} removeLog={removeLog} />
      </div>

      <div className="mt-4 hidden md:block">
        <LogPanelTable logs={logs} removeLog={removeLog} />
      </div>
    </div>
  );
}

export default LogPanel;

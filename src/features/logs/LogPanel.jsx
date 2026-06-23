import ArrowRight from "@/components/SVGs/ArrowRight";
import DeleteIcon from "@/components/SVGs/DeleteIcon";
import { Button } from "@/components/ui/button";
import LogPanelSkeleton from "@/features/logs/LogPanelSkeleton";
import { formatNumber, formatRelativeDate } from "@/lib/utils";
import { useLogsStore } from "@/store/useLogsStore";
import { Download } from "lucide-react";
import { ClipboardList } from "lucide-react";

function LogPanel() {
  const logs = useLogsStore((state) => state.logs);
  const logsHydrated = useLogsStore((state) => state.hydrated);
  const removeLog = useLogsStore((state) => state.removeLog);
  const removeAll = useLogsStore((state) => state.removeAllLog);
  const exportLog = useLogsStore((state) => state.exportAsCSV);

  if (!logsHydrated) return <LogPanelSkeleton />;

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

      <ul className="mt-8 grid gap-4 ">
        {logs.map((log, i) => (
          <li
            key={log.id}
            className="bg-card border rounded-xl p-2 py-4 flex items-center gap-4 justify-between"
          >
            <div className="preset-4 flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
              <p className="text-nav md:w-[8ch] md:shrink-0">
                {formatRelativeDate(log.date)}
              </p>
              <p className="flex items-center gap-2">
                <span>{log.from}</span> <ArrowRight className="text-nav" />{" "}
                <span>{log.to}</span>
              </p>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <div className="preset-3 flex flex-col gap-2 md:flex-row md:gap-4 text-right">
                <p className="text-card-heading">{log.amount}</p>
                <p className="text-primary">
                  {formatNumber(log.convertedAmount)}
                </p>
              </div>

              <Button variant="destructive" onClick={() => removeLog(log.id)}>
                <DeleteIcon />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LogPanel;

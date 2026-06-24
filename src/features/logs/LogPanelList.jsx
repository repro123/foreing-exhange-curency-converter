import ArrowRight from "@/components/SVGs/ArrowRight";
import DeleteIcon from "@/components/SVGs/DeleteIcon";

import { Button } from "@/components/ui/button";

import { formatNumber, formatRelativeDate } from "@/lib/utils";

function LogPanelList({ logs, removeLog }) {
  return (
    <ul className="grid gap-4">
      {logs.map((log) => (
        <li
          key={log.id}
          className="bg-card border rounded-xl p-2 py-4 flex items-center gap-4 justify-between"
        >
          <div className="preset-4 flex flex-col gap-2">
            <p className="text-nav">{formatRelativeDate(log.date)}</p>
            <p className="flex items-center gap-2">
              <span>{log.from}</span> <ArrowRight className="text-nav" />{" "}
              <span>{log.to}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="preset-3 flex flex-col gap-2 text-right">
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
  );
}

export default LogPanelList;

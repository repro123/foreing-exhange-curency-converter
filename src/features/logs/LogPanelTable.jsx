import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatRelativeDate, formatNumber } from "@/lib/utils";
import ArrowRight from "@/components/SVGs/ArrowRight";
import { Button } from "@/components/ui/button";
import DeleteIcon from "@/components/SVGs/DeleteIcon";

export function LogPanelTable({ logs, removeLog }) {
  const firstCell = "rounded-l-xl border-y border-l bg-card";
  const middleCell = "border-y bg-card";
  const lastCell = "rounded-r-xl border-y border-r bg-card";

  return (
    <Table className="border-separate border-spacing-y-4">
      <TableHeader className="sr-only">
        <TableRow>
          <TableHead className="w-fit">Date Logged</TableHead>
          <TableHead className="w-full">Currencies logged</TableHead>
          <TableHead className="w-fit text-right">Amount sent</TableHead>
          <TableHead className="w-fit text-right">Amount converted</TableHead>
          <TableHead className="w-fit text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.map((log) => (
          <TableRow key={log.id} className="border-0 hover:bg-transparent">
            <TableCell className={firstCell}>
              <p className="text-nav preset-4">
                {formatRelativeDate(log.date)}
              </p>
            </TableCell>
            <TableCell className={`w-full ${middleCell}`}>
              <p className="flex items-center gap-2">
                <span>{log.from}</span> <ArrowRight className="text-nav" />
                <span>{log.to}</span>
              </p>
            </TableCell>
            <TableCell className={`text-right ${middleCell}`}>
              <p className="preset-3 text-card-heading">{log.amount}</p>
            </TableCell>
            <TableCell className={`text-right ${middleCell}`}>
              <p className="preset-3 text-primary">
                {formatNumber(log.convertedAmount)}
              </p>
            </TableCell>
            <TableCell className={`w-fit ${lastCell}`}>
              <Button variant="destructive" onClick={() => removeLog(log.id)}>
                <DeleteIcon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

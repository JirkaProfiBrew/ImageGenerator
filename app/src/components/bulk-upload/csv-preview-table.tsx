import type { CSVRow } from "@/lib/types";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

interface CSVPreviewTableProps {
  data: CSVRow[];
  totalRows: number;
}

export function CSVPreviewTable({ data, totalRows }: CSVPreviewTableProps) {
  if (data.length === 0) {
    return null;
  }

  const columns = Object.keys(data[0]);
  const remainingRows = totalRows - data.length;

  return (
    <div className="space-y-2">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column}>{column}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell key={column}>{row[column]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {remainingRows > 0 && (
        <p className="text-center text-sm text-muted-foreground">
          ...and {remainingRows} more {remainingRows === 1 ? "row" : "rows"}
        </p>
      )}
    </div>
  );
}

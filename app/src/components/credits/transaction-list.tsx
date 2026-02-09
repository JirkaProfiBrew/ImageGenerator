import Link from "next/link";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import type { CreditTransaction } from "@/lib/types";

interface TransactionListProps {
  transactions: CreditTransaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <Card className="p-0">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Credits</TableHead>
            <TableHead className="text-right">Balance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell className="text-muted-foreground">
                {tx.createdAt.toLocaleDateString()}
              </TableCell>
              <TableCell>{tx.description}</TableCell>
              <TableCell
                className={
                  tx.amount > 0
                    ? "text-right font-semibold text-success"
                    : "text-right font-medium text-foreground"
                }
              >
                {tx.amount > 0
                  ? `+${tx.amount.toLocaleString()}`
                  : tx.amount.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                {tx.balanceAfter.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="border-t py-4 text-center">
        <Link
          href="/credits/transactions"
          className="text-sm font-medium text-primary hover:underline"
        >
          View all transactions &rarr;
        </Link>
      </div>
    </Card>
  );
}

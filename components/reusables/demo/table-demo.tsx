"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const rows = [
  { name: "Starter", users: "1 seat", price: "$12" },
  { name: "Team", users: "5 seats", price: "$32" },
  { name: "Scale", users: "Unlimited", price: "$79" },
]

export function TableDemo() {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Plan</TableHead>
            <TableHead>Seats</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell className="font-medium text-foreground">
                {row.name}
              </TableCell>
              <TableCell className="tabular-nums">{row.users}</TableCell>
              <TableCell className="text-right tabular-nums">
                {row.price}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

export type Payment = {
    id : string
    brandName: string
    productName: string
    shelfLevel: string
    upc: string
}
export const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "upc",
      header: "UPC",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("upc")}</div>
      ),
    },
    {
      accessorKey: "productName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Product Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("productName")}</div>,
    },
    {
      accessorKey: "brandName",
      header: ({ column }) => { return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Brand Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )},
        cell: ({ row }) => <div className="lowercase">{row.getValue("brandName")}</div>,
    },
    {
      accessorKey: "numFacings",
      header: ({ column }) => { return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            No of Facings
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )},
        cell: ({ row }) => <div className="lowercase">{row.getValue("numFacings")}</div>,
    },
    {
      accessorKey: "shelfLevel",
      header: ({ column }) => { return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Shelf Level
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )},
        cell: ({ row }) => <div className="lowercase">{row.getValue("shelfLevel")}</div>,
    },
  ]
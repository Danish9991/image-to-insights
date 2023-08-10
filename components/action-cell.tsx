import React, { useContext } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";
import { OnActionClickContext } from "@/app/context";

interface ActionsCellProps {
  row: any; // Replace with the correct type for your row data
}

const ActionsCell: React.FC<ActionsCellProps> = ({ row }) => {
  const onActionClick = useContext(OnActionClickContext);
  const payment = row.original;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            onActionClick(payment.productName);
          }}
        >
          See Products in shelf
        </DropdownMenuItem>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsCell;

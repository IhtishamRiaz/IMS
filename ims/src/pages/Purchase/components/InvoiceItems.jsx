import React from 'react'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Button as Button1 } from '../../../components/ui/button'
import { TableCell, TableRow } from "../../../components/ui/table"

const InvoiceItems = ({ invoiceData, products }) => {
   return (
      <>
         {invoiceData?.map(item => (
            <TableRow key={item.productId} className="transition-colors border-b hover:bg-gray-100/50">
               <TableCell>{products?.find(prod => prod._id === item.productId)?.name}</TableCell>
               <TableCell>{item.qty1}</TableCell>
               <TableCell>{item.qty2}</TableCell>
               <TableCell>{item.totalQty}</TableCell>
               <TableCell>{item.rate}</TableCell>
               <TableCell>{`${item.discount} ${item.discountType}`}</TableCell>
               <TableCell></TableCell>
               <TableCell>{`${item.scheme} ${item.schemeUnit}`}</TableCell>
               <TableCell>{item.total}</TableCell>
               <TableCell>
                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <Button1
                           variant="ghost"
                           className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                        >
                           <DotsHorizontalIcon className="w-4 h-4" />
                           <span className="sr-only">Open menu</span>
                        </Button1>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent align="end" className="w-[160px]">
                        {/* <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem> */}
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>
                           {/* <AlertDialogTrigger className="w-full text-left"> */}
                           Delete
                           {/* </AlertDialogTrigger> */}
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
               </TableCell>
            </TableRow>
         ))}
      </>
   )
}

export default InvoiceItems
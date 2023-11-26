import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Button } from "../../../../components/ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuRadioGroup,
   DropdownMenuRadioItem,
   DropdownMenuSeparator,
   DropdownMenuShortcut,
   DropdownMenuSub,
   DropdownMenuSubContent,
   DropdownMenuSubTrigger,
   DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu"
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "../../../../components/ui/alertDialog"
import { Trash2 } from 'lucide-react';

// import { labels } from "../data/data"
import { usePurchaseStore } from "../../store/purchaseStore"
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate"
import toast from "react-hot-toast"
import { capitalizeEachFirstWord } from "../../../../lib/utils"


export function DataTableRowActions({ row }) {

   const purchases = usePurchaseStore((state) => state.purchases)
   const setSelectedPurchase = usePurchaseStore((state) => state.setSelectedPurchase)
   const setMode = usePurchaseStore((state) => state.setMode)

   const currentPurchase = purchases?.find(purchase => purchase._id === row.original.mainId)
   const name = capitalizeEachFirstWord(currentPurchase?.supplier?.name || 'nil')

   const handleEdit = () => {
      setSelectedPurchase(currentPurchase)
      setMode('edit')
   }

   const handleView = () => {
      setSelectedPurchase(currentPurchase)
      setMode('view')
   }

   // API Functions
   const axiosPrivate = useAxiosPrivate()

   // Api Functions
   const deletePurchase = async () => {
      axiosPrivate
         .delete(`/product/${currentProduct._id}`)
         .then((res) => {
            toast.success(res?.data?.message)
         })
         .catch((error) => {
            toast.error(error?.response?.data?.message)
         })
   }

   // // React Query
   const queryClient = useQueryClient()

   const { mutate: deletePurchaseMutation } = useMutation({
      mutationFn: deletePurchase,
      onSuccess: () => {
         queryClient.invalidateQueries(['purchases'])
         queryClient.refetchQueries(['purchases'])
      }
   })

   const task = row

   return (
      <>
         <AlertDialog>
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button
                     variant="ghost"
                     className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                  >
                     <DotsHorizontalIcon className="w-4 h-4" />
                     <span className="sr-only">Open menu</span>
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end" className="w-[160px]">
                  <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleView}>View</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                     <AlertDialogTrigger className="w-full text-left">
                        Delete
                     </AlertDialogTrigger>
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>

            {/* Alert Dialog Content */}
            <AlertDialogContent>
               <AlertDialogHeader>
                  <AlertDialogTitle className="flex justify-center mb-4">
                     <Trash2 size={56} className="text-red-500" />
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                     Are you sure you want to delete this account?
                     <span className="text-lg font-bold">
                        {name}
                     </span>
                  </AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={deletePurchaseMutation}>Delete</AlertDialogAction>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
      </>
   )
}

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
import { useProductStore } from "../../store/productStore"
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate"
import toast from "react-hot-toast"
import { capitalizeEachFirstWord } from "../../../../lib/utils"


export function DataTableRowActions({ row }) {

  // const accounts = useAccountStore((state) => state.accounts)
  // const setAccountToEdit = useAccountStore((state) => state.setAccountToEdit)
  // const setIsEdit = useAccountStore((state) => state.setIsEdit)

  // const currentAccount = accounts?.find(acc => acc._id === row.original.mainId)
  // const name = capitalizeEachFirstWord(currentAccount?.name || 'nil')

  // const handleEdit = () => {
  //   setIsEdit(false)
  //   setAccountToEdit(currentAccount)
  //   setIsEdit(true)
  // }

  // // API Functions
  // const axiosPrivate = useAxiosPrivate()

  // // Api Functions
  // const deleteAccount = async () => {
  //   axiosPrivate
  //     .delete(`/account/${currentAccount._id}`)
  //     .then((res) => {
  //       toast.success(res?.data?.message)
  //     })
  //     .catch((error) => {
  //       toast.error(error?.response?.data?.message)
  //     })
  // }

  // // React Query
  // const queryClient = useQueryClient()

  // const { mutate: deleteAccountMutation } = useMutation({
  //   mutationFn: deleteAccount,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['accounts'])
  //     queryClient.refetchQueries(['accounts'])
  //   }
  // })

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
            {/* <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem> */}
            <DropdownMenuItem>Make a copy</DropdownMenuItem>
            <DropdownMenuItem>Favorite</DropdownMenuItem>
            {/* <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={task.label}>
              {labels.map((label) => (
                <DropdownMenuRadioItem key={label.value} value={label.value}>
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub> */}
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
                {/* {name} */}
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            {/* <AlertDialogAction onClick={deleteAccountMutation}>Delete</AlertDialogAction> */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

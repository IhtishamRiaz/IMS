import { DotsHorizontalIcon } from "@radix-ui/react-icons"

import { Button } from "../../../../components/ui/button"
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
import { useMutation, useQueryClient } from "@tanstack/react-query"

// import { labels } from "../data/data"
import { useAccountStore } from "../../store/accountStore"
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate"
import toast from "react-hot-toast"


export function DataTableRowActions({ row }) {

  const selectedRow = useAccountStore((state) => state.selectedRow)
  const accounts = useAccountStore((state) => state.accounts)


  // API Functions
  const axiosPrivate = useAxiosPrivate()

  // Api Functions
  const deleteAccount = async () => {
    const selectedAccount = accounts[selectedRow]

    axiosPrivate
      .delete(`/account/${selectedAccount._id}`)
      .then((res) => {
        toast.success(res?.data?.message)
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
      })
  }

  // React Query
  const queryClient = useQueryClient()

  const { mutate: deleteAccountMutation } = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      queryClient.invalidateQueries(['accounts'])
      queryClient.refetchQueries(['accounts'])
    }
  })

  const task = row

  return (
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
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Make a copy</DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem>
        <DropdownMenuSeparator />
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
        <DropdownMenuItem onClick={deleteAccountMutation}>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

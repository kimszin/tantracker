import TransactionForm, {
  transactionFormSchema,
} from "@/components/transaction-form"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { deleteTransaction } from "@/data/deleteTransaction"
import { getCategories } from "@/data/getCategories"
import { getTransaction } from "@/data/getTransaction"
import { updateTransaction } from "@/data/updateTransaction"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { format } from "date-fns"
import { Loader2, Trash2Icon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import z from "zod"

export const Route = createFileRoute(
  "/_authed/dashboard/transactions/$transactionId/_layout/",
)({
  component: RouteComponent,
  pendingComponent: () => (
    <div className="flex justify-center items-center p-8">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  ),
  // loader 에러뿐만 아니라, 화면을 그리는 도중(렌더링 과정)에 발생하는 모든 에러까지
  // 함께 잡아먹는 든든한 방어막(Error Boundary) 역할을 합니다.
  errorComponent: ({ error }) => {
    console.log(error)
    return (
      <div className="text-3xl text-muted-foreground">
        Oops! Transaction not found.
      </div>
    )
  },
  loader: async ({ params }) => {
    const [categories, transaction] = await Promise.all([
      getCategories(),
      getTransaction({
        data: {
          transactionId: Number(params.transactionId),
        },
      }),
    ])

    if (!transaction) {
      throw new Error("Transaction not found")
    }

    return { categories, transaction }
  },
})

function RouteComponent() {
  const navigate = useNavigate()
  const [deleting, setDeleting] = useState(false)
  const { categories, transaction } = Route.useLoaderData()

  const handleSubmit = async (data: z.infer<typeof transactionFormSchema>) => {
    await updateTransaction({
      data: {
        id: transaction.id,
        amount: data.amount,
        transactionDate: format(data.transactionDate, "yyyy-MM-dd"),
        categoryId: data.categoryId,
        description: data.description,
      },
    })

    toast.success("Success!", {
      description: "Transaction updated",
    })

    navigate({
      to: "/dashboard/transactions",
      search: {
        month: data.transactionDate.getMonth() + 1,
        year: data.transactionDate.getFullYear(),
      },
    })
  }

  const handleDeleteConfirm = async () => {
    setDeleting(true)
    await deleteTransaction({
      data: {
        transactionId: transaction.id,
      },
    })

    toast.success("Success!", {
      description: "Transaction deleted",
    })

    setDeleting(false)

    navigate({
      to: "/dashboard/transactions",
      search: {
        month: Number(transaction.transactionDate.split("-")[1]),
        year: Number(transaction.transactionDate.split("-")[0]),
      },
    })
  }

  return (
    <Card className="max-w-3xl mt-4">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>Edit Transaction</span>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon">
                <Trash2Icon />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This transaction will be
                  permanently deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button
                  disabled={deleting}
                  onClick={handleDeleteConfirm}
                  variant="destructive"
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <TransactionForm
          defaultValues={{
            amount: Number(transaction.amount),
            categoryId: transaction.categoryId,
            description: transaction.description,
            transactionDate: new Date(transaction.transactionDate),
            transactionType:
              categories.find(
                (category) => category.id === transaction.categoryId,
              )?.type ?? "income",
          }}
          categories={categories}
          onSubmit={handleSubmit}
        />
      </CardContent>
    </Card>
  )
}

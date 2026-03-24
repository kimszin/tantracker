import authMiddleware from "@/authMiddleware"
import { db } from "@/src/db"
import { transactionsTable } from "@/src/db/schema"
import { createServerFn } from "@tanstack/react-start"
import { addDays } from "date-fns"
import z from "zod"

const transactionSchema = z.object({
  categoryId: z.coerce.number().positive("Please select a category"),
  transactionDate: z.string().refine((value) => {
    const parsedDate = new Date(value)
    return !isNaN(parsedDate.getTime()) && parsedDate <= addDays(new Date(), 1)
  }),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  description: z
    .string()
    .min(3, "Description must contain at least 3 characters")
    .max(300, "Description must contain a maximum of 300 characters"),
})

export const createTransaction = createServerFn({
  method: "POST",
})
  .middleware([authMiddleware])
  .inputValidator((data: z.infer<typeof transactionSchema>) =>
    transactionSchema.parse(data),
  )
  .handler(async ({ data, context }) => {
    // userId는 항상 값을 가짐(인증 미들웨어에서 userId가 없을 경우 에러를 발생시킴)
    const userId = context.userId
    const transaction = await db
      .insert(transactionsTable)
      .values({
        userId,
        amount: data.amount.toString(),
        categoryId: data.categoryId,
        description: data.description,
        transactionDate: data.transactionDate,
      })
      .returning()

    return transaction
  })

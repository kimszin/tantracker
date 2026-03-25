import authMiddleware from "@/authMiddleware"
import { db } from "@/src/db"
import { transactionsTable } from "@/src/db/schema"
import { createServerFn } from "@tanstack/react-start"
import { asc, desc, eq, sql } from "drizzle-orm"

export const getTransactionYearsRange = createServerFn({
  method: "GET",
})
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const today = new Date()
    const [earliestTransaction] = await db
      .select()
      .from(transactionsTable)
      .where(eq(transactionsTable.userId, context.userId))
      .orderBy(asc(transactionsTable.transactionDate))
      .limit(1)

    const dbClock = await db.execute(
      sql`SELECT EXTRACT(YEAR FROM CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Seoul')::int as "currentYear"`,
    )
    
    // DB 통신 실패 시 어차피 상단 db.execute에서 에러가 터지므로, 하드코딩된 예비용 꼼수(Fallback)를 전부 제거합니다.
    const currentYear = Number(dbClock.rows[0].currentYear)

    const earliestYear = earliestTransaction
      ? new Date(earliestTransaction.transactionDate).getFullYear()
      : currentYear

    const years = Array.from({ length: currentYear - earliestYear + 1 }).map(
      (_, i) => {
        return currentYear - i
      },
    )

    return years
  })

import LoadingSkeleton from "@/components/loading-skeleton"
import { getAnnualCashflow } from "@/data/getAnnualCashflow"
import { getRecentTransactions } from "@/data/getRecentTransactions"
import { getTransactionYearsRange } from "@/data/getTransactionYearsRange"
import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"
import { Cashflow } from "./-cashflow"
import { RecentTransactions } from "./-recent-transactions"

const searchSchema = z.object({
  cfyear: z
    .number()
    .min(1900)
    .max(3000)
    .optional(),
})

export const Route = createFileRoute("/_authed/dashboard/")({
  pendingComponent: () => (
    <div className="max-w-7xl mx-auto py-5">
      <h1 className="text-4xl font-semibold pb-5">Dashboard</h1>
      <LoadingSkeleton />
    </div>
  ),
  validateSearch: searchSchema,
  component: RouteComponent,
  loaderDeps: ({ search }) => ({ cfyear: search.cfyear }),
  loader: async ({ deps }) => {
    const yearsRange = await getTransactionYearsRange()
    const currentYearFallback = yearsRange[0]

    const [transactions, cashflow] = await Promise.all([
      getRecentTransactions(),
      getAnnualCashflow({
        data: {
          year: deps.cfyear ?? currentYearFallback,
        },
      }),
    ])

    return {
      cfyear: deps.cfyear ?? currentYearFallback,
      cashflow,
      transactions,
      yearsRange,
    }
  },
})

function RouteComponent() {
  const { transactions, cashflow, yearsRange, cfyear } = Route.useLoaderData()
  console.log({ cashflow })
  return (
    <div className="max-w-7xl mx-auto py-5">
      <h1 className="text-4xl font-semibold pb-5">Dashboard</h1>
      <Cashflow
        year={cfyear}
        yearsRange={yearsRange}
        annualCashflow={cashflow}
      />
      <RecentTransactions transactions={transactions} />
    </div>
  )
}

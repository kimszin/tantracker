import { getTransactionsByMonth } from "@/data/getTransactionsByMonth"
import { getTransactionYearsRange } from "@/data/getTransactionYearsRange"
import { createFileRoute } from "@tanstack/react-router"
import z from "zod"
import { AllTransactions } from "./-all-transactions"

const searchSchema = z.object({
  month: z.coerce
    .number()
    .min(1)
    .max(12)
    .optional(),
  year: z.coerce
    .number()
    .min(1900)
    .max(3000)
    .optional(),
})

export const Route = createFileRoute(
  "/_authed/dashboard/transactions/_layout/",
)({
  // pendingMs: 0,
  // pendingMinMs: 500,
  pendingComponent: () => (
    <div className="max-w-screen-xl mx-auto py-5">
      <h1 className="text-4xl font-semibold pb-5">Transactions</h1>
    </div>
  ),
  component: RouteComponent,
  // 참고 (TanStack Start의 특징인 동형함수): 화면 내에서 메뉴를 클릭해서 이동할 때는
  // 브라우저(클라이언트 런타임)에서 Zod가 실행되지만,
  // 주소창에 직접 타자를 치고 엔터를 눌러 접속(SSR)할 때는
  // 서버(Node.js 런타임) 위에서 Zod가 대기하다가 먼저 실행됩니다.
  // 즉 **"언제 어디서든 실제로 앱이 돌아가는(런타임) 그 위치(환경)"**에서 작동합니다!
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => {
    const date = new Date()
    return {
      month: search.month ?? date.getMonth() + 1,
      year: search.year ?? date.getFullYear(),
    }
  },
  loader: async ({ deps }) => {
    const yearsRange = await getTransactionYearsRange()
    const transactions = await getTransactionsByMonth({
      data: {
        month: deps.month,
        year: deps.year,
      },
    })

    return {
      month: deps.month,
      year: deps.year,
      yearsRange,
      transactions,
    }
  },
})

function RouteComponent() {
  const data = Route.useLoaderData()
  return <AllTransactions {...data} />
}

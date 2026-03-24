import { c as createServerRpc } from "./createServerRpc-Bd3B-Ah9.js";
import { a as authMiddleware } from "./authMiddleware-BIs-Ehcl.js";
import { d as db, c as categoriesTable, t as transactionsTable } from "./schema-CrdJLO_9.js";
import { sql, eq, and } from "drizzle-orm";
import { z } from "zod";
import { c as createServerFn } from "../server.js";
import "./auth-BkVoR3zB.js";
import "@clerk/backend/internal";
import "./index-CSLGDVeV.js";
import "@clerk/shared/error";
import "./createMiddleware-CRzJRBrm.js";
import "drizzle-orm/neon-http";
import "drizzle-orm/pg-core";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core";
import "node:async_hooks";
import "@tanstack/router-core/ssr/server";
import "h3-v2";
import "tiny-invariant";
import "seroval";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-router";
const schema = z.object({
  year: z.number()
});
const getAnnualCashflow_createServerFn_handler = createServerRpc({
  id: "bc9b647bc97dcd7ca224878c14fddd01f73a899f83a01bc0867013def24f9cba",
  name: "getAnnualCashflow",
  filename: "data/getAnnualCashflow.ts"
}, (opts) => getAnnualCashflow.__executeServer(opts));
const getAnnualCashflow = createServerFn({
  method: "GET"
}).middleware([authMiddleware]).inputValidator((data) => schema.parse(data)).handler(getAnnualCashflow_createServerFn_handler, async ({
  context,
  data
}) => {
  const cashflow = await db.select({
    month: sql`EXTRACT(MONTH FROM ${transactionsTable.transactionDate})`,
    totalIncome: sql`SUM(CASE WHEN ${categoriesTable.type} = 'income' THEN ${transactionsTable.amount} ELSE 0 END)`,
    totalExpenses: sql`SUM(CASE WHEN ${categoriesTable.type} = 'expense' THEN ${transactionsTable.amount} ELSE 0 END)`
  }).from(transactionsTable).leftJoin(categoriesTable, eq(transactionsTable.categoryId, categoriesTable.id)).where(and(eq(transactionsTable.userId, context.userId), sql`EXTRACT(YEAR FROM ${transactionsTable.transactionDate}) = ${data.year}`)).groupBy(sql`EXTRACT(MONTH FROM ${transactionsTable.transactionDate})`).orderBy(sql`EXTRACT(MONTH FROM ${transactionsTable.transactionDate})`);
  const annualCashflow = [];
  for (let i = 1; i <= 12; i++) {
    const monthlyCashflow = cashflow.find((cf) => Number(cf.month) === i);
    annualCashflow.push({
      month: i,
      income: Number(monthlyCashflow?.totalIncome ?? 0),
      expenses: Number(monthlyCashflow?.totalExpenses ?? 0)
    });
  }
  return annualCashflow;
});
export {
  getAnnualCashflow_createServerFn_handler
};

import { c as createServerRpc } from "./createServerRpc-Bd3B-Ah9.js";
import { a as authMiddleware } from "./authMiddleware-BIs-Ehcl.js";
import { d as db, c as categoriesTable, t as transactionsTable } from "./schema-CrdJLO_9.js";
import { format } from "date-fns";
import { and, eq, gte, lte, desc } from "drizzle-orm";
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
const today = /* @__PURE__ */ new Date();
const schema = z.object({
  month: z.number().min(1).max(12),
  year: z.number().min(today.getFullYear() - 100).max(today.getFullYear())
});
const getTransactionsByMonth_createServerFn_handler = createServerRpc({
  id: "73db9b8f8ca13db555c5fc7a4808d289f416ff41ce3930b9580cce81716e11dd",
  name: "getTransactionsByMonth",
  filename: "data/getTransactionsByMonth.ts"
}, (opts) => getTransactionsByMonth.__executeServer(opts));
const getTransactionsByMonth = createServerFn({
  method: "GET"
}).middleware([authMiddleware]).inputValidator((data) => schema.parse(data)).handler(getTransactionsByMonth_createServerFn_handler, async ({
  context,
  data
}) => {
  const earliestDate = new Date(data.year, data.month - 1, 1);
  const latestDate = new Date(data.year, data.month, 0);
  const transactions = await db.select({
    id: transactionsTable.id,
    description: transactionsTable.description,
    amount: transactionsTable.amount,
    transactionDate: transactionsTable.transactionDate,
    category: categoriesTable.name,
    transactionType: categoriesTable.type
  }).from(transactionsTable).where(and(eq(transactionsTable.userId, context.userId), gte(transactionsTable.transactionDate, format(earliestDate, "yyyy-MM-dd")), lte(transactionsTable.transactionDate, format(latestDate, "yyyy-MM-dd")))).orderBy(desc(transactionsTable.transactionDate)).leftJoin(categoriesTable, eq(transactionsTable.categoryId, categoriesTable.id));
  return transactions;
});
export {
  getTransactionsByMonth_createServerFn_handler
};

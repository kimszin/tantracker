import { c as createServerRpc } from "./createServerRpc-Bd3B-Ah9.js";
import { a as authMiddleware } from "./authMiddleware-BIs-Ehcl.js";
import { d as db, c as categoriesTable, t as transactionsTable } from "./schema-CrdJLO_9.js";
import { eq, desc } from "drizzle-orm";
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
const getRecentTransactions_createServerFn_handler = createServerRpc({
  id: "2f3f7655acd83d5bd574f9171d7b52c29fc9db85fd59983491f894cbf23d5da5",
  name: "getRecentTransactions",
  filename: "data/getRecentTransactions.ts"
}, (opts) => getRecentTransactions.__executeServer(opts));
const getRecentTransactions = createServerFn({
  method: "GET"
}).middleware([authMiddleware]).handler(getRecentTransactions_createServerFn_handler, async ({
  context
}) => {
  const transactions = await db.select({
    id: transactionsTable.id,
    description: transactionsTable.description,
    amount: transactionsTable.amount,
    transactionDate: transactionsTable.transactionDate,
    category: categoriesTable.name,
    transactionType: categoriesTable.type
  }).from(transactionsTable).where(eq(transactionsTable.userId, context.userId)).orderBy(desc(transactionsTable.transactionDate)).leftJoin(categoriesTable, eq(transactionsTable.categoryId, categoriesTable.id)).limit(5);
  return transactions;
});
export {
  getRecentTransactions_createServerFn_handler
};

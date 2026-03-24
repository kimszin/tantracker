import { c as createServerRpc } from "./createServerRpc-Bd3B-Ah9.js";
import { a as authMiddleware } from "./authMiddleware-BIs-Ehcl.js";
import { d as db, t as transactionsTable } from "./schema-CrdJLO_9.js";
import { eq, asc } from "drizzle-orm";
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
const getTransactionYearsRange_createServerFn_handler = createServerRpc({
  id: "205eb952798543f1039cfb4c22ab4f0a60931fa7ec7bf1a8a544c253c560e5f3",
  name: "getTransactionYearsRange",
  filename: "data/getTransactionYearsRange.ts"
}, (opts) => getTransactionYearsRange.__executeServer(opts));
const getTransactionYearsRange = createServerFn({
  method: "GET"
}).middleware([authMiddleware]).handler(getTransactionYearsRange_createServerFn_handler, async ({
  context
}) => {
  const today = /* @__PURE__ */ new Date();
  const [earliestTransaction] = await db.select().from(transactionsTable).where(eq(transactionsTable.userId, context.userId)).orderBy(asc(transactionsTable.transactionDate)).limit(1);
  const currentYear = today.getFullYear();
  const earliestYear = earliestTransaction ? new Date(earliestTransaction.transactionDate).getFullYear() : currentYear;
  const years = Array.from({
    length: currentYear - earliestYear + 1
  }).map((_, i) => {
    return currentYear - i;
  });
  return years;
});
export {
  getTransactionYearsRange_createServerFn_handler
};

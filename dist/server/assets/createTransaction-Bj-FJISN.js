import { c as createServerRpc } from "./createServerRpc-Bd3B-Ah9.js";
import { a as authMiddleware } from "./authMiddleware-BIs-Ehcl.js";
import { d as db, t as transactionsTable } from "./schema-CrdJLO_9.js";
import { addDays } from "date-fns";
import z from "zod";
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
const transactionSchema = z.object({
  categoryId: z.coerce.number().positive("Please select a category"),
  transactionDate: z.string().refine((value) => {
    const parsedDate = new Date(value);
    return !isNaN(parsedDate.getTime()) && parsedDate <= addDays(/* @__PURE__ */ new Date(), 1);
  }),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  description: z.string().min(3, "Description must contain at least 3 characters").max(300, "Description must contain a maximum of 300 characters")
});
const createTransaction_createServerFn_handler = createServerRpc({
  id: "b7db433fa556d634f0f097416d59458354901c25b064ea28f63d86eb3290036f",
  name: "createTransaction",
  filename: "data/createTransaction.ts"
}, (opts) => createTransaction.__executeServer(opts));
const createTransaction = createServerFn({
  method: "POST"
}).middleware([authMiddleware]).inputValidator((data) => transactionSchema.parse(data)).handler(createTransaction_createServerFn_handler, async ({
  data,
  context
}) => {
  const userId = context.userId;
  const transaction = await db.insert(transactionsTable).values({
    userId,
    amount: data.amount.toString(),
    categoryId: data.categoryId,
    description: data.description,
    transactionDate: data.transactionDate
  }).returning();
  return transaction;
});
export {
  createTransaction_createServerFn_handler
};

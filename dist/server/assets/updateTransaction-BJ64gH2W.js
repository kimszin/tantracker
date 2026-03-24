import { c as createServerRpc } from "./createServerRpc-Bd3B-Ah9.js";
import { a as authMiddleware } from "./authMiddleware-BIs-Ehcl.js";
import { d as db, t as transactionsTable } from "./schema-CrdJLO_9.js";
import { addDays } from "date-fns";
import { and, eq } from "drizzle-orm";
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
  id: z.number(),
  categoryId: z.coerce.number().positive("Please select a category"),
  transactionDate: z.string().refine((value) => {
    const parsedDate = new Date(value);
    return !isNaN(parsedDate.getTime()) && parsedDate <= addDays(/* @__PURE__ */ new Date(), 1);
  }),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  description: z.string().min(3, "Description must contain at least 3 characters").max(300, "Description must contain a maximum of 300 characters")
});
const updateTransaction_createServerFn_handler = createServerRpc({
  id: "186b5d95031e12e99ea856ffe2445d45d57fd49f280182de70435208c077c24f",
  name: "updateTransaction",
  filename: "data/updateTransaction.ts"
}, (opts) => updateTransaction.__executeServer(opts));
const updateTransaction = createServerFn({
  method: "POST"
}).middleware([authMiddleware]).inputValidator((data) => schema.parse(data)).handler(updateTransaction_createServerFn_handler, async ({
  context,
  data
}) => {
  await db.update(transactionsTable).set({
    amount: data.amount.toString(),
    categoryId: data.categoryId,
    transactionDate: data.transactionDate,
    description: data.description
  }).where(and(eq(transactionsTable.id, data.id), eq(transactionsTable.userId, context.userId)));
});
export {
  updateTransaction_createServerFn_handler
};

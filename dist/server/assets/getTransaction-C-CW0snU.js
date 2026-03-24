import { c as createServerRpc } from "./createServerRpc-Bd3B-Ah9.js";
import { a as authMiddleware } from "./authMiddleware-BIs-Ehcl.js";
import { d as db, t as transactionsTable } from "./schema-CrdJLO_9.js";
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
  transactionId: z.number()
});
const getTransaction_createServerFn_handler = createServerRpc({
  id: "ae566669edb1443acf71f586a477a49421af0181134ca0a94b4c5f16bfcd5753",
  name: "getTransaction",
  filename: "data/getTransaction.ts"
}, (opts) => getTransaction.__executeServer(opts));
const getTransaction = createServerFn({
  method: "GET"
}).middleware([authMiddleware]).inputValidator((data) => schema.parse(data)).handler(getTransaction_createServerFn_handler, async ({
  data,
  context
}) => {
  const [transaction] = await db.select().from(transactionsTable).where(and(eq(transactionsTable.id, data.transactionId), eq(transactionsTable.userId, context.userId)));
  return transaction;
});
export {
  getTransaction_createServerFn_handler
};

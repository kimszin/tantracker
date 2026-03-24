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
const deleteTransaction_createServerFn_handler = createServerRpc({
  id: "9641a738e8fd12994d16c18dc7745ad53c68455ef6f1ee392bc29a1d3ba58682",
  name: "deleteTransaction",
  filename: "data/deleteTransaction.ts"
}, (opts) => deleteTransaction.__executeServer(opts));
const deleteTransaction = createServerFn({
  method: "POST"
}).middleware([authMiddleware]).inputValidator((data) => schema.parse(data)).handler(deleteTransaction_createServerFn_handler, async ({
  context,
  data
}) => {
  await db.delete(transactionsTable).where(and(eq(transactionsTable.id, data.transactionId), eq(transactionsTable.userId, context.userId)));
});
export {
  deleteTransaction_createServerFn_handler
};

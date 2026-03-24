import { c as createServerRpc } from "./createServerRpc-Bd3B-Ah9.js";
import { d as db, c as categoriesTable } from "./schema-CrdJLO_9.js";
import { c as createServerFn } from "../server.js";
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
const getCategories_createServerFn_handler = createServerRpc({
  id: "ae6103528305680636953252dc7087bd31dfe45b49a549ebfb9d6f660aae56e6",
  name: "getCategories",
  filename: "data/getCategories.ts"
}, (opts) => getCategories.__executeServer(opts));
const getCategories = createServerFn({
  method: "GET"
}).handler(getCategories_createServerFn_handler, async () => {
  const categories = await db.select().from(categoriesTable);
  return categories;
});
export {
  getCategories_createServerFn_handler
};

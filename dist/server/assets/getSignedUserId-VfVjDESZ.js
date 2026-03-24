import { c as createServerRpc } from "./createServerRpc-Bd3B-Ah9.js";
import { a as auth } from "./auth-BkVoR3zB.js";
import { c as createServerFn } from "../server.js";
import "@clerk/backend/internal";
import "./index-CSLGDVeV.js";
import "@clerk/shared/error";
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
const getSignedUserId_createServerFn_handler = createServerRpc({
  id: "eab96a50645ea712713dbb500fde513232d1a36055bbfe0c067fe3473b7e97cc",
  name: "getSignedUserId",
  filename: "data/getSignedUserId.ts"
}, (opts) => getSignedUserId.__executeServer(opts));
const getSignedUserId = createServerFn({
  method: "GET"
}).handler(getSignedUserId_createServerFn_handler, async () => {
  const {
    isAuthenticated,
    userId
  } = await auth();
  if (!isAuthenticated) {
    return null;
  }
  return {
    userId
  };
});
export {
  getSignedUserId_createServerFn_handler
};

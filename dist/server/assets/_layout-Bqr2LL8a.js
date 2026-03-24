import { jsxs, jsx } from "react/jsx-runtime";
import { B as Breadcrumb, a as BreadcrumbList, b as BreadcrumbItem, c as BreadcrumbLink, d as BreadcrumbSeparator, e as BreadcrumbPage } from "./breadcrumb-mgPGYvWk.js";
import { Link, Outlet } from "@tanstack/react-router";
import "lucide-react";
import "radix-ui";
import "./router-A2M3SlRa.js";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "../server.js";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core";
import "node:async_hooks";
import "@tanstack/router-core/ssr/server";
import "h3-v2";
import "tiny-invariant";
import "seroval";
import "@tanstack/react-router/ssr/server";
import "sonner";
import "@clerk/clerk-react";
import "react";
import "./index-CSLGDVeV.js";
import "@clerk/shared/error";
import "./env-CuBqDywz.js";
import "@clerk/shared/getEnvVariable";
import "@clerk/shared/underscore";
import "./auth-BkVoR3zB.js";
import "@clerk/backend/internal";
import "./authMiddleware-BIs-Ehcl.js";
import "./createMiddleware-CRzJRBrm.js";
import "zod";
function RouteComponent() {
  return /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto py-10", children: [
    /* @__PURE__ */ jsx(Breadcrumb, { children: /* @__PURE__ */ jsxs(BreadcrumbList, { children: [
      /* @__PURE__ */ jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsx(BreadcrumbLink, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/dashboard", children: "Dashboard" }) }) }),
      /* @__PURE__ */ jsx(BreadcrumbSeparator, {}),
      /* @__PURE__ */ jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsx(BreadcrumbPage, { children: "Transactions" }) })
    ] }) }),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
}
export {
  RouteComponent as component
};

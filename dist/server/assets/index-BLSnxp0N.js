import { jsxs, jsx } from "react/jsx-runtime";
import { B as Button } from "./router-A2M3SlRa.js";
import { Link } from "@tanstack/react-router";
import { ChartColumnBigIcon } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/clerk-react";
import "class-variance-authority";
import "radix-ui";
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
const cover = "/assets/cover-BG3ELtOB.webp";
function RouteComponent() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-[400px] h-[calc(100vh-80px)] flex items-center justify-center relative", children: [
    /* @__PURE__ */ jsx("img", { src: cover, alt: "", className: "absolute top-0 left-0 object-cover object-center size-full opacity-50" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 text-center relative z-10", children: [
      /* @__PURE__ */ jsxs("h1", { className: "text-5xl font-bold flex gap-1 items-center", children: [
        /* @__PURE__ */ jsx(ChartColumnBigIcon, { size: 60, className: "text-lime-500" }),
        " TanTracker"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-2xl", children: "Track your finances with ease" }),
      /* @__PURE__ */ jsx(SignedIn, { children: /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", children: /* @__PURE__ */ jsx(Link, { to: "/dashboard", children: "Go To Your Dashboard" }) }) }),
      /* @__PURE__ */ jsx(SignedOut, { children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center justify-center", children: [
        /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", className: "bg-lime-600 hover:bg-lime-700", children: /* @__PURE__ */ jsx(SignInButton, {}) }),
        /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", children: /* @__PURE__ */ jsx(SignUpButton, {}) })
      ] }) })
    ] })
  ] });
}
export {
  RouteComponent as component
};

import { jsxs, jsx } from "react/jsx-runtime";
import { T as TransactionForm } from "./transaction-form-BpmP2jFx.js";
import { C as Card, a as CardHeader, b as CardTitle, g as CardContent } from "./select-Dl68zTIQ.js";
import { b as createSsrRpc, d as Route } from "./router-A2M3SlRa.js";
import { a as authMiddleware } from "./authMiddleware-BIs-Ehcl.js";
import { addDays, format } from "date-fns";
import z from "zod";
import { c as createServerFn } from "../server.js";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import "@hookform/resolvers/zod";
import "lucide-react";
import "react-hook-form";
import "react";
import "react-day-picker";
import "radix-ui";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@clerk/clerk-react";
import "./index-CSLGDVeV.js";
import "@clerk/shared/error";
import "./env-CuBqDywz.js";
import "@clerk/shared/getEnvVariable";
import "@clerk/shared/underscore";
import "./auth-BkVoR3zB.js";
import "@clerk/backend/internal";
import "./createMiddleware-CRzJRBrm.js";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core";
import "node:async_hooks";
import "@tanstack/router-core/ssr/server";
import "h3-v2";
import "tiny-invariant";
import "seroval";
import "@tanstack/react-router/ssr/server";
const transactionSchema = z.object({
  categoryId: z.coerce.number().positive("Please select a category"),
  transactionDate: z.string().refine((value) => {
    const parsedDate = new Date(value);
    return !isNaN(parsedDate.getTime()) && parsedDate <= addDays(/* @__PURE__ */ new Date(), 1);
  }),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  description: z.string().min(3, "Description must contain at least 3 characters").max(300, "Description must contain a maximum of 300 characters")
});
const createTransaction = createServerFn({
  method: "POST"
}).middleware([authMiddleware]).inputValidator((data) => transactionSchema.parse(data)).handler(createSsrRpc("b7db433fa556d634f0f097416d59458354901c25b064ea28f63d86eb3290036f"));
function RouteComponent() {
  const {
    categories
  } = Route.useLoaderData();
  const navigate = useNavigate();
  const handleSubmit = async (data) => {
    await createTransaction({
      data: {
        amount: data.amount,
        categoryId: data.categoryId,
        description: data.description,
        transactionDate: format(data.transactionDate, "yyyy-MM-dd")
      }
    });
    toast.success("Success!", {
      description: "Transaction created"
    });
    navigate({
      to: "/dashboard/transactions",
      search: {
        month: data.transactionDate.getMonth() + 1,
        year: data.transactionDate.getFullYear()
      }
    });
  };
  return /* @__PURE__ */ jsxs(Card, { className: "max-w-3xl mt-4", children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "New Transaction" }) }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(TransactionForm, { categories, onSubmit: handleSubmit }) })
  ] });
}
export {
  RouteComponent as component
};

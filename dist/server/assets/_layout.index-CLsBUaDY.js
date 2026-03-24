import { jsxs, jsx } from "react/jsx-runtime";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell, B as Badge } from "./table-DlbkCZmH.js";
import { B as Button, a as Route } from "./router-A2M3SlRa.js";
import { C as Card, a as CardHeader, b as CardTitle, S as Select, c as SelectTrigger, d as SelectValue, e as SelectContent, f as SelectItem, g as CardContent } from "./select-Dl68zTIQ.js";
import { useRouter, Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { PencilIcon } from "lucide-react";
import numeral from "numeral";
import { useState } from "react";
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
import "@clerk/clerk-react";
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
function AllTransactions({
  month,
  year,
  yearsRange,
  transactions
}) {
  const selectedDate = new Date(year, month - 1, 1);
  const [selectedMonth, setSelectedMonth] = useState(month);
  const [selectedYear, setSelectedYear] = useState(year);
  const router = useRouter();
  const displayYears = Array.from(/* @__PURE__ */ new Set([...yearsRange, year])).sort(
    (a, b) => b - a
  );
  return /* @__PURE__ */ jsxs(Card, { className: "mt-4", children: [
    /* @__PURE__ */ jsx(CardHeader, { className: "gap-0", children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs("span", { children: [
        format(selectedDate, "MMM yyyy"),
        " Transactions"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
        /* @__PURE__ */ jsxs(
          Select,
          {
            value: selectedMonth.toString(),
            onValueChange: (value) => setSelectedMonth(Number(value)),
            children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsx(SelectContent, { children: Array.from({ length: 12 }).map((_, i) => /* @__PURE__ */ jsx(SelectItem, { value: `${i + 1}`, children: format(new Date(selectedDate.getFullYear(), i, 1), "MMM") }, i)) })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Select,
          {
            value: selectedYear.toString(),
            onValueChange: (value) => setSelectedYear(Number(value)),
            children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsx(SelectContent, { children: displayYears.map((y) => /* @__PURE__ */ jsx(SelectItem, { value: y.toString(), children: y }, y)) })
            ]
          }
        ),
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(
          Link,
          {
            to: "/dashboard/transactions",
            search: {
              month: selectedMonth,
              year: selectedYear
            },
            children: "Go"
          }
        ) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs(CardContent, { children: [
      /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/dashboard/transactions/new", children: "New Transaction" }) }),
      !transactions.length && /* @__PURE__ */ jsx("p", { className: "text-center py-10 text-lg text-muted-foreground", children: "There are no transactions for this month" }),
      !!transactions.length && /* @__PURE__ */ jsxs(Table, { className: "mt-4", children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "Date" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Description" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Type" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Category" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Amount" }),
          /* @__PURE__ */ jsx(TableHead, {})
        ] }) }),
        /* @__PURE__ */ jsx(TableBody, { children: transactions.map((transaction) => /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableCell, { children: format(transaction.transactionDate, "do MMM yyyy") }),
          /* @__PURE__ */ jsx(TableCell, { children: transaction.description }),
          /* @__PURE__ */ jsx(TableCell, { className: "capitalize", children: /* @__PURE__ */ jsx(
            Badge,
            {
              className: transaction.transactionType === "income" ? "bg-lime-500 hover:bg-lime-600" : "bg-orange-500 hover:bg-orange-600",
              children: transaction.transactionType
            }
          ) }),
          /* @__PURE__ */ jsx(TableCell, { children: transaction.category }),
          /* @__PURE__ */ jsxs(TableCell, { children: [
            "£",
            numeral(transaction.amount).format("0,0[.]00")
          ] }),
          /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              size: "icon",
              "aria-label": "Edit transaction",
              asChild: true,
              children: /* @__PURE__ */ jsx(
                Link,
                {
                  to: "/dashboard/transactions/$transactionId",
                  params: {
                    transactionId: transaction.id.toString()
                  },
                  onClick: () => {
                    router.clearCache({
                      filter: (route) => route.pathname !== `/dashboard/transactions/${transaction.id}`
                    });
                  },
                  children: /* @__PURE__ */ jsx(PencilIcon, {})
                }
              )
            }
          ) })
        ] }, transaction.id)) })
      ] })
    ] })
  ] });
}
function RouteComponent() {
  const data = Route.useLoaderData();
  return /* @__PURE__ */ jsx(AllTransactions, { ...data });
}
export {
  RouteComponent as component
};

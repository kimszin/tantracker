import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { C as Card, a as CardHeader, b as CardTitle, S as Select, c as SelectTrigger, d as SelectValue, e as SelectContent, f as SelectItem, g as CardContent } from "./select-Dl68zTIQ.js";
import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { BarChart, CartesianGrid, YAxis, XAxis, Legend, Bar } from "recharts";
import { c as cn, B as Button, R as Route } from "./router-A2M3SlRa.js";
import { useNavigate, Link } from "@tanstack/react-router";
import { format } from "date-fns";
import numeral from "numeral";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell, B as Badge } from "./table-DlbkCZmH.js";
import "lucide-react";
import "radix-ui";
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
const THEMES = { light: "", dark: ".dark" };
const ChartContext = React.createContext(null);
function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}
function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;
  return /* @__PURE__ */ jsx(ChartContext.Provider, { value: { config }, children: /* @__PURE__ */ jsxs(
    "div",
    {
      "data-slot": "chart",
      "data-chart": chartId,
      className: cn(
        "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx(ChartStyle, { id: chartId, config }),
        /* @__PURE__ */ jsx(RechartsPrimitive.ResponsiveContainer, { children })
      ]
    }
  ) });
}
const ChartStyle = ({ id, config }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config2]) => config2.theme || config2.color
  );
  if (!colorConfig.length) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "style",
    {
      dangerouslySetInnerHTML: {
        __html: Object.entries(THEMES).map(
          ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig.map(([key, itemConfig]) => {
            const color = itemConfig.theme?.[theme] || itemConfig.color;
            return color ? `  --color-${key}: ${color};` : null;
          }).join("\n")}
}
`
        ).join("\n")
      }
    }
  );
};
const ChartTooltip = RechartsPrimitive.Tooltip;
function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey
}) {
  const { config } = useChart();
  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null;
    }
    const [item] = payload;
    const key = `${labelKey || item?.dataKey || item?.name || "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value = !labelKey && typeof label === "string" ? config[label]?.label || label : itemConfig?.label;
    if (labelFormatter) {
      return /* @__PURE__ */ jsx("div", { className: cn("font-medium", labelClassName), children: labelFormatter(value, payload) });
    }
    if (!value) {
      return null;
    }
    return /* @__PURE__ */ jsx("div", { className: cn("font-medium", labelClassName), children: value });
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey
  ]);
  if (!active || !payload?.length) {
    return null;
  }
  const nestLabel = payload.length === 1 && indicator !== "dot";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
        className
      ),
      children: [
        !nestLabel ? tooltipLabel : null,
        /* @__PURE__ */ jsx("div", { className: "grid gap-1.5", children: payload.filter((item) => item.type !== "none").map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          const indicatorColor = color || item.payload.fill || item.color;
          return /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                indicator === "dot" && "items-center"
              ),
              children: formatter && item?.value !== void 0 && item.name ? formatter(item.value, item.name, item, index, item.payload) : /* @__PURE__ */ jsxs(Fragment, { children: [
                itemConfig?.icon ? /* @__PURE__ */ jsx(itemConfig.icon, {}) : !hideIndicator && /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: cn(
                      "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                      {
                        "h-2.5 w-2.5": indicator === "dot",
                        "w-1": indicator === "line",
                        "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                        "my-0.5": nestLabel && indicator === "dashed"
                      }
                    ),
                    style: {
                      "--color-bg": indicatorColor,
                      "--color-border": indicatorColor
                    }
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: cn(
                      "flex flex-1 justify-between leading-none",
                      nestLabel ? "items-end" : "items-center"
                    ),
                    children: [
                      /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
                        nestLabel ? tooltipLabel : null,
                        /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: itemConfig?.label || item.name })
                      ] }),
                      item.value && /* @__PURE__ */ jsx("span", { className: "font-mono font-medium text-foreground tabular-nums", children: item.value.toLocaleString() })
                    ]
                  }
                )
              ] })
            },
            item.dataKey
          );
        }) })
      ]
    }
  );
}
function getPayloadConfigFromPayload(config, payload, key) {
  if (typeof payload !== "object" || payload === null) {
    return void 0;
  }
  const payloadPayload = "payload" in payload && typeof payload.payload === "object" && payload.payload !== null ? payload.payload : void 0;
  let configLabelKey = key;
  if (key in payload && typeof payload[key] === "string") {
    configLabelKey = payload[key];
  } else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === "string") {
    configLabelKey = payloadPayload[key];
  }
  return configLabelKey in config ? config[configLabelKey] : config[key];
}
function Cashflow({
  yearsRange,
  year,
  annualCashflow
}) {
  const totalAnnualIncome = annualCashflow.reduce(
    (prevResult, { income }) => {
      return prevResult + income;
    },
    0
  );
  const totalAnnualExpenses = annualCashflow.reduce(
    (prevResult, { expenses }) => {
      return prevResult + expenses;
    },
    0
  );
  const balance = totalAnnualIncome - totalAnnualExpenses;
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs(Card, { className: "mb-5", children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex justify-between", children: [
      /* @__PURE__ */ jsx("span", { children: "Cashflow" }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
        Select,
        {
          defaultValue: year.toString(),
          onValueChange: (value) => {
            navigate({
              to: "/dashboard",
              search: {
                cfyear: Number(value)
              }
            });
          },
          children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsx(SelectContent, { children: yearsRange.map((year2) => /* @__PURE__ */ jsx(SelectItem, { value: year2.toString(), children: year2 }, year2)) })
          ]
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxs(CardContent, { className: "grid grid-cols-[1fr_250px]", children: [
      /* @__PURE__ */ jsx(
        ChartContainer,
        {
          config: {
            income: {
              label: "Income",
              color: "#84cc16"
            },
            expenses: {
              label: "Expenses",
              color: "#f97316"
            }
          },
          className: "w-full h-[300px]",
          children: /* @__PURE__ */ jsxs(BarChart, { data: annualCashflow, children: [
            /* @__PURE__ */ jsx(CartesianGrid, { vertical: false }),
            /* @__PURE__ */ jsx(
              YAxis,
              {
                tickFormatter: (value) => {
                  return `£${numeral(value).format("0,0")}`;
                }
              }
            ),
            /* @__PURE__ */ jsx(
              XAxis,
              {
                dataKey: "month",
                tickFormatter: (value) => {
                  return format(new Date(year, value - 1, 1), "MMM");
                }
              }
            ),
            /* @__PURE__ */ jsx(
              ChartTooltip,
              {
                content: /* @__PURE__ */ jsx(
                  ChartTooltipContent,
                  {
                    labelFormatter: (value, payload) => {
                      console.log({ value, payload });
                      return /* @__PURE__ */ jsx("div", { children: format(
                        new Date(year, payload[0]?.payload?.month - 1, 1),
                        "MMM"
                      ) });
                    }
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(Legend, { align: "right", verticalAlign: "top" }),
            /* @__PURE__ */ jsx(Bar, { dataKey: "income", fill: "var(--color-income)", radius: 4 }),
            /* @__PURE__ */ jsx(Bar, { dataKey: "expenses", fill: "var(--color-expenses)", radius: 4 })
          ] })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "border-l px-4 flex flex-col gap-4 justify-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground font-bold text-sm", children: "Income" }),
          /* @__PURE__ */ jsxs("h2", { className: "text-3xl", children: [
            "£",
            numeral(totalAnnualIncome).format("0,0[.]00")
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "border-t" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground font-bold text-sm", children: "Expenses" }),
          /* @__PURE__ */ jsxs("h2", { className: "text-3xl", children: [
            "£",
            numeral(totalAnnualExpenses).format("0,0[.]00")
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "border-t" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground font-bold text-sm", children: "Balance" }),
          /* @__PURE__ */ jsxs(
            "h2",
            {
              className: cn(
                "text-3xl font-bold",
                balance >= 0 ? "text-lime-500" : "text-orange-500"
              ),
              children: [
                "£",
                numeral(balance).format("0,0[.]00")
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function RecentTransactions({
  transactions
}) {
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex justify-between", children: [
      /* @__PURE__ */ jsx("span", { children: "Recent Transactions" }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsx(Link, { to: "/dashboard/transactions", children: "View All" }) }),
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/dashboard/transactions/new", children: "Create New" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs(CardContent, { children: [
      !transactions.length && /* @__PURE__ */ jsx("p", { className: "text-center py-10 text-lg text-muted-foreground", children: "There are no transactions for this month" }),
      !!transactions.length && /* @__PURE__ */ jsxs(Table, { className: "mt-4", children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "Date" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Description" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Type" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Category" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Amount" })
        ] }) }),
        /* @__PURE__ */ jsx(TableBody, { children: transactions.map((transaction) => /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableCell, { children: format(transaction.transactionDate, "do MMM yyyy") }),
          /* @__PURE__ */ jsx(TableCell, { children: transaction.description }),
          /* @__PURE__ */ jsx(TableCell, { className: "capitalize", children: /* @__PURE__ */ jsx(
            Badge,
            {
              className: transaction.transactionType === "income" ? "bg-lime-500" : "bg-orange-500",
              children: transaction.transactionType
            }
          ) }),
          /* @__PURE__ */ jsx(TableCell, { children: transaction.category }),
          /* @__PURE__ */ jsxs(TableCell, { children: [
            "£",
            numeral(transaction.amount).format("0,0[.]00")
          ] })
        ] }, transaction.id)) })
      ] })
    ] })
  ] });
}
function RouteComponent() {
  const {
    transactions,
    cashflow,
    yearsRange,
    cfyear
  } = Route.useLoaderData();
  console.log({
    cashflow
  });
  return /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto py-5", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-semibold pb-5", children: "Dashboard" }),
    /* @__PURE__ */ jsx(Cashflow, { year: cfyear, yearsRange, annualCashflow: cashflow }),
    /* @__PURE__ */ jsx(RecentTransactions, { transactions })
  ] });
}
export {
  RouteComponent as component
};

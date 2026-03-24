import { jsx, jsxs } from "react/jsx-runtime";
import { T as TransactionForm } from "./transaction-form-BpmP2jFx.js";
import { AlertDialog as AlertDialog$1 } from "radix-ui";
import { c as cn, B as Button, b as createSsrRpc, e as Route } from "./router-A2M3SlRa.js";
import { C as Card, a as CardHeader, b as CardTitle, g as CardContent } from "./select-Dl68zTIQ.js";
import { a as authMiddleware } from "./authMiddleware-BIs-Ehcl.js";
import { z } from "zod";
import { c as createServerFn } from "../server.js";
import { addDays, format } from "date-fns";
import { useNavigate } from "@tanstack/react-router";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import "@hookform/resolvers/zod";
import "react-hook-form";
import "react-day-picker";
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
function AlertDialog({
  ...props
}) {
  return /* @__PURE__ */ jsx(AlertDialog$1.Root, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(AlertDialog$1.Trigger, { "data-slot": "alert-dialog-trigger", ...props });
}
function AlertDialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(AlertDialog$1.Portal, { "data-slot": "alert-dialog-portal", ...props });
}
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AlertDialog$1.Overlay,
    {
      "data-slot": "alert-dialog-overlay",
      className: cn(
        "fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
        className
      ),
      ...props
    }
  );
}
function AlertDialogContent({
  className,
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsxs(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsx(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsx(
      AlertDialog$1.Content,
      {
        "data-slot": "alert-dialog-content",
        "data-size": size,
        className: cn(
          "group/alert-dialog-content fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 data-[size=sm]:max-w-xs data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[size=default]:sm:max-w-lg",
          className
        ),
        ...props
      }
    )
  ] });
}
function AlertDialogHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: cn(
        "grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-6 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]",
        className
      ),
      ...props
    }
  );
}
function AlertDialogFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function AlertDialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AlertDialog$1.Title,
    {
      "data-slot": "alert-dialog-title",
      className: cn(
        "text-lg font-semibold sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
        className
      ),
      ...props
    }
  );
}
function AlertDialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AlertDialog$1.Description,
    {
      "data-slot": "alert-dialog-description",
      className: cn("text-sm text-muted-foreground", className),
      ...props
    }
  );
}
function AlertDialogCancel({
  className,
  variant = "outline",
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(Button, { variant, size, asChild: true, children: /* @__PURE__ */ jsx(
    AlertDialog$1.Cancel,
    {
      "data-slot": "alert-dialog-cancel",
      className: cn(className),
      ...props
    }
  ) });
}
const schema$1 = z.object({
  transactionId: z.number()
});
const deleteTransaction = createServerFn({
  method: "POST"
}).middleware([authMiddleware]).inputValidator((data) => schema$1.parse(data)).handler(createSsrRpc("9641a738e8fd12994d16c18dc7745ad53c68455ef6f1ee392bc29a1d3ba58682"));
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
const updateTransaction = createServerFn({
  method: "POST"
}).middleware([authMiddleware]).inputValidator((data) => schema.parse(data)).handler(createSsrRpc("186b5d95031e12e99ea856ffe2445d45d57fd49f280182de70435208c077c24f"));
function RouteComponent() {
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);
  const {
    categories,
    transaction
  } = Route.useLoaderData();
  const handleSubmit = async (data) => {
    await updateTransaction({
      data: {
        id: transaction.id,
        amount: data.amount,
        transactionDate: format(data.transactionDate, "yyyy-MM-dd"),
        categoryId: data.categoryId,
        description: data.description
      }
    });
    toast.success("Success!", {
      description: "Transaction updated"
    });
    navigate({
      to: "/dashboard/transactions",
      search: {
        month: data.transactionDate.getMonth() + 1,
        year: data.transactionDate.getFullYear()
      }
    });
  };
  const handleDeleteConfirm = async () => {
    setDeleting(true);
    await deleteTransaction({
      data: {
        transactionId: transaction.id
      }
    });
    toast.success("Success!", {
      description: "Transaction deleted"
    });
    setDeleting(false);
    navigate({
      to: "/dashboard/transactions",
      search: {
        month: Number(transaction.transactionDate.split("-")[1]),
        year: Number(transaction.transactionDate.split("-")[0])
      }
    });
  };
  return /* @__PURE__ */ jsxs(Card, { className: "max-w-3xl mt-4", children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex justify-between", children: [
      /* @__PURE__ */ jsx("span", { children: "Edit Transaction" }),
      /* @__PURE__ */ jsxs(AlertDialog, { children: [
        /* @__PURE__ */ jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "destructive", size: "icon", children: /* @__PURE__ */ jsx(Trash2Icon, {}) }) }),
        /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Are you absolutely sure?" }),
            /* @__PURE__ */ jsx(AlertDialogDescription, { children: "This action cannot be undone. This transaction will be permanently deleted." })
          ] }),
          /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Cancel" }),
            /* @__PURE__ */ jsx(Button, { disabled: deleting, onClick: handleDeleteConfirm, variant: "destructive", children: "Delete" })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(TransactionForm, { defaultValues: {
      amount: Number(transaction.amount),
      categoryId: transaction.categoryId,
      description: transaction.description,
      transactionDate: new Date(transaction.transactionDate),
      transactionType: categories.find((category) => category.id === transaction.categoryId)?.type ?? "income"
    }, categories, onSubmit: handleSubmit }) })
  ] });
}
export {
  RouteComponent as component
};

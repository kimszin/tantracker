import { useNavigate, useLocation, ScriptOnce, createRootRoute, Outlet, HeadContent, Link, Scripts, createFileRoute, lazyRouteComponent, redirect, createRouter } from "@tanstack/react-router";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { T as TSS_SERVER_FUNCTION, g as getServerFnById, c as createServerFn } from "../server.js";
import { ChartColumnBigIcon, Loader2 } from "lucide-react";
import { Toaster } from "sonner";
import { ClerkProvider as ClerkProvider$1, SignedOut, SignInButton, SignUpButton, SignedIn, UserButton } from "@clerk/clerk-react";
import React__default, { useTransition, useEffect } from "react";
import { i as isClient } from "./index-CSLGDVeV.js";
import { g as getPublicEnvVariables } from "./env-CuBqDywz.js";
import { g as getGlobalStartContext } from "./auth-BkVoR3zB.js";
import { a as authMiddleware } from "./authMiddleware-BIs-Ehcl.js";
import z$1, { z } from "zod";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      "data-variant": variant,
      "data-size": size,
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
const createSsrRpc = (functionId, importer) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    const serverFn = await getServerFnById(functionId);
    return serverFn(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const getSignedUserId = createServerFn({
  method: "GET"
}).handler(createSsrRpc("eab96a50645ea712713dbb500fde513232d1a36055bbfe0c067fe3473b7e97cc"));
var ClerkOptionsCtx = React__default.createContext(void 0);
ClerkOptionsCtx.displayName = "ClerkOptionsCtx";
var ClerkOptionsProvider = (props) => {
  const { children, options } = props;
  return /* @__PURE__ */ jsx(ClerkOptionsCtx.Provider, { value: { value: options }, children });
};
var useAwaitableNavigate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const resolveFunctionsRef = React__default.useRef([]);
  const resolveAll = () => {
    resolveFunctionsRef.current.forEach((resolve) => resolve());
    resolveFunctionsRef.current.splice(0, resolveFunctionsRef.current.length);
  };
  const [_, startTransition] = useTransition();
  React__default.useEffect(() => {
    resolveAll();
  }, [location]);
  return (options) => {
    return new Promise((res) => {
      startTransition(() => {
        resolveFunctionsRef.current.push(res);
        res(navigate(options));
      });
    });
  };
};
var pickFromClerkInitState = (clerkInitState) => {
  const {
    __clerk_ssr_state,
    __publishableKey,
    __proxyUrl,
    __domain,
    __isSatellite,
    __signInUrl,
    __signUpUrl,
    __afterSignInUrl,
    __afterSignUpUrl,
    __clerkJSUrl,
    __clerkJSVersion,
    __telemetryDisabled,
    __telemetryDebug,
    __signInForceRedirectUrl,
    __signUpForceRedirectUrl,
    __signInFallbackRedirectUrl,
    __signUpFallbackRedirectUrl
  } = clerkInitState || {};
  return {
    clerkSsrState: __clerk_ssr_state,
    publishableKey: __publishableKey,
    proxyUrl: __proxyUrl,
    domain: __domain,
    isSatellite: !!__isSatellite,
    signInUrl: __signInUrl,
    signUpUrl: __signUpUrl,
    afterSignInUrl: __afterSignInUrl,
    afterSignUpUrl: __afterSignUpUrl,
    clerkJSUrl: __clerkJSUrl,
    clerkJSVersion: __clerkJSVersion,
    telemetry: {
      disabled: __telemetryDisabled,
      debug: __telemetryDebug
    },
    signInForceRedirectUrl: __signInForceRedirectUrl,
    signUpForceRedirectUrl: __signUpForceRedirectUrl,
    signInFallbackRedirectUrl: __signInFallbackRedirectUrl,
    signUpFallbackRedirectUrl: __signUpFallbackRedirectUrl
  };
};
var mergeWithPublicEnvs = (restInitState) => {
  return {
    ...restInitState,
    publishableKey: restInitState.publishableKey || getPublicEnvVariables().publishableKey,
    domain: restInitState.domain || getPublicEnvVariables().domain,
    isSatellite: restInitState.isSatellite || getPublicEnvVariables().isSatellite,
    signInUrl: restInitState.signInUrl || getPublicEnvVariables().signInUrl,
    signUpUrl: restInitState.signUpUrl || getPublicEnvVariables().signUpUrl,
    afterSignInUrl: restInitState.afterSignInUrl || getPublicEnvVariables().afterSignInUrl,
    afterSignUpUrl: restInitState.afterSignUpUrl || getPublicEnvVariables().afterSignUpUrl,
    clerkJSUrl: restInitState.clerkJSUrl || getPublicEnvVariables().clerkJsUrl,
    clerkJSVersion: restInitState.clerkJSVersion || getPublicEnvVariables().clerkJsVersion,
    signInForceRedirectUrl: restInitState.signInForceRedirectUrl,
    clerkJSVariant: restInitState.clerkJSVariant || getPublicEnvVariables().clerkJsVariant
  };
};
var SDK_METADATA = {
  name: "@clerk/tanstack-react-start",
  version: "0.29.2"
};
var awaitableNavigateRef = { current: void 0 };
function ClerkProvider({ children, ...providerProps }) {
  const awaitableNavigate = useAwaitableNavigate();
  const clerkInitialState = getGlobalStartContext()?.clerkInitialState ?? {};
  useEffect(() => {
    awaitableNavigateRef.current = awaitableNavigate;
  }, [awaitableNavigate]);
  const clerkInitState = isClient() ? window.__clerk_init_state : clerkInitialState;
  const { clerkSsrState, ...restInitState } = pickFromClerkInitState(clerkInitState?.__internal_clerk_state);
  const mergedProps = {
    ...mergeWithPublicEnvs(restInitState),
    ...providerProps
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ScriptOnce, { children: `window.__clerk_init_state = ${JSON.stringify(clerkInitialState)};` }),
    /* @__PURE__ */ jsx(ClerkOptionsProvider, { options: mergedProps, children: /* @__PURE__ */ jsx(
      ClerkProvider$1,
      {
        initialState: clerkSsrState,
        sdkMetadata: SDK_METADATA,
        routerPush: (to) => awaitableNavigateRef.current?.({
          to,
          replace: false
        }),
        routerReplace: (to) => awaitableNavigateRef.current?.({
          to,
          replace: true
        }),
        ...mergedProps,
        children
      }
    ) })
  ] });
}
ClerkProvider.displayName = "ClerkProvider";
const poppins100 = "/assets/100-jUHjCAl9.css";
const poppins200 = "/assets/200-C_kQi0bM.css";
const poppins300 = "/assets/300-Dql2scZv.css";
const poppins400 = "/assets/400-DSpZquNv.css";
const poppins500 = "/assets/500-BXkefx-V.css";
const poppins600 = "/assets/600-LyNPWYGW.css";
const poppins700 = "/assets/700-CwZnzum0.css";
const poppins800 = "/assets/800-CBcqeI8g.css";
const poppins900 = "/assets/900-C4vGDTD2.css";
const appCss = "/assets/globals-t0ukEU2G.css";
const Route$9 = createRootRoute({
  pendingMs: 0,
  notFoundComponent() {
    return /* @__PURE__ */ jsx("div", { className: "text-3xl text-center py-10 text-muted-foreground", children: "Oops! Page not found" });
  },
  beforeLoad: async () => {
    const userId = await getSignedUserId();
    return { userId };
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        title: "TanStack Start Starter"
      }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      },
      {
        rel: "stylesheet",
        href: poppins100
      },
      {
        rel: "stylesheet",
        href: poppins200
      },
      {
        rel: "stylesheet",
        href: poppins300
      },
      {
        rel: "stylesheet",
        href: poppins400
      },
      {
        rel: "stylesheet",
        href: poppins500
      },
      {
        rel: "stylesheet",
        href: poppins600
      },
      {
        rel: "stylesheet",
        href: poppins700
      },
      {
        rel: "stylesheet",
        href: poppins800
      },
      {
        rel: "stylesheet",
        href: poppins900
      }
    ]
  }),
  component: RootComponent
});
function RootComponent() {
  return /* @__PURE__ */ jsx(RootDocument, { children: /* @__PURE__ */ jsx(Outlet, {}) });
}
function RootDocument({ children }) {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsx(ClerkProvider, { children: /* @__PURE__ */ jsxs("html", { children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsxs("nav", { className: "bg-primary p-4 h-20 text-white flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex gap-1 items-center font-bold text-2xl", children: [
          /* @__PURE__ */ jsx(ChartColumnBigIcon, { className: "text-lime-500" }),
          "TanTracker"
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(SignedOut, { children: /* @__PURE__ */ jsxs("div", { className: "text-white flex items-center", children: [
            /* @__PURE__ */ jsx(Button, { asChild: true, variant: "link", className: "text-white", children: /* @__PURE__ */ jsx(SignInButton, {}) }),
            /* @__PURE__ */ jsx("div", { className: "w-px h-8 bg-zinc-700" }),
            /* @__PURE__ */ jsx(Button, { asChild: true, variant: "link", className: "text-white", children: /* @__PURE__ */ jsx(SignUpButton, {}) })
          ] }) }),
          /* @__PURE__ */ jsx(SignedIn, { children: /* @__PURE__ */ jsx(
            UserButton,
            {
              showName: true,
              appearance: {
                elements: {
                  userButtonAvatarBox: {
                    border: "1px solid white"
                  },
                  userButtonOuterIdentifier: {
                    color: "white"
                  }
                }
              },
              children: /* @__PURE__ */ jsx(UserButton.MenuItems, { children: /* @__PURE__ */ jsx(
                UserButton.Action,
                {
                  label: "Dashboard",
                  labelIcon: /* @__PURE__ */ jsx(ChartColumnBigIcon, { size: 16 }),
                  onClick: () => {
                    navigate({
                      to: "/dashboard"
                    });
                  }
                }
              ) })
            }
          ) })
        ] })
      ] }),
      children,
      /* @__PURE__ */ jsx(Toaster, { richColors: true }),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] }) });
}
const $$splitComponentImporter$8 = () => import("./_authed-CO2wOhBa.js");
const Route$8 = createFileRoute("/_authed")({
  beforeLoad: ({
    context
  }) => {
    if (!context.userId) {
      redirect({
        to: "/",
        throw: true
      });
    }
  },
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./index-BLSnxp0N.js");
const Route$7 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("animate-pulse rounded-md bg-accent", className),
      ...props
    }
  );
}
function LoadingSkeleton() {
  return /* @__PURE__ */ jsx(Skeleton, { className: "h-40 w-full rounded-lg" });
}
const schema$2 = z.object({
  year: z.number()
});
const getAnnualCashflow = createServerFn({
  method: "GET"
}).middleware([authMiddleware]).inputValidator((data) => schema$2.parse(data)).handler(createSsrRpc("bc9b647bc97dcd7ca224878c14fddd01f73a899f83a01bc0867013def24f9cba"));
const getRecentTransactions = createServerFn({
  method: "GET"
}).middleware([authMiddleware]).handler(createSsrRpc("2f3f7655acd83d5bd574f9171d7b52c29fc9db85fd59983491f894cbf23d5da5"));
const getTransactionYearsRange = createServerFn({
  method: "GET"
}).middleware([authMiddleware]).handler(createSsrRpc("205eb952798543f1039cfb4c22ab4f0a60931fa7ec7bf1a8a544c253c560e5f3"));
const $$splitComponentImporter$6 = () => import("./index-DaUq6DTj.js");
const today$2 = /* @__PURE__ */ new Date();
const searchSchema$1 = z.object({
  cfyear: z.number().min(today$2.getFullYear() - 100).max(today$2.getFullYear()).catch(today$2.getFullYear()).optional()
});
const Route$6 = createFileRoute("/_authed/dashboard/")({
  pendingComponent: () => /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto py-5", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-semibold pb-5", children: "Dashboard" }),
    /* @__PURE__ */ jsx(LoadingSkeleton, {})
  ] }),
  validateSearch: searchSchema$1,
  component: lazyRouteComponent($$splitComponentImporter$6, "component"),
  loaderDeps: ({
    search
  }) => ({
    cfyear: search.cfyear
  }),
  loader: async ({
    deps
  }) => {
    const [transactions, cashflow, yearsRange] = await Promise.all([getRecentTransactions(), getAnnualCashflow({
      data: {
        year: deps.cfyear ?? today$2.getFullYear()
      }
    }), getTransactionYearsRange()]);
    console.log({
      cashflow
    });
    return {
      cfyear: deps.cfyear ?? today$2.getFullYear(),
      cashflow,
      transactions,
      yearsRange
    };
  }
});
const $$splitComponentImporter$5 = () => import("./_layout-Bqr2LL8a.js");
const Route$5 = createFileRoute("/_authed/dashboard/transactions/_layout")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const today$1 = /* @__PURE__ */ new Date();
const schema$1 = z.object({
  month: z.number().min(1).max(12),
  year: z.number().min(today$1.getFullYear() - 100).max(today$1.getFullYear())
});
const getTransactionsByMonth = createServerFn({
  method: "GET"
}).middleware([authMiddleware]).inputValidator((data) => schema$1.parse(data)).handler(createSsrRpc("73db9b8f8ca13db555c5fc7a4808d289f416ff41ce3930b9580cce81716e11dd"));
const $$splitComponentImporter$4 = () => import("./_layout.index-CLsBUaDY.js");
const today = /* @__PURE__ */ new Date();
const searchSchema = z$1.object({
  month: z$1.coerce.number().min(1).max(12).catch(today.getMonth() + 1).optional(),
  year: z$1.coerce.number().min(today.getFullYear() - 100).max(today.getFullYear()).catch(today.getFullYear()).optional()
});
const Route$4 = createFileRoute("/_authed/dashboard/transactions/_layout/")({
  // pendingMs: 0,
  // pendingMinMs: 500,
  pendingComponent: () => /* @__PURE__ */ jsx("div", { className: "max-w-screen-xl mx-auto py-5", children: /* @__PURE__ */ jsx("h1", { className: "text-4xl font-semibold pb-5", children: "Transactions" }) }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component"),
  // 참고 (TanStack Start의 특징인 동형함수): 화면 내에서 메뉴를 클릭해서 이동할 때는
  // 브라우저(클라이언트 런타임)에서 Zod가 실행되지만,
  // 주소창에 직접 타자를 치고 엔터를 눌러 접속(SSR)할 때는
  // 서버(Node.js 런타임) 위에서 Zod가 대기하다가 먼저 실행됩니다.
  // 즉 **"언제 어디서든 실제로 앱이 돌아가는(런타임) 그 위치(환경)"**에서 작동합니다!
  validateSearch: searchSchema,
  loaderDeps: ({
    search
  }) => {
    const date = /* @__PURE__ */ new Date();
    return {
      month: search.month ?? date.getMonth() + 1,
      year: search.year ?? date.getFullYear()
    };
  },
  loader: async ({
    deps
  }) => {
    const yearsRange = await getTransactionYearsRange();
    const transactions = await getTransactionsByMonth({
      data: {
        month: deps.month,
        year: deps.year
      }
    });
    return {
      month: deps.month,
      year: deps.year,
      yearsRange,
      transactions
    };
  }
});
const $$splitComponentImporter$3 = () => import("./_layout-BgFcGE4p.js");
const Route$3 = createFileRoute("/_authed/dashboard/transactions/new/_layout")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./_layout-DohE8Cbe.js");
const Route$2 = createFileRoute("/_authed/dashboard/transactions/$transactionId/_layout")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const getCategories = createServerFn({
  method: "GET"
}).handler(createSsrRpc("ae6103528305680636953252dc7087bd31dfe45b49a549ebfb9d6f660aae56e6"));
const $$splitComponentImporter$1 = () => import("./_layout.index-DnihX7YI.js");
const Route$1 = createFileRoute("/_authed/dashboard/transactions/new/_layout/")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component"),
  loader: async () => {
    const categories = await getCategories();
    return {
      categories
    };
  }
});
const schema = z.object({
  transactionId: z.number()
});
const getTransaction = createServerFn({
  method: "GET"
}).middleware([authMiddleware]).inputValidator((data) => schema.parse(data)).handler(createSsrRpc("ae566669edb1443acf71f586a477a49421af0181134ca0a94b4c5f16bfcd5753"));
const $$splitErrorComponentImporter = () => import("./_layout.index-Bm7NOI5C.js");
const $$splitComponentImporter = () => import("./_layout.index-R-Y7X9a8.js");
const Route = createFileRoute("/_authed/dashboard/transactions/$transactionId/_layout/")({
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  pendingComponent: () => /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center p-8", children: /* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-muted-foreground" }) }),
  // loader 에러뿐만 아니라, 화면을 그리는 도중(렌더링 과정)에 발생하는 모든 에러까지
  // 함께 잡아먹는 든든한 방어막(Error Boundary) 역할을 합니다.
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
  loader: async ({
    params
  }) => {
    const [categories, transaction] = await Promise.all([getCategories(), getTransaction({
      data: {
        transactionId: Number(params.transactionId)
      }
    })]);
    if (!transaction) {
      throw new Error("Transaction not found");
    }
    return {
      categories,
      transaction
    };
  }
});
const AuthedRoute = Route$8.update({
  id: "/_authed",
  getParentRoute: () => Route$9
});
const IndexRoute = Route$7.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$9
});
const AuthedDashboardIndexRoute = Route$6.update({
  id: "/dashboard/",
  path: "/dashboard/",
  getParentRoute: () => AuthedRoute
});
const AuthedDashboardTransactionsLayoutRoute = Route$5.update({
  id: "/dashboard/transactions/_layout",
  path: "/dashboard/transactions",
  getParentRoute: () => AuthedRoute
});
const AuthedDashboardTransactionsLayoutIndexRoute = Route$4.update({
  id: "/",
  path: "/",
  getParentRoute: () => AuthedDashboardTransactionsLayoutRoute
});
const AuthedDashboardTransactionsNewLayoutRoute = Route$3.update({
  id: "/dashboard/transactions/new/_layout",
  path: "/dashboard/transactions/new",
  getParentRoute: () => AuthedRoute
});
const AuthedDashboardTransactionsTransactionIdLayoutRoute = Route$2.update({
  id: "/dashboard/transactions/$transactionId/_layout",
  path: "/dashboard/transactions/$transactionId",
  getParentRoute: () => AuthedRoute
});
const AuthedDashboardTransactionsNewLayoutIndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => AuthedDashboardTransactionsNewLayoutRoute
});
const AuthedDashboardTransactionsTransactionIdLayoutIndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => AuthedDashboardTransactionsTransactionIdLayoutRoute
});
const AuthedDashboardTransactionsLayoutRouteChildren = {
  AuthedDashboardTransactionsLayoutIndexRoute
};
const AuthedDashboardTransactionsLayoutRouteWithChildren = AuthedDashboardTransactionsLayoutRoute._addFileChildren(
  AuthedDashboardTransactionsLayoutRouteChildren
);
const AuthedDashboardTransactionsTransactionIdLayoutRouteChildren = {
  AuthedDashboardTransactionsTransactionIdLayoutIndexRoute
};
const AuthedDashboardTransactionsTransactionIdLayoutRouteWithChildren = AuthedDashboardTransactionsTransactionIdLayoutRoute._addFileChildren(
  AuthedDashboardTransactionsTransactionIdLayoutRouteChildren
);
const AuthedDashboardTransactionsNewLayoutRouteChildren = {
  AuthedDashboardTransactionsNewLayoutIndexRoute
};
const AuthedDashboardTransactionsNewLayoutRouteWithChildren = AuthedDashboardTransactionsNewLayoutRoute._addFileChildren(
  AuthedDashboardTransactionsNewLayoutRouteChildren
);
const AuthedRouteChildren = {
  AuthedDashboardIndexRoute,
  AuthedDashboardTransactionsLayoutRoute: AuthedDashboardTransactionsLayoutRouteWithChildren,
  AuthedDashboardTransactionsTransactionIdLayoutRoute: AuthedDashboardTransactionsTransactionIdLayoutRouteWithChildren,
  AuthedDashboardTransactionsNewLayoutRoute: AuthedDashboardTransactionsNewLayoutRouteWithChildren
};
const AuthedRouteWithChildren = AuthedRoute._addFileChildren(AuthedRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AuthedRoute: AuthedRouteWithChildren
};
const routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  const router2 = createRouter({
    routeTree,
    scrollRestoration: true
  });
  return router2;
}
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Button as B,
  Route$6 as R,
  Route$4 as a,
  createSsrRpc as b,
  cn as c,
  Route$1 as d,
  Route as e,
  buttonVariants as f,
  router as r
};

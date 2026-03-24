import { jsx } from "react/jsx-runtime";
import { Outlet } from "@tanstack/react-router";
function RouteComponent() {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Outlet, {}) });
}
export {
  RouteComponent as component
};

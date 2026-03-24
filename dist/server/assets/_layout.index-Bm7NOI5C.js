import { jsx } from "react/jsx-runtime";
const SplitErrorComponent = ({
  error
}) => {
  console.log(error);
  return /* @__PURE__ */ jsx("div", { className: "text-3xl text-muted-foreground", children: "Oops! Transaction not found." });
};
export {
  SplitErrorComponent as errorComponent
};

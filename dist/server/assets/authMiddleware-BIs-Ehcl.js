import { a as auth } from "./auth-BkVoR3zB.js";
import { c as createMiddleware } from "./createMiddleware-CRzJRBrm.js";
const authMiddleware = createMiddleware().server(async ({ next }) => {
  const user = await auth();
  if (!user?.userId) {
    throw new Error("Unauthorized");
  }
  const result = await next({
    context: {
      userId: user.userId
    }
  });
  return result;
});
export {
  authMiddleware as a
};

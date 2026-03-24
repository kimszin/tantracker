import { createServerFn } from "@tanstack/react-start"
import { auth } from "@clerk/tanstack-react-start/server"

export const getSignedUserId = createServerFn({
  method: "GET",
}).handler(async () => {
  const { isAuthenticated, userId } = await auth()

  if (!isAuthenticated) {
    return null
  }

  return { userId }
})

import { db } from "@/src/db"
import { categoriesTable } from "@/src/db/schema"
import { createServerFn } from "@tanstack/react-start"

export const getCategories = createServerFn({
  method: "GET",
}).handler(async () => {
  const categories = await db.select().from(categoriesTable)
  return categories
})

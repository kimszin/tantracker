import { drizzle } from "drizzle-orm/neon-http";
import { pgTable, text, integer, date, numeric } from "drizzle-orm/pg-core";
const db = drizzle(process.env.DATABASE_URL);
const categoriesTable = pgTable("categories", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  type: text({
    enum: ["income", "expense"]
  }).notNull()
});
const transactionsTable = pgTable("transactions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: text("user_id").notNull(),
  description: text().notNull(),
  amount: numeric().notNull(),
  transactionDate: date("transaction_date").notNull(),
  categoryId: integer("category_id").references(() => categoriesTable.id).notNull()
});
export {
  categoriesTable as c,
  db as d,
  transactionsTable as t
};

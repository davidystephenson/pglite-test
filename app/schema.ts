import { pgTable, numeric, integer, serial, varchar } from "drizzle-orm/pg-core";

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  date: varchar("date", { length: 50 }),
  arrivalDate: varchar("arrival_date", { length: 50 })
    .$type<string | null>()
    .default(null),
  type: varchar("type", { length: 50 }).$type<string | null>().default(null), // e.g. payout, reimbursement, refund
  confirmationCode: varchar("confirmation_code", { length: 50 })
    .$type<string | null>()
    .default(null),
  bookingDate: varchar("booking_date", { length: 50 })
    .$type<string | null>()
    .default(null),
  startDate: varchar("start_date", { length: 50 })
    .$type<string | null>()
    .default(null),
  endDate: varchar("end_date", { length: 50 })
    .$type<string | null>()
    .default(null),
  nights: integer("nights").$type<number | null>().default(null),
  shortTerm: varchar("short_term").default(""),
  guest: varchar("guest", { length: 100 }).$type<string | null>().default(null),
  listing: varchar("listing", { length: 100 })
    .$type<string | null>()
    .default(null),
  details: varchar("details", { length: 255 })
    .$type<string | null>()
    .default(null),
  amount: numeric("amount").$type<number | null>().default(null),
  paidOut: numeric("paid_out").$type<number | null>().default(null),
  serviceFee: numeric("service_fee").$type<number | null>().default(null),
  fastPayFee: numeric("fast_pay_fee").$type<number | null>().default(null),
  cleaningFee: numeric("cleaning_fee").$type<number | null>().default(null),
  grossEarnings: numeric("gross_earnings").$type<number | null>().default(null),
  totalOccupancyTaxes: numeric("total_occupancy_taxes")
    .$type<number | null>()
    .default(null),
  earningsYear: integer("earnings_year").$type<number | null>().default(null),
  countyTax: numeric("county_tax").$type<number | null>().default(null),
  stateTax: numeric("state_tax").$type<number | null>().default(null),
});

'use client'

import { PGlite } from "@electric-sql/pglite"
import { live, PGliteWithLive } from "@electric-sql/pglite/live"
import { PGliteProvider } from "@electric-sql/pglite-react"
import { ReactNode, useState, useEffect } from "react"
import { Repl } from "@electric-sql/pglite-repl"

const query = `
     CREATE TABLE IF NOT EXISTS transactions(
      id SERIAL PRIMARY KEY,
        date VARCHAR(50),
        arrival_date VARCHAR(50),
        type VARCHAR(50),
        confirmation_code VARCHAR(50),
        booking_date VARCHAR(50),
        start_date VARCHAR(50),
        end_date VARCHAR(50),
        short_term VARCHAR(50),
        nights INTEGER,
        guest VARCHAR(255),
        listing VARCHAR(255),
        details TEXT,
        amount NUMERIC,
        paid_out NUMERIC,
        service_fee NUMERIC,
        fast_pay_fee NUMERIC,
        cleaning_fee NUMERIC,
        gross_earnings NUMERIC,
        total_occupancy_taxes NUMERIC,
        earnings_year INTEGER,
        county_tax NUMERIC,
        state_tax NUMERIC
      );
  `

export default function Providers(props: {
  children: ReactNode
}) {
  const [db, setDb] = useState<PGliteWithLive>()

  useEffect(() => {
    const initDb = async () => {
      const database = await PGlite.create({
        dataDir: "idb://rentalTaxesDB",
        extensions: { live },
      })
      setDb(database)
      await database.exec(query)
    }

    initDb()
  }, [])

  if (!db) {
    return <div>Loading database...</div>
  }

  async function handleClick () {
    if (!db) return
    await db.exec(`
      INSERT INTO transactions (date, arrival_date, type, confirmation_code, booking_date, start_date, end_date, short_term, nights, guest, listing, details, amount, paid_out, service_fee, fast_pay_fee, cleaning_fee, gross_earnings, total_occupancy_taxes, earnings_year, county_tax, state_tax)
      VALUES ('2022-01-01', '2022-01-02', 'hotel', 'CONF123', '2022-01-01', '2022-01-01', '2022-01-02', 'yes', 1, 'John Doe', 'Hotel XYZ', 'Test booking', 100, 90, 10, 5, 5, 100, 10, 2022, 5, 5)
    `)
  }

  return (
    <PGliteProvider db={db}>
      <Repl pg={db} />
      <button onClick={handleClick}>Add Transaction</button>
      {props.children}
    </PGliteProvider>
  )
}
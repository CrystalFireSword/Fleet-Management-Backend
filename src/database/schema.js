import { sql } from "drizzle-orm"
import { check, integer, numeric, pgTable, text, timestamp } from "drizzle-orm/pg-core";

const timestamps = {
    updated_at: timestamp(),
    created_at: timestamp().defaultNow().notNull(),
    deleted_at: timestamp(),
}

export const vehicles_table = pgTable("vehicles",
    {
        vin: text({ length: 17 }).primaryKey(),
        manufacturer: text().notNull(),
        model: text().notNull(),
        fleet_id: text().notNull(),
        o_info: text(),
        reg_status: text(),
        fleet_type: text(),
        ...timestamps
    },
    (table) => [
        check("reg_status_check", sql`${table.reg_status} IN ('active', 'maintenance', 'decommissioned')`),
        check("fleet_type_check", sql`${table.fleet_type} IN ('corporate', 'rental', 'personal')`)
    ]
)

export const telemetry_table = pgTable("telemetry",
    {
        tid: integer().primaryKey().generatedAlwaysAsIdentity({ name: "tid", startsWith: 1, increment: 1, minValue: 1 }),
        vin: text({ length: 17 }).references(() => vehicles_table.vin),
        latitude: numeric(),
        longitude: numeric(),
        speed: numeric(),
        engine_status: text(),
        fuel_or_battery_level: numeric(),
        odometer: numeric(),
        diagnostic_code: numeric(),
        timestamp: timestamp(),
        ...timestamps
    },
    (table) => [
        check("engine_status_check", sql`${table.engine_status} IN ('on', 'off', 'idle')`),
    ]
)

export const alert_table = pgTable("alerts", {
    alert_id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "alert_id", startsWith: 1, increment: 1, minValue: 1 }),
    type: text(),
    vin: text({ length: 17 }).references(() => vehicles_table.vin),
    value: numeric(),
    severity: text(),
    ...timestamps
},
    (table) => [
        check("alert_type_check", sql`${table.type} IN ('low fuel or battery', 'speed violation', 'other')`)
    ])
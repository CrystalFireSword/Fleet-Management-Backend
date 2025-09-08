import { time } from "drizzle-orm/mysql-core";
import db from "../database/db.js"
import { telemetry_table } from "../database/schema.js";
import { like, and, eq, sql, gte } from 'drizzle-orm';
import { QueryBuilder, timestamp } from 'drizzle-orm/pg-core';

export async function insert_telemetry_one_vehicle(telemetry_data) {
    try {
        for (let telemetry of telemetry_data){
            telemetry["timestamp"] = new Date(telemetry["timestamp"])
        }
        const inserted = await db.insert(telemetry_table).values(telemetry_data);
        return inserted;
    }
    catch(error){
        throw error
    }
}

export async function insert_telemetry_multiple_vehicles(telemetry_data) {
    try {
         for (let telemetry of telemetry_data){
            telemetry["timestamp"] = new Date(telemetry["timestamp"])
        }
        const inserted = await db.insert(telemetry_table).values(telemetry_data);
        return inserted;
    }
    catch(error){
        throw error
    }
}
// const { time_start, 
//         time_end, 
//         fuel_min,
//         fuel_max,
//         diagnostic_codes = [],
//         speed_min,
//         speed_max
//         engine_status
//             } = req.query

export async function query_telemetry_history(telemetry_filters, vin=null) {
    try {
        const filtered_columns = []
        if (telemetry_filters["vin"]){
            filtered_columns.push(like(telemetry_table.vin, `%${telemetry_filters["vin"]}%`))
        }
        // if (Array.isArray(telemetry_filters["diagnostic_codes"])){
        //     console.log("diagnostic_codes")
        //     telemetry_filters["diagnostic_codes"] = JSON.parse(telemetry_filters["diagnostic_codes"])
        //     for (const dc of telemetry_filters["diagnostic_codes"]){
        //         filtered_columns.push(eq(telemetry_table.diagnostic_code, `${dc}`))
        //     }
        // }
        if (telemetry_filters["engine_status"]){
            filtered_columns.push(like(telemetry_table.engine_status, `%${telemetry_filters["engine_status"]}%`))
        }
        if (telemetry_filters["time_start"]){
            filtered_columns.push(sql`${telemetry_table.timestamp} >= ${telemetry_filters["time_start"]} `)
        }
        if (telemetry_filters["time_end"]){
            filtered_columns.push(sql`${telemetry_table.timestamp} <= ${telemetry_filters["time_end"]} `)
        }
        if (telemetry_filters["fuel_min"]){
            filtered_columns.push(sql`${telemetry_table.fuel_or_battery_level} >= ${telemetry_filters["fuel_min"]} `)
        }
        if (telemetry_filters["fuel_max"]){
            filtered_columns.push(sql`${telemetry_table.fuel_or_battery_level} <= ${telemetry_filters["fuel_max"]} `)
        }
        if (telemetry_filters["speed_min"]){
            filtered_columns.push(sql`${telemetry_table.speed} >= ${telemetry_filters["speed_min"]} `)
        }
        if (telemetry_filters["speed_max"]){
            filtered_columns.push(sql`${telemetry_table.speed} <= ${telemetry_filters["speed_max"]} `)
        }

        let query = db
            .select()
            .from(telemetry_table)
            .where(and(...filtered_columns))
            .orderBy(telemetry_table.tid);

        const filtered_data = await query;
        return filtered_data
    }
    catch(error){
        throw error
    }
}

// const { days,
//         fuel_min,
//         fuel_max,
//         diagnostic_codes = [],
//         speed_min,
//         speed_max
//         engine_status
//       } = req.query


export async function query_telemetry_latest(telemetry_filters, vin=null) {
    try {
        const filtered_columns = []
        if (telemetry_filters["vin"]){
            filtered_columns.push(eq(telemetry_table.vin, `${telemetry_filters["vin"]}`))
        }
        if (telemetry_filters["engine_status"]){
            filtered_columns.push(eq(telemetry_table.engine_status, `${telemetry_filters["engine_status"]}`))
        }
        if (telemetry_filters["days"]){
            filtered_columns.push(gte(telemetry_table.timestamp, sql.raw(`NOW() - INTERVAL '${telemetry_filters["days"]} days'`) ))
        }
        if (telemetry_filters["fuel_min"]){
            filtered_columns.push(sql`${telemetry_table.fuel_or_battery_level} >= ${telemetry_filters["fuel_min"]} `)
        }
        if (telemetry_filters["fuel_max"]){
            filtered_columns.push(sql`${telemetry_table.fuel_or_battery_level} <= ${telemetry_filters["fuel_max"]} `)
        }
        if (telemetry_filters["speed_min"]){
            filtered_columns.push(sql`${telemetry_table.speed} >= ${telemetry_filters["speed_min"]} `)
        }
        if (telemetry_filters["speed_max"]){
            filtered_columns.push(sql`${telemetry_table.speed} <= ${telemetry_filters["speed_max"]} `)
        }

        let query = db
            .select()
            .from(telemetry_table)
            .where(and(...filtered_columns))
            .orderBy(telemetry_table.tid);

        if (telemetry_filters["limit"]){
            query = query.limit(parseInt(telemetry_filters["limit"]))
        }
        if (telemetry_filters["offset"]){
            query = query.offset(parseInt(telemetry_filters["offset"]))
        }
        const filtered_data = await query;
        return filtered_data
    }
    catch(error){
        throw error
    }
}

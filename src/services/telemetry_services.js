import { time } from "drizzle-orm/mysql-core";
import db from "../database/db.js"
import { telemetryTable } from "../database/schema.js";
import { like, and, eq, sql, gte } from 'drizzle-orm';
import { QueryBuilder, timestamp } from 'drizzle-orm/pg-core';

export async function insertOneTelemetryRecord(telemetryData) {
    try {
        for (let telemetry of telemetryData){
            telemetry["timestamp"] = new Date(telemetry["timestamp"])
        }
        const inserted = await db.insert(telemetryTable).values(telemetryData);
        return inserted;
    }
    catch(error){
        throw error
    }
}

export async function insertManyTelemetryRecords(telemetryData) {
    try {
         for (let telemetry of telemetryData){
            telemetry["timestamp"] = new Date(telemetry["timestamp"])
        }
        const inserted = await db.insert(telemetryTable).values(telemetryData);
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

export async function getFilteredTelemetryHistory(telemetryFilters, vin=null) {
    try {
        const filteredColumns = []
        if (telemetryFilters["vin"]){
            filteredColumns.push(eq(telemetryTable.vin, `${telemetryFilters["vin"]}`))
        }
        // if (Array.isArray(telemetryFilters["diagnostic_codes"])){
        //     console.log("diagnostic_codes")
        //     telemetryFilters["diagnostic_codes"] = JSON.parse(telemetryFilters["diagnostic_codes"])
        //     for (const dc of telemetryFilters["diagnostic_codes"]){
        //         filteredColumns.push(eq(telemetryTable.diagnostic_code, `${dc}`))
        //     }
        // }
        if (telemetryFilters["engine_status"]){
            filteredColumns.push(eq(telemetryTable.engine_status, `${telemetryFilters["engine_status"]}`))
        }
        if (telemetryFilters["time_start"]){
            filteredColumns.push(sql`${telemetryTable.timestamp} >= ${telemetryFilters["time_start"]} `)
        }
        if (telemetryFilters["time_end"]){
            filteredColumns.push(sql`${telemetryTable.timestamp} <= ${telemetryFilters["time_end"]} `)
        }
        if (telemetryFilters["fuel_min"]){
            filteredColumns.push(sql`${telemetryTable.fuel_or_battery_level} >= ${telemetryFilters["fuel_min"]} `)
        }
        if (telemetryFilters["fuel_max"]){
            filteredColumns.push(sql`${telemetryTable.fuel_or_battery_level} <= ${telemetryFilters["fuel_max"]} `)
        }
        if (telemetryFilters["speed_min"]){
            filteredColumns.push(sql`${telemetryTable.speed} >= ${telemetryFilters["speed_min"]} `)
        }
        if (telemetryFilters["speed_max"]){
            filteredColumns.push(sql`${telemetryTable.speed} <= ${telemetryFilters["speed_max"]} `)
        }

        let query = db
            .select()
            .from(telemetryTable)
            .where(and(...filteredColumns))
            .orderBy(telemetryTable.tid);

        const filteredData = await query;
        return filteredData
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


export async function getFilteredTelemetryLatest(telemetryFilters, vin=null) {
    try {
        const filteredColumns = []
        if (telemetryFilters["vin"]){
            filteredColumns.push(eq(telemetryTable.vin, `${telemetryFilters["vin"]}`))
        }
        if (telemetryFilters["engine_status"]){
            filteredColumns.push(eq(telemetryTable.engine_status, `${telemetryFilters["engine_status"]}`))
        }
        if (telemetryFilters["days"]){
            filteredColumns.push(gte(telemetryTable.timestamp, sql.raw(`NOW() - INTERVAL '${telemetryFilters["days"]} days'`) ))
        }
        if (telemetryFilters["fuel_min"]){
            filteredColumns.push(sql`${telemetryTable.fuel_or_battery_level} >= ${telemetryFilters["fuel_min"]} `)
        }
        if (telemetryFilters["fuel_max"]){
            filteredColumns.push(sql`${telemetryTable.fuel_or_battery_level} <= ${telemetryFilters["fuel_max"]} `)
        }
        if (telemetryFilters["speed_min"]){
            filteredColumns.push(sql`${telemetryTable.speed} >= ${telemetryFilters["speed_min"]} `)
        }
        if (telemetryFilters["speed_max"]){
            filteredColumns.push(sql`${telemetryTable.speed} <= ${telemetryFilters["speed_max"]} `)
        }

        let query = db
            .select()
            .from(telemetryTable)
            .where(and(...filteredColumns))
            .orderBy(telemetryTable.tid);

        if (telemetryFilters["limit"]){
            query = query.limit(parseInt(telemetryFilters["limit"]))
        }
        if (telemetryFilters["offset"]){
            query = query.offset(parseInt(telemetryFilters["offset"]))
        }
        const filteredData = await query;
        return filteredData
    }
    catch(error){
        throw error
    }
}

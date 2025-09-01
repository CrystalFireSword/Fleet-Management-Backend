import db from "../database/db.js"
import { vehicles_table } from "../database/schema.js";
import { like, and, eq, sql } from 'drizzle-orm';
import { QueryBuilder } from 'drizzle-orm/pg-core';
// get ALL vehicles

const qb = new QueryBuilder();
export async function get_all_vehicles() {
    try {
        const vehicles = await db
            .select()
            .from(vehicles_table)
            .orderBy(vehicles_table.col_id);
        return vehicles;
    }
    catch (error) {
        throw error
    }
}

// get specific vehicles based on query parameter values
export async function get_vehicles(vehicle_data, limit, offset) {
    try {
        // removing undefined params
        const filtered_columns = []
        for (const column of Object.keys(vehicle_data)) {
            if (vehicle_data[column]) {
                filtered_columns.push(like(vehicles_table[column], `%${vehicle_data[column]}%`))
            }
        }
        // select based on filters
        let query = db
            .select()
            .from(vehicles_table)
            .where(and(...filtered_columns))
            .orderBy(vehicles_table.col_id);

        if (limit){
            query = query.limit(parseInt(limit))
        }
        if (offset){
            query = query.offset(parseInt(offset))
        }
        const vehicles = await query;
        return vehicles
    
    }
    catch (error) {
        throw error
    }
}

// insert vehicles into the vehicles table in the db
export async function insert_vehicles(vehicle_data) {
    try {
        const vehicles = await db.insert(vehicles_table).values(vehicle_data);
        return vehicles;
    } catch (error) {
        throw error
    }
}

// update vehicles in the db
export async function update_vehicles(vehicle_data) {
    try {
        // removing undefined params
        const filtered_columns = {}
        for (const column of Object.keys(vehicle_data)) {
            if (vehicle_data[column]) {
                filtered_columns[column] = vehicle_data[column];
            }
        }
        let date = new Date()
        filtered_columns["updated_at"]= date
        // update based on column values
        const vehicles = await db
            .update(vehicles_table)
            .set(filtered_columns)
            .where(eq(vehicles_table.vin, vehicle_data["vin"]))
        return vehicles;
    }
    catch (error) {
        throw error
    }
}

// delete vehicles from the db
export async function delete_vehicle_by_vin(vin) {
    try {
        const vehicles = await db
            .delete(vehicles_table)
            .where(eq(vehicles_table.vin, vin));
        return vehicles;
    }
    catch (error) {
        throw error
    }
}

export async function delete_vehicles(vehicle_data) {
    try {
        const filtered_columns = []
        for (const column of Object.keys(vehicle_data)) {
            if (vehicle_data[column]) {
                filtered_columns.push(like(vehicles_table[column], `%${vehicle_data[column]}%`))
            }
        }
        const vehicles = await db
            .delete(vehicles_table)
            .where(and(...filtered_columns));
        return vehicles;
    }
    catch (error) {
        throw error
    }
}


export default { get_all_vehicles, get_vehicles, insert_vehicles, delete_vehicles }
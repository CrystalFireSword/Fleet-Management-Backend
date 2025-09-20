import db from "../database/db.js"
import { vehiclesTable } from "../database/schema.js";
import { like, and, eq, sql } from 'drizzle-orm';
import { QueryBuilder } from 'drizzle-orm/pg-core';
// get ALL vehicles

const qb = new QueryBuilder();
export async function getAllVehicles() {
    try {
        const vehicles = await db
            .select()
            .from(vehiclesTable)
            .orderBy(vehiclesTable.col_id);
        return vehicles;
    }
    catch (error) {
        throw error
    }
}

// get specific vehicles based on query parameter values
export async function getFilteredVehicles(vehicleData, limit, offset) {
    try {
        // removing undefined params
        const filteredColumns = []
        for (const column of Object.keys(vehicleData)) {
            if (vehicleData[column]) {
                filteredColumns.push(eq(vehiclesTable[column], `${vehicleData[column]}`))
            }
        }
        // select based on filters
        let query = db
            .select()
            .from(vehiclesTable)
            .where(and(...filteredColumns))
            .orderBy(vehiclesTable.col_id);

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
export async function insertVehicles(vehicleData) {
    try {
        const vehicles = await db.insert(vehiclesTable).values(vehicleData);
        return vehicles;
    } catch (error) {
        throw error
    }
}

// update vehicles in the db
export async function updateVehicles(vehicleData) {
    try {
        // removing undefined params
        const filteredColumns = {}
        for (const column of Object.keys(vehicleData)) {
            if (vehicleData[column]) {
                filteredColumns[column] = vehicleData[column];
            }
        }
        let date = new Date()
        filteredColumns["updated_at"]= date
        // update based on column values
        const vehicles = await db
            .update(vehiclesTable)
            .set(filteredColumns)
            .where(eq(vehiclesTable.vin, vehicleData["vin"]))
        return vehicles;
    }
    catch (error) {
        throw error
    }
}

// delete vehicles from the db
export async function deleteVehicleByVin(vin) {
    try {
        const vehicles = await db
            .delete(vehiclesTable)
            .where(eq(vehiclesTable.vin, vin));
        return vehicles;
    }
    catch (error) {
        throw error
    }
}

export async function deleteFilteredVehicles(vehicleData) {
    try {
        const filteredColumns = []
        for (const column of Object.keys(vehicleData)) {
            if (vehicleData[column]) {
                filteredColumns.push(eq(vehiclesTable[column], `${vehicleData[column]}`))
            }
        }
        const vehicles = await db
            .delete(vehiclesTable)
            .where(and(...filteredColumns));
        return vehicles;
    }
    catch (error) {
        throw error
    }
}


export default { getAllVehicles, getFilteredVehicles, insertVehicles, deleteFilteredVehicles }
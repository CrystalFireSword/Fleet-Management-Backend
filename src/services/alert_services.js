import db from "../database/db.js"
import { alertTable } from "../database/schema.js";
import { like, and, eq, sql } from 'drizzle-orm';
import { QueryBuilder } from 'drizzle-orm/pg-core';


const qb = new QueryBuilder();


// get specific vehicles based on query parameter values
export async function getAlertsByFilters(alertData, limit=undefined, offset=undefined, alert_id=undefined) {
    try {
        // removing undefined params
        const filteredColumns = []
        for (const column of Object.keys(alertData)) {
            if (alertData[column]) {
                filteredColumns.push(eq(alertTable[column], alertData[column]))
            }
        }
        if (alert_id){
            filteredColumns.push(eq(alertTable.alert_id, parseInt(alert_id)))
        }
        
        // select based on filters
        let query = db
            .select()
            .from(alertTable)
            .where(and(...filteredColumns))
            .orderBy(alertTable.alert_id);

        if (limit){
            query = query.limit(parseInt(limit))
        }
        if (offset){
            query = query.offset(parseInt(offset))
        }
        const alerts = await query;
        return alerts
    
    }
    catch (error) {
        throw error
    }
}

export async function getAlertsByID(alert_id) {
    try {
        let query = db
            .select()
            .from(alertTable)
            .where(eq(alertTable.alert_id, alert_id))
            .orderBy(alertTable.alert_id);

        const alerts = await query;
        return alerts
    
    }
    catch (error) {
        throw error
    }
}
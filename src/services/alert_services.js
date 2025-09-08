import db from "../database/db.js"
import { alert_table } from "../database/schema.js";
import { like, and, eq, sql } from 'drizzle-orm';
import { QueryBuilder } from 'drizzle-orm/pg-core';


const qb = new QueryBuilder();


// get specific vehicles based on query parameter values
export async function query_alerts(alert_data, limit=undefined, offset=undefined, alert_id=undefined) {
    try {
        // removing undefined params
        const filtered_columns = []
        for (const column of Object.keys(alert_data)) {
            if (alert_data[column]) {
                filtered_columns.push(eq(alert_table[column], alert_data[column]))
            }
        }
        if (alert_id){
            filtered_columns.push(eq(alert_table.alert_id, parseInt(alert_id)))
        }
        
        // select based on filters
        let query = db
            .select()
            .from(alert_table)
            .where(and(...filtered_columns))
            .orderBy(alert_table.alert_id);

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

export async function query_alert_by_aid(alert_id) {
    try {
        let query = db
            .select()
            .from(alert_table)
            .where(eq(alert_table.alert_id, alert_id))
            .orderBy(alert_table.alert_id);

        const alerts = await query;
        return alerts
    
    }
    catch (error) {
        throw error
    }
}
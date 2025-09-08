import db from "../database/db.js"

export async function active_count(fleet_id){
    const active_vehicles_result = (await db.execute(`SELECT COUNT(DISTINCT T.vin) FROM TELEMETRY T JOIN VEHICLES V ON T.vin = V.vin WHERE V.fleet_id = '${fleet_id}' AND T.TIMESTAMP > NOW() - INTERVAL '1 DAY';`))
    const active_vehicles = active_vehicles_result.rows[0].count
    const total_vehicles_result = (await db.execute(`SELECT COUNT(DISTINCT vin) FROM VEHICLES WHERE fleet_id = '${fleet_id}';`))
    const total_vehicles = total_vehicles_result.rows[0].count
    const inactive_vehicles = total_vehicles-active_vehicles
    return {active_vehicles:parseInt(active_vehicles), inactive_vehicles:parseInt(inactive_vehicles), total_vehicles: parseInt(total_vehicles)};

}

// calculates the average fuel or battery level of a fleet based on the fuel/battery level value recorded in the last telemetry value recorded for a given vin in the fleet
export async function average_fuel_or_battery_level(fleet_id){
    try{
    const average_fuel_or_battery_level = await db.execute(`SELECT AVG(NT.fuel_or_battery_level) as average_fuel_or_battery_level FROM (
    SELECT DISTINCT T.vin, T.fuel_or_battery_level FROM TELEMETRY T JOIN VEHICLES V ON T.vin = V.vin WHERE V.fleet_id='${fleet_id}' AND T.TIMESTAMP=(SELECT MAX(TIMESTAMP) FROM TELEMETRY WHERE VIN = T.VIN)) AS NT;`)
    return (average_fuel_or_battery_level.rows[0]);
    }
    catch(error){
        throw error
    }
}

export async function total_distance(fleet_id){
    try{
    const twenty_four_total_distance = await db.execute(`SELECT TAB1.LATEST_ODO - TAB2.EARLY_ODO AS total_distance FROM (SELECT SUM(NT.ODO) AS LATEST_ODO FROM (SELECT DISTINCT t.vin, t.timestamp, MAX(t.odometer) AS ODO FROM TELEMETRY T JOIN VEHICLES V ON T.vin = V.vin WHERE V.fleet_id = '${fleet_id}' group by (t.vin,t.timestamp) having T.TIMESTAMP = (SELECT TIMESTAMP FROM TELEMETRY WHERE VIN = T.VIN AND TIMESTAMP>NOW()-INTERVAL '1 day' ORDER BY TIMESTAMP DESC LIMIT 1)) AS NT) AS TAB1, 
(SELECT SUM(NT.ODO) AS EARLY_ODO FROM (SELECT DISTINCT t.vin, t.timestamp, MIN(t.odometer) AS ODO FROM TELEMETRY T JOIN VEHICLES V ON T.vin = V.vin WHERE V.fleet_id = '${fleet_id}' group by (t.vin,t.timestamp) having T.TIMESTAMP = (SELECT TIMESTAMP FROM TELEMETRY WHERE VIN = T.VIN AND TIMESTAMP>NOW()-INTERVAL '1 day' ORDER BY TIMESTAMP ASC LIMIT 1)) AS NT) AS TAB2;`)
    return (twenty_four_total_distance.rows[0]);
    // breaking case - when there are uneven entries in the 30 s intervals, it might show less than 24 hours distance
    }
    catch(error){
        throw error
    }}


export async function alert_summary(fleet_id){
    try {
        const alert_summary_result = await db.execute(`SELECT V.FLEET_ID, A.TYPE, A.SEVERITY, COUNT(A.ALERT_ID) FROM VEHICLES V JOIN ALERTS A ON A.VIN = V.VIN WHERE V.FLEET_ID = '${fleet_id}' GROUP BY (V.FLEET_ID, A.TYPE, A.SEVERITY);`)
        console.log(alert_summary_result.rows)
        return alert_summary_result.rows;
    } catch (error) {
        throw error;
    }
}

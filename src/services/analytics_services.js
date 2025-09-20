import db from "../database/db.js"

export async function getVehicleCountbyState(fleet_id){
    const activeVehicleCountQueryResult = (await db.execute(`SELECT COUNT(DISTINCT T.vin) FROM TELEMETRY T JOIN VEHICLES V ON T.vin = V.vin WHERE V.fleet_id = '${fleet_id}' AND T.TIMESTAMP > NOW() - INTERVAL '1 DAY';`))
    const activeVehicleCount = activeVehicleCountQueryResult.rows[0].count
    const totalVehicleCountQueryResult = (await db.execute(`SELECT COUNT(DISTINCT vin) FROM VEHICLES WHERE fleet_id = '${fleet_id}';`))
    const totalVehicleCount = totalVehicleCountQueryResult.rows[0].count
    const inactiveVehicleCount = totalVehicleCount-activeVehicleCount
    return {activeVehicleCount:parseInt(activeVehicleCount), inactiveVehicleCount:parseInt(inactiveVehicleCount), totalVehicleCount: parseInt(totalVehicleCount)};

}

// calculates the average fuel or battery level of a fleet based on the fuel/battery level value recorded in the last telemetry value recorded for a given vin in the fleet
export async function getAverageFuelOrBatteryLevel(fleet_id){
    try{
    const averageFuelOrBatteryLevel = await db.execute(`SELECT AVG(NT.fuel_or_battery_level) as averageFuelOrBatteryLevel FROM (
    SELECT DISTINCT T.vin, T.fuel_or_battery_level FROM TELEMETRY T JOIN VEHICLES V ON T.vin = V.vin WHERE V.fleet_id='${fleet_id}' AND T.TIMESTAMP=(SELECT MAX(TIMESTAMP) FROM TELEMETRY WHERE VIN = T.VIN)) AS NT;`)
    return (averageFuelOrBatteryLevel.rows[0]);
    }
    catch(error){
        throw error
    }
}

export async function getTotalDistanceInLast24Hours(fleet_id){
    try{
    const totalDistanceInLast24Hours = await db.execute(`SELECT TAB1.LATEST_ODO - TAB2.EARLY_ODO AS total_distance_travelled_in_last_24_hours FROM (SELECT SUM(NT.ODO) AS LATEST_ODO FROM (SELECT DISTINCT t.vin, t.timestamp, MAX(t.odometer) AS ODO FROM TELEMETRY T JOIN VEHICLES V ON T.vin = V.vin WHERE V.fleet_id = '${fleet_id}' group by (t.vin,t.timestamp) having T.TIMESTAMP = (SELECT TIMESTAMP FROM TELEMETRY WHERE VIN = T.VIN AND TIMESTAMP>NOW()-INTERVAL '1 day' ORDER BY TIMESTAMP DESC LIMIT 1)) AS NT) AS TAB1, 
(SELECT SUM(NT.ODO) AS EARLY_ODO FROM (SELECT DISTINCT t.vin, t.timestamp, MIN(t.odometer) AS ODO FROM TELEMETRY T JOIN VEHICLES V ON T.vin = V.vin WHERE V.fleet_id = '${fleet_id}' group by (t.vin,t.timestamp) having T.TIMESTAMP = (SELECT TIMESTAMP FROM TELEMETRY WHERE VIN = T.VIN AND TIMESTAMP>NOW()-INTERVAL '1 day' ORDER BY TIMESTAMP ASC LIMIT 1)) AS NT) AS TAB2;`)
    return (totalDistanceInLast24Hours.rows[0]);
    // breaking case - when there are uneven entries in the 30 s intervals, it might show less than 24 hours distance
    }
    catch(error){
        throw error
    }}


export async function getAlertSummary(fleet_id){
    try {
        const alertSummary = await db.execute(`SELECT V.FLEET_ID, A.TYPE, A.SEVERITY, COUNT(A.ALERT_ID) FROM VEHICLES V JOIN ALERTS A ON A.VIN = V.VIN WHERE V.FLEET_ID = '${fleet_id}' GROUP BY (V.FLEET_ID, A.TYPE, A.SEVERITY);`)
        return alertSummary.rows;
    } catch (error) {
        throw error;
    }
}

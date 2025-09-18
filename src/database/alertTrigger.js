import db from "./db.js";

/* 

setting initial limits for alerting conditions to trigger 
alert creation based on telemetry data for speeding and
low fuel or battery

* "low fuel or battery" alert is created, and its severity is set to 
    - high if fuelSeverityHighLB<value<=fuelSeverityHighUB
    - low if value<=fuelSeverityHighLB

* "speeding" alert is created, and its severity is set to 
    - high if value>speedSeverityLowUB 
    - low speedSeverityLowLB<=value<=speedSeverityLowUB

*/

async function createAlertTrigger(speedSeverityLowLB = 100, speedSeverityLowUB = 500, fuelSeverityHighLB = 15, fuelSeverityHighUB = 5) {
    try {
        await db.execute(`
            CREATE OR REPLACE FUNCTION alert_trigger_function()
            RETURNS TRIGGER 
            LANGUAGE PLPGSQL
            AS 
            $$
            BEGIN
                IF NEW.speed>=${speedSeverityLowLB} THEN
                    IF NEW.speed<=${speedSeverityLowUB} THEN
                        INSERT INTO alerts (type, tid, vin, value, severity)
                        VALUES ('speed violation', NEW.tid, NEW.vin, NEW.speed, 'low');
                    ELSE 
                        INSERT INTO alerts (type, tid, vin, value, severity)
                        VALUES ('speed violation', NEW.tid, NEW.vin, NEW.speed, 'high');
                    END IF;
                END IF;
                IF NEW.fuel_or_battery_level<=${fuelSeverityHighLB} THEN
                    INSERT INTO alerts (type, tid, vin, value, severity)
                    VALUES ('low fuel or battery', NEW.tid, NEW.vin, NEW.fuel_or_battery_level, 'high');
                ELSE 
                    IF NEW.fuel_or_battery_level<=${fuelSeverityHighUB} THEN
                        INSERT INTO alerts (type, tid, vin, value, severity)
                        VALUES ('low fuel or battery', NEW.tid, NEW.vin, NEW.fuel_or_battery_level, 'low');
                    END IF;
                END if;
            RETURN NEW;
            END;
            $$
            ;

            CREATE OR REPLACE TRIGGER alertinsert
            AFTER INSERT 
            ON telemetry
            FOR EACH ROW
            EXECUTE PROCEDURE alert_trigger_function();

`)
    }
    catch (error) {
        throw error;
    }
}

export default execute_trigger;
CREATE OR REPLACE FUNCTION alert_trigger_function()
    RETURNS TRIGGER 
    LANGUAGE PLPGSQL
AS 
$$
BEGIN
    IF NEW.speed>100 AND NEW.speed<500 THEN
        INSERT INTO alerts (type, tid, vin, value, severity)
        VALUES ('speed violation', NEW.tid, NEW.vin, NEW.speed, 'low');
    ELSE 
        INSERT INTO alerts (type, tid, vin, value, severity)
        VALUES ('speed violation', NEW.tid, NEW.vin, NEW.speed, 'high');
    END IF;
    IF NEW.fuel_or_battery_level<15 THEN
        INSERT INTO alerts (type, tid, vin, value, severity)
        VALUES ('low fuel or battery', NEW.tid, NEW.vin, NEW.fuel_or_battery_level, 'high');
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


API End Points:

1. POST api/telemetry/:vin
    - Endpoint that receives telemetry data by vin (for a single vehicle) as a json array
    - Insertion format:
    [{
        "vin": "4Y1SL65848Z411439",
        "latitude": -41,
        "longitude": 90.1,
        "speed": 1000,
        "engine_status": "on",
        "fuel_or_battery_level": 1,
        "odometer": 30,
        "diagnostic_code": 200,
        "timestamp": "2025-09-04T09:50:11.680Z"
    },
    ...]
    - Stick tightly to table schema while inserting values for engine_status ("on", "off", "idle")
    - Expects timestamp in ISO format, example - "YYYY-MM-DDTHH:MM:SS.SSSZ"

    - Sample CURL command:
        curl --request POST \
        --url http://localhost:3000/api/telemetry/4Y1SL65848Z411439 \
        --header 'content-type: application/json' \
        --data '[{
                "vin": "4Y1SL65848Z411439",
                "latitude": -41,
                "longitude": 90.1,
                "speed": 1000,
                "engine_status": "on",
                "fuel_or_battery_level": 1,
                "odometer": 30,
                "diagnostic_code": 200,
                "timestamp": "2025-09-04T09:50:11.680Z"
        }]'

2. POST api/telemetry
    - Endpoint that receives telemetry data about multiple vehicles as a JSON array
    - Insertion format (sample request body):
        [{
            "vin": "4Y1SL65848Z411439",
            "latitude": -41,
            "longitude": 90.1,
            "speed": 37,
            "engine_status": "on",
            "fuel_or_battery_level": 20,
            "odometer": 30,
            "diagnostic_code": 200,
            "timestamp": "2025-09-04T09:55:11.680Z"
        },
        {
                "vin": "4Y1SL65848Z411439",
                "latitude": -41,
                "longitude": 90.1,
                "speed": 37,
                "engine_status": "on",
                "fuel_or_battery_level": 10,
                "odometer": 30,
                "diagnostic_code": 200,
                "timestamp": "2025-09-04T10:00:42.000Z"
        },
        {
                "vin": "4Y1SL65848Z411439",
                "latitude": -41,
                "longitude": 90.1,
                "speed": 37,
                "engine_status": "on",
                "fuel_or_battery_level": 5,
                "odometer": 30,
                "diagnostic_code": 200,
                "timestamp": "2025-09-04T10:04:00.000Z"
        }
        ]
    - Sample curl request:
        curl --request POST \
        --url http://localhost:3000/api/telemetry/ \
        --header 'content-type: application/json' \
        --data '[{
                "vin": "4Y1SL65848Z411439",
                "latitude": -41,
                "longitude": 90.1,
                "speed": 37,
                "engine_status": "on",
                "fuel_or_battery_level": 20,
                "odometer": 30,
                "diagnostic_code": 200,
                "timestamp": "2025-09-04T09:55:11.680Z"
        },
        {
                "vin": "4Y1SL65848Z411439",
                "latitude": -41,
                "longitude": 90.1,
                "speed": 37,
                "engine_status": "on",
                "fuel_or_battery_level": 10,
                "odometer": 30,
                "diagnostic_code": 200,
                "timestamp": "2025-09-04T10:00:42.000Z"
        },
        {
                "vin": "4Y1SL65848Z411439",
                "latitude": -41,
                "longitude": 90.1,
                "speed": 37,
                "engine_status": "on",
                "fuel_or_battery_level": 5,
                "odometer": 30,
                "diagnostic_code": 200,
                "timestamp": "2025-09-04T10:04:00.000Z"
        }
        ]'  

3. GET /api/telemetry/query/history
    - Returns telemetry data in within specifiec time ranges
    - Allows querying for fuel level limits, speed limits, diagnostic codes etc
    - Takes optional query parameters
        
        - time_start - ISO timestamp after which telemetry records are needed (for example, if one required only telemetry records after 11th september 2025, 00:00, then time_start is "2025-09-11T00:00:00.000Z")
        - time_end - ISO timestamp before which telemetry records are needed  (for example, if the user only needs data till 12th september 00:00, then time_start is "2025-09-12T00:00:00.000Z")
        - fuel_min - lower bound of fuel value for querying
        - fuel_max - upper bound for fuel value for querying
        - speed_min - lower bound of speed value for querying
        - speed_max - upper bound of speed value for querying
        - engine_status - engine status (one of "on", "off", "idle") value for querying
        - vin - vehicle for which telemetry history is required 
        (performs an AND over all query parameters passed)

    -  Sample curl request:
        curl --request GET \
        --url 'http://localhost:3000/api/telemetry/query/history/?time_start=%222025-09-04T09%3A50%3A11.680Z%22&time_end=%222025-09-11T09%3A50%3A11.680Z%22&fuel_min=9&fuel_max=25&speed_min=10&speed_max=100&engine_status=on' \
        --header 'content-type: application/json'

    - // Later Improvements:
    // take start and end time within which they want telemetry
    // extra deets from other tables: query to work on, the vehicle ID rules, join with
    // fleet to find in case on inactive vehicles in a certain fleet
    // or certain manufacturer or type

4. GET /api/telemetry/query/latest
    - returns telemetry data in the last "n" days, defaults to return all data if no date is given
    - Allows querying for fuel level limits, speed limits, diagnostic codes etc
    - Optional query parameters:
        - vin - vehicle for which latest telemetry is required (if not mentioned, returns data for all vehicles)
        - diagnostic_codes - an array of diagnostic codes to be included in the return data (performs OR over diagnostic codes)
        - days - number of days for which latest telemetry should be returned
        - fuel_min - lower bound of fuel value for querying
        - fuel_max - upper bound for fuel value for querying
        - speed_min - lower bound of speed value for querying
        - speed_max - upper bound of speed value for querying
        - engine_status - engine status (one of "on", "off", "idle") value for querying
        - limit - number of latest records that need to be returned 
    - Sample curl request:
        curl --request GET \
        --url 'http://localhost:3000/api/telemetry/query/latest/?vin=4Y1SL65848Z411439&days=3&fuel_min=9&fuel_max=25&speed_min=0&speed_max=100&engine_status=off' \
        --header 'content-type: application/json'
    - 
        // Later Improvements: 
        // now takes only days, but later take time in hours, days, year, etc and vin for which they need telemetry
        // extra deets from other tables: query to work on, the vehicle ID rules, join with
        // fleet to find in case on inactive vehicles in a certain fleet
        // or certain manufacturer or type


    
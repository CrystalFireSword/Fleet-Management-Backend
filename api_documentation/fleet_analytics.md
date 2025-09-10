API ENDPOINTS FOR FLEET-LEVEL ANALYTICS

 
1. GET api/fleet_analytics/alert_summary/:fleet_id

    - Return a fleet-level alert summary, with the number of alerts raised for an alert_type anjd severity
    - Sample response format:
        - [
            {
            "fleet_id": "F00001",
            "type": "low fuel or battery",
            "severity": "high",
            "count": "45"
            },
            {
            "fleet_id": "F00001",
            "type": "speed violation",
            "severity": "high",
            "count": "79"
            }
        ]


2. GET api/fleet_analytics/average_fuel_or_battery_level/:fleet_id
    - calculates the average fuel or battery level of a fleet based on the fuel/battery level value recorded in the last telemetry value recorded for a given vin in the fleet
    - Sample response:
        - {
        "average_fuel_or_battery_level": "10.0000000000000000"
        }

3. GET api/fleet_analytics/total_distance/:fleet_id
    - Total distance travelled in last 24 hours - the logic calculates the sum of the latest telemetry recorded for each vehicle in a given fleet, and the sum of the first telemetry recorded for each vehicle in the fleet in the last 24 hours, and subtracts the latter from the former
    - This logic fails when there is sparse telemetry data in the 24 hour interval, so in 24 hours, if only two records are received, one in the 15th hour and one in the 22nd hour (relative to the last 24hrs), this difference will return only the difference in the distance covered in the 6 hours between the 15th and 22nd hour, and not the entire distance travelled in the last 24 hours
    - Sample response:
        {
        "total_distance": "240"
        }

4. GET api/fleet_analytics/active_vs_inactive_count/:fleet_id
    - gives the count of active, inactive and total vehicles (checks for availability of telemetry in last 24 hours)
    - Sample response:
        - {
            "active_vehicles": 2,
            "inactive_vehicles": 2,
            "total_vehicles": 4
          }

5. GET api/fleet_analytics/all/:fleet_id
   - returns fleet-level active vehicles count, total distance travelled by the fleet in the last 24 hours, and average fuel or battery level across the fleet 
   (all the specs above apply)
   - sample response:
    {
    "data": {
        "active_vehicles": {
        "active_vehicles": 2,
        "inactive_vehicles": 2,
        "total_vehicles": 4
        },
        "average_fuel_or_battery_level_value": {
        "average_fuel_or_battery_level": "10.0000000000000000"
        },
        "dist": {
        "total_distance": "240"
        },
        "alert_sum": [
        {
            "fleet_id": "F00001",
            "type": "low fuel or battery",
            "severity": "high",
            "count": "58"
        },
        {
            "fleet_id": "F00001",
            "type": "speed violation",
            "severity": "high",
            "count": "105"
        }
        ]
    }
    }
    
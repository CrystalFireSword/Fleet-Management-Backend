#!/bin/bash
echo create vehicles

curl --request POST \
  --url http://localhost:3000/api/vehicles \
  --header 'content-type: application/json' \
  --data '[
  {
    "vin": "9Y1SL65848Z411432",
    "manufacturer": "Manufacturer 1",
    "model": "Model 1",
    "fleet_id": "F00001",
    "o_info": "Owner information for vehicle",
    "reg_status": "active",
    "fleet_type": "rental"
  },
  {
    "vin": "5Y1SL65848Z411433",
    "manufacturer": "Manufacturer 1",
    "model": "Model 1",
    "fleet_id": "F00002",
    "o_info": "Owner information for vehicle",
    "reg_status": "active",
    "fleet_type": "rental"},
  {
    "vin": "5Y1SL65848Z411431",
    "manufacturer": "Manufacturer",
    "model": "Model 2",
    "fleet_id": "F00001",
    "o_info": "Owner information for vehicle 3",
    "reg_status": "maintenance",
    "fleet_type": "rental"
  },
  {
    "vin": "7Y1SL65848Z411437",
    "manufacturer": "Manufacturer",
    "model": "Model 2",
    "fleet_id": "F00002",
    "o_info": "Owner information for vehicle 4",
    "reg_status": "maintenance",
    "fleet_type": "personal"
  }
]'


echo "Get all vehicles"

curl --request GET \
  --url http://localhost:3000/api/vehicles

echo "Get filtered vehicles"

curl --request GET \
  --url 'http://localhost:3000/api/vehicles?vin=&manufacturer=Manufacturer+1&model=&fleet_id=F00001&o_info=&reg_status=&fleet_type=&limit=&offset='

echo "Update vehicle"

curl --request PUT \
  --url http://localhost:3000/api/vehicles/5Y1SL65848Z411431 \
  --header 'content-type: application/json' \
  --data '{
    "manufacturer": "Manufacturer",
    "model": "Model 1",
    "fleet_id": "F00001",
    "o_info": "Owner information for vehicle 1",
    "reg_status": "active",
    "fleet_type": "rental"
  }'

  echo "Post telemetry"

  curl --request POST \
  --url http://localhost:3000/api/telemetry/ \
  --header 'content-type: application/json' \
  --data '[{
        "vin": "9Y1SL65848Z411432",
        "latitude": -41,
        "longitude": 90.1,
        "speed": 37,
        "engine_status": "on",
        "fuel_or_battery_level": 20,
        "odometer": 100,
        "diagnostic_code": 200,
        "timestamp": "2025-09-08T10:56:11.680Z"
  },
  {
        "vin": "5Y1SL65848Z411433",
        "latitude": -41,
        "longitude": 90.1,
        "speed": 137,
        "engine_status": "on",
        "fuel_or_battery_level": 10,
        "odometer": 150,
        "diagnostic_code": 200,
        "timestamp": "2025-09-08T11:02:42.000Z"
  },
  {
        "vin": "5Y1SL65848Z411431",
        "latitude": -41,
        "longitude": 90.1,
        "speed": 1086,
        "engine_status": "on",
        "fuel_or_battery_level": 5,
        "odometer": 270,
        "diagnostic_code": 200,
        "timestamp": "2025-09-08T12:05:00.000Z"
  }
]'


echo "Post telemetry for one record with no corresponding vehicle (expect foreign key error)"

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

echo "Get telemetry history"

curl --request GET \
  --url 'http://localhost:3000/api/telemetry/query/history/?diagnostic_codes=%5B200%5D&time_start=%222025-09-04T09%3A50%3A11.680Z%22&time_end=%222025-09-11T09%3A50%3A11.680Z%22&fuel_min=9&fuel_max=25&speed_min=10&speed_max=100&engine_status=on&vin=' \
  --header 'content-type: application/json'

echo "Get latest telemetry"


curl --request GET \
  --url 'http://localhost:3000/api/telemetry/query/latest/?vin=9Y1SL65848Z411432&days=40&fuel_min=9&fuel_max=&speed_min=0&speed_max=&engine_status=' \
  --header 'content-type: application/json'


echo "Get alerts with filters"

curl --request GET \
  --url 'http://localhost:3000/api/alerts/query?type=speed+violation&vin=&severity=low&tid='


echo "Get alert by alert id"

curl --request GET \
  --url http://localhost:3000/api/alerts/alert_id/4

  echo "Get all fleet analytics by Fleet ID"

  curl --request GET \
  --url http://localhost:3000/api/fleet_analytics/all/F00001
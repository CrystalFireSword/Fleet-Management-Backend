ALERT API ENDPOINTS:

1. GET /api/alerts/all
    - Returns all alert data
    - Optional query parameters for filtering:
        - tid  - telemetry ID that generated the alert
        - type - type of alert ("low fuel or battery", "speed violation") (please note that in the current version, this is case sensitive)
        - vin - filter alerts by vin
        - severity - severity of the raised alerts ("high"/"low")
    -  Sample curl request
        curl --request GET \
        --url 'http://localhost:3000/api/alerts/all?type=low+fuel+or+battery&vin=4Y1SL65848Z411439&severity=high'

2. GET /api/alerts/query/:aid
    - Returns alert data for a specific alert id
    - Sample curl request:
        curl --request GET \
        --url http://localhost:3000/api/alerts/query/31

// in the schema for alerts, vin might be repetitive as the vin can be accessed by joining the alerts
// and telemetry tables on tid, and accessing the vin with the tid. But to avoid having to join
// everytime an alert summary analytic is required, the vin column has been added to the alerts table too.
// can be removed and instead accessed with joins based on the number of times the summary is executed...
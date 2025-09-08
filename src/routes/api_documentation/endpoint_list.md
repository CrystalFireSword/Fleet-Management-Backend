API ENDPOINTS:

VEHICLES

1. GET /api/vehicles/all
2. GET /api/vehicles/  (with query params)(check specific document for optional query params)
3. POST /api/vehicles/  (refer to specific document for request body format)
4. PUT /api/vehicles/:vin
5. DELETE /api/vehicles/vin/:vin
6. DELETE /api/vehicles/query

TELEMETRY

1. POST api/telemetry/:vin (refer to specific document for request body format)
2. POST api/telemetry (refer to specific document for request body format)
3. GET /api/telemetry/query/history (refer to specific document for optional query params)
4. GET /api/telemetry/query/latest (refer to specific document for optional query params)

ALERTS

1. GET /api/alerts/all (refer to specific document for optional query params)
2. GET /api/alerts/query/:aid 
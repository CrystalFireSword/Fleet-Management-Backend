import express from "express";
import alert_router from "./src/routes/alert.js";
import vehicle_router from "./src/routes/vehicles.js";
import telemetry_router from "./src/routes/telemetry.js";
import fleet_router from "./src/routes/fleet_analytics.js";
import dotenv from "dotenv";
import createAlertTrigger from "./src/database/alertTrigger.js";
dotenv.config()

/*initial limits for alerting conditions to trigger 
alert creation based on telemetry data for speeding and
low fuel or battery*/

const fuelSeverityHighLB = 5
const fuelSeverityHighUB = 15
const speedSeverityLowLB = 100
const speedSeverityLowUB = 500

await createAlertTrigger(speedSeverityLowLB, speedSeverityLowUB, fuelSeverityHighLB, fuelSeverityHighUB)

// server logic 
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use("/api/alerts", alert_router)
app.use("/api/telemetry", telemetry_router)
app.use("/api/vehicles", vehicle_router)
app.use("/api/fleet_analytics", fleet_router)
app.get("/api/helloworld", (req, res, next) => {
    res.json(["Hello World!"]);
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

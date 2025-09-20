import express from "express";
import alertRouter from "./src/routes/alert.js";
import vehicleRouter from "./src/routes/vehicles.js";
import telemetryRouter from "./src/routes/telemetry.js";
import fleetAnalyticsRouter from "./src/routes/fleet_analytics.js";
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
app.use("/api/alerts", alertRouter)
app.use("/api/telemetry", telemetryRouter)
app.use("/api/vehicles", vehicleRouter)
app.use("/api/fleet_analytics", fleetAnalyticsRouter)
app.get("/api/helloworld", (req, res, next) => {
    res.json(["Hello World!"]);
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

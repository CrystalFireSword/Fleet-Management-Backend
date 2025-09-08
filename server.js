import express from "express";
import alert_router from "./src/routes/alert.js";
import vehicle_router from "./src/routes/vehicles.js";
import telemetry_router from "./src/routes/telemetry.js";
import dotenv from "dotenv";
dotenv.config()


const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use("/api/alerts", alert_router)
app.use("/api/telemetry", telemetry_router)
app.use("/api/vehicles", vehicle_router)
app.get("/api/helloworld", (req, res, next) => {
    res.json(["Hello World!"]);
})

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`)
})

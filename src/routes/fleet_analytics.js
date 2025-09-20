import express from "express";
import dotenv from "dotenv";
import {getVehicleCountbyState, getTotalDistanceInLast24Hours, getAlertSummary, getAverageFuelOrBatteryLevel} from "../services/analytics_services.js"

dotenv.config()

const router = express.Router();

router.get('/test',(req,res,next)=>{
    res.send("Hey, at the alerts end point")
})

router.get("/all/:fleetID", async (req, res, next)=>{
    try{
        const fleetID = req.params.fleetID
        const vehicleCountByState = await getVehicleCountbyState(fleetID);
        const averageFuelOrBatteryLevel = await getAverageFuelOrBatteryLevel(fleetID);
        const dist = await getTotalDistanceInLast24Hours(fleetID);
        const alertSummary = await getAlertSummary(fleetID);
        res.status(200).json({data:{vehicleCountByState, averageFuelOrBatteryLevel, dist, alertSummary}})
    }
    catch(error){
        throw error;
    }
})

router.get("/vehicle_count_by_state/:fleetID", async (req, res, next)=>{
    try{
        const fleetID = req.params.fleetID
        const vehicleCountByState = await getVehicleCountbyState(fleetID);
        res.status(200).json(vehicleCountByState)
    }
    catch(error){
        res.status(400).json({message:"Error:"+error})
    }
})

router.get("/total_distance_travelled_in_last_24_hours/:fleetID", async (req, res, next)=>{
    try{
        const fleetID = req.params.fleetID
        const totalDistanceTravelledInLast24Hours = await getTotalDistanceInLast24Hours(fleetID);
        res.status(200).json(totalDistanceTravelledInLast24Hours)
    }
    catch(error){
        res.status(400).json({message:"Error:"+error})
    }
})

router.get("/average_fuel_or_battery_level/:fleetID", async (req, res, next)=>{
    try{
        const fleetID = req.params.fleetID
        const averageFuelOrBatteryLevel = await getAverageFuelOrBatteryLevel(fleetID);
        res.status(200).json(averageFuelOrBatteryLevel)
    }
    catch(error){
        res.status(400).json({message:"Error:"+error})
    }
})

router.get("/alert_summary/:fleetID", async (req, res, next)=>{
    try{
        const fleetID = req.params.fleetID
        const alertSummary = await getAlertSummary(fleetID);
        res.status(200).json(alertSummary)
    }
    catch(error){
        res.status(400).json({message:"Error:"+error})
    }
})

export default router

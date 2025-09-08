import express from "express";
import dotenv from "dotenv";
import {active_count, total_distance, alert_summary, average_fuel_or_battery_level} from "../services/analytics_services.js"

dotenv.config()

const router = express.Router();

router.get('/test',(req,res,next)=>{
    res.send("Hey, at the alerts end point")
})

router.get("/all/:fleet_id", async (req, res, next)=>{
    try{
        const fleet_id = req.params.fleet_id
        const active_vehicles = await active_count(fleet_id);
        const average_fuel_or_battery_level_value = await average_fuel_or_battery_level(fleet_id);
        const dist = await total_distance(fleet_id);
        const alert_sum = await alert_summary(fleet_id);
        res.status(200).json({data:{active_vehicles, average_fuel_or_battery_level_value, dist, alert_sum}})
    }
    catch(error){
        throw error;
    }
})

router.get("/active_vs_inactive_count/:fleet_id", async (req, res, next)=>{
    try{
        const fleet_id = req.params.fleet_id
        const active_vehicles = await active_count(fleet_id);
        res.status(200).json(active_vehicles)
    }
    catch(error){
        res.status(400).json({message:"Error:"+error})
    }
})

router.get("/total_distance/:fleet_id", async (req, res, next)=>{
    try{
        const fleet_id = req.params.fleet_id
        const dist = await total_distance(fleet_id);
        res.status(200).json(dist)
    }
    catch(error){
        res.status(400).json({message:"Error:"+error})
    }
})

router.get("/average_fuel_or_battery_level/:fleet_id", async (req, res, next)=>{
    try{
        const fleet_id = req.params.fleet_id
        const average_fuel_or_battery_level_value = await average_fuel_or_battery_level(fleet_id);
        res.status(200).json(average_fuel_or_battery_level_value)
    }
    catch(error){
        res.status(400).json({message:"Error:"+error})
    }
})

router.get("/alert_summary/:fleet_id", async (req, res, next)=>{
    try{
        const fleet_id = req.params.fleet_id
        const alert_sum = await alert_summary(fleet_id);
        res.status(200).json(alert_sum)
    }
    catch(error){
        res.status(400).json({message:"Error:"+error})
    }
})

export default router

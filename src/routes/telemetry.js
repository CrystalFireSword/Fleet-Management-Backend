import express from "express";
import dotenv from "dotenv";
import {insert_telemetry_one_vehicle, query_telemetry_history, query_telemetry_latest, insert_telemetry_multiple_vehicles} from "../services/telemetry_services.js"


dotenv.config()

const router = express.Router();

router.get('/test',(req,res,next)=>{
    res.send("Hey, at the telemetry end point")
})

router.post('/:vin', async (req, res, next)=>{
    const telemetry_data = req.body
    try{
        const written_status = await insert_telemetry_one_vehicle(telemetry_data)
        res.status(200).json(written_status)
    }
    catch (error){
        res.status(400).json({message:"ERROR"+error})
    }
})

router.post('/', async (req, res, next)=>{
    const telemetry_data = req.body
    try{
        const written_status = await insert_telemetry_multiple_vehicles(telemetry_data)
        res.status(200).json(written_status)
    }
    catch (error){
        res.status(400).json({message:"ERROR"+error})
    }
})

router.get('/query/history', async (req, res, next)=>{
    try{
        
        const result_telemetry = await query_telemetry_history(req.query)
        res.status(200).json(result_telemetry)
    }   
    catch(error){
        res.status(400).json({message:"Error "+error})
    }
})

router.get('/query/latest', async (req, res, next)=>{
    try{
        
        const result_telemetry = await query_telemetry_latest(req.query)
        res.status(200).json(result_telemetry)
    }   
    catch(error){
        res.status(400).json({message:"Error "+error})
    }
})

export default router
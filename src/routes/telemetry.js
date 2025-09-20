import express from "express";
import dotenv from "dotenv";
import {insertOneTelemetryRecord, getFilteredTelemetryHistory, getFilteredTelemetryLatest, insertManyTelemetryRecords} from "../services/telemetry_services.js"


dotenv.config()

const router = express.Router();

router.get('/test',(req,res,next)=>{
    res.send("Hey, at the telemetry end point")
})

router.post('/:vin', async (req, res, next)=>{
    const telemetryData = req.body
    try{
        const writeStatus = await insertOneTelemetryRecord(telemetryData)
        res.status(200).json(writeStatus)
    }
    catch (error){
        res.status(400).json({message:"ERROR"+error})
    }
})

router.post('/', async (req, res, next)=>{
    const telemetryData = req.body
    try{
        const writeStatus = await insertManyTelemetryRecords(telemetryData)
        res.status(200).json(writeStatus)
    }
    catch (error){
        res.status(400).json({message:"ERROR"+error})
    }
})

router.get('/query/history', async (req, res, next)=>{
    try{
        
        const filteredTelemetryHistory = await getFilteredTelemetryHistory(req.query)
        res.status(200).json(filteredTelemetryHistory)
    }   
    catch(error){
        res.status(400).json({message:"Error "+error})
    }
})

router.get('/query/latest', async (req, res, next)=>{
    try{
        
        const filteredTelemetryLatest = await getFilteredTelemetryLatest(req.query)
        res.status(200).json(filteredTelemetryLatest)
    }   
    catch(error){
        res.status(400).json({message:"Error "+error})
    }
})

export default router
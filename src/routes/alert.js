import express from "express";
import dotenv from "dotenv";
import {getAlertsByFilters, getAlertsByID} from "../services/alert_services.js"

dotenv.config()

const router = express.Router();

router.get('/test',(req,res,next)=>{
    res.send("Hey, at the alerts end point")
})

router.get('/query', async (req, res, next)=>{
    try{
        
        const filteredAlerts = await getAlertsByFilters(req.query, req.query["limit"], req.query["offset"])
        res.status(200).json(filteredAlerts)
    }   
    catch(error){
        res.status(400).json({message:"Error "+error})
    }
})

router.get('/alert_id/:aid', async (req, res, next)=>{
    try{
        const filteredAlerts = await getAlertsByID(req.params.aid)
        res.status(200).json(filteredAlerts)
    }   
    catch(error){
        res.status(400).json({message:"Error "+error})
    }
})

export default router
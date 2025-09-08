import express from "express";
import dotenv from "dotenv";
import {query_alerts, query_alert_by_aid} from "../services/alert_services.js"

dotenv.config()

const router = express.Router();

router.get('/test',(req,res,next)=>{
    res.send("Hey, at the alerts end point")
})

router.get('/all', async (req, res, next)=>{
    try{
        
        const result_alerts = await query_alerts(req.query, req.query["limit"], req.query["offset"])
        res.status(200).json(result_alerts)
    }   
    catch(error){
        res.status(400).json({message:"Error "+error})
    }
})

router.get('/query/:aid', async (req, res, next)=>{
    try{
        const result_alerts = await query_alert_by_aid(req.params.aid)
        res.status(200).json(result_alerts)
    }   
    catch(error){
        res.status(400).json({message:"Error "+error})
    }
})

export default router
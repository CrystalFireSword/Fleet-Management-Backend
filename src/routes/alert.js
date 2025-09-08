import express from "express";
import dotenv from "dotenv";
dotenv.config()

const router = express.Router();

router.get('/test',(req,res,next)=>{
    res.send("Hey, at the alerts end point")
})

export default router
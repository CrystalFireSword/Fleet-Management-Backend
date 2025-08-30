import express from "express";
import dotenv from "dotenv";

dotenv.config()

const router = express.Router();
router.get('/test', (req, res) => {
    res.send("Hey, at the vehicles end point")
})

export default router
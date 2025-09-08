import express from "express";
import dotenv from "dotenv";
import { get_all_vehicles, get_vehicles, insert_vehicles, delete_vehicles, update_vehicles, delete_vehicle_by_vin } from "../services/vehicle_services.js"
dotenv.config()

const router = express.Router();
router.get('/test', (req, res) => {
    res.send("Hey, at the vehicles end point")
})

// takes query parameters, pass to get_vehicles, and sends json response of filtered vehicles
router.get(`/`, async (req, res) => {
    const { vin, manufacturer, model, fleet_id, o_info, reg_status, fleet_type, limit, offset } = req.query
    try {
        const vehicles = await get_vehicles({ vin, manufacturer, model, fleet_id, o_info, reg_status, fleet_type }, limit, offset)
        res.status(200).json(vehicles)
    }
    catch (error) {
        res.status(400).json({ message: "Error:" + error })
    }
})

// get all vehicles
router.get(`/all`, async (req, res) => {
    try {
        const vehicles = await get_all_vehicles()
        res.status(200).json(vehicles)
    }
    catch (error) {
        res.status(400).json({ message: "Error:" + error })
    }
})

// post vehicle data as a json array, calls insert_vehicle to make insertion
router.post('/', async (req, res) => {
    try {
        const vehicles = req.body
        const done = await insert_vehicles(vehicles)
        res.status(200).json({ message: "Success" + done })
    }
    catch (error) {
        res.status(400).json({ message: "Error:" + error })
    }
})

router.put(`/:vin`, async (req, res) => {
    const vin = req.params.vin
    const { manufacturer, model, fleet_id, o_info, reg_status, fleet_type } = req.body
    try {
        const vehicles = await update_vehicles({ vin, manufacturer, model, fleet_id, o_info, reg_status, fleet_type })
        res.status(200).json(vehicles)
    }
    catch (error) {
        res.status(400).json({ message: "Error:" + error })
    }
})

// takes query parameters, pass to delete_vehicles, and deletes vehicle data based on filters
router.delete(`/vin/:vin`, async (req, res) => {
    const vin = req.params.vin
    try {
        const vehicles = await delete_vehicle_by_vin(vin)
        res.status(200).json(vehicles)
    }
    catch (error) {
        res.status(400).json({ message: "Error:" + error })
    }
})

router.delete(`/query`, async (req, res) => {
    const { vin, manufacturer, model, fleet_id, o_info, reg_status, fleet_type } = req.query
    try {
        const vehicles = await delete_vehicles({ vin, manufacturer, model, fleet_id, o_info, reg_status, fleet_type })
        res.status(200).json(vehicles)
    }
    catch (error) {
        res.status(400).json({ message: "Error:" + error })
    }
})
export default router
import express from "express";
import dotenv from "dotenv";
import { getAllVehicles, getFilteredVehicles, insertVehicles, deleteFilteredVehicles, updateVehicles, deleteVehicleByVin } from "../services/vehicle_services.js"
dotenv.config()

const router = express.Router();
router.get('/test', (req, res) => {
    res.send("Hey, at the vehicles end point")
})

// takes query parameters, pass to getFilteredVehicles, and sends json response of filtered vehicles
router.get(`/`, async (req, res) => {
    const { vin, manufacturer, model, fleet_id, o_info, reg_status, fleet_type, limit, offset } = req.query
    try {
        const vehicles = await getFilteredVehicles({ vin, manufacturer, model, fleet_id, o_info, reg_status, fleet_type }, limit, offset)
        res.status(200).json(vehicles)
    }
    catch (error) {
        res.status(400).json({ message: "Error:" + error })
    }
})

// get all vehicles
router.get(`/all`, async (req, res) => {
    try {
        const vehicles = await getAllVehicles()
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
        const result = await insertVehicles(vehicles)
        res.status(200).json({ message: "Success" + result })
    }
    catch (error) {
        res.status(400).json({ message: "Error:" + error })
    }
})

router.put(`/:vin`, async (req, res) => {
    const vin = req.params.vin
    const { manufacturer, model, fleet_id, o_info, reg_status, fleet_type } = req.body
    try {
        const result = await updateVehicles({ vin, manufacturer, model, fleet_id, o_info, reg_status, fleet_type })
        res.status(200).json(result)
    }
    catch (error) {
        res.status(400).json({ message: "Error:" + error })
    }
})

// takes query parameters, pass to deleteFilteredVehicles, and deletes vehicle data based on filters
router.delete(`/vin/:vin`, async (req, res) => {
    try {
        const result = await deleteVehicleByVin(req.params.vin)
        res.status(200).json(result)
    }
    catch (error) {
        res.status(400).json({ message: "Error:" + error })
    }
})

router.delete(`/query`, async (req, res) => {
    const { vin, manufacturer, model, fleet_id, o_info, reg_status, fleet_type } = req.query
    try {
        const result = await deleteFilteredVehicles({ vin, manufacturer, model, fleet_id, o_info, reg_status, fleet_type })
        res.status(200).json(result)
    }
    catch (error) {
        res.status(400).json({ message: "Error:" + error })
    }
})
export default router
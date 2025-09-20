API End Points:

1. GET /api/vehicles/all
    - To get all vehicle data from vehicles table

2. GET /api/vehicles/
    - To get vehicle data from vehicles table based on query params, returns all values by default
    - Takes {vin, manufacturer, model, fleet_id, o_info, reg_status, fleet_type, limit} as query parameters
    - QUERY PARAMS:
        - vin : vehicle ID number
        - manufacturer : vehicle manuafacturer
        - model : vehicle model
        - fleet_id : fleet_id
        - o_info : vehicle owner information
        - reg_status : registration status, must be one of ('active', 'maintenance', 'decommissioned')
        - fleet_type : must be one of ('corporate', 'rental', 'personal')
        - limit : number of rows to be returned, default to all rows
        - offset : offset to start selecting data from
    - RETURN FORMAT :
    [
        {
            col_id: ,
            vin:"",
            manufacturer:"",
            model: "",
            fleet_id:"",
            o_info:"",
            reg_status:"",
            fleet_type:""
         },
         {
            vin:"",
            manufacturer:"",
            model: "",
            fleet_id:"",
            o_info:"",
            reg_status:"",
            fleet_type:""
         }
         ...
    ]
    
3. POST /api/vehicles/
    - Insert vehicle(s) data into the table
    - Takes a json array in the request body of the format
    [
        {
            vin:"",
            manufacturer:"",
            model: "",
            fleet_id:"",
            o_info:"",
            reg_status:"",
            fleet_type:""
         },
         {
            vin:"",
            manufacturer:"",
            model: "",
            fleet_id:"",
            o_info:"",
            reg_status:"",
            fleet_type:""
         }
         ...
    ]
    - Required to follow vehicle table schema constraints on insertion
    - No partial insertion - on posting data with invalid values in one of the many entries, none of the entries are inserted

4. PUT /api/vehicles/:vin
    - To update vehicle data from vehicles table based on the vin in the request parameter, updates data only for a SPECIFIC vin
    - Takes {vin, manufacturer, model, fleet_id, o_info, reg_status, fleet_type} as request body
    - SAMPLE REQUEST BODY FORMAT:
        {
        "manufacturer":"Manufacturer 1": ,
        "model": "Model 2",
        "fleet_id": "F00001",
        "o_info":"Owner information for vehicle 1",
        "reg_status": "active",
        "fleet_type": "rental"
        }
    - on successful application, sets the updated_at value of the specific vin   to update time

5. DELETE /api/vehicles/vin/:vin
    - deletes the data of the given vin

6. DELETE /api/vehicles/query
    - To delete vehicle data from vehicles table based on query params, delete all values in the vehicle table by default
    - USED TO DELETE VEHICLE INFORMATION BASED ON A GIVEN QUERY/CONDITION
    - Takes {vin, manufacturer, model, fleet_id, o_info, reg_status, fleet_type} as query parameters, returns and over all values
    - vin : vehicle ID number
    - manufacturer : vehicle manuafacturer
    - model : vehicle model
    - fleet_id : fleet_id
    - o_info : vehicle owner information
    - reg_status : registration status, must be one of ('active', 'maintenance', 'decommissioned')
    - fleet_type : must be one of ('corporate', 'rental', 'personal')
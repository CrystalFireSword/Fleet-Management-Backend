## Fleet Management System - Backend

1. File structure:
  
  /backend  
    &emsp;- .dockerignore  
    &emsp;- .env (to be added by the user before docker compose)  
    &emsp;- .env.example  
    &emsp;- .gitignore  
    &emsp;- docker&emsp;-compose.yml  
    &emsp;- Dockerfile  
    &emsp;- drizzle.config.js  
    &emsp;- package&emsp;-lock.json  
    &emsp;- package.json  
    &emsp;- run.sh  
    &emsp;- server.js   
    &emsp;/src  
      &emsp;&emsp;/database  
        &emsp;&emsp;&emsp;- .env (to be added by the user before docker compose)  
        &emsp;&emsp;&emsp;- .env.example  
        &emsp;&emsp;&emsp;- db.js  
        &emsp;&emsp;&emsp;- schema.js  
        &emsp;&emsp;&emsp;- trigger.js  
      &emsp;&emsp;/routes  
        &emsp;&emsp;&emsp;/api_documentation  
          &emsp;&emsp;&emsp;&emsp;- alert_api.md  
          &emsp;&emsp;&emsp;&emsp;- endpoint_list.md  
          &emsp;&emsp;&emsp;&emsp;- fleet_analytics.md  
          &emsp;&emsp;&emsp;&emsp;- telemetry_api.md  
          &emsp;&emsp;&emsp;&emsp;- vehicle_api.md  
        &emsp;&emsp;&emsp;- alert.js  
        &emsp;&emsp;&emsp;- fleet_analytics.js  
        &emsp;&emsp;&emsp;- telemetry.js  
        &emsp;&emsp;&emsp;- vehicles.js  
      &emsp;&emsp;/services  
        &emsp;&emsp;&emsp;- alert_services.js  
        &emsp;&emsp;&emsp;- analytics_services.js  
        &emsp;&emsp;&emsp;- telemetry_services.js  
        &emsp;&emsp;&emsp;- vehicle_services.js
   
2. List of APIs, api endpoint descriptions, etc. are in /backend/src/routes/api_documentation
3. Set Up:
     - Clone the repository locally
     - Set up .env files wherever mentioned in the file structure above, and fill it using the format in .env.example
     - Run docker compose up --build -d
     - Make api calls to port as seen fit. The PORT defaults to 3000 on localhost.

4. Database Schema: /backend/database/schema.js
5. How this system works:
   - post npm ci in docker compose, the run.sh file executes the drizzle push to push the schema to db (which creates the tables), and runs npm run start
   - On npm run start, server.js first executes the trigger to run insert alerts on getting relevant telemetry data, then sets us API routes
   - API route functions are documentated in /backend/src/routes/api_documentation

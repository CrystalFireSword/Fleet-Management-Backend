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
   
  

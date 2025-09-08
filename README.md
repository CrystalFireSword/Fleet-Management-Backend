Fleet Management System - Backend

1. File structure:

  /backend
    - .dockerignore
    - .env (to be added by the user before docker compose)
    - .env.example
    - .gitignore
    - docker-compose.yml
    - Dockerfile
    - drizzle.config.js
    - package-lock.json
    - package.json
    - run.sh
    - server.js 
    /src
      /database
        - .env (to be added by the user before docker compose)
        - .env.example
        - db.js
        - schema.js
        - trigger.js
      /routes
        /api_documentation
          - alert_api.md
          - endpoint_list.md
          - fleet_analytics.md
          - telemetry_api.md
          - vehicle_api.md
        - alert.js
        - fleet_analytics.js
        - telemetry.js
        - vehicles.js
      /services
        - alert_services.js
        - analytics_services.js
        - telemetry_services.js
        - vehicle_services.js
   

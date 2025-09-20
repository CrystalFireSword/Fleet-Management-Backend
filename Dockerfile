FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN chmod +x run.sh
CMD ["sh", "run.sh"]
EXPOSE 3000 5432 
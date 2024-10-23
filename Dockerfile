# Base image
FROM node:18-alpine as base
WORKDIR /app
COPY package*.json ./

# Development stage
FROM base as dev
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

# Build stage
FROM base as build
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine as prod
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY prisma ./prisma
COPY .env .env
ENV NODE_ENV production
EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]

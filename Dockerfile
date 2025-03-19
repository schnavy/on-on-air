# Base image
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./

# Development stage
FROM base AS dev
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

# Build stage
FROM base AS build
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

# Production stage
FROM node:18-alpine AS prod
WORKDIR /app

# Install system dependencies (Fixes Prisma OpenSSL issue)
RUN apk add --no-cache openssl

# Copy only necessary files to keep the image small
COPY package*.json ./
RUN npm install --production

COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/prisma ./prisma

# Ensure correct environment variables
ENV NODE_ENV=production

# Expose port
EXPOSE 3000

# Run Prisma migrations & generate client before starting app
CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && npm start"]


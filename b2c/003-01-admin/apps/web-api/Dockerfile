FROM node:20-alpine AS base
WORKDIR /app

# Dependencies
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund || npm i --no-audit --no-fund

# Sources
COPY tsconfig.json nest-cli.json ./
COPY src ./src
COPY prisma ./prisma

# Build & Prisma
RUN npm run prisma:generate

EXPOSE 3001
CMD ["npm", "run", "start:dev"]

FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund || npm i --no-audit --no-fund

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build || (echo "Falling back to dev start" && exit 0)


FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app .
EXPOSE 3000
CMD ["npm", "run", "dev"]

FROM node:20-alpine
WORKDIR /app
RUN corepack enable
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
EXPOSE 4200
CMD ["npm","run","start"]

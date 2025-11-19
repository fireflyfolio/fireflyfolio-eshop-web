# Run locally (quick manual test)

## network
```bash
docker network create eshop-net || true
```

##  infra
```bash
docker run -d --name pg --network eshop-net -e POSTGRES_DB=eshop -e POSTGRES_USER=eshop -e POSTGRES_PASSWORD=eshop postgres:16
docker run -d --name redis --network eshop-net -p 6379:6379 redis:7-alpine
```

##  build images
```bash
docker build -t web-api ./web-api
docker build -t web-frontend ./web-frontend
```

##  web-api
```bash
docker rm -f web-api 2>/dev/null || true
docker run -d --name web-api --network eshop-net -p 13001:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:postgresql://pg:5432/eshop \
  -e SPRING_DATASOURCE_USERNAME=eshop \
  -e SPRING_DATASOURCE_PASSWORD=eshop \
  -e SPRING_DATA_REDIS_HOST=redis \
  -e SPRING_DATA_REDIS_PORT=6379 \
  web-api
```  

## web-frontend (IMPORTANT: use internal port 8080 for API URL inside the network)
```bash
docker rm -f web-frontend 2>/dev/null || true
docker run -d --name web-frontend --network eshop-net -p 13000:8080 \
  -e WEB_API_URL=http://web-api:8080 \
  -e SPRING_DATA_REDIS_HOST=redis \
  -e SPRING_DATA_REDIS_PORT=6379 \
  web-frontend
```  

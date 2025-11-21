# Run locally (quick manual test)

# network & infra
```bash
docker network create eshop-net || true
docker run -d --name pg --network eshop-net \
  -e POSTGRES_DB=eshop -e POSTGRES_USER=eshop -e POSTGRES_PASSWORD=eshop \
  postgres:16
docker run -d --name redis --network eshop-net redis:7-alpine
```

# admin-api
```bash
docker build -t admin-api ./admin-api
docker run -d --name admin-api --network eshop-net -p 14001:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:postgresql://pg:5432/eshop \
  -e SPRING_DATASOURCE_USERNAME=eshop -e SPRING_DATASOURCE_PASSWORD=eshop \
  -e SPRING_DATA_REDIS_HOST=redis -e SPRING_DATA_REDIS_PORT=6379 \
  admin-api
```

# admin-frontend (Angular dev server)
```bash
docker build -t admin-frontend ./admin-frontend
docker run -d --name admin-frontend --network eshop-net -p 14000:4200 admin-frontend
```

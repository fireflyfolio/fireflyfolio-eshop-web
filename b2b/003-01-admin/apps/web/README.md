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

# Fix user test password

Add this tiny, temporary endpoint (permit-all) into admin-api/src/main/java/com/eshop/webapi/web/DebugHashController.java:

```bash
package com.eshop.webapi.web;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/debug")
public class DebugHashController {
  private final PasswordEncoder enc;
  public DebugHashController(PasswordEncoder enc){ this.enc = enc; }

  @GetMapping("/hash")
  public String hash(@RequestParam String pw) { return enc.encode(pw); }
}
```

Make sure your SecurityConfig already allows it (permit GET /status and you can add /debug/** too):
```bash
.requestMatchers(HttpMethod.GET, "/auth/me", "/status", "/debug/**").permitAll()
```

Rebuild & run the API, then:

```bash
HASH=$(curl -s "http://localhost:14001/debug/hash?pw=test")
docker exec -it pg psql -U eshop -d eshop -c \
"insert into users(email,password_hash,enabled) values ('test@test','${HASH}',true)
 on conflict (email) do update set password_hash=excluded.password_hash, enabled=true;"
```

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


# Fix admin password

Add this tiny, temporary endpoint (permit-all) into admin-api/src/main/java/com/eshop/adminapi/web/DebugHashController.java:

```bash
package com.eshop.adminapi.web;

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
HASH=$(curl -s "http://localhost:14001/debug/hash?pw=admin")
docker exec -it pg psql -U eshop -d eshop -c \
"insert into admins(email,password_hash,enabled) values ('admin@admin','${HASH}',true)
 on conflict (email) do update set password_hash=excluded.password_hash, enabled=true;"
```

package com.eshop.adminapi;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class StatusController {

  private final StringRedisTemplate redis;
  private final JdbcTemplate jdbc;

  @GetMapping("/status")
  public ResponseEntity<String> status() {
    try {
      Long hits = redis.opsForValue().increment("web_api_status_hits", 1);
      jdbc.update("insert into ping_log(service) values (?)", "web-api");
      log.info("Status hit (web-api), total={}", hits);
    } catch (Exception e) {
      log.warn("Redis unavailable: {}", e.getMessage());
    }

    return ResponseEntity.ok("Hello dear manager");
  }
}

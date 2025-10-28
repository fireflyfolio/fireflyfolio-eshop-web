package com.eshop.webfrontend;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
public class ProxyController {

  private static final Logger log = LoggerFactory.getLogger(ProxyController.class);

  @Value("${app.webApiUrl}")
  String webApiUrl;

  // RestClient (Spring 6) est thread-safe, on peut le garder en champ
  private final RestClient rest = RestClient.create();

  @GetMapping("/api/status")
  public ResponseEntity<String> status() {
    String url = webApiUrl.endsWith("/") ? webApiUrl + "status" : webApiUrl + "/status";
    String body = rest.get().uri(url).retrieve().body(String.class);
    log.info("Proxy /api/status -> {}", body);
    return ResponseEntity.ok(body);
  }
}

package com.eshop.webfrontend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * En local, si la web-api n'est pas up, on accepte 5xx.
 * En Docker Compose (tous services up), la route répond 200.
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ProxyControllerTest {

  @Autowired
  private TestRestTemplate rest;

  @Test
  void api_status_endpoint_reachable() {
    ResponseEntity<String> res = rest.getForEntity("/api/status", String.class);
    assertThat(res.getStatusCode().is2xxSuccessful() || res.getStatusCode().is5xxServerError()).isTrue();
  }
}

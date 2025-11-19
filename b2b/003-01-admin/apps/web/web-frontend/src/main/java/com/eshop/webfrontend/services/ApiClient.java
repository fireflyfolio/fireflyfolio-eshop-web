package com.eshop.webfrontend.services;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
@Slf4j
@RequiredArgsConstructor
public class ApiClient {

  private final RestClient rest;
  private static final String API_COOKIE = "API_SESSION_COOKIE";

  public boolean login(HttpSession session, String email, String password) {
    var res = rest.post().uri("/auth/login")
        .header("Content-Type", "application/json")
        .body("{\"email\":\"%s\",\"password\":\"%s\"}".formatted(email, password))
        .retrieve()
        .toBodilessEntity();

    // Capture SESSION cookie from the API response (if any)
    ResponseEntity.HeadersBuilder<?> hb = ResponseEntity.status(res.getStatusCode());
    var setCookies = res.getHeaders().get("Set-Cookie");
    if (setCookies != null) {
      // store first Set-Cookie containing SESSION
      var sessionCookie = setCookies.stream().filter(v -> v.startsWith("SESSION")).findFirst().orElse(null);
      if (sessionCookie != null) {
        session.setAttribute(API_COOKIE, sessionCookie);
        log.info("Stored API session cookie");
      }
    }
    return res.getStatusCode().is2xxSuccessful();
  }

  public void logout(HttpSession session) {
    var cookie = (String) session.getAttribute(API_COOKIE);
    var req = rest.post().uri("/auth/logout");
    if (cookie != null) req = req.header("Cookie", cookie);
    req.retrieve().toBodilessEntity();
    session.removeAttribute(API_COOKIE);
  }

  public String me(HttpSession session) {
    var cookie = (String) session.getAttribute(API_COOKIE);
    var req = rest.get().uri("/auth/me");
    if (cookie != null) req = req.header("Cookie", cookie);
    var body = req.retrieve().body(String.class);
    return body;
  }
}

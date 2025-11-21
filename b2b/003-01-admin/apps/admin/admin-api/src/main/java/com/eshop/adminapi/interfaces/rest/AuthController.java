package com.eshop.adminapi.web;

import com.eshop.adminapi.infra.JdbcAdminRepository;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequiredArgsConstructor
public class AuthController {
  private final JdbcAdminRepository repo;
  private final PasswordEncoder encoder;

  public record LoginReq(@Email String email, @NotBlank String password) {
  }

  public record LoginRes(String message) {
  }

  public record ForgotReq(@Email String email) {
  }

  public record MeRes(String email, boolean authenticated) {
  }

  @PostMapping("/auth/login")
  public ResponseEntity<LoginRes> login(@RequestBody @Valid LoginReq req, HttpSession session) {
    var admin = repo.findByEmail(req.email());

    if (admin == null || !admin.isEnabled() || !encoder.matches(req.password(), admin.getPasswordHash()))
      return ResponseEntity.status(401).body(new LoginRes("Invalid credentials"));

    session.setAttribute("ADMIN_EMAIL", admin.getEmail());

    return ResponseEntity.ok(new LoginRes("OK"));
  }

  @PostMapping("/auth/logout")
  public ResponseEntity<Void> logout(HttpSession session) {
    session.invalidate();
    return ResponseEntity.noContent().build();
  }

  @PostMapping("/auth/forgot-password")
  public ResponseEntity<Void> forgot(@RequestBody @Valid ForgotReq req) {
    // demo: do nothing, pretend mail sent
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/auth/me")
  public MeRes me(HttpSession session) {
    var e = (String) session.getAttribute("ADMIN_EMAIL");
    return new MeRes(e, e != null);
  }

  @GetMapping("/status")
  public String status() {
    return "Hello dear manager";
  }
}

package com.eshop.adminapi.web;

import com.eshop.adminapi.infra.JdbcAdminRepository;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import java.util.List;

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
  public ResponseEntity<LoginRes> login(@RequestBody @Valid LoginReq req,
      HttpServletRequest request,
      HttpServletResponse response) {
    var admin = repo.findByEmail(req.email());
    if (admin == null || !admin.isEnabled() || !encoder.matches(req.password(), admin.getPasswordHash())) {
      return ResponseEntity.status(401).body(new LoginRes("Invalid credentials"));
    }

    // 1) créer la session si besoin
    var session = request.getSession(true);
    session.setAttribute("ADMIN_EMAIL", admin.getEmail());
    session.setMaxInactiveInterval(1800); // 30 min

    // 2) créer une Authentication avec un rôle
    var auth = new UsernamePasswordAuthenticationToken(
        admin.getEmail(), null, List.of(new SimpleGrantedAuthority("ROLE_ADMIN")));

    // 3) placer l'Authentication dans le SecurityContext
    SecurityContext context = SecurityContextHolder.createEmptyContext();
    context.setAuthentication(auth);

    // 4) sauver le SecurityContext en session (clé Spring Security standard)
    session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, context);

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

package com.eshop.webapi.interfaces.rest;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.eshop.webapi.application.auth.AuthenticateUserUseCase;
import com.eshop.webapi.application.auth.RequestPasswordResetUseCase;

@Validated
@RestController
@RequiredArgsConstructor
public class AuthController {

  private final AuthenticateUserUseCase authUseCase;
  private final RequestPasswordResetUseCase resetUseCase;

  public record LoginRequest(@Email String email, @NotBlank String password) {}
  public record LoginResponse(String message) {}
  public record ForgotRequest(@Email String email) {}
  public record MeResponse(String email, boolean authenticated) {}

  @PostMapping("/auth/login")
  public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest req, HttpSession session) {
    var user = authUseCase.authenticate(req.email(), req.password());
    session.setAttribute("USER_EMAIL", user.getEmail());
    return ResponseEntity.ok(new LoginResponse("OK"));
  }

  @PostMapping("/auth/logout")
  public ResponseEntity<Void> logout(HttpSession session) {
    session.invalidate();
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/auth/me")
  public ResponseEntity<MeResponse> me(HttpSession session) {
    var email = (String) session.getAttribute("USER_EMAIL");
    boolean auth = email != null;
    return ResponseEntity.ok(new MeResponse(auth ? email : null, auth));
  }

  @PostMapping("/auth/forgot-password")
  public ResponseEntity<Void> forgot(@RequestBody ForgotRequest req) {
    resetUseCase.request(req.email());
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/status")
  public ResponseEntity<String> status() { return ResponseEntity.ok("Hello dear vendor"); }
}

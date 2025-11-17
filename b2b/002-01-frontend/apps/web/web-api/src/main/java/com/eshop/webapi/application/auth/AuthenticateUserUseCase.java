package com.eshop.webapi.application.auth;

import com.eshop.webapi.domain.user.User;

import org.springframework.security.crypto.password.PasswordEncoder;

public class AuthenticateUserUseCase {

  public interface UserRepository {
    User findByEmail(String email);
  }

  private final UserRepository repo;
  private final PasswordEncoder encoder;

  public AuthenticateUserUseCase(UserRepository repo, PasswordEncoder encoder) {
    this.repo = repo; this.encoder = encoder;
  }

  public User authenticate(String email, String rawPassword) {
    var user = repo.findByEmail(email);

    if (user == null || !user.isEnabled())
      throw new IllegalArgumentException("Invalid credentials");

    if (!encoder.matches(rawPassword, user.getPasswordHash()))
      throw new IllegalArgumentException("Invalid credentials");

    return user;
  }
}

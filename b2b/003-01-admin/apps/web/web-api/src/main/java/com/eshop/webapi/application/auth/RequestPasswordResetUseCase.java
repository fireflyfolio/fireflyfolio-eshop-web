package com.eshop.webapi.application.auth;

public class RequestPasswordResetUseCase {

  public interface MailPort {
    void send(String to, String subject, String text);
  }

  public interface UserLookup {
    boolean existsByEmail(String email);
  }

  private final UserLookup userLookup;
  private final MailPort mailPort;

  public RequestPasswordResetUseCase(UserLookup userLookup, MailPort mailPort) {
    this.userLookup = userLookup;
    this.mailPort = mailPort;
  }

  public void request(String email) {
    // Do not leak whether the email exists; still show success.
    if (email == null || email.isBlank()) return;

    if (userLookup.existsByEmail(email)) {
      // In real life: create a token, persist, send link.
      mailPort.send(
        email,
        "Password reset",
        "We received a password reset request. If this was you, please follow the link (demo only)."
      );
    }
  }
}

package com.eshop.webapi.domain.user;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class User {
  Long id;
  String email;
  String passwordHash; // BCrypt
  boolean enabled;
}

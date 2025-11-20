package com.eshop.adminapi.domain;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class Admin {
  Long id;
  String email;
  String passwordHash;
  boolean enabled;
}

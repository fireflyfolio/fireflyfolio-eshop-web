package com.eshop.adminapi.domain;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class Vendor {
  Long id;
  String email;
  String name;
  boolean enabled;
}

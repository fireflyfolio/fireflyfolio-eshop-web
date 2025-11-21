package com.eshop.adminapi.infra.auth;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

  @Bean
  PasswordEncoder passwordEncoder() {
    // supporte {bcrypt} ... etc.
    return PasswordEncoderFactories.createDelegatingPasswordEncoder();
  }

  @Bean
  SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
      .csrf(csrf -> csrf.disable())
      .httpBasic(h -> h.disable())
      .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
      .exceptionHandling(e -> e.authenticationEntryPoint((req, res, ex) -> res.sendError(401)))
      .authorizeHttpRequests(reg -> reg
        // PUBLIC
        .requestMatchers(HttpMethod.GET, "/status", "/auth/me").permitAll()
        .requestMatchers(HttpMethod.POST, "/auth/login", "/auth/forgot-password", "/auth/logout").permitAll()
        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
        // PROTÉGÉ
        .anyRequest().authenticated()
      )
      // (facultatif) si tu utilises formLogin ailleurs:
      .formLogin(Customizer.withDefaults())
      .build();
  }
}

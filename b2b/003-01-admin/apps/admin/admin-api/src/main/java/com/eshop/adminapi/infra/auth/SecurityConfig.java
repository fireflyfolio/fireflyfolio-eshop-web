package com.eshop.adminapi.infra;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration @RequiredArgsConstructor
public class SecurityConfig {

  @Bean PasswordEncoder passwordEncoder() {
    return PasswordEncoderFactories.createDelegatingPasswordEncoder(); // supports {bcrypt}...
  }

  @Bean SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
      .csrf(csrf -> csrf.disable())               // 1) pas de CSRF pour nos POST JSON
      .httpBasic(h -> h.disable())                // 2) pas de WWW-Authenticate
      .exceptionHandling(e ->                     // 3) 401 simple au lieu de popup
          e.authenticationEntryPoint((req,res,ex) -> res.sendError(401))
      )
      .authorizeHttpRequests(reg -> reg
      // --- routes publiques ---
      .requestMatchers(HttpMethod.GET, "/status", "/auth/me").permitAll()
      .requestMatchers(HttpMethod.POST, "/auth/login", "/auth/forgot-password", "/auth/logout").permitAll()
      // si besoin: preflight
      .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
      // --- le reste protégé ---
      .anyRequest().authenticated()
    )
      .build();
  }
}

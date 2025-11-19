package com.eshop.webapi.infrastructure.auth;

import com.eshop.webapi.application.auth.AuthenticateUserUseCase;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

  private final JdbcUserRepository userRepo;

  @Bean
  public PasswordEncoder passwordEncoder() {
    return org.springframework.security.crypto.factory.PasswordEncoderFactories.createDelegatingPasswordEncoder();
  }

  @Bean
  AuthenticateUserUseCase authenticateUserUseCase(PasswordEncoder encoder) {
    return new AuthenticateUserUseCase(userRepo, encoder);
  }

  @Bean
  SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
      .csrf(csrf -> csrf.disable())
      .authorizeHttpRequests(reg -> reg
        .requestMatchers(HttpMethod.POST, "/auth/login", "/auth/forgot-password").permitAll()
        .requestMatchers(HttpMethod.GET, "/status", "/auth/me").permitAll() 
        .anyRequest().authenticated()
      )
      .httpBasic(Customizer.withDefaults())
      .build();
  }
}

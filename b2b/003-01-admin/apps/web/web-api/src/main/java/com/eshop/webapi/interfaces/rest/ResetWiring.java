package com.eshop.webapi.interfaces.rest;

import com.eshop.webapi.application.auth.RequestPasswordResetUseCase;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
public class ResetWiring {
  @Bean
  RequestPasswordResetUseCase resetUseCase(com.eshop.webapi.application.auth.RequestPasswordResetUseCase.UserLookup lookup) {
    // MailPort demo: just log
    RequestPasswordResetUseCase.MailPort mail = (to, subject, text) ->
        log.info("[DEMO MAIL] To={} Subject={} Body={}", to, subject, text);
    return new RequestPasswordResetUseCase(lookup, mail);
  }
}

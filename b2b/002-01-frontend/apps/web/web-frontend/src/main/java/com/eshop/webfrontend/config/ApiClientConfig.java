package com.eshop.webfrontend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class ApiClientConfig {
  @Bean RestClient restClient(@Value("${app.webApiUrl}") String base) {
    return RestClient.builder().baseUrl(base).build();
  }
}

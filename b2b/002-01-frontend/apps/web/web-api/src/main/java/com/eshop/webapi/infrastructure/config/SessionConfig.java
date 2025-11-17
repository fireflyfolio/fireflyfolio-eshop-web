package com.eshop.webapi.infrastructure.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

@Configuration
@EnableRedisHttpSession // backs HTTP session IDs in Redis
public class SessionConfig {}

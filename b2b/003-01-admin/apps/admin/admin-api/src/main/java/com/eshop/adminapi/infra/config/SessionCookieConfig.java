package com.eshop.adminapi.infra;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.session.web.http.CookieSerializer;
import org.springframework.session.web.http.DefaultCookieSerializer;

@Configuration
public class SessionCookieConfig {

  @Bean
  public CookieSerializer cookieSerializer() {
    DefaultCookieSerializer s = new DefaultCookieSerializer();

    s.setCookieName("SESSION");
    s.setSameSite("Lax");       // idéal en proxy même origine
    s.setUseSecureCookie(false); // HTTP en local
    s.setCookiePath("/");

    return s;
  }
}

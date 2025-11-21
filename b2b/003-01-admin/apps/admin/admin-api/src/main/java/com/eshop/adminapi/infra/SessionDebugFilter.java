package com.eshop.adminapi.infra;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.slf4j.Logger; import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.util.Collections;

@Component
public class SessionDebugFilter implements Filter {
  private static final Logger log = LoggerFactory.getLogger(SessionDebugFilter.class);
  @Override public void doFilter(ServletRequest rq, ServletResponse rs, FilterChain chain) throws IOException, ServletException {
    HttpServletRequest r = (HttpServletRequest) rq;
    String cookie = Collections.list(r.getHeaders("Cookie")).toString();
    HttpSession s = r.getSession(false);
    String id = (s!=null)? s.getId() : "no-session";
    Object email = (s!=null)? s.getAttribute("ADMIN_EMAIL") : null;
    log.info("REQ {} {} | Cookie={} | session={} | admin={}", r.getMethod(), r.getRequestURI(), cookie, id, email);
    chain.doFilter(rq, rs);
  }
}

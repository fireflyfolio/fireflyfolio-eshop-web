package com.eshop.adminapi.infra;

import com.eshop.adminapi.domain.Admin;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository @RequiredArgsConstructor
public class JdbcAdminRepository {
  private final JdbcTemplate jdbc;

  public Admin findByEmail(String email){
    var list = jdbc.query("""
      select id,email,password_hash,enabled from admins where email=?
    """, (rs,i)-> Admin.builder()
            .id(rs.getLong("id"))
            .email(rs.getString("email"))
            .passwordHash(rs.getString("password_hash"))
            .enabled(rs.getBoolean("enabled"))
            .build(), email);

    return list.isEmpty()? null : list.getFirst();
  }
}

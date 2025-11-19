package com.eshop.webapi.infrastructure.auth;

import com.eshop.webapi.application.auth.AuthenticateUserUseCase;
import com.eshop.webapi.application.auth.RequestPasswordResetUseCase;
import com.eshop.webapi.domain.user.User;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class JdbcUserRepository implements AuthenticateUserUseCase.UserRepository, RequestPasswordResetUseCase.UserLookup {

  private final JdbcTemplate jdbc;

  @Override
  public User findByEmail(String email) {
    var list = jdbc.query("""
        select id, email, password_hash, enabled
        from users where email = ?
        """,
        (rs, i) -> User.builder()
            .id(rs.getLong("id"))
            .email(rs.getString("email"))
            .passwordHash(rs.getString("password_hash"))
            .enabled(rs.getBoolean("enabled"))
            .build(),
        email);
    return list.isEmpty() ? null : list.getFirst();
  }

  @Override
  public boolean existsByEmail(String email) {
    Integer count = jdbc.queryForObject("select count(*) from users where email = ?", Integer.class, email);
    return count != null && count > 0;
  }
}

package com.eshop.adminapi.infra;

import com.eshop.adminapi.domain.Vendor;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class JdbcVendorRepository {
  private final JdbcTemplate jdbc;

  public List<Vendor> list(){
    return jdbc.query("select id,email,name,enabled from vendors order by id",
      (rs,i)-> Vendor.builder()
        .id(rs.getLong("id")).email(rs.getString("email"))
        .name(rs.getString("name")).enabled(rs.getBoolean("enabled")).build());
  }
}

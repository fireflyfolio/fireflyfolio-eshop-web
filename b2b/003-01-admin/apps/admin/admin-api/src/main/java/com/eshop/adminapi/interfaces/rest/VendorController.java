package com.eshop.adminapi.web;

import com.eshop.adminapi.infra.JdbcVendorRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.eshop.adminapi.domain.Vendor;

@RestController
@RequestMapping("/vendors")
@RequiredArgsConstructor
public class VendorController {
  private final JdbcVendorRepository repo;

  @GetMapping
  public List<Vendor> list(){ return repo.list(); }
}

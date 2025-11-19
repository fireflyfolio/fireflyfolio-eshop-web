package com.eshop.webfrontend.web;

import com.eshop.webfrontend.services.ApiClient;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class HomeController {

  private final ApiClient api;

  @GetMapping("/")
  public String home(Model model, HttpSession session) {
    var email = (String) session.getAttribute("UI_EMAIL");
    model.addAttribute("email", email != null ? email : "Guest");
    return "home";
  }

  @GetMapping("/catalog")
  public String catalog() {
    return "home";
  } // placeholder page shares layout for now
}

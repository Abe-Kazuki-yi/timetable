package com.management.timetable.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class AdminHomeController {
	
	@GetMapping
	public String showStudentHome() {
		return "admin/admin/adminHome";
	}
	
}

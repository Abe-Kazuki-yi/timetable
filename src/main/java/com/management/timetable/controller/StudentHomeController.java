package com.management.timetable.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/student")
public class StudentHomeController {
	@GetMapping
	public String showLogin() {
		return "admin/student/studentHome";
	}
}

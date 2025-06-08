package com.management.timetable.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/student")
public class StudentHomeController {
	
	@GetMapping
	public String showStudentHome() {
		return "admin/student/studentHome";
	}
	
	@GetMapping("/register")
	public String showStudentRegister() {
		return "admin/student/studentRegister";
	}
	
	@GetMapping("/account")
	public String showStudentAccount() {
		return "admin/student/studentAccount";
	}
	
	@GetMapping("/schedule")
	public String showStudentSchedule() {
		return "admin/student/studentSchedule";
	}
}

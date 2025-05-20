package com.management.timetable.test;

import java.util.Arrays;
import java.util.stream.IntStream;

import com.management.timetable.algorithm.MakeSchedule;
import com.management.timetable.algorithm.algorithmImpl.MakeScheduleImpl;

public class Display {

	public static void main(String[] args) {
		MakeSchedule makeSchedule = new MakeScheduleImpl();
		
		double testOutput = makeSchedule.outputDayFromProgress(0.3);
		System.out.println(testOutput);
		
		IntStream stream = Arrays.stream(makeSchedule.outputTaskDayFromAllDays(8, 10));
		stream.forEach(System.out::println);
	}

}

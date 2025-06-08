package com.management.timetable.algorithm.algorithmImpl;

import com.management.timetable.algorithm.MakeSchedule;

public class MakeScheduleImpl implements MakeSchedule {

	private double thresholdDay = 0.2;
	private double finishDay = 0.95;
	
	@Override
	public double outputProgressFromDay(double day) {
		
		if(day >= thresholdDay) {
			return (Math.log10(day*10))/(Math.log10(finishDay*10));
		}else {
			return (Math.log10(thresholdDay*10)/((thresholdDay * 10)*Math.log10(finishDay*10)))*(day*10);
		}
	}
	
	@Override
	public double outputDayFromProgress(double task) {
		
		if(task >= (Math.log10(thresholdDay*10))/(Math.log10(finishDay*10))){
			return Math.pow(finishDay*10, task)/10;
		}else {
			return ((thresholdDay * 10) * Math.log10(finishDay*10)*task)/(10*Math.log10(thresholdDay * 10));
		}
	}
	
	
	@Override
	public int[] outputTaskDayFromAllDays(int task, int day) {
		
		double x;
		double limitDay;
		int outputDay = day;
		int[] output = new int[task];
				
		for(int i = 0; i < task; i++) {
			x = (i+1) /(double)task;
			limitDay = outputDayFromProgress(x);
			for(int j = 0; j <= day; j++) {
				double y = j / (double)day;
				if(limitDay < y) {
					outputDay = Integer.max(1, j);
					break;
				}
				if(j == day) {
					outputDay = day;
				}
			}
			output[i] = outputDay;
		}
		return output;
	}

}

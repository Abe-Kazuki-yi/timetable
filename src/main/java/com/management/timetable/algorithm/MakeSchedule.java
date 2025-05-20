package com.management.timetable.algorithm;

public interface MakeSchedule {
	//全体の日付に対する現在の日付(0から1)を引数にとり、その日までに終わらせたいタスク量(0から1)を返す。
	public double outputProgressFromDay(double day);
	
	//全体のタスクに対する現在のタスク(0から1)を引数にとり、何日までに終わらせるべきか(0から1)を返す。
	public double outputDayFromProgress(double task);
	
	//タスク量taskと全体の日数dayを引数に取り、何日にタスクをこなすのが良いかを返すsizeがtaskに等しい大きさのint[]を返す。
	//生徒の1日の上限授業数を決めてそれを超えないようにしたい(未実装)
	public int[] outputTaskDayFromAllDays(int task, int day);
	
}

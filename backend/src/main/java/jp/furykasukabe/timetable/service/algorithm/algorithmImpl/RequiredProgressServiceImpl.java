package jp.furykasukabe.timetable.service.algorithm.algorithmImpl;

import org.springframework.stereotype.Service;

import jp.furykasukabe.timetable.service.algorithm.RequiredProgressService;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class RequiredProgressServiceImpl implements RequiredProgressService {

    private final double thresholdDay = 0.2; // 全体の2割までは直線
    private final double finishDay = 0.95;   // 全体の95%でタスク完了

    @Override
    public double outputProgressFromDay(double day) {
        log.debug("Calculating progress from day: {}", day);

        double result;
        if (day >= thresholdDay) {
            result = Math.log10(day * 10) / Math.log10(finishDay * 10);
            log.debug("Using logarithmic formula: result = {}", result);
        } else {
            result = (Math.log10(thresholdDay * 10) / ((thresholdDay * 10) * Math.log10(finishDay * 10))) * (day * 10);
            log.debug("Using linear formula: result = {}", result);
        }

        log.info("Progress for day {} is {}", day, result);
        return result;
    }

    @Override
    public double outputDayFromProgress(double task) {
        log.debug("Calculating day from progress: {}", task);

        double result;
        double thresholdProgress = Math.log10(thresholdDay * 10) / Math.log10(finishDay * 10);

        if (task >= thresholdProgress) {
            result = Math.pow(finishDay * 10, task) / 10;
            log.debug("Using logarithmic inverse formula: result = {}", result);
        } else {
            result = ((thresholdDay * 10) * Math.log10(finishDay * 10) * task) / (10 * Math.log10(thresholdDay * 10));
            log.debug("Using linear inverse formula: result = {}", result);
        }

        log.info("Day for progress {} is {}", task, result);
        return result;
    }

	@Override
	public int[] outputTaskDayFromAllDays(int task, int day) {
		double x;
		double limitDay;
		int outputDay = day;
		int[] output = new int[task];

		for (int i = 0; i < task; i++) {
			x = (i + 1) / (double) task;
			limitDay = outputDayFromProgress(x);
			for (int j = 0; j <= day; j++) {
				double y = j / (double) day;
				if (limitDay < y) {
					outputDay = Integer.max(1, j);
					break;
				}
				if (j == day) {
					outputDay = day;
				}
			}
			output[i] = outputDay;
		}
		return output;
	}

}

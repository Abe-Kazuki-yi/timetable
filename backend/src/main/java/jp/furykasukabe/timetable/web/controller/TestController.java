package jp.furykasukabe.timetable.web.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jp.furykasukabe.timetable.service.algorithm.RequiredProgressService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
@Slf4j
public class TestController {

    private final RequiredProgressService rp;

    @GetMapping("/progress/{day}")
    public double returnProgressFromDay(@PathVariable String day) {
        log.info("Received request: /progress/{}", day);
        try {
            double parsedDay = Double.parseDouble(day);
            double result = rp.outputProgressFromDay(parsedDay);
            log.debug("Calculated progress for day {}: {}", parsedDay, result);
            return result;
        } catch (NumberFormatException e) {
            log.warn("Invalid day format: {}", day, e);
            throw new IllegalArgumentException("Invalid day value: " + day);
        }
    }

    @GetMapping("/day/{progress}")
    public double returnDayFromProgress(@PathVariable String progress) {
        log.info("Received request: /day/{}", progress);
        try {
            double parsedProgress = Double.parseDouble(progress);
            double result = rp.outputDayFromProgress(parsedProgress);
            log.debug("Calculated day for progress {}: {}", parsedProgress, result);
            return result;
        } catch (NumberFormatException e) {
            log.warn("Invalid progress format: {}", progress, e);
            throw new IllegalArgumentException("Invalid progress value: " + progress);
        }
    }
}

package jp.furykasukabe.timetable.support;
import java.io.IOException;

import org.slf4j.MDC;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class TestIdLoggingFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String testId = request.getHeader("X-Test-Id"); // 例：ヘッダーから取得
        if (testId != null) {
            MDC.put("testId", testId);
        }
        try {
            filterChain.doFilter(request, response);
        } finally {
            MDC.remove("testId"); // リクエスト終了時にクリア
        }
    }
}


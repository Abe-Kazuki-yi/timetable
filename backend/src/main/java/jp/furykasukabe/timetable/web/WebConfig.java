package jp.furykasukabe.timetable.web;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 全てのパスに対して
                .allowedOrigins("http://localhost:3000") // このオリジンを許可
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 必要なHTTPメソッドを指定
                .allowedHeaders("*") // 任意のヘッダーを許可
                .allowCredentials(true); // Cookie や認証情報を含める場合は true
    }
}

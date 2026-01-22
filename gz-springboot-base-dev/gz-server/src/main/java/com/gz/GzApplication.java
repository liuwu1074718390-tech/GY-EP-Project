package com.gz;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

/**
 * 启动程序
 *
 * @author gz
 */
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class GzApplication {
    public static void main(String[] args) {
        // System.setProperty("spring.devtools.restart.enabled", "false");
        SpringApplication.run(GzApplication.class, args);
        printGZ();
    }

    public static void printGZ() {
        System.out.println("(♥◠‿◠)ﾉﾞ  系统启动成功   ლ(´ڡ`ლ)ﾞ  ");
        System.out.println("  GGGGG  ZZZZZ ");
        System.out.println(" G     G      Z ");
        System.out.println(" G            Z ");
        System.out.println(" G  GGGG      Z ");
        System.out.println(" G     G    Z  ");
        System.out.println("  GGGGG    ZZZZZ  ");
    }
}

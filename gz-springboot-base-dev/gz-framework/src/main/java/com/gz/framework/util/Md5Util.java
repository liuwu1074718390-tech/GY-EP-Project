package com.gz.framework.util;

import lombok.extern.slf4j.Slf4j;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

/**
 * Md5加密方法
 *
 * @author gz
 */
@Slf4j
public class Md5Util {

    public static void main(String[] args) {
        byte[] admin123s = md5("admin123");

        String password = SecurityUtil.encryptPassword("admin123");

        String hex = toHex(admin123s);
        System.out.println(hex);
        System.out.println(hex.length());
        System.out.println(hash(hex));

        String password2 = SecurityUtil.encryptPassword(hex);

        System.out.println(password);
        System.out.println(password.length());

        System.out.println(password2);
        System.out.println(password2.length());
    }

    private static byte[] md5(String s) {
        MessageDigest algorithm;
        try {
            algorithm = MessageDigest.getInstance("MD5");
            algorithm.reset();
            algorithm.update(s.getBytes("UTF-8"));
            byte[] messageDigest = algorithm.digest();
            return messageDigest;
        } catch (Exception e) {
            log.error("MD5 Error...", e);
        }
        return null;
    }

    private static final String toHex(byte hash[]) {
        if (hash == null) {
            return null;
        }
        StringBuffer buf = new StringBuffer(hash.length * 2);
        int i;

        for (i = 0; i < hash.length; i++) {
            if ((hash[i] & 0xff) < 0x10) {
                buf.append("0");
            }
            buf.append(Long.toString(hash[i] & 0xff, 16));
        }
        return buf.toString();
    }

    public static String hash(String s) {
        try {
            return new String(toHex(md5(s)).getBytes(StandardCharsets.UTF_8), StandardCharsets.UTF_8);
        } catch (Exception e) {
            log.error("not supported charset...{}", e);
            return s;
        }
    }
}

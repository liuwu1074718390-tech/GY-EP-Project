package com.gz.common.util.sign;

import com.gz.common.exception.BizException;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.binary.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

/**
 * 对称AES加解密工具类
 *
 * @author gz
 * @since 2024-06-28
 */
@Slf4j
public class AESUtil {
    //使用AES-128-CBC加密模式，key需要为16位,key和iv可以相同，也可以不同!
    private static String KEY = "aaDJL2d9DfhLZO0z";
    private static String IV = "412ADDSSFA342442";
    private static final String CIPHER_ALGORITHM_CBC = "AES/CBC/NoPadding";
    private static final String CHARSET = "UTF-8";


    /**
     * 加密方法 返回base64加密字符串
     * 和前端保持一致
     *
     * @param data 要加密的数据
     * @param key  加密key
     * @param iv   加密iv
     * @return 加密的结果
     * @throws Exception
     */
    public static String encrypt(String data, String key, String iv) throws Exception {
        try {
            Cipher cipher = Cipher.getInstance(CIPHER_ALGORITHM_CBC);//"算法/模式/补码方式"NoPadding PKCS5Padding
            int blockSize = cipher.getBlockSize();

            byte[] dataBytes = data.getBytes();
            int plaintextLength = dataBytes.length;
            if (plaintextLength % blockSize != 0) {
                plaintextLength = plaintextLength + (blockSize - (plaintextLength % blockSize));
            }
            byte[] plaintext = new byte[plaintextLength];
            System.arraycopy(dataBytes, 0, plaintext, 0, dataBytes.length);

            SecretKeySpec keyspec = new SecretKeySpec(key.getBytes(), "AES");
            IvParameterSpec ivspec = new IvParameterSpec(iv.getBytes());

            cipher.init(Cipher.ENCRYPT_MODE, keyspec, ivspec);
            byte[] encrypted = cipher.doFinal(plaintext);

            return new Base64().encodeToString(encrypted);
        } catch (Exception e) {
            log.error("AES解密失败:", e);
            throw new BizException("解密失败,请联系管理员");
        }
    }

    /**
     * 解密方法
     *
     * @param data 要解密的数据
     * @param key  解密key
     * @param iv   解密iv
     * @return 解密的结果
     */
    public static String decrypt(String data, String key, String iv) {
        try {
            Cipher cipher = Cipher.getInstance(CIPHER_ALGORITHM_CBC);
            SecretKeySpec keyspec = new SecretKeySpec(key.getBytes(), "AES");
            IvParameterSpec ivspec = new IvParameterSpec(iv.getBytes());
            cipher.init(Cipher.DECRYPT_MODE, keyspec, ivspec);
            byte[] original = cipher.doFinal(new Base64().decode(data));
            return new String(original, "UTF-8").trim();
        } catch (Exception e) {
            log.error("AES加密失败:", e);
            throw new BizException("加密失败,请联系管理员");
        }
    }

    /**
     * 使用默认的key和iv加密
     *
     * @param data
     * @return
     * @throws Exception
     */
    public static String encrypt(String data) throws Exception {
        return encrypt(data, KEY, IV);
    }

    /**
     * 使用默认的key和iv解密
     *
     * @param data
     * @return
     * @throws Exception
     */
    public static String decrypt(String data) throws Exception {
        return decrypt(data, KEY, IV);
    }

    public static void main(String[] args) throws Exception {
        String decrypt = decrypt("YC3v0TWbB7zHX98ywIvfb2y1YIHKOEwDNsEV1ySF/6U=");
        System.out.println(decrypt);
    }
}

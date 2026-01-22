package com.gz.common.util.sign;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.nio.charset.StandardCharsets;
import java.security.*;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;

@Slf4j
public class RSAUtil {

    public static String RSA_ALGORITHM = "RSA";
    public static String UTF8 = "UTF-8";

    /**
     * 密钥长度，DSA算法的默认密钥长度是1024
     * 密钥长度必须是64的倍数，在512到65536位之间
     */
    private static final int KEY_SIZE = 1024;

    public static void main(String[] args) throws Exception {
        testJiami();
//        testJiemi();

//        testBase64();
    }

    public static void testBase64() {
        // 原始数据
        String originalString = "Hello, World!";
        // 编码
        byte[] encodedBytes = java.util.Base64.getEncoder().encode(originalString.getBytes(StandardCharsets.UTF_8));
        // 将编码后的byte数组转换为字符串并打印
        String encodedString = new String(encodedBytes, StandardCharsets.UTF_8);
        System.out.println("Encoded String: " + encodedString);

        // 如果你已经有一个Base64编码的byte数组需要打印，应该这样处理：
        String correctEncodedString = new String(encodedBytes, StandardCharsets.US_ASCII); // 注意这里使用US_ASCII
        System.out.println("Correctly Printed Encoded String: " + correctEncodedString);
    }

    public static void testJiami() throws Exception {
        String password = "jiang=xxu&xxuxu-aa=damin@cummins.com%";

        RSAKey key = createKey();

        byte[] encryptByPublicKey = encryptByPublicKey(password.getBytes(), Base64Util.decode(key.getPublicKey()));
        System.out.println("使用公钥加密后的数据：" + Base64Util.encode(encryptByPublicKey));

        byte[] decryptByPrivateKey = decryptByPrivateKey(encryptByPublicKey, Base64Util.decode(key.getPrivateKey()));
        System.out.println("使用私钥解密后的数据：" + new String(decryptByPrivateKey));

    }

    private static void testJiemi() throws Exception {
//        公钥：MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDDtSflCK8MQ78cmnOpMFMAuotNLZgONTZUp28+BO6ddbipka3blRiWy0nFOho2+yW6UuWXcRfD+Bi0ATpWXiYzdiW+sP33xr6LCOZwMk31ESVU/NMAoTfGDisaY766WTcswzgEhIlaBB+ZSutNKVerAoUzqDENU6Qnv5Sn/qzxywIDAQAB
//        私钥：MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAMO1J+UIrwxDvxyac6kwUwC6i00tmA41NlSnbz4E7p11uKmRrduVGJbLScU6Gjb7JbpS5ZdxF8P4GLQBOlZeJjN2Jb6w/ffGvosI5nAyTfURJVT80wChN8YOKxpjvrpZNyzDOASEiVoEH5lK600pV6sChTOoMQ1TpCe/lKf+rPHLAgMBAAECgYAdPCyPfDKaBGzCGxh4B63+h99TUiJKzQwmrTRi8V2ry/Af9JEiIi2gKRIGEl3kJLRIFyYQ72X7ck5OZXiPelT+TBp1nqOYGjNZ10fM0qLLA2MiZQna/L4Qa/i75EniLlliR4aXcAF62bBC1dHtsm/+gsgcyDaQDPiNc+PgPzOCIQJBAOaqpXwnCw6K9Nwkb8DEFh9TANw6ZnNWDVasr/Q9RApyqUOFh700SYAiIR5KkAHbA87uNjmBRa8Kmuf/chqpwfkCQQDZM50tsfuT3lbgnvWN14sATepFaFSN+nsA/rT8dJWg1cFyzx8mLWZpPJRpzACOoI6nQdwcH/PmRUldpA9EMgLjAkEArcEHrRDgBFFqB1YvFD7hBzGIKVyYhfLhU1P7qvhng5NBq4ovaLe1Uh7jYaT6+1rWcI8CK6kUK7nKXE4QzsLnSQJAdjT73smVhEUl/Psl4nsi4BiHXhzIn7hpRwJX12lPoYeTz3rflfRxXuakUuu+heDloitaskfFglXE9tx5noClRwJBAJraM4aqsMwJOISmoFsyXZDJslksNBvQhx1BAcPOvymmiDfjI+d//d6LfCML/F7BebYoKUP2cTEUjl7g87N4GQQ=
//
//        使用公钥加密后的数据：F2pixI4MnE4mgTJUoUDCH4+y3EYCwS7J06yci9Avk8jophZAJff1lWIcKIDN9nglyyiO8hovdSKNiH6G1fFYfu+AXGSgjAYm9Nv4iuo9FAfjGqrgBt/AZlYy4lYVj8RxDFZsW4rmDwLrgG/bLMheTxCMkjJuNCw08ONV/0I4eqA=
//        使用私钥解密后的数据：jiang=xxu&xxuxu-aa=damin@cummins.com%

        String pwd_encode =
                "hDdZ6eVajYIB8o8+LCwi0wA2Rb+GskIQE7iWyHMWs+ZrVnSapBEDNMmchNjhHsw9HrtJ+u86mSVAVI3EMKdFdnvfaO8AaY2JBHd+wg0fyCIh5d9OtxCkgK0pOX05zVEd860iwIIc5OTAW7uXIypxsfm8dAWqVKRH+7ieUKAyCqU=";

        /**
         * 放在后端解密
         */
        String privateKey = "MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAMO1J+UIrwxDvxyac6kwUwC6i00tmA41NlSnbz4E7p11uKmRrduVGJbLScU6Gjb7JbpS5ZdxF8P4GLQBOlZeJjN2Jb6w/ffGvosI5nAyTfURJVT80wChN8YOKxpjvrpZNyzDOASEiVoEH5lK600pV6sChTOoMQ1TpCe/lKf+rPHLAgMBAAECgYAdPCyPfDKaBGzCGxh4B63+h99TUiJKzQwmrTRi8V2ry/Af9JEiIi2gKRIGEl3kJLRIFyYQ72X7ck5OZXiPelT+TBp1nqOYGjNZ10fM0qLLA2MiZQna/L4Qa/i75EniLlliR4aXcAF62bBC1dHtsm/+gsgcyDaQDPiNc+PgPzOCIQJBAOaqpXwnCw6K9Nwkb8DEFh9TANw6ZnNWDVasr/Q9RApyqUOFh700SYAiIR5KkAHbA87uNjmBRa8Kmuf/chqpwfkCQQDZM50tsfuT3lbgnvWN14sATepFaFSN+nsA/rT8dJWg1cFyzx8mLWZpPJRpzACOoI6nQdwcH/PmRUldpA9EMgLjAkEArcEHrRDgBFFqB1YvFD7hBzGIKVyYhfLhU1P7qvhng5NBq4ovaLe1Uh7jYaT6+1rWcI8CK6kUK7nKXE4QzsLnSQJAdjT73smVhEUl/Psl4nsi4BiHXhzIn7hpRwJX12lPoYeTz3rflfRxXuakUuu+heDloitaskfFglXE9tx5noClRwJBAJraM4aqsMwJOISmoFsyXZDJslksNBvQhx1BAcPOvymmiDfjI+d//d6LfCML/F7BebYoKUP2cTEUjl7g87N4GQQ=";

        byte[] decode = Base64Util.decode(pwd_encode);
        byte[] decode_privateKey = Base64Util.decode(privateKey);
        String privateKeyOriginal = new String(decode_privateKey, StandardCharsets.US_ASCII);
        System.out.println(privateKeyOriginal);
        byte[] old = decryptByPrivateKey(decode, decode_privateKey);
        System.out.println("jiemi: " + new String(old));
    }

    public static RSAKey createKey() throws NoSuchAlgorithmException {

        KeyStore keys = createKeyStore();
        byte[] publicKey = getPublicKey(keys);
        byte[] privateKey = getPrivateKey(keys);

        String encode_publicKey = Base64Util.encode(publicKey);
        System.out.println("公钥：" + encode_publicKey);

        String endcode_privateKey = Base64Util.encode(privateKey);
        System.out.println("私钥：" + endcode_privateKey);

        System.out.println();

        return new RSAKey(endcode_privateKey, encode_publicKey);
    }

    @Data
    public static class RSAKey {

        private String privateKey;
        private String publicKey;

        public RSAKey(String privateKey, String publicKey) {
            this.privateKey = privateKey;
            this.publicKey = publicKey;
        }
    }


    /**
     * 生成密钥对
     *
     * @return 密钥对对象
     * @throws NoSuchAlgorithmException
     */
    private static KeyStore createKeyStore() throws NoSuchAlgorithmException {
        //KeyPairGenerator用于生成公钥和私钥对。密钥对生成器是使用 getInstance 工厂方法
        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance(RSA_ALGORITHM);
        keyPairGenerator.initialize(KEY_SIZE);
        KeyPair keyPair = keyPairGenerator.generateKeyPair();
        RSAPrivateKey privateKey = (RSAPrivateKey) keyPair.getPrivate();
        RSAPublicKey publicKey = (RSAPublicKey) keyPair.getPublic();
        KeyStore keyStore = new KeyStore(publicKey, privateKey);
        return keyStore;
    }

    /**
     * 获取私钥
     *
     * @param keyStore
     * @return
     */
    private static byte[] getPrivateKey(KeyStore keyStore) {
        return ((RSAPrivateKey) keyStore.privateKey).getEncoded();
    }

    /**
     * 获取公钥
     *
     * @param keyStore
     * @return
     */
    private static byte[] getPublicKey(KeyStore keyStore) {
        return ((RSAPublicKey) keyStore.publicKey).getEncoded();
    }

    /**
     * 私钥加密
     *
     * @param data 待加密数据
     * @param key  密钥
     * @return byte[] 加密数据
     */
    public static byte[] encryptByPrivateKey(byte[] data, byte[] key) throws Exception {

        //取得私钥
        PKCS8EncodedKeySpec pkcs8KeySpec = new PKCS8EncodedKeySpec(key);
        KeyFactory keyFactory = KeyFactory.getInstance(RSA_ALGORITHM);
        //生成私钥
        PrivateKey privateKey = keyFactory.generatePrivate(pkcs8KeySpec);
        //数据加密
        Cipher cipher = Cipher.getInstance(keyFactory.getAlgorithm());
        cipher.init(Cipher.ENCRYPT_MODE, privateKey);
        return cipher.doFinal(data);
    }

    /**
     * 公钥加密
     *
     * @param data
     * @param key
     * @return
     * @throws NoSuchAlgorithmException
     * @throws InvalidKeySpecException
     * @throws NoSuchPaddingException
     * @throws BadPaddingException
     * @throws IllegalBlockSizeException
     * @throws InvalidKeyException
     */
    private static byte[] encryptByPublicKey(byte[] data, byte[] key) throws NoSuchAlgorithmException,
            InvalidKeySpecException, NoSuchPaddingException, BadPaddingException, IllegalBlockSizeException, InvalidKeyException {
        //实例化密钥工厂
        KeyFactory keyFactory = KeyFactory.getInstance(RSA_ALGORITHM);
        //初始化公钥,根据给定的编码密钥创建一个新的 X509EncodedKeySpec。
        X509EncodedKeySpec x509EncodedKeySpec = new X509EncodedKeySpec(key);
        PublicKey publicKey = keyFactory.generatePublic(x509EncodedKeySpec);
        //数据加密
        Cipher cipher = Cipher.getInstance(keyFactory.getAlgorithm());
        cipher.init(Cipher.ENCRYPT_MODE, publicKey);
        return cipher.doFinal(data);
    }

    /**
     * 私钥解密
     *
     * @param data 待解密数据
     * @param key  密钥
     * @return byte[] 解密数据
     */
    public static byte[] decryptByPrivateKey(byte[] data, byte[] key) throws Exception {
        //取得私钥
        PKCS8EncodedKeySpec pkcs8KeySpec = new PKCS8EncodedKeySpec(key);
        KeyFactory keyFactory = KeyFactory.getInstance(RSA_ALGORITHM);
        //生成私钥
        PrivateKey privateKey = keyFactory.generatePrivate(pkcs8KeySpec);
        //数据解密
        Cipher cipher = Cipher.getInstance(keyFactory.getAlgorithm());
        cipher.init(Cipher.DECRYPT_MODE, privateKey);
        return cipher.doFinal(data);
    }


    /**
     * 公钥解密
     *
     * @param data 待解密数据
     * @param key  密钥
     * @return byte[] 解密数据
     */
    public static byte[] decryptByPublicKey(byte[] data, byte[] key) throws Exception {

        //实例化密钥工厂
        KeyFactory keyFactory = KeyFactory.getInstance(RSA_ALGORITHM);
        //初始化公钥
        //密钥材料转换
        X509EncodedKeySpec x509KeySpec = new X509EncodedKeySpec(key);
        //产生公钥
        PublicKey pubKey = keyFactory.generatePublic(x509KeySpec);
        //数据解密
        Cipher cipher = Cipher.getInstance(keyFactory.getAlgorithm());
        cipher.init(Cipher.DECRYPT_MODE, pubKey);
        return cipher.doFinal(data);
    }


    //定义密钥类
    @Data
    @AllArgsConstructor
    public static class KeyStore {
        private Object publicKey;
        private Object privateKey;
    }
}

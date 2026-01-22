package com.gz.framework.util;

import cn.hutool.core.util.StrUtil;
import com.aliyun.mns.client.CloudAccount;
import com.aliyun.mns.client.CloudTopic;
import com.aliyun.mns.client.MNSClient;
import com.aliyun.mns.common.ServiceException;
import com.aliyun.mns.model.BatchSmsAttributes;
import com.aliyun.mns.model.MessageAttributes;
import com.aliyun.mns.model.RawTopicMessage;
import com.aliyun.mns.model.TopicMessage;
import com.gz.common.constant.SymbolConstant;
import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.Map;

/**
 * 短信发送工具类
 *
 * @author gz
 * @date 2024-06-28
 */
@Slf4j
public class SmsSendUtil {
    public static final String ACCESS_ID = "";
    public static final String ACCESS_KEY = "";
    public static final String ACCOUNT_ENDPOINT = "https://1373448441615046.mns.cn-shanghai.aliyuncs.com/";
    public static final String FREE_SIGN_NAME = "广咨智采";

    /**
     * 验证码UUID缓存key
     */
    public static String KAPTCHA_UUID_KEY = "KAPTCHA_UUID";

    /**
     * 验证码缓存key
     */
    public static String KAPTCHA_SMS_KEY = "KAPTCHA_SMS";

    /**
     * 发送短信
     *
     * @param phone
     * @param templateCode
     * @param params
     * @return
     */
    public static boolean send(String phone, String templateCode, Map<String, String> params) {
        if (StrUtil.isBlank(phone)) {
            log.error("手机号为空，不发送短信");
            return false;
        }
        if (StrUtil.isBlank(templateCode)) {
            log.error("短信模板为空，不发送短信");
            return false;
        }
        if (params == null) {
            params = new HashMap<>();
        }

        try {
            // Step 1. 获取主题引用
            CloudAccount account = new CloudAccount(ACCESS_ID, ACCESS_KEY, ACCOUNT_ENDPOINT);
            MNSClient client = account.getMNSClient();
            CloudTopic topic = client.getTopicRef("sms.topic-cn-shanghai");

            // Step 2. 设置SMS消息体（必须）
            // 注：目前暂时不支持消息内容为空，需要指定消息内容，不为空即可。
            RawTopicMessage msg = new RawTopicMessage();
            msg.setMessageBody("sms-message");

            // Step 3. 生成SMS消息属性
            MessageAttributes messageAttributes = new MessageAttributes();
            BatchSmsAttributes batchSmsAttributes = new BatchSmsAttributes();
            // 3.1 设置发送短信的签名（SMSSignName）
            batchSmsAttributes.setFreeSignName(FREE_SIGN_NAME);
            log.info("正在发送短信, 手机号:{}, 模板编码:{}, 模板参数:{}", phone, templateCode, params);
            // 3.2 设置发送短信使用的模板（SMSTempateCode）
            batchSmsAttributes.setTemplateCode(templateCode);
            BatchSmsAttributes.SmsReceiverParams smsReceiverParams = new BatchSmsAttributes.SmsReceiverParams();
            params.forEach(smsReceiverParams::setParam);
            batchSmsAttributes.addSmsReceiver(phone, smsReceiverParams);
            messageAttributes.setBatchSmsAttributes(batchSmsAttributes);
            try {
                // Step 4. 发布SMS消息
                TopicMessage ret = topic.publishMessage(msg, messageAttributes);
                log.info("短信平台返回：MessageId:{} MessageMD5：{} ", ret.getMessageId(), ret.getMessageBodyMD5());
            } catch (ServiceException se) {
                log.error("短信服务出现异常：" + se.getErrorCode() + se.getRequestId() + "=====" + se.getMessage());
                return false;
            } catch (Exception e) {
                log.error("短信服务出现异常。" + e.getMessage(), e);
                return false;
            } finally {
                if (client != null) {
                    client.close();
                }
            }
        } catch (Exception eee) {
            eee.printStackTrace();
            log.error(eee.getMessage(), eee);
            return false;
        }
        return true;
    }

    public static String getSmsCodeKey(String phone, String smsCodeType) {
        return KAPTCHA_SMS_KEY + SymbolConstant.COLON + phone + SymbolConstant.COLON + smsCodeType;
    }

    public static String getSmsUUIDKey(String phone, String uuid) {
        return KAPTCHA_UUID_KEY + SymbolConstant.COLON + phone + SymbolConstant.COLON + uuid;
    }

    public static void main(String[] args) {
        String str = "您的操作验证码为${verifyCode},项目ID为${projectId}，15分钟内有效,请勿向任何人泄露验证码。";
        Map<String, String> params = new HashMap<>();
        params.put("verifyCode", "332255");
        params.put("projectId", "aaa1111");
        for (Map.Entry<String, String> entry : params.entrySet()) {
            str = str.replace("${" + entry.getKey() + "}", entry.getValue());
        }
        System.out.println(str);
    }

}

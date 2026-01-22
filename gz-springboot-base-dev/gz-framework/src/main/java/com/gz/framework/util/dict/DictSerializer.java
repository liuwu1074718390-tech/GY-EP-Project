package com.gz.framework.util.dict;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.BeanProperty;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.ContextualSerializer;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.gz.common.constant.SymbolConstant;
import com.gz.common.util.StringUtil;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * 字典注解序列化处理器
 *
 * @author gz
 * @date 2024-08-15
 */
@Slf4j
public class DictSerializer extends StdSerializer<Object> implements ContextualSerializer {
    private String dictType;
    private String dictTable;
    private String dictField;
    private String dictLabelField;
    private String dictLabelSuffix;

    /**
     * 初始化 构造填充注解的字段
     *
     * @param prov     Serializer provider to use for accessing config, other serializers
     * @param property Method or field that represents the property (and is used to access value to serialize). Should be available; but there may be cases where caller cannot provide it and
     *                 null is passed instead (in which case impls usually pass 'this' serializer as is)
     * @return
     * @throws JsonMappingException
     */
    @Override
    public JsonSerializer<?> createContextual(SerializerProvider prov, BeanProperty property)
            throws JsonMappingException {
        if (property != null) {
            // 获取Bean的注解
            Dict annotation = property.getAnnotation(Dict.class);
            if (annotation != null) {
                if (StringUtil.isNotEmpty(annotation.dictType())) {
                    return new DictSerializer(annotation.dictType(), annotation.dictLabelSuffix());
                }
                return new DictSerializer(annotation.dictTable(), annotation.dictField(), annotation.dictLabelSuffix(), annotation.dictLabelField());
            }
        }
        // 默认空
        return prov.findNullValueSerializer(null);
    }

    /**
     * 序列化
     *
     * @param value    Value to serialize; can <b>not</b> be null.
     * @param gen      Generator used to output resulting Json content
     * @param provider Provider that can be used to get serializers for serializing Objects value contains, if any.
     * @throws IOException
     */
    @Override
    public void serialize(Object value, JsonGenerator gen, SerializerProvider provider) throws IOException {
        // 写回value
        gen.writeObject(value);
        // value字段名
        String filedName = gen.getOutputContext().getCurrentName();
        // label字段名
        String filedLabelName = filedName + dictLabelSuffix;
        gen.writeFieldName(filedLabelName);

        String fieldLabel;
        if (dictTable != null) {
            if (String.valueOf(value).contains(SymbolConstant.COMMA)) {
                String[] values = String.valueOf(value).split(SymbolConstant.COMMA);
                List<String> labels = new ArrayList<>();
                for (String item : values) {
                    fieldLabel = DictContext.getDictLabel(dictLabelField, dictTable, dictField, item);
                    if (StringUtil.isNotBlank(fieldLabel)) {
                        labels.add(fieldLabel);
                    }
                }
                fieldLabel = String.join(SymbolConstant.COMMA, labels);
            } else {
                fieldLabel = DictContext.getDictLabel(dictLabelField, dictTable, dictField, String.valueOf(value));
            }

        } else {
            fieldLabel = DictContext.getDictLabel(dictType, String.valueOf(value));
        }

        if (StringUtil.isNotBlank(fieldLabel)) {
            gen.writeString(fieldLabel);
        } else {
            gen.writeString(String.valueOf(value));
        }
    }

    public DictSerializer() {
        super(Object.class);
    }

    public DictSerializer(String dictType, String dictLabelSuffix) {
        super(Object.class);
        this.dictType = dictType;
        this.dictLabelSuffix = dictLabelSuffix;

    }

    public DictSerializer(String dictTable, String dictField, String dictLabelSuffix) {
        super(Object.class);
        this.dictTable = dictTable;
        this.dictField = dictField;
        this.dictLabelSuffix = dictLabelSuffix;

    }

    public DictSerializer(String dictTable, String dictField, String dictLabelSuffix, String dictLabelField) {
        super(Object.class);
        this.dictTable = dictTable;
        this.dictField = dictField;
        this.dictLabelSuffix = dictLabelSuffix;
        this.dictLabelField = dictLabelField;

    }

}

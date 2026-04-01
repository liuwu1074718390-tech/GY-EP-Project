package com.gz.biz.material.domain.vo;

import lombok.Data;

import java.io.Serializable;

@Data
public class MaterialKnowledgeSyncVO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Boolean success;

    private String message;

    private String datasetId;

    private String documentName;

    private Integer deletedCount;

    private String createdDocumentId;

    private Integer syncedItemCount;

    private Integer materialCount;

    private Integer processCount;

    private Integer categoryCount;

    private String processDocumentId;

    private String categoryDocumentId;
}

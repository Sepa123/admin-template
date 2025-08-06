export interface Main {
    success:          boolean;
    message:          string;
    exceptionMessage: null;
    totalItems:       number;
    pageNumber:       number;
    itemsPerPage:     number;
    saleList:         SaleList[];
}

export interface SaleList {
    documentType:       string;
    firstFolio:         number;
    lastFolio:          number;
    status:             string;
    emissionDate:       Date;
    dateTime:           Date;
    expirationDate:     Date;
    clientFile:         string;
    contactIndex:       string;
    paymentCondition:   string;
    sellerFileId:       string;
    billingCoin:        string;
    billingRate:        number;
    shopId:             string;
    priceList:          string;
    giro:               string;
    city:               string;
    district:           string;
    contact:            number;
    attachedDocuments:  AttachedDocument[];
    details:            Detail[];
    gloss:              string;
    affectableTotal:    number;
    exemptTotal:        number;
    taxeCode:           string;
    taxeValue:          number;
    documentTaxes:      DocumentTax[];
    ventaRecDesGlobal:  null;
    total:              number;
    voucherInfo:        VoucherInfo[];
    inventoryInfo:      any[];
    customFields:       any[];
    exportData:         ExportDatum[];
    isTransferDocument: string;
    timestamp:          null;
}

export interface AttachedDocument {
    date:                   Date;
    attachedDocumentType:   string;
    attachedDocumentName:   string;
    attachedDocumentNumber: string;
    attachedDocumentTotal:  number;
    documentTypeId:         string;
    folio:                  number;
    reason:                 null;
    gloss:                  string;
}

export interface Detail {
    detailLine:    number;
    type:          string;
    code:          string;
    count:         number;
    price:         number;
    isExempt:      null;
    discountType:  string;
    discountValue: number;
    comment:       string;
    analysis:      string;
    total:         number;
    priceList:     number;
    infAnalysis:   InfAnalysis;
}

export interface InfAnalysis {
    accountNumber:  string;
    businessCenter: string;
    classifier01:   string;
    classifier02:   string;
}

export interface DocumentTax {
    taxeCode1:       string;
    taxePercentaje1: number;
    taxeValue1:      number;
    taxeCode2:       string;
    taxePercentaje2: number;
    taxeValue2:      number;
    taxeCode3:       string;
    taxePercentaje3: number;
    taxeValue3:      number;
    taxeCode4:       string;
    taxePercentaje4: number;
    taxeValue4:      number;
    taxeCode5:       string;
    taxePercentaje5: number;
    taxeValue5:      number;
}

export interface ExportDatum {
    exportBillingRate:      number;
    exportBillingCoinID:    string;
    totalExport:            null;
    exemptExport:           null;
    destinationCountry:     string;
    destinationMerchandise: string;
    landingPort:            string;
    saleClause:             string;
    saleMode:               string;
    shipmentPort:           string;
    totalClause:            number;
    transportWay:           string;
}

export interface VoucherInfo {
    folio: number;
    year:  string;
    type:  string;
}

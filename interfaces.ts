interface Image {
    alt: string,
    disBaseLink: string,
    link: string,
    title: string
}

interface SFCCImageGroups {
    images: [Image],
    viewType: string,
};

interface Products {
    limit: Number,
    data : [Product],
    total: Number
}

interface Promotion {
    promotionId: string,
    calloutMsg: string | undefined
}

interface Variant {
    orderable: Boolean,
    price: Number,
    productId: string,
    variationValues: any
}

interface SFCCvariants {
    orderable: Boolean,
    price: Number,
    productId: string,
    variationValues: any
};

interface Product {
    currency: string,
    id: string,
    imageGroups: [SFCCImageGroups],
    inventory: any,
    longDescription: string,
    master: string | undefined,
    minOrderQuantity: Number,
    name: string,
    pageDescription: string,
    price: Number,
    pricePerUnit: Number,
    productPromotions: [Promotion] | undefined,
    unitMeasure: string,
    brand: string,
    variationAttributes: [VariationAttribute],
    variants: [SFCCvariants],
    variationValues: [VariationValue]
}

interface VariationValue {
    name: string
    orderable: Boolean,
    value: string
}

interface VariationAttribute {
    id: string,
    name: string,
    values: [VariationValue]
}

interface ProductRes {
    limit: Number;
    data: [Product];
    total: Number;
};

interface ProductHit {
    currency: string,
    productId: string,
    image: Image,
    inventory: any,
    longDescription: string,
    master: any,
    minOrderQuantity: Number,
    productName: string,
    pageDescription: string,
    price: Number,
    pricePerUnit: Number,
    productPromotions: [Promotion] | undefined,
    unitMeasure: string,
    brand: string,
    variationAttributes: [VariationAttribute],
    variants: [Variant]
}

interface SortBy { 
    id: string
    label: string

}
interface Refinements {
    attributeId: string,
    label: string
    values: []
}
interface ProductHits {
    hits: [ProductHit]
    sortingOptions: [SortBy],
    refinements: [Refinements]
}

export type {
    ProductHits,
    SFCCImageGroups,
    SFCCvariants,
    Variant,
    Product,
    ProductRes,
    VariationValue,
    VariationAttribute
}
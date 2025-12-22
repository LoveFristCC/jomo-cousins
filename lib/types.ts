/**
 * Product Variant type matching Sanity schema
 */
export interface ProductVariant {
  sku: string;
  size?: string;
  color?: string;
  colorHex?: string;
  inventory: number;
  reservedInventory?: number;
  stripePriceId?: string;
  image?: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
  allowBackorder?: boolean;
}

/**
 * Product type matching Sanity schema
 */
export interface Product {
  _id: string;
  _type: "product";
  name: string;
  slug: {
    current: string;
  };
  description: any[]; // Portable text
  category: "books" | "tshirts" | "hoodies" | "accessories" | "other";
  images: Array<{
    asset: {
      _ref: string;
      _type: string;
    };
    alt: string;
  }>;
  basePrice: number;
  stripePriceId: string;
  weight: number;
  variants?: ProductVariant[];
  lowStockThreshold: number;
  trackInventory: boolean;
  status: "active" | "draft" | "archived";
}

/**
 * Digital Product type for upsells
 */
export interface DigitalProduct {
  _id: string;
  _type: "digitalProduct";
  name: string;
  slug: {
    current: string;
  };
  description: any[]; // Portable text
  price: number;
  stripePriceId: string;
  kajabiOfferId: string;
  upsellPosition?: "upsell_1" | "upsell_2";
  headline: string;
  subheadline?: string;
  bulletPoints?: string[];
  image?: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt: string;
  };
  discount?: number;
  ctaText?: string;
  status: "active" | "draft" | "archived";
}

/**
 * Checkout session metadata
 */
export interface CheckoutMetadata {
  variantSku: string;
  quantity: string;
  productName: string;
  size?: string;
  color?: string;
  weight: string;
  productType: "physical" | "digital";
  kajabiOfferId?: string;
}

/**
 * ShipStation Order Item
 */
export interface ShipStationOrderItem {
  lineItemKey?: string;
  sku: string;
  name: string;
  imageUrl?: string;
  weight?: {
    value: number;
    units: "ounces" | "pounds" | "grams";
  };
  quantity: number;
  unitPrice: number;
  taxAmount?: number;
  shippingAmount?: number;
  warehouseLocation?: string;
  options?: Array<{
    name: string;
    value: string;
  }>;
  productId?: number;
  fulfillmentSku?: string;
  adjustment?: boolean;
  upc?: string;
}

/**
 * ShipStation Address
 */
export interface ShipStationAddress {
  name: string;
  company?: string;
  street1: string;
  street2?: string;
  street3?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  residential?: boolean;
  addressVerified?: string;
}

/**
 * ShipStation Order
 */
export interface ShipStationOrder {
  orderNumber: string;
  orderKey?: string;
  orderDate: string;
  createDate?: string;
  modifyDate?: string;
  paymentDate?: string;
  shipByDate?: string;
  orderStatus:
    | "awaiting_payment"
    | "awaiting_shipment"
    | "pending_fulfillment"
    | "shipped"
    | "on_hold"
    | "cancelled";
  customerId?: number;
  customerUsername?: string;
  customerEmail: string;
  billTo: ShipStationAddress;
  shipTo: ShipStationAddress;
  items: ShipStationOrderItem[];
  orderTotal?: number;
  amountPaid: number;
  taxAmount?: number;
  shippingAmount: number;
  customerNotes?: string;
  internalNotes?: string;
  gift?: boolean;
  giftMessage?: string;
  paymentMethod?: string;
  requestedShippingService?: string;
  carrierCode?: string;
  serviceCode?: string;
  packageCode?: string;
  confirmation?: string;
  shipDate?: string;
  holdUntilDate?: string;
  weight?: {
    value: number;
    units: "ounces" | "pounds" | "grams";
  };
  dimensions?: {
    units: "inches" | "centimeters";
    length: number;
    width: number;
    height: number;
  };
  insuranceOptions?: {
    provider: string;
    insureShipment: boolean;
    insuredValue: number;
  };
  internationalOptions?: {
    contents: string;
    customsItems: any[];
  };
  advancedOptions?: {
    warehouseId?: number;
    nonMachinable?: boolean;
    saturdayDelivery?: boolean;
    containsAlcohol?: boolean;
    storeId?: number;
    customField1?: string;
    customField2?: string;
    customField3?: string;
    source?: string;
    mergedOrSplit?: boolean;
    mergedIds?: number[];
    parentId?: number;
    billToParty?: string;
    billToAccount?: string;
    billToPostalCode?: string;
    billToCountryCode?: string;
  };
  tagIds?: number[];
}

/**
 * ShipStation API Response
 */
export interface ShipStationOrderResponse {
  orderId: number;
  orderNumber: string;
  orderKey: string;
  orderDate: string;
  createDate: string;
  modifyDate: string;
  paymentDate: string;
  shipByDate: string | null;
  orderStatus: string;
  customerId: number | null;
  customerUsername: string;
  customerEmail: string;
  billTo: ShipStationAddress;
  shipTo: ShipStationAddress;
  items: ShipStationOrderItem[];
  orderTotal: number;
  amountPaid: number;
  taxAmount: number;
  shippingAmount: number;
  customerNotes: string;
  internalNotes: string;
  gift: boolean;
  giftMessage: string | null;
  paymentMethod: string | null;
  requestedShippingService: string;
  carrierCode: string | null;
  serviceCode: string | null;
  packageCode: string | null;
  confirmation: string;
  shipDate: string | null;
  holdUntilDate: string | null;
  weight: {
    value: number;
    units: string;
  };
  dimensions: {
    units: string;
    length: number;
    width: number;
    height: number;
  } | null;
  insuranceOptions: {
    provider: string | null;
    insureShipment: boolean;
    insuredValue: number;
  };
  internationalOptions: {
    contents: string | null;
    customsItems: any[] | null;
  } | null;
  advancedOptions: {
    warehouseId: number | null;
    nonMachinable: boolean;
    saturdayDelivery: boolean;
    containsAlcohol: boolean;
    storeId: number | null;
    customField1: string;
    customField2: string | null;
    customField3: string | null;
    source: string | null;
    mergedOrSplit: boolean;
    mergedIds: number[];
    parentId: number | null;
    billToParty: string | null;
    billToAccount: string | null;
    billToPostalCode: string | null;
    billToCountryCode: string | null;
  };
  tagIds: number[];
  userId: string | null;
  externallyFulfilled: boolean;
  externallyFulfilledBy: string | null;
}

/**
 * Kajabi Member creation payload
 */
export interface KajabiMemberPayload {
  email: string;
  name: string;
  offer_id: string;
  external_user_id?: string;
  tags?: string[];
}

/**
 * Kajabi API Response
 */
export interface KajabiMemberResponse {
  id: string;
  email: string;
  name: string;
  created_at: string;
  updated_at: string;
}

/**
 * Inventory update result
 */
export interface InventoryUpdateResult {
  success: boolean;
  newInventory?: number;
  error?: string;
  sku: string;
}

/**
 * Low stock alert data
 */
export interface LowStockAlert {
  sku: string;
  productName: string;
  currentInventory: number;
  threshold: number;
  productId: string;
}

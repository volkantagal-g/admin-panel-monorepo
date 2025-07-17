export const waterOrderCancelReasons = {
  OUT_OF_SERVICE: {
    tr: 'Müşteri Adresi Servis Alanı Dışında',
    en: 'Out of service',
  },
  CARRIER_NOT_AVAILABLE: {
    tr: 'Kurye yok / Müsait Değil',
    en: 'Carrier is not available',
  },
  VENDOR_CLOSED: {
    tr: 'İşletme Kapalı',
    en: 'Vendor is closed',
  },
  VENDOR_BUSY: {
    tr: 'İşletme Meşgul',
    en: 'Vendor is busy',
  },
  CARRIER_CRASHED: {
    tr: 'Kurye Kaza Yaptı / Motor Arıza Yaptı',
    en: 'Carrier crashed',
  },
  OUT_OF_STOCK_PRODUCT: {
    tr: 'Ürün Eksik',
    en: 'Missing product',
  },
  WEATHER: {
    tr: 'Hava Muhalefeti',
    en: 'Weather',
  },
  CARRIER_VEHICLE_BROKEN: {
    tr: 'Araç hasarlı veya arızalı',
    en: 'Vehicle damaged or malfunctioning',
  },
  ADDRESS_OR_PIN_NOT_MATCHED: {
    tr: 'Adres - Pin uyuşmazlığı',
    en: 'Address - Pin mismatch',
  },
  COULDNT_FIND_PARK_SPOT: {
    tr: 'Park yeri bulunamadı',
    en: 'Parking location not found',
  },
  NO_DEPOSIT_CARBOY: {
    tr: 'İade damacana yok',
    en: 'No Deposit carboy',
  },
  NO_CUSTOMER_AT_ADDRESS: {
    tr: 'Müşteri adreste değil',
    en: 'Customer is not at address',
  },
  WRONG_OR_MISSING_ADDRESS: {
    tr: 'Yanlış veya eksik adres seçilmiş',
    en: 'Wrong or missing address selected',
  },
  COULDNT_REACH_CUSTOMER_BECAUSE_OF_ROAD: {
    tr: 'Yol nedeniyle müşteriye ulaşılamadı',
    en: 'Customer unreachable due to road',
  },
  COULDNT_REACH_CUSTOMER: {
    tr: 'Müşteriye ulaşılamadı',
    en: 'Customer unreachable',
  },
  DAMAGED_DELIVERY_BECAUSE_OF_COURIER: {
    tr: 'Kurye kaynaklı sipariş hasarlı ulaştı',
    en: 'Order due to courier arrived damaged',
  },
  LATE_DELIVERY: {
    tr: 'Geç Teslimat',
    en: 'Late Delivery',
  },
  ABUSE_OF_CAMPAIGN: {
    tr: 'Kampanya kötüye kullanım',
    en: 'Campaign abuse',
  },
  WILL_SELECT_CAMPAIGN_AND_THEN_ORDER: {
    tr: 'Kampanya seçip sipariş verecek',
    en: 'Choose a campaign and place an order',
  },
  WILL_SELECT_PRODUCT_AND_THEN_ORDER: {
    tr: 'Ürün ekleyip tekrar sipariş verecek',
    en: 'Add product and order again',
  },
  MISSING_WRONG_DAMAGED_DELIVERY: {
    tr: 'Eksik/Yanlış/Bozuk sipariş teslimi',
    en: 'Missing/Wrong/Broken order delivery',
  },
  COULDNT_REACH_TO_VENDOR: {
    tr: 'İşletmeye ulaşılamıyor',
    en: 'Dealer unavailable',
  },
  CUSTOMER_PICKED_WRONG_PAYMENT_TYPE: {
    tr: 'Müşteri yanlış ödeme yöntemi seçti',
    en: 'Customer chose wrong payment method',
  },
  PROBLEM_WITH_VENDOR_PANEL: {
    tr: 'İşletme panelle ilgili problem yaşıyor',
    en: 'Vendor having problems with the panel',
  },
  AUTO_CANCEL: {
    tr: 'Otomatik İptal',
    en: 'Auto cancel',
  },
  cancelOrder: {
    tr: 'Siparişi İptal Et',
    en: 'Cancel order',
  },
};

const rootTag = ([url]) => `/water/${url}`;

export const waterApiUrls = {
  getBrands: rootTag`getAllBrands`,
  getFirms: rootTag`getAllFirms`,
  getActiveOrders: rootTag`getActiveOrders`,
  getVendors: rootTag`getAllVendors`,
  getPaymentMethods: rootTag`getAllPaymentMethods`,
  filterOrders: rootTag`filterOrders`,
  createAnnouncement: rootTag`createAnnouncement`,
  getAnnouncementDetail: rootTag`getAnnouncementDetail`,
  updateAnnouncement: rootTag`updateAnnouncement`,
  getCampaigns: rootTag`getAllCampaigns`,
  createCampaign: rootTag`createCampaign`,
  getCampaignDetail: rootTag`getCampaignDetail`,
  updateCampaign: rootTag`updateCampaign`,
  getProducts: rootTag`getAllProducts`,
  getPromoUsageDetail: rootTag`getPromoUsageDetail`,
  updateCampaignStatus: rootTag`updateCampaignStatus`,
  uploadCampaignImage: rootTag`uploadCampaignImage`,
  createSegment: rootTag`createSegment`,
  getClientCountBySegment: rootTag`getClientCountBySegment`,
  getAllVendorStatus: rootTag`getAllVendorStatus`,
  getVendorsFilter: rootTag`getVendorsFilter`,
  getVendorFilterCount: rootTag`getVendorFilterCount`,
};

export const commonUrls = { getCities: '/countryInfo/getCities' };

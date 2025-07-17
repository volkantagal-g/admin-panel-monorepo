import {
  COURIER_TYPE,
  DELIVERY_THIRD_PARTY_PROVIDER_TYPES,
  GETIR_10_DOMAIN_TYPE,
  GETIR_DOMAIN_TYPES,
  GETIR_FINANCE_DOMAIN_TYPE,
  GETIR_GORILLAS_DOMAIN_TYPE,
  GETIR_MARKET_DOMAIN_TYPE,
  GETIR_VOYAGER_DOMAIN_TYPE,
  MARKET_PRODUCT_STATUS,
  NEW_COURIER_TYPE,
  PERSON_CANDIDATE_ACTION_HISTORY_TYPES,
  PICKER_TYPE,
  TAGS_MARKET_VEHICLE,
  VEHICLE_CONSTRAINT_STATUSES,
  VEHICLE_STATUSES,
  VEHICLE_TYPE,
} from './constants';

export const firmTypes = {
  manufacturer: {
    en: 'Manufacturer',
    tr: 'Üretici',
  },
  supplier: {
    tr: 'Tedarikçi',
    en: 'Supplier',
  },
};

export const marketProductTypes = {
  1: { en: 'Piece', tr: 'Adet' },
  2: { en: 'Weight', tr: 'Ağırlık' },
  // 3: { en: 'Recipe', tr: 'Tarif' },
  // 4: { en: 'Equipment', tr: 'Ekipman' },
  // 5: { en: 'Bag', tr: 'Poşet' },
};

export const marketProductWeightSubTypes = {
  1: { en: 'Pre-packaged', tr: 'Önceden Paketlenmiş' },
  2: { en: 'Fresh Meat & Cheese', tr: 'Taze Et ve Peynir' },
  3: { en: 'Fresh Fruit & Vegetables', tr: 'Taze Meyve ve Sebze' },
};

export const marketProductStatuses = {
  [MARKET_PRODUCT_STATUS.INACTIVE]: { en: 'Inactive', tr: 'İnaktif' },
  [MARKET_PRODUCT_STATUS.ACTIVE]: { en: 'Active', tr: 'Aktif' },
  [MARKET_PRODUCT_STATUS.ARCHIVED]: { en: 'Archived', tr: 'Arşivlenmiş' },
};

export const marketProductCategoryStatuses = {
  0: { en: 'Inactive', tr: 'İnaktif' },
  1: { en: 'Active', tr: 'Aktif' },
};

export const marketProductMasterCategoryStatuses = {
  0: { en: 'Inactive', tr: 'İnaktif' },
  1: { en: 'Active', tr: 'Aktif' },
};

export const vehicleStatus = {
  [VEHICLE_STATUSES.AVAILABLE]: { en: 'Available', tr: 'Müsait' },
  [VEHICLE_STATUSES.IN_USE]: { en: 'In Use', tr: 'Kullanımda' },
  [VEHICLE_STATUSES.IN_TRANSFER]: { en: 'In Transfer', tr: 'Transferde' },
  [VEHICLE_STATUSES.IN_SERVICE]: { en: 'In Service', tr: 'Serviste' },
  [VEHICLE_STATUSES.INACTIVE]: { en: 'In Active', tr: 'İnaktif' },
};

export const vehicleOwnership = {
  1: { en: 'Owned', tr: 'Özmal' },
  2: { en: 'Artisan', tr: 'Esnaf' },
  3: { en: 'Virtual', tr: 'Sanal' },
};

export const marketVehicleTags = {
  [TAGS_MARKET_VEHICLE.DINCER_40]: { en: 'Dincer40', tr: 'Dinçer40' },
  [TAGS_MARKET_VEHICLE.DINCER_100]: { en: 'Dincer100', tr: 'Dinçer100' },
  [TAGS_MARKET_VEHICLE.DINCER_MOTOR]: { en: 'DincerMotor', tr: 'DinçerMotosiklet' },
  [TAGS_MARKET_VEHICLE.PERSONAL]: { en: 'Personal', tr: 'Şahsi' },
  [TAGS_MARKET_VEHICLE.REGULAR_MOTOR]: { en: 'RegularMotor', tr: 'NormalMotosiklet' },
  [TAGS_MARKET_VEHICLE.REGULAR_CAR]: { en: 'RegularCar', tr: 'NormalAraç' },
  [TAGS_MARKET_VEHICLE.YKB_LEASING]: { en: 'YKB Leasing', tr: 'YKB Leasing' },
  [TAGS_MARKET_VEHICLE.DINCER_200]: { en: 'Dincer200', tr: 'Dinçer200' },
  [TAGS_MARKET_VEHICLE.PEDESTRIAN]: { en: 'Pedestrian', tr: 'Yaya' },
  [TAGS_MARKET_VEHICLE.ESNAF]: { en: 'Esnaf', tr: 'Esnaf' },
  [TAGS_MARKET_VEHICLE.ACTIVA]: { en: 'Activa', tr: 'Activa' },
  [TAGS_MARKET_VEHICLE.DIO]: { en: 'Dio', tr: 'Dio' },
  [TAGS_MARKET_VEHICLE.NOT_SUPPORTED]: { en: 'Not Supported', tr: 'Desteksiz' },
};

export const vehicleConstraintStatuses = {
  [VEHICLE_CONSTRAINT_STATUSES.INACTIVE]: { en: 'Inactive', tr: 'İnaktif' },
  [VEHICLE_CONSTRAINT_STATUSES.ACTIVE]: { en: 'Active', tr: 'Aktif' },
};

export const marketVehicleTypes = {
  [VEHICLE_TYPE.ON_FOOT]: { en: 'On Foot', tr: 'Yaya' },
  [VEHICLE_TYPE.MOTO]: { en: 'Moto', tr: 'Motor' },
  [VEHICLE_TYPE.MOTO_50CC]: { en: 'Moto (50cc)', tr: 'Motor (50cc)' },
  [VEHICLE_TYPE.MITU]: { en: 'MiTu', tr: 'MiTu' },
  [VEHICLE_TYPE.VAN]: { en: 'Van', tr: 'Araç' },
  [VEHICLE_TYPE.E_BICYCLE]: { en: 'E-Bicycle', tr: 'E-Bisiklet' },
  [VEHICLE_TYPE.E_MOTORCYCLE]: { en: 'E-Moto', tr: 'E-Moto' },
  [VEHICLE_TYPE.E_CAR]: { en: 'E-Car', tr: 'E-Car' },
};

export const getirDomainTypes = {
  1: { en: 'Getir10', tr: 'Getir10' },
  2: { en: 'GetirFood', tr: 'GetirYemek' },
  3: { en: 'GetirMore', tr: 'GetirBüyük' },
  4: { en: 'GetirWater', tr: 'GetirSu' },
  6: { en: 'GetirLocals', tr: 'GetirÇarşı' },
  14: { en: 'GetirFinance', tr: 'GetirFinans' },
};

export const promoOpenAggressionStates = {
  0: {
    en: 'Keeps the promotion open at all times', // it actually means open at aggression state 0
    tr: 'Promosyonu sürekli açık tutar',
  },
  1: {
    en: '1st to turn on: keeps the promo on only when the warehouse is at ease', // it actually means open at aggression state 1
    tr: '1. kapanacak (Promoyu sadece depo rahatken açık tutar)',
  },
  2: {
    en: '2nd to turn on: Keeps the promo on when the warehouse is not so busy', // it actually means open at aggression state 2
    tr: '2. kapanacak (Promoyu depo az yoğunken açık tutar)',
  },
  3: {
    en: '3rd to turn on: Keeps the promo on when the warehouse is moderately busy', // it actually means open at aggression state 3
    tr: '3. kapanacak (Promoyu depo orta yoğunken açık tutar)',
  },
  4: {
    en: '4th to turn on: Keeps the promo on when the warehouse is very busy', // it actually means open at aggression state 4
    tr: '4. kapanacak (Promoyu depo çok yoğunken açık tutar)',
  },
  5: {
    en: '5th to turn on: Keeps the promo on when the warehouse is dangerously busy', // it actually means open at aggression state 5
    tr: '5. kapanacak (Promoyu depo tehlikeli derecede yoğunken açık tutar)',
  },
};

export const getirMarketShortcutDomainTypes = {
  1: { en: 'G10', tr: 'G10' },
  3: { en: 'GM', tr: 'GB' },
  4: { en: 'GW', tr: 'GS' },
  17: { en: 'GG', tr: 'GG' },
};

export const domainTypes = {
  1: { en: 'Getir10', tr: 'Getir10' },
  2: { en: 'GetirFood', tr: 'GetirYemek' },
  3: { en: 'GetirMore', tr: 'GetirBüyük' },
  4: { en: 'GetirWater', tr: 'GetirSu' },
  6: { en: 'GetirLocals', tr: 'GetirÇarşı' },
  7: { en: 'GetirBitaksi', tr: 'GetirBitaksi' },
  8: { en: 'GetirWater Marketplace', tr: 'GetirSuPazaryeri' },
  9: { en: 'GetirDrive', tr: 'GetirAraç' },
  11: { en: 'GetirJobs', tr: 'Getirİş' },
  12: { en: 'GetirN11', tr: 'GetirN11' },
  14: { en: 'GetirFinance', tr: 'GetirFinans' },
  17: { en: 'GetirGorillas', tr: 'GetirGorillas' },
  18: { en: 'GetirShopping', tr: 'GetirAlışveriş' },
};

export const productDisplayTypes = {
  0: {
    en: 'Square',
    tr: 'Kare',
  },
  1: {
    en: 'Wide',
    tr: 'Geniş',
  },
};

export const bundleProductDisplayTypes = {
  0: {
    en: 'Show bundle products',
    tr: 'Bundle içerisindeki ürünleri göster',
  },
  1: {
    en: "Don't show bundle products",
    tr: 'Bundle içerisindeki ürünleri gösterme',
  },
};

export const transferLimitTypes = {
  0: { en: 'None', tr: 'Kısıt Yok' },
  1: { en: 'City', tr: 'Şehir' },
  2: { en: 'Warehouse', tr: 'Depo' },
};

export const productSegments = {
  1: {
    en: 'Test',
    tr: 'Test',
  },
  2: {
    en: 'Launch',
    tr: 'Lansman',
  },
  3: {
    en: 'Regular',
    tr: 'Satışta',
  },
  4: {
    en: 'Regional / Sensitive',
    tr: 'Bölgesel / Hassas',
  },
  5: {
    en: 'Only Promo',
    tr: 'Yalnızca Kampanya',
  },
  6: {
    en: 'Delist on Depletion',
    tr: 'Stok Bitiminde Delist',
  },
  7: {
    en: 'Delist',
    tr: 'Delist',
  },
  8: {
    en: 'Fixed Asset',
    tr: 'Demirbaş',
  },
  9: {
    en: 'Consumable',
    tr: 'Sarf',
  },
  10: {
    en: 'Seasonal',
    tr: 'Sezonsal',
  },
  11: {
    en: 'Supply Shortage',
    tr: 'Tedarik Problemi',
  },
  12: {
    en: 'Stand By',
    tr: 'Askıda',
  },
  13: {
    en: 'N11',
    tr: 'N11',
  },
  14: {
    en: 'In & Out',
    tr: 'In & Out',
  },
  15: {
    en: 'Listed',
    tr: 'Listelenmiş',
  },
};

export const productPackagingTypes = {
  1: { en: 'Unit', tr: 'Birim' },
  2: { en: 'Sub-Pack', tr: 'Alt Paket' },
  3: { en: 'Box', tr: 'Koli' },
  4: { en: 'Palet', tr: 'Palet' },
};
export const productStockUnitTypes = {
  1: { en: 'Piece', tr: 'Parça' },
  2: { en: 'Kilogram', tr: 'Kilogram' },
};
export const struckPriceSupporters = {
  1: {
    en: 'Third Party',
    tr: 'Üçüncü Parti',
  },
  2: {
    en: 'Supplier',
    tr: 'Tedarikçi',
  },
  3: {
    en: 'Free',
    tr: 'Bedava',
  },
  4: {
    en: 'Getir Financed',
    tr: 'Getir Destekli',
  },
};

export const parentProductWholesaleBonuses = {
  1: { en: 'Monthly level bonus', tr: 'Ciro primi' },
  2: { en: 'Logistic bonus', tr: 'Lojistik primi' },
  3: { en: 'Marketing activity bonus', tr: 'Aktivite primi' },
  4: { en: 'Non return bonus', tr: 'İadesizlik primi' },
  5: { en: 'Monthly free product bonus', tr: 'Bedelsiz ürün destek primi' },
  6: { en: 'Handling bonus', tr: 'Elleçleme primi' },
  7: { en: 'Vendor panel user bonus', tr: 'Tedarikçi paneli kullanıcı primi' },
  8: { en: 'Early payment bonus', tr: 'Erken ödeme primi' },
};

export const parentProductWholesaleBonusesWithOthers = {
  ...parentProductWholesaleBonuses,
  9: { en: 'Other ', tr: 'Diğer ' },
  10: { en: 'Other %20', tr: 'Diğer %20' },
};

export const WHOLESALE_BONUSES_COMING_FROM_SAP = {
  OTHER: 9,
  OTHER_TWENTY: 10,
};

export const parentProductWholesaleBonusTypes = {
  1: { en: 'Percent', tr: 'Yüzde' },
  2: { en: 'Amount', tr: 'Tutar' },
};

export const productMetricUnits = {
  g: {
    en: 'g',
    tr: 'g',
  },
  lt: {
    en: 'lt',
    tr: 'lt',
  },
  part: {
    en: 'part',
    tr: 'parça',
  },
  piece: {
    en: 'piece',
    tr: 'adet',
  },
  kg: {
    en: 'kg',
    tr: 'kg',
  },
  pack: {
    en: 'pack',
    tr: 'paket',
  },
  cl: {
    en: 'cl',
    tr: 'cl',
  },
  ml: {
    en: 'ml',
    tr: 'ml',
  },
  m: {
    en: 'm',
    tr: 'm',
  },
};

export const productImperialUnits = {
  oz: {
    en: 'oz',
    tr: 'oz',
  },
  lb: {
    en: 'lb',
    tr: 'lb',
  },
  floz: {
    en: 'fl oz',
    tr: 'fl oz',
  },
  qt: {
    en: 'qt',
    tr: 'qt',
  },
  gal: {
    en: 'gal',
    tr: 'gal',
  },
  inch: {
    en: 'inch',
    tr: 'inç',
  },
  ft: {
    en: 'ft',
    tr: 'ft',
  },
  dozen: {
    en: 'dozen',
    tr: 'düzine',
  },
  part: {
    en: 'part',
    tr: 'parça',
  },
  piece: {
    en: 'piece',
    tr: 'adet',
  },
  pack: {
    en: 'pack',
    tr: 'paket',
  },
};

export const productUnits = {
  ...productMetricUnits,
  ...productImperialUnits,
};

export const productFilters = {
  fullName: {
    en: 'Product Name',
    tr: 'Ürün İsmi',
  },
  barcodes: {
    en: 'Barcode',
    tr: 'Barkod',
  },
  sapReferenceCode: {
    en: 'Sap Reference Code',
    tr: 'Sap Referans Kodu',
  },
};

export const productOfProductGroupFilters = {
  fullName: {
    en: 'Product Name',
    tr: 'Ürün İsmi',
  },
};

export const brandStatuses = {
  0: { en: 'Inactive', tr: 'İnaktif' },
  1: { en: 'Active', tr: 'Aktif' },
};

export const values = ['id'];

export const personInformationChangeStatuses = {
  1: {
    en: 'Active',
    tr: 'Onay Bekliyor',
  },
  2: {
    en: 'Accepted',
    tr: 'Onaylandı',
  },
  3: {
    en: 'Rejected',
    tr: 'Reddedildi',
  },
};

export const orderPlatformTypes = {
  web: { tr: 'Web', en: 'Web' },
  mobile: { tr: 'Mobil', en: 'Mobile' },
};

export const localsOrderStatuses = {
  100: { tr: 'Tamamlanmadı', en: 'Incomplete' },
  200: { tr: 'Durduruldu', en: 'Aborted' },
  300: { tr: 'Gözatılıyor', en: 'Browsing' },
  325: { tr: 'İleri Tarihli Onay Bekliyor', en: 'Scheduled Verifying' },
  350: { tr: 'İleri Tarihli', en: 'Scheduled' },
  400: { tr: 'Onay Bekleniyor', en: 'Verifying' },
  500: { tr: 'Hazırlanıyor', en: 'Preparing' },
  550: { tr: 'Hazırlandı', en: 'Prepared' },
  560: { tr: 'Runner\'a Teslim Ediliyor', en: 'Handover To Runner' },
  570: { tr: 'Runner Teslim Aldı', en: 'On Runner' },
  600: { tr: 'Kurye Onayı Bekleniyor', en: 'Handover' },
  700: { tr: 'Müşteriye Gidiyor', en: 'Onway' },
  800: { tr: 'Adrese Ulaştı', en: 'Reached' },
  900: { tr: 'Teslim Edildi', en: 'Delivered' },
  1000: { tr: 'Oylandı', en: 'Rated' },
  1500: { tr: 'Admin İptal Etti', en: 'Canceled by Admin' },
  1600: { tr: 'İşletme İptal Etti', en: 'Canceled by Shop' },
  912345: { tr: 'Sırada', en: 'In Queue' },
};

export const localsReturnStatuses = {
  100: { tr: 'İade Talebi Oluşturuldu', en: 'Request Initialized' },
  150: { tr: 'Teslimat Türü Seçildi', en: 'Delivery Type Selected' },
  200: { tr: 'Kurye Seçildi', en: 'Requested' },
  300: { tr: 'Müşteriye Gidiyor', en: 'On way' },
  350: { tr: 'Müşteriye Ulaştı', en: 'Reached to Customer' },
  400: { tr: 'İadeyi Teslim Aldı', en: 'Receives Return' },
  600: { tr: 'Mağazaya Ulaştı', en: 'Reached to Shop' },
  700: { tr: 'Runnera Teslim Etti', en: 'Courier Deliver to Runner' },
  710: { tr: 'Runner İadeyi Teslim Aldı', en: 'Runner Receives Return' },
  750: { tr: 'Mağazaya Teslim Edildi', en: 'Courier or Runner Deliver to Shop' },
  770: { tr: 'Mağaza İadeyi Teslim Aldı', en: 'Shop Receives Return' },
  800: { tr: 'Mağaza Onayladı', en: 'Approved by Shop' },
  850: { tr: 'Mağaza Tarafından Kısmen Onaylandı', en: 'Approved by Shop Partially' },
  900: { tr: 'Mağaza Tarafından Reddedildi', en: 'Rejected by Shop' },
  1000: { tr: 'Getir Tarafından Onaylamayan Red', en: 'Reject Unapproved by Getir' },
  1100: { tr: 'Getir Tarafından Onaylanan Red', en: 'Reject Approved by Getir' },
  1200: { tr: 'İade İptal Edildi', en: 'Return Cancelled' },
  1250: { tr: 'İade Getir Tarafından İptal Edildi', en: 'Return Aborted by Getir' },
};

export const localsOrderPaymentMethods = {
  1: {
    en: 'Online CC',
    tr: 'Online KK',
  },
  2: {
    en: 'BKM',
    tr: 'BKM',
  },
  3: {
    en: 'On Delivery CC',
    tr: 'Kapıda KK',
  },
  4: {
    en: 'Cash',
    tr: 'Nakit',
  },
  5: {
    en: 'Multinet Card',
    tr: 'Multinet',
  },
  6: {
    en: 'Sodexo Card',
    tr: 'Sodexo Kart',
  },
  7: {
    en: 'Sodexo Voucher',
    tr: 'Sodexo Fiş',
  },
  8: {
    en: 'Ticket Card',
    tr: 'Ticket Kart',
  },
  9: {
    en: 'Ticket Voucher',
    tr: 'Ticket Fiş',
  },
  10: {
    en: 'SetCard',
    tr: 'Set Kart',
  },
  11: {
    en: 'Metropol Card',
    tr: 'Metropol Kart',
  },
  12: {
    en: 'Paye Card',
    tr: 'Paye Kart',
  },
};

export const relationTypes = {
  1: { tr: 'Annesi', en: 'Mother' },
  2: { tr: 'Babası', en: 'Father' },
  3: { tr: 'Eşi', en: 'Spouse' },
  4: { tr: 'Çocuğu', en: 'Children' },
  5: { tr: 'Kardeşi', en: 'Sibling' },
  6: { tr: 'Uzaktan Akrabası', en: 'Distant Relative' },
  7: { tr: 'Arkadaşı', en: 'Friend' },
};

export const badgePositions = {
  topLeft: { tr: 'Sol Üst', en: 'Top Left' },
  topRight: { tr: 'Sağ Üst', en: 'Top Right' },
  bottomLeft: { tr: 'Sol Alt', en: 'Bottom Left' },
  bottomRight: { tr: 'Sağ Alt', en: 'Bottom Right' },
};

export const shipmentTypes = {
  1: {
    en: 'Central Warehouse',
    tr: 'Merkez Depo',
  },
  2: {
    en: 'Direct Delivery',
    tr: 'Direkt Sevk',
  },
};

export const taxType = {
  1: {
    en: 'Tax included',
    tr: 'Vergi Dahil',
  },
  2: {
    en: 'Tax excluded',
    tr: 'Vergi Hariç',
  },
};

export const clientStatuses = {
  100: {
    en: 'Free',
    tr: 'Müsait',
  },
  300: {
    en: 'Waiting Order',
    tr: 'Sipariş bekliyor',
  },
  800: {
    en: 'Reached',
    tr: 'Ulaşıldı',
  },
  900: {
    en: 'Delivered',
    tr: 'Teslim edildi',
  },
  1000: {
    en: 'Canceled',
    tr: 'İptal edildi',
  },
  1300: {
    en: 'Waiting Order',
    tr: 'Sipariş bekliyor',
  },
  1800: {
    en: 'Reached',
    tr: 'Ulaşıldı',
  },
  1900: {
    en: 'Delivered',
    tr: 'Teslim edildi',
  },
  2000: {
    en: 'Canceled',
    tr: 'İptal edildi',
  },
  3300: {
    en: 'Waiting Order',
    tr: 'Sipariş bekliyor',
  },
  3800: {
    en: 'Reached',
    tr: 'Ulaşıldı',
  },
  3900: {
    en: 'Delivered',
    tr: 'Teslim edildi',
  },
  4000: {
    en: 'Canceled',
    tr: 'İptal edildi',
  },
  2300: {
    en: 'Waiting Order',
    tr: 'Sipariş bekliyor',
  },
  2800: {
    en: 'Reached',
    tr: 'Ulaşıldı',
  },
  2900: {
    en: 'Delivered',
    tr: 'Teslim edildi',
  },
  3000: {
    en: 'Canceled',
    tr: 'İptal edildi',
  },
};

export const artisanOrderStatuses = {
  100: { tr: 'Tamamlanmadı', en: 'Incomplete' },
  200: { tr: 'İptal Edildi', en: 'Aborted' },
  300: { tr: 'Oluşturuldu', en: 'Browsing' },
  325: { tr: 'İleri Tarihe Onayı Bekleniyor', en: 'Scheduled Verifying' },
  350: { tr: 'İleri Tarihe Planlandı', en: 'Scheduled' },
  400: { tr: 'Onay Bekliyor', en: 'Verifying' },
  500: { tr: 'Hazırlanıyor', en: 'Preparing' },
  550: { tr: 'Hazırlandı', en: 'Prepared' },
  560: { tr: 'Runner\'a Teslim Ediliyor', en: 'Handover To Runner' },
  570: { tr: 'Runner Teslim Aldı', en: 'On Runner' },
  600: { tr: 'Kurye Onayı Bekleniyor', en: 'Handover' },
  700: { tr: 'Müşteriye Gidiyor', en: 'Onway' },
  800: { tr: 'Adrese Ulaştı', en: 'Reached' },
  900: { tr: 'Teslim Edildi', en: 'Delivered' },
  1000: { tr: 'Oylandı', en: 'Rated' },
  1500: { tr: 'Admin İptal Etti', en: 'Canceled by Admin' },
  1600: { tr: 'İşletme İptal Etti', en: 'Canceled by Locals' },
};

export const ORDER_PAYMENT_STATUS = {
  NOT_PAID: 0,
  PENDING_PAYMENT: 1,
  PAID: 2,
  PAYMENT_ERROR: 3,
  PENDING_REFUND: 4,
  REFUNDED: 5,
  PARTIAL_REFUND_SUCCESS: 6,
  PENDING_PARTIAL_REFUND: 7,
  CASH_ON_DELIVERY: 8,
};

export const artisanOrderPaymentStatuses = {
  [ORDER_PAYMENT_STATUS.NOT_PAID]: {
    en: 'Not Paid',
    tr: 'Ödenmedi',
  },
  [ORDER_PAYMENT_STATUS.PENDING_PAYMENT]: {
    en: 'Pending Payment',
    tr: 'Ödeme bekleniyor',
  },
  [ORDER_PAYMENT_STATUS.PAID]: {
    en: 'Paid',
    tr: 'Ödendi',
  },
  [ORDER_PAYMENT_STATUS.PAYMENT_ERROR]: {
    en: 'Payment Error',
    tr: 'Ödeme hatası',
  },
  [ORDER_PAYMENT_STATUS.PENDING_REFUND]: {
    en: 'Pending Refund',
    tr: 'İade bekleniyor',
  },
  [ORDER_PAYMENT_STATUS.REFUNDED]: {
    en: 'Refunded',
    tr: 'İade edildi',
  },
  [ORDER_PAYMENT_STATUS.PARTIAL_REFUND_SUCCESS]: {
    en: 'Partial Refund Succeded',
    tr: 'Ürün iadesi yapıldı',
  },
  [ORDER_PAYMENT_STATUS.PENDING_PARTIAL_REFUND]: {
    en: 'Pending Partial Refund',
    tr: 'Ürün iadesi bekleniyor',
  },
  [ORDER_PAYMENT_STATUS.CASH_ON_DELIVERY]: {
    en: 'On Delivery Payment',
    tr: 'Kapıda Ödeme',
  },
};

export const GETIR_ARTISAN = {
  DELIVERY_TYPES: {
    GETIR: 1,
    ARTISAN: 2,
  },
};

export const getirArtisanDeliveryTypes = {
  1: {
    en: 'Getir Delivery',
    tr: 'Getir Getirsin',
  },
  2: {
    en: 'Getir Locals Delivery',
    tr: 'İşletme Getirsin',
  },
};

export const paymentMethods = {
  1: {
    en: 'C. Card',
    tr: 'K. Kart',
  },
  2: {
    en: 'BKM',
    tr: 'BKM',
  },
  3: {
    en: 'On Delivery Credit Card',
    tr: 'Kapıda Kredi Kartı',
  },
  4: {
    en: 'Cash',
    tr: 'Nakit',
  },
  5: {
    en: 'Multinet Card',
    tr: 'Multinet',
  },
  6: {
    en: 'Sodexo Card',
    tr: 'Sodexo Kart',
  },
  7: {
    en: 'Sodexo Voucher',
    tr: 'Sodexo Fiş',
  },
  8: {
    en: 'Ticket Card',
    tr: 'Ticket Kart',
  },
  9: {
    en: 'Ticket Voucher',
    tr: 'Ticket Fiş',
  },
  10: {
    en: 'SetCard',
    tr: 'Set Kart',
  },
  11: {
    en: 'Metropol Card',
    tr: 'Metropol Kart',
  },
  12: {
    en: 'Paye Card',
    tr: 'Paye Kart',
  },
  13: {
    en: 'IstanbulCard',
    tr: 'İstanbulkart',
  },
  14: {
    en: 'Adyen',
    tr: 'Adyen',
  },
  15: {
    en: 'Mobilexpress',
    tr: 'Mobilexpress',
  },
  paypal: {
    en: 'PayPal',
    tr: 'PayPal',
  },
  applepay: {
    en: 'Apple Pay',
    tr: 'Apple Pay',
  },
  20: {
    en: 'Getir Money',
    tr: 'Getir Para',
  },
  26: {
    en: 'Getir Pay Later',
    tr: 'Getir sonra öde',
  },
  scheme: {
    en: 'Scheme',
    tr: 'Scheme',
  },
  loyalty_points: { // mapping for getirmoney
    en: 'GetirMoney',
    tr: 'GetirPara',
  },
  ideal: {
    en: 'Ideal',
    tr: 'Ideal',
  },
  directEbanking: { // mapping for sofort
    en: 'Sofort',
    tr: 'Sofort',
  },
  sodexo: {
    en: 'Sodexo',
    tr: 'Sodexo',
  },
  mealCard: {
    en: 'Meal Card',
    tr: 'Yemek Kartı',
  },
  googlepay: {
    en: 'Google Pay',
    tr: 'Google Pay',
  },
  prepaid: {
    en: 'Prepaid',
    tr: 'Ön Ödemeli',
  },
};

export const paymentProviders = {
  getirbnpl: {
    en: 'Getir Pay Later',
    tr: 'Getir Sonra Öde',
  },
  bkm: {
    en: 'BKM',
    tr: 'BKM',
  },
  masterpass: {
    en: 'Masterpass',
    tr: 'Masterpass',
  },
  getirmoney: { // mapping for loyalty points
    en: 'GetirFinance',
    tr: 'GetirFinans',
  },
  adyen: {
    en: 'Adyen',
    tr: 'Adyen',
  },
  checkout: {
    en: 'Checkout',
    tr: 'Checkout',
  },
  sodexo: {
    en: 'Sodexo',
    tr: 'Sodexo',
  },
  ticket: {
    en: 'Ticket',
    tr: 'Ticket',
  },
  mobilexpress: {
    en: 'Mobilexpress',
    tr: 'Mobilexpress',
  },
  multinet: {
    en: 'Multinet',
    tr: 'Multinet',
  },
};

export const cardBanks = {
  1: {
    en: 'Akbank',
    tr: 'Akbank',
  },
  2: {
    en: 'Garanti',
    tr: 'Garanti',
  },
  3: {
    en: 'Finansbank',
    tr: 'Finansbank',
  },
  4: {
    en: 'Yapi Kredi',
    tr: 'Yapı Kredi',
  },
  5: {
    en: 'TEB',
    tr: 'TEB',
  },
  6: {
    en: 'Vakiflar Bank.',
    tr: 'Vakıflar Bank.',
  },
  7: {
    en: 'Ziraat',
    tr: 'Ziraat',
  },
  8: {
    en: 'Halk Bank.',
    tr: 'Halk Bank.',
  },
  9: {
    en: 'Turkish Bank',
    tr: 'Turkish Bank',
  },
  10: {
    en: 'Tekstil Bank.',
    tr: 'Tekstil Bank.',
  },
  11: {
    en: 'Citibank',
    tr: 'Citibank',
  },
  12: {
    en: 'Fibabanka',
    tr: 'Fibabanka',
  },
  13: {
    en: 'Denizbank',
    tr: 'Denizbank',
  },
  14: {
    en: 'HSBC',
    tr: 'HSBC',
  },
  15: {
    en: 'ING',
    tr: 'ING',
  },
  16: {
    en: 'Anadolubank',
    tr: 'Anadolubank',
  },
  17: {
    en: 'Sekerbank',
    tr: 'Sekerbank',
  },
  18: {
    en: 'Kuveyt Turk',
    tr: 'Kuveyt Türk',
  },
  19: {
    en: 'Asya Bank',
    tr: 'Asya Bank',
  },
  20: {
    en: 'Albaraka',
    tr: 'Albaraka',
  },
  21: {
    en: 'Turkiye Finans',
    tr: 'Türkiye Finans',
  },
  22: {
    en: 'Is Bankasi',
    tr: 'İş Bankası',
  },
  23: {
    en: 'Bankpozitif',
    tr: 'Bankpozitif',
  },
  24: {
    en: 'Odea Bank',
    tr: 'Odea Bank',
  },
  25: {
    en: 'Aktif Yatirim',
    tr: 'Aktif Yatırım',
  },
};

export const posBanks = {
  0: {
    tr: 'NULL',
    en: 'NULL',
  },
  1: {
    tr: 'Akbank',
    en: 'Akbank',
  },
  2: {
    tr: 'Garanti Bankasi',
    en: 'Garanti Bankasi',
  },
  3: {
    tr: 'Finansbank',
    en: 'Finansbank',
  },
  4: {
    tr: 'Yapı Kredi',
    en: 'Yapi Kredi',
  },
  5: {
    tr: 'Turk Ekonomi Bankası',
    en: 'Turk Ekonomi Bankasi',
  },
  6: {
    tr: 'Vakiflar Bankası',
    en: 'Vakiflar Bankasi',
  },
  7: {
    tr: 'Ziraat Bankası',
    en: 'Ziraat Bank',
  },
  8: {
    tr: 'Halk Bankası',
    en: 'Halk Bankasi',
  },
  9: {
    tr: 'Turkish Bank',
    en: 'Turkish Bank',
  },
  10: {
    tr: 'Tekstil Bankasi',
    en: 'Tekstil Bankasi',
  },
  11: {
    tr: 'Citibank',
    en: 'Citibank',
  },
  12: {
    tr: 'Fibabanka',
    en: 'Fibabanka',
  },
  13: {
    tr: 'Denizbank',
    en: 'Denizbank',
  },
  14: {
    tr: 'HSBC Bank',
    en: 'HSBC Bank',
  },
  15: {
    tr: 'ING Bank',
    en: 'ING Bank',
  },
  16: {
    tr: 'Anadolubank',
    en: 'Anadolubank',
  },
  17: {
    tr: 'Sekerbank',
    en: 'Sekerbank',
  },
  18: {
    tr: 'Kuveyt Turk',
    en: 'Kuveyt Turk',
  },
  19: {
    tr: 'Asya Katilim Bankası',
    en: 'Asya Katilim Bankasi',
  },
  20: {
    tr: 'Albaraka Turk',
    en: 'Albaraka Turk',
  },
  21: {
    en: 'Turkiye Finans',
    tr: 'Türkiye Finans',
  },
  22: {
    tr: 'İş Bankası',
    en: 'Is Bankasi',
  },
  23: {
    tr: 'Bankpozitif',
    en: 'Bankpozitif',
  },
  24: {
    tr: 'Odea Bank',
    en: 'Odea Bank',
  },
  25: {
    tr: 'Aktif Yatirim Bankası',
    en: 'Aktif Yatirim Bankasi',
  },
  26: {
    tr: 'Alternatif Bank',
    en: 'Alternatif Bank',
  },
  27: {
    tr: 'Paycell',
    en: 'Paycell',
  },
  28: {
    tr: 'ParamPOS',
    en: 'ParamPOS',
  },
  29: {
    tr: 'ZIRAAT_WMP',
    en: 'ZIRAAT_WMP',
  },
  99: {
    tr: 'FINANSBANK',
    en: 'FINANSBANK',
  },
};

export const courierTypes = {
  9: {
    tr: 'Getir30',
    en: 'Geti30',
  },
};

// from getir-admin
export const allCourierTypes = {
  [COURIER_TYPE.MOTO]: {
    en: 'Motor',
    tr: 'Motor',
  },
  [COURIER_TYPE.ON_FOOT]: {
    en: 'Onfoot',
    tr: 'Yaya',
  },
  [COURIER_TYPE.BIKE]: {
    en: 'Bicycle',
    tr: 'Bisiklet',
  },
  [COURIER_TYPE.VAN]: {
    en: 'Van',
    tr: 'Doblo',
  },
  [COURIER_TYPE.CAR]: {
    en: 'Car',
    tr: 'Araç',
  },
  [COURIER_TYPE.MITU]: {
    en: 'Mitu',
    tr: 'Mitu',
  },
  [COURIER_TYPE.VOYAGER]: {
    en: 'Voyager',
    tr: 'Gezen',
  },
  [COURIER_TYPE.GM]: {
    en: 'GetirMore & Getir10 & GetirWater',
    tr: 'GetirBüyük & Getir10 & GetirSu',
  },
};

export const courierServiceDomainTypes = {
  [GETIR_DOMAIN_TYPES.GETIR10]: {
    en: 'Getir10',
    tr: 'Getir10',
  },
  [GETIR_DOMAIN_TYPES.FOOD]: {
    en: 'GetirFood',
    tr: 'GetirYemek',
  },
  [GETIR_DOMAIN_TYPES.MARKET]: {
    en: 'GetirMore',
    tr: 'GetirBüyük',
  },
  [GETIR_DOMAIN_TYPES.VOYAGER]: {
    en: 'GetirWater',
    tr: 'GetirSu',
  },
  [GETIR_DOMAIN_TYPES.LOCALS]: {
    en: 'GetirLocals',
    tr: 'GetirÇarşı',
  },
  [GETIR_DOMAIN_TYPES.GORILLAS]: {
    en: 'Gorillas',
    tr: 'Gorillas',
  },
};

export const courierStatuses = {
  100: {
    en: 'Free',
    tr: 'Müsait',
  },
  200: {
    en: 'Busy',
    tr: 'Meşgul',
  },
  300: {
    en: 'Browsing',
    tr: 'Gözatıyor',
  },
  350: {
    en: 'Reserved',
    tr: 'Rezerve',
  },
  375: {
    en: 'Reserved queue',
    tr: 'Sıra planlandı',
  },
  400: {
    en: 'Verifying',
    tr: 'Doğruluyor',
  },
  450: {
    en: 'Reached to restaurant',
    tr: 'Restorana Ulaştı',
  },
  500: {
    en: 'Preparing',
    tr: 'Hazırlıyor',
  },
  600: {
    en: 'Gathering',
    tr: 'Toplama',
  },
  700: {
    en: 'Onway',
    tr: 'Yolda',
  },
  800: {
    en: 'Reached',
    tr: 'Ulaştı',
  },
  900: {
    en: 'Returning',
    tr: 'Dönüyor',
  },
  1000: {
    en: 'Canceled',
    tr: 'İptal edildi',
  },
  2200: {
    en: 'Slot Verifying',
    tr: 'İadeyi onaylıyor',
  },
  2300: {
    en: 'On way to pickup',
    tr: 'Teslim almak için yolda',
  },
  2400: {
    en: 'Pickup from client',
    tr: 'Müşteriye ulaştı',
  },
  2500: {
    en: 'On way to deliver',
    tr: 'İadeyi aldı',
  },
  2600: {
    en: 'Delivered to shop',
    tr: 'Mağazaya ulaştı',
  },
  2650: {
    en: 'Delivered and waiting',
    tr: 'Teslim etti bekliyor',
  },
  2900: {
    en: 'Return Canceled',
    tr: 'İade iptal edildi',
  },
  4000: {
    en: 'Verifying Refill',
    tr: 'Dolum doğrulanıyor',
  },
  4100: {
    en: 'Onway Refill',
    tr: 'Doluma gidiyor',
  },
  4200: {
    en: 'Refill',
    tr: 'Yeniden dolduruldu',
  },
};

export const courierReturnStatuses = {
  2200: {
    en: 'Verifying',
    tr: 'Onaylıyor',
  },
  2300: {
    en: 'On way to pickup',
    tr: 'Teslim almak için yolda',
  },
  2400: {
    en: 'Pickup from client',
    tr: 'Müşteriye ulaştı',
  },
  2500: {
    en: 'On way to deliver',
    tr: 'İşletmeye gidiyor',
  },
  2600: {
    en: 'Delivered to shop',
    tr: 'Mağazaya ulaştı',
  },
  2650: {
    en: 'Delivered and waiting',
    tr: 'Teslim etti bekliyor',
  },
  2900: {
    en: 'Return Canceled',
    tr: 'İade iptal edildi',
  },
};

export const foodOrderCancelReasonSource = {
  OTHER: 0,
  GETIR: 1,
  RESTAURANT: 2,
  CLIENT: 3,
};

export const foodOrderRequestSource = {
  RESTAURANT: 2,
  CLIENT: 3,
  COURIER: 0,
};

export const artisanOrderCancelReasonSource = {
  GETIR: 1,
  RESTAURANT: 2,
  CLIENT: 3,
};

export const waterOrderCancelReasonSource = {
  GETIR: 1,
  VENDOR: 2,
  CLIENT: 3,
};

export const foodOrderCancelSource = {
  0: { tr: '', en: '' },
  1: { tr: 'Getir kaynaklı', en: 'Caused by Getir' },
  2: { tr: 'Restoran kaynaklı', en: 'Caused by restaurant' },
  3: { tr: 'Müşteri kaynaklı', en: 'Caused by customer' },
};

export const genderTypes = {
  1: { tr: 'Erkek', en: 'Man' },
  2: { tr: 'Kadın', en: 'Woman' },
  3: { tr: 'Açıklamamayı Tercih Ediyor', en: 'Prefer Not to Disclose' },
  4: { tr: 'Non-Binary', en: 'Non-Binary' },
};

export const personCandidateWorkerTypes = {
  1: {
    en: 'Payroll Courier',
    tr: 'Bordrolu Kurye',
  },
  2: {
    en: 'Store Assistant',
    tr: 'Depo Personeli',
  },
  3: {
    en: 'Self Employed Courier with Its Franchise\'s Motorcycle',
    tr: 'Bayi Aracı İle Çalışan Şahıs Şirket Sahibi Kurye',
  },
  4: {
    en: 'Self Employed Courier with Its Own Motorcycle',
    tr: 'Kendi Motoru İle Çalışan Şahıs Şirket Sahibi Kurye',
  },
  5: {
    en: 'Self Employed Courier with Its Own Car',
    tr: 'Kendi Aracı İle Çalışan Şahıs Şirket Sahibi Kurye',
  },
  6: {
    en: 'E-Scooter Courier',
    tr: 'E-Motor Kurye',
  },
  7: {
    en: 'E-Bike Courier',
    tr: 'E-Bisiklet Kurye',
  },
};

export const personCandidateActionHistoryTypes = {
  [PERSON_CANDIDATE_ACTION_HISTORY_TYPES.STATUS_CHANGE]: {
    en: 'Status Change',
    tr: 'Durum Güncellemesi',
  },
  [PERSON_CANDIDATE_ACTION_HISTORY_TYPES.ASSIGNEE_CHANGE]: {
    en: 'Taking Responsibility',
    tr: 'Sorumluluk Alımı',
  },
};

export const workTypes = {
  1: {
    en: 'Full Time',
    tr: 'Tam Zamanlı',
  },
  2: {
    en: 'Part Time',
    tr: 'Yarı Zamanlı',
  },
};

export const productCategoryTypes = {
  1: {
    en: 'Regular',
    tr: 'Normal',
  },
  2: {
    en: 'Discounted',
    tr: 'İndirimli',
  },
  3: {
    en: 'Personal',
    tr: 'Kişisel',
  },
  9: {
    en: 'Custom',
    tr: 'Özel',
  },
};

export const productSubCategoryTypes = {
  4: {
    en: 'Buy Again',
    tr: 'Tekrar Al',
  },
  5: {
    en: 'Recommended',
    tr: 'Önerilenler',
  },
  6: {
    en: 'Last Order',
    tr: 'Son Siparişim',
  },
  7: {
    en: 'Favourites',
    tr: 'Favorilerim',
  },
  8: {
    en: 'Benefit Based',
    tr: 'Avantaj Bazlı',
  },
};

export const productMasterCategoryLevels = {
  10: {
    en: 'Master Main Category',
    tr: 'Master Ana Kategori',
  },
  20: {
    en: 'Master Category',
    tr: 'Master Kategori',
  },
  30: {
    en: 'Master Class',
    tr: 'Master Sınıf',
  },
  40: {
    en: 'Master Sub Class',
    tr: 'Master Alt Sınıf',
  },
};

export const warehouseProposalStatuses = {
  100: {
    tr: 'Başvuruldu',
    en: 'Applied',
  },
  200: {
    tr: 'Değerlendirmeye Uygun',
    en: 'Suitable',
  },
  300: {
    tr: 'Değerlendirmeye Uygun Değil',
    en: 'Not Suitable',
  },
};

export const warehouseTypes = {
  1: {
    tr: 'Merkez Depo',
    en: 'Main Warehouse',
  },
  2: {
    tr: 'Cep Depo',
    en: 'Regular Warehouse',
  },
  3: {
    tr: 'Sanal Depo',
    en: 'Virtual Warehouse',
  },
  4: {
    tr: 'Bakkal Depo',
    en: 'Grocer Warehouse',
  },
  5: {
    tr: 'Fabrika Depo',
    en: 'Factory Warehouse',
  },
  6: {
    tr: 'Tedarik Operasyonları',
    en: 'Supply Chain Operations',
  },
  7: {
    tr: 'Araç Otoparkı',
    en: 'Vehicle Park',
  },
  8: {
    tr: 'Store Conversion',
    en: 'Store Conversion',
  },
  9: {
    tr: 'Mütabakatsızlık Deposu',
    en: 'Non-agreement Warehouse',
  },
  10: {
    tr: 'Diğer',
    en: 'Other',
  },
  11: {
    tr: 'Hub Depo',
    en: 'Hub Warehouse',
  },
};

export const warehouseStateTypes = {
  100: {
    tr: 'Arşivlendi',
    en: 'Archieved',
  },
  200: {
    tr: 'İnaktif',
    en: 'Inactive',
  },
  300: {
    tr: 'Aktif',
    en: 'Active',
  },
};

export const warehouseStatuses = {
  100: {
    tr: 'Meşgul',
    en: 'Busy',
  },
  200: {
    tr: 'Kurye Tükendi',
    en: 'Out of courier',
  },
  300: {
    tr: 'Müsait',
    en: 'Available',
  },
};

export const addressTypesShort = {
  1: {
    // Home - Ev
    en: 'H',
    tr: 'E',
  },
  2: {
    // Work - İş
    en: 'W',
    tr: 'İ',
  },
  3: {
    // Others - Diğer
    en: 'O',
    tr: 'D',
  },
};

export const promoFinancedBy = {
  1: {
    tr: 'Tedarikçi Desteği',
    en: 'Supplier Support',
  },
  2: {
    tr: 'Üçüncü Parti Desteği',
    en: 'Third Party Support',
  },
  3: {
    tr: 'Getir',
    en: 'Getir',
  },
};

export const promoObjectiveTypes = {
  1: {
    en: 'Acquisition',
    tr: 'Acquisition',
  },
  2: {
    en: 'Habit Building',
    tr: 'Habit Building',
  },
  3: {
    en: 'Upsell - Frequency',
    tr: 'Upsell - Frequency',
  },
  4: {
    en: 'Upsell - Basket',
    tr: 'Upsell - Basket',
  },
  5: {
    en: 'Activation - Watch-out',
    tr: 'Activation - Watch-out',
  },
  6: {
    en: 'Activation - Re-Activate - Churn',
    tr: 'Activation - Re-Activate - Churn',
  },
  7: {
    en: 'Activation - Re-Activate - Cohort',
    tr: 'Activation - Re-Activate - Cohort',
  },
  8: {
    en: 'Burn - Bayi Mutluluk',
    tr: 'Burn - Bayi Mutluluk',
  },
  9: {
    en: 'Discount Code',
    tr: 'Discount Code',
  },
  10: {
    en: 'Waste',
    tr: 'Waste',
  },
  11: {
    en: 'RAF - Sender',
    tr: 'RAF - Sender',
  },
  15: {
    en: 'GetirSelect',
    tr: 'GetirÖzel',
  },
};

export const personCandidateRequiredFilesByWorkerType = {
  TR: {
    1: {
      tr: [
        'Getir T-Shirtlü Profil Resmi',
        'Sürücü Belgesi',
        'Arşivli Sabıka Kaydı',
        'Sabıka kaydının olması durumunda gerekçeli karar da eklenmelidir.',
        'İşe Giriş Belgesi',
        'Sürücü Belgesi ve Şahıslara Yazılan Ceza Belgesi (e-devlet)',
        'Özel Sağlık Sigortası Giriş Belgesi',
        'Bordrolu kurye güvenliğe ilişkin temel kurallar',
        'Bordrolu kurye GPS Kurallarına ilişkin Bilgi Yazısı',
        'Bordrolu kurye çalışan uyarı yazısı',
        'Sürücü Ceza Bilgisi Barkodlu Belge',
      ],
      en: [
        'Profile Picture With Getir T-shirt',
        "Driver's License",
        'Current Criminal Records',
        'If there is a criminal record, the reasoned decision should also be attached.',
        'Employement Certificate',
        "Driver's License and Penalty Document Written to Persons (From Goverment Web Site)",
        'Private Health Insurance Entry Certificate',
        'Rules for safety of payroll employees',
        'GPS rules information text for payroll employees',
        'Payroll employee warning text',
        'Driver Penalty Information Barcoded Document',
      ],
    },
    2: {
      tr: [
        'Getir T-Shirtlü Profil Resmi',
        'Arşivli Sabıka Kaydı',
        'Sabıka kaydının olması durumunda gerekçeli karar da eklenmelidir.',
        'İşe Giriş Belgesi',
        'Özel Sağlık Sigortası Giriş Belgesi',
      ],
      en: [
        'Profile Picture With Getir T-shirt',
        'Current Criminal Records ',
        'If there is a criminal record, the reasoned decision should also be attached.',
        'Employment Certificate',
        'Private Health Insurance Entry Certificate',
      ],
    },
    3: {
      tr: [
        'Getir Tişörtlü Profil Resmi',
        'Sürücü Belgesi',
        'Arşivli Sabıka Kaydı',
        'Sürücü Belgesi ve Şahıslara Yazılan Ceza Sorgulama Belgesi (e-devlet)',
        'Vergi Levhası (10 haneli vergi numarası ve NACE Kodu ile birlikte)',
        'Bağkur’dan “Borcu yoktur.” yazısı',
        'Bayi ve Kurye Arasındaki Hizmet Sözleşmesi',
        'Araç Kullanım Taahütnamesi ve Zimmet Formu',
        'Bayinin arabası ile çalışacaksa SRC ve Psikoteknik Belgesi',
        'Özel Sağlık Sigortası Giriş Belgesi',
        'Esnaf kurye çalışan uyarı yazısı',
        'Esnaf kurye güvenliğe ilişkin temel kurallar',
        'Esnaf kurye GPS Kurallarına ilişkin Bilgi Yazısı',
        'Sürücü Ceza Bilgisi Barkodlu Belge',
      ],
      en: [
        'Profile Picture With Getir T-shirt',
        "Driver's License",
        'Criminal Records with Historical',
        "Driver's License and Penalty Document Written to Persons (From Goverment Web Site)",
        'Tax Plate (With tax Number and NACE code)',
        'No Debt Letter (From Goverment Web Site)',
        'Service Agreement Between Franchise and Courier',
        'Vehicle Usage Commitment and Debit Form',
        "SRC and Psychotechnical Certificate if it will work with the franchise's car.",
        'Private Health Insurance Entry Certificate',
        'Self employed employee warning text',
        'Rules for safety of self employed employees',
        'GPS rules information text for self employed employees',
        'Driver Penalty Information Barcoded Document',
      ],
    },
    4: {
      tr: [
        'Getir Tişörtlü Profil Resmi',
        'Sürücü Belgesi',
        'Arşivli Sabıka Kaydı',
        'Sürücü Belgesi ve Şahıslara Yazılan Ceza Sorgulama Belgesi (e-devlet)',
        'Vergi Levhası (10 haneli vergi numarası)',
        'Bağkur’dan “Borcu yoktur.” yazısı',
        'Bayi ve Kurye Arasındaki Hizmet Sözleşmesi',
        'Kuryenin Ekipmanları (Motor, Kask, Pantolon) Üzerindeyken Çekilmiş Fotoğrafı',
        'Motorun Plakası ve Kasası/Çantası Görünecek Şekilde Çekilmiş Fotoğrafı',
        'Trafik Sigortası Poliçesi (Minimum bitiş tarihine 1 ay olmalıdır)',
        'Araç Ruhsatı ( Muayene Sayfası Görünecek Şekilde)',
        'Özel Sağlık Sigortası Giriş Belgesi',
        'Esnaf kurye çalışan uyarı yazısı',
        'Esnaf kurye güvenliğe ilişkin temel kurallar',
        'Esnaf kurye GPS Kurallarına ilişkin Bilgi Yazısı',
        'Sürücü Ceza Bilgisi Barkodlu Belge',
      ],
      en: [
        'Profile Picture With Getir T-shirt',
        "Driver's License",
        'Criminal Records with Historical',
        "Driver's License and Penalty Document Written to Persons (From Goverment Web Site)",
        'Tax Plate (With tax Number)',
        'No Debt Letter (From Goverment Web Site)',
        'Service Agreement Between Franchise and Courier',
        'Photo Of The Courier While She/He Is On Her Equipment (Motorbike, Helmet, Trousers)',
        'Photo of the Motorbike With the Plate and Case/Bag Visible',
        'Traffic Insurance Policy',
        'Vehicle license (so that the inspection page appears)',
        'Private Health Insurance Entry Certificate',
        'Self employed employee warning text',
        'Rules for safety of self employed employees',
        'GPS rules information text for self employed employees',
        'Driver Penalty Information Barcoded Document',
      ],
    },
    5: {
      tr: [
        'Getir Tişörtlü Profil Resmi',
        'Sürücü Belgesi',
        'Arşivli Sabıka Kaydı',
        'Sürücü Belgesi ve Şahıslara Yazılan Ceza Sorgulama Belgesi (e-devlet)',
        'Vergi Levhası (10 haneli vergi numarası ve NACE Kodu İle)',
        'Bağkur’dan “Borcu yoktur.” yazısı',
        'Bayi ve Kurye Arasındaki Hizmet Sözleşmesi',
        'Arabanın plakası görünecek şekilde çekilmiş fotoğrafı',
        'Trafik Sigortası Poliçesi  (Minimum bitiş tarihine 1 ay olmalıdır)',
        'Araç Ruhsatı ( Muayene Sayfası Görünecek Şekilde)',
        'Özel Sağlık Sigortası Giriş Belgesi',
        'Esnaf kurye çalışan uyarı yazısı',
        'Esnaf kurye güvenliğe ilişkin temel kurallar',
        'Esnaf kurye GPS Kurallarına ilişkin Bilgi Yazısı',
        'Sürücü Ceza Bilgisi Barkodlu Belge',
      ],
      en: [
        'Profile Picture With Getir T-shirt',
        "Driver's License",
        'Criminal Records with Historical',
        "Driver's License and Penalty Document Written to Persons (From Goverment Web Site)",
        'Tax Plate (With tax Number and NACE code)',
        'No Debt Letter (From Goverment Web Site)',
        'Service Agreement Between Franchise and Courier',
        'Photo of the Car With the Plate',
        'Traffic Insurance Policy',
        'Vehicle license (so that the inspection page appears)',
        'Private Health Insurance Entry Certificate',
        'Self employed employee warning text',
        'Rules for safety of self employed employees',
        'GPS rules information text for self employed employees',
        'Driver Penalty Information Barcoded Document',
      ],
    },
  },
  GB: {
    2: {
      tr: ['Çalışma Hakkı'],
      en: ['Right To Work / Settlement Letter'],
    },
    6: {
      tr: ['Sürücü Belgesi', 'Elektronik Karşılık ECP', 'Çalışma Hakkı / İskan Mektubu', 'DBS Sonucu', 'CBT', 'Resim'],
      en: ["Driver's License", 'Electronik Counter Part ECP', 'Right To Work / Settlement Letter', 'DBS Result', 'CBT', 'Picture'],
    },
    7: {
      tr: ['Sürücü Belgesi', 'Elektronik Karşılık ECP', 'Çalışma Hakkı / İskan Mektubu', 'DBS Sonucu', 'Resim'],
      en: ["Driver's License", 'Electronik Counter Part ECP', 'Right To Work / Settlement Letter', 'DBS Result', 'Picture'],
    },
  },
};

export const ddsObjectionStatuses = {
  100: {
    en: 'Not Objected',
    tr: 'İtiraz edilebilir',
  },
  200: {
    en: 'Waiting',
    tr: 'Cevap Bekleniyor',
  },
  300: {
    en: 'Accepted',
    tr: 'Onaylandı',
  },
  400: {
    en: 'Denied',
    tr: 'Reddedildi',
  },
};

export const euGrowthCities = {
  '6059a07b252472aba0790d61': {
    en: 'Amsterdam',
    tr: 'Amsterdam',
  },
  '6059a098252472aba0790d63': {
    en: 'Paris',
    tr: 'Paris',
  },
  '6059a08f252472aba0790d62': {
    en: 'Berlin',
    tr: 'Berlin',
  },
  '5f7f7dd00000010001500000': {
    en: 'London',
    tr: 'Londra',
  },
  '609952a4c438039c6ba1469e': {
    en: 'Barcelona',
    tr: 'Barselona',
  },
  '60e83e3f5bde82e31d9d8737': {
    en: 'Lisbon',
    tr: 'Lizbon',
  },
  '60e83e405bde82e31d9d8739': {
    en: 'Milan',
    tr: 'Milano',
  },
};

export const deliveryFeeDiscountReasons = {
  0: { tr: 'Yok', en: 'None' },
  1: { tr: 'Kapalı', en: 'Disabled' },
  2: { tr: 'Segment', en: 'Segment' },
  3: { tr: 'Sipariş Sayısı', en: 'Order Count' },
  4: { tr: 'Ürün', en: 'Product' },
  5: { tr: 'Kampanya', en: 'Promo' },
  6: { tr: 'Ödeme Yöntemi', en: 'Payment Method' },
  7: { tr: 'Karanfilköy Mh', en: 'Karanfilköy Cc' },
  8: { tr: 'Tutar', en: 'Amount' },
  9: { tr: 'Saha', en: 'Field' },
  10: { tr: 'Banka', en: 'Bank' },
  11: { tr: 'Öğrenci', en: 'Student' },
  12: { tr: 'Lokasyon', en: 'Location' },
  13: { tr: 'Kampanya', en: 'Promo' },
  14: { tr: 'GetirÖzel', en: 'GetirSelect' },
};

export const waterOrderPaymentStatuses = {
  0: {
    en: 'Not Paid',
    tr: 'Ödenmedi',
  },
  1: {
    en: 'Pending Payment',
    tr: 'Ödeme bekleniyor',
  },
  2: {
    en: 'Paid',
    tr: 'Ödendi',
  },
  3: {
    en: 'Payment Error',
    tr: 'Ödeme hatası',
  },
  4: {
    en: 'Pending Refund',
    tr: 'İade bekleniyor',
  },
  5: {
    en: 'Refunded',
    tr: 'İade edildi',
  },
  6: {
    en: 'Partial Refund Succeded',
    tr: 'Ürün iadesi yapıldı',
  },
  7: {
    en: 'Pending Partial Refund',
    tr: 'Ürün iadesi bekleniyor',
  },
  8: {
    en: 'On Delivery Payment',
    tr: 'Kapıda Ödeme',
  },
};

export const waterOrderStatuses = {
  100: { tr: 'Tamamlanmadı', en: 'Incomplete' },
  200: { tr: 'Durduruldu', en: 'Aborted' },
  300: { tr: 'Gözatılıyor', en: 'Browsing' },
  325: { tr: 'Ön Onay', en: 'Scheduled Verifying' },
  350: { tr: 'İleri Tarihli', en: 'Scheduled' },
  400: { tr: 'Onay Bekleniyor', en: 'Verifying' },
  500: { tr: 'Hazırlanıyor', en: 'Preparing' },
  550: { tr: 'Hazırlandı', en: 'Prepared' },
  600: { tr: 'Kurye Onayı Bekleniyor', en: 'Handover' },
  700: { tr: 'Müşteriye Gidiyor', en: 'Onway' },
  800: { tr: 'Adrese Ulaştı', en: 'Reached' },
  900: { tr: 'Teslim Edildi', en: 'Delivered' },
  1000: { tr: 'Oylandı', en: 'Rated' },
  1500: { tr: 'Admin İptal Etti', en: 'Canceled by Admin' },
  1600: { tr: 'Bayi İptal Etti', en: 'Canceled by Vendor' },
};

export const waterCourierStatuses = {
  100: {
    tr: 'Müsait',
    en: 'Free',
  },
  200: {
    tr: 'Meşgul',
    en: 'Busy',
  },
  350: {
    tr: 'Rezerve',
    en: 'Reserved',
  },
  400: {
    tr: 'Doğruluyor',
    en: 'Verifying',
  },
  500: {
    tr: 'Hazırlıyor',
    en: 'Preparing',
  },
  600: {
    tr: 'Topluyor',
    en: 'Gathering',
  },
  700: {
    tr: 'Yolda',
    en: 'Onway',
  },
  800: {
    tr: 'Ulaştı',
    en: 'Reached',
  },
  900: {
    tr: 'Dönüyor',
    en: 'Returning',
  },
  1000: {
    tr: 'İptal edildi',
    en: 'Canceled',
  },
  4000: {
    tr: 'Dolum doğrulanıyor',
    en: 'Verifying Refill',
  },
  4100: {
    tr: 'Doluma gidiyor',
    en: 'Onway Refill',
  },
  4200: {
    tr: 'Yeniden dolduruldu',
    en: 'Refill',
  },
};

export const getirDomainTypesAllShortcuts = {
  1: { en: 'G10', tr: 'G10' },
  2: { en: 'GF', tr: 'GY' },
  3: { en: 'GM', tr: 'GB' },
  4: { en: 'GW', tr: 'GS' },
  6: { en: 'GL', tr: 'GÇ' },
  7: { en: 'GBi', tr: 'GBi' },
  8: { en: 'GWM', tr: 'GSP' },
  9: { en: 'GD', tr: 'GA' },
  11: { en: 'GJ', tr: 'Gİş' },
  12: { en: 'GN11', tr: 'GN11' },
  14: { en: 'GFi', tr: 'GFi' },
  17: { en: 'GG', tr: 'GG' },
};

export const getirFoodDeliveryTypes = {
  1: {
    en: 'Getir Delivery',
    tr: 'Getir Getirsin',
  },
  2: {
    en: 'Restaurant Delivery',
    tr: 'Restoran Getirsin',
  },
};

export const FOOD_ORDER_SELECT_STATUSES = {
  SUCCESS_ORDERS: {
    en: 'Success Orders',
    tr: 'Başarılı Siparişler',
  },
  CANCELED_ORDERS: {
    en: 'Canceled Orders',
    tr: 'İptal Siparişler',
  },
  ACTIVE_ORDERS: {
    en: 'Active Orders',
    tr: 'Aktif Siparişler',
  },
};

export const foodOrderPaymentMethods = {
  1: {
    en: 'Online CC',
    tr: 'Online KK',
  },
  2: {
    en: 'BKM',
    tr: 'BKM',
  },
  3: {
    en: 'On Delivery CC',
    tr: 'Kapıda KK',
  },
  4: {
    en: 'Cash',
    tr: 'Nakit',
  },
  5: {
    en: 'Multinet Card',
    tr: 'Multinet',
  },
  6: {
    en: 'Sodexo Card',
    tr: 'Sodexo Kart',
  },
  7: {
    en: 'Sodexo Voucher',
    tr: 'Sodexo Fiş',
  },
  8: {
    en: 'Ticket Card',
    tr: 'Ticket Kart',
  },
  9: {
    en: 'Ticket Voucher',
    tr: 'Ticket Fiş',
  },
  10: {
    en: 'SetCard',
    tr: 'Set Kart',
  },
  11: {
    en: 'Metropol Card',
    tr: 'Metropol Kart',
  },
  12: {
    en: 'Paye Card',
    tr: 'Paye Kart',
  },
  15: {
    en: 'Mobilexpress',
    tr: 'Mobilexpress',
  },
  17: {
    en: 'Sodexo Pass',
    tr: 'Sodexo Pass',
  },
  18: {
    en: 'CIO Card',
    tr: 'CIO Kart',
  },
  19: {
    en: 'Sodexo Online',
    tr: 'Sodexo Online',
  },
  20: {
    en: 'Getir Money',
    tr: 'Getir Para',
  },
  21: {
    en: 'Token Flex',
    tr: 'Token Flex',
  },
};

export const basketOrderStatuses = {
  100: { tr: 'Tamamlanmadı', en: 'Incomplete' },
  200: { tr: 'Durduruldu', en: 'Aborted' },
  300: { tr: 'Gözatılıyor', en: 'Browsing' },
  325: { tr: 'Ön Onay', en: 'Scheduled Verifying' },
  350: { tr: 'İleri Tarihli', en: 'Scheduled' },
  400: { tr: 'Tamamlandı', en: 'Completed' },
};

export const foodOrderStatuses = {
  100: { tr: 'Tamamlanmadı', en: 'Incomplete' },
  200: { tr: 'Durduruldu', en: 'Aborted' },
  300: { tr: 'Gözatılıyor', en: 'Browsing' },
  325: { tr: 'Ön Onay', en: 'Scheduled Verifying' },
  350: { tr: 'İleri Tarihli', en: 'Scheduled' },
  400: { tr: 'Onay Bekleniyor', en: 'Verifying' },
  500: { tr: 'Hazırlanıyor', en: 'Preparing' },
  550: { tr: 'Hazırlandı', en: 'Prepared' },
  600: { tr: 'Kurye Onayı Bekleniyor', en: 'Handover' },
  700: { tr: 'Müşteriye Gidiyor', en: 'Onway' },
  800: { tr: 'Adrese Ulaştı', en: 'Reached' },
  900: { tr: 'Teslim Edildi', en: 'Delivered' },
  1000: { tr: 'Oylandı', en: 'Rated' },
  1500: { tr: 'Admin İptal Etti', en: 'Canceled by Admin' },
  1600: { tr: 'Restoran İptal Etti', en: 'Canceled by Restaurant' },
};

export const foodOrderPaymentStatuses = {
  0: {
    en: 'Not Paid',
    tr: 'Ödenmedi',
  },
  1: {
    en: 'Pending Payment',
    tr: 'Ödeme bekleniyor',
  },
  2: {
    en: 'Paid',
    tr: 'Ödendi',
  },
  3: {
    en: 'Payment Error',
    tr: 'Ödeme hatası',
  },
  4: {
    en: 'Pending Refund',
    tr: 'İade bekleniyor',
  },
  5: {
    en: 'Refunded',
    tr: 'İade edildi',
  },
  6: {
    en: 'Partial Refund Succeded',
    tr: 'Ürün iadesi yapıldı',
  },
  7: {
    en: 'Pending Partial Refund',
    tr: 'Ürün iadesi bekleniyor',
  },
  8: { en: 'On Delivery Payment', tr: 'Kapıda Ödeme' },
};

export const feedbackTypes = {
  1: {
    en: 'Client',
    tr: 'Müşteri',
  },
  2: {
    en: 'Order',
    tr: 'Sipariş',
  },
  3: {
    en: 'Other',
    tr: 'Diğer',
  },
  4: {
    en: 'Test Drive',
    tr: 'Test Sürüşü',
  },
};

export const feedbackStatuses = {
  1: {
    en: 'Not Resolved',
    tr: 'Çözülmedi',
  },
  2: {
    en: 'Resolved',
    tr: 'Çözüldü',
  },
};

export const feedbackSourceTypes = {
  1: {
    en: 'Gsm',
    tr: 'Gsm',
  },
  2: {
    en: 'Email',
    tr: 'Email',
  },
  3: {
    en: 'Other',
    tr: 'Diğer',
  },
  4: {
    en: 'Warehouse',
    tr: 'Depo',
  },
  5: {
    en: 'Chat',
    tr: 'Chat',
  },
  6: {
    en: 'Social Media',
    tr: 'Sosyal Medya',
  },
};

export const clientFeedbackTypes = {
  1: {
    en: "Can't add payment method",
    tr: 'Ödeme methodu ekleyememe',
  },
  2: {
    en: "Can't use promo",
    tr: 'Kampanya kullanamama',
  },
  3: {
    en: "Can't find courier",
    tr: 'Kurye bulamama',
  },
  4: {
    en: 'Checkout error',
    tr: 'Ödeme yapamama',
  },
  6: {
    en: 'Food Order Error',
    tr: 'Yemek Siparişi Hatası',
  },
  5: {
    en: 'Other',
    tr: 'Diğer',
  },
};

export const orderFeedbackTypes = {
  1: {
    en: 'Client fault',
    tr: 'Kullanıcı hatası',
  },
  2: {
    en: 'Bad courier',
    tr: 'Kurye şikayeti',
  },
  3: {
    en: 'Missing product',
    tr: 'Eksik ürün',
  },
  4: {
    en: 'Damaged product',
    tr: 'Hasarlı ürün',
  },
  5: {
    en: 'Not fresh product',
    tr: 'Bozuk/bayat/skt geçmiş ürün',
  },
  6: {
    en: 'Wrong product',
    tr: 'Yanlış ürün',
  },
  7: {
    en: "Can't use promo",
    tr: 'Kampanya kullanamama',
  },
  8: {
    en: 'Other',
    tr: 'Diğer',
  },
  9: {
    en: 'Expired date product',
    tr: "SKT'si geçmiş ürün",
  },
  10: {
    en: 'Not fresh product',
    tr: 'Bayat ürün',
  },
};

export const testDriveFeedbackTypes = {
  1: {
    en: 'Client fault',
    tr: 'Müşteri hatası',
  },
  2: {
    en: 'Test Drive Courier complaint',
    tr: 'Görevli şikayeti',
  },
  3: {
    en: 'Other',
    tr: 'Diğer',
  },
};

export const getirWaterMarketplaceOrderStatuses = {
  100: { en: 'Incompleted', tr: 'Tamamlanmadı' },
  200: { en: 'Aborted', tr: 'Durduruldu' },
  300: { en: 'Browsing', tr: 'Gözatılıyor' },
  350: { en: 'Scheduled', tr: 'İleri Tarihli' },
  400: { en: 'Verifying', tr: 'Onay Bekliyor' },
  500: { en: 'Preparing', tr: 'Hazırlanıyor' },
  550: { en: 'Prepared', tr: 'Hazırlandı' },
  700: { en: 'Onway', tr: 'Yolda' },
  900: { en: 'Delivered', tr: 'Teslim Edildi' },
  1000: { en: 'Rated', tr: 'Oylandı' },
  1500: { en: 'Canceled By Admin', tr: 'Admin İptal Etti' },
  1600: { en: 'Canceled By Vendor', tr: 'Bayi İptal Etti' },
};

export const promoCodeStatuses = {
  1: { en: 'Inactive', tr: 'İnaktif' },
  2: { en: 'Active', tr: 'Aktif' },
  3: { en: 'Expired', tr: 'Süresi Bitti' },
  4: { en: 'Order Limit Reached', tr: 'Sipariş Limitine Ulaşıldı' },
  5: { en: 'Client Limit Reached', tr: 'Kullanıcı Limitine Ulaşıldı' },
  6: { en: 'Used', tr: 'Kullanıldı' },
  7: { en: 'Preparing', tr: 'Hazırlanıyor' },
};

export const topupBankCards = {
  2110: { en: 'Akbank T.A.S.', tr: 'Akbank T.A.Ş.' },
  2030: { en: 'Turkiye Garanti Bankasi A.S.', tr: 'Türkiye Garantı Bankası A.Ş.' },
  1684: { en: 'Finansbank A.S.', tr: 'Finansbank A.Ş.' },
  2117: { en: 'Yapi Ve Kredi Bankasi A.S.', tr: 'Yapı Ve Kredi Bankasi A.Ş.' },
  3771: { en: 'Turkiye Is Bankasi A.S.', tr: 'Türkiye İş Bankası A.Ş.' },
  2374: { en: 'T.C. Ziraat Bankasi A.S.', tr: 'T.C. Ziraat Bankası A.Ş.' },
  7338: { en: 'Denizbank A.S.', tr: 'Denizbank A.Ş.' },
  2119: { en: 'Turkiye Vakiflar Bankasi T.A.O.', tr: 'Türkiye Vakıflar Bankası T.A.O.' },
  3039: { en: 'Turkiye Halk Bankasi A.S.', tr: 'Türkiye Halk Bankasi A.Ş.' },
  9165: { en: 'Turk Ekonomi Bankasi A.S.', tr: 'Türk Ekonomi Bankası A.Ş.' },
  3081: { en: 'Turkiye Halk Bankasi A.S.', tr: 'Türkiye Halk Bankasi A.Ş.' },
  9088: { en: 'Turkish Bank A.S.', tr: 'Turkish Bank A.Ş.' },
  6701: { en: 'Tekstil Bankasi A.S.', tr: 'Tekstil Bankası A.Ş.' },
  7244: { en: 'Citibank A.S.', tr: 'Citibank A.Ş.' },
  7182: { en: 'Fibabanka A.S.', tr: 'Fibabanka A.Ş.' },
  7656: { en: 'HSBC Bank A.S.', tr: 'HSBC Bank A.Ş.' },
  2029: { en: 'ING Bank A.S.', tr: 'ING Bank A.Ş.' },
  7160: { en: 'Anadolubank A.S.', tr: 'Anadolubank A.Ş.' },
  9299: { en: 'Sekerbank T.A.S.', tr: 'Şekerbank T.A.Ş.' },
  8914: { en: 'Kuveyt Turk Katilim Bankasi', tr: 'Kuveyt Türk Katılım Bankası' },
  4033: { en: 'Asya Katilim Bankasi A.S.', tr: 'Asya Katılım Bankası A.Ş.' },
  10554: { en: 'Albaraka Turk Katilim Bankasi', tr: 'Albaraka Türk Katılım Bankası' },
  10684: { en: 'Turkiye Finans Katilim Bankasi', tr: 'Türkiye Finans Katılım Bankası' },
  14348: { en: 'Bankpozitif Kredi Ve Kalkinma Bankasi A.S.', tr: 'Bankpozitif Kredi Ve Kalkınma Bankası A.Ş.' },
  14194: { en: 'Odea Bank A.S.', tr: 'Odea Bank A.Ş.' },
  15140: { en: 'Aktif Yatirim Bankasi A.S.', tr: 'Aktif Yatırım Bankası A.Ş.' },
  '0124': { en: 'Alternatif Bank A.S', tr: 'Alternatif Bank A.Ş.' },
  23228: { en: 'Paycell', tr: 'Paycell' },
  2000: { en: 'ParamPOS', tr: 'ParamPOS' },
};

export const bannerActionTargets = {
  1: { tr: 'Getir10', en: 'Getir10' },
  2: { tr: 'Yemek', en: 'Food' },
  6: { tr: 'GetirÇarşı', en: 'GetirLocals' },
};

export const responsibleDepartment = {
  1: { en: 'Marketing', tr: 'Pazarlama' },
  2: { en: 'Growth', tr: 'Büyüme Ekibi' },
  3: { en: 'Customer Support', tr: 'Müşteri Hizmetleri' },
  4: { en: 'Product Department', tr: 'Ürün Departmanı' },
};

export const targetServiceType = {
  GETIR: 1,
  GETIR_FOOD: 2,
  GETIR_MORE: 3,
  GETIR_WATER: 4,
  GETIR_LOCAL: 6,
  GETIR_BITAKSI: 7,
  GETIR_WATER_MARKETPLACE: 8,
};

export const waterOrderPaymentMethods = {
  1: {
    en: 'Online CC',
    tr: 'Online KK',
  },
  2: {
    en: 'BKM',
    tr: 'BKM',
  },
  3: {
    en: 'On Delivery CC',
    tr: 'Kapıda KK',
  },
  4: {
    en: 'Cash',
    tr: 'Nakit',
  },
};

export const locationWriteOffStatuses = {
  100: {
    tr: 'Yeni',
    en: 'New',
  },
  200: {
    tr: 'Onaylandı',
    en: 'Approved',
  },
  300: {
    tr: 'İptal Edilmiş',
    en: 'Cancelled',
  },
  400: {
    tr: 'Reddedildi',
    en: 'Rejected',
  },
};

export const locationWriteOffReasons = {
  10: {
    tr: 'Fatura',
    en: 'Invoice',
  },
  20: {
    tr: 'Küçülme',
    en: 'Shrinkage',
  },
};

export const locationWriteOffComments = {
  1001: {
    tr: 'Yıl kapanışı hareketleri',
    en: 'Year-End Movements',
  },
  1002: {
    tr: 'Ay/Dönem kapanışı hareketleri',
    en: 'Period-End Movements',
  },
  1003: {
    tr: 'Vaka bazlı/Münferit hareketler',
    en: 'Independent Movements',
  },
};

export const ORDER_CHECK_RESULT = {
  8000: {
    tr: 'Sipariş oluşmamış veya iptal edilmiş ancak ödeme alınmış',
    en: 'Order is not delivered or cancelled but has successful payment transaction(s) !',
  },
  7000: {
    tr: 'Mükerrer çekim',
    en: 'Duplicate payment transactions !',
  },
  9000: {
    tr: 'Sipariş ve işlem tutarı farklı',
    en: 'Order amount and charged amount are not same !',
  },
};

export const courierStatusesForFood = {
  100: { tr: 'Müsait', en: 'Free' },
  200: { tr: 'Meşgul', en: 'Busy' },
  300: { tr: 'Gözatıyor', en: 'Browsing' },
  350: { tr: 'Rezerve', en: 'Reserved' },
  375: { tr: 'Sıra Planlandı', en: 'Reserved Queue' },
  400: { tr: 'Doğruluyor', en: 'Verifying' },
  450: { tr: 'Restorana Ulaştı', en: 'Reached to Restaurant' },
  500: { tr: 'Hazırlıyor', en: 'Preparing' },
  600: { tr: 'Toplama', en: 'Gathering' },
  700: { tr: 'Yolda', en: 'Onway' },
  800: { tr: 'Ulaştı', en: 'Reached' },
  900: { tr: 'Dönüyor', en: 'Returning' },
  1000: { tr: 'İptal Edildi', en: 'Canceled' },
};

export const promoAggressionLevels = {
  0: { tr: 'Global Config', en: 'Global Config' },
  1: { tr: 1, en: 1 },
  2: { tr: 2, en: 2 },
  3: { tr: 3, en: 3 },
  4: { tr: 4, en: 4 },
  5: { tr: 5, en: 5 },
};

export const marketOrderStatuses = {
  100: { en: 'Incomplete', tr: 'Tamamlanmadı' },
  200: { en: 'Aborted', tr: 'Durduruldu' },
  300: { en: 'Browsing', tr: 'Gözatılıyor' },
  350: { en: 'Reserved', tr: 'Rezerve' },
  375: { en: 'Waiting For Picker', tr: 'Toplayıcı Bekliyor' },
  400: { en: 'Verifying', tr: 'Doğrulanıyor' },
  500: { en: 'Preparing', tr: 'Hazırlanıyor' },
  550: { en: 'Prepared', tr: 'Hazırlandı' },
  600: { en: 'Handover', tr: 'El değiştiriliyor' },
  700: { en: 'Onway', tr: 'Yolda' },
  800: { en: 'Reached', tr: 'Ulaştı' },
  900: { en: 'Delivered', tr: 'Teslim edildi' },
  1000: { en: 'Rated', tr: 'Oylandı' },
  1100: { en: 'Canceled by Courier', tr: 'Kurye iptal etti' },
  1200: { en: 'Canceled by Client', tr: 'Müşteri iptal etti' },
  1300: { en: 'Canceled by Staff', tr: 'Depo Personeli iptal etti' },
  1400: { en: 'Canceled by System', tr: 'Sistem iptal etti' },
  1500: { en: 'Canceled by Admin', tr: 'Admin iptal etti' },
};

export const orderInvoiceStatuses = {
  0: {
    en: 'Not Invoiced',
    tr: 'Faturalanmadı',
  },
  1: {
    en: 'Invoice Pending',
    tr: 'Fatura Bekliyor',
  },
  2: {
    en: 'Invoiced',
    tr: 'Faturalandı',
  },
  3: {
    en: 'Cancel Invoice Pending',
    tr: 'İptal Faturası Bekliyor',
  },
  4: {
    en: 'Cancel Invoiced',
    tr: 'İptal Faturalandı',
  },
};

export const marketQueueStatuses = {
  100: { tr: 'Sıraya Girmedi', en: 'Queue Not Involved' },
  200: { tr: 'Sıra Soruldu', en: 'Queue Question Asked' },
  300: { tr: 'Sırada', en: 'Enqueued' },
  400: { tr: 'Sıradan Çıktı', en: 'Dequeued' },
};

export const invoiceUrlProcessingRequest = { tr: 'Lütfen bekleyin...', en: 'Please wait...' };

export const marketOrderPaymentStatuses = {
  0: { en: 'Not Paid', tr: 'Ödenmedi' },
  1: { en: 'Pending Payment', tr: 'Ödeme bekleniyor' },
  2: { en: 'Paid', tr: 'Ödendi' },
  3: { en: 'Payment Error', tr: 'Ödeme hatası' },
  4: { en: 'Refunded', tr: 'İade edildi' },
  5: { en: 'Pending Refund', tr: 'İade bekleniyor' },
  6: { en: 'Pending Partial Refund', tr: 'Ürün iadesi bekleniyor' },
  7: { en: 'Partial Refund Succeded', tr: 'Ürün iadesi yapıldı' },
  1600: { en: 'Canceled by Restaurant', tr: 'Restoran iptal etti' },
};

export const ACTIVENESS_OPTIONS = [
  { label: 'INACTIVE', value: false },
  { label: 'ACTIVE', value: true },
];

export const YES_NO_OPTIONS = [
  { label: 'NO', value: false },
  { label: 'YES', value: true },
];
export const PICKER_EMPLOYMENT_TYPES = { 1: { en: 'Store Assistant', tr: 'Depo Personeli' } };

export const EMPLOYMENT_TYPES = {
  1: { en: 'Payroll', tr: 'Bordrolu' },
  2: { en: 'Self Employed', tr: 'Esnaf' },
  3: { en: 'Restaurant Employee', tr: 'Restoran Çalışanı' },
};

export const COURIER_EMPLOYMENT_TYPES = {
  1: [
    { type: 1, en: 'Payroll Courier', tr: 'Bordrolu Kurye' },
    { type: 5, en: 'E-Bike Courier', tr: 'E-Bisiklet Kurye' },
    { type: 6, en: 'E-Scooter Courier', tr: 'E-Motor Kurye' },
  ],
  2: [
    { type: 2, en: 'Self Employed Courier with Its Franhcise\'s Motorcycle', tr: 'Bayi Aracı İle Çalışan Şahıs Şirket Sahibi Kurye' },
    { type: 3, en: 'Self Employed Courier with Its Own Motorcycle', tr: 'Kendi Motoru İle Çalışan Şahıs Şirket Sahibi Kurye' },
    { type: 4, en: 'Self Employed Courier with Its Own Car', tr: 'Kendi Aracı İle Çalışan Şahıs Şirket Sahibi Kurye' },
  ],
  3: [
    { type: 7, en: 'Restaurant Courier', tr: 'Restoran Kurye' },
  ],
};

export const PICKER_TYPES = {
  [PICKER_TYPE.GENERAL]: {
    en: 'General Picker',
    tr: 'Toplayıcı',
  },
};

export const notificationDomainType = {
  1: { en: 'Getir', tr: 'Getir' },
  2: { en: 'GetirFood', tr: 'GetirYemek' },
  3: { en: 'GetirMore', tr: 'GetirBüyük' },
  4: { en: 'GetirWater', tr: 'GetirSu' },
  6: { en: 'GetirLocals', tr: 'GetirÇarşı' },
  7: { en: 'GetirBitaksi', tr: 'GetirBitaksi' },
  8: { en: 'GetirWater Marketplace', tr: 'GetirSuPazaryeri' },
  9: { en: 'GetirDrive', tr: 'GetirAraç' },
  11: { en: 'GetirJobs', tr: 'Getirİş' },
  12: { en: 'N11', tr: 'N11' },
  14: { en: 'GetirFinance', tr: 'GetirFinans' },
};

export const POS_BANKS = {
  AKBANK: { label: 'AKBANK', value: 1, isAvailableInTR: true },
  GARANTI: { label: 'GARANTI', value: 2, isAvailableInTR: true },
  FINANSBANKVPOS: { label: 'FINANSBANKVPOS', value: 3, isAvailableInTR: true },
  YAPIKREDI: { label: 'YAPIKREDI', value: 4, isAvailableInTR: true },
  ISBANKASI: { label: 'ISBANKASI', value: 5, isAvailableInTR: true },
  ZIRAAT: { label: 'ZIRAAT', value: 6, isAvailableInTR: true },
  DENIZBANK: { label: 'DENIZBANK', value: 7, isAvailableInTR: true },
  VAKIFBANK: { label: 'VAKIFBANK', value: 8, isAvailableInTR: true },
  HALKBANK: { label: 'HALKBANK', value: 9, isAvailableInTR: true },
  ADYEN: { label: 'ADYEN', value: 10, isAvailableInTR: false },
  PARAMPOS: { label: 'PARAMPOS', value: 13, isAvailableInTR: true },
  FINANSBANK: { label: 'FINANSBANK', value: 99, isAvailableInTR: true },
};
export const POS_BANK_DOMAIN_VALUES = {
  AKBANK: {
    DEFAULT: 1,
    BITAKSI: 14,
    BITAKSI_OLD: 15,
    WATERMARKETPLACE: 28,
  },
  GARANTI: {
    DEFAULT: 2,
    GETIR_ACCOUNT: 12,
    BITAKSI: 26,
    BITAKSI_OLD: 23,
  },
  FINANSBANKVPOS: {
    DEFAULT: 3,
    BITAKSI: 21,
  },
  FINANSBANK: { DEFAULT: 99 },
  YAPIKREDI: {
    DEFAULT: 4,
    BITAKSI: 25,
  },
  ISBANKASI: {
    DEFAULT: 5,
    GETIR_ACCOUNT: 11,
    BITAKSI: 17,
    BITAKSI_OLD: 18,
    WATERMARKETPLACE: 27,
  },
  ZIRAAT: {
    DEFAULT: 6,
    BITAKSI: 19,
    BITAKSI_OLD: 20,
    WATERMARKETPLACE: 29,
  },
  DENIZBANK: {
    DEFAULT: 7,
    BITAKSI: 16,
  },
  VAKIFBANK: {
    DEFAULT: 8,
    BITAKSI: 24,
  },
  HALKBANK: {
    DEFAULT: 9,
    BITAKSI_OLD: 22,
  },
  ADYEN: { DEFAULT: 10 },
  PARAMPOS: {
    DEFAULT: 13,
    WATERMARKETPLACE: 35,
  },
};

export const refundTypeMap = {
  1: { en: 'Full Refund', tr: 'Tam İade' },
  3: { en: 'Partial Refund', tr: 'Ürün İadesi' },
};

export const foodRefundSourceMap = {
  1: { en: 'Getir', tr: 'Getir' },
  2: { en: 'Restaurant', tr: 'Restoran' },
};

export const POS_BANK_OPTIONS = [
  {
    ...POS_BANKS.AKBANK,
    mappedValues: [
      POS_BANK_DOMAIN_VALUES.AKBANK.DEFAULT, POS_BANK_DOMAIN_VALUES.AKBANK.BITAKSI,
      POS_BANK_DOMAIN_VALUES.AKBANK.BITAKSI_OLD, POS_BANK_DOMAIN_VALUES.AKBANK.WATERMARKETPLACE,
    ],
  },
  {
    ...POS_BANKS.GARANTI,
    mappedValues: [
      POS_BANK_DOMAIN_VALUES.GARANTI.DEFAULT, POS_BANK_DOMAIN_VALUES.GARANTI.GETIR_ACCOUNT,
      POS_BANK_DOMAIN_VALUES.GARANTI.BITAKSI, POS_BANK_DOMAIN_VALUES.GARANTI.BITAKSI_OLD,
    ],
  },
  {
    ...POS_BANKS.FINANSBANKVPOS,
    mappedValues: [
      POS_BANK_DOMAIN_VALUES.FINANSBANKVPOS.DEFAULT, POS_BANK_DOMAIN_VALUES.FINANSBANKVPOS.BITAKSI,
    ],
  },
  {
    ...POS_BANKS.FINANSBANK,
    mappedValues: [POS_BANK_DOMAIN_VALUES.FINANSBANK.DEFAULT],
  },
  {
    ...POS_BANKS.YAPIKREDI,
    mappedValues: [POS_BANK_DOMAIN_VALUES.YAPIKREDI.DEFAULT, POS_BANK_DOMAIN_VALUES.YAPIKREDI.BITAKSI],
  },
  {
    ...POS_BANKS.ISBANKASI,
    mappedValues: [
      POS_BANK_DOMAIN_VALUES.ISBANKASI.DEFAULT, POS_BANK_DOMAIN_VALUES.ISBANKASI.GETIR_ACCOUNT,
      POS_BANK_DOMAIN_VALUES.ISBANKASI.BITAKSI, POS_BANK_DOMAIN_VALUES.ISBANKASI.BITAKSI_OLD,
      POS_BANK_DOMAIN_VALUES.ISBANKASI.WATERMARKETPLACE,
    ],
  },
  {
    ...POS_BANKS.ZIRAAT,
    mappedValues: [
      POS_BANKS.ZIRAAT.DEFAULT, POS_BANK_DOMAIN_VALUES.ZIRAAT.BITAKSI,
      POS_BANK_DOMAIN_VALUES.ZIRAAT.BITAKSI_OLD, POS_BANK_DOMAIN_VALUES.ZIRAAT.WATERMARKETPLACE,
    ],
  },
  {
    ...POS_BANKS.DENIZBANK,
    mappedValues: [POS_BANK_DOMAIN_VALUES.DENIZBANK.DEFAULT, POS_BANK_DOMAIN_VALUES.DENIZBANK.BITAKSI],
  },
  {
    ...POS_BANKS.VAKIFBANK,
    mappedValues: [POS_BANK_DOMAIN_VALUES.VAKIFBANK.DEFAULT, POS_BANK_DOMAIN_VALUES.VAKIFBANK.BITAKSI],
  },
  {
    ...POS_BANKS.HALKBANK,
    mappedValues: [POS_BANK_DOMAIN_VALUES.HALKBANK.DEFAULT, POS_BANK_DOMAIN_VALUES.HALKBANK.BITAKSI_OLD],
  },
  {
    ...POS_BANKS.ADYEN,
    mappedValues: [POS_BANK_DOMAIN_VALUES.ADYEN.DEFAULT],
  },
  {
    ...POS_BANKS.PARAMPOS,
    mappedValues: [POS_BANK_DOMAIN_VALUES.PARAMPOS.DEFAULT, POS_BANK_DOMAIN_VALUES.PARAMPOS.WATERMARKETPLACE],
  },
];

export const foodOrderChangeErrors = {
  106: {
    tr: 'Uygun durumda olmadığı için sipariş değiştirilemez',
    en: 'Order can not change because its not in a eligible status',
  },
  107: {
    tr: 'Sipariş belirli saat aralığında değiştirilebilir',
    en: 'Order can not change after limit hours',
  },
  108: {
    tr: 'Sipariş değişikliği bulunamadı',
    en: 'Food order change not found',
  },
  109: {
    tr: 'Sipariş değişikliği zaten mevcut',
    en: 'Food order change already exist',
  },
};

export const getirJobsPostTypes = {
  JOB: { en: 'Job', tr: 'İş İlanı' },
  SERVICE: { en: 'Employee', tr: 'Çalışan İlanı' },
};

export const marketOrderCheckoutErrorCodes = {
  '-2': { en: 'Other', tr: 'Diğer' },
  '-1': { en: 'Unknown error', tr: 'Bilinmeyen hata' },
  1340: { en: 'Inconsistent amount', tr: 'Tutarsız fiyat' },
  1345: { en: 'Min. basket amount', tr: 'Min. sepet tutarı' },
  1350: { en: 'Max. basket amount', tr: 'Max. sepet tutarı' },
  1354: { en: 'Warehouse state error', tr: 'Depo durumu hatalı' },
  1355: { en: 'Warehouse not available', tr: 'Depo durumu uygun değil' },
  1360: { en: 'Unavailable product', tr: 'Kullanım dışı ürün' },
  1365: { en: 'Insufficient stock', tr: 'Yetersiz ürün miktarı' },
  1370: { en: 'Courier unavailable', tr: 'Müsait kurye yok' },
  8005: { en: 'Courier unavailable', tr: 'Müsait kurye yok' },
  1371: { en: 'Capacity limit exceeded', tr: 'Ağırlık limiti aşıldı' },
  1395: { en: 'Payment failed', tr: 'Ödeme hatası' },
};

export const platformDeviceTypes = {
  1: {
    en: 'Mobile',
    tr: 'Mobil',
  },
  2: {
    en: 'Web',
    tr: 'Web',
  },
  3: {
    en: 'Jet',
    tr: 'Jet',
  },
};
export const marketBasketDeviceTypes = {
  1: {
    en: 'Mobile',
    tr: 'Mobil',
  },
  2: {
    en: 'Web',
    tr: 'Web',
  },
};

export const integrationTypes = {
  1: {
    en: 'Getir',
    tr: 'Getir',
  },
  2: {
    en: 'Jet',
    tr: 'Jet',
  },
  3: {
    en: 'Gorillas',
    tr: 'Gorillas',
  },
  4: {
    en: 'Uber',
    tr: 'Uber',
  },
  5: {
    en: 'Grubhub',
    tr: 'Grubhub',
  },
  6: {
    en: 'n11',
    tr: 'n11',
  },
};

export const THIRD_PARTY_ORDER_INTEGRATION_TYPES = {
  jet: 'jet',
  gorillas: 'gorillas',
  uber: 'uber',
  grubhub: 'grubhub',
  n11: 'n11',
};

export const crisisMgmtTopicMap = {
  1: '104',
  2: '105',
  3: '106',
  4: '107',
  5: '103',
  6: '108',
  7: '109',
  8: '110',
  9: '111',
  10: '102',
  11: '112',
  12: '101',
  13: '113',
  14: '124',
};

export const activeOrderLabels = {
  [GETIR_10_DOMAIN_TYPE]: { tr: 'Aktif G10 Siparişi', en: 'Active G10 Order' },
  [GETIR_MARKET_DOMAIN_TYPE]: { tr: 'Aktif GetirBüyük Siparişi', en: 'Active GetirMore Order' },
  [GETIR_VOYAGER_DOMAIN_TYPE]: { tr: 'Aktif GetirSu Siparişi', en: 'Active GetirWater Order' },
  [GETIR_FINANCE_DOMAIN_TYPE]: { tr: 'Aktif GetirFinans Siparişi', en: 'Active GetirFinance Order' },
  [GETIR_GORILLAS_DOMAIN_TYPE]: { tr: 'Aktif Gorillas Siparişi', en: 'Active Gorillas Order' },
};

export const USER_PERMISSION_GROUP_OPTIONS = [
  { label: { tr: 'Bayi Sahibi', en: 'Franchise Owner' }, value: 1 },
  { label: { tr: 'Normal Kullanıcı', en: 'Basic User' }, value: 2 },
];

export const contentUploadBuckets = {
  GETIR: 'getir',
  INTERNAL: 'internal',
};

export const PLANOGRAM_STORAGE_TYPES = [
  { _id: 'Frozen (-18C and lower)', name: { en: 'Frozen (-18C and lower)', tr: 'Donuk (-18C ve daha düşük)' }, productStorageId: '-18' },
  { _id: 'Chilled (0/+4C)', name: { en: 'Chilled (0/+4C)', tr: 'Soğuk Zincir (0/+4C)' }, productStorageId: '+4' },
  { _id: 'Meat & Chicken & Fish (0/+2C)', name: { en: 'Meat & Chicken & Fish (0/+2C)', tr: 'Et & Tavuk & Balık (0/+2C)' }, productStorageId: '+2' },
  { _id: 'Ambient', name: { en: 'Ambient', tr: 'Oda Koşulları' }, productStorageId: 'ambient' },
  { _id: 'Lockdown', name: { en: 'Lockdown', tr: 'Değerli Ürün' }, productStorageId: 'lockdown' },
  { _id: 'Fruit & Vegetable (+8/+12C)', name: { en: 'Fruit & Vegetable (+8/+12C)', tr: 'Meyve & Sebze (+8/+12C)' }, productStorageId: '+18max' },
  { _id: 'Deliquescent', name: { en: 'Deliquescent', tr: 'Erime Riski' }, productStorageId: '+8-12' },
];

export const PLANOGRAM_PRODUCT_DOMAIN_TYPES = [
  { _id: 'G10', name: { en: 'G10', tr: 'G10' }, key: 1 },
  { _id: 'G30', name: { en: 'G30', tr: 'G30' }, key: 3 },
  { _id: 'G40', name: { en: 'GetirWater', tr: 'GetirSu' }, key: 4 },
];

export const financeOrderStatuses = {
  300: { tr: 'Oluşturuldu', en: 'Browsing' },
  350: { tr: 'Rezerve', en: 'Reserved' },
  375: { tr: 'Toplayıcı Bekliyor', en: 'Waiting For Picker' },
  400: { tr: 'Onay bekleniyor', en: 'Verifying' },
  500: { tr: 'Hazırlanıyor', en: 'Preparing' },
  550: { tr: 'Hazırlandı', en: 'Prepared' },
  600: { tr: 'Kurye onayı bekleniyor', en: 'Handover' },
  650: { tr: 'Aktarımda', en: 'In transfer' },
  700: { tr: 'Müşteriye gidiyor', en: 'Onway' },
  775: { tr: 'Tekrarda', en: 'Repeated' },
  750: { tr: 'Beklemede', en: 'On Hold' },
  800: { tr: 'Adrese ulaştı', en: 'Reached' },
  900: { tr: 'Teslim Edildi', en: 'Delivered' },
  1000: { tr: 'İptal edildi', en: 'Canceled' },
  1100: { tr: 'Kurye iptal etti', en: 'Canceled by courier' },
  1200: { tr: 'Müşteri iptal etti', en: 'Canceled by client' },
  1300: { tr: 'Personel iptal etti', en: 'Canceled by staff' },
  1400: { tr: 'Sistem iptal etti', en: 'Canceled by system' },
  1500: { tr: 'Admin iptal etti', en: 'Canceled by admin' },
};

export const getirFinanceOrderCancelList = [1000, 1100, 1200, 1300, 1400, 1500];
export const getirFinanceOrderNotActiveList = [...getirFinanceOrderCancelList, 900];

export const deliveryFeeSourceMap = {
  LayeredDeliveryFee: { en: 'Layered Delivery Fee', tr: 'Katmanlı Teslimat Ücreti' },
  DynamicDeliveryFee: { en: 'Dynamic Delivery Fee', tr: 'Dinamik Teslimat Ücreti' },
  FixedDeliveryFee: { en: 'Fixed Delivery Fee', tr: 'Sabit Teslimat Ücreti' },
  ZoneBasedFixedDeliveryFee: { en: 'Zone Based Fixed Delivery Fee', tr: 'Bölge Bazında Sabit Teslimat Ücreti' },
  ZoneBasedLayeredDeliveryFee: { en: 'Zone Based Layered Delivery Fee', tr: 'Bölge Bazında Katmanlı Teslimat Ücreti' },
};

export const serviceFeeSourceMap = {
  LayeredServiceFee: { en: 'Layered Service Fee', tr: 'Katmanlı Hizmet Ücreti' },
  DynamicServiceFee: { en: 'Dynamic Service Fee', tr: 'Dinamik Hizmet Ücreti' },
  FixedServiceFee: { en: 'Fixed Service Fee', tr: 'Sabit Hizmet Ücreti' },
};

export const SAP_REFERENCE_CODE_ENABLED_COUNTRY_CODES = ['TR'];

export const marketBasketStatuses = {
  100: { tr: 'Tamamlanmadı', en: 'Incomplete' },
  200: { tr: 'Durduruldu', en: 'Aborted' },
  300: { tr: 'Gözatılıyor', en: 'Browsing' },
  325: { tr: 'Tamamlandı', en: 'Completed' },
};

export const marketBasketDomainTypes = {
  1: { en: 'Getir10', tr: 'Getir10' },
  3: { en: 'GetirMore', tr: 'GetirBüyük' },
};

export const newCourierTypes = {
  [NEW_COURIER_TYPE.MOTO]: {
    en: 'Motor',
    tr: 'Motor',
  },
  [NEW_COURIER_TYPE.ON_FOOT]: {
    en: 'Onfoot',
    tr: 'Yaya',
  },
  [NEW_COURIER_TYPE.BIKE]: {
    en: 'Bicycle',
    tr: 'Bisiklet',
  },
  [NEW_COURIER_TYPE.VAN]: {
    en: 'Van',
    tr: 'Doblo',
  },
  [NEW_COURIER_TYPE.CAR]: {
    en: 'Car',
    tr: 'Araç',
  },
  [NEW_COURIER_TYPE.MITU]: {
    en: 'Mitu',
    tr: 'Mitu',
  },
  [NEW_COURIER_TYPE.VOYAGER]: {
    en: 'Voyager',
    tr: 'Su kuryesi',
  },
  [NEW_COURIER_TYPE.MDU]: {
    en: 'MDU',
    tr: 'MDU',
  },
  [NEW_COURIER_TYPE.RDU]: {
    en: 'RDU',
    tr: 'RDU',
  },
  [NEW_COURIER_TYPE.TMS]: {
    en: 'TMS',
    tr: 'TMS',
  },
};

export const deliveryThirdPartyProviders = {
  [DELIVERY_THIRD_PARTY_PROVIDER_TYPES.STUART]: {
    en: 'Stuart',
    tr: 'Stuart',
  },
};

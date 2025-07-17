import { getFormattedSelectOptions } from './utils';

export const featuresMap = {
  guidance: { en: 'Agent Guidance', tr: 'Müşteri Rehberlik' },
  assistance: { en: 'Agent Assistance', tr: 'Müşteri Yardım' },
};
export const typesMap = {
  knowledge: { en: 'Knowledge', tr: 'Bilgi' },
  llm2: { en: 'LLM', tr: 'LLM' },
};

export const features = getFormattedSelectOptions(featuresMap);

export const agentTypes = getFormattedSelectOptions(typesMap);

export const domainTypes = getFormattedSelectOptions({
  1: { en: 'Getir10', tr: 'Getir10' },
  2: { en: 'GetirFood', tr: 'GetirYemek' },
  3: { en: 'GetirMore', tr: 'GetirBüyük' },
  4: { en: 'GetirWater', tr: 'GetirSu' },
  6: { en: 'GetirLocals', tr: 'GetirÇarşı' },
  8: { en: 'GetirWater Marketplace', tr: 'GetirSuPazaryeri' },
});

export const contacts = getFormattedSelectOptions({
  customer: { en: 'Customer', tr: 'Müşteri' },
  courier: { en: 'Courier', tr: 'Kurye' },
  warehouse: { en: 'Warehouse', tr: 'Depo' },
  restaurant: { en: 'Restaurant', tr: 'Restoran' },
  merchant: { en: 'Merchant', tr: 'İşletme Sahibi' },
});

export const channels = getFormattedSelectOptions({
  call: { en: 'Call', tr: 'Telefon' },
  chat: { en: 'Chat', tr: 'mesaj' },
  email: { en: 'Email', tr: 'e-posta' },
  social_media: { en: 'Social Media', tr: 'sosyal medya' },
});

export const levels = getFormattedSelectOptions({
  1: { en: 'L1', tr: 'L1' },
  2: { en: 'L2', tr: 'L2' },
  3: { en: 'L3', tr: 'L3' },
});

export const segments = getFormattedSelectOptions({
  'A-B': { en: 'A-B', tr: 'A-B' },
  C: { en: 'C', tr: 'C' },
  'D-E': { en: 'D-E', tr: 'D-E' },
  None: { en: 'None', tr: 'None' },
});

export const mainReasons = [
  {
    title: {
      en: 'Order Cancellation',
      tr: 'Sipariş İptali',
    },
    subReasons: [
      {
        title: {
          en: 'Accidentally Ordered',
          tr: 'Yanlışlıkla Sipariş Verdi',
        },
        segments: ['None'],
      },
      {
        title: {
          en: "Can't Wait the Order Anymore",
          tr: 'Artık Siparişi Bekleyemiyor',
        },
        segments: ['None'],
      },
      {
        title: {
          en: 'Forgot to Apply Promo',
          tr: 'Promosyon Uygulamayı Unuttum',
        },
        segments: ['None'],
      },
    ],
  },
  {
    title: {
      en: 'Info & Requests',
      tr: 'Bilgi ve İstekler',
    },
    subReasons: [
      {
        title: {
          en: 'Idea/suggestion',
          tr: 'Fikir/Öneri',
        },
        segments: [],
      },
      {
        title: {
          en: 'Invoice Request',
          tr: 'Fatura Talebi',
        },
        segments: [],
      },
    ],
  },
  {
    title: {
      en: 'Application Issue',
      tr: 'Uygulama',
    },
    subReasons: [
      {
        title: {
          en: 'Application Issue',
          tr: 'Uygulama',
        },
        segments: ['None'],
      },
      {
        title: {
          en: 'Cannot Log in',
          tr: "Getir App'ine Sistemine Giriş Yapılamaması",
        },
        segments: ['None'],
      },
    ],
  },
  {
    title: {
      en: 'Order Status',
      tr: 'Sipariş İptali',
    },
    subReasons: [
      {
        title: {
          en: 'Information About Canceled Order',
          tr: 'İptal Edilen Sipariş Hakkında Bilgi',
        },
        segments: ['None'],
      },
      {
        title: {
          en: 'Inside ETA / Outside ETA',
          tr: 'Sipariş Durumu TVS İçinde + Sipariş Durumu',
        },
        segments: ['None'],
      },
    ],
  },
  {
    title: {
      en: 'Account',
      tr: 'Hesap',
    },
    subReasons: [
      {
        title: {
          en: 'Phone Number Change',
          tr: 'Telefon Numarası Değişikliği',
        },
        segments: ['None'],
      },
      {
        title: {
          en: 'Account Activation',
          tr: 'Hesap Aktivasyonu',
        },
        segments: ['None'],
      },
      {
        title: {
          en: 'GDPR Deletion',
          tr: 'KVKK Sildirme',
        },
        segments: ['None'],
      },
    ],
  },
  {
    title: {
      en: 'Product Issue',
      tr: 'Ürün Şikayetleri',
    },
    subReasons: [
      {
        title: {
          en: 'More Product than Bought',
          tr: 'Satın Alınandan Fazla Ürün',
        },
        segments: ['None'],
      },
      {
        title: {
          en: 'Broken Product (Technology)',
          tr: 'Bozuk Ürün (Teknoloji)',
        },
        segments: ['None'],
      },
      {
        title: {
          en: 'Foreign object inside the product',
          tr: 'Üründen Yabancı Cisim Çıkması',
        },
        segments: ['None'],
      },
      {
        title: {
          en: 'Uncooked Product',
          tr: 'Pişmemiş Ürün',
        },
        segments: ['None'],
      },
      {
        title: {
          en: 'Burnt/Overheated Product',
          tr: 'Yanmış - Çok Pişmiş Ürün',
        },
        segments: ['None'],
      },
      {
        title: {
          en: 'Missing Product',
          tr: 'Eksik Ürün',
        },
        segments: ['A-B', 'C', 'D-E'],
      },
      {
        title: {
          en: 'Old/Rotten Product',
          tr: 'Bozuk Ürün (Gıda)',
        },
        segments: ['None'],
      },
      {
        title: {
          en: 'Wrong Product',
          tr: 'Yanlış & Hatalı Ürün Gönderimi',
        },
        segments: ['None'],
      },
      {
        title: {
          en: 'Damaged Product',
          tr: 'Hasarlı - Kırık Ürün',
        },
        segments: ['None'],
      },
      {
        title: {
          en: 'Best Before Date Passed',
          tr: 'Son Kullanma Tarihi Geçmiş',
        },
        segments: ['None'],
      },
      {
        title: {
          en: 'Melted Product',
          tr: 'Erimiş Ürün',
        },
        segments: ['None'],
      },
      {
        title: {
          en: 'Missing Weight',
          tr: 'Eksik Gramaj',
        },
        segments: ['None'],
      },
      {
        title: {
          en: 'Warm/Cold Product',
          tr: 'Siparişin Sıcak - Soğuk Gelmemesi',
        },
        segments: ['None'],
      },
    ],
  },
  {
    title: {
      en: 'Promotion',
      tr: 'Promosyon',
    },
    subReasons: [
      {
        title: {
          en: 'Promotion/Campaign Suggestion',
          tr: 'Promosyon/Kampanya Önerisi',
        },
        segments: ['None'],
      },
      {
        title: {
          en: "Promotion can't be seen/used",
          tr: 'Promosyon Gözükmüyor/Kullanılamıyor',
        },
        segments: ['None'],
      },
    ],
  },
  {
    title: {
      en: 'Courier',
      tr: 'Kurye',
    },
    subReasons: [
      {
        title: {
          en: 'Additional Info for Delivery',
          tr: 'Teslimat için Ek Bilgi',
        },
        segments: ['None'],
      },
      {
        title: {
          en: 'Attitude',
          tr: 'Tavır – Tarz',
        },
        segments: ['None'],
      },
      {
        title: {
          en: 'Different than Shown',
          tr: 'Resimdekinden Farklı',
        },
        segments: ['None'],
      },
      {
        title: {
          en: 'Undelivered Order Shown as Delivered',
          tr: 'Siparişin Sıcak - Soğuk Gelmemesi',
        },
        segments: ['None'],
      },
    ],
  },
  {
    title: {
      en: 'Unintentional Activity',
      tr: 'İstenmeyen Yapılan Aktivite',
    },
    subReasons: [
      {
        title: {
          en: 'Customer Did not Give the Order',
          tr: 'Müşteri Siparişi Vermedi',
        },
        segments: ['None'],
      },
      {
        title: {
          en: 'Unintentional Order/Rider Rating',
          tr: 'Yanlış Sipariş/Kurye Değerlendirmesi',
        },
        segments: ['None'],
      },
    ],
  },
  {
    title: {
      en: 'Payments',
      tr: 'Ödeme',
    },
    subReasons: [
      {
        title: {
          en: 'Payment Failed',
          tr: 'Başarısız Ödeme & Ödeme Hatası',
        },
        segments: ['None'],
      },
      {
        title: {
          en: 'Incomplete Refund Amount',
          tr: 'İade Hesaba Geçmedi',
        },
        segments: ['None'],
      },
      {
        title: {
          en: 'Tipping Issue',
          tr: 'Bahşiş Problemi',
        },
        segments: ['None'],
      },
    ],
  },
  {
    title: {
      en: 'Order Action',
      tr: 'Sipariş Aksiyonu',
    },
    subReasons: [
      {
        title: {
          en: 'Add/Remove Items',
          tr: 'Ürün Ekle / Kaldır',
        },
        segments: ['None'],
      },
      {
        title: {
          en: 'Add Note',
          tr: 'Not Ekleme',
        },
        segments: ['None'],
      },
      {
        title: {
          en: 'Address Change',
          tr: 'Adres Değiştirme',
        },
        segments: ['None'],
      },
    ],
  },
];

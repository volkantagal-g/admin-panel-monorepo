export const SUCCESS_RESPONSE = { success: true };
const FAILURE_RESPONSE = {
  code: 32543,
  error: 'MicroserviceError',
  message: 'something went wrong',
  statusCode: 400,
};

export const mockedCancelSuccess = SUCCESS_RESPONSE;
export const mockedPartialRefundSuccess = SUCCESS_RESPONSE;

export const mockedCancelError = FAILURE_RESPONSE;
export const mockedPartialRefundError = FAILURE_RESPONSE;

export const mockedCancelOptions = {
  reasons: [
    {
      id: '5d23406deb1197f1264a995d',
      title: {
        tr: 'Yanlış adres seçilmiş',
        en: 'Yanlış adres seçilmiş',
      },
      messages: {
        tr: 'Yanlış adres seçildiği için siparişin iptal edildi :( Kartına iadesi yapıldı.',
        en: "Order is canceled because of wrong delivery address :( We've refunded your card.",
      },
      validStatus: [
        350,
        375,
        400,
        500,
        600,
        700,
        800,
        550,
      ],
      domainId: 4,
      domainTypes: [
        1,
        3,
        4,
      ],
    },
    {
      id: '5d2a145dc015a02141e17ac0',
      title: {
        tr: 'Yanlış adres seçilmiş',
        en: 'Wrong address selected',
      },
      messages: {
        tr: 'Yanlış adres seçildiği için siparişin iptal edildi :( Kartına iadesi yapıldı.',
        en: "Order is canceled because of wrong delivery address :( We've refunded your card.",
      },
      validStatus: [
        375,
        400,
        500,
        550,
        600,
        700,
        800,
      ],
      domainId: 4,
      domainTypes: [
        1,
        3,
        4,
      ],
    },
    {
      id: '5d2a1498c015a02141e17ac1',
      title: {
        tr: 'Ürün ekleyip tekrar sipariş verecek',
        en: 'Add product and order again',
      },
      messages: {
        tr: 'Siparişini iptal ettin :( Kartına iadesi yapıldı.',
        en: "You canceled your order :( We've refunded your card.",
      },
      validStatus: [
        375,
        400,
        500,
        550,
        600,
        700,
        800,
      ],
      domainId: 4,
      domainTypes: [
        1,
        3,
        4,
      ],
    },
    {
      id: '5d2a14aac015a02141e17ac2',
      title: {
        tr: 'Kampanya seçip sipariş verecek',
        en: 'Select promo and order again',
      },
      messages: {
        tr: 'Siparişini iptal ettin :( Kartına iadesi yapıldı.',
        en: "You canceled your order :( We've refunded your card.",
      },
      validStatus: [
        375,
        400,
        500,
        550,
        600,
        700,
        800,
      ],
      domainId: 4,
      domainTypes: [
        1,
        3,
        4,
      ],
    },
    {
      id: '5d2a14bbc015a02141e17ac3',
      title: {
        tr: 'Kampanya kötüye kullanım',
        en: 'Promo abuse',
      },
      messages: {
        tr: 'Kuryemiz maalesef sana ulaşamadı. Kartına iadesi yapıldı.',
        en: "Our courier couldn't reach you :( We've refunded your card.",
      },
      validStatus: [
        375,
        400,
        500,
        550,
        600,
        700,
        800,
      ],
      domainId: 4,
      domainTypes: [
        1,
        3,
        4,
      ],
    },
    {
      id: '5d2a14c9c015a02141e17ac4',
      title: {
        tr: 'Hava muhalefeti',
        en: 'Weather opposition',
      },
      messages: {
        tr: 'Hava ve yol koşullarından dolayı malesef siparişini şu an teslim edemiyoruz :( Kartına iadesi yapıldı.',
        en: "Due to severe weather conditions, we unfortunately cannot deliver your order right now :( We've refunded your card.",
      },
      validStatus: [
        375,
        400,
        500,
        550,
        600,
        700,
        800,
      ],
      domainId: 4,
      domainTypes: [
        1,
        3,
        4,
      ],
    },
    {
      id: '5d2a14d8c015a02141e17ac5',
      title: {
        tr: 'Adres - pin uyuşmazlığı',
        en: 'Address - pin mismatch',
      },
      messages: {
        tr: 'Haritada işaretlediğin nokta ile adres uyuşmuyor. Lütfen adresini kontrol et. Kartına iadesi yapıldı.',
        en: "The delivery location on the map and the address you enter don't match. Please check your address. We've refunded your card.",
      },
      validStatus: [
        375,
        400,
        500,
        550,
        600,
        700,
        800,
      ],
      domainId: 4,
      domainTypes: [
        1,
        3,
        4,
      ],
    },
    {
      id: '5d2a14e9c015a02141e17ac6',
      title: {
        tr: 'Kurye müşteriye ulaşamadı',
        en: "Courier couldn't reach client",
      },
      messages: {
        tr: 'Kuryemiz maalesef sana ulaşamadı. Kartına iadesi yapıldı.',
        en: "Our courier couldn't reach you :( We've refunded your card.",
      },
      validStatus: [
        375,
        400,
        500,
        550,
        600,
        700,
        800,
      ],
      domainId: 4,
      domainTypes: [
        1,
        3,
      ],
    },
    {
      id: '5d2a1504c015a02141e17ac8',
      title: {
        tr: 'Depo çalışmıyor',
        en: 'Warehouse not working',
      },
      messages: {
        tr: 'Depomuzun çalışma saati sona erdi. Kartına iadesi yapıldı.',
        en: "Our depots are currently offline. We've refunded your card.",
      },
      validStatus: [
        375,
        400,
        500,
        550,
        600,
        700,
        800,
      ],
      domainId: 4,
      domainTypes: [
        1,
        3,
        4,
      ],
    },
    {
      id: '5d2a150ec015a02141e17ac9',
      title: {
        tr: 'Ürün stokta yok',
        en: 'Product not in stock',
      },
      messages: {
        tr: 'Seçtiğin ürünler şu anda bulunmuyor. Kartına iadesi yapıldı.',
        en: "Items selected are currently unavailable. We've refunded your card.",
      },
      validStatus: [
        375,
        400,
        500,
        550,
        600,
        700,
        800,
      ],
      domainId: 4,
      domainTypes: [
        1,
        3,
        4,
      ],
    },
    {
      id: '606ee9c16ebf4e9ffdfa16d5',
      title: {
        tr: 'Eksik sipariş teslimi',
        en: 'Missing product',
      },
      messages: {
        tr: 'Eksik ürün olduğu için siparişiniz iptal edilmiştir. Sipariş tutarının iadesi gerçekleştirilmiştir.',
        en: 'Your order has been canceled due to a missing product in your order. The order amount has been refunded.',
      },
      validStatus: [
        375,
        400,
        500,
        550,
        600,
        700,
        800,
      ],
      domainId: 4,
      domainTypes: [
        1,
        3,
        4,
      ],
    },
    {
      id: '62188d6c2e1728182edb6dca',
      title: {
        tr: "Chatbot'tan sebep gelmedi.",
        en: 'No reason - Chatbot.',
      },
      messages: {
        tr: "Chatbot'tan sebep gelmedi.",
        en: 'No reason - Chatbot.',
      },
      validStatus: [
        375,
        400,
        500,
        550,
        600,
        700,
      ],
      domainId: 4,
      domainTypes: [
        1,
        3,
        4,
      ],
    },
  ],
};

export const mockedWholeRefundReasonsError = FAILURE_RESPONSE;
export const mockedWholeRefundReasonsSuccess = {
  reasons: [
    { tr: 'Eksik Ürün', en: 'Missing Product', key: 3 },
    { tr: 'Hasarlı Ürün', en: 'Damaged Product', key: 4 },
    { tr: 'Yanlış Ürün', en: 'Wrong Product', key: 6 },
    { tr: 'SKT Geçti', en: 'Best Before Date Passed', key: 9 },
    { tr: 'SKT Kapat', en: 'Best Before Date Close', key: 15 },
    { tr: 'Bozuk / Çürük Ürün', en: 'Old / Rotten Product', key: 10 },
    { tr: 'Eski Basımlı Yayın', en: 'Outdated Magazine / Newspaper', key: 11 },
    { tr: 'Erimiş Ürün', en: 'Melted Product', key: 12 },
    { tr: 'Ilık Ürün', en: 'Warm Product', key: 13 },
    { tr: 'Görünenden Farklı Ürün', en: 'Different Looking Product', key: 14 },
  ],
};

export const mockedWholeRefundError = FAILURE_RESPONSE;
export const mockedWholeRefundSuccess = {
  status: 100,
  _id: '62d53c6ccee664416b868dfc',
  warehouse: '6215e04a1cb7977afa9a33f6',
  order: '12b98a12345e44c15fc1234a',
  products: [
    {
      _id: '62d53c6ccee6644c94868dfd',
      initialRefundCount: 0,
      orderCount: 1,
      product: '559831b7b1dc700c006a71a8',
    },
  ],
  updatedAt: '2022-07-18T10:56:44.641Z',
  createdAt: '2022-07-18T10:56:44.641Z',
  __v: 0,
};

export const mockedPersonalPromoSuccess = {
  client: 'Client name',
  code: '_ACBIO15B',
  title: {
    tr: 'Size özel ₺10 indirim!',
    en: '₺10 discount for you!',
  },
  description: {
    tr: 'Size özel ₺10 indirim!',
    en: '₺10 discount for you!',
  },
  validFrom: '2022-12-03T00:59:59.999Z',
  validUntil: '2022-12-24T21:00:00.000Z',
  status: 1,
  type: 1,
  amount: 10,
  priority: 1000000,
};

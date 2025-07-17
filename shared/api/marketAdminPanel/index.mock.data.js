export const mockedMarketBasket = {
  id: '65aa77626180027dfb039f08',
  version: 3,
  createdAt: '2024-01-19T13:21:38.504Z',
  updatedAt: '2024-01-20T13:24:06.512Z',
  domainType: 3,
  client: {
    id: '6589695eb12d6c7a02a5b401',
    name: 'SERDAR TEST',
    gsm: '+31655555551',
  },
  status: 100,
  address: {
    id: '658d6e90e372efb37bf2e350',
    name: 'Home',
    text: 'Cebrail, Cumhuriyet Caddesi, Street No: 10, Kastamonu Merkez, Kastamonu, Türkiye ',
    doorNo: '',
    aptNo: '10',
    floor: '',
    city: '',
    country: 'Türkiye',
    cityId: '5fd60fe00000010006500000',
    countryId: '55999ad00000010000000000',
    countryCodeAlpha2: 'TR',
  },
  warehouse: {
    id: '5ece308d92db6ed2b174e950',
    name: "Sacide'nin Deposu",
    type: 2,
  },
  products: [
    {
      id: '5ce65820fd9b330001c4a933',
      quantity: 1,
      price: 29.95,
      priceText: '₺29.95',
      struckPrice: 41.45,
      struckPriceText: '₺41.45',
      totalPrice: 29.95,
      totalPriceText: '₺29.95',
      picUrls: {
        de: 'https://market-product-images-cdn.marketdev.getirapi.com/product/509b6389-b82a-4dda-a555-8916f16b7c7c.jpg',
        en: 'https://market-product-images-cdn.marketdev.getirapi.com/product/509b6389-b82a-4dda-a555-8916f16b7c7c.jpg',
        'en-US':
          'https://market-product-images-cdn.marketdev.getirapi.com/product/509b6389-b82a-4dda-a555-8916f16b7c7c.jpg',
        es: 'https://market-product-images-cdn.marketdev.getirapi.com/product/509b6389-b82a-4dda-a555-8916f16b7c7c.jpg',
        fr: 'https://market-product-images-cdn.marketdev.getirapi.com/product/509b6389-b82a-4dda-a555-8916f16b7c7c.jpg',
        it: 'https://market-product-images-cdn.marketdev.getirapi.com/product/509b6389-b82a-4dda-a555-8916f16b7c7c.jpg',
        nl: 'https://market-product-images-cdn.marketdev.getirapi.com/product/509b6389-b82a-4dda-a555-8916f16b7c7c.jpg',
        pt: 'https://market-product-images-cdn.marketdev.getirapi.com/product/509b6389-b82a-4dda-a555-8916f16b7c7c.jpg',
        tr: 'https://market-product-images-cdn.marketdev.getirapi.com/product/509b6389-b82a-4dda-a555-8916f16b7c7c.jpg',
      },
      names: {
        en: 'Alpro Almond Drink',
        tr: 'Alpro Badem İçeceği',
      },
    },
  ],
  device: {
    id: 'f3b695f5-7cf8-4e4c-b688-aa4de257286c',
    type: 'Android',
  },
  actions: [
    {
      type: 'BasketCreated',
      timestamp: '2024-01-19T13:21:38.504Z',
      data: {
        addressId: '658d6e90e372efb37bf2e350',
        warehouseId: '5ece308d92db6ed2b174e950',
      },
      version: 1,
    },
    {
      type: 'ProductsAdded',
      timestamp: '2024-01-19T13:21:39.034Z',
      data: {
        products: [
          {
            id: '5ce65820fd9b330001c4a933',
            amount: 1,
            names: {
              en: 'Alpro Almond Drink',
              tr: 'Alpro Badem İçeceği',
            },
          },
        ],
      },
      version: 2,
    },
    {
      type: 'BasketExpired',
      timestamp: '2024-01-20T13:24:06.512Z',
      version: 3,
    },
  ],
  totalPrice: 29.95,
  totalPriceText: '₺29.95',
};

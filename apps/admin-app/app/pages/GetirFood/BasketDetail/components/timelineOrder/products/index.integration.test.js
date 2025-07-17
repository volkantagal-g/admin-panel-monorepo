import { get } from 'lodash';
import { render, screen } from '@testing-library/react';

import { getProductTextWithCount } from './util';
import Component from '.';

const products = [
  {
    product: '61829774baddfd815b4beb2c',
    count: 1,
    imageURL: '',
    wideImageURL: '',
    price: 12,
    struckPrice: 0,
    optionPrice: 0,
    priceWithOption: 12,
    totalPrice: 12,
    totalStruckPrice: 0,
    totalOptionPrice: 0,
    totalPriceWithOption: 12,
    name: {
      tr: 'Cips',
      en: 'Cips',
    },
    optionCategories: [],
    calculatedPreparationTime: 15,
    _id: '634036426a442bc46b842c05',
  },
  {
    product: '617fe6c40e75506c2b4632ef',
    count: 2,
    imageURL: '',
    wideImageURL: '',
    price: 12,
    struckPrice: 0,
    optionPrice: 0,
    priceWithOption: 12,
    totalPrice: 24,
    totalStruckPrice: 0,
    totalOptionPrice: 0,
    totalPriceWithOption: 24,
    name: {
      tr: 'Sarmaasdda',
      en: 'Sarma',
    },
    optionCategories: [],
    note: 'Sarmaasdda',
    calculatedPreparationTime: 15,
    _id: '634036456a442bc46b842c0e',
  },
  {
    product: '5dcd5a2d33a8c749971248e5',
    count: 1,
    imageURL: 'https://food-cdn.develop.getirapi.com/products/1574757267829_500x375.png',
    wideImageURL: 'https://food-cdn.develop.getirapi.com/products/1574757267829_1000x750.png',
    cuisine: '5f310db914446d3ab2297eb1',
    price: 40.99,
    struckPrice: 0,
    optionPrice: 5,
    priceWithOption: 45.99,
    totalPrice: 40.99,
    totalStruckPrice: 0,
    totalOptionPrice: 5,
    totalPriceWithOption: 45.99,
    note: 'Sarmaasdda',
    name: {
      tr: "2'li Makarna Menü",
      en: "2'li Makarna Menü",
    },
    optionCategories: [
      {
        name: {
          tr: '1. Makarna Tercihi',
          en: '1. Makarna Tercihi',
        },
        optionCategory: '5eac4d18e4aa871919209efb',
        options: [
          {
            option: '5eac4d18e4aa87e2cd209efc',
            name: {
              tr: 'Penne Alfredo',
              en: 'Penne Alfredo',
            },
            price: 0,
            optionCategories: [],
          },
        ],
      },
      {
        name: {
          tr: '2. Makarna Tercihi',
          en: '2. Makarna Tercihi',
        },
        optionCategory: '5eac4d18e4aa8754ce209f01',
        options: [
          {
            option: '5eac4d18e4aa87db42209f03',
            name: {
              tr: 'Penne Arrabbiata',
              en: 'Penne Arrabbiata',
            },
            price: 0,
            optionCategories: [],
          },
        ],
      },
      {
        name: {
          tr: 'İçecek Tercihi',
          en: 'İçecek Tercihi',
        },
        optionCategory: '5eac4d18e4aa8701ae209f0b',
        options: [
          {
            option: '5eac4d18e4aa879145209f11',
            product: '5dcd5a2b33a8c74f071248db',
            name: {
              tr: 'Cappy (330 ml)',
              en: 'Cappy (330 ml)',
            },
            price: 0,
            optionCategories: [
              {
                name: {
                  tr: 'Cappy Tercihi',
                  en: 'Cappy Tercihi',
                },
                optionCategory: '5eac4d19e4aa874aa120a177',
                options: [
                  {
                    option: '5eac4d19e4aa877fe520a179',
                    name: {
                      tr: 'Şeftali',
                      en: 'Şeftali',
                    },
                    price: 0,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: {
          tr: 'Yan Lezzet Tercihi',
          en: 'Yan Lezzet Tercihi',
        },
        optionCategory: '5eac4d18e4aa87d9ea209f07',
        options: [
          {
            option: '5eac4d18e4aa87e0ac209f0a',
            product: '5dcd5a25e0450518e6701623',
            name: {
              tr: 'Soğan Halkası',
              en: 'Soğan Halkası',
            },
            price: 1,
            optionCategories: [
              {
                name: {
                  tr: 'Adet Tercihi',
                  en: 'Adet Tercihi',
                },
                optionCategory: '5f776138b238a1d927891ac3',
                options: [
                  {
                    option: '5f776138b238a160a8891ac6',
                    name: {
                      tr: '10 Adet',
                      en: '10 Adet',
                    },
                    price: 4,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    calculatedPreparationTime: 15,
    _id: '63403e946a442bc46b843008',
  },
];

describe('timelineOrder products', () => {
  it('should render successfully', async () => {
    const { container } = await render(<Component />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should show when provide a product', async () => {
    await render(<Component basketProduct={products[0]} productNote="Note" />);
    expect(screen.getByText(getProductTextWithCount(products[0]))).toBeInTheDocument();
    expect(screen.queryByText('Note')).not.toBeInTheDocument();
  });

  it('should show product has a note', async () => {
    await render(<Component basketProduct={products[1]} productNote="Note" />);
    expect(screen.getByText(getProductTextWithCount(products[1]))).toBeInTheDocument();
    expect(screen.getByText(`Note ${products[1].note}`)).toBeInTheDocument();
  });

  it('should show optionCategories when provided', async () => {
    await render(<Component basketProduct={products[2]} productNote="Note" />);
    expect(screen.getByText(`Note ${products[2].note}`)).toBeInTheDocument();
    products[2].optionCategories.forEach(option => {
      expect(screen.getByText(get(option, ['name', 'en']))).toBeInTheDocument();
    });
  });
});

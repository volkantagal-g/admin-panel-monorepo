export const mockedBagConstraints = [
  {
    description: { tr: 'Gıda ürünleri grubu', en: 'Food products group' },
    left: {
      items: ['6156af7a9883dce26caa1ebf', '6156af7a9883dce26caa1ebd'],
      type: 1,
    },
    right: {
      items: ['6156af7a9883dce26caa1ebf', '6156af7a9883dce26caa1ebd'],
      type: 1,
    },
    match: true,
    isActive: true,
  },
];
export const mockedMasterCategories = [
  {
    country: '55999ad00000010000000000',
    countryCode: 'TR',
    level: 10,
    name: { tr: 'TAZE GIDA', en: 'TAZE GIDA' },
    status: 1,
    _id: '6156af7a9883dce26caa1ebd',
  },
];

export const mockedBagConstraintDetail = {
  _id: '5c2a0ff9fc22cf7c41cba28f',
  left: {
    items: [
      '6156af7a9883dce26caa1ebf',
      '6156af7a9883dce26caa1ebd',
      '618bb6402118852efc9f57f3',
    ],
    type: 1,
  },
  right: {
    items: ['63401e96c7f6790fb45e84eb', '634025afd7ec4eb8431ef836'],
    type: 1,
  },
  description: { tr: 'Gıda ürünleri grubu', en: 'Food products groups' },
  match: true,
  isActive: false,
  firstGroup: [
    { id: '6156af7a9883dce26caa1ebf', name: 'GIDA DIŞI' },
    { id: '6156af7a9883dce26caa1ebd', name: 'zort' },
    { id: '618bb6402118852efc9f57f3', name: 'warehousetest' },
  ],
  secondGroup: [
    { id: '63401e96c7f6790fb45e84eb', name: '63401e96c7f6790fb45e84eb' },
    { id: '634025afd7ec4eb8431ef836', name: '634025afd7ec4eb8431ef836' },
  ],
};

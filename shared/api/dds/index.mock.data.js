export const mockedObjectionDetail = {
  _id: '619ade7c234aaf14637592fe',
  criteria: {
    id: '5e97864fc3b33210444bb74a',
    name: {
      en: 'Waybills',
      tr: 'İrsaliye',
    },
  },
  recordDate: '2021-11-21T11:36:10.616Z',
  franchise: {
    id: '5e0d8a1df0f1d572ab399aaa',
    name: 'Getir',
  },
  warehouse: {
    id: '610293f704f709c293eb0946',
    name: 'Samandıra',
  },
  status: 200,
  data: {
    transfer: {
      id: '619451e910471cf7da501802',
      receivingStartDate: '2021-11-18T11:56:08.086Z',
      receivingEndDate: '2021-11-21T11:36:10.616Z',
      transferShippingDate: '2021-11-18T11:56:08.086Z',
      picker: {
        id: null,
        name: '',
      },
      palletId: '123321',
    },
    threshold: 48,
  },
  objection: {
    description: 'Gelen transferin aynı gün girişi yapılmıştır. Gecikme maltepe depodan kaynaklıdır.',
    user: '5e8b1aba2f244a0006c34527',
    createdAt: '2021-11-22T11:56:19.488Z',
  },
  conclusion: {
    user: '611b50d1fa097cd25dfa8fa0',
    createdAt: '2021-11-22T12:08:54.173Z',
  },
  ddsObjectionId: '619ade7c234aaf14637592fe',
  createdAt: '2022-10-09T10:48:35.542Z',
  updatedAt: '2022-10-09T10:57:27.761Z',
};

export const mockedDdsCriteria = [
  {
    id: '5e97864fc3b33210444bb74a',
    name: {
      en: 'Waybills',
      tr: 'İrsaliye',
    },
  },
  {
    id: '5ef503f7810a73318ed8923d',
    name: {
      en: 'Missing Product & Cancelled Order',
      tr: 'Ürün & Sipariş Hatası',
    },
  },
];

export const mockedDdsObjectionList = {
  ddsObjections: [
    {
      _id: '64373e384e6cd3720427ac16',
      criteria: {
        id: '5ef503f7810a73318ed8923d',
        name: {
          en: 'Missing Product & Cancelled Order',
          tr: 'Ürün & Sipariş Hatası',
        },
      },
      recordDate: '2023-04-12T00:00:00.000Z',
      franchise: {
        id: '625035955a8f8dfdce683535',
        name: 'NL Rotterdam - Metroplein',
      },
      warehouse: {
        id: '6197d35e8be60d10d9c5aa52',
        name: 'Metroplein',
      },
      status: 200,
      data: {
        order: {
          id: '64370bad82611b90989631b2',
          date: '2023-04-12',
          rate: null,
          courier: {
            id: '630f57e8431b2fed74316578',
            name: 'Natnael Amanuel',
          },
        },
        domainType: '1.0',
        product: {
          id: '6205065c8a5f73ddab62ea7c',
          fullName: {
            tr: 'Yakult Orginal',
            en: 'Yakult Orginal',
          },
        },
        description: 'description',
        feedback: {
          id: '643724770afb2294d039f5cc',
          feedback: {
            en: 'Best Before Date close/passed',
            tr: "SKT'si geçmiş/yakın ürün",
          },
          note: 'Klant wilt refund.',
        },
      },
      isProcessed: 0,
      createdAt: '2023-04-12T23:26:47.664Z',
      updatedAt: '2023-04-13T08:06:12.710Z',
      objection: {
        description: 'no picture, not reported',
        user: '61d57a4b13882bc979dba6a8',
        createdAt: '2023-04-13T08:06:12.710Z',
      },
    },
  ],
  totalCount: 12,
};

export const planogramCategoryListMockHandler = {
  planogramCategory: [
    {
      id: '63a5b0e4fb207a4936e0e463',
      name: 'Bulaşık',
      storageType: 'Ambient',
      levels: [
        {
          id: '6156af7a9883dce26caa1ebf',
          name: {
            tr: 'GIDA DIŞI',
            en: 'GIDA DIŞI',
          },
          masterCategoryLevel: 10,
          child: {
            id: '6156af7c9883dce26caa1ec8',
            name: {
              tr: 'EV BAKIM',
              en: 'EV BAKIM',
            },
            masterCategoryLevel: 20,
            child: {
              id: '6156af7f9883dce26caa1f3d',
              name: {
                tr: 'BULAŞIK',
                en: 'BULAŞIK',
              },
              masterCategoryLevel: 30,
              child: {
                name: {
                  tr: 'SIVI BULAŞIK DETERJANI',
                  en: 'SIVI BULAŞIK DETERJANI',
                },
                id: '6156af879883dce26caa206c',
                masterCategoryLevel: 40,
              },
            },
          },
        },
      ],
      countryCode: 'TR',
      isEnabled: false,
      createdAt: '2022-12-23T13:45:08.735Z',
    },
  ],
};

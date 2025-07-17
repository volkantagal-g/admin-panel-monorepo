export const mockedGetAdminGuides = [
  {
    _id: '62e20d9eef5dbb4aecc340ff',
    isActive: true,
    isDeleted: false,
    createdBy: '606c585b8c1c3247441f7f5f',
    pageId: '6001924a736d252ae941db9c',
    isAdminGuide: true,
    name: {
      tr: 'Mocked Name 1',
      en: 'Mocked Name 1',
    },
    updatedBy: '606c585b8c1c3247441f7f5f',
    files: [
      {
        langKeys: [
          'tr',
        ],
        _id: '62e216671e447701bfde6279',
        title: {
          tr: 'Dosya Başlığı1',
          en: 'File Title1',
        },
        url: 'https://admin.getir.com/',
      },
    ],
    faqs: [
      {
        _id: '62e216671e447701bfde6278',
        question: {
          tr: 'Test1Soru2',
          en: 'Test1Question2',
        },
        answer: {
          tr: 'Test1Cevap2',
          en: 'Test1Answer2',
        },
      },
    ],
    createdAt: '2022-07-27T10:00:43.704Z',
    updatedAt: '2022-07-28T04:53:59.518Z',
    __v: 0,
    description: {
      tr: 'Mocked Description 1',
      en: 'Mocked Description 1',
    },
    componentIds: [],
  },
];

export const mockedGetHighlightedDocuments = [
  {
    _id: '632985049b39e8ad4c90bb31',
    isActive: true,
    isDeleted: false,
    createdBy: '606c585b8c1c3247441f7f5f',
    pageId: '6001924a736d252ae941db9c',
    isAdminGuide: false,
    isHighlighted: true,
    name: {
      tr: 'Mocked Highlighted Name tr',
      en: 'Mocked Highlighted Name en',
    },
    updatedBy: '606c585b8c1c3247441f7f5f',
    faqs: [
      {
        _id: '632985008d829d1f7ec2d424',
        question: {
          tr: 'highlighted question tr',
          en: 'highlighted question en',
        },
        answer: {
          tr: 'highlighted answer tr',
          en: 'highlighted answer en',
        },
      },
    ],
    createdAt: '2022-07-27T10:00:43.704Z',
    updatedAt: '2022-07-28T04:53:59.518Z',
    __v: 0,
    description: {
      tr: 'Mocked Highlighted Description tr',
      en: 'Mocked Highlighted Description en',
    },
    componentIds: [],
  },
];

export const mockedGetByFiltersGeneral = [
  {
    _id: '62e20d9eef5dbb4aecc340ff',
    isActive: true,
    isDeleted: false,
    createdBy: {
      _id: '606c585b8c1c3247441f7f5f',
      name: 'Cemalettin Taş',
    },
    pageId: '6001924a736d252ae941db9c',
    isAdminGuide: true,
    name: {
      tr: 'General Mocked Name 1',
      en: 'General Mocked Name 1',
    },
    updatedBy: {
      _id: '606c585b8c1c3247441f7f5f',
      name: 'Cemalettin Taş',
    },
    files: [
      {
        langKeys: [
          'tr',
        ],
        _id: '62e216671e447701bfde6279',
        title: {
          tr: 'DosyaBaşlığı2',
          en: 'FileTitle2',
        },
        url: 'https://admin.getir.com/',
      },
    ],
    faqs: [
      {
        _id: '62e216671e447701bfde6278',
        question: {
          tr: 'Test1Soru2',
          en: 'Test1Question2',
        },
        answer: {
          tr: 'Test1Cevap2',
          en: 'Test1Answer2',
        },
      },
    ],
    createdAt: '2022-07-27T10:00:43.704Z',
    updatedAt: '2022-07-28T04:53:59.518Z',
    __v: 0,
    description: {
      tr: 'General Mocked description 2',
      en: 'General Mocked description 2',
    },
    componentIds: [],
    page: {
      name: {
        tr: 'Transfer Grubu Listesi',
        en: 'Transfer Group List',
      },
      _id: '6001924a736d252ae941db9c',
      permKey: 'PAGE_TRANSFER_GROUP_LIST',
    },
  },
  {
    _id: '62d945c7fbd4f573d889e548',
    isActive: true,
    isDeleted: false,
    createdBy: {
      _id: '606c585b8c1c3247441f7f5f',
      name: 'Cemalettin Taş',
    },
    pageId: '6001924a736d252ae941db9c',
    name: {
      tr: 'Transfer Grubu Doküman Test1',
      en: 'Transfer Group Document Test1',
    },
    updatedBy: {
      _id: '5fad066acf412f4dce1d771a',
      name: 'Özgür Bal',
    },
    files: [
      {
        langKeys: [
          'tr',
        ],
        _id: '62da60a0f3d29415a8b672dd',
        title: {
          tr: 'DosyaBaşlığı',
          en: 'FileTitle',
        },
        url: 'https://admin.getir.com/',
      },
    ],
    faqs: [
      {
        _id: '62d94623fbd4f573d889e54b',
        question: {
          tr: 'Test1 Soru 1',
          en: 'Test1 Question 1',
        },
        answer: {
          tr: 'Test1 Cevap 1',
          en: 'Test1 Answer 1',
        },
      },
    ],
    createdAt: '2022-07-21T12:25:43.704Z',
    updatedAt: '2022-07-27T10:19:36.567Z',
    __v: 0,
    description: {
      tr: 'Transfer Grubu Doküman Test1',
      en: 'Transfer Group Document Test1',
    },
    componentIds: [],
    page: {
      name: {
        tr: 'Transfer Grubu Listesi',
        en: 'Transfer Group List',
      },
      _id: '6001924a736d252ae941db9c',
      permKey: 'PAGE_TRANSFER_GROUP_LIST',
    },
  },
];

export const mockedGetById = {
  ...mockedGetByFiltersGeneral[0],
  page: {
    ...mockedGetByFiltersGeneral[0].page,
    components: [
      {
        name: {
          tr: 'Panel Soket Odası',
          en: 'Socket Panel Room',
        },
        _id: '60ae67ebebec0855f854a49b',
      },
      {
        name: {
          tr: 'Canlı harita soket odası',
          en: 'Socket livemap room',
        },
        _id: '60af37c0ebec081f0454a49e',
      },
    ],
  },
};

export const mockedMyFavorites = [];

export const getFranchiseMock = {
  _id: '625fb9b85180d85391aa41cb',
  commission: {
    settings: {
      1: [],
      2: [],
      3: [],
      4: [],
    },
    createdAt: '2022-04-20T07:43:52.447Z',
  },
  franchiseType: 2,
  isActivated: true,
  isDeleted: false,
  name: 'Huseyin Test',
  countryId: '55999ad00000010000000000',
  countryCode: 'TR',
  taxOffice: 'TaxOffice',
  taxNumber: '125412513',
  authorizedPerson: {
    name: 'Huseyin',
    gsm: '5427873551',
    gsmAlt: '5427873552',
    email: 'huseyin.ergon@getir.com',
  },
  updatedAt: '2022-04-20T07:45:23.247Z',
  createdAt: '2022-04-20T07:43:52.447Z',
  openDate: '2022-03-10T00:00:00.000Z',
  warehouses: [],
  history: [],
  owners: [
    {
      _id: '5a96c00a23159f00041ed02c',
      active: false,
      isOwner: true,
      name: 'Nihat',
      username: 'nihat.ozsoy',
      gsm: '5342026008',
      email: 'nihat.ozsoy@getir.com',
      franchise: '5807715d23e5b3ed4f36377e',
      groupType: 1,
      roles: [],
      updatedAt: '2019-02-01T08:32:23.352Z',
      isGetirEmployee: true,
    },
  ],
};

export const updateFranchiseMock = {
  _id: '625fb9b85180d85391aa41cb',
  commission: {
    settings: {
      1: [],
      2: [],
      3: [],
      4: [],
    },
    createdAt: '2022-04-20T07:43:52.447Z',
  },
  franchiseType: 2,
  isActivated: false,
  isDeleted: false,
  name: 'Franchise Name Testing Library Test',
  countryId: '55999ad00000010000000000',
  countryCode: 'TR',
  taxOffice: 'Franchise Tax Office Testing Library Test',
  taxNumber: '1122334455',
  authorizedPerson: {
    name: 'Huseyin',
    gsm: '5427873551',
    gsmAlt: '5427873552',
    email: 'huseyin.ergon@getir.com',
  },
  updatedAt: '2022-08-23T14:38:21.998Z',
  createdAt: '2022-04-20T07:43:52.447Z',
  openDate: '2022-03-10T00:00:00.000Z',
  owners: [
    {
      _id: '5a96c00a23159f00041ed02c',
      active: false,
      isOwner: true,
      name: 'Nihat',
      username: 'nihat.ozsoy',
      gsm: '5342026008',
      email: 'nihat.ozsoy@getir.com',
      franchise: '5807715d23e5b3ed4f36377e',
      groupType: 1,
      roles: [],
      updatedAt: '2019-02-01T08:32:23.352Z',
      isGetirEmployee: true,
    },
  ],
};

export const getCrisesManagementCards = {
  data: [
    {
      _id: '63342b27c9146f6e0dced7ba',
      cardNumber: 87,
      fullName: 'Ali Kemal Çelenk',
      topicName: {
        en: 'Sharing information that should not be shared with employees',
        tr: 'Çalışanlarla paylaşılmaması gereken bilgilerin paylaşılması',
      },
      date: '2022-09-27T11:08:14.171Z',
      notes: 'test2',
      franchiseId: '625fb9b85180d85391aa41cb',
    },
    {
      _id: '63342ad8c9146f6e0dced7ad',
      cardNumber: 86,
      fullName: 'Ali Kemal Çelenk',
      topicName: {
        en: 'KVKK violation',
        tr: 'KVKK İhlali',
      },
      date: '2022-09-28T11:06:50.662Z',
      notes: 'test',
      franchiseId: '625fb9b85180d85391aa41cb',
    },
  ],
  count: 2,
};

export const getCrisesManagementCardDetail = {
  _id: '63342b27c9146f6e0dced7ba',
  topicId: '6271144d8a0b80ab7385da7a',
  userId: '6284f8c7b9c24c846100f4da',
  franchiseId: '625fb9b85180d85391aa41cb',
  notes: 'test2',
  date: '2022-09-27T11:08:14.171Z',
  files: [],
  active: true,
  cardNumber: 87,
  createdAt: '2022-09-28T11:08:23.057Z',
  updatedAt: '2022-09-28T11:08:23.057Z',
  __v: 0,
  fullName: 'Ali Kemal Çelenk',
  topicName: {
    en: 'Sharing information that should not be shared with employees',
    tr: 'Çalışanlarla paylaşılmaması gereken bilgilerin paylaşılması',
  },
};

export const updateCrisesManagementCard = {
  topicId: '6271144d8a0b80ab7385da79',
  userId: '6284f8c7b9c24c846100f4da',
  franchiseId: '625fb9b85180d85391aa41cb',
  notes: 'test2',
  date: '2022-09-27T11:08:14.171Z',
  files: [],
  active: true,
  cardNumber: 87,
  _id: '63342b27c9146f6e0dced7ba',
  updatedAt: '2022-09-28T11:20:02.602Z',
  createdAt: '2022-09-28T11:08:23.057Z',
  __v: 0,
  fullName: 'Ali Kemal Çelenk',
};

export const getAllTopics = [
  {
    _id: '6271144d8a0b80ab7385da78',
    name: {
      en: 'Storage of information',
      tr: 'Bilgi saklama',
    },
    __v: 0,
    createdAt: '2022-05-03T11:38:53.873Z',
    updatedAt: '2022-05-03T11:38:53.873Z',
  },
  {
    _id: '6271144d8a0b80ab7385da79',
    name: {
      en: 'Incompatibility compared to employees',
      tr: 'Çalışanlara Göre Uyumsuzluk',
    },
    __v: 0,
    createdAt: '2022-05-03T11:38:53.873Z',
    updatedAt: '2022-05-03T11:38:53.873Z',
  },
  {
    _id: '6271144d8a0b80ab7385da7a',
    name: {
      en: 'Sharing information that should not be shared with employees',
      tr: 'Çalışanlarla paylaşılmaması gereken bilgilerin paylaşılması',
    },
    __v: 0,
    createdAt: '2022-05-03T11:38:53.873Z',
    updatedAt: '2022-05-03T11:38:53.873Z',
  },
  {
    _id: '6271144d8a0b80ab7385da7b',
    name: {
      en: 'In -warehouse return, destruction and waste processes are not complied with, abuse of processes',
      tr: 'Depo içi iade, imha ve atık süreçlerine riayet edilmemesi, süreçlerin kötüye kullanılması',
    },
    __v: 0,
    createdAt: '2022-05-03T11:38:53.873Z',
    updatedAt: '2022-05-03T11:38:53.873Z',
  },
  {
    _id: '6271144d8a0b80ab7385da7c',
    name: {
      en: 'KVKK violation',
      tr: 'KVKK İhlali',
    },
    __v: 0,
    createdAt: '2022-05-03T11:38:53.874Z',
    updatedAt: '2022-05-03T11:38:53.874Z',
  },
  {
    _id: '6271144d8a0b80ab7385da7d',
    name: {
      en: 'Performance',
      tr: 'Performans',
    },
    __v: 0,
    createdAt: '2022-05-03T11:38:53.874Z',
    updatedAt: '2022-05-03T11:38:53.874Z',
  },
  {
    _id: '6271144d8a0b80ab7385da7e',
    name: {
      en: 'Clock output',
      tr: 'Saat Aşımı',
    },
    __v: 0,
    createdAt: '2022-05-03T11:38:53.874Z',
    updatedAt: '2022-05-03T11:38:53.874Z',
  },
  {
    _id: '6271144d8a0b80ab7385da7f',
    name: {
      en: "SSI 'leak / non -appropriate personnel employment",
      tr: "SGK'sız / Uygun Görülmeyen Personel Çalıştırma",
    },
    __v: 0,
    createdAt: '2022-05-03T11:38:53.874Z',
    updatedAt: '2022-05-03T11:38:53.874Z',
  },
  {
    _id: '6271144d8a0b80ab7385da80',
    name: {
      en: 'SKT Pasting & Broken Product Making',
      tr: 'SKT Geçmiş & Bozuk Ürün Bulundurma',
    },
    __v: 0,
    createdAt: '2022-05-03T11:38:53.874Z',
    updatedAt: '2022-05-03T11:38:53.874Z',
  },
  {
    _id: '6271144d8a0b80ab7385da81',
    name: {
      en: 'Irregularity',
      tr: 'Usulsüzlük',
    },
    __v: 0,
    createdAt: '2022-05-03T11:38:53.874Z',
    updatedAt: '2022-05-03T11:38:53.874Z',
  },
];

export const getFranchiseAreas = [
  {
    _id: '65d311f23caf356d098293eb',
    name: 'Area 1',
    franchise: '63721c7a94106f66da67007f',
    createdAt: '2024-02-19T08:31:46.845Z',
    updatedAt: '2024-02-19T08:31:46.845Z',
  },
  {
    _id: '65e873ea24261f849875759b',
    name: 'Area 2',
    franchise: '63721c7a94106f66da67007f',
    createdAt: '2024-03-06T13:47:22.115Z',
    updatedAt: '2024-03-06T13:47:22.115Z',
  },
];

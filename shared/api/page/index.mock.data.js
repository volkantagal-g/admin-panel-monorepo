// TESTING_PRACTICE_EXAMPLE MOCK_DATA

import { mockedUser } from '@shared/api/user/index.mock.data';

export const mockedPage = {
  _id: '5c9b8f9f9c8f8b0f8c8f8f8g',
  name: {
    tr: 'Transfer Grubu Listesi',
    en: 'Transfer Group List',
  },
  description: {
    tr: 'transfer grupları',
    en: 'transfer groups',
  },
  countries: [
    '55999ad00000010000000000', // Turkey
    '6059b3a1252472aba0790d64', // France
    '61370da7a937eb4e96795fee', // US - Massachusetts
  ],
  pageOwners: [
    {
      _id: '123456789012345678905553', // MOCK_PAGE_OWNER
      name: 'Random Owner',
    },
    {
      _id: mockedUser._id,
      name: mockedUser.name,
    },
  ],
  components: [{
    _id: '62f588a4385972c6ca119de3',
    ownerDepartments: [],
    ownerPeople: [],
    countries: [
      '55999ad00000010000000000', // Turkey
      '6059b3a1252472aba0790d64', // France
      '61370da7a937eb4e96795fee', // US - Massachusetts
    ],
    name: {
      tr: 'mocked component',
      en: 'mocked component',
    },
    description: {
      tr: 'mocked component description',
      en: 'mocked component description',
    },
    permKey: 'PAGE_MOCKED_PAGE_COMPONENT_MOCKED_COMPONENT',
    page: '5c9b8f9f9c8f8b0f8c8f8f8g',
    hasGlobalAccess: false,
    createdAt: '2022-08-11T22:54:28.684Z',
    updatedAt: '2022-08-11T22:54:28.684Z',
  },
  {
    _id: '62fe0ea3a00b64e6f42b8663',
    ownerDepartments: [],
    ownerPeople: [],
    countries: [
      '55999ad00000010000000000', // Turkey
      '6059b3a1252472aba0790d64', // France
      '61370da7a937eb4e96795fee', // US - Massachusetts
    ],
    name: {
      tr: 'another mocked component',
      en: 'another mocked component',
    },
    description: {
      tr: 'another mocked component description',
      en: 'another mocked component description',
    },
    permKey: 'PAGE_MOCKED_PAGE_COMPONENT_ANOTHER_MOCKED_COMPONENT',
    page: '5c9b8f9f9c8f8b0f8c8f8f8g',
    hasGlobalAccess: false,
    createdAt: '2022-08-18T10:04:19.501Z',
    updatedAt: '2022-08-18T11:30:29.381Z',
    __v: 0,
  }],
  permKey: 'PAGE_MOCKED_PAGE',
  hasGlobalAccess: false,
};

export const mockedPages = [
  mockedPage,
  {
    _id: '5c9b8f9f9c8f8b0f8c8f8f8a',
    name: {
      tr: 'İzinsiz Sayfa',
      en: 'Unauthorized Page',
    },
    description: {
      tr: 'Bu sayfaya rolün izni yok',
      en: 'You have no permission to access this page',
    },
    countries: [
      '55999ad00000010000000000', // Turkey
      '6059b3a1252472aba0790d64', // France
    ],
    pageOwners: [],
    components: [],
    permKey: 'PAGE_UNAUTHORIZED',
  },
];

export const mockedPageRoles = [
  {
    permittedCountries: ['55999ad00000010000000000', '6059b3a1252472aba0790d64'],
    countries: ['55999ad00000010000000000', '6059b3a1252472aba0790d64'],
    _id: '6006bea91ae409d343bcb970',
    name: 'Test Role Name',
  },
];

export const mockedUserOwnedPages = [
  '6001924a736d252ae941db9c',
  '600533531ae409d243bcb92d',
  '6005816d1ae4097291bcb941',
  '6005818e1ae409cacdbcb943',
  '600582bd1ae4091d96bcb950',
  '631f37100c4c88da5699452a',
];

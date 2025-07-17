import { mockedUser } from '@shared/api/user/index.mock.data';

export const mockedRole = {
  _id: '5c9b8f9f9c8f8b0f8c8f8f8f',
  name: 'Mocked Role',
  description: {
    tr: 'Sahte bir rol açıklaması',
    en: 'Mocked Role Description',
  },
  isActive: true,
  createdAt: '2019-01-01T00:00:00.000Z',
  countries: [
    '55999ad00000010000000000', // Turkey
    '6059b3a1252472aba0790d64', // France
    '61370da7a937eb4e96795fee', // US - Massachusetts
  ],
  roleOwners: [
    {
      _id: '123456789012345678905555', // MOCK_ROLE_OWNER
      name: 'Random Owner',
    },
  ],
  parent: {
    _id: '6034fc18548be32329ad91a4',
    name: 'test2',
    description: { en: 'test2', tr: 'test2' },
  },
};

export const mockedRoles = [
  mockedRole,
  {
    _id: '5c9b8f9f9c8f8b0f8c8f8f8d',
    parent: mockedRole._id,
    name: 'Mocked Child',
    description: {
      tr: 'Sahte bir rol açıklaması Child',
      en: 'Mocked Role Description Child',
    },
    isActive: true,
    createdAt: '2019-01-01T00:00:00.000Z',
    countries: [
      '55999ad00000010000000000', // Turkey
      '6059b3a1252472aba0790d64', // France
      '61370da7a937eb4e96795fee', // US - Massachusetts
    ],
    roleOwners: [],
  },
  {
    _id: '5c9b8f9f9c8f8b0f8c8f8f8c',
    parent: '5c9b8f9f9c8f8b0f8c8f8f8d',
    name: 'Mocked Child Child',
    description: {
      tr: 'Sahte bir rol açıklaması Child Child',
      en: 'Mocked Role Description Child Child',
    },
    isActive: true,
    createdAt: '2019-01-01T00:00:00.000Z',
    countries: [
      '55999ad00000010000000000', // Turkey
      '6059b3a1252472aba0790d64', // France
      '61370da7a937eb4e96795fee', // US - Massachusetts
    ],
    roleOwners: [],
  },
];

export const mockedRoleUsers = roleId => [
  {
    ...mockedUser,
    roles: [
      roleId,
    ],
  },
];

export const mockedUserOwnedRoles = [
  {
    _id: '5c9b8f9f9c8f8b0f8c8f8f83',
    name: 'Mocked Role',
    description: {
      tr: 'Sahte bir rol açıklaması2',
      en: 'Mocked Role Description2',
    },
    isActive: true,
    createdAt: '2019-01-01T00:00:00.000Z',
    countries: [
      '55999ad00000010000000000', // Turkey
      '6059b3a1252472aba0790d64', // France
      '61370da7a937eb4e96795fee', // US - Massachusetts
    ],
  },
];

export const mockedRolesOfTeammates = [
  {
    _id: '6034fc18548be32329ad91a4',
    name: 'test2',
    description: { en: 'test2', tr: 'test2' },
    isActive: true,
    parent: '62e2788ac35526c53df9518b',
    queryUsers: [
      {
        _id: '62432218ecfc227c9690a08b',
        email: 'henrik.islam@getir.com',
        name: 'Henrik Edward Islam',
      }],
  },
  {
    _id: '600ea224df492f955fb6fb16',
    name: 'Dev Admin',
    description: {
      tr: 'tbd',
      en: 'tbd',
    },
    isActive: true,
    createdAt: '2022-06-16T07:41:20.243Z',
    updatedAt: '2022-06-16T07:42:02.464Z',
    queryUsers: [
      {
        _id: '648f233e2fbeafc731e2339f',
        email: 'test@getir.com',
        name: 'Test User',
      },
    ],
  },
];

export const mockedRoleHierarchy = {
  _id: '60c0a21363dba9a2e69df972',
  name: 'Getir Locals',
  parent: '6194bcdcba201ee960cd12e0',
  children: [
    {
      _id: '6034fc18548be32329ad91a4',
      name: 'test2',
      parent: '60c0a21363dba9a2e69df972',
    },
  ],
};

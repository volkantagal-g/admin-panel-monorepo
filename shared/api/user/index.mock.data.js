export const mockedUserId = '5f8c22f032bedb705946a32d';

export const mockedUser = {
  _id: mockedUserId,
  name: 'Test User',
  email: 'test.user@getir.com',
  username: 'test.user',
  countries: [
    '55999ad00000010000000000', // Turkey
    '6059b3a1252472aba0790d64', // France
    '61370da7a937eb4e96795fee', // US - Massachusetts
  ],
  roles: [
    '600ea224df492f955fb6fb16',
    '6006bea91ae409d343bcb970',
    '603f955c548be37a9aad920e',
    '601a744eb14121b89b28d0c1',
  ],
  canApprovePermissionRequests: true,
  isActive: true,
  hasGlobalAccess: true,
};

export const mockedUsers = {
  users: [
    mockedUser,
  ],
};

export const mockedBulkInactivateExternalCustomerServicesAccountsResponse = {
  updatedCount: 2,
  problemMailAddressList: ['problem1@getir.com', 'problem2'],
};

export const mockedUserRoles = [
  {
    _id: '6034fc18548be32329ad91a4',
    name: 'test2',
    roleMemberType: 300,
    joinedAt: '2022-12-16T03:21:01.836Z',
  },
  {
    _id: '6034fc18548be32329ad91a5',
    name: 'test3',
    roleMemberType: 200,
    joinedAt: '2022-12-16T03:21:01.836Z',
  },
];

export const mockedBulkCreateTeleperformanceUsersResponse = {
  updatedCount: 1,
  problemMailAddressList: ['problem2@webhelp.getir.com'],
};

export const mockedBulkCreateWebhelpUsersGlobalResponse = {
  updatedCount: 3,
  problemMailAddressList: ['problem3@teleperformance.getir.com', '', 'another.problem@getir.com'],
};

export const mockedBulkCreateWebhelpUsersTurkeyResponse = {
  updatedCount: 4,
  problemMailAddressList: ['problem4@getir.com', 'duplicate@webhelp.getir.com'],
};

export const mockedBulkCreateAssisttUsersResponse = {
  updatedCount: 1,
  problemMailAddressList: ['problem1@assistt.getir.com'],
};

export const getFavoritePagesResponse = [
  {
    menuKey: 'ROOT_MANAGEMENT_GETIR_MARKET_DASHBOARD',
    path: '/getirMarket/dashboard',
  },
  {
    menuKey: 'ROOT_MANAGEMENT_GETIR_MARKET_COMMERCIAL_MONITORING',
    path: '/getirMarket/commercialTrack',
  },
];

export const mockedFilteredUsersWithRestrictedData = {
  users: [
    {
      _id: '65d34943a0caeceff3691094',
      name: 'mockedFilteredUsersWithRestrictedData',
    },
  ],
};

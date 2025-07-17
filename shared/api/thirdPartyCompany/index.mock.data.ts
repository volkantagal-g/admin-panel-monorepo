import {
  getThirdPartyCompanyChangeLogsInputType,
  getThirdPartyCompanyCredentialsChangeLogsInputType,
} from './index';

export const mockedActiveThirdPartyCompany = {
  _id: '62f21f8d53625330fcdec8fe',
  name: 'Lorem Ipsum - Dist Company No: 9 - ky',
  shortName: 'Company No: 9 - ky',
  status: 2,
  allowRoute: [
    'POST:/call-register/netgsm-gb',
    'POST:/call-register/kobikom',
    'POST:/weezy/client/sign-up',
  ],
  createdAt: '2022-08-09T08:49:17.683Z',
  updatedAt: '2022-08-09T08:49:31.809Z',
};

export const mockedInactiveThirdPartyCompany = {
  _id: '62f3d6f253625330fcded914',
  name: 'TestAutoYIVO1B',
  shortName: 'testCompany',
  status: 1,
  allowRoutes: [
    'GET/companies',
    'GET/companies2',
  ],
  createdAt: '2022-08-10T16:04:02.695Z',
  updatedAt: '2022-08-10T16:04:02.695Z',
};

export const mockedThirdPartyCompanies = [
  mockedActiveThirdPartyCompany,
  mockedInactiveThirdPartyCompany,
];

export const mockedAllowedRoute = {
  label: 'NETGSM tarafından ülke koduna göre IVN sürecini başlatır',
  value: 'POST:/call-register/start-ivn-from-netgsm',
};

export const mockedThirdPartyCompanyAllowedRoutes = [
  mockedAllowedRoute,
];

export const mockedThirdPartyCompanyById = {
  _id: '62f3e10953625330fcded97b',
  name: 'TestAuto7JSCIQ',
  shortName: 'testCompany',
  status: 1,
  allowRoutes: [
    'GET/companies',
    'GET/companies2',
  ],
  createdAt: '2022-08-10T16:47:05.822Z',
  updatedAt: '2022-08-11T07:17:27.414Z',
};

export const mockedThirdPartyCompanyByIdData = id => [
  {
    ...mockedThirdPartyCompanyById,
    _id: id,
  },
];

export const mockedCredentialsByCompanyId = {
  total: 1,
  secrets: [
    {
      _id: '62f62e7c0c46f43df09863e8',
      key: 'TFZXBYS-6PKM8C1-GTG5C97-BR9GBHW',
      status: 1,
      companyId: '62f5b30153625330fcdedfd4',
      environment: 'dev',
    },
  ],
};

export const mockedCredentialsByCompanyIdData = id => [
  {
    ...mockedCredentialsByCompanyId,
    secrets: [{ _id: id }],
  },
];

export const mockedCompanyChangeLogs = ({ key } : getThirdPartyCompanyChangeLogsInputType) => ({
  changeLogs: [
    {
      _id: '64a7dd722cb18d8094fc4e4b',
      actionType: 'update',
      createdAt: '2023-07-07T09:40:02.103Z',
      createdBy: 'email@getir.com',
      currentValue: {
        __v: 2,
        allowRoutes: [
          'POST:/call-register/netgsm-gb',
          'POST:/call-register/start-ivn-from-kobikom',
        ],
        name: 'demo for company change log fdasfsaf',
        shortName: 'demo demo dsafasfsad',
        status: 2,
      },
      oldValue: {
        __v: 1,
        allowRoutes: [
          'POST:/call-register/netgsm-gb',
          'POST:/call-register/start-ivn-from-kobikom',
        ],
        name: 'demo for company change log fdasfsaf',
        shortName: 'demo demo dsafasfsad',
        status: 1,
      },
      uniqueIdentifier: key,
    },
    {
      _id: '64a7dd492cb18d8094fc4e48',
      actionType: 'update',
      createdAt: '2023-07-07T09:39:21.265Z',
      createdBy: 'email@getir.com',
      currentValue: {
        __v: 1,
        allowRoutes: [
          'POST:/call-register/netgsm-gb',
          'POST:/call-register/start-ivn-from-kobikom',
        ],
        name: 'demo for company change log fdasfsaf',
        shortName: 'demo demo dsafasfsad',
        status: 1,
      },
      oldValue: {
        __v: 0,
        allowRoutes: [
          'POST:/call-register/netgsm-gb',
        ],
        name: 'demo for company change log',
        shortName: 'demo demo',
        status: 1,
      },
      uniqueIdentifier: key,
    },
  ],
});

export const mockedCredentialsChangeLogs = ({ key } : getThirdPartyCompanyCredentialsChangeLogsInputType) => ({
  changeLogs: [
    {
      _id: '64a7e181617d93678072454a',
      actionType: 'delete',
      createdAt: '2023-07-07T09:57:21.431Z',
      createdBy: 'sinan.argun@getir.com',
      currentValue: {
        __v: 2,
        companyId: key,
        environment: 'dev',
        status: 0,
      },
      uniqueIdentifier: key,
    },
    {
      _id: '64a7e16e617d936780724547',
      actionType: 'update',
      createdAt: '2023-07-07T09:57:02.763Z',
      createdBy: 'sinan.argun@getir.com',
      currentValue: {
        __v: 1,
        companyId: key,
        environment: 'dev',
        status: 2,
      },
      oldValue: {
        __v: 0,
        companyId: key,
        environment: 'dev',
        status: 1,
      },
      uniqueIdentifier: key,
    },
    {
      _id: '64a7e152617d936780724544',
      actionType: 'create',
      createdAt: '2023-07-07T09:56:34.083Z',
      createdBy: 'sinan.argun@getir.com',
      currentValue: {
        __v: 0,
        companyId: '64a7dd065450c5b635fa72b5',
        environment: 'dev',
        status: 1,
      },
      uniqueIdentifier: key,
    },
  ],
});

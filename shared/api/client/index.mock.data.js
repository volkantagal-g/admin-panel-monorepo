export const mockedClientv1 = {
  _id: '6206095a6163bbacc34fbe08',
  name: 'test testsurname',
  gsm: '+905333333333',
  gsmWithoutCountryCode: '5333333333',
  countryCode: '90',
  email: 'test@testmail.com',
  currentOrders: [],
  sucOrderCounts: [],
  isActivated: true,
  language: 'en',
};

export const mockedClientv2 = {
  _id: '1111111a6163bbacc34fbe08',
  name: 'testname test',
  gsm: '+905555555555',
  gsmWithoutCountryCode: '5555555555',
  countryCode: '90',
  email: 'mail@testgmail.com',
  currentOrders: [],
  sucOrderCounts: [],
  isActivated: true,
  language: 'en',
};

export const mockedClients = {
  clients: [
    mockedClientv1,
    mockedClientv2,
  ],
};

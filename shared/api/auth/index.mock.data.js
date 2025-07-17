import { mockedCountries } from '@shared/api/countryInfo/index.mock.data';
import { mockedUser } from '@shared/api/user/index.mock.data';

export const mockedAuthTempToken = tempToken => ({
  ...mockedUser,
  countries: mockedCountries.slice(0, 3),
  token: tempToken,
  redirectUrl: '/transferGroup/list',
  employee: {
    _id: '606d694c9b68451454328043',
    department: {
      _id: '5ac88cfb7d2f1bb0a8ae704e',
      isActive: true,
      level: 0,
      name: 'Technology',
    },
    jobFamilyId: '10343',
    jobFamilyName: 'Technology',
    workEmail: mockedUser.email,
    isInternationalBusinessEmployee: false,
  },
});

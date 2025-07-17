const mockedEmployeeBasicsForProfileFull = {
  _id: '59bb92b9b4ff44c3e6841c87',
  departmentName: 'Sales',
  jobFamilyName: 'Technology',
  locationId: 'GT-32424X',
  locationName: 'Dogus Center',
  fullName: 'Cenk Batman',
  jobTitle: 'developer II',
  workEmail: 'cenk.batman@getir.com',
  personalEmail: 'cenk.batman@gmail.com',
  workStartDate: '2022-05-31T00:00:00.000Z',
  payrollCountryCode: 'de',
  businessUnit: '62722643140a8b43e5240f0b',
  supervisor: {
    _id: '59bb92b9b4ff44c34e6841c87',
    fullName: 'Murat Cenk Batman',
    workEmail: 'cenk.batman@getir.com',
    supervisor: '59bb92b9b4ff56c3e6841c87',
  },
  businessTitle: 'Senior Engineer I - Full Stack',
  workdayId: '104543',
};

const mockedEmployeeBasicsForProfileMissing = {
  _id: '60479dc73c5d5f0f1180c232',
  fullName: 'Kadir Yavuz',
  workEmail: 'kadir.yavuz@getir.com',
};

const mockedActiveSessions = [
  {
    _id: '59bb92b9b4ff44c3e6841c87',
    issuer: 'GOOGLE_AUTH',
    createdAt: '2021-01-29T20:16:07.811Z',
    updatedAt: '2021-01-29T21:44:26.421Z',
    browserAndOs: 'Chrome/Mac OS',
  },
];

export const mockedProfile = {
  mockedEmployeeBasicsForProfileFull,
  mockedEmployeeBasicsForProfileMissing,
  mockedActiveSessions,
};

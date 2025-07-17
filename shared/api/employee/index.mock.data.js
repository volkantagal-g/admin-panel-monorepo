import { DEPARTMENT_LEVELS } from '@app/pages/Employee/constants';

export const getEmployeeCitiesForSelectComponentMockData = {
  cities: [
    {
      _id: '626768efee4f443f169de222',
      name: 'İSTANBUL',
    },
    {
      _id: '626768feee4f443f169de223',
      name: 'IZMIR',
    },
    {
      _id: '6278f29af15b6807203e3611',
      name: 'ordu',
    },
  ],
};

export const getEmployeesForSelectComponentMockData = {
  employees: [
    {
      _id: '59bb92b9b4ff44c3e6841c87',
      fullName: 'Employee 1',
      workEmail: 'employee1@getir.com',
    },
    {
      _id: '5acb5528688adde6795b4c0f',
      fullName: 'Employee 2',
      workEmail: 'employee2@getir.com',
    },
    {
      _id: '5acb6ce55eb4cdf436a9139d',
      fullName: 'Employee 3',
      workEmail: 'employee3@getir.com',
    },
  ],
};

export const getDepartmentsForSelectComponentMockData = {
  departments: [
    {
      _id: '62399ec36033f30e165dfe7a',
      name: {
        tr: 'QA',
        en: 'QA',
      },
      level: DEPARTMENT_LEVELS.SUB_DEPARTMENT_FIRST,
      parent: '5ac88cfb7d2f1bb0a8ae704e',
    },
    {
      _id: '5ac88c357d2f1bb0a8ae7049',
      name: {
        tr: 'Sales',
        en: 'Sales',
      },
      level: DEPARTMENT_LEVELS.MAIN_DEPARTMENT,
    },
    {
      _id: '619154382a113e0efc85ed15',
      name: {
        tr: 'Sub Sales',
        en: 'Sub Sales',
      },
      parent: '5ac88c357d2f1bb0a8ae7049',
      level: DEPARTMENT_LEVELS.SUB_DEPARTMENT_FIRST,
    },
    {
      _id: '5ac88cfb7d2f1bb0a8ae704e',
      name: {
        tr: 'Technology',
        en: 'Technology',
      },
      level: DEPARTMENT_LEVELS.MAIN_DEPARTMENT,
    },
    {
      _id: '5b056b960c25e4e9d715a727',
      name: {
        tr: 'Development',
        en: 'Development',
      },
      level: DEPARTMENT_LEVELS.SUB_DEPARTMENT_FIRST,
      parent: '5ac88cfb7d2f1bb0a8ae704e',
    },

    {
      _id: '62399f0c6033f3d16c5dfe7d',
      name: {
        tr: 'Human Department',
        en: 'Human Department',
      },
      level: DEPARTMENT_LEVELS.MAIN_DEPARTMENT,
    },
    {
      _id: '619152e92a113e0efc85ed10',
      name: {
        tr: 'Human Department sub-1',
        en: 'Human Department sub-1',
      },
      level: DEPARTMENT_LEVELS.SUB_DEPARTMENT_FIRST,
      parent: '62399f0c6033f3d16c5dfe7d',
    },
  ],
};

export const createNewEmployeeMockData = { employee: { _id: '59bb92b9b4ff44c3e6841c87' } };

export const employeeCreateAssetMockData = {
  status: 100,
  _id: '62cfafe245630791bbefbf31',
  name: 'mac',
  type: 1,
  uniqueIdentifier: 'bbb',
  purchaseInvoiceNumber: 'eee',
  purchaseDate: '2022-08-01T05:55:34.561Z',
  purchasedVendor: 'ddd',
  city: '626768feee4f443f169de223',
  barcode: 'aaaa',
  createdAt: '2022-07-14T05:55:46.563Z',
  updatedAt: '2022-07-14T05:55:46.563Z',
};

export const mockedEmployee = {
  _id: '59bb92b9b4ff44c3e6841c87',
  fullName: 'Murat Cenk Batman',
  jobStatus: 100,
  jobTitle: 'Engineering Manager',
  workEmail: 'cenk.batman@getir.com',
  supervisor: '59bb92b9b4ff44c3e6841c87',
  businessTitle: 'Engineering Manager',
  jobFamilyId: 'Engineering',
  jobFamilyName: 'Engineering',
  locationId: 'HQNLXX1005',
  locationName: 'Amsterdam - HQ Office',
  workdayId: '100031',
  departmentId: 'Product',
  departmentName: 'Product',
};

export const mockedEmployees = {
  employees: [
    mockedEmployee,
    {
      _id: '5afea83f264e49fa4681edc6',
      fullName: 'Şükrü Günay',
      jobStatus: 100,
      jobTitle: 'Engineering Associate 1',
      supervisor: {
        _id: '653112faf7d658107adbed53',
        fullName: 'Orhan Kemal Elçi',
        supervisor: '656f449419e0351f05c8b0b2',
      },
      workEmail: 'sukru.gunay@getir.com',
      businessTitle: 'Senior Engineer I - Full Stack',
      jobFamilyId: 'Engineering',
      jobFamilyName: 'Engineering',
      locationId: 'HQTUXX1001',
      locationName: 'GetirOffice',
      workdayId: '100055',
      departmentId: 'Product',
      departmentName: 'Product',
    },
  ],
  nextPageCursor: 'eyIkb2lkIjoiNjJjMmU1NzQwMTYzZTU2MTU3MjBmYzAwIn0',
};

export const mockedFormerEmployees = {
  employees: [
    {
      departmentId: '5ac88c357d2f1bb0a8ae7049',
      departmentName: 'Sales',
      jobFamilyId: '10343',
      jobFamilyName: 'Technology',
      fullName: 'Ahmet Arslan',
      isInternationalBusinessEmployee: false,
      jobStatus: 300,
      jobTitle: 'Reklam Uzmanı',
      businessTitle: 'Reklam Uzmanı',
      locationId: 'GT-32424X',
      locationName: 'Dogus Center',
      personalGsm: '5997676245',
      supervisor: {
        fullName: 'Sinan Zengin',
        isInternationalBusinessEmployee: false,
        _id: '5acb5528688adde6795b4c0f',
      },
      workEmail: 'ahmet.arslan@getir.com',
      _id: '5ac89e50bdc129b4b0bbd47b',
    },
    {
      departmentId: '5ac88c357d2f1bb0a8ae7049',
      departmentName: 'Sales',
      jobFamilyId: '10345',
      jobFamilyName: 'Operations',
      fullName: 'Sibel Mavi',
      isInternationalBusinessEmployee: false,
      jobStatus: 300,
      personalGsm: '5973452354',
      _id: '5aec78c702a10677a402fe96',
    },
  ],
};

export const mockExportedEmployeeAssetExcelDownloadURL = { url: 'https://core-panel-common-internal-development.s3.eu-west-1.amazonaws.com/employee/excel/soething-interesting' };

export const mockGetEmployeeForEmployeeDetail = {
  _id: '62cedb9f89119055ad77aa91',
  jobStatus: 200,
  isInternationalBusinessEmployee: false,
  fullName: 'Yeni Panel Test Surname',
  birthday: '1993-05-29T06:00:00.000Z',
  businessCountryCodes: ['nl'],
  collarType: 2,
  departmentId: '5ac88c357d2f1bb0a8ae7049',
  departmentName: 'Sales',
  subDepartmentId: '',
  subDepartmentName: '',
  jobFamilyId: '10343',
  jobFamilyName: 'Technology',
  locationId: 'GT-32424X',
  locationName: 'Dogus Center',
  jobTitle: 'titleedited',
  nationality: 'tr',
  payrollCountryCode: 'tr',
  personalEmail: 'muratcenkbatman+edited@windowslive.com',
  uniqueIdentifier: '30821360878',
  workEmail: 'muratcenkbatman@windowslive.com',
  workStartDate: '2017-03-21T12:00:00.000Z',
  personalGsm: '+9055555555556',
  rndEntranceCardId: 'randdedited',
  supervisor: {
    _id: '5afed9c4cbab080d67f1f7bf',
    fullName: 'Yılmaz Söyleyici',
  },
  workType: 2,
};

export const mockUpdateEmployeeGeneralInfo = {
  _id: '62cedb9f89119055ad77aa91',
  fullName: 'Yeni Panel Test - edited Surname - edited',
  birthday: '1993-05-29T12:00:00.000Z',
  nationality: 'tr',
  uniqueIdentifier: '30821360878',
  jobFamilyId: '10343',
  jobFamilyName: 'Technology',
  locationId: 'GT-32424X',
  locationName: 'Dogus Center',
};

export const mockGetManagerOfEmployee = {
  _id: '5afed9c4cbab080d67f1f7bf',
  fullName: 'Yılmaz Söyleyici',
  workEmail: 'yilmaz.soyleyici@getir.com',
};

export const mockEmployeeAssets = {
  assets: [
    {
      _id: '5accb5259f9fc3285feda2a6',
      assignedEmployee: {
        _id: '5ac89e50bdc129b4b0bbd47b',
        fullName: 'Ahmet Arslan',
      },
      barcode: 'asdasdad123',
      city: '626768efee4f443f169de222',
      createdAt: '2018-04-10T12:59:17.096Z',
      name: 'MacBook Pro Retina 13-inch, Late 2013',
      status: 200,
      type: 1,
      uniqueIdentifier: 'C02LJ41LFH00',
    },
    {
      _id: '5accba486280b228da8a6096',
      assignedEmployee: {
        _id: '5ad9fbb55af54b662a775cd7',
        fullName: 'Aykan Detay',
      },
      city: '626768feee4f443f169de223',
      createdAt: '2018-04-10T13:21:12.255Z',
      name: 'Alfa Romeo Guilietta 2012',
      status: 200,
      type: 4,
      uniqueIdentifier: '34TG6245',
    },
    {
      _id: '5ace1710b2760d4a770b4b3c',
      assignedEmployee: {
        _id: '5afea83f264e49fa4681edc6',
        fullName: 'Şükrü Günay',
      },
      city: '626768efee4f443f169de222',
      createdAt: '2018-04-11T14:09:20.592Z',
      name: 'MacBook Pro Retina 15-inch, Late 2013',
      status: 200,
      type: 1,
      uniqueIdentifier: 'C02LJ6QSFD56',
    },
  ],
  nextPageCursor: '5c6d07e50b464c0001339185',
};

export const mockUpdateEmployeeAsset = {
  _id: '5ace1710b2760d4a770b4b3c',
  assignedEmployee: {
    _id: '5afea83f264e49fa4681edc6',
    fullName: 'Şükrü Günay',
  },
  city: '626768efee4f443f169de222',
  createdAt: '2018-04-11T14:09:20.592Z',
  name: 'MacBook Pro Retina 15-inch, Late 2013',
  status: 200,
  type: 1,
  uniqueIdentifier: 'C02LJ6QSFD56',
};

export const mockEmployeeAssignedAssets = [
  {
    asset: '5ace1710b2760d4a770b4b3c',
    assignDate: '2018-06-12T00:00:00.000Z',
    assignedEmployee: '5ac89e50bdc129b4b0bbd47b',
    city: '626768efee4f443f169de222',
    createdAt: '2018-04-10T12:59:17.096Z',
    name: 'MacBook Pro Retina 13-inch, Late 2013',
    returnDate: '2018-06-13T00:00:00.000Z',
    status: 200,
    type: 1,
    uniqueIdentifier: 'C02LJ41LFH00',
    _id: '5accb5259f9fc3285feda2a6',
  },
  {
    asset: '5ca6fd17463eb4000133549c',
    assignDate: '2019-04-05T00:00:00.000Z',
    returnDate: null,
    assignNote: 'yfgj',
    returnNote: null,
    _id: '5ca6fd17463eb4000133549c',
    assignedEmployee: '5afea83f264e49fa4681edc6',
    city: '626768efee4f443f169de222',
    createdAt: '2019-04-05T07:00:39.890Z',
    name: 'dilara test',
    purchaseDate: '1090-12-11T22:04:08.000Z',
    purchaseInvoiceNumber: '22233445676',
    purchasedVendor: 'asdffg',
    status: 200,
    type: 4,
    uniqueIdentifier: '2366fshdjdg636373',
  },
];

export const mockEmployeeInformationForAssetPrintForm = {
  departmentId: '5ac88cfb7d2f1bb0a8ae704e',
  departmentName: 'Technology',
  fullName: 'Name Surname',
  uniqueIdentifier: '30821360878',
  _id: '5f8c22f032bedb705946a32d',
};

export const mockGetEmployeeNonPrivateInformation = {
  jobStatus: 100,
  fullName: 'Name Surname',
  _id: '5f8c22f032bedb705946a32d',
};

export const mockLocationsForSelectComponent = {
  locations: [
    {
      _id: '64ad901bfc881ea86fde1a72',
      name: 'GetirOffice',
      workdayId: 'HQTUXX1001',
    },
    {
      _id: '64ae86fa1075cbdd9ecbdd0d',
      name: 'Olympiades - G-Store',
      workdayId: 'G-FRXX1095',
    },
    {
      _id: '64ae88271075cbdd9ecbdd1a',
      name: 'Université - G-Store',
      workdayId: 'G-FRXX1101',
    },
  ],
};

export const mockJobFamiliesForSelectComponent = {
  jobFamilies: [
    {
      _id: '64ad901bfc881ea86fde1a6f',
      name: 'Product',
      workdayId: 'Product',
    },
    {
      _id: '64ae868a1075cbdd9ecbdd00',
      name: ' Store_Management',
      workdayId: ' Store_Management',
    },
    {
      _id: '64ae86fa1075cbdd9ecbdd0a',
      name: 'Technology',
      workdayId: 'D-FRSID32098',
    },
    {
      _id: '64af234848c25f8445a9cb53',
      name: 'Operations',
      workdayId: 'Operations',
    },
  ],
};

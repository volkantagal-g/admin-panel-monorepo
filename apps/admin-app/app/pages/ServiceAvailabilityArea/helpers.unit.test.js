import { renderHook } from '@testing-library/react-hooks';

import { useDomainOptions } from './useDomainOptions';
import {
  getCenterOfPolygon,
  getFormattedSaa,
  getFormattedRequestBody,
  getFormattedFilterRequestBody,
  getCountryCode,
} from './utils';

import { mockedSaaDetail } from '@shared/api/serviceAvailablityArea/index.mock.data';
import { mockedCountries } from '@shared/api/countryInfo/index.mock.data';

const mockedSaa = mockedSaaDetail.serviceAvailabilityArea;

const mockedFormattedSaa = {
  id: '5dd7c060b427196535a1f437',
  name: 'Ankara',
  activeDomains: [
    10,
    2,
  ],
  country: '55999ad00000010000000000',
  geoJSON: expect.any(String),
};

const mockedRequestBody = {
  serviceAvailabilityAreaId: '5dd7c060b427196535a1f437',
  isAutomated: false,
  name: 'Ankara',
  activeServices: [
    '10',
    '2',
  ],
};

const mockedFilters = {
  country: mockedCountries[0],
  domainType: '10',
};

const mockedFormattedFilters = { pageSize: 100, countryCodes: ['TR'], activeService: '10' };
const mockedDomainOptions = [
  { value: 10, label: 'Getir10' },
  { value: 2, label: 'GetirFood' },
  { value: 3, label: 'GetirMore' },
  { value: 4, label: 'GetirWater' },
  { value: 6, label: 'GetirLocals' },
  { value: 14, label: 'GetirFinance' },
  { value: 7, label: 'GetirBiTaksi' },
  { value: 8, label: 'GetirWater Marketplace' },
  { value: 11, label: 'GetirJobs' },
  { value: 9, label: 'GetirDrive' },
  { value: 12, label: 'GetirN11' },
  { value: 13, label: 'GetirN11 Quick' },
  { value: 15, label: 'GetirSelect' },
  { value: 17, label: 'GetirGorillas' },
  { value: 18, label: 'N11(Everything)' },
];

describe('SAA Utils Test', () => {
  let formattedSaa;
  let polygonCenter;
  it('getCenterOfPolygon', () => {
    polygonCenter = getCenterOfPolygon(mockedSaa.polygon);
    const mockedCenter = [39.60641424778761, 32.68419471681416];
    expect(polygonCenter).toEqual(mockedCenter);
  });
  it('getFormattedSaa', () => {
    formattedSaa = getFormattedSaa(mockedSaa, mockedCountries);
    expect(formattedSaa).toEqual(mockedFormattedSaa);
  });
  it('getFormattedRequestBody', () => {
    const mockedObject = { ...formattedSaa };
    delete mockedObject.geoJSON;
    const formattedRequestBody = getFormattedRequestBody(mockedObject);
    expect(formattedRequestBody).toEqual(mockedRequestBody);
  });
  it('getFormattedFilterRequestBody', () => {
    const formattedFilterRequestBody = getFormattedFilterRequestBody(mockedFilters);
    expect(formattedFilterRequestBody).toEqual(mockedFormattedFilters);
  });
  it('getCountryCode', () => {
    const countryCode = getCountryCode(mockedCountries[0]);
    expect(countryCode).toEqual('TR');
  });
  it('useDomainOptions', () => {
    const { result } = renderHook(() => useDomainOptions());
    const domainOptions = result.current;
    expect(domainOptions).toEqual(mockedDomainOptions);
  });
});

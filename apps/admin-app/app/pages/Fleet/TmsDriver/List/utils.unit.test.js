import { formatRequestParameters } from './utils';

describe('Fleet/TmsDriver/List/utils', () => {
  it('expectedParams should equal actualParams (only name provided)', () => {
    const fakeName = 'fakeName';
    const filters = {
      name: fakeName,
      statuses: [],
      isActivated: null,
      isLoggedIn: null,
    };
    const expectedParams = { name: fakeName };
    const actualParams = formatRequestParameters(filters);
    expect(expectedParams).toEqual(actualParams);
    expect(actualParams.name).toEqual(fakeName);
  });

  it('expectedParams should equal actualParams (only statuses provided)', () => {
    const statuses = [100, 200];
    const filters = {
      name: '',
      statuses,
      isActivated: null,
      isLoggedIn: null,
    };
    const expectedParams = { statuses };
    const actualParams = formatRequestParameters(filters);
    expect(expectedParams).toEqual(actualParams);
    expect(expectedParams.statuses).toEqual(statuses);
  });

  it('expectedParams should equal actualParams (only isLoggedIn provided)', () => {
    const isLoggedIn = true;
    const filters = {
      name: '',
      statuses: [],
      isActivated: null,
      isLoggedIn,
    };
    const expectedParams = { isLoggedIn: true };
    const actualParams = formatRequestParameters(filters);
    expect(expectedParams).toEqual(actualParams);
    expect(actualParams.isLoggedIn).toEqual(isLoggedIn);
  });

  it('expectedParams should equal actualParams (only isActivated provided)', () => {
    const isActivated = false;
    const filters = {
      name: '',
      statuses: [],
      isActivated,
      isLoggedIn: null,
    };
    const expectedParams = { isActivated: false };
    const actualParams = formatRequestParameters(filters);
    expect(expectedParams).toEqual(actualParams);
    expect(actualParams.isActivated).toEqual(isActivated);
  });
});

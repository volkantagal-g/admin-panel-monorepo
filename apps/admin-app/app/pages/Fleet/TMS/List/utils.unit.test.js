import vehicleListRequestParams from './utils';

describe('Fleet/TMS/List', () => {
  it('receivedReturnValue should equal to expectedReturnValue (without plate in params)', () => {
    const parameters = { currentPage: 1, rowsPerPage: 10 };
    const receivedReturnValue = vehicleListRequestParams(parameters);
    const expectedReturnValue = { limit: 10, offset: 0 };
    expect(receivedReturnValue).toEqual(expectedReturnValue);
    expect(receivedReturnValue.plate).toEqual(undefined);
  });

  it('receivedReturnValue should equal to expectedReturnValue (with plate in params)', () => {
    const fakePlate = '34TEST34';
    const parameters = { currentPage: 2, rowsPerPage: 10, plate: fakePlate };
    const receivedReturnValue = vehicleListRequestParams(parameters);
    const expectedReturnValue = { limit: 10, offset: 10, plate: fakePlate };
    expect(receivedReturnValue).toEqual(expectedReturnValue);
    expect(receivedReturnValue.plate).toEqual(fakePlate);
  });

  it('receivedReturnValue should equal to expectedReturnValue (with dincerId in params)', () => {
    const fakeDincerId = 'fakeId';
    const parameters = { currentPage: 2, rowsPerPage: 10, dincerId: fakeDincerId };
    const receivedReturnValue = vehicleListRequestParams(parameters);
    const expectedReturnValue = { limit: 10, offset: 10, dincerId: fakeDincerId };
    expect(receivedReturnValue).toEqual(expectedReturnValue);
    expect(receivedReturnValue.dincerId).toEqual(fakeDincerId);
  });

  it('receivedReturnValue should equal to expectedReturnValue (with palletCapacity greater than 0)', () => {
    const palletCapacity = 10;
    const parameters = { currentPage: 2, rowsPerPage: 10, palletCapacity };
    const receivedReturnValue = vehicleListRequestParams(parameters);
    const expectedReturnValue = { limit: 10, offset: 10, palletCapacity };
    expect(receivedReturnValue).toEqual(expectedReturnValue);
    expect(receivedReturnValue.palletCapacity).toEqual(palletCapacity);
  });

  it('receivedReturnValue should equal to expectedReturnValue (with volumeCapacity greater than 0)', () => {
    const volumeCapacity = 10;
    const parameters = { currentPage: 2, rowsPerPage: 10, volumeCapacity };
    const receivedReturnValue = vehicleListRequestParams(parameters);
    const expectedReturnValue = { limit: 10, offset: 10, volumeCapacity };
    expect(receivedReturnValue).toEqual(expectedReturnValue);
    expect(receivedReturnValue.volumeCapacity).toEqual(volumeCapacity);
  });

  it('receivedReturnValue should equal to expectedReturnValue (with activeness in params)', () => {
    const activeness = 1;
    const parameters = { currentPage: 2, rowsPerPage: 10, activeness };
    const receivedReturnValue = vehicleListRequestParams(parameters);
    const expectedReturnValue = { limit: 10, offset: 10, activeness };
    expect(receivedReturnValue).toEqual(expectedReturnValue);
    expect(receivedReturnValue.activeness).toEqual(activeness);
  });

  it('receivedReturnValue should equal to expectedReturnValue (with vehicleType in params)', () => {
    const vehicleType = 'fakeVehicleType';
    const parameters = { currentPage: 2, rowsPerPage: 10, vehicleType };
    const receivedReturnValue = vehicleListRequestParams(parameters);
    const expectedReturnValue = { limit: 10, offset: 10, vehicleType };
    expect(receivedReturnValue).toEqual(expectedReturnValue);
    expect(receivedReturnValue.vehicleType).toEqual(vehicleType);
  });
});

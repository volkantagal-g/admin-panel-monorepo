import * as MOCKS from './index.mock.data';

const franchiseEquipmentRightId = '62fe7668726aecc3d8bbf066';
const getFranchiseEquipmentDetailURL = '/franchise-equipment/get-detail';
const updateVehicleCountURL = `/franchise-equipment/vehicleCount/${franchiseEquipmentRightId}`;
const filterEquipmentsUrl = '/franchise-equipment/filter';

const getFranchiseEquipmentDetailConfigMock = {
  url: getFranchiseEquipmentDetailURL,
  method: 'post',
  successData: MOCKS.franchiseEquipmentDetailMock,
};

const updateVehicleCountConfigMock = {
  url: updateVehicleCountURL,
  method: 'put',
  successData: MOCKS.updateVehicleCountMock,
};

const filterFranchiseEquipment = {
  url: filterEquipmentsUrl,
  method: 'post',
  successData: MOCKS.franchiseEquipmentListMock,
};

export default [getFranchiseEquipmentDetailConfigMock, updateVehicleCountConfigMock, filterFranchiseEquipment];

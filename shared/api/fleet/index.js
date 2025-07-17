import axios from '@shared/axios/common';
import { OWNERSHIP_TYPES, BULK_OPERATION_TYPES, DEFAULT_OWNERSHIP_VALUE } from '@app/pages/Fleet/Vehicle/List/constant';
import { parseBoolean } from '@app/pages/Fleet/Vehicle/List/utils';
import { COURIER_TYPE } from '@shared/shared/constants';

export const getAllVehicleConstraints = async ({ fields }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/fleetManagement/getAllVehicleConstraints',
    data: { fields },
  });
  return data;
};

export const getVehicleConstraintsById = async ({ vehicleConstraintId, fields }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/fleetManagement/getVehicleConstraintsById',
    data: { vehicleConstraintId, fields },
  });
  return data;
};

export const createVehicleConstraint = async ({ name, type, constraints }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/fleetManagement/createVehicleConstraint',
    data: { name, type, constraints },
  });
  return data;
};

export const updateVehicleConstraint = async ({ vehicleConstraintId, name, type, constraints }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/fleetManagement/updateVehicleConstraint',
    data: { vehicleConstraintId, name, type, constraints },
  });
  return data;
};

export const filterVehicleConstraints = async ({ status, type, fields, limit, offset }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/fleetManagement/filterVehicleConstraints',
    data: { status, type, fields, limit, offset },
  });
  return data;
};

export const filterVehicleList = async ({ warehouseId, franchiseId, statuses, plate, vehicleConstraintId, limit, offset, populate, withTotalCount }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/fleetManagement/filterVehicle',
    data: { warehouseId, franchiseId, statuses, plate, vehicleConstraintId, limit, offset, populate, withTotalCount },
  });
  return data;
};

export const filterVehicleListV2 = async ({
  warehouseIds, franchiseIds, cities,
  tags, statuses, plate, vehicleConstraintIds, limit, offset, populate, withTotalCount,
}) => {
  const { data } = await axios({
    method: 'POST',
    url: '/fleetManagement/filterVehicleV2',
    data: {
      warehouseIds,
      franchiseIds,
      cities,
      tags,
      statuses,
      plateOrEngineNumber: plate,
      vehicleConstraintIds,
      limit,
      offset,
      populate,
      withTotalCount,
    },
  });
  return data;
};

export const getVehicleLogs = ({ body: { limit, offset, vehicleIds, withTotalCount } }) => {
  return axios({
    method: 'POST',
    url: '/fleetManagement/vehicleLogs',
    data: { limit, offset, vehicleIds, withTotalCount },
  }).then(response => {
    return response.data;
  });
};

export const createVehicle = async formValues => {
  const { data } = await axios({
    method: 'POST',
    url: '/fleetManagement/vehicles',
    data: formValues,
  });
  return data;
};

export const vehicleDetails = async ({ vehicleId, fields }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/fleetManagement/vehicleDetails',
    data: { vehicleId, fields },
  });
  return data;
};

export const updateVehicle = async ({ id, formValues }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/fleetManagement/updateVehicle',
    data: { vehicleId: id, formValues },
  });
  return data;
};

export const filterTmsDrivers = async ({ limit, offset, isActivated, isLoggedIn, statuses, name, fields }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/courierHandler/couriers/filter',
    data: {
      fields,
      limit,
      offset,
      name,
      isActivated,
      isLoggedIn,
      statuses,
      withTotalCount: true,
      courierType: COURIER_TYPE.TMS_DRIVER,
    },
  });
  return data;
};

export const getTmsDriverById = async ({ id, fields }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/courierHandler/couriers/getOne',
    data: { id, fields },
  });
  return data;
};

export const createTmsVehicle = async ({ formValues }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/fleetManagement/tms/create',
    data: { formValues },
  });

  return data;
};

export const getTmsVehicle = async ({ vehicleId }) => {
  const { data } = await axios({
    method: 'POST',
    url: 'fleetManagement/tms/getOne',
    data: { id: vehicleId },
  });

  return data;
};

export const updateTmsVehicle = async ({ vehicleId, formValues }) => {
  const { data } = await axios({
    method: 'POST',
    url: 'fleetManagement/tms/update',
    data: {
      vehicleId,
      formValues,
    },
  });
  return data;
};

export const tmsFilter = async ({ plate, dincerId, palletCapacity, volumeCapacity, activeness, vehicleType, vehicleClass, limit, offset }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/fleetManagement/tms/filter',
    data: { plate, dincerId, palletCapacity, volumeCapacity, activeness, vehicleType, vehicleClass, limit, offset },
  });
  return data;
};

export const tmsDelete = async ({ id }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/fleetManagement/tms/delete',
    data: { id },
  });
  return data;
};

export const activateVehicleConstraint = async ({ id }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/fleetManagement/vehicle-constraints/activate',
    data: { id },
  });
  return data;
};

export const inactivateVehicleConstraint = async ({ id }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/fleetManagement/vehicle-constraints/inactivate',
    data: { id },
  });
  return data;
};

/**
 * Uploads new or updated vehicle list with csv.
 * @param {string} callType - It defines whether list created or not. You can check BULK_OPERATION_TYPES this constant to reach status.
 * @param {Array} vehicles - It accepts array of objects.
 */
export const bulkCreateOrUpdateVehicle = async ({ callType, vehicles }) => {
  const bodyData = callType === BULK_OPERATION_TYPES.CREATION ? vehicles.map(obj => ({
    vehicleType: obj.vehicleType,
    plate: obj.plate,
    city: obj.city,
    tags: obj.tags.split(' '),
    country: obj.countryId,
    warehouse: obj.warehouseId,
    franchise: obj.franchiseId,
    ownershipType: Object.values(OWNERSHIP_TYPES).includes(obj.ownershipStatus) ? obj.ownershipStatus : DEFAULT_OWNERSHIP_VALUE,
    firstRegistrationDate: obj.firstRegistry,
    inspectionValidityDate: obj.inspectionValidityDate,
  })) : vehicles.map(obj => ({
    plate: obj.plate,
    active: parseBoolean(obj.active),
  }));

  const { data } = await axios({
    method: 'POST',
    url: '/fleetManagement/bulkCreateUpdateVehicle',
    data: {
      callType,
      vehicles: bodyData,
    },
  });
  return data;
};

import axios from '@shared/axios/common';

import { MAIN_WAREHOUSE_TYPE, NONAGREEMENT_WAREHOUSE_TYPE } from '@shared/shared/constants';

export const getWarehouses = ({ country, city, domainTypes }) => {
  const requestBody = {};
  if (country) {
    requestBody.country = country;
  }
  if (city) {
    requestBody.city = city;
  }
  if (domainTypes) {
    requestBody.domainTypes = domainTypes;
  }

  return axios({
    method: 'POST',
    url: '/warehouse/getWarehouses',
    data: requestBody,
  }).then(response => {
    return response.data;
  });
};

export const getWarehouseShipmentFrequencies = ({ warehouseId }) => {
  return axios({
    method: 'POST',
    url: '/warehouse/getWarehouseShipmentFrequencies',
    data: { warehouseId },
  }).then(response => {
    return response.data;
  });
};

export const getWarehouseShipmentPreparations = ({ warehouseId }) => {
  return axios({
    method: 'POST',
    url: '/warehouse/getWarehouseShipmentPreparations',
    data: { warehouseId },
  }).then(response => {
    return response.data;
  });
};

export const getShipmentFrequencies = () => {
  return axios({
    method: 'POST',
    url: '/warehouse/getShipmentFrequencies',
    data: {},
  }).then(response => {
    return response.data;
  });
};

export const getShipmentPreparations = () => {
  return axios({
    method: 'POST',
    url: '/warehouse/getShipmentPreparations',
    data: {},
  }).then(response => {
    return response.data;
  });
};

export const addWarehouseShipmentFrequency = ({ warehouseId, shipmentFrequency }) => {
  return axios({
    method: 'POST',
    url: '/warehouse/addWarehouseShipmentFrequency',
    data: { warehouseId, shipmentFrequency },
  }).then(response => {
    return response.data;
  });
};

export const updateWarehouseShipmentFrequency = ({ warehouseId, shipmentFrequency }) => {
  return axios({
    method: 'POST',
    url: '/warehouse/updateWarehouseShipmentFrequency',
    data: { warehouseId, shipmentFrequency },
  }).then(response => {
    return response.data;
  });
};

export const addWarehouseShipmentPreparation = ({ warehouseId, shipmentPreparation }) => {
  return axios({
    method: 'POST',
    url: '/warehouse/addWarehouseShipmentPreparation',
    data: { warehouseId, shipmentPreparation },
  }).then(response => {
    return response.data;
  });
};

export const updateWarehouseShipmentPreparation = ({ warehouseId, shipmentPreparation }) => {
  return axios({
    method: 'POST',
    url: '/warehouse/updateWarehouseShipmentPreparation',
    data: { warehouseId, shipmentPreparation },
  }).then(response => {
    return response.data;
  });
};

export const getActiveWarehouses = ({ city, domainTypes }) => {
  const requestBody = {};
  if (city) {
    requestBody.city = city;
  }
  if (domainTypes) {
    requestBody.domainTypes = domainTypes;
  }

  return axios({
    method: 'POST',
    url: '/warehouse/getActiveWarehouses',
    data: requestBody,
  }).then(response => {
    return response.data;
  });
};

export const getFilteredWarehouses = async (
  { domainTypes, cities, states, statuses, warehouseTypes, name, SAPReferenceCodes, warehouseIds, limit, offset, fields, populate },
) => {
  const { data = [] } = await axios({
    method: 'POST',
    url: '/warehouse/getFilteredWarehouses',
    data: {
      domainTypes,
      cities,
      states,
      statuses,
      warehouseTypes,
      name,
      SAPReferenceCodes,
      warehouseIds,
      limit,
      offset,
      fields,
      populate,
    },
  });
  return data;
};

export const getFilteredWarehousesForDivision = async (
  { cities, domainTypes, fields },
) => {
  const { data = [] } = await axios({
    method: 'POST',
    url: '/warehouse/getFilteredWarehousesForPermittedDivisionCountries',
    data: { cities, domainTypes, fields },
  });
  return data;
};

export const getWarehouseById = ({ id }) => {
  return axios({
    method: 'POST',
    url: '/warehouse/getWarehouse',
    data: { id },
  }).then(response => {
    return response.data;
  });
};

export const getWarehouseInfoForWarehouseBasedLiveMap = ({ id }) => {
  return axios({
    method: 'POST',
    url: '/warehouse/getWarehouseInfoForWarehouseBasedLiveMap',
    data: { id },
  }).then(response => {
    return response.data;
  });
};

export const createWarehouse = ({ warehouse }) => {
  return axios({
    method: 'POST',
    url: '/warehouse/createWarehouse',
    data: { warehouse },
  }).then(response => {
    return response.data;
  });
};

export const updateWarehouseInfo = ({ id, updateData }) => {
  return axios({
    method: 'POST',
    url: '/warehouse/updateWarehouseInfo',
    data: {
      id,
      updateData,
    },
  }).then(response => {
    return response.data;
  });
};

export const updateTransferReceiving = async ({ id, updateData }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/warehouse/updateTransferReceivingWindows',
    data: {
      id,
      updateData,
    },
  });
  return data;
};

export const updateWarehouseBudgetInfo = async ({ SAPReferenceCode, updatedBudgetInfoData }) => {
  const { data } = await axios({
    method: 'POST',
    url: `/franchiseEarnings/${SAPReferenceCode}/update-warehouse-budget-info`,
    data: updatedBudgetInfoData,
  });
  return data;
};

export const updateWarehouseGLN = ({ id, warehouseGLN }) => {
  return axios({
    method: 'PUT',
    url: '/warehouse/updateWarehouseGLN',
    data: { warehouseId: id, warehouseGLN },
  }).then(response => {
    return response.data;
  });
};

export const updateWarehouseTestStatus = ({ id, isTestWarehouse }) => {
  return axios({
    method: 'POST',
    url: '/warehouse/updateTestWarehouseFlag',
    data: { warehouseId: id, isTestWarehouse },
  }).then(response => {
    return response.data;
  });
};

export const updateWarehouseAcceptReturns = ({ id, acceptReturns }) => {
  return axios({
    method: 'POST',
    url: '/warehouse/updateWarehouseAcceptReturnsFlag',
    data: { warehouseId: id, acceptReturns },
  }).then(response => {
    return response.data;
  });
};

export const updateWarehouseManpower = ({ id, updateData }) => {
  return axios({
    method: 'POST',
    url: '/warehouse/updateManHourFeeGroup',
    data: {
      id,
      updateData,
    },
  }).then(response => {
    return response.data;
  });
};

export const updateWarehouseAddress = ({ id, updateData }) => {
  return axios({
    method: 'POST',
    url: '/warehouse/updateAddress',
    data: {
      id,
      updateData,
    },
  }).then(response => {
    return response.data;
  });
};

export const updateWarehouseType = ({ id, updateData }) => {
  return axios({
    method: 'POST',
    url: '/warehouse/updateWarehouseType',
    data: {
      id,
      updateData,
    },
  }).then(response => {
    return response.data;
  });
};

export const updateWarehouseDomainTypes = ({ id, updateData }) => {
  return axios({
    method: 'POST',
    url: '/warehouse/updateWarehouseDomainTypes',
    data: {
      id,
      updateData,
    },
  }).then(response => {
    return response.data;
  });
};

export const updateWarehouseMainStore = ({ id, updateData }) => {
  return axios({
    method: 'POST',
    url: '/warehouse/updateMainStore',
    data: {
      id,
      updateData,
    },
  }).then(response => {
    return response.data;
  });
};

export const updateWarehouseBusinessDecisions = ({ id, updateData }) => {
  return axios({
    method: 'POST',
    url: '/warehouse/updateWarehouseBusinessDecisions',
    data: {
      id,
      updateData,
    },
  }).then(response => {
    return response.data;
  });
};

export const updateWarehouseConfig = ({ id, updateData }) => {
  return axios({
    method: 'POST',
    url: '/warehouse/updateWarehouseConfig',
    data: {
      id,
      updateData,
    },
  }).then(response => {
    return response.data;
  });
};

export const updateWarehouseStatus = ({ id, updateData }) => {
  return axios({
    method: 'POST',
    url: '/warehouse/updateWarehouseStatus',
    data: {
      id,
      updateData,
    },
  }).then(response => {
    return response.data;
  });
};

export const unassignFranchise = ({ id, franchiseId }) => {
  return axios({
    method: 'POST',
    url: '/warehouse/unassignFranchise',
    data: {
      id,
      franchiseId,
    },
  }).then(response => {
    return response.data;
  });
};

export const assignFranchise = ({ id, franchiseId }) => {
  return axios({
    method: 'POST',
    url: '/warehouse/assignFranchise',
    data: {
      id,
      franchiseId,
    },
  }).then(response => {
    return response.data;
  });
};

export const archiveWarehouse = ({ id }) => {
  return axios({
    method: 'POST',
    url: '/warehouse/archiveWarehouse',
    data: { id },
  }).then(response => {
    return response.data;
  });
};

export const deactivateWarehouse = ({ id }) => {
  return axios({
    method: 'POST',
    url: '/warehouse/deactivateWarehouse',
    data: { id },
  }).then(response => {
    return response.data;
  });
};

export const activateWarehouse = ({ id }) => {
  return axios({
    method: 'POST',
    url: '/warehouse/activateWarehouse',
    data: { id },
  }).then(response => {
    return response.data;
  });
};

export const updateBaseWorkingHoursType = ({ id, updateData }) => {
  return axios({
    method: 'POST',
    url: '/warehouse/updateBaseWorkingHoursType',
    data: {
      id,
      updateData,
    },
  }).then(response => {
    return response.data;
  });
};

export const updateBasePeakHoursType = ({ id, updateData }) => {
  return axios({
    method: 'POST',
    url: '/warehouse/updateBasePeakHoursType',
    data: {
      id,
      updateData,
    },
  }).then(response => {
    return response.data;
  });
};

export const getMainStores = () => {
  return axios({
    method: 'POST',
    url: '/warehouse/getFilteredWarehouses',
    data: { warehouseTypes: [MAIN_WAREHOUSE_TYPE] },
  }).then(response => {
    return response.data;
  });
};

export const getNonagreementWarehouses = async () => {
  const response = await axios({
    method: 'POST',
    url: 'warehouse/getFilteredWarehouses',
    data: { warehouseTypes: [NONAGREEMENT_WAREHOUSE_TYPE] },
  });

  return response.data;
};

export const updateAlgorithmConfig = async ({ warehouseId, algorithmConfig }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/warehouse/assignAlgorithmConfig',
    data: { warehouseId, algorithmConfig },
  });
  return data;
};

export const getWarehouseSegments = async ({ name, types, isDefault, startDate, endDate, limit, offset }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/warehouse/filterSegments',
    data: {
      name,
      types,
      isDefault,
      startDate,
      endDate,
      limit,
      offset,
    },
  });
  return data;
};

export const getWarehouseSegmentDetail = async ({ segmentId }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/warehouse/getSegment',
    data: { segmentId },
  });
  return data;
};

export const updateWarehouseDeliveryFeeSegment = async ({ warehouseId, segmentId }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/warehouse/updateDeliveryFeeSegment',
    data: {
      warehouseId,
      segmentId,
    },
  });
  return data;
};

export const updateWarehouseSegment = async ({ name, isDefault, segmentId }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/warehouse/updateSegment',
    data: { name, isDefault, segmentId },
  });
  return data;
};

export const updateWarehouseProductPricingSegment = async ({ warehouseId, segmentId }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/warehouse/updateProductPricingSegment',
    data: {
      warehouseId,
      segmentId,
    },
  });
  return data;
};

export const getWarehousesBySegmentId = async ({ segmentId, type, limit, offset }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/warehouse/filterBySegment',
    data: { segmentId, type, limit, offset },
  });
  return data;
};

export const createWarehouseSegment = async ({ name, type, isDefault }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/warehouse/createSegment',
    data: { name, type, isDefault },
  });
  return data;
};

export const triggerProductPricingSegmentMatching = async ({ fileName }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/warehouse/matchProductPricingSegment',
    data: { fileName },
  });
  return data;
};

export const triggerDeliveryFeeSegmentMatching = async ({ fileName }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/warehouse/matchDeliveryFeeSegment',
    data: { fileName },
  });
  return data;
};

export const getUploadSignedUrlDeliveryFee = async ({ contentType, fileName }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/warehouse/getUploadSignedUrlDeliveryFee',
    data: {
      contentType,
      fileName,
    },
  });
  return data;
};

export const getUploadSignedUrlProductPricing = async ({ contentType, fileName }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/warehouse/getUploadSignedUrlProductPricing',
    data: {
      contentType,
      fileName,
    },
  });
  return data;
};

export const getWarehouseSegmentReport = async ({ name, types, isDefault, startDate, endDate, lang }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/warehouse/getSegmentReport',
    data: {
      name,
      types,
      isDefault,
      startDate,
      endDate,
      lang,
    },
  });
  return data;
};

export const uploadBulkDeliveryFees = async deliveryFees => {
  const { data } = await axios({
    method: 'POST',
    url: '/warehouse/updateDeliveryFee',
    data: deliveryFees,
  });
  return data;
};

export const uploadBulkServiceFees = async serviceFees => {
  const { data } = await axios({
    method: 'POST',
    url: '/warehouse/updateServiceFee',
    data: serviceFees,
  });
  return data;
};

export const updateWarehousePromoAggressionLevel = async ({ id, updateData }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/warehouse/updateCustomAggressionLevel',
    data: {
      id,
      updateData: { customAggressionLevel: updateData.promoAggressionLevel },
    },
  });
  return data;
};

export const assignFranchiseArea = async ({ warehouseId, franchiseAreaId }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/warehouse/assign-franchise-area',
    data: { warehouseId, franchiseAreaId },
  });
  return data;
};

export const getSAPDraftWarehouses = async () => {
  const { data } = await axios({
    method: 'GET',
    url: '/warehouse/bindings/getDrafts',
  });
  return data;
};

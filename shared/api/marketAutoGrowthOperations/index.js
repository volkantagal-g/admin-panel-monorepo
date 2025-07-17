import axios from '@shared/axios/common';
import { ALL_WAREHOUSES_OPTION_VALUE } from '@app/pages/MarketAutoGrowthOperations/constants';

export const getDomain = async () => {
  const response = await axios({
    method: 'GET',
    url: 'marketAutoGrowthOperations/getDomain',
    json: true,
  });
  return response.data;
};

export const getWarehouseType = async ({ domainType }) => {
  const response = await axios({
    method: 'POST',
    url: 'marketAutoGrowthOperations/getWarehouseType',
    data: { domainType },
    json: true,
  });
  return response.data;
};

export const getPromoset = async ({ domainType, warehouseType, promoObjectiveType }) => {
  const response = await axios({
    method: 'POST',
    url: 'marketAutoGrowthOperations/getPromoset',
    data: { domainType, warehouseType, promoObjectiveType },
    json: true,
  });
  return response.data;
};

export const getPromocode = async ({ domainType, warehouseType, promoObjectiveType }) => {
  const response = await axios({
    method: 'POST',
    url: 'marketAutoGrowthOperations/getPromocode',
    data: { domainType, warehouseType, promoObjectiveType },
    json: true,
  });
  return response.data;
};

export const insertPacketConfig = async ({
  domainType,
  warehouseType,
  promoObjectiveType,
  bucketType,
  packet,
  secondPacket,
  active,
}) => {
  const response = await axios({
    method: 'POST',
    url: 'marketAutoGrowthOperations/insertPacketConfig',
    data: { domainType, warehouseType, promoObjectiveType, bucketType, packet, secondPacket, active },
    json: true,
  });
  return response.data;
};

export const promosetConfigUpdate = async ({ domainType, warehouseType, promoObjectiveType, updateData }) => {
  const response = await axios({
    method: 'POST',
    url: 'marketAutoGrowthOperations/promosetConfigUpdate',
    data: { domainType, warehouseType, promoObjectiveType, updateData },
    json: true,
  });
  return response.data;
};

export const getTargets = async ({ domainType, year, month, warehouseType }) => {
  const response = await axios({
    method: 'POST',
    url: 'marketAutoGrowthOperations/getWarehouseTypeTargets',
    data: {
      domainType,
      year,
      month,
      ...{ warehouseType: warehouseType === ALL_WAREHOUSES_OPTION_VALUE ? undefined : warehouseType },
    },
    json: true,
  });
  return response.data;
};

export const insertTargetConfig = async ({ domainType, year, month, updateData, warehouseType }) => {
  await axios({
    method: 'POST',
    url: 'marketAutoGrowthOperations/insertWarehouseTypeTargetConfig',
    data: {
      domainType,
      year,
      month,
      updateData,
      ...{ warehouseType: warehouseType === ALL_WAREHOUSES_OPTION_VALUE ? undefined : warehouseType },
    },
    json: true,
  });
};

export const importTargetsCSV = async ({ domainType, year, month, updateData }) => {
  await axios({
    method: 'POST',
    url: 'marketAutoGrowthOperations/importTargetsCsv',
    data: {
      domainType,
      year,
      month,
      updateData,
    },
    json: true,
  });
};

export const exportTargetsCSV = async ({ domainType, year, month }) => {
  const response = await axios({
    method: 'POST',
    url: 'marketAutoGrowthOperations/exportTargetsCsv',
    data: {
      domainType,
      year,
      month,
    },
    json: true,
  });
  return response.data;
};

export const getPackets = async ({ domainType }) => {
  const response = await axios({
    method: 'POST',
    url: 'marketAutoGrowthOperations/getPackets',
    data: { domainType },
    json: true,
  });
  return response.data;
};

export const getHourTypes = async ({ domainType }) => {
  const response = await axios({
    method: 'POST',
    url: 'marketAutoGrowthOperations/getHourTypes',
    data: { domainType },
    json: true,
  });
  return response.data;
};

export const getDayTypes = async ({ domainType }) => {
  const response = await axios({
    method: 'POST',
    url: 'marketAutoGrowthOperations/getDayTypes',
    data: { domainType },
    json: true,
  });
  return response.data;
};

export const packetConfigUpdate = async ({ domainType, updateData }) => {
  const response = await axios({
    method: 'POST',
    url: 'marketAutoGrowthOperations/packetConfigUpdate',
    data: { domainType, updateData },
    json: true,
  });
  return response.data;
};

export const getActions = async ({ domainType }) => {
  const response = await axios({
    method: 'POST',
    url: 'marketAutoGrowthOperations/getActions',
    data: { domainType },
    json: true,
  });
  return response.data;
};

export const getPacketList = async ({ domainType }) => {
  const response = await axios({
    method: 'POST',
    url: 'marketAutoGrowthOperations/getPacketList',
    data: { domainType },
    json: true,
  });
  return response.data;
};

export const getWarehouseList = async ({ domainType }) => {
  const response = await axios({
    method: 'POST',
    url: 'marketAutoGrowthOperations/getWarehouseList',
    data: { domainType },
    json: true,
  });
  return response.data;
};

export const actionConfigUpdate = async ({ domainType, updateData }) => {
  const response = await axios({
    method: 'POST',
    url: 'marketAutoGrowthOperations/actionConfigUpdate',
    data: { domainType, updateData },
    json: true,
  });
  return response.data;
};

export const logUpdates = async ({ domainType, userName, userId, userMail, tableType, changeReason, error, params }) => {
  const response = await axios({
    method: 'POST',
    url: 'marketAutoGrowthOperations/logUpdates',
    data: { domainType, userName, userId, userMail, tableType, changeReason, error, params },
    json: true,
  });
  return response.data;
};

export const getLimits = async ({ domainType }) => {
  const response = await axios({
    method: 'POST',
    url: 'marketAutoGrowthOperations/getLimits',
    data: { domainType },
    json: true,
  });
  return response.data;
};

export const getLimitDayTypes = async ({ domainType }) => {
  const response = await axios({
    method: 'POST',
    url: 'marketAutoGrowthOperations/getLimitDayTypes',
    data: { domainType },
    json: true,
  });
  return response.data;
};

export const getLimitMetrics = async ({ domainType }) => {
  const response = await axios({
    method: 'POST',
    url: 'marketAutoGrowthOperations/getLimitMetrics',
    data: { domainType },
    json: true,
  });
  return response.data;
};

export const getLimitPromoTypes = async ({ domainType }) => {
  const response = await axios({
    method: 'POST',
    url: 'marketAutoGrowthOperations/getLimitPromoTypes',
    data: { domainType },
    json: true,
  });
  return response.data;
};

export const getTresholdTypes = async ({ domainType }) => {
  const response = await axios({
    method: 'POST',
    url: 'marketAutoGrowthOperations/getTresholdTypes',
    data: { domainType },
    json: true,
  });
  return response.data;
};

export const limitConfigUpdate = async ({ domainType, updateData }) => {
  const response = await axios({
    method: 'POST',
    url: 'marketAutoGrowthOperations/limitConfigUpdate',
    data: { domainType, updateData },
    json: true,
  });
  return response.data;
};

export const getChangeReasons = async () => {
  const response = await axios({
    method: 'GET',
    url: 'marketAutoGrowthOperations/getChangeReasons',
    json: true,
  });
  return response.data;
};

export const getLimitWarehouseList = async ({ domainType }) => {
  const response = await axios({
    method: 'POST',
    url: 'marketAutoGrowthOperations/getLimitWarehouseList',
    data: { domainType },
    json: true,
  });
  return response.data;
};

export const getLimitEffectList = async ({ domainType }) => {
  const response = await axios({
    method: 'POST',
    url: 'marketAutoGrowthOperations/getLimitEffectList',
    data: { domainType },
    json: true,
  });
  return response.data;
};

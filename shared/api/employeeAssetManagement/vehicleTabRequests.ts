import { isDate, isNumber } from 'lodash';

import axios from '@shared/axios/common';

const BASE_URL = '/employeeAssetManagement';

export interface ICreateVehicleComplianceRecord {
  asset: MongoIDType;
  type: number;
  startDate: Date;
  endDate: Date;
  documentFileKey?: string;
}
export const createVehicleComplianceRecord = async ({ asset, type, startDate, endDate, documentFileKey }: ICreateVehicleComplianceRecord) => {
  const { data } = await axios.post(`${BASE_URL}/createVehicleComplianceRecord`, {
    asset,
    type,
    startDate,
    endDate,
    documentFileKey,
  });

  return data;
};

export type IFilterVehicleComplianceRecords = {
  fields?: string;
  asset?: MongoIDType[];
  type?: number[];
  startDate?: Date;
  endDate?: Date;
}
export const filterVehicleComplianceRecords = async ({ fields, asset, type, startDate, endDate }: IFilterVehicleComplianceRecords) => {
  const { data } = await axios.post(`${BASE_URL}/filterVehicleComplianceRecords`, {
    fields,
    asset,
    type,
    startDate,
    endDate,
  });

  return data;
};

export type IUpdateVehicleComplianceRecord = {
  vehicleComplianceRecordId: MongoIDType;
  updateData: {
    startDate: Date;
    endDate: Date;
    documentFileKey?: string;
  }
}
export const updateVehicleComplianceRecord = async ({ vehicleComplianceRecordId, updateData }: IUpdateVehicleComplianceRecord) => {
  const { startDate, endDate, documentFileKey } = updateData;

  const { data } = await axios.post(`${BASE_URL}/updateVehicleComplianceRecord/${vehicleComplianceRecordId}/update`, {
    ...(isDate(startDate) ? { startDate } : undefined),
    ...(isDate(endDate) ? { endDate } : undefined),
    ...(documentFileKey ? { documentFileKey } : undefined),
  });
  return data;
};

export type IDeleteVehicleComplianceRecord = {
  vehicleComplianceRecordId: MongoIDType;
}
export const deleteVehicleComplianceRecord = async ({ vehicleComplianceRecordId }: IDeleteVehicleComplianceRecord) => {
  const { data } = await axios.post(`${BASE_URL}/deleteVehicleComplianceRecord/${vehicleComplianceRecordId}/delete`);
  return data;
};

export const getVehicleDamageRecords = async ({ assetId }: { assetId: MongoIDType }) => {
  const { data } = await axios.post(`${BASE_URL}/filterDamageRecords`, { assetIds: [assetId] });
  return data;
};

export type ICreateVehicleDamageRecord = {
  assetId: MongoIDType;
  detectionDate: Date;
  description: string;
  documentFileKey?: string;
}

export const createVehicleDamageRecords = async ({ vehicleDamageRecord }: { vehicleDamageRecord: ICreateVehicleDamageRecord }) => {
  const { data } = await axios.post(`${BASE_URL}/createDamageRecord`, { ...vehicleDamageRecord });
  return data;
};

export type IUpdateVehicleDamageRecord = {
  vehicleDamageRecordId: MongoIDType;
  updateData: {
    detectionDate: Date;
    description: string;
    documentFileKey?: string;
  }
}

export const updateVehicleDamageRecord = async (
  { vehicleDamageRecordId, updateData }:{ vehicleDamageRecordId: MongoIDType, updateData: IUpdateVehicleDamageRecord },
) => {
  const { data } = await axios.post(`${BASE_URL}/updateDamageRecord/${vehicleDamageRecordId}/update`, updateData);
  return data;
};

export const deleteVehicleDamageRecord = async ({ vehicleDamageRecordId }: { vehicleDamageRecordId: MongoIDType }) => {
  const { data } = await axios.post(`${BASE_URL}/deleteDamageRecord`, { damageRecordId: vehicleDamageRecordId });
  return data;
};

export const getTrafficPenaltyRecords = async ({ assetId }: { assetId: MongoIDType }) => {
  const { data } = await axios.post(`${BASE_URL}/filterTrafficPenalties`, { assetIds: [assetId] });
  return data;
};

export type ICreateTrafficPenaltyRecord = {
  assetId: MongoIDType;
  penaltyDate: Date;
  documentFileKey?: string;
}

export const createTrafficPenaltyRecords = async ({ trafficPenaltyRecord }: { trafficPenaltyRecord: ICreateTrafficPenaltyRecord }) => {
  const { data } = await axios.post(`${BASE_URL}/createTrafficPenalty`, { ...trafficPenaltyRecord });
  return data;
};

export type IUpdateTrafficPenaltyRecord = {
  vehicleTrafficPenaltyId: MongoIDType;
  updateData: {
    detectionDate: Date;
    description: string;
    documentFileKey?: string;
  }
}

export const updateTrafficPenaltyRecord = async (
  { trafficPenaltyRecordId, updateData }:{ trafficPenaltyRecordId: MongoIDType, updateData: IUpdateTrafficPenaltyRecord },
) => {
  const { data } = await axios.post(`${BASE_URL}/updateTrafficPenalty`, { ...updateData, trafficPenaltyId: trafficPenaltyRecordId });
  return data;
};

export const deleteTrafficPenaltyRecord = async ({ trafficPenaltyRecordId }: { trafficPenaltyRecordId: MongoIDType }) => {
  const { data } = await axios.post(`${BASE_URL}/deleteTrafficPenalty`, { trafficPenaltyId: trafficPenaltyRecordId });
  return data;
};

export type IEquipmentInformation = {
    assetIds: MongoIDType[];
}
export const getEquipmentInformation = async ({ assetIds }: IEquipmentInformation) => {
  const { data } = await axios.post(`${BASE_URL}/filterVehicleEquipments`, { assetIds });
  return data;
};

export type IUpdateEquipmentInformationRecord = {
  equipmentInformationId: MongoIDType;
  updateData: {
    equipments?: string[];
    trackingDeviceStatus?: number;
    tireType?: string;
    assetIds?: MongoIDType[];
    assetId?: MongoIDType;
  }
}
export const updateEquipmentInformationRecord = async ({ equipmentInformationId, updateData }: IUpdateEquipmentInformationRecord) => {
  const { equipments, trackingDeviceStatus, tireType } = updateData;

  const { data } = await axios.patch(`${BASE_URL}/updateVehicleEquipment/${equipmentInformationId}/update`, {
    ...(equipments ? { equipments } : undefined),
    ...(isNumber(trackingDeviceStatus) ? { trackingDeviceStatus } : undefined),
    ...(tireType ? { tireType } : undefined),
    ...(updateData.assetIds ? { assetIds: updateData.assetIds } : undefined),
  });
  return data;
};

export const createEquipmentInformationRecord = async ({ assetId, data }: { assetId: MongoIDType, data: VehicleEquipmentInformation }) => {
  return axios.post(`${BASE_URL}/createVehicleEquipment`, { assetId, ...data });
};

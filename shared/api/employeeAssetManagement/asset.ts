import axios from '@shared/axios/common';

export async function getAssetTypeById({ assetId }: { assetId: MongoIDType }): Promise<{ assets: [] }> {
  const { data } = await axios.post(`/employeeAssetManagement/getAssetType/${assetId}`);
  return data;
}

export async function getAssetById({ assetId }: { assetId: MongoIDType }): Promise<{ assets: [] }> {
  const { data } = await axios.get(`/employeeAssetManagement/assets/${assetId}/getAssetById`);
  return data;
}

export async function updateAsset({ assetId, updateData, type }: { assetId: MongoIDType, updateData: any, type: string }): Promise<{ assets: [] }> {
  const { data } = await axios.post(`/employeeAssetManagement/assets/${assetId}/update`, {
    updateData,
    type,
  });
  return data;
}

export async function createAsset(asset: any) {
  const { data } = await axios.post('/employeeAssetManagement/createAsset', asset);
  return data;
}

export async function uploadDocument({
  fileName,
  folderPath,
  contentType,
}: { fileName: string, folderPath: string, contentType: string}): Promise<{ assets: [] }> {
  const { data } = await axios.post(
    '/employeeAssetManagement/getSignedUploadUrl',
    {
      fileName,
      folderPath,
      contentType,
    },
  );
  return data;
}

export async function getSignedUrl({ fileKey }: { fileKey: string}): Promise<{ assets: [] }> {
  const { data } = await axios.post(
    '/employeeAssetManagement/getSignedUrl',
    { fileKey },
  );
  return data;
}

export async function getFilteredVehicleAssets({ updatedPayload }: { updatedPayload: any }): Promise<{ assets: [] }> {
  const { data } = await axios.post('/employeeAssetManagement/assets/filterVehicle', updatedPayload);
  return data;
}

export async function getControlNeededVehicles({ filters }: { filters: any }): Promise<{ assets: [] }> {
  const { data } = await axios.post('/employeeAssetManagement/controlNeededVehicleComplianceRecords', filters);
  return data;
}

export type AssignAssetParams = {
  assetId: MongoIDType;
  employeeId: MongoIDType;
  assignmentStartDate: string;
  assignmentEndDate: string;
  note: string;
  assignmentPeriodType: string;
};

export async function assignAsset({
  assetId,
  employeeId,
  assignmentStartDate,
  assignmentEndDate,
  note,
  assignmentPeriodType,
}: AssignAssetParams): Promise<{ assets: [] }> {
  const { data } = await axios.post(
    `/employeeAssetManagement/assets/${assetId}/assign`,
    {
      employeeId,
      assignmentStartDate,
      assignmentEndDate,
      note,
      assignmentPeriodType,
    },
  );
  return data;
}

export type UnassignAssetParams = {
  assetId: MongoIDType;
  assignmentReturnDate: string;
  note: string;
  assignableStatus: number,
  assignableStatusReason?: number,
};

export async function unassignAsset({
  assetId,
  assignmentReturnDate,
  assignableStatus,
  assignableStatusReason,
  note,
}: UnassignAssetParams): Promise<{ assets: [] }> {
  const { data } = await axios.post(
    `/employeeAssetManagement/assets/${assetId}/unassign`,
    {
      assignmentReturnDate,
      assignableStatus,
      assignableStatusReason,
      note,
    },
  );
  return data;
}

export type GetAssigneesOfAssetParams = {
  asset: MongoIDType;
};

export async function getAssigneesOfAsset({ asset }: GetAssigneesOfAssetParams): Promise<{ assetHistories: [] }> {
  const { data } = await axios.post(`/employeeAssetManagement/assets/${asset}/getAssignees`, {});
  return data;
}

export type GetUpdateAssetHistoryParams = {
  historyId: MongoIDType;
  updateData: {
    assignmentPeriodType: string;
    estimatedReturnDate: Date;
  }
};

export async function updateAssetHistory({ historyId, updateData }: GetUpdateAssetHistoryParams): Promise<{ assetHistories: [] }> {
  const { data } = await axios.post(`/employeeAssetManagement/assetsHistory/${historyId}/update`, { ...updateData });
  return data;
}

export type filterParams = { langKey: string };
export async function filterAndExportAsExcel(payload: filterParams) {
  const { data } = await axios.post('/employeeAssetManagement/assets/export/filterAndExportAsExcel', payload);
  return data;
}

// getFilteredLogs

export async function getFilteredLogs({ updatedPayload }: { updatedPayload: any }): Promise<{ assets: [] }> {
  const { data } = await axios.post('/employeeAssetManagement/filterAssetChangeLogs', updatedPayload);
  return data;
}

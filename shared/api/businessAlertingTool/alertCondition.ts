import axios from '@shared/axios/common';

const baseUrl = '/businessAlertingTool/alertCondition';

export async function filterAlertConditions({
  statuses,
  createdBy,
  permittedRoles,
  notificationChannels,
  createdAtRangeStart,
  createdAtRangeEnd,
  searchTerm,
  limit,
  offset,
}: { [x: string]: any }): Promise<{ alertConditions: AlertCondition[] }> {
  const { data } = await axios.post(`${baseUrl}/filterAlertConditions`, {
    statuses,
    createdBy,
    permittedRoles,
    notificationChannels,
    createdAtRangeStart,
    createdAtRangeEnd,
    searchTerm,
    limit,
    offset,
  });

  return data;
}

export async function getAlertConditionById({ conditionId }: { conditionId: MongoIDType }): Promise<AlertCondition> {
  const { data } = await axios.post(`${baseUrl}/getAlertConditionById`, { conditionId });

  return data;
}

export async function createAlertCondition({ alertCondition }: { [x: string]: any }): Promise<AlertCondition> {
  const { data } = await axios.post(`${baseUrl}/createAlertCondition`, { alertCondition });

  return data;
}

export async function activateAlertCondition({ conditionId }: { conditionId: MongoIDType }): Promise<{ success: boolean}> {
  const { data } = await axios.post(`${baseUrl}/activateAlertCondition`, { conditionId });

  return data;
}

export async function deactivateAlertCondition({ conditionId }: { conditionId: MongoIDType }): Promise<{ success: boolean}> {
  const { data } = await axios.post(`${baseUrl}/deactivateAlertCondition`, { conditionId });

  return data;
}

export async function updateAlertConditionMetadata({ conditionId, name, description }: AlertCondition): Promise<{ success: boolean}> {
  const { data } = await axios.post(`${baseUrl}/updateAlertConditionMetadata`, { conditionId, name, description });

  return data;
}

export async function updateAlertConditionPermittedRoles({ conditionId, permittedRoles }: AlertCondition): Promise<{ success: boolean}> {
  const { data } = await axios.post(`${baseUrl}/updateAlertConditionPermittedRoles`, { conditionId, permittedRoles });

  return data;
}

export async function updateAlertConditionNotificationPreferences(
  { conditionId, notificationPreferences }: AlertCondition,
): Promise<{ success: boolean }> {
  const { data } = await axios.post(`${baseUrl}/updateAlertConditionNotificationPreferences`, { conditionId, notificationPreferences });

  return data;
}

export async function updateAlertConditionQuery(
  { conditionId, queryInfo, conditions }: AlertCondition,
): Promise<{ success: boolean}> {
  const { data } = await axios.post(`${baseUrl}/updateAlertConditionQuery`, { conditionId, queryInfo, conditions });

  return data;
}

import axios from '@shared/axios/common';

const baseUrl = '/businessAlertingTool/incident';

export async function filterIncidents({
  statuses,
  priority,
  createdAtRangeStart,
  createdAtRangeEnd,
  alertConditions,
  limit,
  offset,
  sortKey,
  sortDirection,
}: { [x: string]: any }): Promise<{ incidents: Incident[] }> {
  const { data } = await axios.post(`${baseUrl}/filterIncidents`, {
    statuses,
    priority,
    createdAtRangeStart,
    createdAtRangeEnd,
    alertConditions,
    limit,
    offset,
    sortKey,
    sortDirection,
  });

  return data;
}

export async function getIncidentById({ incidentId }: { incidentId: MongoIDType }): Promise<Incident> {
  const { data } = await axios.post(`${baseUrl}/getIncidentById`, { incidentId });

  return data;
}

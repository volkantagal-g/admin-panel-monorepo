import axios from '@shared/axios/common';

const baseUrl = '/businessAlertingTool/metricGroup';

export async function filterPermittedMetricGroups({ fields, limit = 50, offset = 0 }: FilterMetricGroupDTO): Promise<{ metricGroups: unknown[] }> {
  const { data } = await axios.post(`${baseUrl}/filterPermittedMetricGroups`, { fields, limit, offset });

  return data;
}

export async function getMetricGroupById({ metricGroupId }: GetMetricGroupDTO) {
  const { data } = await axios.post(`${baseUrl}/getMetricGroupById`, { metricGroupId });

  return data;
}

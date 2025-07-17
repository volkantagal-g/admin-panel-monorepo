import { getLangKey } from '@shared/i18n';

export function getMetricGroupsOptions(metricGroups: ACMetricGroup[] = []) {
  return metricGroups.map((metricGroup: ACMetricGroup) => ({
    value: metricGroup?._id,
    label: metricGroup?.name[getLangKey()],
  }));
}

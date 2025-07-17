import { getLangKey } from '@shared/i18n';

export default function getSelectList(data, labelProp, valueProp) {
  return data?.map(customDataItem => ({
    label: customDataItem[labelProp][getLangKey()] || customDataItem[labelProp],
    value: customDataItem[valueProp],
  }));
}

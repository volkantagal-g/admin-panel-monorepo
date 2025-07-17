import { uniqueId } from 'lodash';

const getDeepChildId = data => {
  if (data?.child) {
    return getDeepChildId(data?.child);
  }

  return data?.id;
};

export const getRowKey = record => {
  return getDeepChildId(record) || record?.createdAt || record?.id || record?._id || record?.key || uniqueId();
};

export const getTableID = () => {
  return uniqueId('getir-custom-table');
};

import axios from '@shared/axios/common';

export const getFranchiseBillList = async ({
  warehouseIds,
  franchiseId,
  domainTypes,
  lastReadDateRange,
  limit,
  offset,
}) => {
  const { data } = await axios({
    method: 'POST',
    url: '/franchiseBillManagement/bill/filter',
    data: {
      warehouse: warehouseIds,
      franchise: franchiseId,
      domainTypes,
      lastReadDateRange,
      limit,
      offset,
    },
  });
  return data;
};

export const exportFranchiseBillList = ({ lang, domainTypes, franchiseId, warehouseIds, lastReadDateRange }) => axios({
  method: 'POST',
  url: '/franchiseBillManagement/bill/excel',
  data: { lang, domainTypes, franchise: franchiseId, warehouse: warehouseIds, lastReadDateRange },
}).then(response => response.data);

export const getFranchiseBillDetail = ({ billId }) => axios({
  method: 'GET',
  url: `/franchiseBillManagement/bill/${billId}`,
}).then(response => response.data);

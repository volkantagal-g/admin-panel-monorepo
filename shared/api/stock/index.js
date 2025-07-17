import axios from '@shared/axios/common';

export const getSuppliers = () => {
  return axios({
    method: 'POST',
    url: '/supplier/getSuppliers',
  }).then(response => {
    return response.data;
  });
};

export const getAutoStockTransfers = ({ data }) => {
  return axios({
    method: 'POST',
    url: '/demandAutoTool/getAutoStockTransfers',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getAutoStockOrder = ({ data }) => {
  return axios({
    method: 'POST',
    url: '/demandAutoTool/getAutoStockOrder',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getMarketProductMasterCategoriesOld = ({ limit, offset, isSubCategory }) => {
  return axios({
    method: 'POST',
    url: '/marketProductMasterCategory/getMarketProductMasterCategoriesOld',
    data: { isSubCategory, limit, offset },
  }).then(response => {
    return response.data;
  });
};

export const createStockRefundOrder = ({
  isWholeRefund,
  refundProducts,
  warehouseId,
  language,
  orderId,
}) => {
  return axios({
    method: 'POST',
    url: `/stock/createRefundOrder/${orderId}`,
    data: {
      isWholeRefund,
      refundProducts,
      warehouseId,
      language,
    },
  }).then(response => {
    return response.data;
  });
};

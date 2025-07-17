import axios from '@shared/axios/common';

export const getMarketProductCategoriesUrl = '/marketProductCategory/getMarketProductCategories';
export const getMarketProductCategoryByIdUrl = '/marketProductCategory/getMarketProductCategory';
export const createMarketProductCategoryUrl = '/marketProductCategory/createMarketProductCategory';
export const updateMarketProductCategoryUrl = '/marketProductCategory/updateMarketProductCategory';
export const updateMarketProductCategoryImageUrl = '/marketProductCategory/updateMarketProductCategoryImage';
export const updateMarketProductCategoryAdditionalInfoUrl = '/marketProductCategory/updateMarketProductCategoryAdditionalInfo';
export const createMarketProductCategoryImageUrlUrl = '/marketProductCategory/createMarketProductCategoryImageUrl';
export const updateCategoryOrderBulkUrl = '/marketProductCategory/updateCategoryOrderBulk';
export const updateSubCategoryOrderBulkUrl = '/marketProductCategory/updateSubCategoryOrderBulk';
export const getCategoryPositionsUrl = '/marketProductCategory/getCategoryPositions';
export const getSubCategoryPositionsUrl = '/marketProductCategory/getSubCategoryPositions';
export const activateMarketProductCategoryUrl = '/marketProductCategory/activateMarketProductCategory';
export const deactivateMarketProductCategoryUrl = '/marketProductCategory/deactivateMarketProductCategory';
export const getCategoryOrdersUrl = '/marketProductCategory/getCategoryOrders';

export const getMarketProductCategories = ({ parent, parents, isSubCategory, limit, offset, queryText, status, fields, domainType }) => {
  return axios({
    method: 'POST',
    url: getMarketProductCategoriesUrl,
    data: { parent, parents, isSubCategory, limit, offset, queryText, status, fields, domainType },
  }).then(response => {
    return response.data;
  });
};

export const getMarketProductCategoryById = ({ id }) => {
  return axios({
    method: 'POST',
    url: getMarketProductCategoryByIdUrl,
    data: { id },
  }).then(response => {
    return response.data;
  });
};

export const createMarketProductCategory = ({ body: data }) => {
  return axios({
    method: 'POST',
    url: createMarketProductCategoryUrl,
    data,
  }).then(response => {
    return response.data;
  });
};

export const updateMarketProductCategory = ({ id, body: updateData }) => {
  return axios({
    method: 'POST',
    url: updateMarketProductCategoryUrl,
    data: { id, updateData },
  }).then(response => {
    return response.data;
  });
};
export const updateMarketProductCategoryImage = ({ id, body: updateData }) => {
  return axios({
    method: 'POST',
    url: updateMarketProductCategoryImageUrl,
    data: { id, updateData },
  }).then(response => {
    return response.data;
  });
};
export const updateMarketProductCategoryAdditionalInfo = ({ id, body: updateData }) => {
  return axios({
    method: 'POST',
    url: updateMarketProductCategoryAdditionalInfoUrl,
    data: { id, updateData },
  }).then(response => {
    return response.data;
  });
};

export const createMarketProductCategoryImageUrl = ({ extension }) => {
  return axios({
    method: 'POST',
    url: createMarketProductCategoryImageUrlUrl,
    data: { extension },
  }).then(response => {
    return response.data;
  });
};

export const updateCategoryOrderBulk = ({ body, domainType }) => {
  return axios({
    method: 'POST',
    url: updateCategoryOrderBulkUrl,
    data: { body, domainType },
  }).then(response => {
    return response.data;
  });
};

export const updateSubCategoryOrderBulk = ({ body }) => {
  return axios({
    method: 'POST',
    url: updateSubCategoryOrderBulkUrl,
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const getCategoryPositions = () => {
  return axios({
    method: 'POST',
    url: getCategoryPositionsUrl,
  }).then(response => {
    return response.data;
  });
};

export const getSubCategoryPositions = ({ id }) => {
  return axios({
    method: 'POST',
    url: getSubCategoryPositionsUrl,
    data: { id },
  }).then(response => {
    return response.data;
  });
};

export const activateMarketProductCategory = ({ id }) => {
  return axios({
    method: 'POST',
    url: activateMarketProductCategoryUrl,
    data: { id },
  }).then(response => {
    return response.data;
  });
};

export const deactivateMarketProductCategory = ({ id }) => {
  return axios({
    method: 'POST',
    url: deactivateMarketProductCategoryUrl,
    data: { id },
  }).then(response => {
    return response.data;
  });
};

export const getCategoryOrders = ({ domainType, showInactives = false, isListable = true }) => {
  return axios({
    method: 'POST',
    url: getCategoryOrdersUrl,
    data: { domainType, showInactives, isListable },
  }).then(response => {
    return response.data;
  });
};

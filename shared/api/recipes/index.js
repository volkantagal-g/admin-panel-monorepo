import { isFinite, isNil } from 'lodash';

import axios from '@shared/axios/common';

export const getRecipes = ({
  limit,
  offset,
  queryText,
  domainTypes,
  status,
  countryCode,
}) => {
  const data = {
    countryCode,
    ...(queryText?.length ? { queryText } : undefined),
    ...(!isNil(status) ? { status } : undefined),
    ...(domainTypes?.length ? { domainTypes } : undefined),
  };
  if (isFinite(limit)) {
    data.limit = limit;
  }
  if (isFinite(offset)) {
    data.offset = offset;
  }
  return axios({
    method: 'POST',
    url: '/recipes/getRecipes',
    headers: {},
    data,
  }).then(response => {
    return response.data;
  });
};

export const getRecipeById = ({ recipeId }) => {
  return axios({
    method: 'GET',
    url: `/recipes/getRecipeById/${recipeId}`,
    headers: {},
  }).then(response => {
    return response.data;
  });
};

export const createRecipe = ({
  body: {
    panelName,
    name,
    domainTypes,
    countryCode,
  },
}) => {
  const data = {
    countryCode,
    ...(domainTypes?.length ? { domainTypes } : undefined),
    ...(panelName ? { panelName } : undefined),
    ...(name ? { name } : undefined),
  };
  return axios({
    method: 'POST',
    url: '/recipes/createRecipe',
    headers: {},
    data,
  }).then(response => {
    return response.data;
  });
};

export const updateRecipe = ({ id, body }) => {
  const data = body;
  return axios({
    method: 'PATCH',
    url: `/recipes/updateRecipe/${id}`,
    headers: {},
    data,
  }).then(response => {
    return response.data;
  });
};

export const createRecipeImageUrl = ({ extension }) => {
  return axios({
    method: 'POST',
    url: '/recipes/createRecipeImageUrl',
    data: { extension },
  }).then(response => {
    return response.data;
  });
};

export const getRecipeOrders = ({
  domainType,
  countryCode,
  showInactives,
}) => {
  const data = {
    countryCode,
    domainType,
    showInactives,
  };
  return axios({
    method: 'POST',
    url: '/recipes/getRecipeOrders',
    headers: {},
    data,
  }).then(response => {
    return response.data;
  });
};

export const updateRecipeOrdersBulk = ({
  domainType,
  body,
}) => {
  const data = {
    domainType,
    body,
  };
  return axios({
    method: 'POST',
    url: '/recipes/updateRecipeOrdersBulk',
    headers: {},
    data,
  }).then(response => {
    return response.data;
  });
};

import axios from '@shared/axios/common';

export const getPromoData = data => {
  return axios({
    method: 'GET',
    url: '/promo/getPromoData',
    data,
  }).then(response => {
    return response.data;
  });
};

/**
 * @param {{ id: MongoIDType }} params
 * @returns {Promise<{promo: Promo}>}
 */
export const getPromoById = async ({ id }) => {
  const { data } = await axios.post('/promo/getPromoById', { promoId: id });
  return data;
};

export const getFilteredPromos = async ({
  promoCode,
  startDate,
  domainTypes,
  responsibleDepartment,
  isFreeProduct,
  endDate,
  status,
  discountReason,
  promoUsageType,
  promoMechanic,
  promoTarget,
  isParent,
  parentId,
  limit,
  page,
}) => {
  const { data } = await axios.post('/promo/getFilteredPromos', {
    promoCode,
    startDate,
    domainTypes,
    responsibleDepartment,
    isFreeProduct,
    promoMechanic,
    endDate,
    status,
    discountReason,
    promoUsageType,
    promoTarget,
    isParent,
    parentId,
    limit,
    page,
  });
  return data;
};

export const getFilteredBadges = async ({ name, promoMechanic, limit, page } = {}) => {
  const { data } = await axios.post('/promo/getFilteredPromoBadges', {
    name,
    promoMechanic,
    limit,
    page,
  });
  return data;
};

export const getResponsibleDepartments = async () => {
  const { data } = await axios.get('/promo/getResponsibleDepartments');
  return data;
};

/**
 * @param {CreatePromoFormType} payload
 * @returns {Promise<*>}
 */
export const createPromo = async payload => {
  return axios({
    method: 'POST',
    url: '/promo/createPromo',
    data: payload,
  }).then(({ data }) => data);
};

/**
 * @param {{id: MongoIDType, body: any}} params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const updateGeneralInfo = async ({ id, body: updateData }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/promo/updateGeneralInfo',
    data: { id, updateData },
  });
  return data;
};

/**
 * @param {{ body: {promoIds: MongoIDType[]}}} params
 * @returns {Promise<ActivateChildPromosResponse>}
 */
export const activateChildPromos = async ({ body }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/promo/activateChildPromos',
    data: body,
  });
  return data;
};

/**
 * @param {{ body: {promoIds: MongoIDType[]}}} params
 * @returns {Promise<DeactivateChildPromosResponse>}
 */
export const deactivateChildPromos = async ({ body }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/promo/deactivateChildPromos',
    data: body,
  });
  return data;
};

export const updateClassification = async ({ id, body: updateData }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/promo/updateClassification',
    data: { id, updateData },
  });
  return data;
};

export const updatePromoContent = async ({ id, body: updateData }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/promo/updatePromoContent',
    data: { id, updateData },
  });
  return data;
};

export const updateUserFiltering = async ({ id, body: updateData }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/promo/updateUserFiltering',
    data: { id, updateData },
  });
  return data;
};

export const updateBulkPromos = async ({ body: updateData }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/promo/updateBulkPromos',
    data: { updateData },
  });
  return data;
};

export const updateConditionProducts = async ({ id, body: updateData }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/promo/updateConditionProducts',
    data: { id, updateData },
  });
  return data;
};

export const updateExcludedProducts = async ({ id, body: updateData }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/promo/updateExcludedProducts',
    data: { id, updateData },
  });
  return data;
};

export const updatePromoStatus = async ({ id, body: updateData }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/promo/updatePromoStatus',
    data: { id, updateData },
  });
  return data;
};

export const updateBenefitType = async ({ id, body: updateData }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/promo/updateBenefitType',
    data: { id, updateData },
  });
  return data;
};

export const updateBenefitSAPBulk = async ({ id, body: updateData }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/promo/updateBenefitSAPBulk',
    data: { id, updateData },
  });
  return data;
};

export const getSegmentClientCounts = async ({ segments }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/segment/getSegmentClientCounts',
    data: { segments },
  });
  return data;
};

export const updatePromoBadge = async ({ id, body: updateData }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/promo/updatePromoBadge',
    data: { id, updateData },
  });
  return data;
};

export const updateFinancialCondition = async ({ id, body: updateData }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/promo/updateFinancialCondition',
    data: { id, updateData },
  });
  return data;
};

export const updatePromoButtonAction = async ({ id, body: updateData }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/promo/updatePromoButtonAction',
    data: { id, updateData },
  });
  return data;
};

export const updateWorkingHours = async ({ id, body: updateData }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/promo/updateWorkingHours',
    data: { id, updateData },
  });
  return data;
};

export const updateClientSegment = async ({ id, body: updateData }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/promo/updateClientSegment',
    data: { id, updateData },
  });
  return data;
};

export const updateP3Status = async ({ id, body: updateData }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/promo/updateP3Status',
    data: { id, updateData },
  });
  return data;
};

/**
 * @param {UpdateAICommunicationsStatusRequest} args
 * @returns {Promise<any>}
 */
export const updateCommsStatus = async ({ id, body: updateData }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/promo/updateCommsStatus',
    data: { id, updateData },
  });
  return data;
};

export const updatePromoSegmentTypes = async ({ id, body: updateData }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/promo/updatePromoSegmentTypes',
    data: { id, updateData },
  });
  return data;
};

export const updatePromoImage = async ({ id, body: updateData }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/promo/updatePromoImage',
    data: { id, updateData },
  });
  return data;
};

export const updatePromoHTML = async ({ id, body: updateData }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/promo/updatePromoHTML',
    data: { id, updateData },
  });
  return data;
};

export const fetchPromoUrlHTML = async ({ url }) => {
  const { data } = await axios({
    method: 'GET',
    url,
  });
  return data;
};

/**
 * @param {string} searchString
 * @param {number | undefined} promoUsageType
 * @param {string[] |undefined} excludedOptions
 * @param {boolean | undefined} isParentPromo
 * @param {boolean | undefined} isMasterPromo
 * @returns {Promise<PromoTagType[]>}
 */
export const getPromosByPromoCode = (searchString, promoUsageType, excludedOptions, isParentPromo, isMasterPromo) => {
  return axios({
    method: 'GET',
    url: '/promo/getPromosByPromoCode',
    params: {
      promoCode: encodeURIComponent(searchString),
      ...(promoUsageType && { promoUsageType }),
      ...(excludedOptions && { excludedOptions }),
      ...(typeof isParentPromo !== 'undefined' && { isParentPromo }),
      ...(typeof isMasterPromo !== 'undefined' && { isParent: isMasterPromo }),
    },
  }).then(response => {
    return response.data;
  });
};

export const getAnnouncementsByText = searchString => {
  return axios({
    method: 'GET',
    url: `/promo/getAnnouncementsByText?searchText=${searchString}`,
  }).then(response => {
    return response.data;
  });
};

export const getMarketProducts = ({ body }) => {
  return axios({
    method: 'POST',
    url: '/marketProduct/getMarketProducts',
    data: { ...body },
  }).then(response => {
    return response.data;
  });
};

export const getMarketProductsByIds = ({ productIds, fields }) => {
  return axios({
    method: 'POST',
    url: '/marketProduct/getMarketProductsByIds',
    data: { productIds, fields },
  }).then(response => {
    return response.data;
  });
};

/**
 * @typedef {import("@app/pages/Promo/Detail/components/LinkedPromotions/slice").GetPromosByIdResponse} GetPromosByIdResponse
 */

/**
 * @param {{promoIds: MongoIDType[]}} params
 * @returns {Promise<{promoByIds: GetPromosByIdResponse[]}>}
 */
export const getPromosByIds = ({ promoIds }) => {
  return axios({
    method: 'POST',
    url: '/promo/getPromosByIds',
    data: { promoIds },
  }).then(response => {
    return response.data;
  });
};

export const getUploadSignedUrl = ({
  fileName,
  contentType,
  folderPath,
  bucketName,
}) => {
  return axios({
    method: 'POST',
    url: '/promo/getUploadSignedUrl',
    data: { fileName, contentType, folderPath, bucketName },
  }).then(response => {
    return response.data;
  });
};

export const getRestaurantsByName = searchString => {
  return axios({
    method: 'GET',
    url: `/food/restaurant/byName?name=${searchString}`,
  }).then(response => {
    return response.data;
  });
};

export const createPersonalPromosBulk = params => axios({
  method: 'POST',
  url: '/promo/createPersonalPromosBulk',
  data: params,
}).then(({ data }) => data);

export const createBulkPromos = async body => {
  const { data } = await axios({
    method: 'POST',
    url: '/promo/createBulkPromos',
    data: body,
  });
  return data;
};

export const codeBulkEdit = ({ body }) => {
  return axios({
    method: 'POST',
    url: '/promo/codeBulkEdit',
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const managePromoBadge = ({ body }) => {
  return axios({
    method: 'POST',
    url: '/promo/managePromoBadge',
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const deletePromoBadge = ({ id }) => {
  return axios({
    method: 'POST',
    url: '/promo/deletePromoBadge',
    data: { _id: id },
  }).then(response => {
    return response.data;
  });
};

export const excludePromoProducts = ({ body }) => {
  return axios({
    method: 'POST',
    url: '/promo/excludePromoProducts',
    data: body,
  }).then(response => {
    return response.data;
  });
};

// Moved under banner folder
export const getConfigKey = ({ body: { key, type } }) => {
  return axios({
    method: 'POST',
    url: '/marketConfig/getConfigWKey',
    data: { key, type },
  }).then(response => {
    return response.data;
  });
};

export const getSmartSuggestions = ({ body: { merchantTypeId } }) => {
  return axios({
    method: 'POST',
    url: '/artisan/getCuisineTagsByCuisineId',
    data: { merchantTypeId },
  }).then(response => {
    return response.data;
  });
};

/**
 * @param {{ parentId: MongoIDType, limit?: number, page?: number, status: number[] | undefined}} params
 * @returns {Promise<GetChildPromosResponse>}
 */
export const getChildPromos = async ({
  parentId,
  limit,
  page,
  status,
}) => {
  return axios({
    method: 'POST',
    url: '/promo/getChildPromos',
    data: {
      parentId,
      limit,
      page,
      status,
    },
  }).then(({ data }) => data);
};

/**
 * @param {{ id: MongoIDType, linkedPromoId: MongoIDType | null }} params
 * @returns {Promise<void>}
 */
export const updateLinkedPromo = async ({
  id,
  linkedPromoId,
}) => {
  return axios({
    method: 'POST',
    url: '/promo/updateLinkedPromo',
    data: {
      id,
      linkedPromoId,
    },
  });
};

/**
 * @param {{id: MongoIDType, promoIds: MongoIDType[]}} params
 * @returns {Promise<void>}
 */
export const addChildrenPromo = ({ id, promoIds }) => {
  return axios({
    method: 'POST',
    url: '/promo/addChildrenPromos',
    data: { id, promoIds },
  }).then(response => {
    return response.data;
  });
};

/**
 * @param {{id: MongoIDType, promoIds: MongoIDType[]}} params
 * @returns {Promise<void>}
 */
export const removeChildrenPromo = ({ id, promoIds }) => {
  return axios({
    method: 'POST',
    url: '/promo/removeChildrenPromos',
    data: { id, promoIds },
  }).then(response => {
    return response.data;
  });
};

/**
 * @param {{id: MongoIDType, promoIds: MongoIDType[]}} params
 * @returns {Promise<void>}
 */
export const addParentPromos = ({ id, promoIds }) => {
  return axios({
    method: 'POST',
    url: '/promo/addParentPromos',
    data: { id, promoIds },
  }).then(response => {
    return response.data;
  });
};

/**
 * @param {{id: MongoIDType, promoIds: MongoIDType[]}} params
 * @returns {Promise<void>}
 */
export const removeParentPromos = ({ id, promoIds }) => {
  return axios({
    method: 'POST',
    url: '/promo/removeParentPromos',
    data: { id, promoIds },
  }).then(response => {
    return response.data;
  });
};

/**
 * @param {{id: MongoIDType}} params
 * @returns {Promise<void>}
 */
export const getParentPromos = ({ id }) => {
  return axios({
    method: 'POST',
    url: '/promo/parentPromos',
    data: { id },
  }).then(response => {
    return response.data;
  });
};

/**
 * @param {{id: MongoIDType, status: PromoStatus}} params
 * @returns {Promise<void>}
 */
export const updateStatusV2 = ({ id, status }) => {
  return axios({
    method: 'POST',
    url: '/promo/updateStatusV2',
    data: { id, status },
  }).then(response => {
    return response.data;
  });
};

/**
 * @param {{ parentId: MongoIDType, status: number[] | undefined}} params
 * @returns {Promise<any>}
 */
export const getChildPromosV2 = async ({ parentId, status }) => {
  return axios({
    method: 'POST',
    url: '/promo/getChildPromosV2',
    data: {
      parentId,
      status,
    },
  }).then(({ data }) => data);
};

/**
 * @param {{ targetId: MongoIDType, sourceId: MongoIDType}} params
 * @returns {Promise<any>}
 */
export const copyPromo = async ({ targetId, sourceId }) => {
  return axios({
    method: 'POST',
    url: '/promo/copyPromo',
    data: { targetId, sourceId },
  }).then(({ data }) => data);
};

/**
 * @param {{ targetId: MongoIDType, sourceId: MongoIDType}} params
 * @returns {Promise<any>}
 */
export const copyClassification = async ({ targetId, sourceId }) => {
  return axios({
    method: 'POST',
    url: '/promo/copyClassification',
    data: { targetId, sourceId },
  }).then(({ data }) => data);
};

/**
 * @param {{ targetId: MongoIDType, sourceId: MongoIDType}} params
 * @returns {Promise<any>}
 */
export const copySegments = async ({ targetId, sourceId }) => {
  return axios({
    method: 'POST',
    url: '/promo/copySegments',
    data: { targetId, sourceId },
  }).then(({ data }) => data);
};

/**
 * @param {{id: MongoIDType, data: TermsAndConditions}} params
 * @returns {Promise<void>}
 */
export const updateTermsAndConditions = async ({ id, data }) => {
  return axios({
    method: 'PUT',
    url: `/promo/${id}/terms-and-conditions`,
    data,
  }).then(response => {
    return response.data;
  });
};

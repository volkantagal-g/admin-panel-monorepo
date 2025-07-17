import axios from '@shared/axios/common';

export const getResults = body => {
  return axios({
    method: 'POST',
    url: '/dts/getResults',
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const getPoints = body => {
  return axios({
    method: 'POST',
    url: '/dts/getPoints',
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const getDtsCategories = body => {
  return axios({
    method: 'POST',
    url: '/dts/getDtsRuleCategories',
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const getSignedUrlUpload = body => {
  return axios({
    method: 'POST',
    url: '/dts/getSignedUploadUrl',
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const uploadDtsLogs = body => {
  return axios({
    method: 'POST',
    url: '/dts/bulkUploadDtsLogs',
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const getDtsRuleList = ({ limit, offset }) => {
  return axios({
    method: 'POST',
    url: '/dts/getDtsRules',
    data: { limit, offset },
  }).then(response => {
    return response.data;
  });
};

export const createDtsRule = body => {
  return axios({
    method: 'POST',
    url: '/dts/createDtsRule',
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const updateDTSRule = ({ data }) => {
  return axios({
    method: 'POST',
    url: '/dts/updateDtsRule',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getDTSRuleDetail = id => {
  return axios({
    method: 'POST',
    url: '/dts/getDtsRule',
    data: id,
  }).then(response => {
    return response.data;
  });
};

export const createDtsCategorySetting = body => {
  return axios({
    method: 'POST',
    url: '/dts/createDtsRuleCategory',
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const getDtsPrioritySettingList = ({ limit, offset }) => {
  return axios({
    method: 'POST',
    url: '/dts/getDtsRulePriorities',
    data: { limit, offset },
  }).then(response => {
    return response.data;
  });
};

export const getDtsCategorySettingDetail = id => {
  return axios({
    method: 'POST',
    url: '/dts/getDtsRuleCategory',
    data: id,
  }).then(response => {
    return response.data;
  });
};

export const getDtsPrioritySettingDetail = id => {
  return axios({
    method: 'POST',
    url: '/dts/getDtsRulePriority',
    data: id,
  }).then(response => {
    return response.data;
  });
};

export const updateDtsCategorySetting = ({ data }) => {
  return axios({
    method: 'POST',
    url: '/dts/updateDtsRuleCategory',
    data,
  }).then(response => {
    return response.data;
  });
};

export const createDtsPrioritySetting = body => {
  return axios({
    method: 'POST',
    url: '/dts/createDtsRulePriority',
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const updateDtsPrioritySetting = ({ data }) => {
  return axios({
    method: 'POST',
    url: '/dts/updateDtsRulePriority',
    data,
  }).then(response => {
    return response.data;
  });
};

export const createDtsRuleFeedbackSourceSetting = body => {
  return axios({
    method: 'POST',
    url: '/dts/createDtsRuleFeedbackSource',
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const getDtsRuleFeedbackSources = body => {
  return axios({
    method: 'POST',
    url: '/dts/listDtsRuleFeedbackSource',
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const getDtsRuleFeedbackSourceSettingDetail = id => {
  return axios({
    method: 'POST',
    url: '/dts/getDtsRuleFeedbackSource',
    data: id,
  }).then(response => {
    return response.data;
  });
};

export const updateDtsRuleFeedbackSourceSetting = ({ data }) => {
  return axios({
    method: 'POST',
    url: '/dts/updateDtsRuleFeedbackSource',
    data,
  }).then(response => {
    return response.data;
  });
};

export const createDtsViolation = body => {
  return axios({
    method: 'POST',
    url: '/dts/createDTSViolation',
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const getSignedUrlUploadForViolation = body => {
  return axios({
    method: 'POST',
    url: '/dts/getSignedUploadUrlForDTSViolation',
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const getSignedUrlForViolation = body => {
  return axios({
    method: 'POST',
    url: '/dts/getSignedUrlForDTSViolation',
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const updateDtsViolation = ({ data }) => {
  return axios({
    method: 'POST',
    url: '/dts/updateDtsViolation',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getDtsViolation = id => {
  return axios({
    method: 'POST',
    url: '/dts/getDtsViolation',
    data: id,
  }).then(response => {
    return response.data;
  });
};

export const updateDtsViolationDecision = ({ data }) => {
  return axios({
    method: 'POST',
    url: '/dts/updateDtsViolationDecision',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getDtsList = ({ limit, offset, filters }) => {
  return axios({
    method: 'POST',
    url: '/dts/filterDtsViolation',
    data: { limit, offset, ...filters },
  }).then(response => {
    return response.data;
  });
};

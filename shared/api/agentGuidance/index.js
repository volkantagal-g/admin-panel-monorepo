import axios from '@shared/axios/common';

export const getAgentGuidanceContent = filters => {
  return axios({
    method: 'POST',
    url: '/agentGuidanceLLM/getAgentGuidanceContent',
    data: filters,
  }).then(response => {
    return response.data;
  });
};

export const updateAgentGuidanceContent = data => {
  return axios({
    method: 'POST',
    url: '/agentGuidanceLLM/updateAgentGuidanceContent',
    data,
  }).then(response => {
    return response.data;
  });
};

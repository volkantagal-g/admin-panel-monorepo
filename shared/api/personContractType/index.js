import axios from '@shared/axios/common';

import { PERSON_CONTRACT_GROUP_ID as contractGroupId } from '@shared/shared/constants';

export const getContractListApi = async data => {
  const response = await axios({
    method: 'POST',
    url: '/contractManagement/contract/filter',
    data,
  });
  return response.data;
};

export const getContractDetailApi = async id => {
  const response = await axios({
    method: 'GET',
    url: `/contractManagement/contract/${id}`,
  });
  return response.data;
};

export const saveContractDetailApi = async data => {
  const response = await axios({
    method: 'POST',
    url: '/contractManagement/contract',
    data,
  });
  return response.data;
};

/**
 * @param {string} groupId
 * @param {string} id
 * @returns {string}
 */
const getGroupBasedUrl = (groupId, id) => {
  const urlMap = ({
    [contractGroupId.genInfo]: id,
    [contractGroupId.break]: `breaks/${id}`,
    [contractGroupId.leave]: `leave-config/${id}`,
    [contractGroupId.compConfig]: `compensation-config/${id}`,
    [contractGroupId.schdConfig]: `scheduling-constraints/${id}`,
  });
  return urlMap[groupId];
};

export const updateContractDetailApi = async ({ groupId, id, ...data }) => {
  const groupUrl = getGroupBasedUrl(groupId, id);
  const response = await axios({
    method: 'PUT',
    url: `/contractManagement/contract/${groupUrl}`,
    data,
  });
  return response.data;
};

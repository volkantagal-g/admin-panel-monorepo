import axios from '@shared/axios/common';

export const getWarehouseProposals = async ({ requestBody }) => {
  const { data = [] } = await axios({
    method: 'POST',
    url: '/warehouseProposal/getWarehouseProposalsByFilters',
    data: requestBody,
  });

  return data;
};

export const getWarehouseProposalsReport = async ({ requestBody }) => {
  const { data = [] } = await axios({
    method: 'POST',
    url: '/warehouseProposal/getWarehouseProposalsReportExcel',
    data: requestBody,
  });

  return data;
};

export const getWarehouseProposal = async ({ id }) => {
  const { data = {} } = await axios({
    method: 'POST',
    url: '/warehouseProposal/getWarehouseProposal',
    data: { id },
  });

  return data;
};

export const updateWarehouseProposalStatus = async ({ id, status }) => {
  const { data = {} } = await axios({
    method: 'POST',
    url: '/warehouseProposal/updateWarehouseProposalStatus',
    data: { id, status },
  });

  return data;
};

export const updateWarehouseProposal = async ({ id, warehouseProposal }) => {
  const { data = {} } = await axios({
    method: 'POST',
    url: '/warehouseProposal/updateWarehouseProposal',
    data: { id, warehouseProposal },
  });

  return data;
};

export const getCities = async () => {
  const { data = [] } = await axios({
    method: 'POST',
    url: '/warehouseProposal/getCities',
  });

  return data;
};

export const getDistricts = async ({ city }) => {
  const { data = [] } = await axios({
    method: 'POST',
    url: '/warehouseProposal/getDistricts',
    data: { city },
  });

  return data;
};

export const getNeighborhoods = async ({ district }) => {
  const { data = [] } = await axios({
    method: 'POST',
    url: '/warehouseProposal/getNeighborhoods',
    data: { district },
  });

  return data;
};

export const createWarehouseProposal = async requestBody => {
  const { data = [] } = await axios({
    method: 'POST',
    url: '/warehouseProposal/createWarehouseProposal',
    data: requestBody,
  });

  return data;
};

export const getUploadSignedUrl = ({
  fileName,
  contentType,
  folderPath,
  bucketName,
}) => {
  return axios({
    method: 'POST',
    url: '/warehouseProposal/getUploadSignedUrl',
    data: { fileName, contentType, folderPath, bucketName },
  }).then(response => {
    return response.data;
  });
};

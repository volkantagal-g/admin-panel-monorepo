import axios from '@shared/axios/common';

export const getRunners = ({ body: data, query: params }) => {
  return axios({
    method: 'POST',
    url: 'getirLocals/runner/list',
    params,
    data,
  });
};

export const getRunnerById = async ({ id }) => {
  const { data } = await axios({
    method: 'GET',
    url: `/getirLocals/runner/${id}`,
  });

  return data;
};

export const getTasksByRunnerId = async ({ id }) => {
  const { data } = await axios({
    method: 'GET',
    url: `/getirLocals/runner/${id}/tasks`,
  });

  return data;
};

export const updateRunner = async ({ id, updateData }) => {
  return axios({
    method: 'PUT',
    url: `/getirLocals/runner/${id}`,
    data: { runnerUuid: id, updateData },
  }).then(response => {
    return response.data;
  });
};

export const createRunner = ({ body: data }) => {
  return axios({
    method: 'POST',
    url: '/getirLocals/runner',
    data,
  }).then(({ data: response }) => response);
};

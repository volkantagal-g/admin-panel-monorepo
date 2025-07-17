import axios from '@shared/axios/common';

export const createCourierPlanProcess = async data => {
  const response = await axios({
    method: 'POST',
    url: '/e2eCourierPlan',
    data,
  });
  return response.data;
};

export const filterCourierPlans = async ({
  name,
  startDate,
  endDate,
  limit,
  offset,
}) => {
  const { data = [] } = await axios({
    method: 'POST',
    url: '/e2eCourierPlan/filter',
    data: {
      name,
      startDate,
      endDate,
      limit,
      offset,
    },
  });
  return data;
};

export const getCourierPlan = async ({ id }) => {
  const { data } = await axios({
    method: 'GET',
    url: `/e2eCourierPlan/${id}`,
  });
  return data;
};

export const getCourierPlanFileSignedUploadUrl = async ({ key }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/e2eCourierPlan/get-signed-upload-url',
    data: { key },
  });
  return data;
};

export const proceedCourierPlanProcess = async ({ planId, stepKey, data }) => {
  const response = await axios({
    method: 'PUT',
    url: `/e2eCourierPlan/${planId}/step/${stepKey}/proceed`,
    data: { data },
  });
  return response.data;
};

export const getCourierPlanFileSignedDownloadUrl = async ({ key }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/e2eCourierPlan/get-signed-url',
    data: { key },
  });
  return data;
};

export const deleteCourierPlan = async ({ id }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/e2eCourierPlan/removePlan',
    data: { id },
  });
  return data;
};

export const publishCourierPlanProcess = async ({ planId, publishType }) => {
  const response = await axios({
    method: 'POST',
    url: '/e2eCourierPlan/publish',
    data: { id: planId, publishType },
  });
  return response.data;
};

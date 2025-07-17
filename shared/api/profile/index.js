import axios from '@shared/axios/common';

const PROFILE_PATH = 'profile';

export const getEmployeeDetailForProfile = async () => {
  const { data } = await axios({
    method: 'POST',
    url: `/${PROFILE_PATH}/getEmployeeDetailForProfile`,
  });

  return data;
};

export const getEmployeeEducationInfoForProfile = async () => {
  const { data } = await axios({
    method: 'POST',
    url: `/${PROFILE_PATH}/getEmployeeEducationInfoForProfile`,
  });

  return data;
};

export const getActiveSessions = async () => {
  const { data } = await axios({
    method: 'POST',
    url: `/${PROFILE_PATH}/getActiveSessions`,
  });

  return data;
};

export const getEmployeeAssetsForProfile = async () => {
  const { data } = await axios({
    method: 'GET',
    url: `/${PROFILE_PATH}/getEmployeeAssetsForProfile`,
  });

  return data;
};

export const getEmployeeVehiclesForProfile = async ({ limit, offset }) => {
  const { data } = await axios({
    method: 'GET',
    url: `/${PROFILE_PATH}/getEmployeeVehiclesForProfile`,
    params: { limit, offset },
  });

  return data;
};

export const addEducationInfoToEmployee = async ({ ...params }) => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: `/${PROFILE_PATH}/addEducationInfoToEmployee`,
    data: { ...params },
  });
  return responseData;
};

export const removeEducationInfoToEmployee = async ({ ...params }) => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: `/${PROFILE_PATH}/removeEducationInfo`,
    data: { ...params },
  });
  return responseData;
};

export const updateEducationInfo = async ({ ...params }) => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: `/${PROFILE_PATH}/updateEducationInfo`,
    data: { ...params },
  });
  return responseData;
};

export const updateContactInfoOfEmployee = async ({ ...params }) => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: `/${PROFILE_PATH}/updateEmployeeContactInfo`,
    data: { ...params },
  });
  return responseData;
};

import axios from '@shared/axios/common';

export const getTeams = data => axios({
  method: 'POST',
  url: '/internalAuthentication/getTeams',
  data,
});

export const getTeamById = data => axios({
  method: 'POST',
  url: '/internalAuthentication/getTeam',
  data,
});

export const updateTeam = data => axios({
  method: 'POST',
  url: '/internalAuthentication/updateTeam',
  data,
});

export const createTeam = data => axios({
  method: 'POST',
  url: '/internalAuthentication/createTeam',
  data,
});

export const deleteTeam = data => axios({
  method: 'POST',
  url: '/internalAuthentication/deleteTeam',
  data,
});

export const getTeamServices = data => axios({
  method: 'POST',
  url: '/internalAuthentication/getTeamServices',
  data,
});

export const createTeamService = data => axios({
  method: 'POST',
  url: '/internalAuthentication/createTeamService',
  data,
});

export const getServices = data => axios({
  method: 'POST',
  url: '/internalAuthentication/getServices',
  data,
});

export const getServiceById = data => axios({
  method: 'POST',
  url: '/internalAuthentication/getService',
  data,
});

export const updateService = data => axios({
  method: 'POST',
  url: '/internalAuthentication/updateService',
  data,
});

export const deleteService = data => axios({
  method: 'POST',
  url: '/internalAuthentication/deleteService',
  data,
});

export const getSlackConfigurations = data => axios({
  method: 'POST',
  url: '/internalAuthentication/getSlackConfigurations',
  data,
});

export const updateSlackConfigurations = data => axios({
  method: 'POST',
  url: '/internalAuthentication/updateSlackConfigurations',
  data,
});

export const generateSlackToken = data => axios({
  method: 'POST',
  url: '/internalAuthentication/generateSlackToken',
  data,
});

export const testSlackMessage = async ({ teamId, serviceId, slackConfiguration }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/internalAuthentication/testSlackMessage',
    data: {
      teamId,
      serviceId,
      slackConfiguration,
    },
  });
  return data;
};

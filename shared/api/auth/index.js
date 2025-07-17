import authAxios from '@shared/axios/auth';
import axios from '@shared/axios/common';

export const login = ({ email, redirectUrl }) => {
  return authAxios({
    method: 'POST',
    url: '/login',
    data: { email, redirectUrl },
  }).then(response => {
    return response.data;
  });
};

export const authTempToken = ({ tempToken }) => {
  return authAxios({
    method: 'POST',
    url: '/login/authTempToken',
    data: { tempToken },
  }).then(response => {
    return response.data;
  });
};

export const authGoogleToken = ({ clientToken, redirectUrl }) => {
  return authAxios({
    method: 'POST',
    url: '/login/authGoogleToken',
    data: { clientToken, redirectUrl },
  }).then(response => {
    return response.data;
  });
};

export const logout = ({ userId: user, token, accessToken, refreshToken }) => {
  return axios({
    method: 'POST',
    url: '/logout',
    headers: {
      user,
      ...(token && { token }),
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...(refreshToken && { 'x-auth-refresh-token': refreshToken }),
    },
    data: {},
  }).then(response => {
    return response.data;
  });
};

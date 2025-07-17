import { get } from 'lodash';

import { getAccessToken, getRefreshToken, getToken, getUser } from '@shared/redux/selectors/auth';
import { getSelectedCountry, getSelectedCountryDivision } from '@shared/redux/selectors/countrySelection';
import { HTTP_STATUS_CODE } from '@shared/shared/constants';
import { clearLocalStorage } from '@shared/utils/localStorage';
import { getLangKey } from '@shared/i18n';
import { browserAndOS } from '@shared/utils/session';
import { isJWTExpired } from '@shared/utils/common';
import authAxios from '@shared/axios/auth';
// import { Creators } from '@shared/redux/actions/auth';
// import store from '@shared/redux/store';

const isTestEnvironment = typeof process !== 'undefined' && process?.env?.NODE_ENV === 'test';
let refreshSubscribers = [];
const EXPIRATION_OFFSET_IN_MS = 12_0000; // 2 minutes
const ACCESS_TOKEN_REFRESHED_EVENT = 'ACCESS_TOKEN_REFRESHED';
const tokenChannel = isTestEnvironment ? null : new BroadcastChannel('tokenChannel');

if (!isTestEnvironment && tokenChannel) {
  tokenChannel.onmessage = event => {
    const { type } = event.data;
    if (type === ACCESS_TOKEN_REFRESHED_EVENT) {
      onAccessTokenRefreshed();
    }
  };
}

/**
 * Common interceptor for Axios instances.
 * @param {AxiosInstance} instance
 * @return {AxiosInstance} instance
 */
export default function commonInterceptor(instance) {
  instance.interceptors.request.use(async config => {
    const token = getToken();
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();
    const user = getUser();
    const selectedCountry = getSelectedCountry();
    const selectedDivision = getSelectedCountryDivision();
    Object.assign(config.headers, {
      ...(token && { token }),
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      country: get(selectedCountry, '_id', ''),
      defaultLanguageCode: get(selectedCountry, 'defaultLanguageCode', ''),
      userLanguageKey: getLangKey(),
      division: get(selectedDivision, 'id', ''),
      user: get(user, '_id', ''),
      pagePath: window.location.pathname,
      browserAndOS,
    });

    if (
      // if accessToken is expired
      (accessToken && isJWTExpired(accessToken, EXPIRATION_OFFSET_IN_MS)) ||
      // or not available and refreshToken is available
      (!accessToken && !token && refreshToken)
    ) {
      const isRefreshing = getAccessTokenRefreshing();

      if (isRefreshing !== true) {
        setAccessTokenRefreshing(true);

        try {
          const { accessToken: renewedAccessToken, refreshToken: renewedRefreshToken } = await renewAccessToken();

          localStorage.setItem('accessToken', renewedAccessToken);
          localStorage.setItem('refreshToken', renewedRefreshToken);
          setAccessTokenRefreshing(false);
          if (tokenChannel && !isTestEnvironment) {
            tokenChannel.postMessage({ type: ACCESS_TOKEN_REFRESHED_EVENT });
          }
          onAccessTokenRefreshed();

          Object.assign(config.headers, { ...config.headers, Authorization: `Bearer ${renewedAccessToken}` });

          return config;
        }
        catch (err) {
          refreshSubscribers = [];
          setAccessTokenRefreshing(false);

          const httpResponseStatusCode = get(err, 'response.status');
          if (
            httpResponseStatusCode === HTTP_STATUS_CODE.FORBIDDEN ||
            httpResponseStatusCode === HTTP_STATUS_CODE.UNAUTHORIZED
          ) {
            clearLocalStorage();
            window.location.reload();
          }
          else {
            throw err;
          }
        }
      }

      return new Promise(resolve => {
        refreshSubscribers.push(newToken => {
          Object.assign(config.headers, { ...config.headers, Authorization: `Bearer ${newToken}` });
          resolve(config);
        });
      });
    }

    return config;
  });

  instance.interceptors.response.use(response => {
    return response;
  }, error => {
    const httpResponseStatusCode = get(error, 'response.status');
    if (
      httpResponseStatusCode &&
      (
        httpResponseStatusCode === HTTP_STATUS_CODE.FORBIDDEN ||
        httpResponseStatusCode === HTTP_STATUS_CODE.UNAUTHORIZED
      )
    ) {
      // TODO: (MIGHT-TODO) "store.dispatch(Creators.logoutRequest())" stuck
      //  inside at "yield take(Types.LOGOUT_REQUEST)" part,
      //  so i fixed it quickly with clearLocalStorage();
      // store.dispatch(Creators.logoutRequest());
      clearLocalStorage();
      window.location.reload();
    }
    return Promise.reject(error);
  });
}

async function renewAccessToken() {
  const refreshToken = getRefreshToken();
  const { data } = await authAxios({
    method: 'POST',
    url: '/login/renew-access-token',
    headers: { 'x-auth-refresh-token': refreshToken },
  });

  return data;
}

function onAccessTokenRefreshed() {
  const newToken = getAccessToken();
  refreshSubscribers.forEach(callback => callback(newToken));
  refreshSubscribers = [];
}

function getAccessTokenRefreshing() {
  try {
    const itemStr = localStorage.getItem('isAccessTokenRefreshing');
    if (!itemStr) return undefined;

    const item = JSON.parse(itemStr);
    if (new Date().getTime() > item.expiry) {
      localStorage.removeItem('isAccessTokenRefreshing');
      return undefined;
    }

    return !!item.value;
  }
  catch (err) {
    clearLocalStorage();
    window.location.reload();
    return undefined;
  }
}

function setAccessTokenRefreshing(value) {
  localStorage.setItem('isAccessTokenRefreshing', JSON.stringify({
    value,
    expiry: new Date().getTime() + (6_000),
  }));
}

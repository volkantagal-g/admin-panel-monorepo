import { get } from 'lodash';

import { HTTP_STATUS_CODE } from '@shared/shared/constants';
import { clearLocalStorage } from '@shared/utils/localStorage';
import { browserAndOS } from '@shared/utils/session';
import { getRefreshToken } from '@shared/redux/selectors/auth';
// import { Creators } from '@shared/redux/actions/auth';
// import store from '@shared/redux/store';

/**
 * Authentication interceptor for Axios instances.
 * @param {AxiosInstance} instance
 * @return {AxiosInstance} instance
 */
export default function authInterceptor(instance) {
  instance.interceptors.request.use(config => {
    if (['/login/renew-access-token', '/logout'].includes(config.url)) {
      const refreshToken = getRefreshToken();
      Object.assign(config, { 'x-auth-refresh-token': refreshToken });
    }
    Object.assign(config.headers, { browserAndOS });
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
    }
    return Promise.reject(error);
  });
}

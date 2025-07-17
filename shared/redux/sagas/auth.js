import { take, call, put, fork, all, select } from 'redux-saga/effects';

import { login, authGoogleToken, authTempToken, logout } from '@shared/api/auth';
import { refreshLoggedInUser } from '@shared/api/user';
import history from '@shared/utils/history';
import AnalyticsService from '@shared/services/analytics';
import { Creators, Types } from '@shared/redux/actions/auth';
import { INITIAL_ROUTE, REDIRECT_SEARCH, ROUTE } from '@app/routes';
import { PANEL_EVENTS } from '@shared/shared/analyticsConstants';
import { getToken, getAccessToken, getUser, redirectUrlPathSelector, getRefreshToken } from '@shared/redux/selectors/auth';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { clearLocalStorage } from '@shared/utils/localStorage';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

export const setTokenToLocalStorage = token => {
  localStorage.setItem('token', token);
};

export const setAccessTokenToLocalStorage = accessToken => {
  localStorage.setItem('accessToken', accessToken);
};

export const setRefreshTokenToLocalStorage = refreshToken => {
  localStorage.setItem('refreshToken', refreshToken);
};

export const setUserToLocalStorage = user => {
  localStorage.setItem('user', JSON.stringify(user));
};

export function* loginRequest() {
  while (true) {
    try {
      const { email, redirectUrl } = yield take(Types.LOGIN_REQUEST);
      yield call(login, { email, redirectUrl });
      yield put({ type: Types.LOGIN_SUCCESS });
    }
    catch (error) {
      yield put({
        type: Types.LOGIN_FAILURE,
        error,
      });
      yield put(ToastCreators.error({ error }));
    }
  }
}

export function* authTempTokenRequest() {
  while (true) {
    try {
      const { tempToken } = yield take(Types.AUTH_TEMP_TOKEN_REQUEST);
      const { token, accessToken, refreshToken, ...user } = yield call(authTempToken, { tempToken });
      yield put({
        type: Types.AUTH_TEMP_TOKEN_SUCCESS,
        user,
        token,
        accessToken,
        refreshToken,
      });
    }
    catch (error) {
      yield put({
        type: Types.LOGIN_FAILURE,
        error,
      });
    }
  }
}

export function* authTempTokenSuccess() {
  while (true) {
    try {
      const { token, accessToken, refreshToken, user } = yield take(Types.AUTH_TEMP_TOKEN_SUCCESS);
      if (token && token !== 'undefined' && token !== 'null' && token?.length > 10) {
        yield setTokenToLocalStorage(token);
      }
      if (accessToken) {
        yield setAccessTokenToLocalStorage(accessToken);
      }
      if (refreshToken) {
        yield setRefreshTokenToLocalStorage(refreshToken);
      }
      yield setUserToLocalStorage(user);
      const country = getSelectedCountry();
      const magicLinkRedirectUrlPath = yield select(redirectUrlPathSelector.getData);
      let magicLinkRedirectParameters = new URLSearchParams();
      if (Array.isArray(magicLinkRedirectUrlPath)) {
        const magicLinkQuery = magicLinkRedirectUrlPath[magicLinkRedirectUrlPath.length - 1]?.split('?')?.[1];
        magicLinkRedirectParameters = new URLSearchParams(magicLinkQuery);
      }

      if (!country && !magicLinkRedirectParameters.has('country')) {
        yield call(history.push, ROUTE.COUNTRY_SELECTION.path);
      }
      else {
        yield call(history.push, INITIAL_ROUTE.path);
      }

      AnalyticsService.track(PANEL_EVENTS.LOGIN_SUCCESS.EVENT_NAME, { method: PANEL_EVENTS.LOGIN_SUCCESS.METHOD.MAGIC_LINK });
    }
    catch (error) {
      yield put({
        type: Types.LOGIN_FAILURE,
        error,
      });
    }
  }
}

export function* authGoogleTokenRequest() {
  while (true) {
    try {
      const { clientToken, redirectUrl } = yield take(Types.AUTH_GOOGLE_TOKEN_REQUEST);
      AnalyticsService.track(PANEL_EVENTS.LOGIN_REQUEST.EVENT_NAME, { method: PANEL_EVENTS.LOGIN_REQUEST.METHOD.GOOGLE_AUTH });
      const { token, accessToken, refreshToken, ...user } = yield call(authGoogleToken, { clientToken, redirectUrl });
      yield put({
        type: Types.AUTH_GOOGLE_TOKEN_SUCCESS,
        user,
        token,
        accessToken,
        refreshToken,
      });
      AnalyticsService.track(PANEL_EVENTS.LOGIN_SUCCESS.EVENT_NAME, { method: PANEL_EVENTS.LOGIN_SUCCESS.METHOD.GOOGLE_AUTH });
    }
    catch (error) {
      yield put({
        type: Types.LOGIN_FAILURE,
        error,
      });
    }
  }
}

export function* authGoogleTokenSuccess() {
  while (true) {
    try {
      const { token, accessToken, refreshToken, user } = yield take(Types.AUTH_GOOGLE_TOKEN_SUCCESS);
      // Token
      if (token && token !== 'undefined' && token !== 'null' && token?.length > 10) {
        yield setTokenToLocalStorage(token);
      }
      if (accessToken) {
        yield setAccessTokenToLocalStorage(accessToken);
      }
      if (refreshToken) {
        yield setRefreshTokenToLocalStorage(refreshToken);
      }
      yield setUserToLocalStorage(user);
      const country = getSelectedCountry();
      const redirectParameters = new URLSearchParams(REDIRECT_SEARCH);

      AnalyticsService.track('Login Success', { method: 'Google Login' });
      if (!country && !redirectParameters.has('country')) {
        yield call(history.push, ROUTE.COUNTRY_SELECTION.path);
      }
      else {
        yield call(history.push, INITIAL_ROUTE.path);
      }
    }
    catch (error) {
      yield put({
        type: Types.LOGIN_FAILURE,
        error,
      });
    }
  }
}

export function* logoutRequest() {
  while (true) {
    // eslint-disable-next-line no-useless-catch
    try {
      yield take(Types.LOGOUT_REQUEST);
      const token = getToken();
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();
      const { _id: userId } = getUser();
      if (userId && (token || accessToken)) {
        yield call(logout, { userId, token, accessToken, refreshToken });
      }
      AnalyticsService.track('Logout');
      AnalyticsService.reset();
      yield clearLocalStorage();
    }
    catch (error) {
      throw error;
    }
  }
}

export function* redirectUrlPathRequest() {
  while (true) {
    const { data } = yield take(Types.REDIRECT_URL_PATH_REQUEST);
    yield put({
      type: Types.REDIRECT_URL_PATH_REQUEST,
      data,
    });
  }
}

export function* refreshLoggedInUserRequest() {
  while (true) {
    yield take(Types.REFRESH_LOGGED_IN_USER_REQUEST);
    const oldUser = getUser();
    try {
      const user = yield call(refreshLoggedInUser, {});
      setUserToLocalStorage({ ...oldUser, ...user });
    }
    catch (error) {
      yield put(Creators.refreshLoggedInUserFailure({ error }));
    }
  }
}

export default function* auth() {
  yield all([
    fork(loginRequest),
    fork(authTempTokenRequest),
    fork(authTempTokenSuccess),
    fork(authGoogleTokenRequest),
    fork(authGoogleTokenSuccess),
    fork(logoutRequest),
    fork(redirectUrlPathRequest),
    fork(refreshLoggedInUserRequest),
  ]);
}

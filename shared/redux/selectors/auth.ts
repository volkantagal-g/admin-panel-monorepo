import { createSelector } from 'reselect';
import { get, isEmpty as _isEmpty } from 'lodash';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.AUTH;

export const getIsLoginPending = createSelector(
  (state: any): boolean => {
    return state[REDUX_KEY.AUTH].isLoginPending;
  },
  isLoginPending => {
    return isLoginPending;
  },
);

export const getIsLoginSuccess = createSelector(
  (state: any): boolean => {
    return state[REDUX_KEY.AUTH].isLoginSuccess;
  },
  isLoginSuccess => {
    return isLoginSuccess;
  },
);

export const getIsAuthTempTokenPending = createSelector(
  (state: any): boolean => {
    return state[REDUX_KEY.AUTH].isAuthTempTokenPending;
  },
  isAuthTempTokenPending => {
    return isAuthTempTokenPending;
  },
);

export const getIsAuthGoogleTokenPending = createSelector(
  (state: any): boolean => {
    return state[REDUX_KEY.AUTH].isAuthGoogleTokenPending;
  },
  isAuthGoogleTokenPending => {
    return isAuthGoogleTokenPending;
  },
);

export const getToken = (state: any) => {
  let token;
  if (state) {
    token = state[REDUX_KEY.AUTH]?.token;
  }
  if (!token && localStorage) {
    token = localStorage?.getItem('token');
  }
  return token;
};

export const getAccessToken = () => {
  return localStorage?.getItem('accessToken');
};

export const getRefreshToken = () => {
  return localStorage?.getItem('refreshToken');
};

export const getUser = (state: any = null): UserType => {
  let user;
  if (state) {
    user = state[REDUX_KEY.AUTH].user;
  }
  if (!user || _isEmpty(user)) {
    user = localStorage.getItem('user');
  }
  if (typeof user === 'string') {
    user = JSON.parse(user);
  }
  return user || {};
};

export const getUserCountries = (): ICountry[] => {
  const allCountries = get(getUser(), 'countries', []) as ICountry[];
  const countries = allCountries.filter(country => {
    return !!country;
  });
  return countries;
};

export const redirectUrlPathSelector = { getData: (state: any): string | string[] | null => state?.[reducerKey]?.redirectUrlPath?.data };

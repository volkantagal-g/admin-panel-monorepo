import { get } from 'lodash';

import axios from '../common';
import { Creators } from '@app/pages/Client/Detail/redux/actions';
import store from '@shared/redux/store';

axios.interceptors.request.use(config => {
  const { CLIENT_DETAIL } = store.getState();
  const { access } = CLIENT_DETAIL || {};
  const {
    clientDetailAccessToken,
    clientId,
  } = access;
  Object.assign(config.headers, {
    clientdetailaccesstoken: clientDetailAccessToken,
    clientid: clientId,
  });

  return config;
});

axios.interceptors.response.use(response => {
  const { CLIENT_DETAIL } = store.getState();
  const { access } = CLIENT_DETAIL || {};
  const { clientDetailAccessToken } = access || {};
  const newAccessToken = get(response, ['headers', 'clientdetailaccesstoken']);

  if (newAccessToken && clientDetailAccessToken !== newAccessToken) {
    store.dispatch(Creators.updateClientDetailAccessToken({ token: newAccessToken }));
  }

  return response;
});

export default axios;

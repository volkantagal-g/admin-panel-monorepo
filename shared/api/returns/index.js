import axios from '@shared/axios/common';
import { getLangKey } from '@shared/i18n';

export const getReturns = ({ params, body }) => {
  return axios({
    method: 'POST',
    url: `/localsReturn/listReturnsByFilter?page=${params.page ?? 0}&size=30`,
    data: body,
    headers: { 'Accept-Language': getLangKey() },
  }).then(response => {
    return response.data;
  });
};

export const getReturnDetail = ({ returnId }) => {
  return axios({
    method: 'GET',
    url: `/localsReturn/getShopReturnDetail/${returnId}`,
    headers: { 'Accept-Language': getLangKey() },
  }).then(response => {
    return response.data;
  });
};

export const postReturnRespond = ({ params }) => {
  return axios({
    method: 'POST',
    url: `/localsReturn/${params.returnId}/${params.respondType}`,
    headers: { 'Accept-Language': getLangKey() },
  }).then(response => {
    return response.data;
  });
};

export const getReturnStatusesReq = () => {
  return axios({
    method: 'GET',
    url: '/localsReturn/getReturnStatuses',
    headers: { 'Accept-Language': getLangKey() },
  }).then(response => response.data);
};

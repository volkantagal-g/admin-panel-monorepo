import axios from '@shared/axios/common';

export const getGiveawayEvents = ({ limit, offset, queryText, eventId }) => {
  const data = { limit, offset, queryText, eventId };
  return axios({
    method: 'POST',
    url: '/giveawayEventLambda/giveawayEventDraws',
    data,
  }).then(response => {
    return response.data;
  });
};
export const getDrawDiscountCode = ({ discountCodeId }) => {
  const data = { discountCodeId };
  return axios({
    method: 'POST',
    url: '/giveawayEventLambda/giveawayEventDiscountCode',
    data,
  }).then(response => {
    return response.data;
  });
};
export const deliverGiveawayEvent = ({ gsm, countryCode, eventId }) => {
  const data = { gsm, countryCode, eventId };
  return axios({
    method: 'POST',
    url: '/giveawayEventLambda/giveawayEventDraw/deliver',
    data,
  }).then(response => {
    return response.data;
  });
};

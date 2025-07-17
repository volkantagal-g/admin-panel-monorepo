import axios from '@shared/axios/common';

export const getSummaries = ({
  startDate,
  finishDate,
  sort,
  pageNo,
  pageSize,
}) => {
  return axios({
    method: 'POST',
    url: 'tipPayback/payout-summary',
    data: {
      startDate,
      finishDate,
      sort,
      pageNo,
      pageSize,
    },
  }).then(response => {
    return response.data;
  });
};

export const cancelPayout = ({ id }) => {
  return axios({
    method: 'POST',
    url: 'tipPayback/payout-summary/cancel',
    data: { id },
  }).then(response => {
    return response.data;
  });
};

export const statusUpdate = ({ id }) => {
  return axios({
    method: 'POST',
    url: 'tipPayback/payout-summary/status-update',
    data: { id },
  }).then(response => {
    return response;
  });
};

export const report = ({ id }) => {
  return axios({
    method: 'POST',
    url: 'tipPayback/payout-summary/report',
    data: { id },
  }).then(response => {
    return response;
  });
};

export const payout = ({ id }) => {
  return axios({
    method: 'POST',
    url: 'tipPayback/payout-summary/payout',
    data: { id },
  }).then(response => {
    return response;
  });
};

export const calculate = ({ finishDate, startDate }) => {
  return axios({
    method: 'POST',
    url: 'tipPayback/calculate',
    data: { finishDate, startDate },
  }).then(response => {
    return response;
  });
};

export const getSummaryDetails = ({
  id,
  pageNo,
  pageSize,
  personName,
  payoutStatus,
  sort,
  taxNum,
  person,
}) => {
  return axios({
    method: 'POST',
    url: 'tipPayback/payout-summary-details',
    data: {
      id,
      pageNo,
      pageSize,
      personName,
      payoutStatus,
      sort,
      person,
      taxNum,
    },
  }).then(response => {
    return response.data;
  });
};

export const getSummaryFailReasons = ({
  id, personName, sort, pageNo, pageSize, person,
  taxNum,
}) => {
  return axios({
    method: 'POST',
    url: 'tipPayback/payout-summary-fail-reason',
    data: {
      id,
      personName,
      person,
      taxNum,
      sort,
      pageNo,
      pageSize,
    },
  }).then(response => {
    return response;
  });
};

export const triggerReport = ({ id }) => {
  return axios({
    method: 'POST',
    url: 'tipPayback/trigger/report',
    data: { id },
  }).then(response => {
    return response;
  });
};

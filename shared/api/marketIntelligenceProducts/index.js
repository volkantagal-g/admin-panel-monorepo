import axios from '@shared/axios/common';

export const getCompetitorList = () => {
  return axios({
    method: 'GET',
    url: 'marketIntelligenceProducts/getCompetitorList',
    json: true,
  }).then(response => {
    return response.data;
  });
};

export const postProductMatchData = ({ crawlDate, competitorName }) => {
  return axios({
    method: 'POST',
    url: 'marketIntelligenceProducts/postProductMatchData',
    data: { crawlDate, competitorName },
    json: true,
  }).then(response => {
    return response.data;
  });
};

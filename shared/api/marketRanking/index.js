import axios from '@shared/axios/common';

export const getRankingScenarioNames = () => axios({
  method: 'GET',
  url: '/marketRanking/getRankingScenarioNames',
}).then(response => {
  return response.data;
});

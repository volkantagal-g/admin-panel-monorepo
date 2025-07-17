import axios from '@shared/axios/common';

export const getFoodRestaurantStatistics = ({ cityId }) => axios
  .post('/foodOrderSummary/getFoodRestaurantStatistics', { cityId })
  .then(res => res.data);

export const getFoodOrdersStatistics = ({ cityId }) => axios
  .post('/foodOrderSummary/getFoodOrdersStatistics', { cityId })
  .then(res => res.data);

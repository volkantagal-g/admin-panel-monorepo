import axios from '@shared/axios/common';

export const getWeatherForecast = async ({ requestBody }) => {
  const response = await axios({
    method: 'POST',
    url: '/gis/weather/getWeatherForecast',
    data: requestBody,
  });
  return response.data;
};

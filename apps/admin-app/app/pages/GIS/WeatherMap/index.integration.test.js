import '@test/publicUtils/configureWithoutCleanup';

import { screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import moment from 'moment';

import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import PageComponent from '.';
import { waitForItemToBeSelected, waitPageToRenderSomething } from '@test/publicUtils/assertions';
import { DATE_FORMAT } from './utils/constants';

jest.mock('@deck.gl/geo-layers/', () => {});
jest.mock('@deck.gl/layers/', () => {});

const initialUrl = '/gis/weatherMap';

const mockData = {
  forecasts: [
    {
      weather_code: 176,
      wind_dir: 'ESE',
      h3Id: '881ecb06b9fffff',
      weather_icons: [
        'rain_showers_night.png',
      ],
      forecast_datetime: 1701907200000,
      temperature: 11,
      wind_speed: 8,
    }],
};

const requestUrl = '/gis/weather/getWeatherForecast';
const getWeatherForecastSuccess = {
  url: requestUrl,
  method: 'post',
  successData: mockData,
};

describe('In Weather Map Page:', () => {
  describe('Landing', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_GIS_WEATHER_MAP,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
      const pageTitle = screen.getByText('Weather Map');
      expect(pageTitle).toBeInTheDocument();
    });
    describe('SideBar Details', () => {
      let polygonTypeTitle;
      let cityTitle;
      let domainTypeTitle;
      let subregionIntervalsTitle;
      let polygonTypeSelect;
      let citySelect;
      let domainTypeSelect;
      let subregionIntervalsSelect;
      let getPolygonsButton;
      let switchButton;
      let datePicker;

      it('should render with disabled options', () => {
        polygonTypeTitle = screen.getByTitle('Polygon Type');
        cityTitle = screen.getByTitle('City');
        domainTypeTitle = screen.getByTitle('Domain Type');
        subregionIntervalsTitle = screen.getByTitle('Subregion Intervals');
        polygonTypeSelect = screen.getByRole('combobox', { name: 'Polygon Type' });
        citySelect = screen.getByRole('combobox', { name: 'City' });
        domainTypeSelect = screen.getByRole('combobox', { name: 'Domain Type' });
        subregionIntervalsSelect = screen.getByRole('combobox', { name: 'Subregion Intervals' });
        switchButton = screen.getByRole('switch');
        getPolygonsButton = screen.getByRole('button', { name: 'Get Weather Forecast' });
        datePicker = screen.getByPlaceholderText('Select date');

        expect(polygonTypeTitle).toBeInTheDocument();
        expect(cityTitle).toBeInTheDocument();
        expect(domainTypeTitle).toBeInTheDocument();
        expect(subregionIntervalsTitle).toBeInTheDocument();

        expect(domainTypeSelect).toBeInTheDocument();
        expect(switchButton).toBeDisabled();
        expect(getPolygonsButton).toBeInTheDocument();
      });
      it('polygonFilter and weatherFilter works properly', async () => {
        userEvent.click(polygonTypeSelect);
        const subregion = screen.getByTitle('Subregion');
        userEvent.click(subregion);
        await waitForItemToBeSelected('Subregion');

        userEvent.click(citySelect);
        const city = screen.getByTitle('Istanbul');
        userEvent.click(city);
        await waitForItemToBeSelected('Istanbul');

        userEvent.click(domainTypeSelect);
        const domain = screen.getByTitle('Getir10');
        userEvent.click(domain);
        await waitForItemToBeSelected('Getir10');

        userEvent.click(subregionIntervalsSelect);
        const subregionInterval = screen.getByTitle('Daytime');
        userEvent.click(subregionInterval);
        await waitForItemToBeSelected('Daytime');
        userEvent.click(getPolygonsButton);
        const date = moment();
        userEvent.click(datePicker);
        userEvent.type(datePicker, date.format(DATE_FORMAT));
        userEvent.keyboard('[Enter]');
      });
      describe('WeatherController Details', () => {
        it('should not render WeatherController components initially', () => {
          const weatherController = screen.queryByRole('weather-controller');
          expect(weatherController).not.toBeInTheDocument();
        });
        it('renders WeatherController components after getPolygonsButton click', async () => {
          userEvent.click(getPolygonsButton);
          mockApiPerTestCase(getWeatherForecastSuccess);
          await waitFor(() => {
            const slider = screen.getByRole('slider');
            expect(slider).toBeInTheDocument();
          });
        });
      });
    });
  });
});

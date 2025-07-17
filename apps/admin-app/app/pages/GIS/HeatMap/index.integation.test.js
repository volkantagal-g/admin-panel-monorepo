/* eslint-disable testing-library/no-node-access */
import '@test/publicUtils/configureWithoutCleanup';

import { within, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/* eslint-disable no-unused-vars */
import * as L from 'leaflet';
import 'leaflet.heat';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import renderComponent from '@test/publicUtils/renderComponent';
import MapWrapper from './components/MapWrapper';
import HeatMapLayer from './components/MapWrapper/heatmap';
import { waitPageToRenderSomething, expectToHavePageHeaderText, waitForItemToBeSelected } from '@test/publicUtils/assertions';
import * as MOCKS from '@shared/api/gis/heatmap/index.mock.data';
import PageComponent from '.';

const initialUrl = '/gis/heatmap';

describe('For heatmap page', () => {
  describe('For Page Features', () => {
    it('should render successfully ', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_GIS_HEATMAP,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await screen.findByRole('main');
      await waitPageToRenderSomething();
    });
    it('should have correct Page Header', () => {
      expectToHavePageHeaderText('Heatmap');
    });

    it('should render components properly', async () => {
      expect(screen.getByText('City')).toBeInTheDocument();
      expect(screen.getByText('Polygon Type')).toBeInTheDocument();
      expect(screen.getByText('Domain Type')).toBeInTheDocument();
      expect(screen.getByText('Date Range')).toBeInTheDocument();
      expect(screen.getByText('Show Warehouses')).toBeInTheDocument();
    });

    describe('For SideBar Functionalities', () => {
      let heatMapForm;
      let appOpenButton;
      let missedOrderButton;
      let downloadsButton;
      let succesfulOrderButton;
      it('should Polygon type combobox works properly', async () => {
        heatMapForm = screen.getByTestId('heatmap-form');
        const polygonCombobox = within(heatMapForm).getAllByRole('combobox')[1];
        userEvent.click(polygonCombobox);

        const polygonTypeOption = await screen.findByTitle('Subregion');
        userEvent.click(polygonTypeOption);
        await waitForItemToBeSelected('Subregion');
      });
      it('should Domain type combobox works properly', async () => {
        const domaintypeCombobox = within(heatMapForm).getAllByRole('combobox')[2];
        userEvent.click(domaintypeCombobox);

        const domainTypeOption = await screen.findByTitle('Getir10');
        userEvent.click(domainTypeOption);
        await waitForItemToBeSelected('Getir10');
      });

      it('should date picker works properly', async () => {
        const startDate = screen.getByPlaceholderText('Start date');
        const endDate = screen.getByPlaceholderText('End date');

        expect(startDate).toBeInTheDocument();
        expect(endDate).toBeInTheDocument();
        expect(startDate).not.toHaveValue();
        expect(endDate).not.toHaveValue();

        if (userEvent.click(startDate) || userEvent.click(endDate)) {
          expect(screen.getByText('Yesterday')).toBeInTheDocument();
          expect(screen.getByText('Today')).toBeInTheDocument();
          expect(screen.getByText('This Month')).toBeInTheDocument();
        }

        fireEvent.change(startDate, { target: { value: '2022-07-26' } });
        fireEvent.change(endDate, { target: { value: '2022-07-29' } });

        expect(startDate).toHaveValue('2022-07-26');
        expect(endDate).toHaveValue('2022-07-29');
      });

      it('should get heatmap buttons disabled initially.', async () => {
        appOpenButton = screen.getByText('Application Open Locations').closest('button');
        missedOrderButton = screen.getByText('Missed Orders Locations').closest('button');
        downloadsButton = screen.getByText('Download Locations').closest('button');
        succesfulOrderButton = screen.getByText('Success Orders Locations').closest('button');
        expect(appOpenButton).toBeDisabled();
        expect(missedOrderButton).toBeDisabled();
        expect(downloadsButton).toBeDisabled();
        expect(succesfulOrderButton).toBeDisabled();
      });
      it('should show warehouse button disabled initially.', async () => {
        const showWhButton = screen.getByRole('switch');
        expect(showWhButton).toBeDisabled();
      });
      it('should city selection works properly', async () => {
        const citySelectCombobox = within(heatMapForm).getAllByRole('combobox')[0];
        userEvent.click(citySelectCombobox);

        const city = await screen.findByTitle('Istanbul');

        userEvent.click(city);
        await waitForItemToBeSelected('Istanbul');
      });

      it('should get heatmap buttons enabled after city selection.', async () => {
        await waitFor(() => {
          expect(appOpenButton).toBeEnabled();
        });
        await waitFor(() => {
          expect(missedOrderButton).toBeEnabled();
        });
        await waitFor(() => {
          expect(downloadsButton).toBeEnabled();
        });
        await waitFor(() => {
          expect(succesfulOrderButton).toBeEnabled();
        });
        await waitFor(() => {
          expect(screen.getByRole('switch')).toBeEnabled();
        });
      });

      it('show warehouse switch works properly', async () => {
        const showWhButton = screen.getByRole('switch');
        userEvent.click(showWhButton);

        expect(showWhButton).toHaveClass('ant-switch-checked');
      });

      it.each([MOCKS])('Each mock data should be rendered', async mockData => {
        await renderComponent({
          ui: (
            <MapWrapper>
              <HeatMapLayer data={mockData} />
            </MapWrapper>
          ),
        });
      });
    });
  });
});

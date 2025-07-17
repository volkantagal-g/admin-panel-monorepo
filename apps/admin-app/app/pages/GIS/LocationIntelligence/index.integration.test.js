import '@test/publicUtils/configureWithoutCleanup';

import { screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import moment from 'moment';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import PageComponent from '.';
import { waitForItemToBeSelected, waitPageToRenderSomething } from '@test/publicUtils/assertions';

const initialUrl = '/gis/locationIntelligence';

describe('In Location Intelligence Page:', () => {
  describe('Landing', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_GIS_LOCATION_INTELLIGENCE,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
      const pageTitle = screen.getByText('Location Intelligence');
      expect(pageTitle).toBeInTheDocument();
    });
    it('should render Welcome Modal', () => {
      const wellcomeModal = screen.getByTestId('welcome-modal');
      expect(wellcomeModal).toBeInTheDocument();

      const confluenceIcon = screen.getByRole('img', { name: 'confluence' });
      expect(confluenceIcon).toBeInTheDocument();

      const okButton = screen.getByText('Ok');
      expect(okButton).toBeInTheDocument();
      userEvent.click(okButton);
    });
  });
  describe('SideBar Details', () => {
    let geoBoundaryTitle;
    let geoBoundarySelect;
    let polygonTypeTitle;
    let cityTitle;
    let domainTypeTitle;
    let subregionIntervalsTitle;
    let polygonTypeSelect;
    let citySelect;
    let domainTypeSelect;
    let subregionIntervalsSelect;
    let getPolygonsButton;
    let dateRangeTypeTitle;
    let dateRangeTypeSelect;
    let dateRangeTitle;
    let dateRangePicker;
    let statTypeTitle;
    let statTypeSelect;
    let runAnalysisButton;
    let switchButton;
    let customStylerButton;
    let drawerTitle;
    let paletteTitle;
    let classesTitle;
    let paletteTypeSelect;
    let classNumberInput;
    let firstColorPalette;
    it('should render with disabled options', () => {
      geoBoundaryTitle = screen.getByText('Geoboundary Types');
      geoBoundarySelect = screen.getByText('Please select geoboundary type.');

      polygonTypeTitle = screen.getByTitle('Polygon Type');
      cityTitle = screen.getByTitle('City');
      domainTypeTitle = screen.getByTitle('Domain Type');
      subregionIntervalsTitle = screen.getByTitle('Subregion Intervals');
      polygonTypeSelect = screen.getByRole('combobox', { name: 'Polygon Type' });
      citySelect = screen.getByRole('combobox', { name: 'City' });
      domainTypeSelect = screen.getByRole('combobox', { name: 'Domain Type' });
      subregionIntervalsSelect = screen.getByRole('combobox', { name: 'Subregion Intervals' });
      switchButton = screen.getByRole('switch');
      getPolygonsButton = screen.getByRole('button', { name: 'Get Polygons' });
      runAnalysisButton = screen.getByRole('button', { name: 'Fetch Result' });

      dateRangeTypeTitle = screen.getByTitle('Date Range Type');
      dateRangeTypeSelect = screen.getByText('Please select date range type.');
      dateRangeTitle = screen.getByTitle('Date Range');
      dateRangePicker = screen.getByPlaceholderText('Please select a date interval');
      statTypeTitle = screen.getByTitle('Statistic Types');
      statTypeSelect = screen.getByRole('combobox', { name: 'Statistic Types' });

      expect(geoBoundaryTitle).toBeInTheDocument();
      expect(geoBoundarySelect).toBeInTheDocument();

      expect(polygonTypeTitle).toBeInTheDocument();
      expect(cityTitle).toBeInTheDocument();
      expect(domainTypeTitle).toBeInTheDocument();
      expect(subregionIntervalsTitle).toBeInTheDocument();

      expect(polygonTypeSelect).toBeDisabled();
      expect(citySelect).toBeDisabled();
      expect(domainTypeSelect).toBeInTheDocument();
      expect(subregionIntervalsSelect).toBeDisabled();
      expect(switchButton).toBeDisabled();
      expect(getPolygonsButton).toBeInTheDocument();

      expect(dateRangeTypeTitle).toBeInTheDocument();
      expect(dateRangeTitle).toBeInTheDocument();
      expect(statTypeTitle).toBeInTheDocument();

      // TODO Investigate why next antd select is not reachable like others. Next line is not a best bractice.
      // eslint-disable-next-line testing-library/no-node-access
      expect(dateRangeTypeSelect.previousSibling.firstChild).toBeDisabled();
      expect(dateRangePicker).toBeDisabled();
      expect(statTypeSelect).toBeDisabled();
    });
    it('geoboundaryFilter works properly ', async () => {
      userEvent.click(geoBoundarySelect);
      const polygonOption = screen.getByTitle('Polygon');
      expect(polygonOption).toBeInTheDocument();
      userEvent.click(polygonOption);
      // since selecting polygonoption fires an api call we need to wait for that async state update
      await waitFor(() => {
        expect(polygonTypeSelect).toBeEnabled();
      });
      expect(citySelect).toBeEnabled();
      expect(domainTypeSelect).toBeEnabled();
      expect(subregionIntervalsSelect).toBeEnabled();
      expect(getPolygonsButton).toBeEnabled();
    });
    it('polygonFilter works properly', async () => {
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
      await waitFor(() => {
      // eslint-disable-next-line testing-library/no-node-access
        expect(dateRangeTypeSelect.previousSibling.firstChild).toBeEnabled();
      });
      await waitFor(() => {
        expect(dateRangePicker).toBeEnabled();
      });
      await waitFor(() => {
        expect(statTypeSelect).toBeEnabled();
      });
      await waitFor(() => {
        expect(statTypeSelect).toBeEnabled();
      });
    });
    it('statisticsFilter works properly', async () => {
      const mockMonthName = moment()
        .subtract(1, 'month')
        .startOf('month')
        .format('MMMM')
        .substring(0, 3);

      userEvent.click(dateRangeTypeSelect);
      const monthly = screen.getByText('Monthly');
      expect(monthly).toBeInTheDocument();
      userEvent.click(monthly);

      userEvent.click(dateRangePicker);
      const monthOption = screen.getByText(mockMonthName);
      expect(monthOption).toBeInTheDocument();
      userEvent.click(monthOption);

      userEvent.click(statTypeSelect);
      const appOpenOption = screen.getByTitle('Application Open Count');
      const orderOption = screen.getByTitle('Order Count');
      userEvent.click(appOpenOption);
      userEvent.click(orderOption);
      userEvent.click(statTypeSelect);
      userEvent.click(runAnalysisButton);

      const appOpenButton = await screen.findByTestId('appOpen-stat-button');
      const orderButton = await screen.findByTestId('order-stat-button');

      await waitFor(() => {
        expect(appOpenButton).toBeChecked();
      });
      await waitFor(() => {
        expect(orderButton).not.toBeChecked();
      });
    });
    it('after filters change should disabled again', async () => {
      userEvent.click(citySelect);

      const city = screen.getByTitle('Ankara');
      userEvent.click(city);

      await waitForItemToBeSelected('Ankara');
      userEvent.click(getPolygonsButton);

      // wait for async action to be completed
      await waitFor(() => {
        expect(runAnalysisButton).toBeDisabled();
      });
    });
    it('Custom styling drawer opening', async () => {
      userEvent.click(getPolygonsButton);
      await waitFor(() => {
        expect(runAnalysisButton).toBeEnabled();
      });

      userEvent.click(runAnalysisButton);
      customStylerButton = screen.getByTestId('custom-styler-button');
      expect(customStylerButton).toBeInTheDocument();
    });
    it('Custom styling drawer work properly', async () => {
      userEvent.click(customStylerButton);
      drawerTitle = screen.getByText('Style Designer');
      paletteTitle = screen.getByText('Select palette type');
      classesTitle = screen.getByText('Classes');
      paletteTypeSelect = screen.getByText('Sequential');
      classNumberInput = screen.getByDisplayValue('5');
      firstColorPalette = screen.getByTestId('color-palette-0');

      expect(drawerTitle).toBeInTheDocument();
      expect(paletteTitle).toBeInTheDocument();
      expect(classesTitle).toBeInTheDocument();
      expect(firstColorPalette).toBeInTheDocument();
      expect(paletteTypeSelect).toBeInTheDocument();
      expect(classNumberInput).toBeInTheDocument();

      userEvent.click(paletteTypeSelect);
      const paletteTypeOption = screen.getByTitle('Diverging');
      userEvent.click(paletteTypeOption);
      await waitForItemToBeSelected('Diverging');
    });
  });
});

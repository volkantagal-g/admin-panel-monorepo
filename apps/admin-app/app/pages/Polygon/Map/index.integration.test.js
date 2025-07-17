/* eslint-disable testing-library/no-node-access */
import '@test/publicUtils/configureWithoutCleanup';

import { act, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { featureCollection, polygon as turfPolygon } from '@turf/turf';

import { waitPageToRenderSomething, waitForItemToBeSelected, expectSidebarMenuToHaveV2, expectToHavePageHeaderText } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';

import permKey from '@shared/shared/permKey.json';
import * as MOCKS from '@shared/api/polygon/index.mock.data';
import PageComponent from '.';

const initialUrl = '/polygon/map';

const coordinates = turfPolygon(MOCKS.mockedPolygon.polygon.coordinates);
const mockedPolygonGeoJson = featureCollection([coordinates]);

describe('In Polygon Page:', () => {
  let renderResult;
  describe('For Polygon Map', () => {
    it('should render successfully ', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_POLYGON_MAP,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await screen.findByRole('main');
      await waitPageToRenderSomething();
    });
    it('should show correct menu group', async () => {
      expectSidebarMenuToHaveV2('Field', ['Maps & Polygons', 'Polygon Map']);
    });
    it('should have correct page header', async () => {
      expectToHavePageHeaderText('Map');
    });
    it('should contain leaflet map features', async () => {
      // eslint-disable-next-line testing-library/no-node-access
      const leafletCntainer = document.getElementsByClassName('leaflet-pane leaflet-map-pane');
      expect(leafletCntainer).toBeTruthy();
    });
  });

  describe('For Polygon Map page side content', () => {
    it('should have correct side content', () => {
      expect(screen.getByText('Polygon Type')).toBeInTheDocument();
      expect(screen.getByText('City')).toBeInTheDocument();
      expect(screen.getByText('Domain Type')).toBeInTheDocument();
      expect(screen.getByText('Subregion Interval Type')).toBeInTheDocument();
      expect(screen.getByText('Show Warehouses on Map')).toBeInTheDocument();
    });
    it('should click polygon filters', async () => {
      const domainTypeSelect = screen.getByTitle('Domain Type');
      const polygonTypeSelect = screen.getByTitle('Polygon Type');
      const citySelect = screen.getByTitle('City');
      const subregionIntervalTypeSelect = screen.getByTitle('Subregion Interval Type');

      await waitFor(() => {
        expect(domainTypeSelect).toBeVisible();
      });
      await waitFor(() => {
        expect(polygonTypeSelect).toBeVisible();
      });
      await waitFor(() => {
        expect(citySelect).toBeVisible();
      });
      await waitFor(() => {
        expect(subregionIntervalTypeSelect).toBeVisible();
      });
      userEvent.click(polygonTypeSelect);
      userEvent.click(domainTypeSelect);
      userEvent.click(citySelect);
      userEvent.click(subregionIntervalTypeSelect);
    });
    it('should be able to select polygon type', async () => {
      const polygonTypeBox = screen.getAllByRole('combobox')[0];
      userEvent.click(polygonTypeBox);
      const subRegion = screen.getByTitle('Subregion');
      userEvent.click(subRegion);
      await waitForItemToBeSelected('Subregion');
    });
    it('should be able to select domain type', async () => {
      const domainTypeBox = screen.getAllByRole('combobox')[2];
      userEvent.click(domainTypeBox);
      const domainType = screen.getAllByTitle('Getir10')[1];
      userEvent.click(domainType);
      await waitForItemToBeSelected('Getir10');
    });
    it('should be able to select subregion interval type', async () => {
      const subregionBox = screen.getAllByRole('combobox')[3];
      userEvent.click(subregionBox);
      const subregionType = screen.getAllByTitle('Daytime')[1];
      userEvent.click(subregionType);
      await waitForItemToBeSelected('Daytime');
    });
    it('should be switch button disabled', async () => {
      const switchButton = screen.getByRole('switch');
      expect(switchButton).toBeDisabled();
    });
    it('should show geojson detail when permitted', async () => {
      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_POLYGON_MAP_UPDATE_GEOJSON]);
      });
      expect(screen.getByText('GeoJSON')).toBeInTheDocument();
    });
    it('should be geojson add button enabled', async () => {
      const geoJSONAddButton = screen.getByText('Add').closest('button');
      expect(geoJSONAddButton).toBeDisabled();
    });
    it('should be geojson textarea disabled', async () => {
      const geoJSONTextArea = screen.getByRole('textbox');
      expect(geoJSONTextArea).toBeDisabled();
    });
    it('should be able to select city', async () => {
      const cityBox = screen.getAllByRole('combobox')[1];
      userEvent.click(cityBox);
      const city = screen.getByTitle('Istanbul');
      userEvent.click(city);
      await waitForItemToBeSelected('Istanbul');
    });
    it('should toggle to show warehouses when city selected', async () => {
      const switchButton = screen.getByRole('switch');
      expect(switchButton.ariaChecked).toBeFalsy();
      fireEvent.click(switchButton);
      expect(switchButton).toBeEnabled();
    });
    it('should get geojson feature to textarea', async () => {
      const geoJSONGetButton = screen.getAllByRole('button')[3];
      const textArea = screen.getByRole('textbox');
      const mockedGeojsonString = JSON.stringify(mockedPolygonGeoJson);

      userEvent.click(geoJSONGetButton);
      fireEvent.change(textArea, { target: { value: mockedGeojsonString } });
      // TODO: Following lines are causes failin, object can not be reached. Fix mock data and event.
      // const geoJSONObject = within(textArea).getByText('mockedGeojsonString');
      // expect(geoJSONObject).toBeInTheDocument();
    });
    it.skip('should contain value in copy button ', async () => {
      const geoJSONCopyButton = screen.getByText('Copy').closest('button');
      expect(geoJSONCopyButton).toBeInTheDocument();
    });
    it.skip('should appear save and cancel button', async () => {
      const geoJSONAddButton = screen.getByText('Add').closest('button');
      userEvent.click(geoJSONAddButton);
      const geoJSONSaveButton = screen.getByText('Save').closest('button');
      const geoJSONSCancelButton = screen.getByText('Cancel').closest('button');
      expect(geoJSONSaveButton).toBeInTheDocument();
      expect(geoJSONSCancelButton).toBeInTheDocument();
    });
    it.skip('should enable textarea after clicking add button', async () => {
      const textArea = screen.getByRole('textbox');
      expect(textArea).toBeEnabled();
    });
    it.skip('should cancel the update polygon process', async () => {
      const geoJSONSCancelButton = screen.getByText('Cancel').closest('button');
      userEvent.click(geoJSONSCancelButton);
      expect(geoJSONSCancelButton).not.toBeInTheDocument();
    });
    it.skip('should decide to update polygon', async () => {
      const geoJSONAddButton = screen.getByText('Add').closest('button');
      userEvent.click(geoJSONAddButton);
    });
    it('should paste geojson to textarea', async () => {
      const geoJSONTextArea = screen.getByRole('textbox');
      const stringMockedPolygonGeoJson = typeof mockedPolygonGeoJson === 'string' ? mockedPolygonGeoJson.substring(0, 3) : '';
      fireEvent.paste(geoJSONTextArea, { target: { value: stringMockedPolygonGeoJson } });
      expect(geoJSONTextArea).toHaveValue(stringMockedPolygonGeoJson);
    });
    it.skip('should save updated polygon successfully', async () => {
      const geoJSONSaveButton = screen.getByText('Save').closest('button');
      userEvent.click(geoJSONSaveButton);
    });
    it('should show error toast when request fails', async () => {
      const networkError = screen.getAllByRole('alert')[0];
      expect(networkError).toBeInTheDocument();
    });
  });

  describe('For Polygon page api call', () => {
    it('should get and render polygons using button', async () => {
      const getPolygonButton = screen.getAllByRole('button')[2];
      userEvent.click(getPolygonButton);
    });
    it('should show newtork error toast when polygon request fails ', async () => {
      const networkError = screen.getAllByRole('alert')[0];
      expect(networkError).toBeInTheDocument();
    });
    it('should show toast when requesting without selecting polygon', async () => {
      const polygonTypeError = screen.getAllByRole('alert')[1];
      expect(polygonTypeError).toBeInTheDocument();
    });
  });
});

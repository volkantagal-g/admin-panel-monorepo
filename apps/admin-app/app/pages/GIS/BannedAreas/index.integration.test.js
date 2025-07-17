import '@test/publicUtils/configureWithoutCleanup';

import { screen, fireEvent, within, waitFor, cleanup, act } from '@testing-library/react';
import { featureCollection, polygon as turfPolygon } from '@turf/turf';

import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import renderComponent from '@test/publicUtils/renderComponent';
import { mockedBannedPolygon } from '@shared/api/polygon/index.mock.data';
import { mockedScheduledBanPolygons } from '@shared/api/gis/scheduledBan/index.mock.data';
import { GeoJsonLayer } from '@shared/components/GIS/Maps';
import { waitPageToRenderSomething, expectSidebarMenuToHaveV2, waitForItemToBeSelected } from '@test/publicUtils/assertions';
import PageComponent from '.';

const initialUrl = '/gis/bannedAreas';

const mockedBanPolygonTypes = {
  BANNED_FOR_PRODUCT_DISPLAY_GETIR_MARKET_POLYGON_TYPE: '2',
  BANNED_FOR_PROMO_GETIR_MARKET_POLYGON_TYPE: '5',
  TOTALLY_BANNED_GETIR_MARKET_POLYGON_TYPE: '7',
  BANNED_FOR_COURIER_GETIR_MARKET_POLYGON_TYPE: '10',
  BANNED_COURIERS_POLYGON_TYPE: '15',
};

const domainTypes = ['Getir10', 'GetirFood', 'GetirMore', 'GetirWater', 'GetirLocals'];

const geom = featureCollection(mockedBannedPolygon.coordinates);
const polygonGeoJson = turfPolygon(geom, mockedBannedPolygon);

describe('For banned areas page', () => {
  afterAll(cleanup);
  let renderResult;

  describe('For Page Details', () => {
    it('should render successfully ', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_GIS_BANNED_AREAS,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await screen.findByRole('main');
      await waitPageToRenderSomething();
    });
    it('should show correct menu group', async () => {
      expectSidebarMenuToHaveV2('Field', ['Maps & Polygons', 'Banned Areas']);
    });
    it('Should have correct page header', () => {
      // eslint-disable-next-line testing-library/no-node-access
      const pageHeaderContainer = document.querySelector('h3.ant-typography');
      const pageHeaderTitle = within(pageHeaderContainer).getByText('Banned Areas');
      expect(pageHeaderTitle).toBeInTheDocument();
    });

    it('should contain leaflet map features', async () => {
      // eslint-disable-next-line testing-library/no-node-access
      const leafletCntainer = document.getElementsByClassName('leaflet-pane leaflet-map-pane');
      expect(leafletCntainer).toBeTruthy();
    });
  });
  describe('For Banned Areas Page side content', () => {
    let form;
    let citySelect;
    let domainTypeSelect;
    let polygonTypeSelect;
    let FormSwitch;
    let G10switchButton;
    let GBswitchButton;
    let GSswitchButton;
    let addButton;
    let uploadButton;
    let addJsonButton;
    let geoJsonInput;

    it('should form component has correct items', async () => {
      expect(screen.getByText('Create Banned Area')).toBeInTheDocument();
      expect(screen.getByText('Domain Type')).toBeInTheDocument();
      expect(screen.getByText('Polygon Type')).toBeInTheDocument();
      expect(screen.getByText('Add')).toBeInTheDocument();
    });

    it('should list component has correct items', () => {
      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_GIS_BANNED_AREAS_COMPONENT_LIST, permKey.PAGE_GIS_BANNED_AREAS_COMPONENT_SCHEDULED_BAN_SWITCH]);
      });
      const bannedAreasCard = screen.getByTestId('banned-areas-sidebar-card');
      expect(within(bannedAreasCard).getByText('Banned Areas')).toBeInTheDocument();
    });

    it('should fields have no value at the initial rendering', () => {
      form = screen.getByTestId('banned-areas-form-test');
      [citySelect, domainTypeSelect, polygonTypeSelect] = within(form).getAllByRole('combobox');

      expect(domainTypeSelect).not.toHaveValue();
      expect(polygonTypeSelect).not.toHaveValue();
    });

    it('should throw alerts if empty form submit', async () => {
      addButton = screen.getByText('Add');
      userEvent.click(addButton);

      await screen.findAllByRole('alert', { style: 'Invalid' });
      await screen.findAllByRole('alert', { style: 'Required' });
    });

    it('should switchers to be disabled before city selection', async () => {
      [FormSwitch, G10switchButton, GBswitchButton, GSswitchButton] = screen.getAllByRole('switch');
      await waitFor(() => {
        expect(FormSwitch).toBeEnabled();
      });
      expect(G10switchButton).toBeDisabled();
      expect(GBswitchButton).toBeDisabled();
      expect(GSswitchButton).toBeDisabled();
    });

    it('should select city', async () => {
      userEvent.click(citySelect);
      const city = screen.getByTitle('Istanbul');
      userEvent.click(city);
      await waitForItemToBeSelected('Istanbul');
    });
    it('should show drawer button works properly', () => {
      uploadButton = screen.getByRole('button', { name: /Upload GeoJson/i });
      userEvent.click(uploadButton);

      addJsonButton = screen.getByRole('button', { name: /Add Geojson/i });
      expect(addJsonButton).toBeInTheDocument();
    });
    it('geoJson Field should not have value at the beginning', () => {
      geoJsonInput = screen.getByPlaceholderText('Please add valid json.');
      expect(geoJsonInput).not.toHaveValue();
    });
    it('should threw error according to geojson validation', async () => {
      fireEvent.change(geoJsonInput, { target: { value: mockedScheduledBanPolygons } });
      userEvent.click(addJsonButton);
      const successMessage = screen.getAllByRole('alert', { text: /Success/i })[0];
      expect(successMessage).toBeInTheDocument();
      // TODO -> add toast error test cases
    });

    it('should domaintype selectbox works properly', async () => {
      userEvent.click(domainTypeSelect);
      // eslint-disable-next-line no-restricted-syntax
      for (const domain of domainTypes) {
        const domainOption = screen.getByText(domain);
        userEvent.click(domainOption);
        // eslint-disable-next-line no-await-in-loop
        await waitForItemToBeSelected(domain);
      }
    });

    it('should polygontype selectbox works properly', async () => {
      userEvent.click(polygonTypeSelect);

      const vehicleTypedPolygon = await screen.findByTitle('Vehicle type based disabled');

      userEvent.click(vehicleTypedPolygon);
      await waitFor(() => {
        expect(within(form).getAllByRole('combobox')[3]).toBeInTheDocument();
      });
    });

    it('each vehicle type can be selected', async () => {
      userEvent.click(within(form).getAllByRole('combobox')[3]);
      const vehicleOption = screen.getByText('Moto');
      userEvent.click(vehicleOption);
      await waitForItemToBeSelected('Moto');
    });

    it('should toggle to show WMSs', async () => {
      // eslint-disable-next-line no-restricted-syntax
      for (const switchButton of [G10switchButton, GBswitchButton, GSswitchButton, FormSwitch]) {
        userEvent.click(switchButton);
        // eslint-disable-next-line no-await-in-loop
        expect(switchButton).toHaveClass('ant-switch bg-success ant-switch-checked');
      }
    });
    describe('For Banned Areas Page side content', () => {
      it('should scheduled banned area form work properly', async () => {
        const scheduledBanForm = screen.getByText('Create Scheduled Banned Area');
        expect(scheduledBanForm).toBeInTheDocument();

        form = screen.getByTestId('scheduled-banned-areas-form-test');
        [citySelect, domainTypeSelect, polygonTypeSelect] = within(form).getAllByRole('combobox');

        expect(domainTypeSelect).not.toHaveValue();
        expect(polygonTypeSelect).not.toHaveValue();

        addButton = screen.getByText('Add');
        userEvent.click(addButton);

        await screen.findAllByRole('alert', { style: 'Invalid' });
        await screen.findAllByRole('alert', { style: 'Required' });

        userEvent.click(citySelect);
        const city = screen.getByTitle('Istanbul');
        userEvent.click(city);
        await waitForItemToBeSelected('Istanbul');

        userEvent.click(domainTypeSelect);
        // eslint-disable-next-line no-restricted-syntax
        for (const domain of domainTypes) {
          const domainOption = screen.getByText(domain);
          userEvent.click(domainOption);
          // eslint-disable-next-line no-await-in-loop
          await waitForItemToBeSelected(domain);
        }

        userEvent.click(polygonTypeSelect);
        const vehicleTypedPolygon = await screen.findByTitle('Vehicle type based disabled');

        userEvent.click(vehicleTypedPolygon);
        await waitFor(() => {
          expect(within(form).getAllByRole('combobox')[3]).toBeInTheDocument();
        });

        userEvent.click(within(form).getAllByRole('combobox')[3]);
        const vehicleOption = screen.getByText('Moto');
        userEvent.click(vehicleOption);
        await waitForItemToBeSelected('Moto');

        const hourRangeTitle = screen.getByText('Hour Range');
        expect(hourRangeTitle).toBeInTheDocument();

        const startTimeSelect = screen.getByPlaceholderText('Start time');
        const endTimeSelect = screen.getByPlaceholderText('End time');

        userEvent.click(startTimeSelect);
        userEvent.type(startTimeSelect, '00:00{enter}');
        userEvent.click(endTimeSelect);
        userEvent.type(endTimeSelect, '01:00{enter}');

        await waitFor(() => {
          expect(startTimeSelect).toHaveValue('00:00');
        });
        await waitFor(() => {
          expect(endTimeSelect).toHaveValue('01:00');
        });

        uploadButton = screen.getByRole('button', { name: /Upload GeoJson/i });
        userEvent.click(uploadButton);

        addJsonButton = screen.getByRole('button', { name: /Add Geojson/i });
        expect(addJsonButton).toBeInTheDocument();

        geoJsonInput = screen.getByPlaceholderText('Please add valid json.');
        expect(geoJsonInput).not.toHaveValue();

        fireEvent.change(geoJsonInput, { target: { value: polygonGeoJson } });
        userEvent.click(addJsonButton);
        const successMessage = screen.getAllByRole('alert', { text: /Success/i })[0];
        expect(successMessage).toBeInTheDocument();
      });
    });

    it('should render banned areas when polygontype selected', () => {
      Object.keys(mockedBanPolygonTypes).forEach(banPolygonType => {
        fireEvent.change(polygonTypeSelect, { target: { value: banPolygonType } });
        expect(renderComponent({ ui: (<GeoJsonLayer geoJson={polygonGeoJson} />) }));
      });
    });
  });
});

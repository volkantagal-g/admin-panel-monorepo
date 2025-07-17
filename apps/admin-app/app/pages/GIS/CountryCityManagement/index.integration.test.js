import '@test/publicUtils/configureWithoutCleanup';
import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import PageComponent from '.';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';

import { mockedCountries, mockedCities } from '@shared/api/countryInfo/index.mock.data';

import { defaultValues } from './components/Country/Create/formHelper';
import { defaultCityValues } from './components/City/Create/formHelper';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import mockApiOnce from '@test/publicUtils/mockApiOnce';

const mockCountryData = [
  {
    id: '55999ad00000010000000000',
    name: {
      en: 'Turkey',
      de: 'Türkei',
      fr: 'Turquie',
      nl: 'Turkije',
      tr: 'Türkiye',
      es: 'Turquía',
      it: 'Turchia',
      pt: 'Turquia',
      'en-US': 'Turkey',
    },
    center: {
      type: 'Point',
      coordinates: [35, 39],
      geometry: {
        type: 'Point',
        coordinates: [35, 39],
      },
    },
    code: {
      alpha2: 'TR',
      alpha3: 'TUR',
      numeric: '792',
    },
    currency: {
      code: {
        alpha: 'TRY',
        numeric: '949',
      },
      symbol: '₺',
      isSymbolFirst: true,
    },
    dialingCode: 90,
    timezones: [{ timezone: 'Europe/Istanbul' }],
    flag: '🇹🇷',
    defaultLanguageCode: 'tr',
    languageSortOrder: ['tr', 'en'],
    languages: {
      tr: { name: 'Türkçe' },
      en: { name: 'English' },
    },
    operationalDomainTypes: [1],
    operational: true,
    _id: '55999ad00000010000000000',
  },
];

const mockCityData = [
  {
    id: '55999ad00000010001000000',
    name: {
      en: 'Istanbul',
      tr: 'İstanbul',
    },
    center: {
      type: 'Point',
      coordinates: [29, 41],
      geometry: {
        type: 'Point',
        coordinates: [29, 41],
      },
      zoomRatio: 11,
    },
    timezone: 'Europe/Istanbul',
    _id: '55999ad00000010001000000',
  },
];

const initialUrl = '/gis/countryCityManagement';

const getCountriesFromBE = {
  url: '/countryInfo/getCountriesFromBE',
  method: 'post',
  successData: mockCountryData,
};

const getCitiesRequest = {
  url: '/countryInfo/getCities',
  method: 'post',
  successData: mockCityData,
};

const { _id: countryId, ...restOfCountry } = mockedCountries[0];
const createCountryRequest = {
  url: '/countryInfo/createCountry',
  method: 'post',
  successData: restOfCountry,
};
const { _id: cityId, ...restOfCity } = mockedCities[0];

const mockDefaultCityValues = { countryId: '', ...defaultCityValues };

const createCityRequest = {
  url: '/countryInfo/createCity',
  method: 'post',
  successData: restOfCity,
};

describe('In Country City Management Page:', () => {
  describe('Landing', () => {
    mockApiOnce(getCountriesFromBE);
    mockApiOnce(getCitiesRequest);

    it('Country City Management Page Detail', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_GIS_COUNTRY_CITY_MANAGEMENT,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });

    describe('Page details', () => {
      beforeEach(() => {
        mockApiPerTestCase(getCitiesRequest);
      });

      let pageTitle;
      let countryListTitle;
      let cityListTitle;
      let createCountryButton;
      let createCityButton;
      let countryTable;
      let editCountryButton;
      let boundaryCountryButton;
      let cityTable;
      let idText;

      it('Shows the correct title and elements for existing countries', async () => {
        pageTitle = screen.getByText('Country City Management');
        countryListTitle = screen.getByText('Country List');
        cityListTitle = screen.getByText('City List');
        expect(countryListTitle).toBeInTheDocument();
        expect(cityListTitle).toBeInTheDocument();
        expect(pageTitle).toBeInTheDocument();
        idText = screen.getByText('55999ad00000010000000000');
        expect(idText).toBeInTheDocument();
        editCountryButton = screen.getByTestId('country-info-button-55999ad00000010000000000');
        boundaryCountryButton = screen.getByTestId('country-boundary-button-55999ad00000010000000000');
      });

      it('Creates a new country when the create country button is clicked', async () => {
        createCountryButton = screen.getByTestId('create-country-button-test');

        userEvent.click(createCountryButton);

        const countryCreateTextArea = screen.getByTestId('create-country-textArea-test');
        expect(countryCreateTextArea).toHaveValue(JSON.stringify(defaultValues, null, 2));

        fireEvent.change(countryCreateTextArea, { target: { value: '{"name": "New Country"}' } });
        expect(countryCreateTextArea).toHaveValue('{"name": "New Country"}');

        const submitCountryButton = screen.getByTestId('create-country-button');
        userEvent.click(submitCountryButton);

        const createCountryModal = screen.getByTestId('confirm-modal-create-country');

        const confirmModalTitle = screen.getByText('Are you sure you want to submit changes?');
        expect(confirmModalTitle).toBeInTheDocument();

        const confirmOkButton = within(createCountryModal).getByRole('button', { name: 'OK' });
        userEvent.click(confirmOkButton);
        await waitFor(() => {
          expect(createCountryRequest);
        });
      });

      it('Renders country table columns correctly', () => {
        countryTable = screen.getByTestId('country-table');
        const headers = [
          'ID',
          'Name',
          'Center',
          'Code',
          'Currency',
          'Dialing Code',
          'Timezones',
          'Flag',
          'Default Language Code',
          'Language Sort Order',
          'Operational Domain Types',
          'Operational',
          'Edit',
          'ID',
          'Name',
          'Center',
          'Timezones',
          'Edit',
        ];

        headers.forEach(header => {
          const headerElement = within(countryTable).getByText(header);
          expect(headerElement).toBeInTheDocument();
        });
      });

      it('Creates a new city when the create city button is clicked', async () => {
        createCityButton = screen.getByTestId('create-city-button-test');

        userEvent.click(createCityButton);

        const cityCreateTextArea = screen.getByTestId('create-city-textArea-test');
        expect(cityCreateTextArea).toHaveValue(JSON.stringify(mockDefaultCityValues, null, 2));

        fireEvent.change(cityCreateTextArea, { target: { value: '{"name": "New City"}' } });

        const submitCityButton = screen.getByTestId('create-city-test-submit');
        userEvent.click(submitCityButton);

        const createCityModal = screen.getByTestId('confirm-create-modal-city');

        const confirmCityModalTitle = screen.getByText('Are you sure you want to submit changes?');
        expect(confirmCityModalTitle).toBeInTheDocument();

        const confirmOkButton = within(createCityModal).getByRole('button', { name: 'OK' });
        userEvent.click(confirmOkButton);
        expect(createCityRequest);
      });

      it('Renders city table columns correctly', () => {
        cityTable = screen.getByTestId('city-table');
        const cityheaders = [
          'ID',
          'Name',
          'Center',
          'Timezone',
          'Edit',
        ];

        cityheaders.forEach(header => {
          const headerElement = within(cityTable).getByText(header);
          expect(headerElement).toBeInTheDocument();
        });
      });
      it('should send GET request when a country row is clicked and list cities in the city table', async () => {
        userEvent.click(idText);
        mockApiOnce(getCitiesRequest);

        await waitFor(() => {
          const Istanbul = within(cityTable).getByText('Istanbul');
          expect(Istanbul).toBeInTheDocument();
        });
      });
      it('Edits an existing country when the edit and boundary city button is clicked', async () => {
        const editCityButton = screen.getByTestId('city-info-button-55999ad00000010001000000');
        const boundaryCityButton = screen.getByTestId('city-boundary-button-55999ad00000010001000000');
        expect(boundaryCityButton).toBeInTheDocument();
        userEvent.click(editCityButton);
        const cityEditTextArea = screen.getByTestId('edit-city-textArea-test');
        expect(cityEditTextArea).toBeInTheDocument();
        const submitCityButton = screen.getByTestId('update-city-button');
        userEvent.click(submitCityButton);
        const updateConfirmCityModal = screen.getByTestId('confirm-modal-update-city');
        const cityConfirmModalTitle = screen.getByText('Are you sure you want to submit changes?');
        expect(cityConfirmModalTitle).toBeInTheDocument();
        const confirmOkButton = within(updateConfirmCityModal).getByRole('button', { name: 'OK' });
        userEvent.click(confirmOkButton);
        userEvent.click(boundaryCityButton);
        const cityBoundaryTitle = screen.getByText('Update City Boundary');
        expect(cityBoundaryTitle).toBeInTheDocument();
        await waitFor(() => {
          expect(screen.getByTestId('update-city-loading-icon')).toBeInTheDocument();
        });

        const createCityBoundaryTextArea = screen.getByTestId('boundary-city-text-area');
        expect(createCityBoundaryTextArea).toBeInTheDocument();
        const createCityBoundaryButton = screen.getByTestId('boundary-city-distpatch');
        userEvent.click(createCityBoundaryButton);
        const cityTextdata = `{
          "cityId": "55999ad00000010000000000",
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  33.16533938380883,
                  43.166640450355175
                ],
                [
                  33.00883777777778,
                  42.49296426836841
                ],
                [
                  33.16533938380883,
                  43.166640450355175
                ]
              ]
            ]
          }
        }`;
        fireEvent.change(createCityBoundaryTextArea, { target: { value: cityTextdata } });
        userEvent.click(createCityBoundaryButton);
      });

      it('Edits an existing country when the edit and boundary country button is clicked', async () => {
        userEvent.click(editCountryButton);
        const countryEditTextArea = screen.getByTestId('edit-country-textArea-test');
        userEvent.clear(countryEditTextArea);
        const submitCountryButton = screen.getByTestId('update-country-button');
        userEvent.click(submitCountryButton);
        const updateConfirmCountryModal = screen.getByTestId('confirm-modal-update-country');
        const countryConfirmModalTitle = screen.getByText('Are you sure you want to submit changes?');
        expect(countryConfirmModalTitle).toBeInTheDocument();
        const confirmOkButton = within(updateConfirmCountryModal).getByRole('button', { name: 'OK' });
        userEvent.click(confirmOkButton);

        expect(boundaryCountryButton).toBeInTheDocument();
        userEvent.click(boundaryCountryButton);

        const countryBoundaryTitle = screen.getByText('Update Country Boundary');
        expect(countryBoundaryTitle).toBeInTheDocument();

        await waitFor(() => {
          expect(screen.getByTestId('update-country-loading-icon')).toBeInTheDocument();
        });
        const createCountryBoundaryTextArea = screen.getByTestId('boundary-country-text-area');
        expect(createCountryBoundaryTextArea).toBeInTheDocument();
        const createCountryBoundaryButton = screen.getByTestId('boundary-country-distpatch');
        userEvent.click(createCountryBoundaryButton);
        const data = `{
          "countryId": "55999ad00000010000000000",
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  33.16533938380883,
                  43.166640450355175
                ],
                [
                  33.00883777777778,
                  42.49296426836841
                ],
                [
                  33.16533938380883,
                  43.166640450355175
                ]
              ]
            ]
          }
        }`;
        fireEvent.change(createCountryBoundaryTextArea, { target: { value: data } });
        userEvent.click(createCountryBoundaryButton);
      });
    });
  });
});

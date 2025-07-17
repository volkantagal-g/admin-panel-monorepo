import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderComponent from '@test/publicUtils/renderComponent';
import FormWrapper from './index';

import * as WarehouseSelectors from '../../redux/selectors';
import * as MOCKS from '@shared/api/warehouse/index.mock.data';

import * as CountrySelection from '@shared/redux/selectors/countrySelection';

describe('New Warehouse <FormWrapper /> component unit tests', () => {
  beforeEach(() => {
    jest.spyOn(WarehouseSelectors.sapDraftWarehousesSelector, 'getData').mockReturnValue(MOCKS.sapDraftWarehousesMockData);
  });
  afterEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });
  it('should render component without error', async () => {
    await renderComponent({
      ui: (<FormWrapper />
      ),
    });
    expect(screen.getByText('General')).toBeInTheDocument();
  });

  it('should show GetirGorillas domain type outside Turkey', async () => {
    const getSelectedCountryV2Spy = jest.spyOn(CountrySelection, 'getSelectedCountryV2');

    getSelectedCountryV2Spy.mockReturnValue(
      { code: { alpha2: 'DE' } },
    );

    await renderComponent({
      ui: (<FormWrapper />
      ),
    });

    const domainTypeSelect = screen.getByRole('combobox', { name: 'Domain Type' });

    userEvent.click(domainTypeSelect);

    const gorillasOption = screen.queryByText('GetirGorillas');

    expect(gorillasOption).toBeInTheDocument();
  });

  it('should not show GetirGorillas domain type in Turkey', async () => {
    const getSelectedCountryV2Spy = jest.spyOn(CountrySelection, 'getSelectedCountryV2');

    getSelectedCountryV2Spy.mockReturnValue(
      { code: { alpha2: 'TR' } },
    );

    await renderComponent({
      ui: (<FormWrapper />
      ),
    });

    const domainTypeSelect = screen.getByRole('combobox', { name: 'Domain Type' });

    userEvent.click(domainTypeSelect);

    const gorillasOption = screen.queryByText('GetirGorillas');

    expect(gorillasOption).not.toBeInTheDocument();
  });
});

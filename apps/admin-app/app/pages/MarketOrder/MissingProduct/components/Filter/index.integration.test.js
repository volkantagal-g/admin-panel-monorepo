import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import { filtersSelector } from '../../redux/selectors';
import { defaultDomainType } from '../../redux/actions';
import Filter from '.';
import { getCitiesSelector } from '@shared/redux/selectors/common';

describe('Missing Products Filter Component', () => {
  beforeAll(() => {
    const spyCities = jest.spyOn(getCitiesSelector, 'getData');
    const spyIsPending = jest.spyOn(getCitiesSelector, 'getIsPending');
    const spyFilters = jest.spyOn(filtersSelector, 'getData');
    spyCities.mockReturnValue([]);
    spyIsPending.mockReturnValue(false);
    spyFilters.mockReturnValue({
      domainType: defaultDomainType,
      city: null,

    });
  });

  it('should render Missing Products Filter Component without error', async () => {
    await renderComponent({ ui: <Filter /> });
    const component = screen.getByTestId('missing-products-filter');
    expect(component).toBeInTheDocument();
  });
});

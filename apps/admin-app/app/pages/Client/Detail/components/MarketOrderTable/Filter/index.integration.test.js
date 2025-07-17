import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import moment from 'moment';

import renderComponent from '@test/publicUtils/renderComponent';
import { getCitiesSelector } from '@shared/redux/selectors/common';
import OrdersHistoryFilter from '.';
import { GETIR_DOMAIN_TYPES } from '@shared/shared/constants';

describe('OrdersHistoryFilter Component', () => {
  beforeAll(() => {
    const spyCities = jest.spyOn(getCitiesSelector, 'getData');
    spyCities.mockReturnValue([{
      _id: '55999ad00000010001000000',
      country: '55999ad00000010000000000',
      name: {
        en: 'Istanbul',
        tr: 'İstanbul',
      },

    }]);
  });

  it('should render Filter Component without error', async () => {
    const filters = {
      domainType: GETIR_DOMAIN_TYPES.GETIR10,
      createdAtStart: moment(),
      createdAtEnd: moment(),
    };
    await renderComponent({ ui: <OrdersHistoryFilter filters={filters} /> });
    const component = screen.getByTestId('order-history-filter');
    expect(component).toBeInTheDocument();
  });
});

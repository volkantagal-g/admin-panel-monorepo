import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import { orderDetailSelector } from '../../redux/selectors';

import renderComponent from '@test/publicUtils/renderComponent';

import { mockedMarketOrderDetail } from '@shared/api/marketOrder/index.mock.data';
import SubscriptionBenefitInfoTable from '.';
import permKey from '@shared/shared/permKey.json';

describe('Subscription benefit info table', () => {
  beforeAll(() => {
    const spyOrderDetail = jest.spyOn(orderDetailSelector, 'getData');
    spyOrderDetail.mockReturnValue(mockedMarketOrderDetail);
  });

  it('should render SubscriptionBenefitInfoTable without error', async () => {
    const { addUserPermissions } = await renderComponent({
      ui: (
        <SubscriptionBenefitInfoTable
          data={mockedMarketOrderDetail.basket.subscriptionBenefitInfo}
        />
      ),
    });
    addUserPermissions([permKey.PAGE_GETIR_MARKET_ORDER_DETAIL_SUBSCRIPTION_BENEFIT_INFO]);
    const table = screen.getByTestId('subscription-benefit-info-table');
    expect(table).toBeInTheDocument();
  });
});

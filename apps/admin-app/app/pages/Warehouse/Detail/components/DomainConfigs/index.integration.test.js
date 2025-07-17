import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen } from '@testing-library/react';

import DomainConfigs from '.';
import renderComponent from '@test/publicUtils/renderComponent';

describe('', () => {
  afterAll(cleanup);

  describe('Domain config component', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <DomainConfigs
            domainTypes={[3]}
            configs={
              {
                3: {
                  ORDER_DELIVERY_FEE: {
                    LAYERS: [
                      {
                        min: 0,
                        fee: 2,
                      },
                      {
                        min: 1,
                        fee: 3,
                      },
                    ],
                    SURGE_FEE_LAYERS: [
                      {
                        min: 0,
                        fee: 3,
                      },
                    ],
                    AMOUNT: 1,
                    STRIKE_IF_CALCULATED_AMOUNT_IS_ZERO: 1,
                    DO_NOT_CHARGE_FOR_THE_ORDER_CHARGED_AMOUNT_GREATER_THAN_X: 2,
                    DO_NOT_CHARGE_FOR_THE_FIRST_X_ORDER_COUNT: 3,
                  },
                  ORDER_LIMITS: {
                    MINIMUM_DISCOUNTED_AMOUNT: 2,
                    MAXIMUM_DISCOUNTED_AMOUNT: 3,
                  },
                  ORDER_SERVICE_FEE: {
                    LAYERS: [
                      {
                        min: 0,
                        fee: 3,
                      },
                    ],
                  },
                },
              }
            }
            submitRequest={() => {}}
          />
        ),
      });
      await screen.findByText('DOMAIN_CONFIGS.TITLE');
    });
  });
});

import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import GetLabelByValueDomain from '@app/pages/CourierStatus/List/Component/dataTable/labelByDomain';

describe('Label by value component Listing page', () => {
  it('should render Detail Button without an error', async () => {
    const ALL_DOMAIN_OPTIONS = t => [
      {
        label: t('courierStatusAndBusy:DOMAINS.GETIR10'),
        value: 1,
      },
      {
        label: t('courierStatusAndBusy:DOMAINS.GetirFood'),
        value: 2,
      },
    ];
    await renderComponent({
      ui: (
        <GetLabelByValueDomain
          optionsFunc={ALL_DOMAIN_OPTIONS}
          value={[1]}
        />
      ),
    });
    await screen.findByText('Getir 10');
  });
});

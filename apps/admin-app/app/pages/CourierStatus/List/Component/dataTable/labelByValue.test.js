import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';

import GetLabelByValue from '@app/pages/CourierStatus/List/Component/dataTable/labelByValue';

describe('Label by value component Listing page', () => {
  it('should render Detail Button without error', async () => {
    const ALL_BUSY_OPTIONS = t => [
      {
        label: t('courierStatusAndBusy:REASONS.SHIFT_IS_OVER'),
        value: '555a25f9b4ff93f311ffe1fe',
      },
      {
        label: t('courierStatusAndBusy:REASONS.LUNCH_BREAK'),
        value: '61fa5fadfc89d656b0cf6ae6',
      },
      {
        label: t('courierStatusAndBusy:REASONS.LUNCH_BREAK_START'),
        value: '555a25f9b4ff93f311ffe0fb',
      },
    ];
    await renderComponent({
      ui: (
        <GetLabelByValue
          optionsFunc={ALL_BUSY_OPTIONS}
          value="555a25f9b4ff93f311ffe1fe"
        />
      ),
    });
    await screen.findByText('Shift Is Over');
  });
});

import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import CardInformation from '.';
import { mockedPersonalPromoSuccess } from '@shared/api/customer/index.mock.data';

describe('[PersonalPromo Detail] CardInformation Component', () => {
  it('should render card information', async () => {
    await renderComponent({
      ui: (
        <CardInformation
          promo={mockedPersonalPromoSuccess}
          handleValidUntil={jest.fn()}
          onStatusChange={jest.fn()}
          onEdit={jest.fn()}
          validUntilEdited={null}
        />
      ),
    });

    const card = screen.queryByText('General Information');
    const columns = screen.queryAllByTestId(/promoDetail-data-column/);

    expect(card).toBeInTheDocument();
    expect(columns.length).toBe(10);
  });
});

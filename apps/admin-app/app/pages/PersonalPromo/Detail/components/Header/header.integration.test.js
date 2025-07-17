import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import Header from '.';

describe('[PersonalPromo Detail] Header Component', () => {
  it('should render component', async () => {
    await renderComponent({
      ui: (
        <Header />
      ),
    });

    const header = screen.getByText('Discount Code Detail');
    expect(header).toBeInTheDocument();
  });
});

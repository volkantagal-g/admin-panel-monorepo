import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import DomainTabs from '.';
import '@testing-library/jest-dom'; // Import the jest-dom library
import '@test/publicUtils/configureWithoutCleanup';

describe('DomainTabs component', () => {
  it('main component should render component correctly', async () => {
    await renderComponent({ ui: <DomainTabs /> });
    screen.getByText(/getirlocal/i);
    screen.getByText(/getirfood/i);
    screen.getByText(/getirwater/i);
    screen.getByText(/tip/i);
  });
});

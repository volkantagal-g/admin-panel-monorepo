import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import Header from '.';

describe('Header component', () => {
  it('should render Header component without error', async () => {
    await renderComponent({ ui: <Header /> });
    const component = screen.getByTestId('header-component');
    expect(component).toBeInTheDocument();
  });
});

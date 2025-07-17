import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import MissingProductHeader from '.';

describe('Missing Products Header Component', () => {
  it('should render Missing Products Header Component without error', async () => {
    await renderComponent({ ui: <MissingProductHeader /> });
    const component = screen.getByTestId('header');
    expect(component).toBeInTheDocument();
  });
});

import '@test/publicUtils/configureWithoutCleanup';
import { screen, waitFor } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import Spinner from '.';

describe('Spinner component', () => {
  it('should render Spinner component without an error', async () => {
    // render component waits for all spinners to be gone by default, that's why we add doNotWaitForLoading: true here
    await renderComponent({ ui: <Spinner />, doNotWaitForLoading: true });
    await waitFor(() => {
      const spinners = screen.getAllByTestId('spinner-img');
      expect(spinners.length).toBeGreaterThan(0);
    });
  });
});

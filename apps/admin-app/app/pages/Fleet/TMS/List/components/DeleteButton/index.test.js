// TESTING_PRACTICE_EXAMPLE COMPONENT_INTEGRATION_TEST
import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import DeleteButton from '.';

describe('Delete Button in Listing page', () => {
  it('should render Detail Button without error', async () => {
    await renderComponent({
      ui: (
        <DeleteButton
          id={1}
        />
      ),
    });
    await screen.findByText('Delete');
  });
});

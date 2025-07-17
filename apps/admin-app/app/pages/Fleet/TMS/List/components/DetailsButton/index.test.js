// TESTING_PRACTICE_EXAMPLE COMPONENT_INTEGRATION_TEST
import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import DetailButton from '.';

describe('Detail Button in Listing page', () => {
  it('should render Detail Button without error', async () => {
    await renderComponent({
      ui: (
        <DetailButton
          urlpath="/tms/detail/1"
        />
      ),
    });
    await screen.findByText('Detail');
  });
});

import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import ConnectedContentModal from '@shared/containers/Marketing/ConnectedContentModal/index';

describe('<ConnectedContentModal /> Component - Integration Tests', () => {
  it('should component render successfully', async () => {
    await renderComponent({
      ui: (
        <ConnectedContentModal />
      ),
    });
    expect(screen.getByText('Generate Braze Template')).toBeInTheDocument();
  });
});

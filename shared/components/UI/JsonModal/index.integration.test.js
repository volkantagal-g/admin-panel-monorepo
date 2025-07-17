import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderComponent from '@test/publicUtils/renderComponent';
import JsonModal from './index';

const writeText = jest.fn();
Object.assign(navigator, { clipboard: { writeText } });

describe('JSON Modal', () => {
  beforeAll(() => {
    navigator.clipboard.writeText.mockResolvedValue('success');
  });
  afterAll(cleanup);

  describe('JsonModal', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <JsonModal
            visible
            title="Json Modal"
            handleCancel={jest.fn()}
          />
        ),
      });
      const title = screen.getByText('Json Modal');
      expect(title).toBeInTheDocument();
    });

    it('should copy JSON', async () => {
      const copyButton = screen.getByTestId('copy button');
      expect(screen.getByTestId('copy_icon')).toBeInTheDocument();
      await userEvent.click(copyButton);
      expect(screen.getByTestId('check_icon')).toBeInTheDocument();
    });
  });
});

import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import UploadPicture from '.';
import renderComponent from '@test/publicUtils/renderComponent';
import mockApiOnce from '@test/publicUtils/mockApiOnce';

const getS3SignedUploadPublicUrlErrorMockOptions = {
  url: '/mentorship/getS3SignedUploadPublicUrl',
  errorData: { message: 'Cannot be found' },
};

describe('<UploadPicture /> Component - Integration Tests', () => {
  it('Should handle API call failure', async () => {
    mockApiOnce(getS3SignedUploadPublicUrlErrorMockOptions);
    await renderComponent({ ui: <UploadPicture /> });
    const input = screen.getByTestId('upload-picture');
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    userEvent.upload(input, file);
    const OkButton = await screen.findByRole('button', { name: /ok/i });
    if (OkButton) {
      userEvent.click(OkButton);
      await waitFor(() => {
        expect(screen.queryByAltText(/image/gi)).not.toBeInTheDocument();
      });
    }
  });
});

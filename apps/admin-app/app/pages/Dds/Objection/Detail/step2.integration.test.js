import '@test/publicUtils/configureWithoutCleanup';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething as expectPageSuccess } from '@test/publicUtils/assertions';
import PageComponent from '.';

const objectionDetailId = '619ade7c234aaf14637592fe';
const initialUrl = `/dds/objection/detail/${objectionDetailId}`;

describe('In SES Objection Detail Page:', () => {
  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_DDS_OBJECTION_DETAIL,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitFor(() => {
        expectPageSuccess();
      });
    });
    it('should have correct page content', async () => {
      expect(screen.getByText('Store Efficiency System Objection Detail')).toBeInTheDocument();
      expect(await screen.findByText('Log Information')).toBeInTheDocument();
      expect(screen.getAllByText('Waybills')).toHaveLength(2);
      expect(screen.getByText('Objection Reason')).toBeInTheDocument();
      expect(screen.getByText('Accept')).toBeInTheDocument();
      expect(screen.getByText('Reject')).toBeInTheDocument();
    });
  });
  describe(('For page feature reject button functionality'), () => {
    it('click the reject button', async () => {
      const rejectButton = screen.getByText('Reject');
      userEvent.click(rejectButton);
      await waitFor(() => {
        expect(screen.getByText('Denied Reason')).toBeInTheDocument();
      });

      const cancelButton = screen.getByText('Cancel');
      await waitFor(() => {
        expect(cancelButton).toBeInTheDocument();
      });

      const deniedReasonInput = screen.getByTestId('deniedReason');
      fireEvent.change(deniedReasonInput, { target: { value: 'test reason' } });
      await waitFor(() => {
        expect(deniedReasonInput).toHaveValue('test reason');
      });
      const continueButton = screen.getByText('Continue');
      expect(continueButton).toBeInTheDocument();
      userEvent.click(continueButton);

      await waitFor(() => {
        expect(screen.getByText('Store Efficiency System Objection Detail')).toBeInTheDocument();
      });
    });
  });
});

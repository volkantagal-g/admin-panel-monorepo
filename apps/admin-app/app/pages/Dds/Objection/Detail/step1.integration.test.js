import '@test/publicUtils/configureWithoutCleanup';
import { screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
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
      await waitPageToRenderSomething();
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
  describe('For page feature accept button functionality', () => {
    it('click the accept button', async () => {
      const acceptButton = screen.getByText('Accept');
      userEvent.click(acceptButton);

      const okButton = await screen.findByText('Ok');
      userEvent.click(okButton);

      await waitFor(() => {
        expect(screen.getByText('Store Efficiency System Objection Detail')).toBeInTheDocument();
      });
    });
  });
});

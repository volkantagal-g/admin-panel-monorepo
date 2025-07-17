import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen, within } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '.';
import { testDetailId } from '@shared/api/leaveManagement/index.mock.data';

const initialUrl = `/leaveRequest/${testDetailId}`;

describe('In Employee Leave Request Detail Page:', () => {
  afterAll(cleanup);

  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_WORKFORCE_EMPLOYEE_LEAVE_MANAGEMENT_DETAIL,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });
  describe('For page features', () => {
    let card;
    it('should show info fields', async () => {
      card = screen.getByTestId('LEAVE_REQUEST_DETAIL_CARD');
      within(card).getByText('Name');
      within(card).getByText('Leave Type');
      within(card).getByText('Leave Dates');
      within(card).getByText('Leave Duration');
      within(card).getByText('Documents');
      within(card).getByText('Note');
    });

    it('should show approve/reject/cancel buttons in panel', async () => {
      const cardFooter = screen.getByTestId('LEAVE_REQUEST_DETAIL_FOOTER');
      const [approve, reject, cancel] = await within(cardFooter).findAllByRole('button');
      expect(approve).toHaveTextContent('Approve');
      expect(reject).toHaveTextContent('Reject');
      expect(cancel).toHaveTextContent('Cancel');
    });
  });
});

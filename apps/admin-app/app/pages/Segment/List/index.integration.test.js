import '@test/publicUtils/configureWithoutCleanup';
import { act, cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething, waitForToastElementToAppear } from '@test/publicUtils/assertions';
import PageComponent from '.';
import { mockedSegments } from '@shared/api/segments/index.mock.data';

const initialUrl = '/segment/list';

describe('In SegmentList Page:', () => {
  afterAll(cleanup);
  let renderResult;

  describe('For app level features', () => {
    it('should render without an error', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_SEGMENT_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });

    it('should contain segment info', async () => {
      mockedSegments.forEach(segment => screen.getByText(segment.description));
    });

    it('should not display reset clients button without permission', async () => {
      expect(screen.queryByRole('button', { name: /reset/i })).not.toBeInTheDocument();
    });

    it('should display reset clients button when permitted', async () => {
      const { addUserPermissions } = renderResult;

      act(() => {
        addUserPermissions([permKey.PAGE_SEGMENT_DETAIL_COMPONENT_EDIT_SEGMENT]);
      });

      expect(screen.getAllByRole('button', { name: /reset/i }).length).toBeGreaterThan(0);
    });

    it('clicking reset clients button should open a confirmation box and confirmation should show a success toast message', async () => {
      const resetClientsButton = screen.getAllByRole('button', { name: /reset/i })[0];
      userEvent.click(resetClientsButton);
      const confirmButton = screen.getByRole('button', { name: 'OK' });

      userEvent.click(confirmButton);

      await waitForToastElementToAppear();
      expect(screen.getByText('Success')).toBeInTheDocument();
    });
  });
});

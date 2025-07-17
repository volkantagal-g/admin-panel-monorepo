import '@test/publicUtils/configureWithoutCleanup';
import { act, cleanup, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething, waitForToastElementToAppear } from '@test/publicUtils/assertions';
import PageComponent from '.';
import { mockedSegments } from '@shared/api/segments/index.mock.data';

const initialUrl = '/segment/detail/65fd4f7280f0d14ec120ae91';

describe('In SegmentDetail Page:', () => {
  afterAll(cleanup);
  let renderResult;
  describe('For app level features', () => {
    it('should render without an error', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_SEGMENT_DETAIL,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });

    it('should contain segment info', async () => {
      screen.getByDisplayValue(mockedSegments[0].description);
    });

    it('should not display reset clients button without permission', async () => {
      expect(screen.queryByRole('button', { name: /reset/i })).not.toBeInTheDocument();
    });

    it('should display reset clients button when permitted', async () => {
      const { addUserPermissions } = renderResult;

      act(() => {
        addUserPermissions([permKey.PAGE_SEGMENT_DETAIL_COMPONENT_EDIT_SEGMENT]);
      });

      expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
    });

    it('clicking reset clients button should open a confirmation box and confirmation should show a success toast message', async () => {
      const resetClientsButton = screen.getByRole('button', { name: /reset/i });
      userEvent.click(resetClientsButton);
      const confirmButton = screen.getByRole('button', { name: 'OK' });

      userEvent.click(confirmButton);

      await waitForToastElementToAppear();
      expect(screen.getByText('Success')).toBeInTheDocument();
    });

    let expirationStatusInfoForm;
    it('should render Expiration Status Info form', async () => {
      expirationStatusInfoForm = screen.getByTestId('segment-detail-expiration-status-form');
      screen.getByText('Expiration Status Info');
      within(expirationStatusInfoForm).getByLabelText('Is Expired?');
      within(expirationStatusInfoForm).getByText('Expired At');
      within(expirationStatusInfoForm).getByRole('checkbox', { name: 'Is Expired?', checked: !!mockedSegments[0].expiration?.isExpired });
    });

    let indefiniteExpirationInfoForm;
    it('should render Indefinite Expiration Info form', async () => {
      indefiniteExpirationInfoForm = screen.getByTestId('segment-detail-indefinite-expiration-form');
      screen.getByText('Expiration Status Info');
      within(indefiniteExpirationInfoForm).getByLabelText('Is Indefinite Expiration Enabled?');
      within(indefiniteExpirationInfoForm).getByLabelText('Reason');
      within(indefiniteExpirationInfoForm).getAllByText('Created At');
      within(indefiniteExpirationInfoForm)
        .getByRole('checkbox', { name: 'Is Indefinite Expiration Enabled?', checked: !!mockedSegments[0].lifetimeConditions?.isEnabled });
      within(indefiniteExpirationInfoForm).getByRole('textbox', { name: 'Reason', value: mockedSegments[0].lifetimeConditions?.reason });
    });

    it('should display Expiration Status Info form edit button only when permitted', async () => {
      const { addUserPermissions } = renderResult;

      expect(within(expirationStatusInfoForm).queryByRole('button', { name: /edit/i })).not.toBeInTheDocument();
      act(() => {
        addUserPermissions([permKey.PAGE_SEGMENT_DETAIL_COMPONENT_EDIT_EXPIRATION_STATUS]);
      });
      expect(within(expirationStatusInfoForm).getByRole('button', { name: /edit/i })).toBeInTheDocument();
    });

    it('should display Indefinite Expiration Info form button only when permitted', async () => {
      const { addUserPermissions } = renderResult;

      expect(within(indefiniteExpirationInfoForm).queryByRole('button', { name: /edit/i })).not.toBeInTheDocument();
      act(() => {
        addUserPermissions([permKey.PAGE_SEGMENT_DETAIL_COMPONENT_EDIT_INDEFINITE_EXPIRATION]);
      });
      expect(within(indefiniteExpirationInfoForm).getByRole('button', { name: /edit/i })).toBeInTheDocument();
    });
  });
});

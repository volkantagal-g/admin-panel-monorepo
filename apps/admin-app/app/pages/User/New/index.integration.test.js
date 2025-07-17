import '@test/publicUtils/configureWithoutCleanup';
import { act, cleanup, fireEvent, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething, expectSelectItemAndWaitForToBeSelected } from '@test/publicUtils/assertions';
import PageComponent from '.';

const initialUrl = '/user/new';

describe('In User Creation Page:', () => {
  let renderResult;
  afterAll(cleanup);
  describe('For page features', () => {
    it('should render without an error', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_USER_NEW,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should have correct page content', async () => {
      expect(screen.getByText('New User')).toBeInTheDocument();
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Global Access')).toBeInTheDocument();
      expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
      expect(screen.getByLabelText('Countries')).toBeInTheDocument();
    });
    it('should show validation errors when required fields are not filled', async () => {
      const submitButton = screen.getByText('Create');
      userEvent.click(submitButton);
      const errorMessages = await screen.findAllByRole('alert');
      // name and e-mail
      expect(errorMessages).toHaveLength(2);
    });

    it('should remove validation errors when name and e-mail is filled', async () => {
      const nameInput = screen.getByLabelText('Name');
      const emailInput = screen.getByLabelText('E-mail');
      await userEvent.type(nameInput, 'Test User', { delay: 10 });
      await userEvent.type(emailInput, 'test.user@getir.com', { delay: 10 });
      // blur to trigger validation
      fireEvent.blur(emailInput);
      await waitFor(() => {
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      });
    });

    // TODO: Fix the failing tests
    it.skip('should disable countries input when global access is checked', async () => {
      const globalAccessCheckbox = screen.getByLabelText('Global Access');
      const countriesInput = screen.getByLabelText('Countries');
      userEvent.click(globalAccessCheckbox);
      await waitFor(() => {
        expect(countriesInput).toBeDisabled();
      });
    });
    it('should be able to select countries when global access is not checked', async () => {
      const globalAccessCheckbox = screen.getByLabelText('Global Access');
      userEvent.click(globalAccessCheckbox);
      const countriesInput = await screen.findByLabelText('Countries');
      await waitFor(() => {
        expect(countriesInput).toBeEnabled();
      });
      await expectSelectItemAndWaitForToBeSelected(countriesInput, 'Turkey');
      await expectSelectItemAndWaitForToBeSelected(countriesInput, 'France');
    });

    it('should be able to save user', async () => {
      const { addUserPermissions } = renderResult;
      // after creating a user we navigate to detail page, prepare permission first
      act(() => {
        addUserPermissions([permKey.PAGE_USER_NEW]);
      });
      const submitButton = screen.getByText('Create');
      userEvent.click(submitButton);

      // we should land on the user detail page, so no New User header
      await waitFor(() => {
        expect(screen.queryByText('New User')).not.toBeInTheDocument();
      });
    });
  });
});

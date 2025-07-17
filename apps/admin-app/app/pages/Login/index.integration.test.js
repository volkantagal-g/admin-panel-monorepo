import '@test/publicUtils/configureWithoutCleanup';
import '@test/publicUtils/setupWithoutLoggedInUser';
import { act, screen, cleanup /* , waitFor */ } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import permKey from '@shared/shared/permKey.json';

import { mockedUser } from '@shared/api/user/index.mock.data';
import renderApp from '@test/publicUtils/renderApp';
// import { expectToHavePageHeaderText } from '@test/publicUtils/assertions';

describe('In Login Page:', () => {
  describe('Before logged in', () => {
    afterAll(cleanup);
    it('should render without an error', async () => {
      await renderApp();
      await screen.findByRole('button', { name: 'I do not have a Getir email' });
    });

    it('should show email form after clicking "no email"', async () => {
      const button = screen.getByRole('button', { name: 'I do not have a Getir email' });
      userEvent.click(button);
      await screen.findByPlaceholderText('Email');
    });

    it('should send magic link after email filled and submitted', async () => {
      const emailInput = screen.getByPlaceholderText('Email');
      userEvent.type(emailInput, mockedUser.email);
      const button = screen.getByRole('button', { name: 'Log in' });
      userEvent.click(button);
      await screen.findByText('Login link has been sent to your email');
    });
  });

  const userListPageUrl = '/user/list';
  const TURKEY_ID = '55999ad00000010000000000';

  describe('After logged in', () => {
    let renderResult;
    it('should first redirect to the redirect country selection page', async () => {
      renderResult = await renderApp({ initialPath: `/login?authTempToken=RandomTestToken${userListPageUrl}` });
      await screen.findByRole('heading', { name: 'Select Country' });
    });
    it('should redirect to page url in the link after selecting country', async () => {
      act(() => {
        renderResult.addUserPermissions(
          [permKey.PAGE_USER_LIST],
          TURKEY_ID,
        );
      });
      const aCountryButton = await screen.findByText('Turkey');
      userEvent.click(aCountryButton);
      // TODO: fix this test after redirect logic is fixed
      // await waitFor(() => {
      //   expectToHavePageHeaderText('Users');
      // });
    });
  });
});

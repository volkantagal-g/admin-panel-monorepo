import '@test/publicUtils/configureWithoutCleanup';

import { act, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import waitForLoading from '@test/utils/waitForLoading';
import PageComponent from '../../index';

const initialUrl = '/person/contract/new';

describe('In Person Contract Detail Page: New', () => {
  /**
   * @type Awaited<ReturnType<typeof renderPage>>
   */
  let renderResult;

  describe('For page features', () => {
    it('should render without an error', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_PERSON_CONTRACT_DETAIL,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
      await waitForLoading();
    });

    it('fields can be updated', async () => {
      await waitFor(() => {
        expect(screen.getByTestId('form-person-contract')).toBeInTheDocument();
      });
      const inpName = screen.getByPlaceholderText('Name');
      await userEvent.type(inpName, 'Some text', { delay: 10 });
    });

    it('shouldn\'t show submit button', async () => {
      const submitButton = screen.queryByRole('button', { name: 'Submit' });
      expect(submitButton).not.toBeInTheDocument();
    });

    it('should show submit button when permitted', async () => {
      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_PERSON_CONTRACT_CREATE]);
      });
      const submitButton = screen.queryByRole('button', { name: 'Submit' });
      userEvent.click(submitButton);
    });
  });
});

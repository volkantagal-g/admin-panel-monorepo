import '@test/publicUtils/configureWithoutCleanup';

import { act, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { testDetailId } from '@shared/api/personContractType/index.mock.data';
import { PERSON_CONTRACT_GROUP_ID as contractGroupId } from '@shared/shared/constants';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import PageComponent from '../../index';

const initialUrl = `/person/contract/${testDetailId}`;

describe('In Person Contract Detail Page: Edit', () => {
  describe('For page features', () => {
    /**
     * @type Awaited<ReturnType<typeof renderPage>>
     */
    let renderResult;

    it('should render without an error', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_PERSON_CONTRACT_DETAIL,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });

    const formGroups = [
      [contractGroupId.genInfo, (permKey.PAGE_PERSON_CONTRACT_EDIT)],
      [contractGroupId.break, (permKey.PAGE_PERSON_CONTRACT_EDIT_BREAK)],
      // [contractGroupId.leave, (permKey.PAGE_PERSON_CONTRACT_EDIT_LEAVE)],
      [contractGroupId.compConfig, (permKey.PAGE_PERSON_CONTRACT_EDIT_COMP_CONFIG)],
      [contractGroupId.schdConfig, (permKey.PAGE_PERSON_CONTRACT_EDIT_SCHD_CONFIG)],
    ];

    it.each(
      formGroups,
    )('should allow editing form groups when permitted', async (groupName, perm) => {
      const formGroupContainer = () => {
        const content = screen.getByTestId(`form-person-contract-${testDetailId}-${groupName}`);
        return content;
      };
      let btnEdit;
      btnEdit = within(formGroupContainer()).queryByRole('button', { name: 'Edit' });
      expect(btnEdit).not.toBeInTheDocument();

      act(() => {
        renderResult.addUserPermissions([perm]);
      });

      btnEdit = within(formGroupContainer()).queryByRole('button', { name: 'Edit' });
      userEvent.click(btnEdit);
      const btnSave = within(formGroupContainer()).queryByRole('button', { name: 'Save' });
      const btnCancel = within(formGroupContainer()).queryByRole('button', { name: 'Cancel' });
      userEvent.click(btnSave);
      const yesButton = screen.getByText('Yes');
      userEvent.click(yesButton);
      userEvent.click(btnCancel);
      // TODO: wait for something here
    });
  });
});

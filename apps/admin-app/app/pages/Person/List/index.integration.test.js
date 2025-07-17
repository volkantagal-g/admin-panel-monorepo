import '@test/publicUtils/configureWithoutCleanup';

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import { expectSidebarMenuToHaveV2, waitPageToRenderSomething } from '@test/publicUtils/assertions';
import permKey from '@shared/shared/permKey.json';
import PageComponent from '.';
import { personListMock } from '@shared/api/person/index.mock.handler';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';

describe('In person list page:', () => {
  it('should render without an error', async () => {
    mockApiPerTestCase(personListMock);
    await renderPage({
      pagePermKey: permKey.PAGE_PERSON_LIST,
      pageUrl: '/person/list',
      pageComponent: PageComponent,
    });
    await waitPageToRenderSomething();
  });

  it('should show related menu group', () => {
    expectSidebarMenuToHaveV2('Field', [
      'Field Employee',
      'Person List',
    ]);
  });

  describe('For page features', () => {
    it('should show filters and bring person list', async () => {
      await screen.findByText('Filter');
      await screen.findAllByText('Activeness');
      const [nameInput, nationalIDInput] = screen.getAllByRole('textbox');
      userEvent.type(nameInput, 'name{enter}');
      userEvent.type(nationalIDInput, '1234{enter}');
      const button = screen.getByText('Bring');
      userEvent.click(button);
    });

    it('should show table with columns', async () => {
      await screen.findByTestId('person-list-table');
      await screen.findByText('Image');
      await screen.findAllByText('Name');
      await screen.findByText('Personal Gsm');
      await screen.findAllByText('Activeness');
      await screen.findByText('Courier Pool');
      await screen.findByText('Training');
    });

    it('should export person list excel', async () => {
      const exportButton = screen.getByLabelText('cloud-download');
      userEvent.click(exportButton);
    });

    it('should pagination', async () => {
      const nextPageButton = screen.getByTitle('Next Page');
      userEvent.click(nextPageButton);
    });
  });
});

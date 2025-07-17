import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import { expectToHavePageHeaderText } from '@test/publicUtils/assertions';
import permKey from '@shared/shared/permKey.json';
import PageComponent from '.';
import { mockedTeams } from '@shared/api/internalAuthentication/index.mock.data';
import waitForLoading from '@test/utils/waitForLoading';

const initialUrl = `/internalAuthentication/team/detail/${mockedTeams[0]._id}`;

describe('In internal authentication team detail page:', () => {
  it('should render without an error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_INTERNAL_AUTHENTICATION_TEAM_DETAIL,
      pageUrl: initialUrl,
      pageComponent: PageComponent,
    });
  });

  it('should have correct page header', () => {
    expectToHavePageHeaderText(mockedTeams[0].name);
  });

  it('should have core sections', () => {
    expect(screen.getByText('Team Info')).toBeInTheDocument();
    expect(screen.getByText('Repositories owned by the team')).toBeInTheDocument();
  });

  it('should be able to edit details', async () => {
    userEvent.click(screen.getByText('Edit'));

    const serviceNameInput = await screen.findByDisplayValue(mockedTeams[0].name);
    userEvent.type(serviceNameInput, 'updated-team-name');

    userEvent.click(screen.getByText('Save'));
    await waitForLoading();
  });

  it('should be able to create a new repository', async () => {
    const createRepositoryButton = await screen.findByText('Create new Repository');
    userEvent.click(createRepositoryButton);

    const nameInput = screen.getByTestId('create-repository-name-input');
    userEvent.type(nameInput, 'test-repository');

    const descriptionInput = screen.getByTestId('create-repository-description-input');
    userEvent.type(descriptionInput, 'test description');

    userEvent.click(screen.getByText('OK'));
    await waitForLoading();
  });

  it('should see delete button', async () => {
    expect(screen.getAllByText('Delete')[0]).toBeInTheDocument();
    userEvent.click(screen.getAllByText('Delete')[0]);

    // popconfirm
    userEvent.click(await screen.findByText('Yes'));
  });
});

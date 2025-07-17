import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import { expectToHavePageHeaderText } from '@test/publicUtils/assertions';
import permKey from '@shared/shared/permKey.json';
import PageComponent from '.';
import waitForLoading from '@test/utils/waitForLoading';
import { mockedTeams } from '@shared/api/internalAuthentication/index.mock.data';

const initialUrl = '/internalAuthentication/team/list';

describe('In internal authentication team list page:', () => {
  let renderResult;
  it('should render without an error', async () => {
    renderResult = await renderPage({
      pagePermKey: permKey.PAGE_INTERNAL_AUTHENTICATION_TEAM_LIST,
      pageUrl: initialUrl,
      pageComponent: PageComponent,
    });
  });

  it('should have correct page header', () => {
    expectToHavePageHeaderText('Internal Technology Teams');
  });

  it('shouldn\'t see service list link if not permitted', async () => {
    expect(screen.queryByText('List of all Services')).not.toBeInTheDocument();
  });
  it('should see service list link if permitted', async () => {
    const { addUserPermissions } = renderResult;
    addUserPermissions([permKey.PAGE_INTERNAL_AUTHENTICATION_SERVICE_LIST]);

    expect(screen.getByText('List of all Repositories')).toBeInTheDocument();
  });

  it('should be able to search for a team', async () => {
    const searchInput = await screen.findByPlaceholderText('Search');
    userEvent.type(searchInput, mockedTeams[0].name);

    await screen.findByText(mockedTeams[0].name);
    await screen.findByText(mockedTeams[0].description);
  });

  it('should be able to create a new team', async () => {
    const newTeamButton = await screen.findByText('New Team');
    userEvent.click(newTeamButton);
    userEvent.click(await screen.findByText('Cancel'));

    userEvent.click(newTeamButton);

    const nameInput = await screen.findByTestId('create-team-name-input');
    userEvent.type(nameInput, 'test-team');

    const descriptionInput = screen.getByTestId('create-team-description-input');
    userEvent.type(descriptionInput, 'test description');

    userEvent.click(screen.getByText('OK'));
    screen.getByText('Add new Team'); // expect modal title to still be there, since validation of team name has failed

    userEvent.type(nameInput, 'test-team-10-characters');
    userEvent.click(screen.getByText('OK')); // expected to succeed
    await waitForLoading();
  });
});

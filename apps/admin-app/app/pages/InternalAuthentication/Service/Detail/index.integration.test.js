import '@test/publicUtils/configureWithoutCleanup';
import { act, cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import { expectToHavePageHeaderText, waitForItemToBeSelected } from '@test/publicUtils/assertions';
import permKey from '@shared/shared/permKey.json';
import PageComponent from '.';
import { mockedServices, mockedSlackConfigurations } from '@shared/api/internalAuthentication/index.mock.data';
import waitForLoading from '@test/utils/waitForLoading';

const initialUrl = `/internalAuthentication/service/detail/${mockedServices[0].team._id}/${mockedServices[0]._id}`;

describe('In internal authentication service detail page:', () => {
  afterAll(cleanup);
  let renderResult;
  it('should render without an error', async () => {
    renderResult = await renderPage({
      pagePermKey: permKey.PAGE_INTERNAL_AUTHENTICATION_SERVICE_DETAIL,
      pageUrl: initialUrl,
      pageComponent: PageComponent,
    });
  });

  it('should have correct page header', () => {
    expectToHavePageHeaderText(mockedServices[0].name);
  });

  it('should have core sections', () => {
    expect(screen.getByText('Repository Info')).toBeInTheDocument();
    expect(screen.getByText('Slack Configurations')).toBeInTheDocument();
  });

  it('should see activeness switch', async () => {
    const switchButton = screen.getByRole('switch', { name: 'Active' });
    userEvent.click(switchButton);
    expect(switchButton).toBeInTheDocument();
  });

  it('should be able to edit details', async () => {
    userEvent.click(screen.getAllByText('Edit')[0]);

    const serviceNameInput = await screen.findByDisplayValue(mockedServices[0].name);
    userEvent.type(serviceNameInput, 'updated-service-name');

    userEvent.click(screen.getByText('Save'));
    await waitForLoading();
  });

  it('should see generate token button if permitted', async () => {
    const { addUserPermissions } = renderResult;
    expect(screen.queryByText('Generate Token')).not.toBeInTheDocument();

    act(() => {
      addUserPermissions([permKey.PAGE_INTERNAL_AUTHENTICATION_SERVICE_DETAIL_COMPONENT_GENERATE_TOKEN]);
    });

    userEvent.click(screen.getByText('Generate Token'));
    await screen.findByText(mockedSlackConfigurations.accessToken);
  });

  it('should be able to add a channel', async () => {
    const [addChannelButton] = screen.getAllByRole('button', { name: 'Add Channel' });
    userEvent.click(addChannelButton);

    const workspaceName = await screen.findByRole('combobox');
    userEvent.click(workspaceName);
    const workspace = await screen.findByText('getir-dev');
    userEvent.click(workspace);
    await waitForItemToBeSelected('getir-dev');

    const channelNameInput = screen.getByTestId('slack-configuration-channel-name-input');
    userEvent.type(channelNameInput, 'test-channel');

    userEvent.click(screen.getByText('OK'));
    await waitForLoading();
  });

  it('should be able to add the DM config', async () => {
    const [addDMConfigButton] = screen.getAllByRole('button', { name: 'Add DM Config' });
    userEvent.click(addDMConfigButton);

    const workspaceName = await screen.findByRole('combobox');
    userEvent.click(workspaceName);
    const workspace = await screen.findByText('getir-dev');
    userEvent.click(workspace);
    await waitForItemToBeSelected('getir-dev');

    const isDMEnabledCheckbox = screen.getByTestId('slack-configuration-dm-config-checkbox');
    userEvent.click(isDMEnabledCheckbox);

    userEvent.click(screen.getByText('OK'));
    await waitForLoading();
  });

  it('should be able to edit a channel', async () => {
    // index 0 corresponds with the service itself, indices 1 through n are the workspace channel name pairs
    const [, editChannelButton] = screen.getAllByRole('button', { name: 'Edit' });
    userEvent.click(editChannelButton);

    const channelNameInput = await screen.findByText(mockedSlackConfigurations.workspaceChannelNamePairs[0].channelName);
    userEvent.type(channelNameInput, 'test-channel');

    userEvent.click(screen.getByRole('button', { name: 'OK' }));
    await waitForLoading();
  });

  it('should be able to edit a DM config', async () => {
    const [, , editDMButton] = screen.getAllByRole('button', { name: 'Edit' });
    userEvent.click(editDMButton);

    const isDMEnabledCheckbox = screen.getByTestId('slack-configuration-dm-config-checkbox');
    userEvent.click(isDMEnabledCheckbox);

    userEvent.click(screen.getByRole('button', { name: 'OK' }));
    await waitForLoading();
  });

  it('should be able to test a slack configuration', async () => {
    // TODO: "Test Message" finds 2 buttons, fix it better
    const [testButton] = screen.getAllByRole('button', { name: 'Test Message' });
    userEvent.click(testButton);

    await screen.findByText('How to Send a Slack Message?');

    userEvent.click(screen.getAllByRole('button', { name: 'OK' })[0]);
  });

  it('should see delete button', async () => {
    expect(screen.getAllByText('Delete')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Delete')[1]).toBeInTheDocument();
    userEvent.click(screen.getAllByText('Delete')[0]);

    // popconfirm
    userEvent.click(await screen.findByText('Yes'));
  });
});

import { act, cleanup, screen, within } from '@testing-library/react';
import * as redux from 'react-redux';

import userEvent from '@testing-library/user-event';

import renderComponent from '@test/publicUtils/renderComponent';
import BadgeDetailForm from './index';

import { getBadgeSelector } from '@app/pages/MarketProduct/Badge/Detail/redux/selectors';
import { mockedBadge } from '@shared/api/marketProductBadge/index.mock.data';

describe('Market Product/Badge/Detail/BadgeDetailForm', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should render component without error', async () => {
    await renderComponent({ ui: <BadgeDetailForm /> });
  });

  it('should render name correctly', async () => {
    const badgeSpy = jest.spyOn(getBadgeSelector, 'getData');
    badgeSpy.mockReturnValue(mockedBadge);

    await renderComponent({ ui: <BadgeDetailForm /> });

    await screen.findByText('Name');
    await screen.findByDisplayValue('mocked badge');
  });

  it('should render position correctly', async () => {
    const badgeSpy = jest.spyOn(getBadgeSelector, 'getData');
    badgeSpy.mockReturnValue(mockedBadge);

    await renderComponent({ ui: <BadgeDetailForm /> });

    await screen.findByText('Position');
    await screen.findByText('Top Left');
  });

  it('should render domain types correctly', async () => {
    const badgeSpy = jest.spyOn(getBadgeSelector, 'getData');
    badgeSpy.mockReturnValue(mockedBadge);

    await renderComponent({ ui: <BadgeDetailForm /> });

    await screen.findByText('Domain Types');
    await screen.findByText('Getir10');
    await screen.findByText('GetirMore');
    await screen.findByText('GetirWater');
  });

  it('should render status for active badges correctly', async () => {
    const badgeSpy = jest.spyOn(getBadgeSelector, 'getData');
    badgeSpy.mockReturnValue(mockedBadge);

    await renderComponent({ ui: <BadgeDetailForm /> });

    const statusInput = await screen.findByLabelText('Status');
    await within(statusInput).findByText('Active');
  });

  it('should render status for inactive badges correctly', async () => {
    const badgeSpy = jest.spyOn(getBadgeSelector, 'getData');
    badgeSpy.mockReturnValue({
      ...mockedBadge,
      isActive: false,
    });

    await renderComponent({ ui: <BadgeDetailForm /> });

    const statusInput = await screen.findByLabelText('Status');
    await within(statusInput).findByText('Inactive');
  });

  it('shows fields as disabled by default and it turns active if edit button is clicked', async () => {
    const badgeSpy = jest.spyOn(getBadgeSelector, 'getData');
    badgeSpy.mockReturnValue(mockedBadge);

    await renderComponent({ ui: <BadgeDetailForm /> });

    const nameInput = await screen.findByLabelText('Name');
    expect(nameInput).toBeDisabled();

    const descriptionInput = await screen.findByLabelText('Description');
    expect(descriptionInput).toBeDisabled();

    const positionInput = await screen.findByLabelText('Position');
    expect(positionInput).toBeDisabled();

    const domainTypesInput = await screen.findByLabelText('Domain Types');
    expect(domainTypesInput).toBeDisabled();

    const statusInput = await screen.findByLabelText('Status');
    expect(statusInput).toBeDisabled();

    const editButton = await screen.findByText('Edit');
    await userEvent.click(editButton);

    const nameInputEnabled = await screen.findByLabelText('Name');
    expect(nameInputEnabled).toBeEnabled();

    const descriptionInputEnabled = await screen.findByLabelText('Description');
    expect(descriptionInputEnabled).toBeEnabled();

    const positionInputEnabled = await screen.findByLabelText('Position');
    expect(positionInputEnabled).toBeEnabled();

    const domainTypesInputEnabled = await screen.findByLabelText('Domain Types');
    expect(domainTypesInputEnabled).toBeEnabled();

    const statusInputEnabled = await screen.findByLabelText('Status');
    expect(statusInputEnabled).toBeEnabled();
  });

  it('dispatches the correct action with correct values after submit', async () => {
    const testDescription = 'Test Description';
    const testName = 'Test Name';

    const badgeSpy = jest.spyOn(getBadgeSelector, 'getData');
    badgeSpy.mockReturnValue(mockedBadge);

    await renderComponent({ ui: <BadgeDetailForm /> });

    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatch = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatch);

    const editButton = await screen.findByText('Edit');
    userEvent.click(editButton);

    const nameInput = await screen.findByLabelText('Name');
    userEvent.clear(nameInput);
    userEvent.type(nameInput, testName);

    const descriptionInput = await screen.findByLabelText('Description');
    userEvent.clear(descriptionInput);
    userEvent.type(descriptionInput, testDescription);

    const saveButton = await screen.findByText('Save');

    // this one is necessary
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.click(saveButton);
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'MARKET_PRODUCT_BADGE_DETAIL_UPDATE_BADGE_REQUEST',
      id: mockedBadge._id,
      body: {
        description: testDescription,
        domainTypes: [
          '1',
          '3',
          '4',
        ],
        isActive: true,
        name: testName,
        position: 'topLeft',
      },
    });
  });
});

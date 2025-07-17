/* eslint-disable testing-library/no-node-access */
import '@test/publicUtils/configureWithoutCleanup';
import { act, cleanup, fireEvent, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import permKey from '@shared/shared/permKey.json';
import { crisisIncidentList, crisisIncidentDetails } from '@shared/api/pickerCrisis/index.mock.data';
import renderComponent from '@test/publicUtils/renderComponent';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import CrisisIncidents from './index';

jest.mock('@shared/i18n', () => ({
  ...jest.requireActual('@shared/i18n'),
  getLangKey: () => 'en',
}));

const control = {
  getBtnSearch: () => screen.getByText('Bring'),
  getSelTopic: () => screen.getAllByRole('combobox')[0],
  getBtnNewCard: () => screen.queryByText('New Card'),
  getBtnExportExcel: () => screen.getByText('Export Excel'),
  getTblIncidents: () => {
    const tables = screen.getAllByRole('table');
    let header;
    let body;
    if (tables.length === 1) {
      [body] = tables;
    }
    if (tables.length === 2) {
      [header, body] = tables;
    }
    return { header, body };
  },
};

describe('Picker Crisis Management: Incident', () => {
  let renderResult;
  let origWindowOpen;
  beforeAll(() => {
    origWindowOpen = window.open;
    window.open = jest.fn();
  });
  afterAll(() => {
    window.open = origWindowOpen;
    cleanup();
  });

  it('is present in the page', async () => {
    renderResult = await renderComponent({ ui: <CrisisIncidents pickerId="587c9e24a1a56d0014072d82" /> });
    expect(screen.getByTestId('picker-crisis-incident')).toBeInTheDocument();
  });

  it('shows grid controls WITHOUT "New Card" when proper permissions are NOT present', async () => {
    const selTopic = control.getSelTopic();
    const btnSearch = control.getBtnSearch();
    const btnNewCard = control.getBtnNewCard();
    const btnExportExcel = control.getBtnExportExcel();
    expect(selTopic).toBeInTheDocument();
    expect(btnSearch).toBeInTheDocument();
    expect(btnNewCard).not.toBeInTheDocument();
    expect(btnExportExcel).toBeInTheDocument();
  });

  it('shows grid controls WITH "New Card" when permissions are present', async () => {
    const { addUserPermissions } = renderResult;
    act(() => {
      addUserPermissions([permKey.PAGE_PICKER_DETAIL_COMPONENT_CRISIS_MANAGEMENT_CREATE]);
    });
    const btnNewCard = control.getBtnNewCard();
    expect(btnNewCard).toBeInTheDocument();
  });

  it('has properly working grid filters', async () => {
    const selection = '104';
    const select = control.getSelTopic();
    fireEvent.mouseDown(select);
    await waitFor(() => {
      expect(select).toBeEnabled();
    });
    expect(screen.getAllByText(selection)[0]).toBeInTheDocument();
  });

  it('shows a populated grid content when filters are provided', async () => {
    const { body } = control.getTblIncidents();
    within(body).getByText(crisisIncidentList.records[0].cardNumber);
  });

  it('shows the grid WITHOUT delete button', async () => {
    const { body } = control.getTblIncidents();
    expect(within(body).queryAllByText('Delete')[0]).toBeFalsy();
  });

  it('shows the grid with delete button with permission', async () => {
    const { body } = control.getTblIncidents();
    const { addUserPermissions } = renderResult;
    act(() => {
      addUserPermissions([permKey.PAGE_PICKER_DETAIL_COMPONENT_CRISIS_MANAGEMENT_DELETE]);
    });
    expect(within(body).getAllByText('Delete')[0]).toBeInTheDocument();
  });

  it('deleting a crisis works fine', async () => {
    const row = crisisIncidentDetails;
    const btnDelete = screen.queryByTestId(`crisis-${row._id}-delete`);
    mockApiPerTestCase({
      url: `/picker/crises/deleteCard/${row._id}`,
      successData: {
        ...row,
        deletedBy: row.createdBy,
        deletedAt: '2022-07-18T13:56:43.381Z',
      },
    });
    mockApiPerTestCase({
      url: '/picker/crises/getCards',
      successData: {
        ...crisisIncidentList,
        // once deleted, this record won't be available in the listing api
        records: crisisIncidentList.records.filter(f => f._id !== row._id),
      },
    });
    userEvent.click(btnDelete);
    userEvent.click(screen.getByText('Yes'));
    await waitFor(() => expect(btnDelete).not.toBeInTheDocument());
  });

  it('supports exporting excel', async () => {
    userEvent.click(screen.getByText('Export Excel'));
    await waitFor(() => expect(window.open).toHaveBeenCalled());
  });

  it('allows clicking edit button', async () => {
    const { addUserPermissions } = renderResult;
    act(() => {
      addUserPermissions([permKey.PAGE_PICKER_DETAIL_COMPONENT_CRISIS_MANAGEMENT_UPDATE]);
    });
    const btnEdit = screen.getAllByText('Edit')[0];
    userEvent.click(btnEdit);
    expect(screen.getByText('Edit Card')).toBeInTheDocument();
  });
});

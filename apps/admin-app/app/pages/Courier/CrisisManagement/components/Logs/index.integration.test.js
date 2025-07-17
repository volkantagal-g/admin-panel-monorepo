import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { crisisLogsList } from '@shared/api/courierCrisis/index.mock.data';
import renderComponent from '@test/publicUtils/renderComponent';
import CrisisLogs from './index';

const control = {
  getBtnSearch: () => screen.getByText('Bring'),
  getBtnExportExcel: () => screen.getByText('Export Excel'),
  getInpIncidentNumber: () => screen.getByPlaceholderText('Enter Incident Number'),
  getTblLogs: () => {
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

// TODO: fix this tests, use renderPage
describe.skip('Courier Crisis Management: Log', () => {
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
    await renderComponent({ ui: <CrisisLogs courierId="587c9e24a1a56d0014072d82" /> });
    expect(screen.getByTestId('courier-crisis-log')).toBeInTheDocument();
  });

  it('has properly working grid filters', async () => {
    const btnBring = control.getBtnSearch();
    const btnExportExcel = control.getBtnExportExcel();
    const inpIncidentNumber = control.getInpIncidentNumber();
    expect(btnBring).toBeInTheDocument();
    expect(btnExportExcel).toBeInTheDocument();
    expect(inpIncidentNumber).toBeInTheDocument();

    expect(inpIncidentNumber.value).toBe('');
    const newText = '62';
    userEvent.type(inpIncidentNumber, newText);
    await waitFor(() => {
      expect(inpIncidentNumber).toHaveValue(newText);
    });
  });

  it('shows a populated grid content when filters are provided', async () => {
    const { body } = control.getTblLogs();

    // within(header).getByText('Card No');
    // within(header).getByText('Date');
    // within(header).getByText('User');
    // within(header).getByText('Action');

    within(body).getByText(crisisLogsList.records[0].cardNumber);
  });

  it('supports exporting excel', async () => {
    userEvent.click(screen.getByText('Export Excel'));
    await waitFor(() => expect(window.open).toHaveBeenCalled());
  });
});

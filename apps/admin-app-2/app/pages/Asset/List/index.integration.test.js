import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen, waitFor, act } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import { mockEmployeeAssets } from '@shared/api/employee/index.mock.data';
import PageComponent from '.';

const initialUrl = '/employee/asset/list';

describe('In Employee Asset List Page:', () => {
  afterAll(cleanup);
  let renderResult;
  it('should render without an error', async () => {
    renderResult = await renderPage({
      pagePermKey: permKey.PAGE_EMPLOYEE_ASSET_LIST,
      pageUrl: initialUrl,
      pageComponent: PageComponent,
    });
    await waitPageToRenderSomething();
  });

  it('should render filters with default values', async () => {
    const [filterButton] = await screen.findAllByRole('button', { name: /Filter/i });
    expect(filterButton).toBeInTheDocument();

    const name = screen.getByTitle(/name/i);
    const type = screen.getByTitle(/type/i);
    const barcode = screen.getByTitle(/barcode/i);
    const deviceSerialNumber = screen.getByTitle(/Device Serial Number/i);

    expect(name).not.toHaveValue();
    expect(type).not.toHaveValue();
    expect(barcode).not.toHaveValue();
    expect(deviceSerialNumber).not.toHaveValue();

    userEvent.click(filterButton);
    await waitFor(() => screen.findByText(mockEmployeeAssets.assets[0].name));
  });

  it('should reset employees on click reset button', async () => {
    const name = screen.getByPlaceholderText(/name/i);
    userEvent.type(name, 'some name');
    const barcode = screen.getByPlaceholderText(/barcode/i);
    userEvent.type(barcode, '1234567');

    const [resetButton] = await screen.findAllByRole('button', { name: /Reset/gi });
    userEvent.click(resetButton);

    expect(name).not.toHaveValue();
    expect(barcode).not.toHaveValue();
  });

  it('should display Employees export excel button', async () => {
    const { addUserPermissions } = renderResult;
    act(() => {
      addUserPermissions([permKey.PAGE_EMPLOYEE_ASSET_LIST_COMPONENT_EXCEL_EXPORT]);
    });
    const employeesExportButton = screen.getByRole('button', { name: /download export excel/i });
    expect(employeesExportButton).toBeInTheDocument();

    userEvent.click(employeesExportButton);
  });
});

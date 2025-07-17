import '@test/publicUtils/configureWithoutCleanup';
import { fireEvent, screen, cleanup, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';

import permKey from '@shared/shared/permKey.json';
import PageComponent from '.';

const initialUrl = '/writeOff/location/new';

describe('In Page New LocationWriteOff:', () => {
  afterAll(cleanup);

  let pageContent;
  let csvImportBtn;

  it('should render successfully', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_LOCATION_WRITE_OFF_NEW,
      pageUrl: initialUrl,
      pageComponent: PageComponent,
    });
    pageContent = screen.getByRole('main');
  });
  it('should contain core elements', async () => {
    await screen.findByText('Location Write off');
    await screen.findByText('Select a warehouse');
    await screen.findByText('Import Csv');
    await screen.findByText('Select a location');
  });
  it('should have an img for csv import', async () => {
    [csvImportBtn] = within(pageContent).getAllByRole('img', { name: 'cloud-upload' });
  });
  it('clicking csv import should render csv upload modal', async () => {
    userEvent.click(csvImportBtn);
    screen.getAllByText('Upload Csv');
  });
  it('should display warning messages when warehouse and location are empty', async () => {
    const addProductBtn = screen.getByRole('button', { name: 'Add product' });
    const inputField = screen.getByPlaceholderText('Enter a product Id');
    fireEvent.change(inputField, { target: { value: '559823ceb1dc700c006a7098' } });
    await waitFor(() => {
      expect(inputField).toHaveValue('559823ceb1dc700c006a7098');
    });
    userEvent.click(addProductBtn);
    const errorMessages = await screen.findAllByText('Cannot be empty.');
    await waitFor(() => {
      expect(errorMessages).toHaveLength(2);
    });
  });
  it('should display invalid fields when creating', async () => {
    const createBtn = screen.getByRole('button', { name: 'Create' });
    expect(createBtn).toBeDisabled();
  });
});

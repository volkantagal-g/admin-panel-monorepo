import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen, fireEvent } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { waitForItemToBeSelected, waitPageToRenderSomething } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import PageComponent from '.';

const initialUrl = '/saa/new';

describe('In SAA Create Page:', () => {
  afterAll(cleanup);

  it('should render successfully ', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_SERVICE_AVAILABILITY_AREA_NEW,
      pageUrl: initialUrl,
      pageComponent: PageComponent,
    });
    await waitPageToRenderSomething();
  });

  it('should render correct page title', async () => {
    expect(screen.getByTitle('Create New Service Availability Area')).toBeInTheDocument();
  });
  it('should render correct page text', async () => {
    expect(screen.getByTitle('Name')).toBeInTheDocument();
    expect(screen.getByTitle('Country')).toBeInTheDocument();
    expect(screen.getByTitle('Active Domains')).toBeInTheDocument();
    expect(screen.getByTitle('GeoJSON')).toBeInTheDocument();
  });
  it('form values should be set correctly', async () => {
    const nameInput = screen.getByPlaceholderText('Please write SAA name');
    const countrySelection = screen.getByTitle('Turkey');
    const activeDomainSelection = screen.getByText('Please select active domain type');
    const geoJsonInput = screen.getByPlaceholderText('GeoJSON');
    const submitButton = screen.getByRole('button', { name: 'Create' });

    expect(submitButton).toBeDisabled();

    expect(nameInput).toHaveValue('');
    fireEvent.change(nameInput, { target: { value: 'test123' } });
    expect(nameInput).toHaveValue('test123');

    userEvent.click(countrySelection);
    const optionTurkey = screen.getByRole('option', { name: 'Turkey' });
    userEvent.click(optionTurkey);
    await waitForItemToBeSelected('Turkey');

    userEvent.click(activeDomainSelection);
    const selectActiveDomainSelection = screen.getByText('Getir10');
    userEvent.click(selectActiveDomainSelection);
    await waitForItemToBeSelected('Getir10');

    userEvent.click(geoJsonInput);
    expect(geoJsonInput).not.toHaveValue();
    fireEvent.change(geoJsonInput, { target: { value: '{ "type": "FeatureCollection", "features": [] }' } });
    expect(geoJsonInput).toHaveValue('{ "type": "FeatureCollection", "features": [] }');
  });
});

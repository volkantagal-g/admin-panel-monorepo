import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen, act } from '@testing-library/react';

import { mockedSaaDetail } from '@shared/api/serviceAvailablityArea/index.mock.data';

import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';

import PageComponent from '.';

describe('In SAA List Page:', () => {
  const initialUrl = '/saa/detail/5dd7c060b427196535a1f437';

  afterAll(cleanup);
  let renderResult;
  let sideBarTitle;
  let nameLabel;
  let nameInput;
  let idLabel;
  let idInput;
  let countryLabel;
  let countrySelectBox;
  let activeDomainLabel;
  let activeDomainSelectBox;
  let geoJsonLabel;
  let geoJsonCopyButton;
  let geoJsonInput;
  let editButton;

  it('should render successfully ', async () => {
    renderResult = await renderPage({
      pagePermKey: permKey.PAGE_SERVICE_AVAILABILITY_AREA_DETAIL,
      pageUrl: initialUrl,
      pageComponent: PageComponent,
    });
    await waitPageToRenderSomething();
  });
  it('should render correct page title ', async () => {
    expect(screen.getByTitle('Service Availability Area')).toBeInTheDocument();
  });
  it('should render correct items without permission', async () => {
    sideBarTitle = screen.getByText('Detail');
    nameLabel = screen.getByTitle('Name');
    nameInput = screen.getByDisplayValue(mockedSaaDetail.serviceAvailabilityArea.name);
    idLabel = screen.getByTitle('ID');
    idInput = screen.getByDisplayValue(mockedSaaDetail.serviceAvailabilityArea._id);
    countryLabel = screen.getByTitle('Country');
    countrySelectBox = screen.getByTitle('Turkey');
    activeDomainLabel = screen.getByTitle('Active Domains');
    activeDomainSelectBox = screen.getByTestId('active-domains');
    geoJsonLabel = screen.getByText('GeoJSON');
    geoJsonCopyButton = screen.getByRole('button', { name: 'Copy' });
    geoJsonInput = screen.getByTestId('geojson-input');
    editButton = screen.queryByRole('button', { name: 'Edit' });

    expect(sideBarTitle).toBeInTheDocument();
    expect(nameLabel).toBeInTheDocument();
    expect(nameInput).toBeDisabled();
    expect(idLabel).toBeInTheDocument();
    expect(idInput).toBeDisabled();
    expect(countryLabel).toBeInTheDocument();
    expect(countrySelectBox).toBeInTheDocument();
    expect(activeDomainLabel).toBeInTheDocument();
    expect(activeDomainSelectBox).toBeInTheDocument();
    expect(geoJsonLabel).toBeInTheDocument();
    expect(geoJsonCopyButton).toBeInTheDocument();
    expect(geoJsonInput).toBeInTheDocument();
    expect(editButton).not.toBeInTheDocument();
  });
  it('should render edit button with permission', async () => {
    const { addUserPermissions } = renderResult;
    act(() => {
      addUserPermissions([permKey.PAGE_SERVICE_AVAILABILITY_AREA_EDIT]);
    });
    editButton = screen.getByRole('button', { name: 'Edit' });
    expect(editButton).toBeInTheDocument();
  });
});

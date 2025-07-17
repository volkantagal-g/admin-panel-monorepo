import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen, act, waitFor, fireEvent } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { waitForItemToBeSelected, waitPageToRenderSomething } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import PageComponent from '.';

const initialUrl = '/saa';

describe('In SAA List Page:', () => {
  afterAll(cleanup);
  let renderResult;
  let sideBarTitle;
  let createSaaButton;
  let domainSelectBox;
  let searchButton;
  let warehouseSwitch;
  let saaCountAlertBox;
  let clickablePolygonAlertBox;

  it('should render successfully ', async () => {
    renderResult = await renderPage({
      pagePermKey: permKey.PAGE_SERVICE_AVAILABILITY_AREA_LIST,
      pageUrl: initialUrl,
      pageComponent: PageComponent,
    });
    await waitPageToRenderSomething();
  });

  it('should render correct page title', async () => {
    expect(screen.getByTitle('Service Availability Areas')).toBeInTheDocument();
  });

  it('should not render correct sidebar button withouth permission', async () => {
    sideBarTitle = screen.getByText('Search Service Availability Area');
    createSaaButton = screen.queryByText('+ New SAA');
    domainSelectBox = screen.getByTestId('domain-select');
    searchButton = screen.getByRole('button', { name: 'Search' });
    warehouseSwitch = screen.getByRole('switch');
    saaCountAlertBox = screen.getByText('Found SAA count: 1');
    clickablePolygonAlertBox = screen.getByText('You can click a polygon to see details');

    expect(sideBarTitle).toBeInTheDocument();
    expect(createSaaButton).toBeNull();
    expect(domainSelectBox).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(warehouseSwitch).toBeInTheDocument();
    expect(warehouseSwitch).not.toBeChecked();
    expect(saaCountAlertBox).toBeInTheDocument();
    expect(clickablePolygonAlertBox).toBeInTheDocument();
  });

  it('should render create SAA button with permission', async () => {
    const { addUserPermissions } = renderResult;
    act(() => {
      addUserPermissions([permKey.PAGE_SERVICE_AVAILABILITY_AREA_NEW]);
    });
    createSaaButton = screen.getByText('+ New SAA');
    expect(createSaaButton).toBeInTheDocument();
  });

  it('should sidebar functionalities work properly', async () => {
    userEvent.click(domainSelectBox);
    const domainOption = screen.getByTitle('Getir10');

    userEvent.click(domainOption);
    await waitForItemToBeSelected('Getir10');

    userEvent.click(warehouseSwitch);
    await waitFor(() => {
      expect(warehouseSwitch).toBeChecked();
    });

    fireEvent.click(searchButton);
    await waitFor(() => {
      expect(screen.getByTestId('saa-spinner')).toBeInTheDocument();
    });
    expect(screen.queryByTestId('saa-spinner')).not.toBeInTheDocument();
  });
});

import '@test/publicUtils/configureWithoutCleanup';

import { fireEvent, screen } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import { expectToHavePageHeaderText } from '@test/publicUtils/assertions';
import permKey from '@shared/shared/permKey.json';
import PageComponent from '.';
import { mockedServices } from '@shared/api/internalAuthentication/index.mock.data';

const initialUrl = '/internalAuthentication/service/list';

describe('In internal authentication service list page:', () => {
  it('should render without an error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_INTERNAL_AUTHENTICATION_SERVICE_LIST,
      pageUrl: initialUrl,
      pageComponent: PageComponent,
    });
  });

  it('should have correct page header', () => {
    expectToHavePageHeaderText('List of all Repositories');
  });

  it('should show all the services', () => {
    mockedServices.forEach(service => {
      expect(screen.getByText(service.name)).toBeInTheDocument();
    });
  });

  it('should be able to filter the services', () => {
    fireEvent.change(screen.getByPlaceholderText('Search'), { target: { value: mockedServices[0].name } });
    expect(screen.getByText(mockedServices[0].name)).toBeInTheDocument();

    mockedServices.slice(1).forEach(service => {
      expect(screen.queryByText(service.name)).not.toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText('Search'), { target: { value: mockedServices[0].description } });
    expect(screen.getByText(mockedServices[0].description)).toBeInTheDocument();
    mockedServices.slice(1).forEach(service => {
      expect(screen.queryByText(service.description)).not.toBeInTheDocument();
    });
  });
});

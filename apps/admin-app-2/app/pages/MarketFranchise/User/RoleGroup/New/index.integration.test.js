import '@test/publicUtils/configureWithoutCleanup';
import { screen, cleanup } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import { waitPageToRenderSomething, expectToHavePageHeaderText } from '@test/publicUtils/assertions';
import permKey from '@shared/shared/permKey.json';
import PageComponent from '.';

const initialUrl = 'marketFranchise/user/roleGroup/new';

describe('In Franchise User Role Group Creation Page:', () => {
  afterAll(cleanup);
  describe('For page features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_MARKET_FRANCHISE_USER_ROLE_GROUP_NEW,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });

    it('should render page header', async () => {
      expectToHavePageHeaderText('New Franchise User Role Group');
    });

    it('should have correct general information card', async () => {
      expect(screen.getByText('Name')).toBeInTheDocument();
      const nameTrInput = screen.getByTestId('name-tr');
      expect(nameTrInput).toBeInTheDocument();
      expect(nameTrInput).toBeEnabled();
      const nameEnInput = screen.getByTestId('name-en');
      expect(nameEnInput).toBeInTheDocument();
      expect(nameEnInput).toBeEnabled();

      expect(screen.getByText('Description')).toBeInTheDocument();
      const descriptionTrInput = screen.getByTestId('description-tr');
      expect(descriptionTrInput).toBeInTheDocument();
      expect(descriptionTrInput).toBeEnabled();
      const descriptionEnInput = screen.getByTestId('description-en');
      expect(descriptionEnInput).toBeInTheDocument();
      expect(descriptionEnInput).toBeEnabled();

      const [countryTitle] = screen.getAllByText('Country');
      expect(countryTitle).toBeInTheDocument();
      const [countrySelectInput] = await screen.findAllByRole('combobox');
      expect(countrySelectInput).toBeInTheDocument();
      expect(countrySelectInput).toBeEnabled();
    });
  });
});

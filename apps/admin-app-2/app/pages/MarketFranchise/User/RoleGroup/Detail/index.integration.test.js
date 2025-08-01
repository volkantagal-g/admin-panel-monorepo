import '@test/publicUtils/configureWithoutCleanup';
import { screen, cleanup, act, waitFor } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import { waitPageToRenderSomething, expectToHavePageHeaderText } from '@test/publicUtils/assertions';
import { getRoleGroupDetailMock } from '@shared/api/marketFranchise/user/index.mock.data';
import permKey from '@shared/shared/permKey.json';
import PageComponent from '.';

const exampleRoleGroupId = '5fa46fa6d1a7e71016482c32';
const initialUrl = `marketFranchise/user/roleGroup/detail/${exampleRoleGroupId}`;

describe('In Franchise User Role Group Detail Page:', () => {
  let renderResult;
  afterAll(cleanup);
  describe('For page features', () => {
    it('should render without an error', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_MARKET_FRANCHISE_USER_ROLE_GROUP_DETAIL,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });

    it('should render page header', async () => {
      expectToHavePageHeaderText('Franchise User Role Group Detail');
    });

    it('should have correct general information card', async () => {
      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_MARKET_FRANCHISE_USER_ROLE_LIST, permKey.PAGE_MARKET_FRANCHISE_USER_REPORT_LIST]);
      });

      expect(screen.getByText('General')).toBeInTheDocument();

      expect(screen.getByText('Name')).toBeInTheDocument();
      const nameTrInput = screen.getByTestId('name-tr');
      expect(nameTrInput).toBeInTheDocument();
      expect(nameTrInput).toBeDisabled();
      await waitFor(() => {
        expect(nameTrInput).toHaveValue(getRoleGroupDetailMock?.name?.tr);
      });
      const nameEnInput = screen.getByTestId('name-en');
      expect(nameEnInput).toBeInTheDocument();
      expect(nameEnInput).toBeDisabled();
      await waitFor(() => {
        expect(nameEnInput).toHaveValue(getRoleGroupDetailMock?.name?.en);
      });

      expect(screen.getByText('Description')).toBeInTheDocument();
      const descriptionTrInput = screen.getByTestId('description-tr');
      expect(descriptionTrInput).toBeInTheDocument();
      expect(descriptionTrInput).toBeDisabled();
      await waitFor(() => {
        expect(descriptionTrInput).toHaveValue(getRoleGroupDetailMock?.description?.tr);
      });
      const descriptionEnInput = screen.getByTestId('description-en');
      expect(descriptionEnInput).toBeInTheDocument();
      expect(descriptionEnInput).toBeDisabled();
      await waitFor(() => {
        expect(descriptionEnInput).toHaveValue(getRoleGroupDetailMock?.description?.en);
      });

      expect(screen.getByText('Country')).toBeInTheDocument();
      const [countrySelectInput] = await screen.findAllByRole('combobox');
      expect(countrySelectInput).toBeInTheDocument();
      expect(countrySelectInput).toBeDisabled();
    });
  });
});

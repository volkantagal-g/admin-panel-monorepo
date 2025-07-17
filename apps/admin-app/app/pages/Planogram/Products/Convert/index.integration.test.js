import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';

import PageComponent from '@app/pages/Planogram/Products/Convert/index';
import permKey from '@shared/shared/permKey.json';
import GeneralInfoForm from './components/GeneralInfoForm/index';
import renderComponent from '@test/publicUtils/renderComponent';

describe('Product Convert Page', () => {
  const initialUrl = '/planogram/product/convert/testId';
  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_PLANOGRAM_PRODUCT_CONVERT,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });
  describe('For page features', () => {
    it('should have back button', () => {
      expect(screen.getByText('Back')).toBeInTheDocument();
    });
    it('should have correct general info form content', async () => {
      await renderComponent({ ui: <GeneralInfoForm /> });
      expect(screen.getByText('Product Name')).toBeInTheDocument();
      expect(screen.getByText('Product Id')).toBeInTheDocument();
      expect(screen.getByText('Warehouse Type')).toBeInTheDocument();
      expect(screen.getByText('Domain')).toBeInTheDocument();
      expect(screen.getByText('Demography')).toBeInTheDocument();
      expect(screen.getByText('Size')).toBeInTheDocument();
    });
  });
});

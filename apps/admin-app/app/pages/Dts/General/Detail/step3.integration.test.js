import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '.';
import { getWarehouseListConfigMock } from '@shared/api/kds/auditForm/index.mock.handler';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import { getDtsStatusClosedOptions } from '@shared/api/dts/index.mock.handler';

const dtsId = '62d7eb5bc5f63c12499b25be';
const initialUrl = `/dts/detail/${dtsId}`;

describe('In Dts Detail Page:', () => {
  afterAll(cleanup);
  describe('For page features', () => {
    it('should render without an error', async () => {
      mockApiPerTestCase(getDtsStatusClosedOptions);
      mockApiPerTestCase(getWarehouseListConfigMock);
      await renderPage({
        pagePermKey: permKey.PAGE_DTS_DETAIL,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should have correct page content', () => {
      expect(screen.getByText('Disciplinary Tracking System Detail')).toBeInTheDocument();
      expect(screen.getByText('Dts Detail')).toBeInTheDocument();
      expect(screen.getByText('Rule Number')).toBeInTheDocument();
      expect(screen.getByText('Rule Description')).toBeInTheDocument();
      expect(screen.getByText('Rule Category')).toBeInTheDocument();
      expect(screen.getByText('Warehouse')).toBeInTheDocument();
      expect(screen.getByText('Date')).toBeInTheDocument();
      expect(screen.getByText('Activeness')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('Employee')).toBeInTheDocument();
      expect(screen.getByText('Reporter')).toBeInTheDocument();
      expect(screen.getByText('Created At')).toBeInTheDocument();
      expect(screen.getByText('Feedback Source')).toBeInTheDocument();
      expect(screen.getByText('Closed')).toBeInTheDocument();
    });
  });

  describe('For page features', () => {
    it('should be able to save decision field', async () => {
      const switchButton = screen.getByRole('switch', { name: 'Active' });
      userEvent.click(switchButton);
      expect(switchButton).not.toBeChecked();
    });
  });
});

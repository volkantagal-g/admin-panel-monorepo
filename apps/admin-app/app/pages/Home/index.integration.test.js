import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen, act } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import { waitPageToRenderSomething, expectToHavePageHeaderText } from '@test/publicUtils/assertions';
import permKey from '@shared/shared/permKey.json';

import PageComponent from '.';

const initialUrl = '/';

describe('In Home Page:', () => {
  afterAll(cleanup);
  let renderResult;

  describe('For app level features', () => {
    it('should render without an error', async () => {
      renderResult = await renderPage({
        // just to get route key from, it is global page
        pagePermKey: 'PAGE_HOME',
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should have correct page header', () => {
      expectToHavePageHeaderText(/Welcome to the Admin Panel Home Page/i); // because of the emoji I had to use regexp search
    });
  });

  describe('For Home Page Cards', () => {
    it('should not render Role Search Card if the user does not have access', () => {
      expect(screen.queryByText('Search for Roles', { selector: 'div' })).not.toBeInTheDocument();
    });
    it('should render Role Search Card if the user has access', () => {
      act(() => {
        renderResult.addUserPermissions([permKey.PAGE_ROLE_LIST]);
      });
      expect(screen.getByText('Search for Roles', { selector: 'div' })).toBeInTheDocument();
    });

    it('should not render Documentation Card if the user does not have access', () => {
      expect(screen.queryByText('Documentation', { selector: 'div' })).not.toBeInTheDocument();
    });
    it('should render Documentation Card if the user has access', () => {
      act(() => {
        renderResult.addUserPermissions([permKey.PAGE_PANEL_DOC_SEARCH]);
      });
      expect(screen.getByText('Documentation', { selector: 'div' })).toBeInTheDocument();
    });

    it('should not render Getirians Card if the user does not have access', () => {
      expect(screen.queryByText('Getirians', { selector: 'div' })).not.toBeInTheDocument();
    });
    it('should render Getirians Card if the user has access', () => {
      act(() => {
        renderResult.addUserPermissions([permKey.PAGE_EMPLOYEE_LIST]);
      });
      expect(screen.getByText('Getirians', { selector: 'div' })).toBeInTheDocument();
    });

    it('should render Leave Request Card always', () => {
      expect(screen.getByText('Leave Request', { selector: 'div' })).toBeInTheDocument();
    });

    it('should not render Ops Tips & Tricks Card if the user does not have access', () => {
      expect(screen.queryByText('Tips & Tricks on Ops-Related Pages', { selector: 'div' })).not.toBeInTheDocument();
    });
    it('should render Ops Tips & Tricks Card if the user has access', () => {
      act(() => {
        renderResult.addUserPermissions([permKey.PAGE_HOME_COMPONENT_DOCUMENT_OPERATION_DEPARTMENT_TIPS]);
      });
      expect(screen.getByText('Tips & Tricks on Ops-Related Pages', { selector: 'div' })).toBeInTheDocument();
    });

    it('should render GetirHub Card', () => {
      expect(screen.getByText('GetirHub', { selector: 'div' })).toBeInTheDocument();
    });

    it('should render GetirGrow Card', () => {
      expect(screen.getByText('GetirGrow', { selector: 'div' })).toBeInTheDocument();
    });
  });

  describe('For Home Page Admin Platform Team Updates Side', () => {
    it('should render About the Admin Panel Card', () => {
      expect(screen.getByText('About the Admin Panel', { selector: 'div' })).toBeInTheDocument();
    });

    it('should not render Feature Highlights Card if the user does not have access', () => {
      expect(screen.queryByText('Feature Highlights', { selector: 'div' })).not.toBeInTheDocument();
    });
    it('should render Feature Highlights Card if the user has access', () => {
      act(() => {
        renderResult.addUserPermissions([permKey.PAGE_HOME_CHANGELOGS_READ]);
      });
      expect(screen.getByText('Feature Highlights', { selector: 'div' })).toBeInTheDocument();
    });
  });
});

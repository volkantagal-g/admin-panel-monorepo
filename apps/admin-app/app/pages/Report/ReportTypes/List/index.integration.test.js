import '@test/publicUtils/configureWithoutCleanup';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import permKey from '@shared/shared/permKey.json';
import renderPage from '@test/publicUtils/renderPage';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import PageComponent from '.';

const initialUrl = '/reports/types';

const mockSuccessData = {
  reportTypes: [
    {
      _id: '62c3ebf0d67e6325e717a438',
      name: {
        tr: 'isim tr',
        en: 'name en',
      },
      description: {
        tr: 'açıklama tr',
        en: 'description en',
      },
      scriptFile: 'script.py',
      reportTags: [
        {
          _id: '62c3ec1dd67e6325e717a43a',
          backgroundColor: '#000000',
          textColor: '#ffffff',
          name: {
            tr: 'test',
            en: 'test',
          },
          description: {
            tr: 'test',
            en: 'test',
          },
        },
      ],
    },
  ],
  totalCount: 42000,
};

describe('In Report Type List Page:', () => {
  mockApiPerTestCase({
    url: '/report/getReportTypes',
    successData: mockSuccessData,
  });

  let renderResult;
  it('should render without an error', async () => {
    renderResult = await renderPage({
      pagePermKey: permKey.PAGE_REPORT_TYPES,
      pageUrl: initialUrl,
      pageComponent: PageComponent,
    });
    await waitPageToRenderSomething();
  });

  it('should search a text', async () => {
    const searchInput = screen.getByPlaceholderText('Search');
    userEvent.type(searchInput, 'test');
    let reportTypeName;
    await waitFor(() => {
      reportTypeName = screen.getByText(mockSuccessData.reportTypes[0].name.en);
    });
    expect(reportTypeName).toBeInTheDocument();
    let reportTypeDescription;
    await waitFor(() => {
      reportTypeDescription = screen.getByText(mockSuccessData.reportTypes[0].description.en);
    });
    expect(reportTypeDescription).toBeInTheDocument();
    let reportTypeReportTagLabel;
    await waitFor(() => {
      reportTypeReportTagLabel = screen.getByText(mockSuccessData.reportTypes[0].reportTags[0].name.en);
    });
    expect(reportTypeReportTagLabel).toBeInTheDocument();
  });

  it('should go next page', async () => {
    const nextPageButton = screen.getByRole('listitem', { name: 'Next Page' });
    userEvent.click(nextPageButton);

    let reportTypeName;
    await waitFor(() => {
      reportTypeName = screen.getByText(mockSuccessData.reportTypes[0].name.en);
    });
    expect(reportTypeName).toBeInTheDocument();
    expect(screen.getByText(mockSuccessData.reportTypes[0].description.en)).toBeInTheDocument();
    expect(screen.getByText(mockSuccessData.reportTypes[0].reportTags[0].name.en)).toBeInTheDocument();
  });

  describe('Permission check:', () => {
    it('should not show NewReportTypeButton when not permitted', async () => {
      expect(screen.queryByText('+ New Report Type')).not.toBeInTheDocument();
    });

    it('should show NewReportTypeButton when permitted', async () => {
      const { addUserPermissions } = renderResult;

      addUserPermissions([permKey.PAGE_REPORT_TYPES_NEW]);
      expect(screen.getByRole('button', { name: '+ New Report Type' })).toBeInTheDocument();
    });
  });
});

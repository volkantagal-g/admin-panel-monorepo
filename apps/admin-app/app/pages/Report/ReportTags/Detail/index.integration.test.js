// TESTING_PRACTICE_EXAMPLE PAGE_INTEGRATION_TEST
import '@test/publicUtils/configureWithoutCleanup';
import { act, screen, waitFor } from '@testing-library/react';

import history from '@shared/utils/history';
import permKey from '@shared/shared/permKey.json';
import { mockedReportTag } from '@shared/api/report/index.mock.data';

import { waitForToastElementToAppear, expectToHavePageHeaderText } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import renderComponent from '@test/publicUtils/renderComponent';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import ReportTypesTable from '@app/pages/Report/ReportTags/Detail/components/ReportTypeTable';
import PageComponent from '.';

const ONCE_SUCCESS_DATA = {
  _id: 'test_id',
  name: {
    tr: 'once_success_tr_name',
    en: 'once_success_en_name',
  },
  description: {
    tr: 'once_success_tr_description',
    en: 'once_success_en_description',
  },
  backgroundColor: '#CCCCCC',
  textColor: '#000000',
};

const ONCE_ERROR_DATA = { message: 'Not found' };

describe('Report Tag Detail Page', () => {
  it('should render report tag details without error', async () => {
    const url1 = '/reports/tags/test_id1';
    await renderPage({
      pagePermKey: permKey.PAGE_REPORT_TAGS_DETAIL,
      pageUrl: url1,
      pageComponent: PageComponent,
    });
    await waitFor(() => {
      expectToHavePageHeaderText('Report Tag Detail');
    });
    await screen.findByDisplayValue(mockedReportTag.name.tr);
    await screen.findByDisplayValue(mockedReportTag.name.en);
    await screen.findByDisplayValue(mockedReportTag.description.tr);
    await screen.findByDisplayValue(mockedReportTag.description.en);
  });
  it('should render report tag details without error', async () => {
    const url2 = '/reports/tags/test_id2';
    // success mocking for one request
    mockApiPerTestCase({
      url: '/report/getReportTagById',
      successData: { ...ONCE_SUCCESS_DATA, _id: 'test_id2' },
    });
    act(() => {
      history.push(url2);
    });

    await screen.findByDisplayValue(ONCE_SUCCESS_DATA.name.tr);
    await screen.findByDisplayValue(ONCE_SUCCESS_DATA.name.en);
    await screen.findByDisplayValue(ONCE_SUCCESS_DATA.description.tr);
    await screen.findByDisplayValue(ONCE_SUCCESS_DATA.description.en);
  });

  it.skip('should show error toast when request fails (mocked once from test case)', async () => {
    const url3 = '/reports/tags/test_id3';
    // error mocking for one request
    mockApiPerTestCase({
      url: '/report/getReportTagById',
      errorData: ONCE_ERROR_DATA,
    });
    act(() => {
      history.push(url3);
    });
    await waitForToastElementToAppear();
  });

  describe('<ReportTypeTable', () => {
    it('should render ReportTypesTable without an error', async () => {
      await renderComponent({
        ui: (
          <ReportTypesTable />
        ),
      });
    });
  });
});

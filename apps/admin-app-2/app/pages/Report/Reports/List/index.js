import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { Collapse, Typography } from 'antd';

import { useTranslation } from 'react-i18next';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';

import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import ReportRequest from './components/ReportRequest';
import ReportsFilter from './components/ReportsFilter';
import ReportsTable from './components/ReportsTable';
import { getMyReportTypes } from './redux/selectors';
import Header from '../../components/Header';

import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { TEST_ID } from '@app/pages/Report/Reports/testing';

const { Text } = Typography;
const { Panel } = Collapse;

function ReportList() {
  usePageViewAnalytics({
    name: ROUTE.REPORTS.name,
    squad: ROUTE.REPORTS.squad,
  });
  const dispatch = useDispatch();
  const { t } = useTranslation('reportsPage');
  const myReportTypes = useSelector(getMyReportTypes.getData);
  const myReportTypesPending = useSelector(getMyReportTypes.getIsPending);

  useLayoutEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getMyReportTypesRequest());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  const title = t('REPORTS_PAGE_TITLE');
  return (
    <div>
      <Header title={title} key="header" />

      <div data-testid={TEST_ID.CREATE_REPORT_PANEL_WRAPPER}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={<Text>{t('CREATE_NEW_REPORT')}</Text>} key="1">
            <ReportRequest reportTypes={myReportTypes} isPending={myReportTypesPending} />
          </Panel>
        </Collapse>
      </div>

      <div data-testid={TEST_ID.FILTER_PANEL_WRAPPER}>
        <Collapse defaultActiveKey={['2']}>
          <Panel header={<Text>{t('FILTER_REPORTS')}</Text>} key="2">
            <ReportsFilter />
          </Panel>
        </Collapse>
      </div>

      <React.Fragment key="rest">
        <ReportsTable />
      </React.Fragment>
    </div>
  );
}

const reduxKey = REDUX_KEY.REPORTS.REPORTS;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(ReportList);

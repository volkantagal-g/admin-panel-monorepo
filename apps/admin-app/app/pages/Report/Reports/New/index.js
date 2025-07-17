import { useParams } from 'react-router-dom';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Spin } from 'antd';
import { compose } from 'redux';

import { useTranslation } from 'react-i18next';

import { getInitialValues } from './utils';
import ReportForm from '../components/ReportForm';
import { REPORT_FORM_MODE } from '../constants';
import { getLangKey } from '@shared/i18n';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import { getCreateReport, getReportType } from './redux/selectors';
import Header from '../../components/Header';

import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';

function ReportNew() {
  usePageViewAnalytics({
    name: ROUTE.REPORTS_NEW.name,
    squad: ROUTE.REPORTS_NEW.squad,
  });
  const { reportTypeId } = useParams();
  const { t } = useTranslation('reportsPage');
  const currentLang = getLangKey();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(Creators.getReportTypeByIdRequest({ id: reportTypeId }));
  }, [dispatch, reportTypeId]);

  const reportType = useSelector(getReportType.getData);
  const reportTypePending = useSelector(getReportType.getIsPending);
  const reportTypeError = useSelector(getReportType.getError);
  const createReportPending = useSelector(getCreateReport.getIsPending);
  const initialValues = useMemo(() => getInitialValues(reportType), [reportType]);

  if (reportTypePending) {
    return <Spin />;
  }
  // a user can use inactive or deleted report type id in the url
  if (!reportTypeError && (!reportType?.isActive || reportType?.isDeleted)) {
    return <Alert message={t('INACTIVE_REPORT_ERROR')} type="error" />;
  }

  const handleFormSubmit = (values, shouldStayInTheSamePage) => {
    const { name, ...params } = values;
    const reportRequest = {
      name,
      params,
      reportType,
      reportTypeId,
    };
    dispatch(Creators.createReportRequest({ data: reportRequest, shouldStayInTheSamePage }));
  };
  const title = `${t('REPORTS_NEW_PAGE_TITLE')} - ${reportType?.name?.[currentLang]}`;

  return (
    <div>
      <Header
        title={title}
        key="header"
        description={reportType?.description?.[currentLang]}
        instructions={reportType?.instructions?.[currentLang]}
      />
      {!reportType?.canAccess && (
        <Alert className="mb-2" message={t('AUTHORIZATION_REQUIRED')} type="error" />
      )}
      {reportType && (
        <ReportForm
          initialValues={initialValues}
          reportType={reportType}
          mode={!reportType?.canAccess ? REPORT_FORM_MODE.READONLY : REPORT_FORM_MODE.NEW}
          onFormActionClick={handleFormSubmit}
          isLoading={createReportPending}
        />
      )}
    </div>
  );
}

const reduxKey = REDUX_KEY.REPORTS.REPORTS_NEW;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(ReportNew);

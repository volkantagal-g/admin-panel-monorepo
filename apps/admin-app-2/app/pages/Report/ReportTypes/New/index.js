import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { useTranslation } from 'react-i18next';

import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { REDUX_KEY } from '@shared/shared/constants';

import { Creators } from './redux/actions';
import ReportTypeForm from '../components/ReportTypeForm';
import { INITIAL_FORM_VALUES } from '../components/ReportTypeForm/formUtils';
import { REPORT_TYPE_FORM_MODE } from '../constants';
import Header from '../../components/Header';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { getCreateReportType, getAllReportTags, getAllEmployees } from './redux/selectors';
import BackToReportTypeListButton from '../components/BackToReportTypeListButton';
import useStyles from './styles';

import { ROUTE } from '@app/routes';
import { usePageViewAnalytics } from '@shared/hooks';

function ReportTypeNew() {
  usePageViewAnalytics({
    name: ROUTE.REPORT_TYPES_NEW.name,
    squad: ROUTE.REPORT_TYPES_NEW.squad,
  });
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation('reportsPage');
  const isCreateReportTypePending = useSelector(getCreateReportType.getIsPending);
  const allReportTags = useSelector(getAllReportTags.getData);
  const allReportTagsPending = useSelector(getAllReportTags.getIsPending);
  const allEmployees = useSelector(getAllEmployees.getData);
  const allEmployeesPending = useSelector(getAllEmployees.getIsPending);

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(Creators.getAllReportTagsRequest());
    dispatch(Creators.getAllEmployeesRequest());
  }, [dispatch]);

  const onFormActionClick = values => {
    dispatch(Creators.createReportTypeRequest({ data: values }));
  };

  const title = t('REPORT_TYPES_NEW_PAGE_TITLE');
  return (
    <>
      <div className={classes.headerGroup}>
        <Header title={title} />
        <BackToReportTypeListButton />
      </div>
      <ReportTypeForm
        initialValues={INITIAL_FORM_VALUES}
        mode={REPORT_TYPE_FORM_MODE.NEW}
        onFormActionClick={onFormActionClick}
        canAccessFormActions
        isLoading={isCreateReportTypePending || allReportTagsPending || allEmployeesPending}
        allReportTags={allReportTags}
        allEmployees={allEmployees}
      />
    </>
  );
}

const reduxKey = REDUX_KEY.REPORTS.REPORT_TYPES_NEW;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(ReportTypeNew);

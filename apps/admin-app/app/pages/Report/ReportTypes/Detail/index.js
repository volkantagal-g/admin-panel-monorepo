import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Spin } from 'antd';
import { compose } from 'redux';
import { useTranslation } from 'react-i18next';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePermission, usePageViewAnalytics } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

import ReportTypeForm from '../components/ReportTypeForm';
import { REPORT_TYPE_FORM_MODE } from '../constants';
import Header from '../../components/Header';
import { Creators } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';
import {
  getAllReportTags,
  getDeleteReportType,
  getFormMode,
  getReportType,
  getReportTypeReportTags,
  getReportTypeUpate,
  getAllEmployees,
} from './redux/selectors';
import BackToReportTypeListButton from '../components/BackToReportTypeListButton';
import useStyles from './styles';
import { getCustomTagValue } from '../utils';
import { getInitialArrayValuesWithFakeKeys, getUpdateMessageMap } from './utils';

import { ROUTE } from '@app/routes';

function ReportTypeDetail() {
  usePageViewAnalytics({
    name: ROUTE.REPORT_TYPES_DETAIL.name,
    squad: ROUTE.REPORT_TYPES_DETAIL.squad,
  });
  const { id } = useParams();
  const { t } = useTranslation('reportsPage');
  const classes = useStyles();

  const dispatch = useDispatch();
  const reportType = useSelector(getReportType.getData);
  const allReportTags = useSelector(getAllReportTags.getData);
  const reportTypeReportTags = useSelector(getReportTypeReportTags.getData);
  const reportTypeReportTagsPending = useSelector(getReportTypeReportTags.getIsPending);
  const reportTypeIsPending = useSelector(getReportType.getIsPending);
  const allReportTagsPending = useSelector(getAllReportTags.getIsPending);
  const isUpdateReportTypePending = useSelector(getReportTypeUpate.getIsPending);
  const isDeleteReportTypePending = useSelector(getDeleteReportType.getIsPending);
  const allEmployees = useSelector(getAllEmployees.getData);

  const { canAccess } = usePermission();

  const canAccessEdit = canAccess(permKey.PAGE_REPORT_TYPES_DETAIL_EDIT);

  // detail and edit on the same page, edit button will switch it.
  const formMode = useSelector(getFormMode);

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(Creators.getReportTypeByIdRequest({ id }));
    dispatch(Creators.getReportTypeReportTagsRequest({ id }));
    dispatch(Creators.getAllReportTagsRequest());
    dispatch(Creators.getAllEmployeesRequest());
  }, [dispatch, id]);

  const updateMessageMap = useMemo(() => getUpdateMessageMap({ t }), [t]);

  const onFormActionClick = changedValues => {
    if (formMode === REPORT_TYPE_FORM_MODE.READONLY) {
      dispatch(Creators.setFormMode({ formMode: REPORT_TYPE_FORM_MODE.EDIT }));
      return;
    }
    dispatch(
      Creators.updateReportTypeRequest({
        data: { ...changedValues, _id: reportType._id },
        prevTags: reportTypeReportTags,
        updateMessageMap,
      }),
    );
  };

  const onEditCancel = () => {
    dispatch(Creators.setFormMode({ formMode: REPORT_TYPE_FORM_MODE.READONLY }));
  };

  const handleDeleteClick = () => {
    dispatch(Creators.deleteReportTypeRequest({ id }));
  };
  const initialValues = useMemo(() => {
    if (!reportType) return {};
    const tagMap = {};
    reportTypeReportTags.forEach(rtrt => {
      tagMap[rtrt] = true;
    });
    const isReadonly = formMode === REPORT_TYPE_FORM_MODE.READONLY;
    const customReportTagValues = allReportTags.filter(tag => tagMap[tag._id]).map(rt => getCustomTagValue(rt, !isReadonly));
    // initial array fields need fake react keys
    const arrayFieldsWithFakeKeys = getInitialArrayValuesWithFakeKeys(reportType);
    return { ...reportType, ...arrayFieldsWithFakeKeys, reportTags: customReportTagValues };
  }, [reportType, reportTypeReportTags, allReportTags, formMode]);

  if (reportTypeIsPending || allReportTagsPending || reportTypeReportTagsPending || isDeleteReportTypePending) {
    return <Spin />;
  }

  const title = formMode === REPORT_TYPE_FORM_MODE.READONLY ? t('REPORT_TYPES_DETAIL_PAGE_TITLE') : t('REPORT_TYPES_EDIT_PAGE_TITLE');

  return (
    <div>
      <div className={classes.headerGroup}>
        <Header title={title} />
        <div>
          <BackToReportTypeListButton />
        </div>
      </div>
      {reportType ? (
        <ReportTypeForm
          initialValues={initialValues}
          mode={formMode}
          onFormActionClick={onFormActionClick}
          onEditCancel={onEditCancel}
          onDeleteClick={handleDeleteClick}
          canAccessFormActions={canAccessEdit}
          isLoading={isUpdateReportTypePending}
          allReportTags={allReportTags}
          allEmployees={allEmployees}
        />
      ) : null}
    </div>
  );
}

const reduxKey = REDUX_KEY.REPORTS.REPORT_TYPES_DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(ReportTypeDetail);

import { useEffect } from 'react';
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

import ReportTagForm from '../components/ReportTagForm';
import { REPORT_TAG_FORM_MODE } from '../constants';
import Header from '../../components/Header';
import { Creators } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { getFormMode, getReportTag, getReportTagUpate } from './redux/selectors';
import BackToReportListButton from '../components/BackToReportListButton';
import ReportTagPermissionRolesTable from './components/ReportTagPermissionRolesTable';
import ReportTypesTable from './components/ReportTypeTable';
import useStyles from './styles';

import { ROUTE } from '@app/routes';

function ReportTagDetail() {
  usePageViewAnalytics({
    name: ROUTE.REPORT_TAGS_DETAIL.name,
    squad: ROUTE.REPORT_TAGS_DETAIL.squad,
  });
  const { id } = useParams();
  const { t } = useTranslation('reportsPage');
  const classes = useStyles();

  const dispatch = useDispatch();
  const reportTag = useSelector(getReportTag.getData);
  const reportTagIsPending = useSelector(getReportTag.getIsPending);
  const isUpdateReportTagPending = useSelector(getReportTagUpate.getIsPending);

  const { canAccess } = usePermission();

  const canAccessEdit = canAccess(permKey.PAGE_REPORT_TAGS_DETAIL_EDIT);
  const canAccessReportTypeDetail = canAccess(permKey.PAGE_REPORT_TYPES_DETAIL);

  // detail and edit on the same page, edit button will switch it.
  const formMode = useSelector(getFormMode);

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(Creators.getReportTagByIdRequest({ id }));
  }, [dispatch, id]);

  const onFormActionClick = changedValues => {
    if (formMode === REPORT_TAG_FORM_MODE.READONLY) {
      dispatch(Creators.setFormMode({ formMode: REPORT_TAG_FORM_MODE.EDIT }));
      return;
    }
    dispatch(Creators.updateReportTagRequest({ data: { ...changedValues, _id: reportTag._id } }));
  };

  const onEditCancel = () => {
    dispatch(Creators.setFormMode({ formMode: REPORT_TAG_FORM_MODE.READONLY }));
  };

  if (reportTagIsPending) {
    return <Spin />;
  }

  const title = formMode === REPORT_TAG_FORM_MODE.READONLY ? t('REPORT_TAGS_DETAIL_PAGE_TITLE') : t('REPORT_TAGS_EDIT_PAGE_TITLE');

  return (
    <div>
      <div className={classes.headerGroup}>
        <Header title={title} />
        <BackToReportListButton />
      </div>
      {reportTag ? (
        <ReportTagForm
          initialValues={reportTag}
          mode={formMode}
          onFormActionClick={onFormActionClick}
          onEditCancel={onEditCancel}
          canAccessFormActions={canAccessEdit}
          isLoading={isUpdateReportTagPending}
        />
      ) : null}
      {reportTag && <ReportTagPermissionRolesTable reportTagId={id} />}
      <div>
        <ReportTypesTable canAccessDetail={canAccessReportTypeDetail} />
      </div>
    </div>
  );
}

const reduxKey = REDUX_KEY.REPORTS.REPORT_TAGS_DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(ReportTagDetail);

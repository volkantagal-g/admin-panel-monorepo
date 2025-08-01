import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { useTranslation } from 'react-i18next';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import permKey from '@shared/shared/permKey.json';
import { usePermission, usePageViewAnalytics } from '@shared/hooks';

import Header from '../../components/Header';
import NewReportTagButton from './components/NewReportTagButton';
import ReportTagsTable from './components/ReportTagsTable';
import useStyles from './styles';
import { Creators } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { getReportTags } from './redux/selectors';

import { ROUTE } from '@app/routes';

function ReportTagsList() {
  usePageViewAnalytics({
    name: ROUTE.REPORT_TAGS.name,
    squad: ROUTE.REPORT_TAGS.squad,
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation('reportsPage');
  const reportTags = useSelector(getReportTags.getData);
  const { canAccess } = usePermission();

  const canAccessCreate = canAccess(permKey.PAGE_REPORT_TAGS_NEW);
  const canAccessDetail = canAccess(permKey.PAGE_REPORT_TAGS_DETAIL);

  const areReportTagsPending = useSelector(getReportTags.getIsPending);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getReportTagsRequest());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  const title = t('REPORT_TAGS_PAGE_TITLE');
  return (
    <>
      <div className={classes.headerGroup}>
        <Header title={title} />
        {canAccessCreate && <NewReportTagButton />}
      </div>
      <div>
        <ReportTagsTable reportTags={reportTags} isPending={areReportTagsPending} canAccessDetail={canAccessDetail} />
      </div>
    </>
  );
}

const reduxKey = REDUX_KEY.REPORTS.REPORT_TAGS;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(ReportTagsList);

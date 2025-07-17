import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';
import { useTranslation } from 'react-i18next';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import permKey from '@shared/shared/permKey.json';
import { usePermission, usePageViewAnalytics } from '@shared/hooks';

import Header from '../../components/Header';
import useStyles from './styles';
import { Creators } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';
import ReportTypesTable from './components/ReportTypeTable';
import NewReportTypeButton from './components/NewReportTypeButton';
import { DEFAULT_PAGE_SIZE } from './constants';

import { ROUTE } from '@app/routes';

function ReportTypesList() {
  usePageViewAnalytics({
    name: ROUTE.REPORT_TYPES.name,
    squad: ROUTE.REPORT_TYPES.squad,
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation('reportsPage');
  const { canAccess } = usePermission();

  const canAccessCreate = canAccess(permKey.PAGE_REPORT_TYPES_NEW);
  const canAccessDetail = canAccess(permKey.PAGE_REPORT_TYPES_DETAIL);

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);
  useEffect(() => {
    dispatch(Creators.getReportTypesRequest({ data: { limit: DEFAULT_PAGE_SIZE, offset: 0, filter: {} } }));
    dispatch(Creators.getAllReportTagsRequest());
  }, [dispatch]);

  const title = t('REPORT_TYPES_PAGE_TITLE');
  return (
    <>
      <div className={classes.headerGroup}>
        <Header title={title} />
        {canAccessCreate && <NewReportTypeButton />}
      </div>
      <div>
        <ReportTypesTable canAccessDetail={canAccessDetail} />
      </div>
    </>
  );
}

const reduxKey = REDUX_KEY.REPORTS.REPORT_TYPES;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(ReportTypesList);

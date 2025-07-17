import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { useTranslation } from 'react-i18next';

import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { REDUX_KEY } from '@shared/shared/constants';

import { Creators } from './redux/actions';
import ReportTagForm from '../components/ReportTagForm';
import { INITIAL_FORM_VALUES } from '../components/ReportTagForm/formUtils';
import { REPORT_TAG_FORM_MODE } from '../constants';
import Header from '../../components/Header';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { getCreateReportTags } from './redux/selectors';
import BackToReportListButton from '../components/BackToReportListButton';
import useStyles from './styles';

import { ROUTE } from '@app/routes';
import { usePageViewAnalytics } from '@shared/hooks';

function ReportTagNew() {
  usePageViewAnalytics({
    name: ROUTE.REPORT_TAGS_NEW.name,
    squad: ROUTE.REPORT_TAGS_NEW.squad,
  });
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation('reportsPage');
  const isCreateReportTagPending = useSelector(getCreateReportTags.getIsPending);

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  const onFormActionClick = values => {
    dispatch(Creators.createReportTagRequest({ data: values }));
  };

  const title = t('REPORT_TAGS_NEW_PAGE_TITLE');
  return (
    <>
      <div className={classes.headerGroup}>
        <Header title={title} />
        <BackToReportListButton />
      </div>
      <ReportTagForm
        initialValues={INITIAL_FORM_VALUES}
        mode={REPORT_TAG_FORM_MODE.NEW}
        onFormActionClick={onFormActionClick}
        canAccessFormActions
        isLoading={isCreateReportTagPending}
      />
    </>
  );
}

const reduxKey = REDUX_KEY.REPORTS.REPORT_TAGS_NEW;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(ReportTagNew);

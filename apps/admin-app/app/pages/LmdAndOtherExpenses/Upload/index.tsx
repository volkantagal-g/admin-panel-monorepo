import { useTranslation } from 'react-i18next';

import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import useStyles from '@app/pages/LmdAndOtherExpenses/Upload/style';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';
import { useInitAndDestroyPage } from '@shared/hooks';
import { Creators } from './redux/actions';
import injectSaga from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import saga from './redux/saga';
import injectReducer from '@shared/utils/injectReducer';
import reducer from './redux/reducer';
import LmdUploaderCard from '../components/LmdUploaderCard';

const reduxKey = REDUX_KEY.LMD_AND_OTHER_EXPENSES.UPLOAD;

function LmdAndOtherExpensesUpload() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation(['lmdAndOtherExpensesUploadPage']);

  useInitAndDestroyPage({ dispatch, Creators });

  return (
    <>
      <PageTitleHeader title={t('lmdAndOtherExpensesUploadPage:PAGE_TITLE')} />

      <div className={classes.pageContainer}>
        <header className={classes.header}>{t('lmdAndOtherExpensesUploadPage:PAGE_TITLE')}</header>
        <LmdUploaderCard />
      </div>
    </>
  );
}

const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(LmdAndOtherExpensesUpload);

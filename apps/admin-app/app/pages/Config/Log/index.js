import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useParams } from 'react-router-dom';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

import reducer from './redux/reducer';
import saga from './redux/saga';
import { Creators } from './redux/actions';
import { Header, History } from './components';

const reduxKey = REDUX_KEY.CONFIG.LOG;

const ConfigLogs = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const { t } = useTranslation(['configPage']);
  const { key } = useParams();

  const title = `${key} - ${t('global:PAGE_TITLE.CONFIG.LOG')}`;
  return (
    <>
      <PageTitleHeader title={title} />
      <Header title={title} />
      <History />
    </>
  );
};

export default ConfigLogs;

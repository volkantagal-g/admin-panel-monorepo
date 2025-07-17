import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

import reducer from './redux/reducer';
import saga from './redux/saga';
import { Creators } from './redux/actions';
import { Header, Form } from './components';

const reduxKey = REDUX_KEY.CONFIG.NEW;

const NewConfig = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const { t } = useTranslation(['configPage']);

  return (
    <>
      <PageTitleHeader title={t('global:PAGE_TITLE.CONFIG.NEW')} />
      <Header />
      <Form />
    </>
  );
};

export default NewConfig;

import { useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { useParams } from 'react-router-dom';

import { useEffect } from 'react';

import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

import AlgorithmConfigDetail from './components/AlgorithmConfigDetail';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';

const reduxKey = REDUX_KEY.ALGORITHM.CONFIG.DETAIL;

const AlgorithmConfigDetailPage = () => {
  const { t } = useTranslation(['algorithmConfigPage']);
  const { key, namespace } = useParams();
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.ALGORITHM_CONFIG_DETAIL.name, squad: ROUTE.ALGORITHM_CONFIG_DETAIL.squad });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getConfigDetailRequest({ key, namespace }));
    dispatch(Creators.getConfigValueRequest({ key, namespace }));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, key, namespace]);

  return (
    <>
      <PageTitleHeader title={t('algorithmConfigPage:ALGORITHM_CONFIG')} />
      <AlgorithmConfigDetail />
    </>
  );
};

export default AlgorithmConfigDetailPage;

import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

import { FOOD_CONSTANTS as CONSTANTS, DOMAIN_DETAIL_ROUTES_BY_NAMESPACES } from '../../constants';
import { Creators } from '../../Base/Detail/redux/actions';
import saga from '../../Base/Detail/redux/saga';
import reducer from '../../Base/Detail/redux/reducer';
import DomainConfigDetail from '@app/pages/Algorithm/Config/Domain/Base/Detail/components/DomainConfigDetail';

const reduxKey = REDUX_KEY.ALGORITHM.CONFIG.DOMAIN.BASE.DETAIL;
const NAMESPACE = CONSTANTS.namespace;
const DETAIL_ROUTE = DOMAIN_DETAIL_ROUTES_BY_NAMESPACES[NAMESPACE];

const AlgorithmFoodDomainConfigDetailPage = () => {
  const { t } = useTranslation(['algorithmConfigPage']);
  const dispatch = useDispatch();
  const { key } = useParams();

  usePageViewAnalytics({ name: DETAIL_ROUTE.name, squad: DETAIL_ROUTE.squad });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getAlgorithmDomainConfigDetailRequest({ key, namespace: NAMESPACE }));
    dispatch(Creators.getAlgorithmDomainConfigValueRequest({ key, namespace: NAMESPACE }));
    dispatch(Creators.getAlgorithmDomainSettingsRequest({ namespace: NAMESPACE }));
    dispatch(Creators.setNamespace({ namespace: NAMESPACE }));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, key]);

  return (
    <>
      <PageTitleHeader title={t('algorithmConfigPage:ALGORITHM_CONFIG')} />
      <DomainConfigDetail />
    </>
  );
};

export default AlgorithmFoodDomainConfigDetailPage;

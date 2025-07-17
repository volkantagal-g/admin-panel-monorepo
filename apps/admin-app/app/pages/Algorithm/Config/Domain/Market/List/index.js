import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useEffect } from 'react';

import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

import { MARKET_CONSTANTS as CONSTANTS, DOMAIN_LIST_ROUTES_BY_NAMESPACES } from '../../constants';
import { Creators } from '../../Base/List/redux/actions';
import saga from '../../Base/List/redux/saga';
import reducer from '../../Base/List/redux/reducer';
import ConfigFilter from '../../Base/List/components/ConfigFilter';
import AlgorithmConfigList from '../../Base/List/components/AlgorithmConfigList';
import ConfigValueFilter from '@app/pages/Algorithm/Config/Domain/Base/List/components/ConfigValueFilter';
import AlgorithmConfigBulkUpload
  from '@app/pages/Algorithm/Config/Domain/Base/List/components/AlgorithmConfigBulkUpload';

const reduxKey = REDUX_KEY.ALGORITHM.CONFIG.DOMAIN.BASE.LIST;
const NAMESPACE = CONSTANTS.namespace;
const LIST_ROUTE = DOMAIN_LIST_ROUTES_BY_NAMESPACES[NAMESPACE];

const AlgorithmMarketDomainConfigListPage = () => {
  const { t } = useTranslation(['algorithmConfigPage']);
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: LIST_ROUTE.name, squad: LIST_ROUTE.squad });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });

  useEffect(() => {
    dispatch(Creators.setNamespace({ namespace: CONSTANTS.namespace }));
    dispatch(Creators.setConstants({ constants: CONSTANTS }));
    CONSTANTS.defaultFilters?.forEach(filter => {
      dispatch(Creators.addFilterParameter(filter));
    });
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <>
      <PageTitleHeader title={t('algorithmConfigPage:ALGORITHM_CONFIG')} />
      <ConfigFilter />
      <ConfigValueFilter />
      <AlgorithmConfigBulkUpload isDomain />
      <AlgorithmConfigList />
    </>
  );
};

export default AlgorithmMarketDomainConfigListPage;

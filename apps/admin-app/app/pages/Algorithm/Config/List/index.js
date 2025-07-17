import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useEffect } from 'react';

import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

import AlgorithmConfigList from './components/AlgorithmConfigList';
import ConfigFilter from './components/ConfigFilter';
import ConfigValueFilter from './components/ConfigValueFilter';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import AlgorithmConfigBulkUpload from '@app/pages/Algorithm/Config/List/components/AlgorithmConfigBulkUpload';

const reduxKey = REDUX_KEY.ALGORITHM.CONFIG.LIST;

const AlgorithmConfigListPage = () => {
  const { t } = useTranslation(['algorithmConfigPage']);
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.ALGORITHM_CONFIG_LIST.name, squad: ROUTE.ALGORITHM_CONFIG_LIST.squad });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getAlgorithmConfigNamespaceListRequest());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <>
      <PageTitleHeader title={t('algorithmConfigPage:ALGORITHM_CONFIG')} />
      <ConfigFilter />
      <ConfigValueFilter />
      <AlgorithmConfigBulkUpload isDomain={false} />
      <AlgorithmConfigList />
    </>
  );
};

export default AlgorithmConfigListPage;

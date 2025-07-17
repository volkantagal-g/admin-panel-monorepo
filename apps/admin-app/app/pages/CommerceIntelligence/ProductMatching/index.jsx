import { memo, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { usePageViewAnalytics } from '@shared/hooks';
import ErrorFallback from '@app/pages/CommerceIntelligence/components/ErrorFallback';
import Header from '@app/pages/CommerceIntelligence/components/Header';
import Tabs from '@app/pages/CommerceIntelligence/components/Tabs';
import {
  PRODUCT_MATCHING_ANALYTICS_CONFIG,
  PRODUCT_MATCHING_TABS,
  REDUX_STORE_KEYS,
  TRANSLATION_NAMESPACE,
} from '@app/pages/CommerceIntelligence/constants';
import { createTabItems } from '@app/pages/CommerceIntelligence/ProductMatching/utils/tabMappers';
import { ROUTE } from '@app/routes';
import { RESTART_ON_REMOUNT } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import useStyles from './styles';

import { Creators } from './redux/actions';
import { reducer } from './redux/reducer';
import { productMatchingSagas } from './redux/sagas';

const ProductMatching = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation(TRANSLATION_NAMESPACE);
  const [activeTab, setActiveTab] = useState(String(PRODUCT_MATCHING_TABS.CONFIDENCE));

  useInjectReducer({ key: REDUX_STORE_KEYS.PRODUCT_MATCHING, reducer });
  useInjectSaga({ key: REDUX_STORE_KEYS.PRODUCT_MATCHING, saga: productMatchingSagas, mode: RESTART_ON_REMOUNT });

  usePageViewAnalytics({
    name: ROUTE[PRODUCT_MATCHING_ANALYTICS_CONFIG.name].name,
    squad: ROUTE[PRODUCT_MATCHING_ANALYTICS_CONFIG.name].squad,
  });

  useEffect(() => {
    dispatch(Creators.fetchProductMatchingConfidenceVeryHighRequest());

    return () => {
      dispatch(Creators.clearProductMatchingState());
    };
  }, [dispatch]);

  const items = createTabItems(t, classes, Tabs);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className={classes.container}>
        <Header title={t('PRODUCT_MATCHING')} />
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          items={items}
          wrapperClass=""
          showCountBadge
        />
      </div>
    </ErrorBoundary>
  );
};

export default memo(ProductMatching);

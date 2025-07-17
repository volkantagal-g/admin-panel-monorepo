import { memo, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { usePageViewAnalytics } from '@shared/hooks';
import ErrorFallback from '@app/pages/CommerceIntelligence/components/ErrorFallback';
import Header from '@app/pages/CommerceIntelligence/components/Header';
import Tabs from '@app/pages/CommerceIntelligence/components/Tabs';
import {
  REDUX_STORE_KEYS,
  SMART_PRICING_ANALYTICS_CONFIG,
  SMART_PRICING_TABS,
  TRANSLATION_NAMESPACE,
} from '@app/pages/CommerceIntelligence/constants';
import { createTabItems } from '@app/pages/CommerceIntelligence/SmartPricing/Index/utils/tabMappers';
import { ROUTE } from '@app/routes';
import { RESTART_ON_REMOUNT } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import useStyles from './styles';

import { Creators } from './redux/actions';
import { reducer } from './redux/reducer';
import { smartPricingSagas } from './redux/sagas';

const SmartPricing = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation(TRANSLATION_NAMESPACE);
  const [activeTab, setActiveTab] = useState(String(SMART_PRICING_TABS.GETIR));

  useInjectReducer({ key: REDUX_STORE_KEYS.SMART_PRICING, reducer });
  useInjectSaga({ key: REDUX_STORE_KEYS.SMART_PRICING, saga: smartPricingSagas, mode: RESTART_ON_REMOUNT });

  usePageViewAnalytics({
    name: ROUTE[SMART_PRICING_ANALYTICS_CONFIG.name].name,
    squad: ROUTE[SMART_PRICING_ANALYTICS_CONFIG.name].squad,
  });

  useEffect(() => {
    dispatch(Creators.fetchSmartPricingIndexRequest());

    return () => {
      dispatch(Creators.clearSmartPricingState());
    };
  }, [dispatch]);

  const items = createTabItems(t, classes);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className={classes.container}>
        <Header
          title={t('SMART_PRICING.INDEX')}
          rulesetAndGuardrailsButton
        />
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          items={items}
          wrapperClass=""
          showCountBadge={false}
        />
      </div>
    </ErrorBoundary>
  );
};

export default memo(SmartPricing);

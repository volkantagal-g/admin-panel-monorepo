import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { PageHeader } from 'antd';

import { useEffect, useMemo } from 'react';

import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import reducer from './redux/reducer';
import saga from './redux/saga';

import { Creators } from './redux/actions';
import AntCard from '@shared/components/UI/AntCard';
import { Tabs } from '@shared/components/GUI';
import { financialConfigsSelector } from './redux/selectors';
import Spinner from '@shared/components/Spinner';
import ConfigList from './components/ConfigList';

const reduxKey = REDUX_KEY.FOOD.FINANCIAL_CONFIGS;

const FinancialConfigs = () => {
  const { t } = useTranslation('foodFinancialConfigsPage');
  const verticals = useSelector(financialConfigsSelector.getVerticals);
  const isPendingVerticals = useSelector(
    financialConfigsSelector.getIsPendingVerticals,
  );
  const dispatch = useDispatch();

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  usePageViewAnalytics({
    name: ROUTE.GETIR_FOOD_FINANCIAL_CONFIGS.name,
    squad: ROUTE.GETIR_FOOD_FINANCIAL_CONFIGS.squad,
  });

  const tabItems = useMemo(() => verticals?.map(vertical => ({
    label: vertical,
    children: <ConfigList vertical={vertical} />,
    key: vertical,
  })), [verticals]);

  useEffect(() => {
    dispatch(Creators.getFinancialConfigsVerticalsRequest());
  }, [dispatch]);

  if (isPendingVerticals || !tabItems) return <Spinner />;

  return (
    <>
      <PageHeader className="p-0 page-title" title={t('PAGE_TITLE')} />

      <AntCard>
        <Tabs items={tabItems} />
      </AntCard>
    </>
  );
};

export default FinancialConfigs;

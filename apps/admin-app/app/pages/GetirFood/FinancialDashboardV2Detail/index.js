import { useCallback, useEffect, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { useSearchParams } from 'react-router-dom';
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { ROUTE } from '@app/routes';

import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import AntCard from '@shared/components/UI/AntCard';
import { Tabs } from '@shared/components/GUI';
import { TAB_ITEMS } from './constants';
import Table from './Table';
import { decodeQueryParams } from '../FinancialDashboardV2/utils';
import useStyles from './styles';
import { INITIAL_PAGINATION } from '../FinancialDashboardV2/constants';

import SelectRestaurant from '@shared/containers/Select/Restaurant';
import SelectChainRestaurant from '@shared/containers/Select/ChainRestaurant';
import { exportPaymentDetailExcelSelector, paymentDetailsSelector } from './redux/selectors';

const reduxKey = REDUX_KEY.FOOD.FINANCIAL_DASHBOARD_V2_DETAIL;

const FinancialDashboardV2Detail = () => {
  const { t } = useTranslation('foodFinancialDashboardV2DetailPage');
  const classes = useStyles();
  const dispatch = useDispatch();
  const isPendingPaymentDetails = useSelector(paymentDetailsSelector.getIsPending);
  const isPendingExcelExport = useSelector(exportPaymentDetailExcelSelector.getIsPending);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useMemo(() => decodeQueryParams(searchParams), [searchParams]);
  const { activeTab, id } = params;
  const isCurrentTabChain = activeTab === TAB_ITEMS.CHAIN;

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  usePageViewAnalytics({ name: ROUTE.GETIR_FOOD_FINANCIAL_DASHBOARD_V2_DETAIL.name, squad: ROUTE.GETIR_FOOD_FINANCIAL_DASHBOARD_V2_DETAIL.squad });

  const updateSearchParamsAndGetDetails = useCallback(newValues => {
    setSearchParams(newValues);
    dispatch(Creators.getPaymentDetailsRequest(newValues));
  }, [dispatch, setSearchParams]);

  const handleParamsChange = useCallback((newParams, additionalParams = {}, removeIdAndIsChain = false) => {
    const { id: _, isChain: __, ...restParams } = params;
    const values = {
      ...restParams,
      ...newParams,
      ...(!removeIdAndIsChain && id && { id, isChain: isCurrentTabChain }),
      ...additionalParams,
    };
    updateSearchParamsAndGetDetails(values);
  }, [params, id, isCurrentTabChain, updateSearchParamsAndGetDetails]);

  const handlePaginationChange = useCallback(pagination => {
    handleParamsChange(pagination);
  }, [handleParamsChange]);

  const handleTabChange = selectedTab => {
    handleParamsChange({ activeTab: selectedTab }, INITIAL_PAGINATION, true);
  };

  const handleIDChange = newId => {
    handleParamsChange(
      INITIAL_PAGINATION,
      newId ? {
        id: newId,
        isChain:
        isCurrentTabChain,
      } : {},
      !newId,
    );
  };

  const tabItems = useMemo(() => [
    {
      label: t('SINGLE.TITLE'),
      children: <Table onPaginationChange={handlePaginationChange} />,
      key: TAB_ITEMS.SINGLE,
    },
    {
      label: t('CHAIN.TITLE'),
      children: <Table onPaginationChange={handlePaginationChange} />,
      key: TAB_ITEMS.CHAIN,
    },
  ], [handlePaginationChange, t]);

  const handlExportPaymentDetails = () => {
    dispatch(Creators.exportPaymentDetailExcelRequest({
      deferredPaymentDate: params.deferredPaymentDate,
      ...(params?.id && { id: params.id }),
      ...(params?.isChain && { isChain: params.isChain }),
    }));
  };

  useEffect(() => {
    // Update details with remaining parameters, excluding id and isChain, when the page loads
    const { id: _, isChain: __, ...restParams } = params;
    updateSearchParamsAndGetDetails(restParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const SelectComponent = activeTab === TAB_ITEMS.CHAIN ? SelectChainRestaurant : SelectRestaurant;

  return (
    <AntCard>
      <Tabs
        items={tabItems}
        activeKey={activeTab}
        onChange={handleTabChange}
        tabBarExtraContent={{
          right: (
            <SelectComponent
              onChange={handleIDChange}
              value={id}
              className={classes.select}
            />
          ),
        }}
      />
      <Button
        type="primary"
        loading={isPendingPaymentDetails || isPendingExcelExport}
        icon={<DownloadOutlined />}
        onClick={handlExportPaymentDetails}
        disabled={isPendingExcelExport}
      >
        {t('EXPORT_EXCEL')}
      </Button>
    </AntCard>
  );
};

export default FinancialDashboardV2Detail;

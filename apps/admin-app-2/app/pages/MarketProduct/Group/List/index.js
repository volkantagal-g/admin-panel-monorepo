import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { zipObject } from 'lodash';
import { useTranslation } from 'react-i18next';
import { Form } from 'antd';

import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { Header } from './components';
import Filter from './components/Filter';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { ROUTE } from '@app/routes';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getLimitAndOffset } from '@shared/utils/common';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getMarketProductGroupsSelector } from '@app/pages/MarketProduct/Group/List/redux/selectors';
import { getTableColumns } from '@app/pages/MarketProduct/Group/List/tableConfig';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';

import { productGroupFilters } from '@app/pages/MarketProduct/constantValues';
import { PRODUCT_GROUP_FILTER } from '@app/pages/MarketProduct/constants';

const defaultFilterOptions = Object.keys(productGroupFilters)
  .filter(f => f !== PRODUCT_GROUP_FILTER.INACTIVE);

const MarketProductGroupListPage = () => {
  usePageViewAnalytics({ name: ROUTE.MARKET_PRODUCT_GROUP_LIST.name, squad: ROUTE.MARKET_PRODUCT_GROUP_LIST.squad });
  const dispatch = useDispatch();
  const data = useSelector(getMarketProductGroupsSelector.getData);
  const isGetPending = useSelector(getMarketProductGroupsSelector.getIsPending);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState(() => defaultFilterOptions);
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState({});
  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });
  const { t } = useTranslation('marketProductGroupPage');

  const { debouncedCallback: fetchResultsDebounced } = useDebouncedCallback({
    callback: useCallback(() => {
      if (filters.length === 0) {
        dispatch(ToastCreators.error({ message: t('error:FILTER_OPTION_IS_MISSING') }));
      }
      else {
        dispatch(
          Creators.getMarketProductGroupsRequest({
            ...getLimitAndOffset(pagination),
            queryText: query,
            filterOptions: {
              ...(zipObject(filters, [...filters].fill(true))),
              ...(formValues.groupTarget ? { groupTarget: Number(formValues.groupTarget) } : {}),
              ...(formValues.groupType ? { groupType: formValues.groupType } : {}),
              ...(formValues.groupPlacement ? { groupPlacement: formValues.groupPlacement } : {}),
            },
          }),
        );
      }
    }, [
      dispatch,
      t,
      pagination,
      query,
      filters,
      formValues,
    ]),
  });

  useEffect(() => {
    fetchResultsDebounced();
  }, [
    fetchResultsDebounced,
  ]);

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  const tableColumns = useMemo(() => getTableColumns({ t }), [t]);

  return (
    <>
      <Header />
      <Filter
        query={query}
        onQueryChange={setQuery}
        filters={filters}
        onFiltersChange={setFilters}
        form={form}
        setFormValues={setFormValues}
      />
      <AntTableV2
        title={t('global:PAGE_TITLE.MARKET_PRODUCT_GROUP.LIST')}
        data-testid="MARKET_PRODUCT_GROUPS_LIST"
        data={data}
        columns={tableColumns}
        loading={isGetPending}
        pagination={pagination}
        onPaginationChange={setPagination}
      />
    </>
  );
};

const reduxKey = REDUX_KEY.MARKET_PRODUCT.GROUP.LIST;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(MarketProductGroupListPage);

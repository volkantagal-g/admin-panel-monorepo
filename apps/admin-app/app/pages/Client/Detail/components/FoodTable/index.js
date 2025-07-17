import { memo, useCallback, useEffect, useMemo } from 'react';
import { Collapse } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getLangKey } from '@shared/i18n';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { Creators } from '@app/pages/Client/Detail/redux/actions';
import RefreshButton from '@app/pages/Client/Detail/components/shared/RefreshButton';
import { foodOrdersSelector, clientSelector } from '@app/pages/Client/Detail/redux/selectors';
import Filter from './components/Filter';
import columnsConfig from './config';
import { transformData } from './utils';
import useStyles from './styles';

const { Panel } = Collapse;
const COLLAPSE_KEY_PREFIX = 'CLIENT_DETAIL_FOOD_TABLE_COMPONENT_COLLAPSE_';

const FoodTable = () => {
  const { t } = useTranslation(['clientDetail', 'global']);
  const classes = useStyles();
  const langKey = getLangKey();
  const dispatch = useDispatch();
  const client = useSelector(clientSelector.getClient);
  const orders = useSelector(foodOrdersSelector.getFoodOrders);
  const isPending = useSelector(foodOrdersSelector.isPending);
  const filters = useSelector(foodOrdersSelector.getFilters);

  const columns = useMemo(() => columnsConfig(t, langKey), [t, langKey]);
  const dataSource = useMemo(() => transformData(orders), [orders]);
  const pagination = useMemo(() => ({
    currentPage: filters?.page || 1,
    rowsPerPage: filters?.count || 10,
  }), [filters?.count, filters?.page]);

  useEffect(() => {
    dispatch(Creators.getPaymentMethodsRequest({ includeOnline: true }));
  }, [dispatch]);

  const getFoodOrders = useCallback(() => dispatch(Creators.getFoodOrdersRequest()), [dispatch]);

  const onPaginationChange = updatedPagination => {
    let send = false;
    if (updatedPagination.rowsPerPage !== filters.count) {
      send = true;
      dispatch(Creators.setFiltersPagePerRow({ pagePerRow: updatedPagination.rowsPerPage }));
    }
    if (updatedPagination.currentPage !== updatedPagination.page) {
      send = true;
      dispatch(Creators.setFiltersPage({ page: updatedPagination.currentPage }));
    }

    if (send) {
      getFoodOrders();
    }
  };

  useEffect(() => {
    if (client?._id) {
      getFoodOrders();
    }
  }, [client?._id, getFoodOrders]);

  return (
    <Collapse activeKey={`${COLLAPSE_KEY_PREFIX}1`} className={classes.tableWrapper}>
      <Panel
        showArrow={false}
        className={classes.noPanelPadding}
        header={t('FOOD_TABLE.TITLE')}
        key={`${COLLAPSE_KEY_PREFIX}1`}
        extra={(
          <>
            <RefreshButton onClick={getFoodOrders} />
            <RefreshButton text={t('APPLY')} onClick={getFoodOrders} />
          </>
        )}
      >
        <Filter />
        <AntTableV2
          data={dataSource}
          columns={columns}
          loading={isPending}
          pagination={pagination}
          isScrollableToTop={false}
          onPaginationChange={onPaginationChange}
        />
      </Panel>
    </Collapse>
  );
};

export default memo(FoodTable);

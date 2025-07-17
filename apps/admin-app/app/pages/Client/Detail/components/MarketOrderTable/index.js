import { memo, useEffect, useMemo, useState, useCallback } from 'react';
import { Collapse, Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getLangKey } from '@shared/i18n';
import { Creators } from '@app/pages/Client/Detail/redux/actions';
import {
  ordersHistorySelector,
  clientSelector,
} from '@app/pages/Client/Detail/redux/selectors';
import RefreshButton from '@app/pages/Client/Detail/components/shared/RefreshButton';
import useStyles from './styles';
import columnsConfig from './config';
import { transformData, transformForApi } from './utils';
import Filter from './Filter';
import { getLimitAndOffset } from '@shared/utils/common';

const { Panel } = Collapse;
const COLLAPSE_KEY_PREFIX =
  'CLIENT_DETAIL_GETIR_MARKET_ORDER_TABLE_COMPONENT_COLLAPSE_';

const MarketOrderTable = () => {
  const { t } = useTranslation('clientDetail');
  const client = useSelector(clientSelector.getClient);
  const dispatch = useDispatch();
  const orders = useSelector(ordersHistorySelector.getOrdersHistory);
  const langKey = getLangKey();
  const classes = useStyles();
  const { city, region, statuses, domainType, createdAtStart, createdAtEnd } =
    orders?.filters ?? {};
  const defaultPagination = { ...getLimitAndOffset() };
  const [pagination, setPagination] = useState(defaultPagination);
  const { limit, offset } = pagination;
  const getOrdersByFilters = useCallback(() => {
    if (client?._id) {
      const data = transformForApi({
        city,
        region,
        statuses,
        domainType,
        createdAtStart,
        createdAtEnd,
      });
      dispatch(
        Creators.getOrdersHistoryRequest({
          data: {
            ...data,
            limit,
            offset,
            client: client?._id,
          },
        }),
      );
    }
  }, [
    dispatch,
    city,
    region,
    statuses,
    domainType,
    createdAtStart,
    createdAtEnd,
    client,
    limit,
    offset,
  ]);

  const getResetOrdersByFilters = () => {
    setPagination(defaultPagination);
  };

  useEffect(() => {
    getOrdersByFilters();
  }, [getOrdersByFilters]);

  const columns = useMemo(() => columnsConfig(t, langKey), [t, langKey]);
  const dataSource = useMemo(() => transformData(orders?.data), [orders]);

  const handleTableChange = ({ pageSize, current }) => {
    if (pagination.limit !== pageSize || pagination.page !== current) {
      setPagination({
        ...pagination,
        ...getLimitAndOffset({ currentPage: current, rowsPerPage: pageSize }),
      });
    }
  };

  return (
    <Collapse
      activeKey={`${COLLAPSE_KEY_PREFIX}1`}
      className={classes.tableWrapper}
    >
      <Panel
        showArrow={false}
        className={classes.noPanelPadding}
        header={t('MARKET_ORDER_TABLE.TITLE')}
        key={`${COLLAPSE_KEY_PREFIX}1`}
        extra={[
          <RefreshButton key={1} onClick={getOrdersByFilters} />,
          <RefreshButton
            key={2}
            onClick={getResetOrdersByFilters}
            text={t('RESET')}
          />,
        ]}
      >
        <Filter filters={orders?.filters} client={client} />
        <Table
          loading={orders?.isPending}
          dataSource={dataSource}
          onChange={handleTableChange}
          pagination={{
            current: pagination.page,
            total: 1000,
            showSizeChanger: true,
          }}
          columns={columns}
        />
      </Panel>
    </Collapse>
  );
};

export default memo(MarketOrderTable);

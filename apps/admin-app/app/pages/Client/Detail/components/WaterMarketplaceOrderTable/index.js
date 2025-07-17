import { memo, useEffect, useMemo, useState } from 'react';
import { Collapse, Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getLangKey } from '@shared/i18n';
import { Creators } from '@app/pages/Client/Detail/redux/actions';
import RefreshButton from '@app/pages/Client/Detail/components/shared/RefreshButton';
import { waterMarketPlaceSelector, clientSelector } from '@app/pages/Client/Detail/redux/selectors';
import useStyles from './styles';
import columnsConfig from './config';

const { Panel } = Collapse;
const COLLAPSE_KEY_PREFIX = 'CLIENT_DETAIL_GETIR_WATER_MARKETPLACE_ORDERS_TABLE_COMPONENT_COLLAPSE_';

const WaterMarketplaceOrdersTable = () => {
  const { t } = useTranslation('clientDetail');
  const client = useSelector(clientSelector.getClient);
  const dispatch = useDispatch();
  const orders = useSelector(waterMarketPlaceSelector.getGetirWaterMarketplaceOrders);
  const isPending = useSelector(waterMarketPlaceSelector.isPending);
  const ordersPagination = useSelector(waterMarketPlaceSelector.getGetirWaterMarketplacePagination);
  const langKey = getLangKey();
  const classes = useStyles();
  const [pagination, setPagination] = useState({ page: 1, count: 10, total: 0 });

  const getWaterMarketplaceOrders = () => {
    dispatch(Creators.getGetirWaterMarketplaceOrdersRequest({ ...pagination, clientId: client._id }));
  };

  useEffect(() => {
    setPagination({
      ...pagination,
      total: ordersPagination.totalRecordCount,
    });
  }, [ordersPagination]);

  useEffect(() => {
    if (client?._id) getWaterMarketplaceOrders();
  }, [dispatch, pagination.page, pagination.count, client]);

  const columns = useMemo(() => columnsConfig(t, langKey), [t, langKey]);

  const updatePagination = data => {
    setPagination({ ...pagination, page: data.current, count: data.pageSize });
  };

  return (
    <Collapse activeKey={`${COLLAPSE_KEY_PREFIX}1`} className={classes.tableWrapper}>
      <Panel
        showArrow={false}
        header={t("WATER_MARKETPLACE.TITLE")}
        className={classes.noPanelPadding}
        key={`${COLLAPSE_KEY_PREFIX}1`}
        extra={<RefreshButton onClick={getWaterMarketplaceOrders} />}
      >
        <Table
          loading={isPending}
          dataSource={orders}
          onChange={updatePagination}
          pagination={{
            current: pagination.page,
            showSizeChanger: true,
            total: pagination.total,
            pageSize: pagination.count,
          }}
          columns={columns} />
      </Panel>
    </Collapse>
  );
};

export default memo(WaterMarketplaceOrdersTable);

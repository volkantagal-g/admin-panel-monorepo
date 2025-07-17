import { memo, useEffect, useMemo, useState } from 'react';
import { Collapse, Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import RefreshButton from '@app/pages/Client/Detail/components/shared/RefreshButton';
import { Creators } from '@app/pages/Client/Detail/redux/actions';
import { getirBiTaksiOrdersSelector, clientSelector } from '@app/pages/Client/Detail/redux/selectors';
import useStyles from './styles';
import columnsConfig from './config';

const { Panel } = Collapse;
const COLLAPSE_KEY_PREFIX = 'CLIENT_DETAIL_GETIR_BITAKSI_TABLE_COMPONENT_COLLAPSE_';

const GetirBiTaksiTable = () => {
  const { t } = useTranslation('clientDetail');
  const client = useSelector(clientSelector.getClient);
  const dispatch = useDispatch();
  const orders = useSelector(getirBiTaksiOrdersSelector.getGetirBiTaksiOrders);
  const isPending = useSelector(getirBiTaksiOrdersSelector.isPending);
  const [pagination, setPagination] = useState({ page: 1, count: 10, total: 0 });
  const classes = useStyles();

  const getGetirBiTaksiOrders = () => {
    dispatch(Creators.getGetirBiTaksiOrdersRequest({ data: { ...pagination, clientId: client?._id } }));
  };

  useEffect(() => {
    if (client?._id) getGetirBiTaksiOrders();
  }, [pagination.page, pagination.count, client]);

  useEffect(() => {
    setPagination({
      ...pagination,
      total: orders?.pagination?.totalRecordCount,
    });
  }, [orders.pagination.totalRecordCount]);

  const columns = useMemo(() => columnsConfig(t), [t]);
  const dataSource = orders?.data;

  const updatePagination = data => {
    setPagination({ ...pagination, page: data.current });
  };

  return (
    <Collapse activeKey={`${COLLAPSE_KEY_PREFIX}1`} className={classes.tableWrapper}>
      <Panel
        showArrow={false}
        className={classes.noPanelPadding}
        header={t("GETIR_BI_TAKSI_TABLE.TITLE")}
        key={`${COLLAPSE_KEY_PREFIX}1`}
        extra={<RefreshButton onClick={getGetirBiTaksiOrders} />}
      >
        <Table
          loading={isPending}
          dataSource={dataSource}
          onChange={updatePagination}
          pagination={{ current: pagination.page, total: pagination.total }}
          columns={columns} />
      </Panel>
    </Collapse>
  );
};

export default memo(GetirBiTaksiTable);

import { memo, useEffect, useMemo, useState } from 'react';
import { Collapse, Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getLangKey } from '@shared/i18n';
import { Creators } from '@app/pages/Client/Detail/redux/actions';
import RefreshButton from '@app/pages/Client/Detail/components/shared/RefreshButton';
import { localsOrdersSelector, clientSelector } from '@app/pages/Client/Detail/redux/selectors';
import useStyles from './styles';
import columnsConfig from './config';
import { transformData } from './utils';

const { Panel } = Collapse;
const COLLAPSE_KEY_PREFIX = 'CLIENT_DETAIL_GETIR_LOCALS_TABLE_COMPONENT_COLLAPSE_';

const LocalsTable = () => {
  const { t } = useTranslation('clientDetail');
  const client = useSelector(clientSelector.getClient);
  const dispatch = useDispatch();
  const orders = useSelector(localsOrdersSelector.getLocalsOrders);
  const isPending = useSelector(localsOrdersSelector.isPending);
  const langKey = getLangKey();
  const classes = useStyles();
  const [pagination, setPagination] = useState({ page: 1, count: 50 });
  const getLocalsOrders = () => {
    dispatch(Creators.getLocalsOrdersRequest({ data: { ...pagination, clientId: client._id } }));
  };

  useEffect(() => {
    if (client?._id) {
      dispatch(Creators.getLocalsOrdersRequest({ data: { ...pagination, clientId: client._id } }));
    }
  }, [dispatch, pagination, client]);

  const columns = useMemo(() => columnsConfig({ t, langKey }), [t, langKey]);
  const dataSource = useMemo(() => transformData(orders), [orders]);

  const updatePagination = data => {
    setPagination({ ...pagination, page: data.current });
  };

  return (
    <Collapse activeKey={`${COLLAPSE_KEY_PREFIX}1`} className={classes.tableWrapper}>
      <Panel
        showArrow={false}
        header={t('LOCALS_TABLE.TITLE')}
        className={classes.noPanelPadding}
        key={`${COLLAPSE_KEY_PREFIX}1`}
        extra={<RefreshButton onClick={getLocalsOrders} />}
      >
        <Table
          loading={isPending}
          dataSource={dataSource}
          onChange={updatePagination}
          pagination={{ current: pagination.page, showSizeChanger: true }}
          columns={columns}
        />
      </Panel>
    </Collapse>
  );
};

export default memo(LocalsTable);

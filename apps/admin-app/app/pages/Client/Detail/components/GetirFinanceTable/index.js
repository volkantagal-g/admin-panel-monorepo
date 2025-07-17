import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Collapse, Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import permKey from '@shared/shared/permKey.json';
import RefreshButton from '@app/pages/Client/Detail/components/shared/RefreshButton';
import { Creators } from '@app/pages/Client/Detail/redux/actions';
import {
  financeOrdersSelector,
  clientSelector,
} from '@app/pages/Client/Detail/redux/selectors';
import useStyles from './styles';
import columnsConfig from './config';
import { getLangKey } from '@shared/i18n';
import { usePermission } from '@shared/hooks';

const { Panel } = Collapse;
const COLLAPSE_KEY_PREFIX =
  'CLIENT_DETAIL_GETIR_FINANCE_TABLE_COMPONENT_COLLAPSE_';

const GetirFinanceTable = () => {
  const { t } = useTranslation('clientDetail');
  const langKey = getLangKey();

  const client = useSelector(clientSelector.getClient);
  const clientId = client?._id;
  const dispatch = useDispatch();
  const orders = useSelector(financeOrdersSelector.getOrders);
  const total = useSelector(financeOrdersSelector.getTotalCount);
  const isPending = useSelector(financeOrdersSelector.getIsPending);
  const classes = useStyles();

  const { canAccess, Can } = usePermission();

  const hasFinanceOrderAccess = canAccess(permKey.PAGE_CLIENT_DETAIL_COMPONENT_FINANCE_ORDERS);

  const [pagination, setPagination] = useState({ page: 0, pageSize: 0, total: 0 });

  const getFinanceOrders = useCallback(
    () => dispatch(
      Creators.getClientFinanceOrdersRequest({ page: pagination.page, size: pagination.pageSize, clientId }),
    ),
    [dispatch, pagination.page, pagination.pageSize, clientId],
  );

  useEffect(() => {
    setPagination({
      page: 1,
      pageSize: 5,
      total,
    });
  }, [total]);

  useEffect(() => {
    if (clientId && hasFinanceOrderAccess && pagination.page) getFinanceOrders();
  }, [getFinanceOrders, pagination.page, clientId, hasFinanceOrderAccess]);

  const columns = useMemo(() => columnsConfig(t, langKey), [langKey, t]);

  const updatePagination = data => {
    setPagination({ ...pagination, page: data.current });
  };

  return (
    <Can permKey={permKey.PAGE_CLIENT_DETAIL_COMPONENT_FINANCE_ORDERS}>
      <Collapse
        activeKey={`${COLLAPSE_KEY_PREFIX}1`}
        className={classes.tableWrapper}
      >
        <Panel
          showArrow={false}
          className={classes.noPanelPadding}
          header={t('FINANCE_TABLE.TITLE')}
          key={`${COLLAPSE_KEY_PREFIX}1`}
          extra={<RefreshButton onClick={getFinanceOrders} />}
        >
          <Table
            loading={isPending}
            dataSource={orders}
            onChange={updatePagination}
            pagination={pagination}
            columns={columns}
          />
        </Panel>
      </Collapse>
    </Can>
  );
};

export default memo(GetirFinanceTable);

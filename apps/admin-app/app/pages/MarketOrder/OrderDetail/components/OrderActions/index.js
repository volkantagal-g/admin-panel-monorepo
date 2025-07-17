import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { useEffect } from 'react';

import useQuery from '@shared/shared/hooks/useQuery';

import { Space, Table } from '@shared/components/GUI';
import { getOrderByIdSelector, orderDetailSelector } from '../../redux/selectors';
import { getTableColumns } from './config';
import { Creators } from '../../redux/actions';
import { GETIR_DOMAIN_TYPES } from '@shared/shared/constants';

const OrderActions = () => {
  const { t } = useTranslation('marketOrderPage');
  const dispatch = useDispatch();
  const query = useQuery();
  const domainType = query.get('domainType');
  const { orderId } = useParams();

  const columns = getTableColumns(t);

  const orderDetail = useSelector(orderDetailSelector.getData);

  useEffect(() => {
    if (!!orderId && !!domainType && (Number(domainType) === GETIR_DOMAIN_TYPES.GETIR10 || Number(domainType) === GETIR_DOMAIN_TYPES.MARKET)) {
      dispatch(Creators.getOrderByIdRequest({ orderId }));
      return;
    }

    if (!orderDetail?.id) return;
    if (!orderDetail?.domainType) return;

    if (!(orderDetail.domainType === GETIR_DOMAIN_TYPES.GETIR10 || orderDetail.domainType === GETIR_DOMAIN_TYPES.MARKET)) {
      return;
    }

    dispatch(Creators.getOrderByIdRequest({ orderId: orderDetail.id }));
  }, [orderDetail, dispatch, orderId, domainType]);

  const newOrderDetail = useSelector(getOrderByIdSelector.getData);
  const isPending = useSelector(getOrderByIdSelector.getIsPending);

  return (
    <Space className="p-1" title={t('ORDER_ACTIONS.TITLE')}>
      {(!isPending && newOrderDetail?.actions?.length > 0) && (
        <Table
          columns={columns}
          data={newOrderDetail.actions}
          size="small"
          data-testid="order-order-actions"
          scroll={{ y: 300 }}
        />
      )}
    </Space>
  );
};

export default OrderActions;

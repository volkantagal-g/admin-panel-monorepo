import { Tooltip } from 'antd';

import moment from 'moment';

import { ROUTE } from '@app/routes';
import RedirectButton from '@shared/components/UI/RedirectButtonV2';
import permKey from '@shared/shared/permKey.json';

export const generateTableColumns = ({ pagination, canAccess, t }) => {
  return [
    {
      title: <b>#</b>,
      key: 'index',
      width: 50,
      render: (val, row, index) => {
        const { currentPage, rowsPerPage } = pagination;
        const firstIndex = (currentPage - 1) * rowsPerPage;
        return firstIndex + index + 1;
      },
    },
    {
      title: (
        <Tooltip title={t('activeOrdersCommon:SLOTTED_STATE_COLUMN_TOOLTIP')}>
          <b>{t('activeOrdersCommon:SLOTTED_STATE_SHORT')}</b>
        </Tooltip>
      ),
      dataIndex: 'isSlottedDelivery',
      key: 'isSlottedDelivery',
      align: 'left',
      width: 45,
      render: (isSlotted, record) => {
        const slottedDay = moment(record?.slottedDeliveryInfo?.start).format('MMM DD');
        const slottedStartTime = moment(record?.slottedDeliveryInfo?.start).format('HH:mm');
        const slottedEndTime = moment(record?.slottedDeliveryInfo?.end).format('HH:mm');

        const slottedTimeRange = `${slottedDay}, ${slottedStartTime}-${slottedEndTime}`;

        return isSlotted ? (
          <Tooltip title={slottedTimeRange}>
            <b>{t('activeOrdersCommon:SLOTTED_STATE_SHORT')}</b>
          </Tooltip>
        ) : '';
      },
    },
    {
      title: <b>{t('global:WAREHOUSE')}</b>,
      dataIndex: 'warehouse',
      key: 'warehouse',
      width: 155,
    },
    {
      title: <b>{t('global:WORKER_TYPES.COURIER')}</b>,
      dataIndex: 'courier',
      key: 'courier',
      width: 200,
    },
    {
      title: <b>{t('global:CLIENT')}</b>,
      dataIndex: 'client',
      key: 'client',
      width: 200,
    },
    {
      title: <b>{t('global:STATUS')}</b>,
      dataIndex: 'status',
      key: 'status',
      width: 200,
    },
    {
      title: <b>{t('global:ACTION')}</b>,
      align: 'right',
      width: 100,
      render: ({ _id: orderId, domainType }) => {
        if (!canAccess(permKey.PAGE_GETIR_MARKET_ORDER_DETAIL)) {
          return null;
        }
        const orderDetailPath = ROUTE.GETIR_MARKET_ORDER_DETAIL.path.replace(':orderId', orderId);
        const queryParamAddedLink = `${orderDetailPath}?domainType=${domainType}`;
        return (
          <RedirectButton
            to={queryParamAddedLink}
            text={t('global:DETAIL')}
            permKey={permKey.PAGE_GETIR_MARKET_ORDER_DETAIL}
            size="small"
            target="_blank"
          />
        );
      },
    },
  ];
};

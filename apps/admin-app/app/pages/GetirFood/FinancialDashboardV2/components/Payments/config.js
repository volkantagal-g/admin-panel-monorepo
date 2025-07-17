import moment from 'moment';
import { NavLink } from 'react-router-dom';

import { Button, Tooltip } from 'antd';

import { InfoCircleFilled } from '@ant-design/icons';

import { getLangKey } from '@shared/i18n';
import { currencyFormat } from '@shared/utils/localization';
import { getPaymentStatusColumn } from './PaybackStatusColumn';
import { encodeQueryParams } from '../../utils';
import { INITIAL_PAGINATION } from '../../constants';

export const tableColumns = (t, hasAccessDetailPage, infoIconClass) => [
  {
    title: <b>{t('PAYMENT_TABLE.DEFERRED_PAYMENT_DATE')}</b>,
    dataIndex: 'deferredPaymentDate',
    key: 'deferredPaymentDate',
    render: deferredPaymentDate => moment(deferredPaymentDate).format('DD/MM/YYYY'),
  },
  {
    title: <b>{t('PAYMENT_TABLE.RESTAURANT_COUNT')}</b>,
    dataIndex: 'restaurantCount',
    key: 'restaurantCount',
  },
  {
    title: <b>{t('PAYMENT_TABLE.PAYMENT_STATUS')}</b>,
    dataIndex: 'paymentStatus',
    key: 'paymentStatus',
    render: getPaymentStatusColumn,
  },
  {
    title: <b>{t('PAYMENT_TABLE.TOTAL_PAYMENT_AMOUNT')}</b>,
    dataIndex: 'totalPaymentAmount',
    key: 'totalPaymentAmount',
    render: (totalPaymentAmount, rowData) => {
      return (
        <>
          {currencyFormat().format(totalPaymentAmount)}
          {rowData?.paymentDateInfoText && (
          <Tooltip title={rowData?.paymentDateInfoText[getLangKey()]}>
            <InfoCircleFilled
              className={infoIconClass}
            />
          </Tooltip>
          )}
        </>
      );
    },
  },
  ...(hasAccessDetailPage
    ?
    [
      {
        dataIndex: 'detail',
        key: 'detail',
        align: 'center',
        render: (_, rowData) => {
          const location = {
            pathname: '/food/financialDashboardV2/detail',
            search: encodeQueryParams({
              deferredPaymentDate: moment(rowData.deferredPaymentDate).format('YYYY-MM-DD'),
              ...INITIAL_PAGINATION,
            }),
          };

          return (
            <NavLink
              to={location}
            >
              <Button size="small" type="primary">
                {t('PAYMENT_TABLE.DETAIL')}
              </Button>
            </NavLink>
          );
        },
      },
    ] : []),
];

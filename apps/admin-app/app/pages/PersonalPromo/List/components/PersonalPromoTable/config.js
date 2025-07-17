import moment from 'moment';

import { Button, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';

import { getSelectedCountryTimezone } from '@shared/redux/selectors/common';
import { DATE_DISPLAY_FORMAT, promoStatuses } from '@app/pages/Promo/constantValues';
import { getLangKey } from '@shared/i18n';
import { PromoStatus } from '@app/pages/Promo/types';

const timezone = getSelectedCountryTimezone.getData();

const tableColumns = ({ t, handleDisable }) => {
  return [
    {
      title: t('COLUMNS.TITLE'),
      dataIndex: 'title',
      width: '30%',
      render: title => {
        return <div>{title?.[getLangKey()]}</div>;
      },
    },
    {
      title: t('COLUMNS.CLIENT'),
      dataIndex: 'client',
      width: '10%',
    },
    {
      title: t('COLUMNS.USED_ORDER_COUNT'),
      dataIndex: 'usedOrderCount',
      width: '10%',
    },
    {
      title: t('COLUMNS.USED_AMOUNT'),
      dataIndex: 'usedTotalDiscountAmount',
      width: '10%',
      render: usedTotalDiscountAmount => {
        return <div>{usedTotalDiscountAmount}</div>;
      },
    },
    {
      title: t('COLUMNS.END_DATE'),
      dataIndex: 'validUntil',
      width: '10%',
      sorter: (a, b) => {
        return moment(a.validUntil).valueOf() - moment(b.validUntil).valueOf();
      },
      render: validUntil => {
        return (
          <div>
            {moment.utc(validUntil).tz(timezone).format(DATE_DISPLAY_FORMAT)}
          </div>
        );
      },
    },
    {
      title: t('COLUMNS.STATUS'),
      dataIndex: 'status',
      width: '10%',
      render: status => (
        <div>{promoStatuses[status]?.[getLangKey()]}</div>
      ),
    },
    {
      title: t('global:ACTION'),
      key: '_id',
      width: '140px',
      render: record => {
        const promoId = record?._id;
        const promoStauts = record?.status;
        return (
          <>
            <Button size="small" variant="contained" type="default" style={{ marginRight: 5 }}>
              <Link to={`/personalPromo/detail/${promoId}`} target="_blank">
                {t('global:DETAIL')}
              </Link>
            </Button>
            {promoStauts === PromoStatus.Active && (
              <Popconfirm
                title={t('CONFIRM.ARE_YOU_SURE_TO_DISABLE')}
                onConfirm={() => handleDisable(promoId)}
                okText={t('button:YES')}
              >
                <Button
                  size="small"
                  danger
                >
                  {t('global:DISABLE')}
                </Button>
              </Popconfirm>
            )}
          </>
        );
      },
    },
  ];
};

export default tableColumns;

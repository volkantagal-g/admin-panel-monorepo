import moment from 'moment';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

import { getLangKey } from '@shared/i18n';
import { DATE_DISPLAY_FORMAT, discountReasons, statusTypes } from '../constantValues';
import { getFormattedOrderCount } from './utils';
import { getSelectedCountryTimezone } from '@shared/redux/selectors/common';
import { PromoStatusTag } from '@app/pages/Promo/components/PromoStatusTag';
import { PromoTag } from '@app/pages/Promo/components/PromoTag';

const timezone = getSelectedCountryTimezone.getData();

export const tableColumns = t => ([
  {
    title: t('PROMO_LIST.PROMO_CODE'),
    dataIndex: 'promoCode',
    key: 'promoCode',
    width: '300px',
    render(_, record) {
      return <PromoTag promo={record} />;
    },
  },
  {
    title: t('USAGE'),
    key: 'usedOrderCount',
    width: '70px',
    sorter: (a, b) => {
      return a.usedOrderCount - b.usedOrderCount;
    },
    render: record => {
      return (<div>{getFormattedOrderCount(record)}</div>);
    },
  },
  {
    title: t('global:TITLE'),
    dataIndex: 'title',
    key: 'title',
    width: '220px',
    render: title => {
      return (<div>{title?.[getLangKey()]}</div>);
    },
  },
  {
    title: t('global:VALID_FROM'),
    dataIndex: 'validFrom',
    key: 'validFrom',
    width: '120px',
    sorter: (a, b) => {
      return moment(a.validFrom).valueOf() - moment(b.validFrom).valueOf();
    },
    render: validFrom => {
      return (<div>{moment.utc(validFrom).tz(timezone).format(DATE_DISPLAY_FORMAT)}</div>);
    },
  },
  {
    title: t('global:VALID_UNTIL'),
    dataIndex: 'validUntil',
    key: 'validUntil',
    width: '120px',
    sorter: (a, b) => {
      return moment(a.validUntil).valueOf() - moment(b.validUntil).valueOf();
    },
    render: validUntil => {
      return (<div>{moment.utc(validUntil).tz(timezone).format(DATE_DISPLAY_FORMAT)}</div>);
    },
  },
  {
    title: t('global:STATUS'),
    dataIndex: 'status',
    key: 'status',
    width: '120px',
    render: status => <PromoStatusTag status={status} />,
  },
  {
    title: t('global:PRIORITY'),
    dataIndex: 'priority',
    key: 'priority',
    sorter: (a, b) => a.priority - b.priority,
    width: '80px',
  },
  {
    title: t('global:AGGRESSION_LEVELS'),
    dataIndex: 'isAggressionStateNonAffected',
    key: 'isAggressionStateNonAffected',
    width: '120px',
    sorter: true,
    render: isAggressionStateNonAffected => {
      return (<div>{isAggressionStateNonAffected ? t('IS_AGGRESSION_STATE_NON_AFFECTED') : null}</div>);
    },
  },
  {
    title: t('global:DETAIL'),
    key: '_id',
    width: '140px',
    render: record => {
      const promoId = record?._id;
      return (
        <Button
          id={promoId}
          size="small"
          variant="contained"
          type="default"
        >
          <Link to={`/promo/detail/${promoId}`}>
            {t('global:DETAIL')}
          </Link>
        </Button>
      );
    },
  },
]);

export const getStatusTypesOptions = () => {
  return Object.entries(statusTypes).map(([key, value]) => {
    return {
      value: key.toString(),
      label: value[getLangKey()],
    };
  });
};

export const getDiscountReasonsOptions = () => {
  return Object.entries(discountReasons).map(([key, value]) => {
    return {
      value: key.toString(),
      label: value[getLangKey()],
    };
  });
};

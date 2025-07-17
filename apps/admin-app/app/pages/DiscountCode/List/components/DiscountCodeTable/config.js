import { Button } from 'antd';
import moment from 'moment';

import { getSelectedCountryTimezone } from '@shared/redux/selectors/common';
import { DATE_DISPLAY_FORMAT } from '@app/pages/Promo/constantValues';
import { getLangKey } from '@shared/i18n';

const timezone = getSelectedCountryTimezone.getData();

const discountCodeStatuses = {
  1: { en: 'Active', tr: 'Aktif' },
  2: { en: 'Used', tr: 'Kullanıldı' },
  3: { en: 'Expired', tr: 'Tarihi Geçti' },
};

const tableColumns = ({ t, OnUsedCountClick }) => {
  return [
    {
      title: t('COLUMNS.TITLE'),
      dataIndex: 'title',
      width: '10%',
    },
    {
      title: t('COLUMNS.DESCRIPTION'),
      dataIndex: 'description',
      width: '10%',
    },
    {
      title: t('COLUMNS.VALID_FROM'),
      dataIndex: 'validFrom',
      width: '10%',
      sorter: (a, b) => {
        return moment(a.validFrom).valueOf() - moment(b.validFrom).valueOf();
      },
      render: validFrom => {
        return (<div>{moment.utc(validFrom).tz(timezone).format(DATE_DISPLAY_FORMAT)}</div>);
      },
    },
    {
      title: t('COLUMNS.VALID_UNTIL'),
      dataIndex: 'validUntil',
      width: '10%',
      sorter: (a, b) => {
        return moment(a.validUntil).valueOf() - moment(b.validUntil).valueOf();
      },
      render: validUntil => {
        return (<div>{moment.utc(validUntil).tz(timezone).format(DATE_DISPLAY_FORMAT)}</div>);
      },
    },
    {
      title: t('COLUMNS.STATUS'),
      dataIndex: 'status',
      width: '10%',
      render: status => (
        <div>{ discountCodeStatuses[status]?.[getLangKey()] }</div>
      ),
    },
    {
      title: t('COLUMNS.USED_COUNT'),
      width: '10%',
      key: 'actions',
      render: record => {
        return (
          <Button
            size="small"
            onClick={() => OnUsedCountClick(record?.usages)}
          >
            {record?.usages?.length}
          </Button>
        );
      },
    },
  ];
};

export default tableColumns;

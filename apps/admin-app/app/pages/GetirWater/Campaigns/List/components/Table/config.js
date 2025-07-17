import _ from 'lodash';
import { Button, Tag } from 'antd';
import moment from 'moment-timezone';

import { getLangKey } from '@shared/i18n';
import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';

const dataFormat = 'DD MM YYYY, HH:mm:ss';

const getFieldByLanguage = (fieldTR, fieldEN) => {
  return getLangKey() === 'en' ? fieldEN : fieldTR;
};

const statusList = {
  1: {
    tr: 'Aktif',
    en: 'Active',
  },
  2: {
    tr: 'İnaktif',
    en: 'Inactive',
  },
};

export const tableColumns = (Can, t) => {
  return [
    {
      title: t('getirWaterCampaignsPage:COLUMNS.PROMO_CODE'),
      dataIndex: 'promoCode',
      key: 'promoCode',
      render: (promoCode, record) => <Tag color={record.color || '#000000'}>{promoCode}</Tag>,
      sorter: (a, b) => {
        return a.promoCode.localeCompare(b.promoCode, getLangKey());
      },
    },
    {
      title: t('getirWaterCampaignsPage:COLUMNS.TITLE'),
      dataIndex: getFieldByLanguage('titleTr', 'titleEn'),
      sorter: (a, b) => {
        const titleA = getFieldByLanguage(a.titleTr, a.titleEn);
        const titleB = getFieldByLanguage(b.titleTr, b.titleEn);
        return titleA.localeCompare(titleB, getLangKey());
      },
    },
    {
      title: t('getirWaterCampaignsPage:COLUMNS.VALID_FROM'),
      dataIndex: 'validFrom',
      render: validFrom => moment(validFrom).format(dataFormat),
      sorter: (a, b) => {
        return moment(a.validFrom).unix() - moment(b.validFrom).unix();
      },
    },
    {
      title: t('getirWaterCampaignsPage:COLUMNS.VALID_UNTIL'),
      dataIndex: 'validUntil',
      render: validUntil => moment(validUntil).format(dataFormat),
      sorter: (a, b) => {
        return moment(a.validUntil).unix() - moment(b.validUntil).unix();
      },
    },
    {
      title: t('getirWaterCampaignsPage:COLUMNS.STATUS'),
      dataIndex: 'status',
      render: status => statusList[status][getLangKey()],
      sorter: (a, b) => {
        return a.status - b.status;
      },
    },
    {
      title: t('getirWaterCampaignsPage:COLUMNS.TOTAL_USAGE_COUNT'),
      dataIndex: 'totalUsageCount',
      sorter: (a, b) => {
        return b.totalUsageCount - a.totalUsageCount;
      },
    },
    {
      title: t('getirWaterCampaignsPage:COLUMNS.PRIORITY'),
      dataIndex: 'priority',
      sorter: (a, b) => {
        return a.priority - b.priority;
      },
    },
    {
      title: t('global:ACTION'),
      align: 'right',
      width: 80,
      render: record => {
        const badgeId = _.get(record, 'id', '');
        const path = ROUTE.GETIR_WATER_CAMPAIGN_DETAIL.path.replace(':id', badgeId);

        return (
          <Can permKey={permKey.PAGE_GETIR_WATER_CAMPAIGN_DETAIL}>
            <Button type="default" size="small" href={path}>
              {t('global:DETAIL')}
            </Button>
          </Can>
        );
      },
    },
  ];
};

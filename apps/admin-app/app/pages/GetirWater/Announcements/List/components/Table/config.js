import { Button } from 'antd';
import moment from 'moment-timezone';
import _ from 'lodash';

import { getLangKey } from '@shared/i18n';

import { ROUTE } from '@app/routes';

const getFieldByLanguage = (fieldTR, fieldEN) => {
  return getLangKey() === 'en' ? fieldEN : fieldTR;
};

export const tableColumns = t => {
  return [
    {
      title: t('getirWaterAnnouncementsPage:COLUMNS.TITLE'),
      dataIndex: getFieldByLanguage('titleTr', 'titleEn'),
      width: 100,
      sorter: (a, b) => {
        const titleA = getFieldByLanguage(a.titleTr, a.titleEn);
        const titleB = getFieldByLanguage(b.titleTr, b.titleEn);
        return titleA.localeCompare(titleB, getLangKey());
      },
    },
    {
      title: t('getirWaterAnnouncementsPage:COLUMNS.VALID_FROM'),
      dataIndex: 'validFrom',
      width: 200,
      render: validFrom => moment(validFrom).format('DD MM YYYY, HH:mm:ss'),
      sorter: (a, b) => {
        return moment(a.validFrom).unix() - moment(b.validFrom).unix();
      },
    },
    {
      title: t('getirWaterAnnouncementsPage:COLUMNS.VALID_UNTIL'),
      dataIndex: 'validUntil',
      width: 200,
      render: validUntil => moment(validUntil).format('DD MM YYYY, HH:mm:ss'),
      sorter: (a, b) => {
        return moment(a.validUntil).unix() - moment(b.validUntil).unix();
      },
    },
    {
      title: t('getirWaterAnnouncementsPage:COLUMNS.STATUS'),
      dataIndex: 'status',
      width: 200,
      render: status => t(`'global:${status}`),
      sorter: (a, b) => {
        return b.status.localeCompare(a.status, getLangKey());
      },
    },
    {
      title: t('global:ACTION'),
      align: 'right',
      render: record => {
        const badgeId = _.get(record, 'id', '');
        const path = ROUTE.GETIR_WATER_ANNOUNCEMENT_DETAIL.path.replace(':id', badgeId);

        return (
          <Button type="default" size="small" href={path}>
            {t('global:DETAIL')}
          </Button>
        );
      },
    },
  ];
};

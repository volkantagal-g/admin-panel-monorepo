import moment from 'moment';

import { get } from 'lodash';

import { Button } from 'antd';

import { Link } from 'react-router-dom';

import { t } from '@shared/i18n';
import { ROUTE } from '@app/routes';
import { mapKpiNamesToTranslateKeys } from '../../../constant';

export const getTableColumns = hasAccessToDetailPage => {
  const columns = [
    {
      title: t('courierGamificationPage:LIST.TASK_TITLE'),
      dataIndex: 'title',
      key: 'title',
      width: '100px',
    },
    {
      title: t('courierGamificationPage:LIST.TASK_ID'),
      dataIndex: 'id',
      key: 'id',
      width: '100px',
    },
    {
      title: t('courierGamificationPage:LIST.TASK_DESCRIPTION'),
      dataIndex: 'description',
      key: 'description',
      width: '150px',
      render: description => {
        if (description.length > 100) {
          const truncatedDescription = `${description.substr(0, 100)}...`;
          return truncatedDescription;
        }
        return description;
      },
    },
    {
      title: t('courierGamificationPage:LIST.TASK_KPI'),
      dataIndex: 'kpiName',
      key: 'kpiName',
      width: '100px',
      render: kpiName => {
        if (kpiName === '') {
          return '-';
        }
        return t(`courierGamificationPage:SELECT_KPI_TYPE.${mapKpiNamesToTranslateKeys(kpiName)}`);
      },
    },
    {
      title: t('START_DATE'),
      dataIndex: 'startDateL',
      key: 'startDateL',
      width: '100px',
      render: startDateL => moment(startDateL).format('DD.MM.YYYY'),
    },
    {
      title: t('END_DATE'),
      dataIndex: 'endDate',
      key: 'endDate',
      width: '100px',
      render: endDate => {
        return moment(endDate).format('DD.MM.YYYY');
      },
    },
    {
      title: t('courierGamificationPage:LIST.COURIER_COUNT'),
      dataIndex: 'courierCount',
      key: 'courierCount',
      width: '50px',
    },
  ];

  if (hasAccessToDetailPage) {
    columns.push({
      title: t('ACTION'),
      width: 100,
      render: record => {
        const id = get(record, 'id', '');
        return (
          <div className="flex-row d-flex justify-content-start">
            <Button size="small" variant="contained" type="primary" className="mr-2">
              <Link to={`${ROUTE.COURIER_GAMIFICATION_TASK_SUMMARY.path.replace(':id', id)}`}>
                {t('courierGamificationPage:LIST.SUMMARY')}
              </Link>
            </Button>
            <Button size="small" variant="contained" type="primary">
              <Link to={`${ROUTE.COURIER_GAMIFICATION_TASK_DETAIL.path.replace(':id', id)}`}>
                {t('global:DETAIL')}
              </Link>
            </Button>
          </div>
        );
      },
    });
  }

  return columns;
};

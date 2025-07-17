import { Button, Typography } from 'antd';
import moment from 'moment';
import { find } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { ROUTE } from '@app/routes';
import { ALERT_TYPES } from '../../constants';

const { Text } = Typography;

export const generateColumns = ({ cities, dataTimeZone, t, resolveAlert }) => {
  const rules = [
    {
      title: t('CITY'),
      dataIndex: 'warehouseCityId',
      key: 'warehouseCityId',
      render: warehouseCityId => {
        if (warehouseCityId) {
          const city = find(cities, { _id: warehouseCityId });
          return (
            <Text>{city?.name[getLangKey()]}</Text>
          );
        }
        return '';
      },
    },
    {
      title: t('WAREHOUSE'),
      dataIndex: 'warehouseName',
      key: 'warehouseName',
      render: warehouseName => warehouseName,
    },
    {
      title: t('SLOT_DATE'),
      dataIndex: 'slotDate',
      key: 'slotDate',
      render: slotDate => slotDate,
    },
    {
      title: t('SLOT_START'),
      dataIndex: 'slotStart',
      key: 'slotStart',
      render: slotStart => moment.tz(slotStart, dataTimeZone).format('HH:mm'),
    },
    {
      title: t('SLOT_END'),
      dataIndex: 'slotEnd',
      key: 'slotEnd',
      render: slotEnd => moment.tz(slotEnd, dataTimeZone).format('HH:mm'),
    },
    {
      title: t('ALERT_DATE'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: createdAt => moment(createdAt).format('DD.MM.YYYY HH:mm:ss'),
    },
    {
      title: t('DURATION'),
      dataIndex: 'alertExtraProps',
      render: ({ lastActivityDiffStr }) => {
        return (
          <Text strong>{lastActivityDiffStr}</Text>
        );
      },
    },
    {
      title: t('ALERT_TYPE'),
      dataIndex: 'category',
      key: 'category',
      render: category => {
        const message = ALERT_TYPES.find(alert => alert.value === category);
        if (message) {
          return message[getLangKey()];
        }
        return '';
      },
    },
    {
      title: t('ALERT_COUNT'),
      dataIndex: 'count',
      key: 'count',
      render: count => count,
    },
    {
      title: '#',
      dataIndex: 'id',
      render: id => {
        return (
          <Button
            onClick={() => {
              resolveAlert(id);
            }}
            size="small"
          >
            {t('BUTTON_RESOLVE_ALERT')}
          </Button>
        );
      },
    },
    {
      title: '#',
      dataIndex: 'warehouseId',
      key: 'warehouseId',
      render: warehouseId => {
        const { path } = ROUTE.GL_RETURN_ALERT_DETAIL;
        const detailPageUrl = path.replace(':warehouseId', warehouseId);
        return (
          <Button
            key={warehouseId}
            type="default"
            size="small"
            variant="contained"
            target="_blank"
            href={`${detailPageUrl}`}
          >
            <Text>{t('global:DETAIL')}</Text>
          </Button>
        );
      },
    },
  ];
  return rules;
};

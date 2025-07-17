import { EditOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Button } from 'antd';

import { t } from '@shared/i18n';
import { formatDate } from '@shared/utils/dateHelper';

export const shippingFreqColumns = ({ disabled, editShippingFrequency, lang }) => {
  return [
    {
      title: t('warehousePage:FROM'),
      dataIndex: 'from',
      key: 'from',
      render: date => {
        return formatDate(date);
      },
    },
    {
      title: t('warehousePage:TO'),
      dataIndex: 'to',
      key: 'to',
      render: date => {
        return formatDate(date);
      },
    },
    {
      title: t('warehousePage:FREQUENCY_CODE'),
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: t('DESCRIPTION'),
      dataIndex: 'description',
      key: 'description',
      render: description => {
        return description[lang];
      },
    },
    {
      width: 150,
      render: (_, data) => {
        const isOngoing = moment(data.from) < moment();
        return disabled ? null : (
          <Button disabled={isOngoing} onClick={() => editShippingFrequency(data)} icon={<EditOutlined />} />
        );
      },
    },
  ];
};

export const transferPrepColumns = ({ disabled, editTransferPreparation }) => {
  return [
    {
      title: t('warehousePage:FROM'),
      dataIndex: 'from',
      key: 'from',
      render: date => {
        return formatDate(date);
      },
    },
    {
      title: t('warehousePage:TO'),
      dataIndex: 'to',
      key: 'to',
      render: date => {
        return formatDate(date);
      },
    },
    {
      title: t('warehousePage:PREPARATION_CODE'),
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: t('warehousePage:DURATION'),
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      width: 150,
      render: (_, data) => {
        const isOngoing = moment(data.from) < moment();
        return disabled ? null : (
          <Button disabled={isOngoing} onClick={() => editTransferPreparation(data)} icon={<EditOutlined />} />
        );
      },
    },
  ];
};

import moment from 'moment';

import { getLangKey } from '@shared/i18n';
import { REPORT_STATUS } from '../../../constants';

export const getColumns = (t, tablePagination) => {
  return [
    {
      title: <b>#</b>,
      dataIndex: '_id',
      width: 30,
      align: 'right',
      key: 'id',
      render: (text, record, index) => {
        const { currentPage, rowsPerPage } = tablePagination;
        return (currentPage - 1) * rowsPerPage + index + 1;
      },
    },
    {
      title: <b>{t('global:NAME_1')}</b>,
      dataIndex: 'name',
      key: 'name',
      render: name => name[getLangKey()],
    },
    {
      title: <b>{t('REPORT_TYPE')}</b>,
      dataIndex: 'reportType',
      key: 'reportType',
      render: rt => rt.name[getLangKey()],
    },
    {
      title: <b>{t('REQUESTED_AT')}</b>,
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      render: dateStr => moment(dateStr).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: <b>{t('global:STATUS')}</b>,
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: status => REPORT_STATUS?.[status]?.[getLangKey()] || '-',
    },
    {
      title: <b>URL</b>,
      dataIndex: 'url',
      key: 'url',
      width: 150,
      render: url => (url ? <a href={url}>{t('global:DOWNLOAD')}</a> : '-'),
    },
  ];
};

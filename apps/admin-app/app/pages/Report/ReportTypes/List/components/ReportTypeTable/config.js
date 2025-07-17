import { Link } from 'react-router-dom';
import { Button, Tag } from 'antd';

import { getLangKey } from '@shared/i18n';
import { ROUTE } from '@app/routes';

import ReportTag from '../../../../components/ReportTag';

export const getColumns = (t, canAccessDetail, pagination, classes) => {
  const columns = [
    {
      title: '#',
      key: 'index',
      align: 'right',
      width: 40,
      render: (val, row, index) => {
        const { currentPage, rowsPerPage } = pagination;
        const firstIndex = (currentPage - 1) * rowsPerPage;
        return firstIndex + index + 1;
      },
    },
    {
      title: <b>{t('global:NAME_1')}</b>,
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => {
        return a.name[getLangKey()].localeCompare(b.name[getLangKey()]);
      },
      defaultSortOrder: 'ascend',
      width: 200,
      render: name => name[getLangKey()],
    },
    {
      title: <b>{t('global:DESCRIPTION')}</b>,
      dataIndex: 'description',
      key: 'description',
      width: 300,
      render: description => description[getLangKey()],
    },
    {
      title: <b>{t('global:ACTIVE')}</b>,
      dataIndex: 'isActive',
      width: 120,
      align: 'center',
      key: 'isActive',
      render: isActive => {
        return (
          <Tag
            className={[classes.activenessTag, isActive ? classes.activeReportTag : classes.inactiveReportTag].join(' ')}
          >
            {isActive ? t('global:ACTIVE') : t('global:INACTIVE')}
          </Tag>
        );
      },
    },
    {
      title: <b>{t('TAGS')}</b>,
      dataIndex: 'reportTags',
      key: 'reportTags',
      render: tags => tags.map(tag => <ReportTag key={tag._id} reportTag={tag} withTooltip />),
    },
  ];

  if (canAccessDetail) {
    columns.push({
      title: <b>{t('global:DETAIL')}</b>,
      dataIndex: '_id',
      key: 'detail',
      align: 'center',
      width: 100,
      render: id => (
        <Link to={ROUTE.REPORT_TYPES_DETAIL.path.replace(':id', id)}>
          <Button>{t('global:DETAIL')}</Button>
        </Link>
      ),
    });
  }

  return columns;
};

import { Typography } from 'antd';
import { TFunction } from 'react-i18next';

import { getLangKey } from '@shared/i18n';
import { ROUTE } from '@app/routes';
import RedirectButtonV2 from '@shared/components/UI/RedirectButtonV2';

const { Text } = Typography;

const getReportTagDetailPath = (_id: MongoIDType) => {
  const reportTagDetailRoute = ROUTE.REPORT_TAGS_DETAIL.path;
  const reportTagDetailPath = reportTagDetailRoute.replace(':id', _id);
  return reportTagDetailPath;
};

const getReportTypeDetailPath = (_id: MongoIDType) => {
  const reportTypeDetailRoute = ROUTE.REPORT_TYPES_DETAIL.path;
  const reportTypeDetailPath = reportTypeDetailRoute.replace(':id', _id);
  return reportTypeDetailPath;
};

export const getTableColumns = (t: TFunction, canAccessReportTagDetail: boolean) => {
  const columns = [
    {
      title: <b>{t('global:NAME_1')}</b>,
      dataIndex: 'name',
      key: 'name',
      sorter: (a: ReportType, b: ReportType) => {
        return a.name[getLangKey()].localeCompare(b.name[getLangKey()]);
      },
      defaultSortOrder: 'ascend',
      render: (name: string, record: ReportType) => (
        <Text style={{ backgroundColor: record?.backgroundColor, color: record?.textColor, whiteSpace: 'pre-wrap' }}>
          {record?.name[getLangKey()] || t('EXAMPLE_NAME')}
        </Text>
      ),
    },
    {
      title: <b>{t('global:DESCRIPTION')}</b>,
      dataIndex: 'description',
      key: 'description',
      render: (description: MinLangObjectType) => description[getLangKey()],
    },
    ...(canAccessReportTagDetail ? [
      {
        title: <b>{t('global:DETAIL')}</b>,
        dataIndex: '_id',
        key: 'detail',
        align: 'center',
        width: 100,
        render: (id: MongoIDType) => RedirectButtonV2({
          to: getReportTagDetailPath(id),
          target: '_blank',
          text: t('global:DETAIL'),
          size: 'middle',
        }),
      },
    ] : []),
  ];
  return columns;
};

export const getExpandedRowColumns = (t: TFunction, canAccessReportTypeDetail: boolean) => {
  const columns = [
    {
      title: '#',
      key: 'index',
      width: 44,
      render: (val: string, row: ReportType, index: number) => {
        return index + 1;
      },
    },
    {
      title: <b>{t('global:NAME_1')}</b>,
      dataIndex: 'name',
      key: 'name',
      sorter: (a: ReportType, b: ReportType) => {
        return a.name[getLangKey()].localeCompare(b.name[getLangKey()]);
      },
      defaultSortOrder: 'ascend',
      width: 250,
      render: (name: MinLangObjectType) => name[getLangKey()],
    },
    {
      title: <b>{t('global:DESCRIPTION')}</b>,
      dataIndex: 'description',
      key: 'description',
      render: (description: MinLangObjectType) => description[getLangKey()],
      width: 300,
    },
    ...(canAccessReportTypeDetail ? [
      {
        title: <b>{t('global:DETAIL')}</b>,
        dataIndex: '_id',
        key: 'detail',
        align: 'center',
        width: 100,
        render: (id: MongoIDType) => RedirectButtonV2({
          to: getReportTypeDetailPath(id),
          target: '_blank',
          text: t('global:DETAIL'),
          size: 'middle',
        }),
      },
    ] : []),
  ];
  return columns;
};

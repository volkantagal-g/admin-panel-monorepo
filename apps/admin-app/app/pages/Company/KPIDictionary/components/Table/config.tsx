import { TFunction } from 'react-i18next';
import { Tag } from 'antd';

export const getTableColumns = ({
  t,
  langKey,
}: {
  t: TFunction,
  langKey: string,
}) => [
  {
    title: t('companyKPIDictionaryPage:CATEGORY'),
    dataIndex: 'categories',
    key: 'categories',
    width: 120,
    render: (categories: string[]) => (
      categories?.map((category => (
        <Tag className="m-1">{category}</Tag>
      )))
    ),
  },
  {
    title: t('companyKPIDictionaryPage:DOMAIN'),
    dataIndex: 'domains',
    key: 'domains',
    width: 110,
    render: (domains: string[]) => (
      domains?.map((domain => (
        <Tag className="m-1">{domain}</Tag>
      )))
    ),
  },
  {
    title: t('companyKPIDictionaryPage:KPI_NAME'),
    dataIndex: 'kpiName',
    key: 'kpiName',
    width: 150,
  },
  {
    title: t('companyKPIDictionaryPage:ACRONYM'),
    dataIndex: 'acronym',
    key: 'acronym',
    width: 130,
  },
  {
    title: t('companyKPIDictionaryPage:DESCRIPTION'),
    key: 'description',
    dataIndex: 'description',
    width: 290,
    render: (description: {[key: string]: string}) => (
      <span>
        {description?.[langKey]}
      </span>
    ),
  },
  {
    title: t('companyKPIDictionaryPage:CALCULATION'),
    dataIndex: 'calculation',
    key: 'calculation',
    width: 160,
  },
  {
    title: t('companyKPIDictionaryPage:DATA_SOURCE'),
    dataIndex: 'dataSource',
    key: 'dataSource',
    width: 130,
    render: ({
      link,
      name,
    }: any) => (
      link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" title={name}>
          {name}
        </a>
      ) : (
        <span>{name}</span>
      )
    ),
  },
  {
    title: t('companyKPIDictionaryPage:COLUMN_NAME_IN_CURRENT_SOURCE'),
    key: 'dataSourceColumnName',
    dataIndex: 'dataSource',
    width: 150,
    render: ({ columnNameInSource }: any) => (
      <span>
        {columnNameInSource}
      </span>
    ),
  },
];

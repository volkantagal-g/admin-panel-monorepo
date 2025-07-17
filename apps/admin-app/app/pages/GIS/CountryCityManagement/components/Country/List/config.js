import { Col, Row, Tag } from 'antd';

import { getLangKey } from '@shared/i18n';
import CountryEdit from '../Edit';
import CountryGeometry from '../Geometry';

export const tableColumns = t => [
  {
    title: t('ID'),
    dataIndex: 'id',
    key: 'id',
    width: 200,
  },
  {
    title: t('Name'),
    dataIndex: 'name',
    key: 'name',
    width: 150,
    render: name => (
      <span>{name[getLangKey()]}</span>
    ),
  },
  {
    title: t('Center'),
    dataIndex: 'center',
    key: 'center',
    render: center => (
      <span>{`${center.coordinates[0]}, ${center.coordinates[1]}`}</span>
    ),
  },
  {
    title: t('Code'),
    dataIndex: 'code',
    key: 'code',
    render: code => (
      <span>{`${code.alpha2} (${code.alpha3})`}</span>
    ),
  },
  {
    title: t('Currency'),
    dataIndex: 'currency',
    key: 'currency',
    render: currency => (
      <span>{`${currency.code.alpha} (${currency.symbol})`}</span>
    ),
  },
  {
    title: t('Dialing Code'),
    dataIndex: 'dialingCode',
    key: 'dialingCode',
    width: '90px',
  },
  {
    title: t('Timezones'),
    dataIndex: 'timezones',
    key: 'timezones',
    render: timezones => (
      <span>{timezones.map(tz => tz.timezone).join(', ')}</span>
    ),
  },
  {
    title: t('Flag'),
    dataIndex: 'flag',
    key: 'flag',
    width: '70px',
    render: flag => (
      <span role="img" aria-label="flag">{flag}</span>
    ),
  },
  {
    title: t('Default Language Code'),
    dataIndex: 'defaultLanguageCode',
    key: 'defaultLanguageCode',
  },
  {
    title: t('Language Sort Order'),
    dataIndex: 'languageSortOrder',
    key: 'languageSortOrder',
    render: languageSortOrder => (
      <span>{languageSortOrder.join(', ')}</span>
    ),
  },
  {
    title: t('Operational Domain Types'),
    dataIndex: 'operationalDomainTypes',
    key: 'operationalDomainTypes',
    render: operationalDomainTypes => (
      <span>{operationalDomainTypes?.join(', ')}</span>
    ),
  },
  {
    title: t('Operational'),
    dataIndex: 'operational',
    key: 'operational',
    render: operational => (
      <Tag color={operational ? 'green' : 'red'}>{operational ? t('Yes') : t('No')}</Tag>
    ),
  },
  {
    title: t('wasOperational'),
    dataIndex: 'wasOperational',
    key: 'wasOperational',
    render: wasOperational => (
      <Tag color={wasOperational ? 'green' : 'red'}>{wasOperational ? t('Yes') : t('No')}</Tag>
    ),
  },
  {
    title: t('Was Operational Domain Types'),
    dataIndex: 'wasOperationalDomainTypes',
    key: 'wasOperationalDomainTypes',
    render: wasOperationalDomainTypes => (
      <span>{wasOperationalDomainTypes?.join(', ')}</span>
    ),
  },
  {
    title: t('global:Edit'),
    key: 'action',
    width: '165px',
    render: (_, record) => (
      <Row justify="space-between">
        <Col span={12}>
          <CountryEdit record={record} />
        </Col>
        <Col span={12}>
          <CountryGeometry record={record} />
        </Col>
      </Row>
    ),
  },
];

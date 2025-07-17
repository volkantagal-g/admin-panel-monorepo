import { Row, Col } from 'antd';

import { getLangKey } from '@shared/i18n';
import CityEdit from '../Edit';
import CityGeometry from '../Geometry';

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
    title: t('Timezone'),
    dataIndex: 'timezone',
    key: 'timezone',
  },
  {
    title: t('Plate'),
    dataIndex: 'plate',
    key: 'plate',
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
    title: t('Was Operational Domain Types'),
    dataIndex: 'wasOperationalDomainTypes',
    key: 'wasOperationalDomainTypes',
    render: wasOperationalDomainTypes => (
      <span>{wasOperationalDomainTypes?.join(', ')}</span>
    ),
  },
  {
    title: t('EDIT'),
    key: 'action',
    width: '165px',
    render: (_, record) => (
      <Row justify="space-between">
        <Col span={12}>
          <CityEdit record={record} />
        </Col>
        <Col span={12}>
          <CityGeometry record={record} />
        </Col>
      </Row>
    ),
  },
];

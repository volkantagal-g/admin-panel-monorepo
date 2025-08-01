import { useTranslation } from 'react-i18next';

import { Col, Row, Table } from 'antd';

import { Alert, Modal } from '@shared/components/GUI';

const tableColumns = ['date', 'orderTarget', 'cpTarget', 'segment'].map(item => ({
  key: item,
  title: item,
  dataIndex: item,
}));

const dataSource = [
  {
    date: '2021-01-01',
    orderTarget: '100',
    cpTarget: '200',
    segment: '*',
  },
  {
    date: '2021-01-01',
    orderTarget: '200',
    cpTarget: '300',
    segment: 'Aggresive',
  },
  {
    date: '2021-01-02',
    orderTarget: '250',
    cpTarget: '350',
    segment: 'Aggresive',
  },
];

export function ExampleCSVModal({ open, setOpen }) {
  const { t } = useTranslation('marketAutoGrowthOperations');

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      title={t('EXAMPLE_CSV')}
      visible={open}
      onOk={handleClose}
      onCancel={handleClose}
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Alert type="warning" message={t('CSV_HELPER')} />
        </Col>
        <Col span={24}>
          <Table columns={tableColumns} dataSource={dataSource} />
        </Col>
      </Row>
    </Modal>
  );
}

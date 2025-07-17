import { useTranslation } from 'react-i18next';
import { Switch, Row, Modal } from 'antd';
import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';

import Card from '@shared/components/UI/AntCard';

function WarehouseTestStatus({ isTestWarehouse, updateWarehouseTestStatusRequest }) {
  const { t } = useTranslation(['warehousePage', 'global']);
  const [isActive, setIsActive] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    setIsActive(isTestWarehouse);
  }, [isTestWarehouse]);
  return (
    <Card bordered={false}>
      <Row justify="space-between">
        {t('TEST_WAREHOUSE')}
        <Switch
          unCheckedChildren={t('OFF')}
          checkedChildren={t('ON')}
          checked={isActive}
          onChange={testStatus => {
            if (testStatus) {
              setIsModalVisible(true);
              return;
            }
            setIsActive(testStatus);
            updateWarehouseTestStatusRequest(testStatus);
          }}
        />
      </Row>
      <Modal
        visible={isModalVisible}
        centered
        onCancel={() => setIsModalVisible(false)}
        onOk={() => {
          setIsActive(true);
          updateWarehouseTestStatusRequest(true);
          setIsModalVisible(false);
        }}
        okText={t('global:YES')}
      >
        {t('TEST_WAREHOUSE_WARNING')}
      </Modal>
    </Card>

  );
}

WarehouseTestStatus.propTypes = {
  isTestWarehouse: PropTypes.bool,
  updateWarehouseTestStatusRequest: PropTypes.func,
};
WarehouseTestStatus.defaultProps = {
  isTestWarehouse: false,
  updateWarehouseTestStatusRequest: () => {},
};

export default WarehouseTestStatus;

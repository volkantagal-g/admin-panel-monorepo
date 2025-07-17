import { useEffect, useState } from 'react';
import { Row, Col, Alert } from 'antd';
import { useTranslation } from 'react-i18next';

import { getDifferenceBetweenArrays } from './helper';

const RedirectWarehouseModal = props => {
  const { bundleProducts, existingBundleProducts } = props;
  const { t } = useTranslation('marketProductPageV2');
  const [isRedirectWarehouseModalVisible, setIsRedirectWarehouseModalVisible] = useState(false);

  const handleCancel = () => {
    setIsRedirectWarehouseModalVisible(false);
  };

  useEffect(() => {
    const diff = getDifferenceBetweenArrays({
      existingBundleProducts,
      bundleProducts,
    });
    setIsRedirectWarehouseModalVisible(diff);
  }, [bundleProducts, existingBundleProducts]);

  return isRedirectWarehouseModalVisible &&
    (
      <Row>
        <Col>
          <Alert message={t('BUNDLE_INFO.REDIRECT')} onClose={handleCancel} type="warning" closable showIcon />
        </Col>
      </Row>
    );
};

export default RedirectWarehouseModal;

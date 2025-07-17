import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Modal, Radio, Button } from 'antd';

import AntTextArea from '@shared/components/UI/AntTextArea';
import useStyles from '@app/pages/ArtisanOrder/Detail/components/actionsMenu/modals/addOrderExchangeStatus/styles';

const AddOrderExchangeStatus = () => {
  const classes = useStyles();
  const { t } = useTranslation('artisanOrderPage');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal
        title={t('ACTION.ADD_ORDER_EXCHANGE_STATUS')}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={closeModal}
        width={600}>
        <Col span={24}>
          <Row>
            <Col span={24}>
              <div className={classes.alertBg}>
                <span className={classes.alertTitle}>{t('MODAL.CANCEL_LOCALS_ORDER.ADD_ORDER_EXCHANGE_STATUS_ALERT_MESSAGE')}</span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Radio.Group>
                <Col span={24}>
                  <Radio>
                    (Sipariş Dökülmüş) Kurye, yeni siparişi restorandan yeniden alacak
                  </Radio>
                </Col>
                <Col span={24}>
                  <Radio>
                    (Sipariş Eksik/hatalı ve müşteri istiyor) Kurye, yeni siparişi restorandan yeniden alacak
                  </Radio>
                </Col>
                <Col span={24}>
                  <Radio>
                    (Sipariş Eksik/hatalı ve müşteri siparişi istemiyor) Kurye, siparişi restorana iade edecek
                  </Radio>
                </Col>
              </Radio.Group>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <b className={classes.title}>{t('MODAL.CANCEL_LOCALS_ORDER.NOTE')}</b>
            </Col>
            <Col span={24}>
              <AntTextArea />
            </Col>
          </Row>
        </Col>
      </Modal>
      <Button
        key="7"
        onClick={showModal}>
        {t('ACTION.ADD_ORDER_EXCHANGE_STATUS')}
      </Button>
    </>
  );
};

export default AddOrderExchangeStatus;

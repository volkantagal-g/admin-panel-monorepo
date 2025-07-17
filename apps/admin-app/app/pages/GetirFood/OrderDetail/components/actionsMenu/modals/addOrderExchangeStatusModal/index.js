import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Row, Col, Modal, Radio, Button, Space, Form } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash';

import { manipulateValuesAfterSubmit } from './formHelper';
import {
  orderChangeOptionsSelector,
  orderDetailSelector,
  addChangeReasonAtOrderSelector,
  updateChangeReasonAtOrderSelector,
  availableChangeTypesSelector,
} from '@app/pages/GetirFood/OrderDetail/redux/selectors';
import { Creators } from '@app/pages/GetirFood/OrderDetail/redux/actions';
import AntTextArea from '@shared/components/UI/AntTextArea';
import useStyles from '@app/pages/GetirFood/OrderDetail/components/actionsMenu/modals/addOrderExchangeStatusModal/styles';
import { isNullOrEmpty } from '@shared/utils/common';

const AddOrderExchangeStatusModal = ({ buttonTitle }) => {
  const classes = useStyles();
  const { t } = useTranslation('foodOrderPage');
  const dispatch = useDispatch();
  const orderChangeOptions = useSelector(orderChangeOptionsSelector.getData);
  const orderDetail = useSelector(orderDetailSelector.getData);
  const availableChangeTypes = useSelector(availableChangeTypesSelector.getData);
  const isAddOrderChangeStatusPending = useSelector(addChangeReasonAtOrderSelector.getIsPending);
  const isUpdateOrderChangeStatusPending = useSelector(updateChangeReasonAtOrderSelector.getIsPending);
  const customButtonTitle = !isNullOrEmpty(buttonTitle) ? buttonTitle : t('ACTION.ADD_ORDER_EXCHANGE_STATUS');
  const [form] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const { confirm } = Modal;

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showConfirm = values => {
    confirm({
      title: t('MODAL.CANCEL_FOOD_ORDER.CONFIRM_ORDER_EXCHANGE_STATUS_ALERT_MESSAGE'),
      icon: <ExclamationCircleOutlined />,
      onOk() {
        const body = manipulateValuesAfterSubmit({ values, availableChangeTypes });
        if (!isEmpty(availableChangeTypes)) {
          dispatch(Creators.updateChangeReasonAtOrderRequest({ body, foodOrderId: orderDetail._id }));
        }
        else {
          dispatch(Creators.addChangeReasonAtOrderRequest({ body, foodOrderId: orderDetail._id }));
        }
      },
      onCancel() { },
      afterClose() {
        handleCancel();
      },
    });
  };

  return (
    <>
      <Modal
        title={t('ACTION.ADD_ORDER_EXCHANGE_STATUS')}
        visible={isModalVisible}
        onCancel={handleCancel}
        width={600}
        footer={[
          <Button key="back" onClick={handleCancel}>
            {t('button:CANCEL')}
          </Button>,
          <Button
            key="submit"
            type="primary"
            form="add-food-order-exchange-modal"
            htmlType="submit"
            loading={isUpdateOrderChangeStatusPending || isAddOrderChangeStatusPending}
          >
            {t('button:SAVE')}
          </Button>,
        ]}
      >
        <Form
          form={form}
          id="add-food-order-exchange-modal"
          onFinish={showConfirm}
          requiredMark={false}
          layout="vertical"
        >
          <Row>
            <Col span={24}>
              <div className={classes.alertBg}>
                <span className={classes.alertTitle}>{t('MODAL.CANCEL_FOOD_ORDER.ADD_ORDER_EXCHANGE_STATUS_ALERT_MESSAGE')}</span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="changeTypeId"
                rules={[{ required: true, message: t('ERRORS.CANCEL_RESTAURANT') }]}
              >
                <Radio.Group>
                  <Space direction="vertical">
                    {
                      orderChangeOptions?.map(option => (
                        <Radio key={option.id} value={option.id}>({option.title}) {option.message}</Radio>
                      ))
                    }
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <b className={classes.title}>{t('MODAL.CANCEL_FOOD_ORDER.NOTE')}</b>
            </Col>
            <Col span={24}>
              <Form.Item
                name="note"
                message={t('ERRORS.CANCEL_RESTAURANT')}
                rules={[{ required: true, message: t('ERRORS.CANCEL_RESTAURANT') }]}
              >
                <AntTextArea
                  disabled={false}
                  autoComplete="off"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Button
        key="7"
        onClick={showModal}
        className={classes.buttonStyle}
      >
        {customButtonTitle}
      </Button>
    </>
  );
};

export default AddOrderExchangeStatusModal;

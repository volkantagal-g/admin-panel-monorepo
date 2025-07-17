import { Button, Col, Divider, Form, Modal, Radio, Row, Select } from 'antd';
import { useFormik } from 'formik';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';

import { useCallback, useEffect, useState } from 'react';

import { LoadingOutlined } from '@ant-design/icons';

import { useParams } from 'react-router-dom';

import AntTextArea from '@shared/components/UI/AntTextArea';
import { financeOrderDetailSelector } from '@app/pages/FinanceOrder/detail/redux/selectors';
import { getUser } from '@shared/redux/selectors/auth';
import { Creators } from '../../../../redux/actions';
import { initialValues, validationSchema } from './formHelper';
import useStyles from './styles';

export const financeOrderCancelReasonSource = {
  OTHER: 'OTHER',
  COURIER: 'COURIER',
  CUSTOMER: 'CUSTOMER',
  PICKER: 'PICKER',
};

const CancelOrderModal = ({ visible, onClose }) => {
  let formik;
  const classes = useStyles();
  const { t } = useTranslation('financeOrderDetailPage');
  const dispatch = useDispatch();
  const user = getUser();
  const { orderId } = useParams();
  const { Option } = Select;

  const isCancelReasonsPending = useSelector(financeOrderDetailSelector.getIsCancelReasonsPending);
  const cancelReasons = useSelector(financeOrderDetailSelector.getCancelReasons);
  const isCancelPending = useSelector(financeOrderDetailSelector.getIsCancelPending);

  const [cancelType, setCancelType] = useState(financeOrderCancelReasonSource.COURIER);

  const [form] = Form.useForm();

  const resetForm = useCallback(() => {
    formik.resetForm();
    form.resetFields();
  }, [form, formik]);

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  formik = useFormik({
    enableReinitialize: true,
    validationSchema,
    initialValues,
    onSubmit: values => {
      dispatch(Creators.cancelFinanceOrderRequest({
        orderId,
        data: {
          ...values,
          orderId,
          agentId: user._id,
          agentName: user.name,
        },
      }));
      return handleCancel();
    },
  });

  const { handleSubmit, values, setFieldValue, errors } = formik;

  const handleRadioGroupChange = event => {
    // to clear selection
    form.setFieldsValue({ reasonCode: null });
    setFieldValue('reasonCode', null);
    setCancelType(event.target.value);
  };

  const handleTextAreaChange = event => {
    const value = _.get(event, 'target.value', '');
    setFieldValue('description', value);
  };

  const handleSelectChange = code => setFieldValue('reasonCode', code);

  useEffect(() => {
    if (visible) dispatch(Creators.getFinanceOrderCancelReasonsRequest());

    return () => {
      if (!visible) resetForm();
    };
  }, [dispatch, resetForm, visible]);

  return (
    <Modal
      title={t('ACTION.CANCEL_LOCALS_ORDER')}
      visible={visible}
      onOk={onClose}
      onCancel={onClose}
      width={600}
      forceRender
      footer={[
        <Button key="back" onClick={handleCancel} disabled={isCancelPending}>
          {t('button:CANCEL')}
        </Button>,
        <Button
          key="submit"
          type="primary"
          form="cancel-shop-order-modal"
          htmlType="submit"
          loading={isCancelPending}
        >
          {t('button:SAVE')}
        </Button>,
      ]}
    >
      {
        isCancelReasonsPending ? (
          <div className={classes.loader}>
            <LoadingOutlined spin className="mr-4" />
          </div>
        ) : (
          <Form
            form={form}
            id="cancel-shop-order-modal"
            onFinish={handleSubmit}
            layout="vertical"
          >
            <Row>
              <Col span={24}>
                <b className={classes.title}>{t('MODAL.CANCEL_LOCALS_ORDER.CANCEL_REASON_SOURCE')}</b>
              </Col>
              <Col span={24}>
                <Radio.Group
                  value={cancelType}
                  onChange={handleRadioGroupChange}
                >
                  <Row>
                    <Col>
                      <Radio value={financeOrderCancelReasonSource.COURIER}>
                        {t('MODAL.CANCEL_LOCALS_ORDER.COURIER')}
                      </Radio>
                    </Col>
                    <Col>
                      <Radio value={financeOrderCancelReasonSource.PICKER}>
                        {t('MODAL.CANCEL_LOCALS_ORDER.PICKER')}
                      </Radio>
                    </Col>
                  </Row>
                </Radio.Group>
              </Col>
              <Divider />
              <Col span={24}>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      help={_.get(errors, 'reasonCode')}
                      validateStatus={_.get(errors, 'reasonCode') ? 'error' : 'success'}
                      name="reasonCode"
                      label={t('MODAL.CANCEL_LOCALS_ORDER.CANCEL_REASON')}
                    >
                      <Select
                        onChange={handleSelectChange}
                      >
                        {
                          cancelReasons && cancelReasons.filter(r => r.reasonGroup === cancelType)
                            .map(o => <Option key={o.code} value={o.code}>{t(`CANCEL_REASONS.CODE_${o.code}`)}</Option>)
                        }
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Divider />
              <Col span={24}>
                <Row>
                  <Col span={24}>
                    <b className={classes.title}>{t('MODAL.CANCEL_LOCALS_ORDER.NOTE')}</b>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      help={_.get(errors, 'description')}
                      validateStatus={_.get(errors, 'description') ? 'error' : 'success'}
                      name={['description']}
                    >
                      <AntTextArea
                        value={values.cancelNote}
                        onChange={handleTextAreaChange}
                        disabled={false}
                        autoComplete="off"
                        maxLength={255}
                        showCount
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        )
      }
    </Modal>
  );
};

export { CancelOrderModal };

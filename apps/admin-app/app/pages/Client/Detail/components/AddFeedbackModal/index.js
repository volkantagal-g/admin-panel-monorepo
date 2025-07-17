import { useEffect, useState } from 'react';
import _ from 'lodash';

import { Button, Checkbox, Col, Divider, Form, Modal, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

import AntTextArea from '@shared/components/UI/AntTextArea';
import AntInputNumber from '@shared/components/UI/AntInputNumber';
import MultiLanguageInput from '@shared/components/UI/MultiLanguage/Input';
import { clientFeedbackTypes, feedbackSourceTypes } from '@shared/shared/constantValues';
import { convertConstantValuesToSelectOptions, currency } from '@shared/utils/common';
import { FEEDBACK_STATUSES, FEEDBACK_TYPES } from '@shared/shared/constants';
import permKey from '@shared/shared/permKey.json';
import { validate } from '@shared/yup';
import { Creators } from '../../redux/actions';
import { getClientDiscountWarnConfigSelector } from '../../redux/selectors';
import { multiLangTitles, multiPromoContentUrls } from './utils';
import { validationSchema } from './formHelper';
import useStyles from './styles';
import { CLIENT_DEFAULT_DISCOUNT_AMOUNT } from '../../constants';
import DiscountInput from '@app/pages/MarketOrder/OrderDetail/components/AgentActions/components/DiscountInput';
import { usePermission } from '@shared/hooks';

const AddFeedbackModal = ({
  isModalVisible,
  setIsModalVisible,
  clientId,
}) => {
  const classes = useStyles();
  const { t } = useTranslation('clientDetail');
  const dispatch = useDispatch();
  const { canAccess } = usePermission();
  const [form] = Form.useForm();
  const convertedFeedbackSourceTypes = convertConstantValuesToSelectOptions(feedbackSourceTypes);
  const convertedClientFeedbackTypes = convertConstantValuesToSelectOptions(clientFeedbackTypes);
  const localCurrency = currency();
  const [feedbackData, setFeedbackData] = useState({
    source: undefined,
    feedback: undefined,
  });
  const clientAllDiscountWarnAmounts = useSelector(getClientDiscountWarnConfigSelector.getData);
  const clientDiscountWarnAmount = clientAllDiscountWarnAmounts?.customValue?.[localCurrency] || clientAllDiscountWarnAmounts?.value;
  const formik = useFormik({
    initialValues: {
      note: undefined,
      hasDiscount: undefined,
      discountAmount: 10,
      validDayAmount: 180,
      title: multiLangTitles(localCurrency, 10),
      isBalanceEnabled: true,
      deliveryFee: {
        amount: undefined,
        doNotCharge: false,
      },
      doNotApplyMinimumBasketSize: true,
      promoContentURL: multiPromoContentUrls(),
    },
    validate: validate(validationSchema),
    onSubmit: values => {
      dispatch(Creators.createClientFeedbackRequest({
        data: {
          ...values,
          status: FEEDBACK_STATUSES.ACTIVE,
          type: FEEDBACK_TYPES.CLIENT,
          source: feedbackData.source,
          feedback: feedbackData.feedback,
          client: clientId,
        },
      }));
      handleCancel(); // eslint-disable-line no-use-before-define
    },
  });

  const { handleSubmit, values, setFieldValue } = formik;

  const handleCancel = () => {
    setFeedbackData({
      source: undefined,
      feedback: undefined,
    });
    formik.resetForm();
    form.resetFields();
    setIsModalVisible(false);
  };

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  useEffect(() => {
    if (canAccess(permKey.PAGE_CLIENT_DETAIL_CUSTOMER_SERVICE_AGENT_ACTIONS)) {
      dispatch(Creators.getClientDiscountWarnConfigRequest());
    }
  }, [dispatch, canAccess]);

  return (
    <Modal
      title={t('FEEDBACKS.MODAL.ADD_CLIENT_FEEDBACK')}
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={[
        <Button key="CLIENT_DETAIL_ADD_FEEDBACK_MODAL_FOOTER_ACTION_BUTTON_BACK" onClick={handleCancel}>
          {t('button:CANCEL')}
        </Button>,
        <Button
          key="CLIENT_DETAIL_ADD_FEEDBACK_MODAL_FOOTER_ACTION_BUTTON_SUBMIT"
          type="primary"
          form="add-client-feedback"
          htmlType="submit"
          disabled={!feedbackData.feedback || !feedbackData.source}
        >
          {t('button:SAVE')}
        </Button>,
      ]}
    >
      <Form
        className={classes.resetFormItemMargin}
        form={form}
        id="add-client-feedback"
        onFinish={handleSubmit}
        colon={false}
        labelCol={{ span: 10 }}
        labelAlign="left"
      >
        <Row gutter={[16, 16]}>
          {
            convertedFeedbackSourceTypes.map(source => (
              <Col xs={8} key={Math.random()}>
                <Button
                  className={[classes.sourceBtn, feedbackData.source === source.value ? classes.btnGreen : '']}
                  onClick={() => setFeedbackData({ ...feedbackData, source: source.value })}
                >
                  {source.label}
                </Button>
              </Col>
            ))
          }
        </Row>
        {
          feedbackData.source && (
            <>
              <Divider />
              <Row gutter={[16, 16]}>
                {
                  convertedClientFeedbackTypes.map(feedback => (
                    <Col xs={6} key={Math.random()}>
                      <Button
                        className={[classes.feedbackBtn, feedbackData.feedback === feedback.value ? classes.btnGreen : '']}
                        onClick={() => setFeedbackData({ ...feedbackData, feedback: feedback.value })}
                      >
                        {feedback.label}
                      </Button>
                    </Col>
                  ))
                }
              </Row>
            </>
          )
        }
        {
          feedbackData.feedback && (
            <>
              <Divider />
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item
                    label={t('FEEDBACKS.MODAL.NOTE')}
                    name="note"
                  >
                    <AntTextArea
                      value={values.note}
                      onChange={event => {
                        const value = _.get(event, 'target.value', '');
                        setFieldValue('note', value);
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item
                    label={t('FEEDBACKS.MODAL.DISCOUNT')}
                    name="hasDiscount"
                  >
                    <Checkbox
                      checked={values.hasDiscount}
                      onChange={event => {
                        const hasDiscount = _.get(event, 'target.checked', false);
                        setFieldValue('hasDiscount', hasDiscount);
                      }}
                      autoComplete="off"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )
        }

        {
          values.hasDiscount && (

            <>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item
                    label={t('FEEDBACKS.MODAL.AMOUNT')}
                    name="discountAmount"
                  >
                    <DiscountInput
                      classes="w-100"
                      addonAfter={localCurrency}
                      handleInputChange={value => {
                        setFieldValue(
                          'discountAmount',
                          value,

                        );
                        setFieldValue('title', multiLangTitles(localCurrency, value));
                      }}
                      orderCurrency={localCurrency}
                      maxDiscountAmount={99999}
                      defaultAmount={CLIENT_DEFAULT_DISCOUNT_AMOUNT}
                      discountAmount={form.getFieldValue('discountAmount')}
                      discountWarnAmount={clientDiscountWarnAmount}
                    />

                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item
                    label={t('FEEDBACKS.MODAL.EXPIRE')}
                    name="validDayAmount"
                  >
                    <AntInputNumber
                      className="w-100"
                      addonAfter={t('global:DAY')}
                      min={0}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <MultiLanguageInput
                    label={t('FEEDBACKS.MODAL.TITLE')}
                    fieldPath={['title']}
                    formik={formik}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item
                    label={t('FEEDBACKS.MODAL.PARTIAL')}
                    name="isBalanceEnabled"
                  >
                    <Checkbox
                      checked={values.isBalanceEnabled}
                      onChange={event => {
                        const isBalanceEnabled = _.get(event, 'target.checked', false);
                        setFieldValue('isBalanceEnabled', isBalanceEnabled);
                      }}
                      autoComplete="off"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item
                    label={t('FEEDBACKS.MODAL.DO_NOT_CHARGE_DELIVERY_FEE')}
                    name="deliveryFee.doNotCharge"
                  >
                    <Checkbox
                      checked={values.deliveryFee.doNotCharge}
                      onChange={event => {
                        const doNotChargeDeliveryFee = _.get(event, 'target.checked', false);
                        setFieldValue('deliveryFee.amount', undefined);
                        setFieldValue('deliveryFee.doNotCharge', doNotChargeDeliveryFee);
                      }}
                      autoComplete="off"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item
                    label={t('FEEDBACKS.MODAL.DELIVERY_FEE')}
                    name="deliveryFee.amount"
                  >
                    <AntInputNumber
                      className="w-100"
                      min={0}
                      onChange={deliveryFee => {
                        setFieldValue('deliveryFee.amount', deliveryFee);
                      }}
                      disabled={values.deliveryFee.doNotCharge}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item
                    label={t('FEEDBACKS.MODAL.DO_NOT_APPLY_MINIMUM_BASKET_SIZE')}
                    name="doNotApplyMinimumBasketSize"
                  >
                    <Checkbox
                      checked={values.doNotApplyMinimumBasketSize}
                      onChange={event => {
                        const doNotApplyMinimumBasketSize = _.get(event, 'target.checked', false);
                        setFieldValue('doNotApplyMinimumBasketSize', doNotApplyMinimumBasketSize);
                      }}
                      autoComplete="off"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )
        }
      </Form>
    </Modal>
  );
};

export default AddFeedbackModal;

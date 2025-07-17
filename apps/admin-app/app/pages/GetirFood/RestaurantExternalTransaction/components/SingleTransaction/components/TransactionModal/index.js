import { useSelector, useDispatch } from 'react-redux';
import { InputNumber, Input, Form, Modal, Select, Button, Radio } from 'antd';
import { useState, useEffect } from 'react';

import { Trans, useTranslation } from 'react-i18next';

import { CopyOutlined } from '@ant-design/icons';

import moment from 'moment';

import { convertConstantValuesToSelectOptions, currency, isObjectIdValid } from '@shared/utils/common';
import SelectRestaurant from '@shared/containers/Select/Restaurant';
import { CopyToClipboard } from '@shared/components/UI/CopyToClipboard';

import { Creators } from '@app/pages/GetirFood/RestaurantExternalTransaction/redux/actions';
import {
  createRestaurantExternalTransaction,
  getDeferredPaymentDateOptions,
  getOrderFinancialsByOrderId as getOrderFinancialsByOrderIdSelector,
  getRestaurantById,
} from '@app/pages/GetirFood/RestaurantExternalTransaction/redux/selectors';
import { MANUAL_CATEGORY_OPTIONS, NOTE_MIN_ROWS, NOTE_MAX_LENGTH, MIN_AMOUNT, formItemLayout, noteItemWrapperCol } from './constants';
import { objectIdValidatorRule } from './utils';
import useStyles from './styles';

const TransactionModal = ({ title, confirmationModalTitle, getConfirmationModalContent, isModalVisible, closeModal, manualType }) => {
  const { t } = useTranslation('foodRestaurantExternalTransaction');
  const dispatch = useDispatch();
  const classes = useStyles();
  const [form] = Form.useForm();
  const [clipboardValue, setClipboardValue] = useState(null);

  const isPendingCreateTransaction = useSelector(createRestaurantExternalTransaction.getIsPending);
  const orderFinancialsData = useSelector(getOrderFinancialsByOrderIdSelector.getData);
  const isPendingGetOrderFinancialsByOrderId = useSelector(getOrderFinancialsByOrderIdSelector.getIsPending);

  const restaurantDataFromState = useSelector(getRestaurantById.getData);
  const isRestaurantFetchPending = useSelector(getRestaurantById.getIsPending);
  const restaurantFetchError = useSelector(getRestaurantById.getError);

  const deferredPaymentDateOptions = useSelector(getDeferredPaymentDateOptions.getData);
  const isDeferredPaymentDateOptionsFetchPending = useSelector(getDeferredPaymentDateOptions.getIsPending);

  const handleCloseModal = () => {
    form.resetFields();
    setClipboardValue(null);
    dispatch(Creators.destroyOrderFinancialsByOrderIdData());
    dispatch(Creators.destroyDeferredPaymentDateOptions());
    closeModal();
  };

  const handleSubmit = ({ orderId, shopId, ...values }) => {
    const params = {
      ...values,
      shopId: shopId?.value,
      manualType,
      ...(orderId && { orderId }),
    };
    dispatch(Creators.createExternalTransactionRequest({ params }));
    handleCloseModal();
  };

  const handleConfirmSubmit = values => {
    Modal.confirm({
      title: confirmationModalTitle,
      content: getConfirmationModalContent({
        restaurantName: values.shopId.label,
        currency: currency(),
        amount: values.supplierNetRevenue,
        ...(values.selectedDeferredPaymentDate && { paymentDate: moment(values.selectedDeferredPaymentDate).format('DD.MM.YYYY') }),
      }),
      icon: null,
      okText: t('CONFIRM'),
      cancelText: t('CANCEL'),
      onOk: () => handleSubmit(values),
      centered: true,
    });
  };

  const handleChangeOrderId = ({ target: { value } }) => {
    if (value && isObjectIdValid(value)) {
      dispatch(Creators.getOrderFinancialsByOrderIdRequest({ orderId: value }));
    }

    if (!isObjectIdValid(value) && orderFinancialsData && typeof orderFinancialsData === 'object' && Object.keys(orderFinancialsData).length !== 0) {
      dispatch(Creators.destroyOrderFinancialsByOrderIdData());
    }

    form.setFieldsValue({ orderId: value });
  };

  const handleShopIdInputChange = ({ target: { value } }) => {
    if (value && isObjectIdValid(value)) {
      dispatch(Creators.getDeferredPaymentDateOptionsRequest({ partnerId: value }));
      dispatch(Creators.getRestaurantByIdRequest({ restaurantId: value }));
      form.setFieldsValue({ shopId: { value, label: t('global:LOADING_TIP') }, orderId: null });
      dispatch(Creators.destroyOrderFinancialsByOrderIdData());
      setClipboardValue(value);
    }
    else {
      dispatch(Creators.destroyDeferredPaymentDateOptions());
    }
  };

  const handleShopIdSelectChange = selectedOption => {
    if (selectedOption?.value) {
      dispatch(Creators.getDeferredPaymentDateOptionsRequest({ partnerId: selectedOption?.value }));
      form.setFieldsValue({ shopId: selectedOption, orderId: null });
      dispatch(Creators.destroyOrderFinancialsByOrderIdData());
      setClipboardValue(selectedOption?.value);
    }
    else {
      form.setFieldsValue({ shopId: null, orderId: null });
      dispatch(Creators.destroyDeferredPaymentDateOptions());
      setClipboardValue(null);
      form.validateFields([['shopId', 'value']]);
    }
  };

  useEffect(() => {
    const currentShopId = form.getFieldValue(['shopId', 'value']);
    if (
      restaurantDataFromState &&
      currentShopId
    ) {
      form.setFieldsValue({ shopId: { value: restaurantDataFromState?.id, label: restaurantDataFromState?.name } });
    }

    if (restaurantFetchError) {
      form.setFieldsValue({ shopId: null });
    }
  }, [restaurantDataFromState, restaurantFetchError, form]);

  const loading = isPendingCreateTransaction || isRestaurantFetchPending || isDeferredPaymentDateOptionsFetchPending || isPendingGetOrderFinancialsByOrderId;

  return (
    <Modal title={title} centered visible={isModalVisible} footer={null} onCancel={handleCloseModal}>
      <Form form={form} onFinish={handleConfirmSubmit} {...formItemLayout} colon={false} labelAlign="left" requiredMark={false}>
        <Form.Item
          name="shopId"
          label={t('global:RESTAURANT')}
          rules={[{ required: true }]}
        >
          <SelectRestaurant
            labelInValue
            allowIdSearch
            onChange={handleShopIdSelectChange}
            loading={loading}
            disabled={loading}
          />
        </Form.Item>
        <Form.Item
          name={['shopId', 'value']}
          label={t('SINGLE_TRANSACTION.FORM.RESTAURANT_ID')}
          dependencies={['shopId']}
          rules={[
            { required: true },
            objectIdValidatorRule,
          ]}
        >
          <Input
            onChange={handleShopIdInputChange}
            placeholder={t('SINGLE_TRANSACTION.FORM.RESTAURANT_ID')}
            disabled={loading}
            addonAfter={clipboardValue && (
              <CopyToClipboard message={clipboardValue} inner={<CopyOutlined className="pointer" />} />
            )}
          />
        </Form.Item>
        <Form.Item name="supplierNetRevenue" label={t('SINGLE_TRANSACTION.FORM.AMOUNT')} rules={[{ required: true }]}>
          <InputNumber min={MIN_AMOUNT} controls={false} formatter={value => `${currency()} ${value}`} disabled={loading} />
        </Form.Item>
        <Form.Item
          name="orderId"
          label={t('SINGLE_TRANSACTION.FORM.ORDER_ID')}
          rules={[objectIdValidatorRule]}
          extra={orderFinancialsData?.supplierNetRevenue && (
            <Trans
              t={t}
              i18nKey="SINGLE_TRANSACTION.FORM.ORDER_ID_EXTRA"
              values={{ revenue: orderFinancialsData?.supplierNetRevenue?.toFixed(2) }}
            />
          )}
        >
          <Input onChange={handleChangeOrderId} disabled={loading} />
        </Form.Item>
        <Form.Item name="category" label={t('SINGLE_TRANSACTION.FORM.CATEGORY')} rules={[{ required: true }]}>
          <Select options={convertConstantValuesToSelectOptions(MANUAL_CATEGORY_OPTIONS)} disabled={loading} />
        </Form.Item>
        <Form.Item
          name="noteToRestaurant"
          label={t('SINGLE_TRANSACTION.FORM.NOTE_TO_RESTAURANT')}
          rules={[{ required: true, max: NOTE_MAX_LENGTH }]}
          wrapperCol={noteItemWrapperCol}
        >
          <Input.TextArea showCount maxLength={NOTE_MAX_LENGTH} autoSize={{ minRows: NOTE_MIN_ROWS }} disabled={loading} />
        </Form.Item>

        {deferredPaymentDateOptions &&
          (
            <Form.Item name="selectedDeferredPaymentDate" label={t('SINGLE_TRANSACTION.FORM.PAYMENT_DATE')}>
              <Radio.Group className={classes.radioGroup} disabled={loading}>
                {deferredPaymentDateOptions?.map(option => (
                  <>
                    <Radio key={option.value} value={option.value}>{option?.label}</Radio>
                    <span className={classes.radioGroupInfoText}>{option?.infoText}</span>
                  </>
                ))}
              </Radio.Group>
            </Form.Item>
          )}

        <Form.Item wrapperCol={24} className={classes.submitButton}>
          <Button
            loading={loading}
            htmlType="submit"
            type="primary"
          >
            {t('global:CREATE')}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TransactionModal;

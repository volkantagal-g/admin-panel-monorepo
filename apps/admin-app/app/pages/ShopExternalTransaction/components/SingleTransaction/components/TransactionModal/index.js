import { useSelector, useDispatch } from 'react-redux';
import { InputNumber, Input, Form, Modal, Select, Button, Radio } from 'antd';
import { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import { CopyOutlined } from '@ant-design/icons';

import moment from 'moment';

import { convertConstantValuesToSelectOptions, currency, isObjectIdValid } from '@shared/utils/common';
import { CopyToClipboard } from '@shared/components/UI/CopyToClipboard';
import SelectLocalsMerchant from '@shared/containers/Select/LocalsMerchant';

import { Creators } from '@app/pages/ShopExternalTransaction/redux/actions';
import { createShopExternalTransaction, getShopById, getDeferredPaymentDateOptions } from '@app/pages/ShopExternalTransaction/redux/selectors';
import { NOTE_MIN_ROWS, NOTE_MAX_LENGTH, MIN_AMOUNT, formItemLayout, noteItemWrapperCol } from './constants';
import { objectIdValidatorRule } from './utils';
import useStyles from './styles';
import { MANUAL_CATEGORY_OPTIONS } from '@app/pages/GetirFood/RestaurantExternalTransaction/components/SingleTransaction/components/TransactionModal/constants';

const TransactionModal = ({ title, confirmationModalTitle, getConfirmationModalContent, isModalVisible, closeModal, manualType }) => {
  const { t } = useTranslation('localsShopExternalTransaction');
  const [clipboardValue, setClipboardValue] = useState(null);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [form] = Form.useForm();
  const isPending = useSelector(createShopExternalTransaction.getIsPending);

  const shopDataFromState = useSelector(getShopById.getData);
  const isShopFetchPending = useSelector(getShopById.getIsPending);
  const shopFetchError = useSelector(getShopById.getError);

  const deferredPaymentDateOptions = useSelector(getDeferredPaymentDateOptions.getData);
  const isDeferredPaymentDateOptionsFetchPending = useSelector(getDeferredPaymentDateOptions.getIsPending);

  const handleCloseModal = () => {
    form.resetFields();
    setClipboardValue(null);
    dispatch(Creators.destroyDeferredPaymentDateOptions());
    closeModal();
  };

  const handleSubmit = ({ orderId, shopId, ...values }) => {
    const body = {
      ...values,
      shopId: shopId?.value,
      manualType,
      ...(orderId && { orderId }),
    };
    dispatch(Creators.createExternalTransactionRequest({ body }));
    handleCloseModal();
  };

  const handleConfirmSubmit = values => {
    Modal.confirm({
      title: confirmationModalTitle,
      content: getConfirmationModalContent({
        shopName: values.shopId.label,
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

  const handleShopIdInputChange = ({ target: { value } }) => {
    if (value && isObjectIdValid(value)) {
      dispatch(Creators.getDeferredPaymentDateOptionsRequest({ partnerId: value }));
      dispatch(Creators.getShopByIdRequest({ shopId: value }));
      form.setFieldsValue({ shopId: { value, label: t('global:LOADING_TIP') }, orderId: null });
      setClipboardValue(value);
    }
    else {
      dispatch(Creators.destroyDeferredPaymentDateOptions());
    }
  };

  const handleShopIdSelectChange = (value, name) => {
    if (value) {
      dispatch(Creators.getDeferredPaymentDateOptionsRequest({ partnerId: value }));
      form.setFieldsValue({
        shopId: {
          value,
          label: name,
        },
        orderId: null,
      });
      setClipboardValue(value);
    }
    else {
      form.setFieldsValue({ shopId: null, orderId: null });
      dispatch(Creators.destroyDeferredPaymentDateOptions());
      setClipboardValue(null);
      form.validateFields([['shopId']]);
    }
  };

  useEffect(() => {
    const currentShopId = form.getFieldValue(['shopId', 'value']);
    if (
      shopDataFromState &&
      currentShopId
    ) {
      form.setFieldsValue({ shopId: { value: shopDataFromState?.id, label: shopDataFromState?.name } });
    }

    if (shopFetchError) {
      form.setFieldsValue({ shopId: null });
    }
  }, [shopDataFromState, shopFetchError, form]);

  const loading = isPending || isShopFetchPending || isDeferredPaymentDateOptionsFetchPending;

  return (
    <Modal title={title} centered visible={isModalVisible} footer={null} onCancel={handleCloseModal}>
      <Form form={form} onFinish={handleConfirmSubmit} {...formItemLayout} colon={false} labelAlign="left" requiredMark={false}>
        <Form.Item name="shopId" label={t('SHOP')} rules={[{ required: true }]}>
          <SelectLocalsMerchant
            allowIdSearch
            placeholder={t('SEARCH_PARTNER')}
            loading={loading}
            disabled={loading}
            onChange={handleShopIdSelectChange}
          />
        </Form.Item>
        <Form.Item
          label={t('SINGLE_TRANSACTION.FORM.SHOP_ID')}
          name={['shopId', 'value']}
          dependencies={['shopId']}
          rules={[
            { required: true },
            objectIdValidatorRule,
          ]}
        >
          <Input
            onChange={handleShopIdInputChange}
            placeholder={t('SINGLE_TRANSACTION.FORM.SHOP_ID')}
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
        >
          <Input disabled={loading} />
        </Form.Item>
        <Form.Item name="category" label={t('SINGLE_TRANSACTION.FORM.CATEGORY')} rules={[{ required: true }]}>
          <Select options={convertConstantValuesToSelectOptions(MANUAL_CATEGORY_OPTIONS)} disabled={loading} />
        </Form.Item>
        <Form.Item
          name="noteToShop"
          label={t('SINGLE_TRANSACTION.FORM.NOTE_TO_SHOP')}
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

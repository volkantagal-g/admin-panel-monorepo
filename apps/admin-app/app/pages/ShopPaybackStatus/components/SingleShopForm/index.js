import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { isEmpty } from 'lodash';
import { Form, Input, DatePicker, Button, Spin, Modal } from 'antd';
import { useTranslation } from 'react-i18next';

import { getLocalDateFormat } from '@shared/utils/localization';
import SelectLocalsMerchant from '@shared/containers/Select/LocalsMerchant';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

import { MARKETPLACE_API_DATE_FORMAT, REASON_AREA_MAX_CHAR_LIMIT, getDatePickerHelpMessage } from '@app/pages/ShopPaybackStatus/constants';
import { Creators } from '@app/pages/ShopPaybackStatus/redux/actions';
import { getShopCurrentPaybackStatus, updateShopPaybackStatus } from '@app/pages/ShopPaybackStatus/redux/selectors';
import useStyles from './styles';

const SingleShopForm = () => {
  const { t } = useTranslation('shopPaybackStatus');
  const classes = useStyles();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { Can } = usePermission();

  const isUpdateStatusPending = useSelector(updateShopPaybackStatus.getIsPending);
  const currentShopPaybackStatus = useSelector(getShopCurrentPaybackStatus.getData);
  const isCurrentStatusPending = useSelector(getShopCurrentPaybackStatus.getIsPending);

  const selectedShop = form.getFieldValue('shop');

  const handleShopChange = option => {
    form.setFieldsValue({
      shop: {
        value: option?.value,
        label: option?.label,
      },
    });
  };

  useEffect(() => {
    if (selectedShop?.value) {
      dispatch(Creators.getShopCurrentPaybackStatusRequest({ partnerId: selectedShop.value }));
    }
  }, [dispatch, selectedShop]);

  useEffect(() => {
    form.setFieldsValue({
      shopId: currentShopPaybackStatus?.partnerId,
      status: currentShopPaybackStatus?.status,
      pausedUntil: currentShopPaybackStatus?.pausedUntil ? moment(currentShopPaybackStatus?.pausedUntil) : undefined,
    });
  }, [form, currentShopPaybackStatus]);

  const handleSubmit = values => {
    dispatch(Creators.updateShopPaybackStatusRequest({
      partnerId: selectedShop.value,
      data: {
        reason: values.reason,
        pausedUntil: values.pausedUntil && moment(values.pausedUntil).format(MARKETPLACE_API_DATE_FORMAT),
      },
    }));
  };

  const handleConfirmSubmit = values => {
    Modal.confirm({
      title: t('CONFIRM_MODAL_TITLE'),
      content: currentShopPaybackStatus?.isPaused
        ? t('PAUSED_CONFIRM_CONTENT', { shop: selectedShop.label })
        : t('ACTIVE_CONFIRM_CONTENT', { shop: selectedShop.label }),
      icon: null,
      okText: t('global:CONFIRM'),
      cancelText: t('global:CANCEL'),
      onOk: () => handleSubmit(values),
      centered: true,
    });
  };

  const disabledDate = current => {
    return current && current < moment().endOf('day');
  };

  const renderForm = formInstance => {
    if (!selectedShop) return null;
    if (isCurrentStatusPending) return <div className={classes.spinContainer}><Spin /></div>;

    return (
      <>
        <Form.Item name="shopId" label={t('SHOP_ID')}>
          <Input disabled />
        </Form.Item>
        <Form.Item name="status" label={t('STATUS')}>
          <Input disabled />
        </Form.Item>
        <Form.Item
          help={!isEmpty(formInstance.getFieldError('pausedUntil'))
            ? null
            : getDatePickerHelpMessage(currentShopPaybackStatus?.isPaused, currentShopPaybackStatus?.pausedUntil)}
          name="pausedUntil"
          label={t('PAUSE_UNTIL')}
        >
          <DatePicker
            disabledDate={disabledDate}
            format={getLocalDateFormat()}
            disabled={currentShopPaybackStatus?.isPaused}
          />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} name="reason" label={t('REASON')}>
          <Input.TextArea showCount maxLength={REASON_AREA_MAX_CHAR_LIMIT} autoSize={{ minRows: 4 }} />
        </Form.Item>
        <Can permKey={permKey.PAGE_GL_SHOP_PAYBACK_STATUS_COMPONENT_UPDATE}>
          <Form.Item className={classes.submitButton}>
            <Button loading={isUpdateStatusPending} type="primary" htmlType="submit">
              {currentShopPaybackStatus?.buttonLabel}
            </Button>
          </Form.Item>
        </Can>
      </>
    );
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      labelAlign="left"
      onFinish={handleConfirmSubmit}
      colon={false}
      requiredMark={false}
    >
      {(_values, formInstance) => (
        <>
          <Form.Item name="shop" label={t('SHOP')}>
            <SelectLocalsMerchant
              placeholder={t('SHOP')}
              onChange={handleShopChange}
              labelInValue
            />
          </Form.Item>
          {renderForm(formInstance)}
        </>
      )}
    </Form>

  );
};

export default SingleShopForm;

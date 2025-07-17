import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { isEmpty } from 'lodash';
import { Form, Input, DatePicker, Button, Spin, Modal } from 'antd';
import { useTranslation } from 'react-i18next';

import { getLocalDateFormat } from '@shared/utils/localization';
import SelectRestaurant from '@shared/containers/Select/Restaurant';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

import { REASON_AREA_MAX_CHAR_LIMIT, getDatePickerHelpMessage } from '../../constants';
import { Creators } from '../../redux/actions';
import { getCurrentStatus, changePaybackStatus } from '../../redux/selectors';
import useStyles from './styles';

const SingleRestaurantForm = () => {
  const { t } = useTranslation('foodRestaurantPaybackStatus');
  const classes = useStyles();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { Can } = usePermission();

  const isChangeStatusPending = useSelector(changePaybackStatus.getIsPending);
  const currentStatus = useSelector(getCurrentStatus.getData);
  const isCurrentStatusPending = useSelector(getCurrentStatus.getIsPending);

  const [restaurant, setRestaurant] = useState();

  useEffect(() => {
    if (restaurant) {
      dispatch(Creators.getCurrentStatusRequest({ restaurantId: restaurant.value }));
    }
  }, [dispatch, restaurant]);

  useEffect(() => {
    form.setFieldsValue({
      restaurantId: currentStatus?.shopId,
      status: currentStatus?.status,
      pausedUntil: currentStatus?.pausedUntil ? moment(currentStatus?.pausedUntil) : undefined,
    });
  }, [form, currentStatus]);

  const handleSubmit = values => {
    const data = {
      restaurantId: values.restaurantId,
      reason: values.reason,
      pausedUntil: values.pausedUntil && moment(values.pausedUntil).format('YYYY-MM-DDTHH:mm:ss'),
    };
    dispatch(Creators.changePaybackStatusRequest({ data }));
  };

  const handleConfirmSubmit = values => {
    Modal.confirm({
      title: t('CONFIRM_MODAL_TITLE'),
      content: currentStatus?.isPaused
        ? t('foodRestaurantPaybackStatus:PAUSED_CONFIRM_CONTENT', { restaurant: values?.shopId?.label })
        : t('foodRestaurantPaybackStatus:ACTIVE_CONFIRM_CONTENT', { restaurant: values?.shopId?.label }),
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
    if (!restaurant) return null;
    if (isCurrentStatusPending) return <div className={classes.spinContainer}><Spin /></div>;

    return (
      <>
        <Form.Item name="restaurantId" label={t('RESTAURANT_ID')}>
          <Input disabled />
        </Form.Item>
        <Form.Item name="status" label={t('STATUS')}>
          <Input disabled />
        </Form.Item>
        <Form.Item
          help={!isEmpty(formInstance.getFieldError('pausedUntil')) ? null : getDatePickerHelpMessage(currentStatus?.isPaused, currentStatus?.pausedUntil)}
          name="pausedUntil"
          label={t('PAUSE_UNTIL')}
        >
          <DatePicker
            disabledDate={disabledDate}
            format={getLocalDateFormat()}
            disabled={currentStatus?.isPaused}
          />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} name="reason" label={t('REASON')}>
          <Input.TextArea showCount maxLength={REASON_AREA_MAX_CHAR_LIMIT} autoSize={{ minRows: 4 }} />
        </Form.Item>
        <Can permKey={permKey.PAGE_GETIR_FOOD_RESTAURANT_PAYBACK_STATUS_CHANGE}>
          <Form.Item className={classes.submitButton}>
            <Button loading={isChangeStatusPending} type="primary" htmlType="submit">
              {currentStatus?.buttonLabel}
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
          <Form.Item name="shopId" label={t('RESTAURANT')}>
            <SelectRestaurant value={restaurant} onChange={setRestaurant} labelInValue includeDeletedRestaurants />
          </Form.Item>
          {renderForm(formInstance)}
        </>
      )}
    </Form>

  );
};

export default SingleRestaurantForm;

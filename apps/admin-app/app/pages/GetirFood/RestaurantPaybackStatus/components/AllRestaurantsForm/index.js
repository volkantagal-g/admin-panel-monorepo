import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { isNil } from 'lodash';
import { Form, Input, DatePicker, Select, Button, Modal } from 'antd';
import { useTranslation } from 'react-i18next';

import { getLocalDateFormat } from '@shared/utils/localization';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';

import { REASON_AREA_MAX_CHAR_LIMIT, ACTION_TYPE_VALUES, ACTION_TYPES } from '../../constants';
import { Creators } from '../../redux/actions';
import { changeAllRestaurantsPaybackStatus } from '../../redux/selectors';
import useStyles from './styles';

const StatusForm = () => {
  const { t } = useTranslation('foodRestaurantPaybackStatus');
  const classes = useStyles();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { Can } = usePermission();

  const [actionType, setActionType] = useState();

  const isChangeAllRestaurantsStatusPending = useSelector(changeAllRestaurantsPaybackStatus.getIsPending);

  const handleSubmit = values => {
    const data = {
      status: actionType,
      reason: values.reason,
      pausedUntil: values.pausedUntil && moment(values.pausedUntil).format('YYYY-MM-DDTHH:mm:ss'),
    };
    dispatch(Creators.changeAllRestaurantsPaybackStatusRequest({ data }));
  };

  const handleConfirmSubmit = values => {
    Modal.confirm({
      title: t('CONFIRM_MODAL_TITLE'),
      content: actionType === ACTION_TYPES.PAUSE
        ? t('foodRestaurantPaybackStatus:ACTIVE_ALL_RESTAURANTS_CONFIRM_CONTENT')
        : t('foodRestaurantPaybackStatus:PAUSED_ALL_RESTAURANTS_CONFIRM_CONTENT'),
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

  const handleActionTypeChange = value => {
    setActionType(value);
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
      <Form.Item rules={[{ required: true }]} label={t('PAUSE_RESUME')}>
        <Select
          value={actionType}
          onChange={handleActionTypeChange}
          options={convertConstantValuesToSelectOptions(ACTION_TYPE_VALUES)}
        />
      </Form.Item>
      {!isNil(actionType) && (
        <>
          {actionType === ACTION_TYPES.PAUSE && (
          <Form.Item
            name="pausedUntil"
            label={t('PAUSE_UNTIL')}
          >
            <DatePicker
              disabledDate={disabledDate}
              format={getLocalDateFormat()}
            />
          </Form.Item>
          )}
          <Form.Item rules={[{ required: true }]} name="reason" label={t('REASON')}>
            <Input.TextArea showCount maxLength={REASON_AREA_MAX_CHAR_LIMIT} autoSize={{ minRows: 4 }} />
          </Form.Item>
          <Can permKey={permKey.PAGE_GETIR_FOOD_RESTAURANT_PAYBACK_STATUS_CHANGE}>
            <Form.Item className={classes.submitButton}>
              <Button loading={isChangeAllRestaurantsStatusPending} type="primary" htmlType="submit">
                {
                  actionType === ACTION_TYPES.PAUSE
                    ? t('foodRestaurantPaybackStatus:PAUSE')
                    : t('foodRestaurantPaybackStatus:RESUME')
                }
              </Button>
            </Form.Item>
          </Can>
        </>
      )}
    </Form>
  );
};

export default StatusForm;

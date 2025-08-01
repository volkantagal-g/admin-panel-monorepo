import { Modal, Form, Select, Button, InputNumber, message } from 'antd';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { uniqueId } from 'lodash';
import { useTranslation } from 'react-i18next';

import { Creators } from '@app/pages/MarketAutoGrowthOperations/redux/actions';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { rules } from '@app/pages/MarketAutoGrowthOperations/helpers';
import { GB_COUNTRY_CODE, UK_COUNTRY_CODE } from '@app/pages/MarketAutoGrowthOperations/constants';

const { Option } = Select;

const AddActionModal = ({
  selectedDomain,
  actionWarehouseList,
  dayTypes,
  hourTypes,
  actionPacketList,
  open,
  setOpen,
  setTriggerReason,
  highestAction,
  actionTableData,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('marketAutoGrowthOperations');
  const form = React.createRef();

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [currentAction, setCurrentAction] = useState(1);
  const [addErrorMessage, setAddErrorMessage] = useState(false);

  const country = getSelectedCountry();
  const countryCode = country.code.alpha2;

  const onFinish = value => {
    setConfirmLoading(true);
    const hasValue = actionTableData.some(element => value?.dayType === element.dayType &&
        value?.hourType === element.hourType &&
        currentAction.toString() === element.action &&
        value?.packet === element.packet &&
        value?.warehouseType === element.warehouseType);

    if (hasValue) {
      setAddErrorMessage(true);
      message.error({ content: t('ACTION_ALREADY_EXIST') });
    }
    else {
      const newData = {
        id: uniqueId(),
        countryCode: countryCode === GB_COUNTRY_CODE ? UK_COUNTRY_CODE : countryCode,
        domainType: selectedDomain,
        action: currentAction,
        packet: parseFloat(value?.packet),
        warehouseType: value?.warehouseType,
        dayType: value?.dayType,
        hourType: value?.hourType,
        is_updated: 1,
      };
      setAddErrorMessage(false);
      dispatch(Creators.addActionLine({ data: newData }));
      dispatch(Creators.setActionUpdateList({}));
      setTriggerReason('addActionLine');
      setOpen(false);
    }
  };

  const handleModalCancel = () => {
    setOpen(false);
  };

  return (
    <Modal
      title={t('NEW_ACTION')}
      visible={open}
      confirmLoading={confirmLoading}
      onCancel={handleModalCancel}
      footer={null}
      okButtonProps={{ disabled: addErrorMessage }}
    >
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        autoComplete="off"
        initialValues={{
          action: 1,
          packet: null,
          warehouseType: null,
          hourType: null,
          dayType: null,
        }}
        ref={form}
      >
        <Form.Item name="action" label={t('ACTION')} rules={rules.action}>
          <InputNumber defaultValue={1} min={1} max={highestAction ? highestAction + 1 : 1} onChange={value => setCurrentAction(value)} />
        </Form.Item>
        <Form.Item
          name="packet"
          label={t('PACKET')}
          rules={rules.packet}
        >
          <Select placeholder={t('SELECT_PACKET')}>
            {actionPacketList?.map(value => (
              <Option key={value} value={value} label={value}>{value}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="warehouseType"
          label={t('WAREHOUSE_TYPE')}
          rules={rules.warehouseType}
        >
          <Select placeholder={t('SELECT_WAREHOUSE_TYPE')}>
            {actionWarehouseList?.map(value => (
              <Option key={value} value={value} label={value}>{value}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="hourType"
          label={t('HOUR_TYPE')}
          rules={rules.hourType}
        >
          <Select placeholder={t('SELECT_HOUR_TYPE')}>
            {hourTypes?.map(value => (
              <Option key={value} value={value} label={value}>{value}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="dayType"
          label={t('DAY_TYPE')}
          rules={rules.dayType}
        >
          <Select placeholder={t('SELECT_DAY_TYPE')}>
            {dayTypes?.map(value => (
              <Option key={value} value={value} label={value}>{value}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {t('SUBMIT')}
          </Button>
          <Button type="secondary" onClick={() => form.current?.resetFields()}>
            {t('CLEAR')}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddActionModal;

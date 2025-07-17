import { Modal, Form, Select, Button, Input, InputNumber, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { uniqueId } from 'lodash';
import { useTranslation } from 'react-i18next';

import { Creators } from '@app/pages/MarketAutoGrowthOperations/redux/actions';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { autoGrowthSelector, promoSetSelector } from '@app/pages/MarketAutoGrowthOperations/redux/selectors';
import { rules } from '@app/pages/MarketAutoGrowthOperations/helpers';
import { CHANGE_REASON_TITLES, GB_COUNTRY_CODE, UK_COUNTRY_CODE } from '@app/pages/MarketAutoGrowthOperations/constants';

const { Option } = Select;

const AddBucketModal = ({ selectedDomain, selectedWarehouse, selectedPromo, open, setOpen, bucketGroups, selectedReason, setSelectedReason }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('marketAutoGrowthOperations');
  const form = React.createRef();

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const insertPromoLoading = useSelector(promoSetSelector.insertPromoLoading);
  const insertPromoSuccess = useSelector(promoSetSelector.insertPromoSuccess);

  const changeReasons = useSelector(autoGrowthSelector.changeReasons);
  const changeReasonsLoading = useSelector(autoGrowthSelector.changeReasonsLoading);

  const country = getSelectedCountry();
  const countryCode = country.code.alpha2;

  const onFinish = value => {
    setConfirmLoading(true);
    setDisabled(true);
    if (selectedReason || (changeReasons && changeReasons[CHANGE_REASON_TITLES.ADD_PROMO_GROUP]?.length === 1)) {
      const newData = {
        _id: uniqueId(),
        countryCode: countryCode === GB_COUNTRY_CODE ? UK_COUNTRY_CODE : countryCode,
        domainType: selectedDomain,
        warehouseType: selectedWarehouse,
        promoObjectiveType: selectedPromo,
        bucketType: value?.bucketType,
        set: 0,
        agg1: '',
        agg2: '',
        agg3: '',
        agg4: '',
        is_updated: 1,
      };
      const insertData = {
        countryCode,
        domainType: selectedDomain,
        warehouseType: selectedWarehouse,
        promoObjectiveType: selectedPromo,
        bucketType: value?.bucketType,
        packet: (value.aggressivePacketNumber)?.toString(),
        secondPacket: (value.saferPacketNumber)?.toString(),
        active: true,
      };
      dispatch(Creators.insertPackageConfigRequest({
        afterSuccess: newData,
        insertData,
        changeReason: changeReasons && changeReasons[CHANGE_REASON_TITLES.ADD_PROMO_GROUP]?.length === 1 ?
          changeReasons[CHANGE_REASON_TITLES.ADD_PROMO_GROUP][0] : selectedReason,
      }));
      setSelectedReason(null);
    }
    else message.error({ content: t('FAIL_PLEASE_CHECK') });
  };

  const handleModalCancel = () => {
    setOpen(false);
    setSelectedReason(null);
  };

  useEffect(() => {
    if (insertPromoLoading === false && insertPromoSuccess === true) {
      message.success({ content: t('SUCCESS') });
      setOpen(false);
      setDisabled(false);
    }
    if (insertPromoLoading === false && insertPromoSuccess === false) {
      message.error({ content: t('FAIL') });
      setOpen(false);
      setDisabled(false);
    }
  }, [insertPromoLoading, insertPromoSuccess, setOpen, t]);

  return (
    <Modal
      title={t('NEW_BUCKET_GROUP')}
      visible={open}
      confirmLoading={confirmLoading}
      onCancel={handleModalCancel}
      footer={null}
    >
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{
          saferPacketNumber: -1,
          aggressivePacketNumber: 1,
          bucketType: null,
        }}
        onFinish={onFinish}
        autoComplete="off"
        ref={form}
        disabled={disabled}
      >
        <Form.Item name="warehouseType" label={t('WAREHOUSE_TYPE')}>
          <Select value={selectedWarehouse} placeholder={selectedWarehouse} disabled />
        </Form.Item>
        <Form.Item name="promoType" label={t('PROMO_TYPE')}>
          <Select value={selectedPromo} placeholder={selectedPromo} disabled />
        </Form.Item>
        <Form.Item
          name="bucketType"
          label={t('BUCKET_TYPE')}
          rules={[
            { required: true, message: t('BUCKET_TYPE_REQUIRED'), validationTrigger: 'onBlur, onChange' },
            {
              validator: async (_, inputValue) => {
                const hasValue = Object.keys(bucketGroups)?.some(key => (key === inputValue));
                if (inputValue?.indexOf(' ') > -1) {
                  return Promise.reject(new Error(t('PROMOSET_ERROR_MESSAGES.BUCKET_NAME_CONTAIN_EMPTY')));
                }
                if (inputValue && hasValue) {
                  return Promise.reject(new Error(t('BUCKET_TYPE_ALREADY_EXIST')));
                }
                return true;
              },
              validationTrigger: 'onBlur, onChange',
            }]}
        >
          <Input defaultValue={null} placeholder={t('ENTER_BUCKET_TYPE')} />
        </Form.Item>
        <Form.Item
          name="aggressivePacketNumber"
          label={t('AGGRESSIVE_PACKET_NUMBER')}
          rules={rules.aggressivePacketNumber}
        >
          <InputNumber defaultValue={1} min={1} />
        </Form.Item>
        <Form.Item
          name="saferPacketNumber"
          label={t('SAFER_PACKET_NUMBER')}
          rules={rules.saferPacketNumber}
        >
          <InputNumber defaultValue={-1} max={-1} />
        </Form.Item>
        <Form.Item
          name="changeReason"
          label={t('CHANGE_REASON')}
        >
          <Select
            allowClear={false}
            showSearch
            onChange={value => setSelectedReason(value)}
            placeholder={(changeReasons && changeReasons[CHANGE_REASON_TITLES.ADD_PROMO_GROUP]?.length === 1) ?
              changeReasons[CHANGE_REASON_TITLES.ADD_PROMO_GROUP][0] : t('SELECT_CHANGE_REASON')}
            disabled={!changeReasons || (changeReasons && changeReasons[CHANGE_REASON_TITLES.ADD_PROMO_GROUP]?.length === 1)}
            loading={changeReasonsLoading}
          >
            {changeReasons && changeReasons[CHANGE_REASON_TITLES.ADD_PROMO_GROUP]?.length > 0 &&
            changeReasons[CHANGE_REASON_TITLES.ADD_PROMO_GROUP]?.map(value => (
              <Option key={value} value={value} label={value} />
            ))}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={insertPromoLoading === true}>
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

export default AddBucketModal;

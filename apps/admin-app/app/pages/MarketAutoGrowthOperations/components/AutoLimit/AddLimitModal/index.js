import { Modal, Form, Select, Button, InputNumber, TimePicker, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { uniqueId } from 'lodash';
import moment from 'moment';

import { Creators } from '@app/pages/MarketAutoGrowthOperations/redux/actions';
import {
  GB_COUNTRY_CODE,
  INVALID_HOUR_RANGE,
  LIMIT_METRICS,
  UK_COUNTRY_CODE,
  UPPER_CASE_HOUR_FORMAT,
  UPPER_CASE_HOUR_MINUTE_FORMAT,
} from '@app/pages/MarketAutoGrowthOperations/constants';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';

const { Option } = Select;

const AddLimitModal = ({
  open,
  setOpen,
  limitMetricsList,
  limitMetricsListLoading,
  limitDayTypesList,
  limitDayTypesListLoading,
  thresholdTypeList,
  thresholdTypeListLoading,
  limitPromoTypesListLoading,
  limitPromoTypesList,
  selectedDomain,
  limitWarehouseList,
  limitWarehouseListLoading,
  limitEffectList,
  limitEffectListLoading,
}) => {
  const dispatch = useDispatch();
  const form = React.createRef();

  const { t } = useTranslation('marketAutoGrowthOperations');

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [addErrorMessage, setAddErrorMessage] = useState(false);

  const [selectedLimitMetric, setSelectedLimitMetric] = useState(null);
  const [selectedHourRange, setSelectedHourRange] = useState(null);
  const [selectedPromoType, setSelectedPromoType] = useState(null);
  const [selectedDayType, setSelectedDayType] = useState(null);
  const [selectedThresholdType, setSelectedThresholdType] = useState(null);
  const [selectedWarehouseType, setSelectedWarehouseType] = useState(null);
  const [selectedLimitEffectType, setSelectedLimitEffectType] = useState(null);
  const [selectedLimitValue, setSelectedLimitValue] = useState(0);

  const country = getSelectedCountry();
  const countryCode = country.code.alpha2;

  const handleChange = value => {
    let hourRange = null;
    if (value) {
      let tempStartHour = null;
      let tempEndHour = null;
      if (parseFloat(moment(value[0])?.format(UPPER_CASE_HOUR_FORMAT), 1) > parseFloat(moment(value[1])?.format(UPPER_CASE_HOUR_FORMAT), 1)
            && parseFloat(moment(value[1])?.format(UPPER_CASE_HOUR_FORMAT), 1) !== 0) {
        tempStartHour = parseFloat(moment(value[1])?.format(UPPER_CASE_HOUR_FORMAT), 1);
        tempEndHour = parseFloat(moment(value[0])?.format(UPPER_CASE_HOUR_FORMAT), 1);
      }
      else {
        tempStartHour = parseFloat(moment(value[0])?.format(UPPER_CASE_HOUR_FORMAT), 1);
        tempEndHour = parseFloat(moment(value[1])?.format(UPPER_CASE_HOUR_FORMAT), 1) === 0
          ? 24 : parseFloat(moment(value[1])?.format(UPPER_CASE_HOUR_FORMAT), 1);
      }
      hourRange = `${tempStartHour}_${tempEndHour}`;
    }
    else hourRange = value;
    setSelectedHourRange(hourRange);
  };

  const onFinish = () => {
    if (selectedLimitMetric &&
      selectedPromoType &&
      selectedHourRange && selectedHourRange !== INVALID_HOUR_RANGE &&
      selectedDayType &&
      selectedThresholdType &&
      selectedLimitValue !== null &&
      selectedWarehouseType &&
      selectedLimitEffectType) {
      setConfirmLoading(true);
      const newData = {
        id: uniqueId(),
        countryCode: countryCode === GB_COUNTRY_CODE ? UK_COUNTRY_CODE : countryCode,
        domainType: selectedDomain,
        limitMetric: selectedLimitMetric,
        dayType: selectedDayType,
        promoType: selectedPromoType,
        hourRange: selectedHourRange,
        thresholdType: selectedThresholdType,
        limitValue: selectedLimitValue,
        warehouseType: selectedWarehouseType,
        limitEffectType: selectedLimitEffectType,
        is_updated: 1,
      };
      setAddErrorMessage(false);
      setOpen(false);
      dispatch(Creators.addLimitLine({ data: newData }));
    }
    else if (selectedHourRange === INVALID_HOUR_RANGE) {
      setAddErrorMessage(true);
      message.error({ content: t('PLEASE_VALID_HOUR_RANGE') });
    }
    else {
      setAddErrorMessage(true);
      message.error({ content: t('PLEASE_FILL') });
    }
  };

  return (
    <Modal
      title={t('NEW_LIMIT')}
      visible={open}
      confirmLoading={confirmLoading}
      onCancel={() => setOpen(false)}
      footer={null}
      okButtonProps={{ disabled: addErrorMessage }}
    >
      <Form
        ref={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        autoComplete="off"
        initialValues={{
          dayType: null,
          thresholdType: null,
          limitValue: 0,
          promoType: null,
          hourRange: null,
          warehouseType: null,
          limitEffectType: null,
        }}
      >
        <Form.Item
          name="limitMetric"
          label={t('LIMIT_METRIC')}
          required
        >
          <Select
            allowClear={false}
            placeholder={t('SELECT_LIMIT_METRIC')}
            onChange={value => {
              setSelectedLimitMetric(value);
              form?.current?.setFieldsValue({
                dayType: null,
                thresholdType: null,
                limitValue: 0,
                hourRange: null,
                promoType: null,
                warehouseType: null,
                limitEffectType: null,
              });
            }}
            loading={limitMetricsListLoading}
          >
            {limitMetricsList?.map(value => (
              <Option key={value} value={value} label={value}>{value}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="dayType"
          label={t('DAY_TYPE')}
          loading={limitDayTypesListLoading}
          required
        >
          <Select
            placeholder={t('SELECT_DAY_TYPE')}
            disabled={!selectedLimitMetric}
            onChange={value => setSelectedDayType(value)}
          >
            {limitDayTypesList.map(value => (
              <Option key={value} value={value} label={value}>{value}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="promoType"
          label={t('PROMO_TYPE')}
          required
          rules={[
            {
              validator: (_, value) => {
                if (value && selectedLimitMetric === LIMIT_METRICS.ORDERSHARE) {
                  if (value.length > 3) {
                    return Promise.reject(new Error(t('LIMIT_ERROR_MESSAGES.MAX_3_TAGS')));
                  }
                  return true;
                }
                return true;
              },
              validationTrigger: 'onBlur, onChange',
            }]}
        >
          <Select
            mode={selectedLimitMetric === LIMIT_METRICS.ORDERSHARE ? 'multiple' : 'default'}
            allowClear={false}
            loading={limitPromoTypesListLoading}
            disabled={!selectedLimitMetric}
            placeholder={t('SELECT_PROMO_TYPE')}
            onChange={value => setSelectedPromoType(value)}
          >
            {Object.entries(limitPromoTypesList).map(element => element[0] === selectedLimitMetric && element[1]?.map(value => (
              <Option key={value} value={value} label={value}>{value}</Option>
            )))}
          </Select>
        </Form.Item>
        <Form.Item
          name="hourRange"
          label={t('HOUR_RANGE')}
          required
        >
          <TimePicker.RangePicker
            format={UPPER_CASE_HOUR_MINUTE_FORMAT}
            showNow={false}
            minuteStep={60}
            disabled={!selectedLimitMetric}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item
          name="thresholdType"
          label={t('THRESHOLD_TYPE')}
          required
          loading={thresholdTypeListLoading}
        >
          <Select
            placeholder={t('SELECT_THRESHOLD_TYPE')}
            disabled={!selectedLimitMetric}
            onChange={value => setSelectedThresholdType(value)}
          >
            {Object.entries(thresholdTypeList).map(element => element[0] === selectedLimitMetric && element[1]?.map(value => (
              <Option key={value} value={value} label={value}>{value}</Option>
            )))}
          </Select>
        </Form.Item>
        <Form.Item
          name="limitValue"
          label={t('LIMIT_VALUE')}
          required
        >
          <InputNumber
            defaultValue={0}
            min={0}
            max={selectedLimitMetric === LIMIT_METRICS.CP_PO || selectedLimitMetric === LIMIT_METRICS.ORDERSHARE ? 100 : null}
            disabled={!selectedLimitMetric}
            onChange={value => setSelectedLimitValue(value)}
          />
        </Form.Item>
        <Form.Item
          name="warehouseType"
          label={t('WAREHOUSE_TYPE')}
          required
          loading={limitWarehouseListLoading}
        >
          <Select
            placeholder={t('SELECT_WAREHOUSE_TYPE')}
            disabled={!selectedLimitMetric}
            onChange={value => setSelectedWarehouseType(value)}
          >
            {limitWarehouseList?.map(value => (
              <Option key={value} value={value} label={value}>{value}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="limitEffectType"
          label={t('LIMIT_EFFECT_TYPE')}
          required
          loading={limitEffectListLoading}
        >
          <Select
            placeholder={t('SELECT_LIMIT_EFFECT_TYPE')}
            disabled={!selectedLimitMetric}
            onChange={value => setSelectedLimitEffectType(value)}
          >
            {limitEffectList?.map(value => (
              <Option key={value} value={value} label={value}>{value}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" onClick={onFinish}>
            {t('SUBMIT')}
          </Button>
          <Button
            type="secondary"
            onClick={() => form?.current?.setFieldsValue({
              dayType: null,
              thresholdType: null,
              limitValue: 0,
              promoType: null,
              hourRange: null,
              warehouseType: null,
              limitEffectType: null,
            })}
          >
            {t('CLEAR')}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddLimitModal;

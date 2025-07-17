import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Form, Input, Select, Switch, DatePicker } from 'antd';
import { useTranslation } from 'react-i18next';

import { useFormik } from 'formik';

import _ from 'lodash';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { validationSchema, getInitialValues, manipulateValuesBeforeSubmit } from './formHelper';
import { getDomainTypeOptions, getSubmitButtons } from '@app/pages/Lottery/util';
import Card from '@shared/components/UI/AntCard';
import { validate } from '@shared/yup';
import { getSelectFilterOption } from '@shared/utils/common';

const { RangePicker } = DatePicker;

const GeneralInfoForm = props => {
  const dispatch = useDispatch();
  const { isDetail = false, submitHandler, lottery, lotterySegments, isUpdateLotteryPending } = props;
  const [isEditing, setIsEditing] = useState(false);
  const { t } = useTranslation('lotteryPage');
  const formTitle = t('GENERAL_INFORMATION');

  const isDisabled = isDetail && !isEditing;

  let submitButtonText;
  if (isDetail) submitButtonText = isEditing ? t('global:UPDATE') : t('global:EDIT');
  else submitButtonText = t('global:CREATE');

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues: getInitialValues(lottery),
    onSubmit: values => {
      const body = manipulateValuesBeforeSubmit(values);
      submitHandler(body);
    },
  });

  const { handleSubmit, handleChange, values, errors, setFieldValue } = formik;

  const handleSelectDateRange = ([startDate, endDate]) => {
    setFieldValue('validFrom', startDate);
    setFieldValue('validUntil', endDate);
  };

  const onStatusChange = value => {// eslint-disable-line consistent-return
    if (!lotterySegments?.lotterySegments?.length) {
      return dispatch(ToastCreators.error({ message: t('ERRORS.LOTTERY_SEGMENTS') }));
    }
    const status = value ? 2 : 1;
    setFieldValue('status', status);
    setTimeout(() => {
      const data = { ...values, status };
      const body = manipulateValuesBeforeSubmit(data);
      submitHandler(body);
    }, 500);
  };

  useEffect(() => {
    setIsEditing(isUpdateLotteryPending);
  }, [isUpdateLotteryPending]);

  return (
    <Card title={formTitle}>
      <Form onFinish={handleSubmit} layout="vertical" initialValues={values}>
        {isDetail ? (
          <Row justify="end">
            <Col span={1}>
              <Switch
                checked={values.status === 2}
                onChange={value => onStatusChange(value)}
                className={values.status === 2 ? 'bg-success' : 'bg-danger'}
              />
            </Col>
          </Row>
        ) : null}
        <Row>
          <Col span={12}>
            <Form.Item
              help={_.get(errors, 'domainTypes')}
              validateStatus={_.get(errors, 'domainTypes') ? 'error' : 'success'}
              label={t('DOMAIN')}
            >
              <Select
                labelInValue
                mode="multiple"
                allowClear
                value={values.domainTypes}
                options={getDomainTypeOptions()}
                onChange={domainTypes => {
                  setFieldValue('domainTypes', domainTypes);
                }}
                disabled={isDisabled}
                autoComplete="off"
                showSearch
                filterOption={getSelectFilterOption}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item help={_.get(errors, 'code')} validateStatus={_.get(errors, 'code') ? 'error' : 'success'} label={t('PROMO_CODE')}>
              <Input value={values.code} name="code" onChange={handleChange} disabled={isDisabled} autoComplete="off" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Form.Item label={t('VALID_DATE')}>
              <RangePicker format="DD/MM/YYYY" value={[values.validFrom, values.validUntil]} onChange={handleSelectDateRange} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              help={_.get(errors, 'isDefaultSegment')}
              validateStatus={_.get(errors, 'isDefaultSegment') ? 'error' : 'success'}
              label={t('INCLUDE_DEFAULT_SEGMENT')}
            >
              <Switch
                checked={values.isDefaultSegment}
                onChange={value => {
                  setFieldValue('isDefaultSegment', value);
                }}
                className={values.isDefaultSegment ? 'bg-success' : 'bg-danger'}
                disabled={isDisabled}
              />
            </Form.Item>
          </Col>
        </Row>
        {values.isDefaultSegment ? (
          <Row>
            <Col span={12}>
              <Form.Item
                help={_.get(errors, 'defaultSegment')}
                validateStatus={_.get(errors, 'defaultSegment') ? 'error' : 'success'}
                label={t('DEFAULT_SEGMENT')}
              >
                <Input
                  value={values.defaultSegment}
                  name="defaultSegment"
                  disabled={isDisabled}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </Form.Item>
            </Col>
          </Row>
        ) : null}
        <Row justify="end">
          <Form.Item>
            {getSubmitButtons(isDetail, isEditing, setIsEditing, submitButtonText, t('CANCEL'), isUpdateLotteryPending)}
          </Form.Item>
        </Row>
      </Form>
    </Card>
  );
};

GeneralInfoForm.propTypes = {
  isDetail: PropTypes.bool,
  submitHandler: PropTypes.func.isRequired,
};

export default GeneralInfoForm;

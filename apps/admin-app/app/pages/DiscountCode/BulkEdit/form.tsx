import { Col, DatePicker, Form, FormInstance, InputNumber, Row } from 'antd';

import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';

import moment from 'moment/moment';

import React from 'react';

import { DISCOUNT_CODE_MODAL_TYPES, DiscountCodeModalType, UpdateDiscountCodesFormType } from '@app/pages/DiscountCode/BulkEdit/types';

import { DiscountCodeBulkEditUpdateSlice } from '@app/pages/DiscountCode/BulkEdit/slice';
import { useUpdateFormStyles } from '@app/pages/DiscountCode/BulkEdit/styles';

import { ActionTypesDontOverlapAlert, InputNumberKeyPressHandler } from '@app/pages/DiscountCode/BulkEdit/constants';
import { DEFAULT_TIME_FORMAT } from '@shared/shared/constants';
import { ActionTypeSelect } from '@app/pages/DiscountCode/BulkEdit/select';

type PropTypes = {
  form: FormInstance<UpdateDiscountCodesFormType>
  onFinish: (values: UpdateDiscountCodesFormType) => void
  mode: DiscountCodeModalType
}

export function DiscountCodesBulkEditUpdateForm({ form, onFinish, mode }: PropTypes) {
  const { t } = useTranslation(['editDiscountCodeComponent', 'global']);
  const actionType = useSelector(DiscountCodeBulkEditUpdateSlice.selectors.actionType);
  const loading = useSelector(DiscountCodeBulkEditUpdateSlice.selectors.isLoading);
  const classNames = useUpdateFormStyles();
  const actionTypesOverlap = useSelector(DiscountCodeBulkEditUpdateSlice.selectors.actionTypesOverlap);

  return (
    <Form<UpdateDiscountCodesFormType>
      className={classNames.formWrapper}
      form={form}
      layout="vertical"
      onFinish={onFinish}
      requiredMark={false}
      initialValues={{
        validDates: [
          moment().startOf('day'),
          moment().endOf('day').add(1, 'month'),
        ],
        useLimit: 1,
        actionType: actionType || undefined,
      }}
    >
      <Row gutter={[16, 8]}>
        {
          (!actionTypesOverlap && mode === DISCOUNT_CODE_MODAL_TYPES.UPDATE) && (
            <Col span={24}>
              <Form.Item>
                <ActionTypesDontOverlapAlert />
              </Form.Item>
            </Col>
          )
        }
        <Col span={12}>
          <Form.Item<UpdateDiscountCodesFormType>
            name="validDates"
            label={t('global:DATE_RANGE')}
            rules={[{
              required: true,
              message: t('baseYupError:MIXED.REQUIRED'),
            }]}
          >
            <DatePicker.RangePicker
              disabled={loading}
              format={DEFAULT_TIME_FORMAT}
              showTime
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item<UpdateDiscountCodesFormType>
            name="useLimit"
            label={t('USE_LIMIT')}
            rules={[{
              required: true,
              message: t('baseYupError:MIXED.REQUIRED'),
            },
            {
              type: 'number',
              min: 1,
              message: t('baseYupError:NUMBER.MIN', { min: 1 }),
            },
            ]}
          >
            <InputNumber
              disabled={loading}
              min={1}
              type="number"
              onKeyPress={InputNumberKeyPressHandler}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          {
            (mode === DISCOUNT_CODE_MODAL_TYPES.REUSE || actionType) && (
              <Form.Item<UpdateDiscountCodesFormType> name="actionType">
                <ActionTypeSelect disabled={loading} allowTypeChange={mode === DISCOUNT_CODE_MODAL_TYPES.REUSE} />
              </Form.Item>
            )
          }
        </Col>
      </Row>
    </Form>
  );
}

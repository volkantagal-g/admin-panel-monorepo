import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Button, Switch, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useTheme } from 'react-jss';

import _filter from 'lodash/filter';
import _get from 'lodash/get';
import _includes from 'lodash/includes';

import TagRender from '../TagRender';

import { isCurrentCountryTurkey } from '@shared/utils/common';
import { Creators } from '../../redux/actions';
import {
  getSupplierByIdSelector,
  updateSupplierCustomSettingsSelector,
} from '../../redux/selectors';
import { validationSchema, getInitialValues } from './formHelper';
import AntCard from '@shared/components/UI/AntCard';
import { usePrevious } from '@shared/hooks';
import { validate } from '@shared/yup';

const SupplierSettingsForm = () => {
  const dispatch = useDispatch();
  const supplier = useSelector(getSupplierByIdSelector.getData) || {};
  const isUpdatePending = useSelector(
    updateSupplierCustomSettingsSelector.getIsPending,
  );
  const [isFormEditable, setIsFormEditable] = useState(false);
  const { t } = useTranslation('supplierPage');
  const [form] = Form.useForm();
  const theme = useTheme();
  const prevIsUpdatePending = usePrevious(isUpdatePending);
  const { id: supplierId } = useParams();

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues: getInitialValues(supplier),
    onSubmit: values => {
      dispatch(
        Creators.updateSupplierCustomSettingsRequest({
          id: supplierId,
          updateData: values,
        }),
      );
      setIsFormEditable(false);
    },
  });

  const { handleSubmit, values, errors, setFieldValue, handleReset } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  useEffect(() => {
    if (prevIsUpdatePending && !isUpdatePending) {
      setIsFormEditable(false);
    }
  }, [isUpdatePending, prevIsUpdatePending]);

  const handleCancelClick = () => {
    setIsFormEditable(false);
    handleReset();
  };

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  const handleSaveClick = () => {
    form.submit();
  };

  const cardFooter = (
    <Row justify="end" gutter={[theme.spacing(2)]}>
      {isFormEditable ? (
        [
          <Col key="cancel-button">
            <Form.Item className="mb-0 mt-0">
              <Button size="small" onClick={handleCancelClick}>
                {t('button:CANCEL')}
              </Button>
            </Form.Item>
          </Col>,
          <Col key="save-button">
            <Form.Item className="mb-0 mt-0">
              <Button
                size="small"
                form="supplier-settings-form"
                type="primary"
                onClick={handleSaveClick}
                loading={isUpdatePending}
              >
                {t('button:SAVE')}
              </Button>
            </Form.Item>
          </Col>,
        ]
      ) : (
        <Col>
          <Form.Item className="mb-0 mt-0">
            <Button size="small" onClick={handleEditClick}>
              {t('button:EDIT')}
            </Button>
          </Form.Item>
        </Col>
      )}
    </Row>
  );

  return (
    <AntCard
      footer={cardFooter}
      bordered={false}
      title={t('SUPPLIER_SETTINGS')}
    >
      <Form
        form={form}
        id="supplier-settings-form"
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Row>
          <Col span={11}>
            <Form.Item
              help={
                _filter(errors, (v, k) => _includes(k, 'accountingMailAddresses')).length
                  ? t('INVALID_EMAIL')
                  : ''
              }
              validateStatus={
                _filter(errors, (v, k) => _includes(k, 'accountingMailAddresses')).length
                  ? 'error'
                  : 'success'
              }
              label={t('ACCOUNTING')}
              name="accountingMailAddresses"
            >
              <Select
                mode="tags"
                onChange={value => {
                  setFieldValue('accountingMailAddresses', value);
                }}
                allowClear
                options={values.accountingMailAddresses?.map(value => {
                  return {
                    value,
                    label: value,
                  };
                })}
                tagRender={TagRender}
                disabled={isUpdatePending || !isFormEditable}
              />
            </Form.Item>
            <Form.Item
              help={
                _filter(errors, (v, k) => _includes(k, 'commercialMailAddresses')).length
                  ? t('INVALID_EMAIL')
                  : ''
              }
              validateStatus={
                _filter(errors, (v, k) => _includes(k, 'commercialMailAddresses')).length
                  ? 'error'
                  : 'success'
              }
              label={t('COMMERCIAL')}
              name="commercialMailAddresses"
            >
              <Select
                mode="tags"
                onChange={value => {
                  setFieldValue('commercialMailAddresses', value);
                }}
                allowClear
                options={values.commercialMailAddresses?.map(value => {
                  return {
                    value,
                    label: value,
                  };
                })}
                tagRender={TagRender}
                disabled={isUpdatePending || !isFormEditable}
              />
            </Form.Item>
            <Form.Item
              help={
                _filter(errors, (v, k) => _includes(k, 'opsTeamMailAddresses'))
                  .length
                  ? t('INVALID_EMAIL')
                  : ''
              }
              validateStatus={
                _filter(errors, (v, k) => _includes(k, 'opsTeamMailAddresses'))
                  .length
                  ? 'error'
                  : 'success'
              }
              label={t('GETIR_OPS_TEAM')}
              name="opsTeamMailAddresses"
            >
              <Select
                mode="tags"
                onChange={value => {
                  setFieldValue('opsTeamMailAddresses', value);
                }}
                allowClear
                options={values.opsTeamMailAddresses?.map(value => {
                  return {
                    value,
                    label: value,
                  };
                })}
                tagRender={TagRender}
                disabled={isUpdatePending || !isFormEditable}
              />
            </Form.Item>
          </Col>
          <Col span={11} offset={2}>
            <Row>
              <Col span={12}>
                <Form.Item
                  help={_get(errors, 'isStoreConversionSupplier')}
                  validateStatus={
                    _get(errors, 'isStoreConversionSupplier')
                      ? 'error'
                      : 'success'
                  }
                  name="isStoreConversionSupplier"
                  label={t('STORE_CONVERSION_SUPPLIER')}
                >
                  <Switch
                    checked={values.isStoreConversionSupplier}
                    onChange={value => {
                      setFieldValue('isStoreConversionSupplier', value);
                    }}
                    checkedChildren={t('SWITCH.YES')}
                    unCheckedChildren={t('SWITCH.NO')}
                    className={
                      values.isStoreConversionSupplier
                        ? 'bg-success'
                        : 'bg-danger'
                    }
                    disabled={isUpdatePending || !isFormEditable}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  help={_get(errors, 'waybillCheck')}
                  validateStatus={
                    _get(errors, 'waybillCheck') ? 'error' : 'success'
                  }
                  name="waybillCheck"
                  label={t('WAYBILL_CONTROL')}
                >
                  <Switch
                    checked={values.waybillCheck}
                    onChange={value => {
                      setFieldValue('waybillCheck', value);
                    }}
                    checkedChildren={t('SWITCH.ACTIVE')}
                    unCheckedChildren={t('SWITCH.INACTIVE')}
                    className={values.waybillCheck ? 'bg-success' : 'bg-danger'}
                    disabled={isUpdatePending || !isFormEditable}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  help={_get(errors, 'multipleWaybillAllowed')}
                  validateStatus={
                    _get(errors, 'multipleWaybillAllowed') ? 'error' : 'success'
                  }
                  name="multipleWaybillAllowed"
                  label={t('MULTIPLE_WAYBILL_ALLOWED')}
                >
                  <Switch
                    checked={values.multipleWaybillAllowed}
                    onChange={value => {
                      setFieldValue('multipleWaybillAllowed', value);
                    }}
                    checkedChildren={t('SWITCH.ALLOWED')}
                    unCheckedChildren={t('SWITCH.NOT_ALLOWED')}
                    className={
                      values.multipleWaybillAllowed ? 'bg-success' : 'bg-danger'
                    }
                    disabled={isUpdatePending || !isFormEditable}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  help={_get(
                    errors,
                    'isAllowedForBlockedStockSupplierMistakeReason',
                  )}
                  validateStatus={
                    _get(
                      errors,
                      'isAllowedForBlockedStockSupplierMistakeReason',
                    )
                      ? 'error'
                      : 'success'
                  }
                  name="isAllowedForBlockedStockSupplierMistakeReason"
                  label={t('IS_ALLOWED_SUPPLIER')}
                >
                  <Switch
                    checked={
                      values.isAllowedForBlockedStockSupplierMistakeReason
                    }
                    onChange={value => {
                      setFieldValue(
                        'isAllowedForBlockedStockSupplierMistakeReason',
                        value,
                      );
                    }}
                    checkedChildren={t('SWITCH.ALLOWED')}
                    unCheckedChildren={t('SWITCH.NOT_ALLOWED')}
                    className={
                      values.isAllowedForBlockedStockSupplierMistakeReason
                        ? 'bg-success'
                        : 'bg-danger'
                    }
                    disabled={isUpdatePending || !isFormEditable}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  help={_get(errors, 'isFactory')}
                  validateStatus={
                    _get(errors, 'isFactory') ? 'error' : 'success'
                  }
                  name="isFactory"
                  label={t('SUPPLIER_FACTORY')}
                >
                  <Switch
                    checked={values.isFactory}
                    onChange={value => {
                      setFieldValue('isFactory', value);
                    }}
                    checkedChildren={t('SWITCH.YES')}
                    unCheckedChildren={t('SWITCH.NO')}
                    className={values.isFactory ? 'bg-success' : 'bg-danger'}
                    disabled={isUpdatePending || !isFormEditable}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  help={_get(errors, 'isSelfPurchaseOrderAllowed')}
                  validateStatus={
                    _get(errors, 'isSelfPurchaseOrderAllowed')
                      ? 'error'
                      : 'success'
                  }
                  name="isSelfPurchaseOrderAllowed"
                  label={t('SELF_PURCHASE_ORDER_ALLOWED')}
                >
                  <Switch
                    checked={values.isSelfPurchaseOrderAllowed}
                    onChange={value => {
                      setFieldValue('isSelfPurchaseOrderAllowed', value);
                    }}
                    checkedChildren={t('SWITCH.YES')}
                    unCheckedChildren={t('SWITCH.NO')}
                    className={
                      values.isSelfPurchaseOrderAllowed
                        ? 'bg-success'
                        : 'bg-danger'
                    }
                    disabled={isUpdatePending || !isFormEditable}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              {isCurrentCountryTurkey() ? (
                <Col span={12}>
                  <Form.Item
                    help={_get(errors, 'isEWaybillIntegrated')}
                    validateStatus={
                      _get(errors, 'isEWaybillIntegrated') ? 'error' : 'success'
                    }
                    name="isEWaybillIntegrated"
                    label={t('E_WAYBILL_INTEGRATION')}
                  >
                    <Switch
                      checked={values.isEWaybillIntegrated}
                      onChange={value => {
                        setFieldValue('isEWaybillIntegrated', value);
                      }}
                      checkedChildren={t('SWITCH.YES')}
                      unCheckedChildren={t('SWITCH.NO')}
                      className={
                        values.isEWaybillIntegrated ? 'bg-success' : 'bg-danger'
                      }
                      disabled={isUpdatePending || !isFormEditable}
                    />
                  </Form.Item>
                </Col>
              ) : null}
              <Col span={12}>
                <Form.Item
                  help={_get(errors, 'isGoodsAcceptanceReceiptRequired')}
                  validateStatus={
                    _get(errors, 'isGoodsAcceptanceReceiptRequired')
                      ? 'error'
                      : 'success'
                  }
                  name="isGoodsAcceptanceReceiptRequired"
                  label={t('IS_GAR_REQUIRED')}
                >
                  <Switch
                    checked={values.isGoodsAcceptanceReceiptRequired}
                    onChange={value => {
                      setFieldValue('isGoodsAcceptanceReceiptRequired', value);
                    }}
                    checkedChildren={t('SWITCH.YES')}
                    unCheckedChildren={t('SWITCH.NO')}
                    className={
                      values.isGoodsAcceptanceReceiptRequired
                        ? 'bg-success'
                        : 'bg-danger'
                    }
                    disabled={isUpdatePending || !isFormEditable}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </AntCard>
  );
};

export default SupplierSettingsForm;

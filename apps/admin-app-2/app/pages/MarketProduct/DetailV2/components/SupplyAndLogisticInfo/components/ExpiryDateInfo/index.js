import { memo, useState, useMemo, useEffect } from 'react';
import { Col, Form, Row } from 'antd';

import { useFormik } from 'formik';

import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { useParams } from 'react-router-dom';

import {
  getSupplyLogisticInfoSelector, createSupplyLogisticInfoSelector,
  updateSupplyLogisticInfoSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { EditSaveCancelButtons, NumberInput, Switch, Space } from '@shared/components/GUI';

import { getInitialValues, getOnlyModifiedValuesBeforeSubmit, validationSchema } from './formHelper';
import { canSubmit } from '@shared/utils/formHelper';
import useStyles from './styles';
import { usePrevious, usePermission } from '@shared/hooks';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { validate } from '@shared/yup';
import permKey from '@shared/shared/permKey.json';

export const ExpiryDateInfo = memo(function ExpiryDateInfo() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const classes = useStyles();
  const { t } = useTranslation('marketProductPageV2');

  const { Can } = usePermission();

  const [isFormEditable, setIsFormEditable] = useState(false);

  const supplyLogisticInfo = useSelector(getSupplyLogisticInfoSelector.getData);
  const supplyLogisticInfoPending = useSelector(getSupplyLogisticInfoSelector.getIsPending);
  const isCreatePending = useSelector(createSupplyLogisticInfoSelector.getIsPending);
  const isUpdatePending = useSelector(updateSupplyLogisticInfoSelector.getIsPending);
  const isUpdateFailure = useSelector(updateSupplyLogisticInfoSelector.getError);
  const isPending = isCreatePending || isUpdatePending || supplyLogisticInfoPending;
  const prevIsUpdatePending = usePrevious(isPending);

  const formId = 'expiryDate';
  const [form] = Form.useForm();
  const initialValues = useMemo(
    () => getInitialValues(supplyLogisticInfo),
    [supplyLogisticInfo],
  );
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      const { isCreated, ...body } = getOnlyModifiedValuesBeforeSubmit({ initialValues, values });
      return dispatch(Creators.createOrUpdateSupplyLogisticInfoRequest({ id, body, isCreated }));
    },
  });
  const { handleSubmit, values, errors, setFieldValue, setValues } = formik;
  const canBeSubmittable = useMemo(
    () => canSubmit({ initialValues, values }),
    [initialValues, values],
  );

  const handleCancelClick = () => {
    setValues(initialValues);
    setIsFormEditable(false);
  };
  const handleEditClick = () => {
    setValues(initialValues);
    setIsFormEditable(true);
  };

  const handleInputForm = (field, value) => {
    setFieldValue(field, value);
  };

  useEffect(() => {
    if (prevIsUpdatePending && !isUpdatePending) {
      if (isUpdateFailure) {
        setValues(values);
      }
      else {
        setIsFormEditable(false);
      }
    }
    form.setFieldsValue(values);
  }, [form, initialValues, isUpdateFailure, isUpdatePending, prevIsUpdatePending, setValues, values]);

  return (
    <Space title={t('EXPIRY_INFO.TITLE')}>
      <Form form={form} id={formId} onFinish={handleSubmit}>
        <Row className={classes.row}>
          <Col xs={24} md={8}>
            <Row gutter={[0, 16]}>
              <Col xs={24}>
                <div className={classes.columChild}>
                  <span className={classes.title}>{t('STATUS')}</span>
                  <Switch
                    data-testid="status"
                    checked={values.expActive}
                    onChange={value => {
                      setFieldValue('expActive', value);
                    }}
                    disabled={isPending || !isFormEditable}
                    unCheckedChildren="INACTIVE"
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <NumberInput
              errors={errors}
              name={['expDays', 'lifetime']}
              data-testid="lifeTime"
              label={t('EXPIRY_INFO.SHELF_LIFE')}
              value={values.expDays.lifetime}
              onChange={value => handleInputForm('expDays.lifetime', value)}
              disabled={isPending || !isFormEditable}
              min={0}
            />
          </Col>
          <Col xs={24} md={8}>
            <NumberInput
              errors={errors}
              data-testid="allowed"
              name={['expDays', 'allowed']}
              label={t('EXPIRY_INFO.ALLOWED')}
              value={values.expDays.allowed}
              onChange={value => handleInputForm('expDays.allowed', value)}
              disabled={isPending || !isFormEditable}
              min={0}
            />
          </Col>
          <Col xs={24} md={8}>
            <NumberInput
              errors={errors}
              data-testid="warning"
              name={['expDays', 'warning']}
              label={t('EXPIRY_INFO.WARNING')}
              value={values.expDays.warning}
              onChange={value => handleInputForm('expDays.warning', value)}
              disabled={isPending || !isFormEditable}
              min={0}
            />
          </Col>
          <Col xs={24} md={8}>
            <NumberInput
              errors={errors}
              data-testid="dead"
              name={['expDays', 'dead']}
              label={t('EXPIRY_INFO.DEAD')}
              value={values.expDays.dead}
              onChange={value => handleInputForm('expDays.dead', value)}
              disabled={isPending || !isFormEditable}
              min={0}
            />
          </Col>
        </Row>
        <Can permKey={permKey.PAGE_MARKET_PRODUCT_DETAIL_COMPONENT_FIELD_EDIT}>
          <EditSaveCancelButtons
            disabled={!canBeSubmittable}
            form={formId}
            isFormEditable={isFormEditable}
            loading={isPending}
            onCancelClick={handleCancelClick}
            onEditClick={handleEditClick}
          />
        </Can>
      </Form>
    </Space>
  );
});

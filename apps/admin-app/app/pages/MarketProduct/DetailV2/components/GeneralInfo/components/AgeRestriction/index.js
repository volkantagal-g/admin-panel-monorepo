import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get } from 'lodash';

import {
  getMarketProductByIdSelector,
  updateMarketProductSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import {
  validationSchema,
  getInitialValues,
  getOnlyModifiedValuesBeforeSubmit,
} from './formHelper';
import { validate } from '@shared/yup';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { canSubmit } from '@shared/utils/formHelper';
import { Space, Switch, EditSaveCancelButtons, NumberInput } from '@shared/components/GUI';
import { PRODUCT_DETAIL_COMPONENT_ID } from '@app/pages/MarketProduct/constants';
import { useEffectOnRequestFinished } from '@shared/hooks';

const AgeRestriction = () => {
  const dispatch = useDispatch();
  const marketProduct = useSelector(getMarketProductByIdSelector.getData);
  const isUpdatePending = useSelector(updateMarketProductSelector.getIsPending);
  const [isFormEditable, setIsFormEditable] = useState(false);
  const { t } = useTranslation('marketProductPageV2');
  const [form] = Form.useForm();

  const initialValues = useMemo(
    () => getInitialValues(marketProduct),
    [marketProduct],
  );

  const formik = useFormik({
    validate: validate(validationSchema),
    initialValues,
    onSubmit: values => {
      const body = getOnlyModifiedValuesBeforeSubmit({ initialValues, values });
      return dispatch(Creators.updateMarketProductRequest({
        id: get(marketProduct, '_id'),
        body,
      }));
    },
  });

  const { handleSubmit, values, errors, setFieldValue, setValues } = formik;

  useEffectOnRequestFinished(
    updateMarketProductSelector,
    () => {
      setIsFormEditable(false);
    },
    () => {
      setValues(initialValues);
      setIsFormEditable(false);
    },
  );

  const canBeSubmittable = useMemo(
    () => canSubmit({ initialValues, values }),
    [initialValues, values],
  );

  const handleCancelClick = () => {
    setValues(getInitialValues(marketProduct));
    setIsFormEditable(false);
  };

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  return (
    <Space title={t('AGE_RESTRICTION.TITLE')}>
      <Form
        form={form}
        id={PRODUCT_DETAIL_COMPONENT_ID.AGE_RESTRICTION}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Row className="mb-4 align-items-center">
          <div htmlFor="isAgeRestricted" className="flex-grow-1">
            {t('AGE_RESTRICTION.RESTRICTION')}
          </div>
          <Switch
            defaultChecked={false}
            checked={values.isAgeRestricted}
            onChange={value => {
              setFieldValue('isAgeRestricted', value);
            }}
            disabled={isUpdatePending || !isFormEditable}
            checkedChildren="ENABLED"
            unCheckedChildren="DISABLED"
            data-testid="restrictionBtn"
          />
        </Row>
        <Row>
          <Col span={24}>
            <NumberInput
              name={['ageRestriction']}
              label={t('AGE_RESTRICTION.AGE')}
              value={values.ageRestriction}
              onChange={value => {
                setFieldValue('ageRestriction', value);
              }}
              disabled={isUpdatePending || !isFormEditable || !values.isAgeRestricted}
              errors={errors}
            />
          </Col>
        </Row>
        <EditSaveCancelButtons
          disabled={!canBeSubmittable}
          form={PRODUCT_DETAIL_COMPONENT_ID.AGE_RESTRICTION}
          htmlType="submit"
          isFormEditable={isFormEditable}
          loading={isUpdatePending}
          onCancelClick={handleCancelClick}
          onEditClick={handleEditClick}
        />
      </Form>
    </Space>
  );
};

export default AgeRestriction;

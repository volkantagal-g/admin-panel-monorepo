import { Col, Form, Row, Space as AntSpace, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useMemo, useState } from 'react';
import { useFormik } from 'formik';
import { CheckOutlined, EditOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash';

import { updateAmountDetailsSelector } from '../../redux/selectors';
import { basketAmountOptions, formatValuesBeforeSubmit, getInitialValues, validateBasketAmounts, validationSchema } from './formHelpers';
import { Creators } from '../../redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Button, Card, Select } from '@shared/components/GUI';
import BasketAmountForm from './BasketAmountForm';

const { Title } = Typography;

const DomainSpecificConfigs = ({
  domainSpecificDetails,
  warehouseId,
  warehouseDomainType,
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isFormEditable, setIsFormEditable] = useState(false);
  const { t } = useTranslation('basketConfigPage');

  const isPending = useSelector(updateAmountDetailsSelector.getIsPending);

  const initialValues = useMemo(() => {
    const initValues = getInitialValues(domainSpecificDetails);
    form.setFieldsValue({ zoneOneMinDiscountedAmount: initValues.zoneOneMinDiscountedAmount });
    return initValues;
  }, [
    domainSpecificDetails,
    form,
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema,
    initialValues,
    onSubmit: values => {
      const payload = formatValuesBeforeSubmit(values);
      const error = validateBasketAmounts({ ...payload, t });
      if (error) return dispatch(ToastCreators.error({ message: error }));
      return dispatch(
        Creators.updateDiscountedBasketAmountsRequest({
          ...payload,
          warehouseId,
          domainType: domainSpecificDetails?.domainType ?? warehouseDomainType,
          onSuccess: () => {
            setIsFormEditable(false);
          },
        }),
      );
    },
  });

  const { values, setValues, handleSubmit, setFieldValue, errors } = formik;

  const handleResetForm = () => {
    setIsFormEditable(false);
    form.resetFields();
    setValues(initialValues);
  };

  const zoneLabel = `${t('ZONE.TITLE')} - ${t('ZONE.LABEL')}`;
  return (
    <Form onFinish={handleSubmit} form={form} layout="vertical">
      <Card title="Basket Amount">
        <Row gutter={[8]}>
          <Col xs={24} md={8}>
            <Select
              onChange={value => setFieldValue('basketAmountSource', value)}
              name="basketAmountSource"
              label={t('BASKET_AMOUNT_SOURCE')}
              optionsData={basketAmountOptions}
              errors={errors}
              disabled={!isFormEditable}
              value={values.basketAmountSource}
              hasForm
            />
          </Col>

          <BasketAmountForm
            setFieldValue={setFieldValue}
            disabled={!isFormEditable}
            errors={errors}
            minName="minDiscountedAmount"
            maxName="maxDiscountedAmount"
            minDiscountedAmount={values.minDiscountedAmount}
            maxDiscountedAmount={values.maxDiscountedAmount}
          />
        </Row>
        <Row gutter={[8]}>
          <Col span={24}>
            <Title className="mt-1" level={5}>
              {`${zoneLabel}1`}
            </Title>
          </Col>
          <BasketAmountForm
            setFieldValue={setFieldValue}
            disabled={!isFormEditable}
            errors={errors}
            minName="zoneOneMinDiscountedAmount"
            maxName="zoneOneMaxDiscountedAmount"
            minDiscountedAmount={values.zoneOneMinDiscountedAmount}
            maxDiscountedAmount={values.zoneOneMaxDiscountedAmount}
          />
        </Row>
        <Row gutter={[8]}>
          <Col span={24}>
            <Title className="mt-1" level={5}>
              {`${zoneLabel}2`}
            </Title>
          </Col>
          <BasketAmountForm
            setFieldValue={setFieldValue}
            disabled={!isFormEditable}
            errors={errors}
            minName="zoneTwoMinDiscountedAmount"
            maxName="zoneTwoMaxDiscountedAmount"
            minDiscountedAmount={values.zoneTwoMinDiscountedAmount}
            maxDiscountedAmount={values.zoneTwoMaxDiscountedAmount}
          />
        </Row>
        <Row gutter={[8]}>
          <Col span={24}>
            <Title level={5} className="pt-1">
              {`${zoneLabel}3`}
            </Title>
          </Col>
          <BasketAmountForm
            setFieldValue={setFieldValue}
            disabled={!isFormEditable}
            errors={errors}
            minName="zoneThreeMinDiscountedAmount"
            maxName="zoneThreeMaxDiscountedAmount"
            minDiscountedAmount={values.zoneThreeMinDiscountedAmount}
            maxDiscountedAmount={values.zoneThreeMaxDiscountedAmount}
          />
        </Row>
        <Row justify="end">
          <AntSpace align="end">
            {isFormEditable ? (
              <>
                <Button
                  color="secondary"
                  onClick={handleResetForm}
                  size="medium"
                >
                  {t('CANCEL')}
                </Button>
                <Button
                  type="primary"
                  icon={<CheckOutlined />}
                  htmlType="submit"
                  loading={isPending}
                  disabled={isPending || !isEmpty(errors)}
                  size="medium"
                >
                  {t('global:SAVE')}
                </Button>
              </>
            ) : (
              <Button
                size="medium"
                icon={<EditOutlined />}
                type="primary"
                disabled={isPending}
                onClick={() => setIsFormEditable(true)}
              >
                {t('global:EDIT')}
              </Button>
            )}
          </AntSpace>
        </Row>
      </Card>
    </Form>
  );
};
export default DomainSpecificConfigs;

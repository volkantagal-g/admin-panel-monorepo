import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Typography, Button } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';

import Card from '@shared/components/UI/AntCard';
import SelectFranchise from '@shared/containers/Select/Franchise';
import SelectWarehouse from '@shared/containers/Select/Warehouse';
import QualityDepartmentPeople from '@shared/containers/Select/QualityDepartmentPeople';
import { validate } from '@shared/yup';
import { Creators } from '../../redux/actions';
import { defaultValues, validationSchema } from './formHelper';
import { createStoreAuditSelector } from '../../redux/selectors';
import { SelectAuditFormType } from '@app/pages/Kds/components';
import { InputWrapper } from '@shared/components/UI/Form';

const { Text } = Typography;
const { Item } = Form;

const CreateStoreAuditForm = () => {
  const { t } = useTranslation('storeAuditPage');

  const dispatch = useDispatch();
  const isPending = useSelector(createStoreAuditSelector.getIsPending);

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    validateOnChange: false,
    onSubmit: values => {
      const payload = {
        ...values,
        round: values.round === null ? undefined : values.round,
      };
      dispatch(Creators.createStoreAuditRequest(payload));
    },
  });

  const { handleSubmit, values, touched, errors, setFieldValue } = formik;

  const handleSelectChange = fieldName => {
    return (selectedItems, selectedObj) => {
      if (fieldName === 'warehouseId') {
        setFieldValue('warehouseId', selectedItems);
        setFieldValue('franchiseId', selectedObj?.data?.franchise || null);
      }
      else {
        setFieldValue(fieldName, selectedItems);
      }
    };
  };

  const handleNumberChange = (inputField, inputValue) => {
    setFieldValue(inputField, inputValue);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Card
        title={t('NEW_STORE_AUDIT_FORM')}
        footer={(
          <Button
            size="small"
            type="primary"
            htmlType="submit"
            loading={isPending}
          >
            {t('button:SAVE')}
          </Button>
        )}
      >
        <Row gutter={[16, 16]}>
          <Col lg={24} xs={24}>
            <Text>{t('AUDITOR')}</Text>
            <Item
              name="auditorId"
              help={get(touched, 'auditorId') && get(errors, 'auditorId')}
              validateStatus={errors.auditorId && touched.auditorId ? 'error' : 'success'}
            >
              <QualityDepartmentPeople
                placeholder={t('FILTER')}
                onChange={handleSelectChange('auditorId')}
                allowClear={false}
                isDisabled={isPending}
              />
            </Item>
          </Col>
          <Col lg={24} xs={24}>
            <Text>{t('global:WAREHOUSE')}</Text>
            <Item
              help={get(touched, 'warehouseId') && get(errors, 'warehouseId')}
              validateStatus={errors.warehouseId && touched.warehouseId ? 'error' : 'success'}
            >
              <SelectWarehouse
                value={values.warehouseId}
                isMultiple={false}
                allowClear={false}
                dataTestId="Warehouse"
                isDisabled={isPending}
                onChange={handleSelectChange('warehouseId')}
              />
            </Item>
          </Col>
          <Col lg={24} xs={24}>
            <Text>{t('FRANCHISE')}</Text>
            <Item
              name="franchiseId"
              help={get(errors, 'franchiseId')}
              validateStatus={errors.franchiseId ? 'error' : 'success'}
            >
              <p hidden>{values.franchiseId}</p>
              <SelectFranchise
                value={values.franchiseId}
                placeholder={t('FILTER')}
                onChange={() => null}
                disabled
              />
            </Item>
          </Col>
          <Col lg={24} xs={24}>
            <Text>{t('AUDIT_TYPE')}</Text>
            <SelectAuditFormType
              selectKey="auditFormTypeId"
              fieldName="auditFormTypeId"
              dataTestId="auditType"
              formik={formik}
              disabled={isPending}
              value={values.auditFormTypeId}
              onChangeCallback={handleSelectChange('auditFormTypeId')}
            />
          </Col>
          <Col lg={24} xs={24}>
            <Text>{t('ROUND_NUMBER')}</Text>
            <InputWrapper
              inputKey="round"
              value={values.round}
              setFieldValue={handleNumberChange}
              disabled={isPending}
              placeholder={t('ROUND_NUMBER')}
              mode="number"
              additionalProps={{ precision: 0, step: 1, min: 0, max: 100 }}
            />
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default CreateStoreAuditForm;

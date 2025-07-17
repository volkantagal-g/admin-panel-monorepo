import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Typography } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import SelectFranchise from '@shared/containers/Select/Franchise';
import SelectWarehouse from '@shared/containers/Select/Warehouse';
import Card from '@shared/components/UI/AntCard';
import { InputWrapper, DatePickerWrapper } from '@shared/components/UI/Form';
import { validate } from '@shared/yup';
import { Creators } from '../../redux/actions';
import { defaultValues, validationSchema } from './formHelper';
import { createFranchiseEquipmentSelector } from '../../redux/selectors';
import { editEquipmentCreationBody } from './utils';
import Footer from '../Footer';
import useStyles from './styles';

const { Text } = Typography;

const CreateFranchiseEquipmentForm = () => {
  const classes = useStyles();

  const { t } = useTranslation('franchiseEquipmentPage');

  const dispatch = useDispatch();
  const isPending = useSelector(createFranchiseEquipmentSelector.getIsPending);

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    validateOnChange: false,
    onSubmit: values => {
      const formValues = editEquipmentCreationBody(values);
      dispatch(Creators.createFranchiseEquipmentRequest({ ...formValues }));
    },
  });

  const { handleSubmit, values, touched, errors, setFieldValue } = formik;

  return (
    <Form>
      <Card
        title={t('FRANCHISE_EQUIPMENT')}
        footer={
          <Footer isPending={isPending} handleSubmit={handleSubmit} />
        }
      >
        <Row gutter={[16, 16]}>
          <Col span={12} lg={12} xs={24}>
            <Text>{t('FRANCHISE')}</Text>
            <div className={errors.franchiseId && classes.alert}>
              <SelectFranchise
                allowClear={false}
                disabled={isPending}
                value={values.franchiseId}
                onChange={value => setFieldValue('franchiseId', value)}
              />
              <div>{errors.franchiseId}</div>
            </div>
          </Col>
          <Col span={12} lg={12} xs={24}>
            <Text>{t('WAREHOUSE')}</Text>
            <div className={errors.warehouseId && classes.alert}>
              <SelectWarehouse
                isDisabled={isPending}
                franchiseIds={values?.franchiseId?.length && [values.franchiseId]}
                value={values.warehouseId}
                onChange={value => setFieldValue('warehouseId', value)}
              />
              <div>{errors.warehouseId}</div>
            </div>
          </Col>
          <Col span={12} lg={12} xs={24}>
            <Text>{t('CAR_COUNT')}</Text>
            <InputWrapper
              inputKey="carCount"
              value={values.carCount}
              isTouched={get(touched, 'carCount')}
              hasError={get(errors, 'carCount')}
              disabled={isPending}
              mode="number"
              setFieldValue={setFieldValue}
            />
          </Col>
          <Col span={12} lg={12} xs={24}>
            <Text>{t('MOTO_COUNT')}</Text>
            <InputWrapper
              inputKey="motoCount"
              value={values.motoCount}
              isTouched={get(touched, 'motoCount')}
              hasError={get(errors, 'motoCount')}
              disabled={isPending}
              mode="number"
              setFieldValue={setFieldValue}
            />
          </Col>
          <Col span={12} lg={12} xs={24}>
            <Text>{t('OPENING_DATE')}</Text>
            <DatePickerWrapper
              selectKey="openDate"
              size="large"
              format="DD/MM/YYYY"
              value={values.openDate}
              allowClear={false}
              onChangeCallback={value => setFieldValue('openDate', value)}
            />
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default CreateFranchiseEquipmentForm;

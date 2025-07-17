import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import _ from 'lodash';

import { defaultValues, validationSchema } from './formHelper';
import { InputWrapper } from '@shared/components/UI/Form';
import Card from '@shared/components/UI/AntCard';
import Footer from '../Footer';
import { validate } from '@shared/yup';

const { useForm } = Form;

function SurfaceAreaInfo(props) {
  const {
    basement,
    entrance,
    entranceStorage,
    entresol,
    frontPark,
    total,
    submitRequest,
  } = props;
  const { t } = useTranslation();
  const [form] = useForm();
  const [isFormEditable, setIsFormEditable] = useState(false);

  const initialProps = { basement, entrance, entranceStorage, entresol, frontPark, total };

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      if (_.isEqual(values, initialProps)) {
        return false;
      }

      submitRequest({ surfaceArea: values });

      setIsFormEditable(false);
      return true;
    },
    enableReinitialize: true,
  });

  const handleResetForm = () => {
    if (_.isEqual(values, initialProps)) {
      return false;
    }

    setValues(initialProps);
    form.setFieldsValue(initialProps);
    return true;
  };

  const { handleSubmit, setFieldValue, values, errors, touched, setValues } = formik;

  useEffect(() => {
    form.setFieldsValue({ basement, entrance, entranceStorage, entresol, frontPark, total });
    setValues({ basement, entrance, entranceStorage, entresol, frontPark, total });
  }, [form, setValues, basement, entrance, entranceStorage, entresol, frontPark, total ]);

  return (
    <>
      <Card title={t('warehousePage:SURFACE_AREA_INFO')}>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Row gutter={[16]} align="bottom">
            <Col span={12}>
              <InputWrapper
                inputKey="total"
                label={t("warehousePage:TOTAL_AREA")}
                value={values.total}
                isTouched={_.get(touched, 'total')}
                hasError={_.get(errors, 'total')}
                disabled={!isFormEditable}
                setFieldValue={setFieldValue}
                mode="number"
              />
            </Col>
            <Col span={12}>
              <InputWrapper
                inputKey="entrance"
                label={t("warehousePage:ENTRANCE_AREA")}
                value={values.entrance}
                isTouched={_.get(touched, 'entrance')}
                hasError={_.get(errors, 'entrance')}
                disabled={!isFormEditable}
                setFieldValue={setFieldValue}
                mode="number"
              />
            </Col>
          </Row>
          <Row gutter={[16]} align="bottom">
            <Col span={12}>
              <InputWrapper
                inputKey="entranceStorage"
                label={t("warehousePage:ENTRANCE_STORAGE_AREA")}
                value={values.entranceStorage}
                isTouched={_.get(touched, 'entranceStorage')}
                hasError={_.get(errors, 'entranceStorage')}
                disabled={!isFormEditable}
                setFieldValue={setFieldValue}
                mode="number"
              />
            </Col>
            <Col span={12}>
              <InputWrapper
                inputKey="basement"
                label={t("warehousePage:BASEMENT_AREA")}
                value={values.basement}
                isTouched={_.get(touched, 'basement')}
                hasError={_.get(errors, 'basement')}
                disabled={!isFormEditable}
                setFieldValue={setFieldValue}
                mode="number"
              />
            </Col>
          </Row>
          <Row gutter={[16]} align="bottom">
            <Col span={12}>
              <InputWrapper
                inputKey="entresol"
                label={t("warehousePage:ENTRESOL_AREA")}
                value={values.entresol}
                isTouched={_.get(touched, 'entresol')}
                hasError={_.get(errors, 'entresol')}
                disabled={!isFormEditable}
                setFieldValue={setFieldValue}
                mode="number"
              />
            </Col>
            <Col span={12}>
              <InputWrapper
                inputKey="frontPark"
                label={t("warehousePage:FRONT_PARK_AREA")}
                value={values.frontPark}
                isTouched={_.get(touched, 'frontPark')}
                hasError={_.get(errors, 'frontPark')}
                disabled={!isFormEditable}
                setFieldValue={setFieldValue}
                mode="number"
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Footer
                formButtonVisibilty={isFormEditable}
                setFormButtonVisibilty={setIsFormEditable}
                handleReset={handleResetForm}
              />
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
}

SurfaceAreaInfo.propTypes = {
  basement: PropTypes.number,
  entrance: PropTypes.number,
  entranceStorage: PropTypes.number,
  entresol: PropTypes.number,
  frontPark: PropTypes.number,
  total: PropTypes.number,
  submitRequest: PropTypes.func,
};

export default SurfaceAreaInfo;

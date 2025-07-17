import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Checkbox } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import PropTypes from 'prop-types';

import Card from '@shared/components/UI/AntCard';
import { InputWrapper } from '@shared/components/UI/Form';
import { WAREHOUSE_SEGMENT_TYPES } from '@shared/shared/constants';
import { validate } from '@shared/yup';
import { Creators } from '../../redux/actions';
import { warehouseSegmentSelector } from '../../redux/selectors';
import { defaultValues, validationSchema } from './formHelper';
import Footer from '../Footer';

const SegmentCreationForm = ({ formType }) => {
  const { t } = useTranslation('warehouseSegmentPage');
  
  const dispatch = useDispatch();
  const isPending = useSelector(warehouseSegmentSelector.getIsPending);

  const formik = useFormik({
    initialValues: defaultValues,
    validateOnMount: true,
    validate: validate(validationSchema),
    onSubmit: ({ name, isDefault }) => {
      dispatch(Creators.createWarehouseSegmentRequest({
        name: name?.trim(),
        isDefault,
        segmentType: WAREHOUSE_SEGMENT_TYPES?.[formType],
      }));
    },
  });

  const { handleChange, handleSubmit, values, touched, errors } = formik;

  return (
    <>
      <Form>
        <Card
          title={t(`NEW.${formType}.TITLE`)}
          footer={
            <Footer 
              isDefault={values?.isDefault}
              isPending={isPending}
              handleSubmit={handleSubmit}
            />
          }
          bordered={false}
        >
          <Row>
            <Col lg={12} xs={24} >
              <InputWrapper
                inputKey="name"
                label={t('NEW.FORM.NAME')}
                value={values.name}
                isTouched={_.get(touched, 'name')}
                hasError={_.get(errors, 'name')}
                handleChange={handleChange}
              />
            </Col>
          </Row>
          <Row>
            <Col lg={12} xs={24} >
              <Checkbox
                name="isDefault"
                checked={values.isDefault}
                onChange={handleChange}
                disabled={isPending}
              >
                {t("NEW.FORM.IS_DEFAULT")}
              </Checkbox>
            </Col>
          </Row>
        </Card>
      </Form>
    </>
  );
};

SegmentCreationForm.propTypes = { formType: PropTypes.string };

export default SegmentCreationForm;

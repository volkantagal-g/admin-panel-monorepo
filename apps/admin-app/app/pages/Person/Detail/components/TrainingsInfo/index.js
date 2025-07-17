import { useEffect, useMemo, useState } from 'react';
import { Form, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get } from 'lodash';
import moment from 'moment';

import AntCard from '@shared/components/UI/AntCard';
import { validate } from '@shared/yup';
import { DatePickerWrapper, InputWrapper, SelectWrapper } from '@shared/components/UI/Form';
import AntTable from '@shared/components/UI/AntTable';
import SelectFranchise from '@shared/containers/Select/Franchise';
import { DEFAULT_TRAINING_FORM, validationSchema } from './formHelper';
import { convertedTrainingOptions } from '../../utils';
import { getTableColumns } from './config';
import Footer from '../Footer';
import { DEFAULT_COL_SPACING, DEFAULT_ROW_SPACING, ANT_SPACING_24 } from '../../constants';

const TrainingsInfo = ({ data, isPending, isSuccessPersonUpdate, handleUpdate, editPermKey }) => {
  const { t } = useTranslation('personPage');

  const [isFormEditable, setIsFormEditable] = useState(false);

  const validationFn = useMemo(() => validate(() => validationSchema()), []);

  const [form] = Form.useForm();
  const formik = useFormik({
    enableReinitialize: true,
    validate: validationFn,
    initialValues: DEFAULT_TRAINING_FORM,
    onSubmit: formValues => {
      return handleUpdate({
        trainingObj: {
          ...formValues,
          trainingDate: moment(formValues.trainingDate).startOf('day'),
        },
      });
    },
  });

  const { handleSubmit, values, errors, touched, setFieldValue, handleChange, setValues, resetForm } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  const handleFieldChange = fieldName => {
    return value => {
      setFieldValue(fieldName, value);
    };
  };

  return (
    <Form form={form} layout="vertical">
      <AntCard
        footer={(
          <Footer
            initialValues={data}
            values={values}
            setValues={setValues}
            resetForm={resetForm}
            isFormEditable={isFormEditable}
            setIsFormEditable={setIsFormEditable}
            permKey={editPermKey}
            isPending={isPending}
            isSuccessPersonUpdate={isSuccessPersonUpdate}
            handleSubmit={handleSubmit}
          />
        )}
        bordered={false}
        title={t('TRAININGS.TITLE')}
      >
        <Row gutter={DEFAULT_ROW_SPACING}>
          <Col span={ANT_SPACING_24}>
            <AntTable
              data={data.trainings}
              columns={getTableColumns({ t })}
              loading={isPending}
              scroll={{ x: 600 }}
            />
          </Col>
          <Col {...DEFAULT_COL_SPACING}>
            <Form.Item
              help={get(touched, 'franchise') && get(errors, 'franchise')}
              validateStatus={get(touched, 'franchise') && get(errors, 'franchise') ? 'error' : 'success'}
              name="franchise"
              label={t('FRANCHISE')}
            >
              <SelectFranchise
                value={values.franchise}
                isFirstOptionSelected={false}
                onChange={handleFieldChange('franchise')}
                disabled={isPending || !isFormEditable}
                allowClear={false}
                placeholder={' '}
              />
            </Form.Item>
          </Col>
          <Col {...DEFAULT_COL_SPACING}>
            <DatePickerWrapper
              selectKey="trainingDate"
              label={t('DATE')}
              value={values.trainingDate}
              disabled={isPending || !isFormEditable}
              isTouched={get(touched, 'trainingDate')}
              hasError={get(errors, 'trainingDate')}
              onChangeCallback={handleFieldChange('trainingDate')}
              setDefaultValue={false}
            />
          </Col>
          <Col {...DEFAULT_COL_SPACING}>
            <InputWrapper
              inputKey="certificateNumber"
              label={t('TRAININGS.CERTIFICATE_NO')}
              value={values.certificateNumber}
              isTouched={get(touched, 'certificateNumber')}
              hasError={get(errors, 'certificateNumber')}
              handleChange={handleChange}
              disabled={isPending || !isFormEditable}
              setDefaultValue={false}
            />
          </Col>
          <Col {...DEFAULT_COL_SPACING}>
            <InputWrapper
              inputKey="trainer"
              label={t('TRAININGS.TRAINER')}
              value={values.trainer}
              isTouched={get(touched, 'trainer')}
              hasError={get(errors, 'trainer')}
              handleChange={handleChange}
              disabled={isPending || !isFormEditable}
              setDefaultValue={false}
            />
          </Col>
          <Col {...DEFAULT_COL_SPACING}>
            <SelectWrapper
              selectKey="trainingType"
              label={t('TRAININGS.NAME')}
              value={values.trainingType}
              optionLabelProp="label"
              optionValueProp="value"
              hasError={get(errors, 'trainingType')}
              isTouched={get(touched, 'trainingType')}
              optionsData={convertedTrainingOptions}
              disabled={isPending || !isFormEditable}
              onChangeCallback={handleFieldChange('trainingType')}
            />
          </Col>
        </Row>
      </AntCard>
    </Form>
  );
};

export default TrainingsInfo;

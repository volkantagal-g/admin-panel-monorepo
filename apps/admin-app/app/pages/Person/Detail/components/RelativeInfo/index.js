import { useCallback, useEffect, useMemo, useState } from 'react';
import { Form, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get } from 'lodash';

import { validate } from '@shared/yup';
import { getLangKey } from '@shared/i18n';
import AntCard from '@shared/components/UI/AntCard';
import { InputWrapper, SelectWrapper } from '@shared/components/UI/Form';
import GsmNumberInput from '@shared/components/UI/GsmNumberInput';
import { RELATION_TYPES } from '@shared/shared/constants';
import { relationTypes } from '@shared/shared/constantValues';
import { updateRelativeInfoRequestParams } from '../../utils';
import { validationSchema } from './formHelper';
import Footer from '../Footer';
import { DEFAULT_COL_SPACING, DEFAULT_ROW_SPACING } from '../../constants';

const RelativeInfo = ({ data, isPending, isSuccessPersonUpdate, handleUpdate, editPermKey }) => {
  const { t } = useTranslation(['personPage', 'error']);

  const [isFormEditable, setIsFormEditable] = useState(false);

  const validationFn = useMemo(() => validate(() => validationSchema({ t })), [t]);

  const [form] = Form.useForm();
  const formik = useFormik({
    enableReinitialize: true,
    validate: validationFn,
    initialValues: data,
    onSubmit: formValues => {
      const updateData = updateRelativeInfoRequestParams({ formValues });

      return handleUpdate({ updateData });
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

  const handleGsmChange = useCallback(
    value => {
      setFieldValue('fullGsm', value);
    },
    [setFieldValue],
  );

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
        title={t('RELATIVE.TITLE')}
      >
        <Row gutter={DEFAULT_ROW_SPACING}>
          <Col {...DEFAULT_COL_SPACING}>
            <InputWrapper
              inputKey="name"
              label={t('NAME')}
              placeholder={t('NAME')}
              value={values.name}
              isTouched={get(touched, 'name')}
              hasError={get(errors, 'name')}
              handleChange={handleChange}
              disabled={isPending || !isFormEditable}
              setDefaultValue={false}
            />
          </Col>
          <Col {...DEFAULT_COL_SPACING}>
            <Form.Item
              help={get(touched, 'fullGsm') && get(errors, 'fullGsm')}
              validateStatus={get(touched, 'fullGsm') && get(errors, 'fullGsm') ? 'error' : 'success'}
              name="fullGsm"
              label={t('GSM')}
            >
              <GsmNumberInput
                value={values.fullGsm}
                onChange={handleGsmChange}
                disabled={isPending || !isFormEditable}
              />
            </Form.Item>
          </Col>
          <Col {...DEFAULT_COL_SPACING}>
            <SelectWrapper
              selectKey="relation"
              label={t('RELATIVE.RELATION_TYPE')}
              value={values.relation}
              hasError={get(errors, 'relation')}
              isTouched={get(touched, 'relation')}
              optionsData={RELATION_TYPES}
              labelTranslationCallback={relationId => relationTypes[relationId][getLangKey()]}
              onChangeCallback={handleFieldChange('relation')}
              disabled={isPending || !isFormEditable}
            />
          </Col>
        </Row>
      </AntCard>
    </Form>
  );
};

export default RelativeInfo;

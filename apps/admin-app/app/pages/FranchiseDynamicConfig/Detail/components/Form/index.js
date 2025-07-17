import { useMemo, useState } from 'react';
import { get, isEmpty } from 'lodash';
import { useDispatch } from 'react-redux';
import { Row, Col, Form, Typography } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import Card from '@shared/components/UI/AntCard';
import { Creators } from '../../redux/actions';

import ConfigInputField from './components/ConfigInputField';
import { getLangKey } from '@shared/i18n';
import { createYupSchema } from '../../../formHelper';
import FieldType from '@app/pages/FranchiseConfigType/components/Form/components/FieldType';
import { mandatoryDateFields } from '@app/pages/FranchiseDynamicConfig/constants';
import Footer from '@shared/shared/components/Footer';
import { formatPayload } from '@app/pages/FranchiseDynamicConfig/utils';

const { Text } = Typography;

const ConfigDetailForm = ({ data, isPending, fields = [], fieldName }) => {
  const { t } = useTranslation();
  const [isFormEditable, setIsFormEditable] = useState(false);

  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: data,
    validationSchema: createYupSchema(fields, true),
    validateOnChange: false,
    onSubmit: values => {
      dispatch(Creators.updateFranchiseDynamicConfigRequest({ values: formatPayload(values) }));
    },
  });

  const { handleSubmit, errors } = formik;

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  const handleCancelClick = () => {
    setIsFormEditable(false);
  };

  /**
   * Gets the appropriate input fields based on the field type
   * @returns {JSX.Element}
   */
  const getInputFields = () => {
    return (
      <Row gutter={[8, 8]}>
        {fields.map((field, index) => {
          const { name } = field;
          const span = name === mandatoryDateFields.startDate || name === mandatoryDateFields.endDate ? 12 : 24;
          const isTranslationField = field.type === 'translation';

          let inputField = (
            <>
              <Text>{field.name}{field.isRequired ? <span className="text-danger" title={t('franchiseDynamicConfig:VALIDATION.REQUIRED')}>*</span> : ''}</Text>
              <ConfigInputField
                key={field.id}
                field={field}
                index={index}
                formik={formik}
                isEditable={isFormEditable}
                isPending={isPending}
                data={data}
              />
              <div className="mt-1">
                <FieldType type={field.type} />
                <Text type="secondary">{get(field.label, getLangKey())}</Text>
              </div>
            </>
          );

          // If it's not a translation field, we wrap it with Form.Item
          // otherwise <MultiLanguageInput /> will break the validation
          if (!isTranslationField) {
            inputField = (
              <Form.Item
                validateStatus={get(errors, name) ? 'error' : 'success'}
                help={get(errors, name)}
              >
                {inputField}
              </Form.Item>
            );
          }

          return (
            <Col className={isTranslationField ? 'mb-4' : ''} sm={span} xs={24} key={field.id}>
              {inputField}
            </Col>
          );
        })}
      </Row>
    );
  };

  const renderTitle = useMemo(() => {
    if (fieldName) {
      return `${fieldName} - ${t('franchiseDynamicConfig:DETAIL.CONFIG')}`;
    }
    return t('franchiseDynamicConfig:DETAIL.CONFIG');
  }, [fieldName, t]);

  return (
    <Form onFinish={handleSubmit} disabled={isPending}>
      <Card
        title={renderTitle}
        footer={(
          <Footer
            handleSubmit={handleSubmit}
            handleCancelClick={handleCancelClick}
            handleEditClick={handleEditClick}
            isFormEditable={isFormEditable}
            isPending={isPending || isEmpty(data)}
          />
        )}
      >
        {getInputFields()}
      </Card>
    </Form>
  );
};

export default ConfigDetailForm;

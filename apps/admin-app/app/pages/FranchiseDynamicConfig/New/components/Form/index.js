import { useMemo, useState } from 'react';
import { get, uniqueId } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Button, Typography, Divider, Select, Popconfirm } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import Card from '@shared/components/UI/AntCard';
import { Creators } from '../../redux/actions';

import ConfigInputField from './components/ConfigInputField';
import { getLangKey } from '@shared/i18n';
import { createYupSchema, createDefaultValues } from '../../../formHelper';
import { getSelectFilterOption } from '@shared/utils/common';
import FieldType from '@app/pages/FranchiseConfigType/components/Form/components/FieldType';
import { mandatoryDateFields } from '@app/pages/FranchiseDynamicConfig/constants';
import { createFranchiseDynamicConfigSelector } from '../../redux/selectors';

const { Option } = Select;

const { Text, Paragraph } = Typography;

const ConfigTypeForm = ({ configTypes = [], isPending }) => {
  const { t } = useTranslation();
  const [fields, setFields] = useState([]);
  const [configType, setConfigType] = useState(null);
  const [isConfigTypeConfirmed, setIsConfigTypeConfirmed] = useState(false);

  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: createDefaultValues(fields),
    validationSchema: createYupSchema(fields),
    validateOnChange: false,
    onSubmit: values => {
      dispatch(Creators.createFranchiseDynamicConfigRequest({
        configType,
        values,
      }));
    },
  });

  const isSaving = useSelector(createFranchiseDynamicConfigSelector.getIsPending);

  const { handleSubmit, errors } = formik;

  const configTypeOptions = useMemo(() => configTypes.map(item => (
    <Option key={uniqueId('itemType')} value={item.name} label={item.name}>
      <Paragraph className="mb-0">{item.name}</Paragraph>
      <Text type="secondary">{get(item.description, getLangKey())}</Text>
    </Option>
  )), [configTypes]);

  const handleConfigTypeChange = value => {
    const selectedConfigType = configTypes.find(item => item.name === value);

    setFields(get(selectedConfigType, 'fields', []));
    setConfigType(value);
  };

  const handleConfigTypeReselect = async () => {
    formik.handleReset();
    await formik.setValues(createDefaultValues(fields));
    setConfigType(null);
    setFields([]);
    setIsConfigTypeConfirmed(false);
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
                isEditable={isConfigTypeConfirmed}
                isPending={isPending || isSaving}
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

  return (
    <Form onFinish={handleSubmit} disabled={isPending}>
      <Card
        title={t('franchiseDynamicConfig:NEW.CONFIG')}
        footer={(
          <Button
            size="small"
            type="primary"
            htmlType="submit"
            loading={isPending}
            disabled={isPending || !isConfigTypeConfirmed || isSaving}
          >
            {t('button:SAVE')}
          </Button>
        )}
      >
        <Row>
          <Col xs={24} sm={12}>
            <Select
              onChange={handleConfigTypeChange}
              className="w-100"
              optionLabelProp="label"
              placeholder={t('franchiseDynamicConfig:SELECT_CONFIG_TYPE')}
              disabled={isConfigTypeConfirmed || isPending || isSaving || configTypes.length === 0}
              showSearch
              filterOption={getSelectFilterOption}
              value={configType}
            >
              {configTypeOptions}
            </Select>
          </Col>
        </Row>
        {isConfigTypeConfirmed ? (
          <Row>
            <Col xs={24} sm={12}>
              <Popconfirm
                placement="right"
                title={t('franchiseDynamicConfig:CONFIRM_CONFIG_TYPE_RESELECT')}
                okText={t('OK')}
                cancelText={t('CANCEL')}
                onConfirm={handleConfigTypeReselect}
                trigger="click"
              >
                <Button
                  type="ghost"
                  className="mt-2"
                  disabled={isPending || isSaving}
                >
                  {t('franchiseDynamicConfig:RESELECT_CONFIG_TYPE')}
                </Button>
              </Popconfirm>

            </Col>
          </Row>
        ) : (
          <Row>
            <Col xs={24} sm={12}>
              <Button
                type="primary"
                className="mt-2"
                onClick={() => setIsConfigTypeConfirmed(true)}
                disabled={isConfigTypeConfirmed || isPending || isSaving}
              >
                {t('franchiseDynamicConfig:CONFIRM_CONFIG_TYPE')}
              </Button>
            </Col>
            <Col className="mt-2" span={24}>
              <Text>{t('franchiseDynamicConfig:NEED_TO_CONFIRM')}</Text>
            </Col>
          </Row>
        )}
        <Divider />
        {getInputFields()}
      </Card>
    </Form>
  );
};

export default ConfigTypeForm;

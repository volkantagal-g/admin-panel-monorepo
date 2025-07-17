import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import { Button, Checkbox, Col, Form, Input, Row, Select, Space, Tag, Typography } from 'antd';

import { ArrowDownOutlined, ArrowUpOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

import { get } from 'lodash';

import useStyles from '../../styles';
import { defaultFieldValues } from '../../../../formHelper';
import { getLangKey } from '@shared/i18n';
import FieldType from '../FieldType';
import FieldAttributes from '../FieldAttributes';

import MultiLanguageInput from '@shared/components/UI/MultiLanguage/Input';
import { fieldAttributes, fieldPermissions, fieldTypes } from '@app/pages/FranchiseConfigType/constants';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

const { Text } = Typography;

const ConfigField = ({
  id,
  formik,
  index,
  isPending,
  mode = 'edit',
  onActiveFieldChange,
  addNewFieldHandler,
  onReorder,
  onDelete,
  isFormEditing,
  isFlaggedForDeletion,
  isFresh,
  isEditable,
}) => {
  const theme = useTheme();
  const classes = useStyles();
  const { t } = useTranslation('franchiseConfigType');
  const ref = useRef(null);
  const { canAccess } = usePermission();
  const hasDeleteConfigTypeAccess = canAccess(permKey.PAGE_FRANCHISE_CONFIG_TYPE_DETAIL_COMPONENT_DELETE);

  /**
     * This state is required to keep track of the current field data and revert back to it if the user cancels the changes
     */
  const [currentData, setCurrentData] = useState(formik.values.fields[index]);

  const { values, errors, setFieldValue, validateForm } = formik;

  /**
     * Focus on the field on the first render
     */
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  /**
     * This function is called when the user confirms the changes to the field
     */
  const handleConfirmChanges = async () => {
    // We need to get "label" from formik and include in currentData
    // because we don't have any control over <MultiLanguageInput/> (onChange event does not exist) and it directly sets the value in formik
    const newFieldData = {
      ...currentData,
      label: values.fields[index]?.label,
    };

    // First wait for formik to complete setting the new values
    await setFieldValue(['fields', index], newFieldData);

    // Then validate the form
    validateForm().then(formErrors => {
      const fieldErrors = get(formErrors, `fields[${index}]`);

      // If there are no errors for this specific field, we can collapse the field
      if (fieldErrors === undefined) {
        onActiveFieldChange(null);
      }
    });
  };

  /**
     * Checks whether the field is empty by comparing it with the default values
     * @returns {boolean}
     */
  const isEmptyField = () => {
    return Object.keys(defaultFieldValues).every(key => {
      return formik.values.fields[index][key] === defaultFieldValues[key];
    });
  };

  /**
   * This function is called when the user cancels the changes to the field
   * It will reset the field to the original values or delete it if it's empty
   */
  const handleCancelChanges = () => {
    setCurrentData(formik.values.fields[index]);

    // If the field is empty we can force delete it (bypass marking for deletion on edit page)
    if (isEmptyField()) {
      onDelete(id, true);
    }
    else {
      onActiveFieldChange(null);
    }
  };

  /**
     * This function is called when the user changes the value of an attribute
     * @param {string} fieldName The name of the attribute
     * @param {any} value The new value of the attribute
     */
  const handleAttributeChange = (fieldName, value) => {
    setCurrentData({
      ...currentData,
      [fieldName]: value,
    });
  };

  const getDeleteButtonLabel = () => {
    if (isFormEditing && !isFresh) {
      return isFlaggedForDeletion ? t('FIELD.UNMARK_FOR_DELETION') : t('FIELD.MARK_FOR_DELETION');
    }
    return t('global:DELETE');
  };

  // Summarised View Mode
  if (mode === 'view') {
    const { name, label, type, permissions } = values.fields[index];

    return (
      <div className={`${classes.fieldRow} 
      ${isFlaggedForDeletion && classes.fieldRowFlaggedForDeletion}
      ${!!get(errors, `fields[${index}]`) && classes.fieldRowHasError}`}
      >
        <Row gutter={[theme.spacing(3), theme.spacing(3)]} justify="space-between">
          <Col flex="auto">
            <Row className={classes.fieldRowSummaryContent} gutter={[theme.spacing(3), theme.spacing(3)]}>
              <Col flex="20px">
                <Space direction="vertical" size={theme.spacing(3)}>
                  <Button
                    size="small"
                    type="small"
                    icon={<ArrowUpOutlined />}
                    onClick={() => onReorder(id, 'up')}
                    disabled={isPending || index === 0}
                    title={t('FIELD.MOVE_UP')}
                  />
                  <Button
                    size="small"
                    type="small"
                    icon={(
                      <ArrowDownOutlined />
                    )}
                    onClick={() => onReorder(id, 'down')}
                    disabled={isPending || index === values.fields.length - 1}
                    title={t('FIELD.MOVE_DOWN')}
                  />
                </Space>
              </Col>
              <Col flex="140px">
                <Space direction="vertical">
                  <Text strong>{t('FIELD.NAME')}</Text>
                  <Text code ellipsis>{name}</Text>
                  <Text>{label[getLangKey()]}</Text>
                </Space>
              </Col>
              <Col flex="135px">
                <Space direction="vertical">
                  <Text strong>{t('FIELD.TYPE')}</Text>
                  <FieldType type={type} />
                </Space>
              </Col>
              <Col flex="120px">
                <Space direction="vertical">
                  <Text strong>{t('FIELD.PERMISSIONS')}</Text>
                  { permissions.length ?
                    permissions.map(permission => <Tag>{permission}</Tag>)
                    : <Tag>-</Tag>}
                </Space>
              </Col>
              <Col flex="auto">
                <Space direction="vertical">
                  <Text strong>{t('FIELD.ATTRIBUTES')}</Text>
                  <FieldAttributes attributes={currentData} />
                </Space>
              </Col>
            </Row>
          </Col>
          <Col>
            <Space>

              { (isFresh || (hasDeleteConfigTypeAccess && !isFresh)) && (
                <Button
                  className={classes.buttonDeleteField}
                  type="ghost"
                  onClick={() => onDelete(id)}
                  icon={<DeleteOutlined />}
                  disabled={isPending || !isEditable}
                >
                  {getDeleteButtonLabel()}
                </Button>
              )}

              <Button
                className="button-edit-field"
                type="ghost"
                onClick={() => onActiveFieldChange(id)}
                icon={<EditOutlined />}
                disabled={isPending || !isEditable}
              >
                {t('FIELD.EDIT')}
              </Button>
            </Space>
          </Col>
        </Row>
        <Button
          className={classes.buttonAddField}
          type="primary"
          size="small"
          onClick={() => addNewFieldHandler(id)}
          icon={<PlusOutlined />}
          disabled={isPending}
        >
          {t('FIELD.ADD_NEW_FIELD_HERE')}
        </Button>
      </div>
    );
  }

  // Edit Mode
  return (
    <div className={classes.fieldRow}>
      <Row gutter={[theme.spacing(3)]}>
        {/* Name / Key Input */}
        <Col lg={8} xs={24}>
          <Form.Item
            validateStatus={get(errors, `fields[${index}].name`) ? 'error' : 'success'}
            help={get(errors, `fields[${index}].name`)}
          >
            <Text>{t('FIELD.NAME')}</Text>
            <Input
              className="mt-2"
              value={currentData.name}
              placeholder={t('FIELD.NAME')}
              onChange={e => handleAttributeChange('name', e.target.value)}
              ref={ref}
              disabled={(isFormEditing && !isFresh) || isPending}
            />
          </Form.Item>
        </Col>
        {/* Label Multi Language Input */}
        <Col lg={16} xs={24}>
          <MultiLanguageInput
            name="label"
            label={t('FIELD.LABEL')}
            fieldPath={['fields', index, 'label']}
            formik={formik}
            disabled={isPending}
          />
        </Col>
        {/* Type Dropdown Input */}
        <Col lg={8} xs={24}>
          <Form.Item
            validateStatus={get(errors, `fields[${index}].type`) ? 'error' : 'success'}
            help={get(errors, `fields[${index}].type`)}
          >
            <Text>{t('FIELD.TYPE')}</Text>
            <Select
              className="mt-2 w-100"
              value={currentData.type}
              onChange={value => handleAttributeChange('type', value)}
              options={fieldTypes}
              disabled={(isFormEditing && !isFresh) || isPending}
            />
          </Form.Item>
        </Col>
        {/* Permissions Multi Select Dropdown Input */}
        <Col lg={8} xs={24} offset={8} pull={8}>
          <Form.Item
            validateStatus={get(errors, `fields[${index}].permissions`) ? 'error' : 'success'}
            help={get(errors, `fields[${index}].permissions`)}
          >
            <Text>{t('FIELD.PERMISSIONS')}</Text>
            <Select
              className="mt-2 w-100"
              mode="multiple"
              value={currentData.permissions}
              onChange={options => handleAttributeChange('permissions', options)}
              options={fieldPermissions}
              disabled={isPending}
            />
          </Form.Item>
        </Col>
        {/* Attributes Checkbox Group Input */}
        <Col className="mb-2" span={24}>
          <Row>
            <Col span={24} className="my-2">
              <Text>{t('FIELD.ATTRIBUTES')}</Text>
            </Col>
          </Row>
          <Space wrap>
            {fieldAttributes.map(attribute => (
              <Checkbox
                key={attribute.value}
                value={attribute.value}
                disabled={isPending}
                onChange={e => handleAttributeChange(attribute.value, e.target.checked)}
                checked={currentData[attribute.value]}
              >
                {t(attribute.label)}
              </Checkbox>
            ))}
          </Space>
        </Col>
        {/* Action Buttons */}
        <Col span={24}>
          <Row justify="end">
            <Space>
              { (isFresh || (hasDeleteConfigTypeAccess && !isFresh)) && (
              <Button
                size="small"
                type="ghost"
                danger
                loading={isPending}
                disabled={isPending}
                onClick={() => onDelete(id)}
              >
                {getDeleteButtonLabel()}
              </Button>
              )}
              <Button
                size="small"
                type="ghost"
                loading={isPending}
                disabled={isPending}
                onClick={handleCancelChanges}
              >
                {t('global:CANCEL')}
              </Button>
              <Button
                size="small"
                type="primary"
                loading={isPending}
                disabled={isPending}
                onClick={handleConfirmChanges}
              >
                {t('FIELD.CONFIRM_CHANGES')}
              </Button>
            </Space>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ConfigField;

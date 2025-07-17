import { useState } from 'react';
import { get, isEmpty, uniqueId } from 'lodash';
import { useDispatch } from 'react-redux';
import { Row, Col, Form, Button, Typography, Divider, Input, Empty, Alert } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import Card from '@shared/components/UI/AntCard';
import MultiLanguageInput from '@shared/components/UI/MultiLanguage/Input';
import { Creators as NewCreators } from '../../New/redux/actions';
import { Creators as DetailCreators } from '../../Detail/redux/actions';
import { defaultValues, validationSchema, defaultFieldValues } from '../../formHelper';
import useStyles from './styles';
import ConfigField from './components/ConfigField';
import { transformPayload, getFieldKeysFromFieldIds } from '@app/pages/FranchiseConfigType/utils';

const { Text } = Typography;

const ConfigTypeForm = ({ data, isPending, isEditing = false }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  /**
   * Fields to delete, this is used to keep track of the fields that are deleted on Edit Page
   */
  const [fieldIdsToDelete, setFieldIdsToDelete] = useState([]);

  /**
   * Keeps track of the field that is being edited and expands the field with the id
   */
  const [activeFieldId, setActiveFieldId] = useState(null);

  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: isEmpty(data) ? defaultValues : data,
    validationSchema,
    validateOnChange: false,
    onSubmit: values => {
      /**
       * Payload with omitted field ids and state management keys
       */
      const payload = transformPayload(values, fieldIdsToDelete);

      if (isEditing) {
        const fieldKeysToDelete = getFieldKeysFromFieldIds(values, fieldIdsToDelete);
        dispatch(DetailCreators.updateFranchiseConfigTypeDetailRequest({ ...payload, id: data._id, keys: fieldKeysToDelete }));
      }
      else {
        dispatch(NewCreators.createFranchiseConfigTypeRequest(payload));
      }
    },
  });

  const { handleSubmit, handleChange, values, errors, setFieldValue, validateForm } = formik;
  /**
   * Adds new field to the form after the caller field or at the end of the form
   * @param {string|null} fieldId - id of the caller field
   */
  const addNewField = fieldId => {
    const callerIndex = fieldId ? values.fields.findIndex(field => field.id === fieldId) : values.fields.length - 1;

    const insert = (arr, index, ...newItems) => [
      ...arr.slice(0, index),
      ...newItems,
      ...arr.slice(index),
    ];

    const currentFields = values.fields;

    const newFieldId = uniqueId('field_');
    const newFields = insert(currentFields, callerIndex + 1, { ...defaultFieldValues, id: newFieldId, isFresh: true, isEditable: true });

    setFieldValue('fields', newFields);
    setActiveFieldId(newFieldId);
  };

  const handleReorder = async (fieldId, direction) => {
    const currentIndex = values.fields.findIndex(field => field.id === fieldId);
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    const reorder = (arr, fromIndex, toIndex) => {
      const newArr = [...arr];
      const [item] = newArr.splice(fromIndex, 1);
      newArr.splice(toIndex, 0, item);
      return newArr;
    };

    const newFields = reorder(values.fields, currentIndex, newIndex);
    await setFieldValue('fields', newFields);

    validateForm();
  };

  /**
   * Either deletes the field or marks it for deletion
   * @param {string} fieldId - id of the field to delete
   * @param {boolean} force - if true, deletes the field instead of marking it for deletion
   */
  const handleFieldDelete = async (fieldId, force = false) => {
    // If we are on edit page, instead of deleting the existing fields, we should just mark the field for deletion
    // and send it to the server on submit

    // Also check whether field is newly created or existing one
    const isFreshField = values.fields.find(field => field.id === fieldId).isFresh;

    if (isEditing && !force && !isFreshField) {
      if (fieldIdsToDelete.includes(fieldId)) {
        setFieldIdsToDelete(fieldIdsToDelete.filter(id => id !== fieldId));
      }
      else {
        setFieldIdsToDelete([...fieldIdsToDelete, fieldId]);
      }
    }
    else {
      // First we should wait for formik to complete setting the new values and then validate again
      // Reason is, if user Confirms Changes on an invalid input and then deletes the field
      // UI will show error state on wrong field row

      await setFieldValue('fields', values.fields.filter(field => field.id !== fieldId));
      validateForm();
      setActiveFieldId(null);
    }
  };

  return (
    <Form className={(isPending || activeFieldId !== null) && classes.formIsEditing} onFinish={handleSubmit} disabled={isPending}>
      <Card
        title={isEditing ? t('franchiseConfigType:DETAIL.PAGE_TITLE') : t('franchiseConfigType:NEW.CONFIG_TYPE')}
        extra={(
          <Button
            size="small"
            type="primary"
            loading={isPending}
            disabled={isPending || activeFieldId !== null}
            onClick={() => addNewField()}
          >
            {t('franchiseConfigType:FIELD.ADD_NEW_FIELD')}
          </Button>
        )}
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
        <Row>
          <Col span={24}>
            <Form.Item
              validateStatus={get(errors, 'name') ? 'error' : 'success'}
              help={get(errors, 'name')}
            >
              <Text>{t('franchiseConfigType:NAME')}</Text>
              <Input name="name" onChange={handleChange} value={values.name} placeholder={t('franchiseConfigType:NAME')} disabled={isEditing || isPending} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <MultiLanguageInput
              name="description"
              label={t('DESCRIPTION')}
              fieldPath={['description']}
              formik={formik}
              disabled={isPending}
            />
          </Col>
        </Row>
        <Divider />
        {typeof get(errors, 'fields') === 'string' && activeFieldId === null &&
        (
        <Alert
          message={get(errors, 'fields')}
          type="error"
          showIcon
        />
        )}
        {values.fields.length === 0 && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={t('franchiseConfigType:FIELD.EMPTY')}
          />
        )}
        {values.fields.map((field, index) => (
          <ConfigField
            key={field.id}
            id={field.id}
            index={index}
            formik={formik}
            isPending={isPending}
            onActiveFieldChange={setActiveFieldId}
            addNewFieldHandler={addNewField}
            mode={activeFieldId === field.id ? 'edit' : 'view'}
            isFormEditing={isEditing}
            onReorder={handleReorder}
            onDelete={handleFieldDelete}
            isFlaggedForDeletion={fieldIdsToDelete.includes(field.id)}
            isFresh={field.isFresh}
            isEditable={field.isEditable}
          />
        ))}
      </Card>
    </Form>
  );
};

export default ConfigTypeForm;

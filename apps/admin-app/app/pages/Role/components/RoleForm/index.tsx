import { MouseEvent, useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row, Space, Popconfirm } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { get, isEmpty } from 'lodash';

import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';
import { ROLE_FORM_MODE } from '../../constants';
import { validationSchema } from './formHelpers';
import { getChangedValues } from '../../utils';
import SelectRole from '@shared/containers/Select/Role';

type RoleFormProps = {
  mode: string;
  initialValues: Partial<RoleType>;
  onSuccess: (values: Partial<RoleType>) => void;
  isActionLoading: boolean;
  canAccessActions: boolean;
  initialParentRole?: { value: MongoIDType, label: string };
  onDelete?: (e?: MouseEvent<HTMLElement>) => void;
  isDeleteLoading?: boolean;
  setMode?: (mode: string) => void;
  disabled?: boolean;
}

const RoleForm = ({
  mode,
  initialValues,
  initialParentRole,
  onSuccess,
  onDelete,
  isActionLoading,
  isDeleteLoading,
  setMode,
  canAccessActions,
  disabled,
}: RoleFormProps) => {
  const { t } = useTranslation('rolePage');
  const { Can } = usePermission();

  const [parentRole, setParentRole] = useState(initialParentRole);

  const [form] = Form.useForm();
  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: values => {
      const changedValues = getChangedValues({
        initialValues,
        values,
        isNew: mode === ROLE_FORM_MODE.NEW,
      });

      if (!isEmpty(changedValues) || initialValues.parent !== values.parent) {
        onSuccess(changedValues);
      }
    },
  });

  const formDisabled = mode === ROLE_FORM_MODE.DETAIL || disabled;
  useEffect(() => {
    if (formDisabled) setParentRole(initialParentRole);
  }, [formDisabled, initialParentRole]);

  const { setValues, setFieldValue, setFieldTouched, resetForm, values, errors, touched, handleSubmit } = formik;

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onValuesChange={(changedValues, allValues) => {
        setValues(allValues as Partial<RoleType>);
      }}
      layout="vertical"
      onFinish={handleSubmit}
    >
      <Row gutter={[4, 4]}>
        <Col sm={12} xs={24}>
          <Form.Item
            label={t('NAME_1')}
            name="name"
            help={get(touched, 'name') && get(errors, 'name')}
            validateStatus={get(touched, 'name') && get(errors, 'name') ? 'error' : ''}
          >
            <Input disabled={formDisabled} onBlur={() => setFieldTouched('name', true)} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[4, 4]}>
        <Col sm={12} xs={24}>
          <Form.Item
            label={`${t('DESCRIPTION')} (TR)`}
            name={['description', 'tr']}
            help={get(touched, 'description.tr') && get(errors, 'description.tr')}
            validateStatus={get(touched, 'description.tr') && get(errors, 'description.tr') ? 'error' : ''}
          >
            <Input disabled={formDisabled} onBlur={() => setFieldTouched('description.tr', true)} />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            label={`${t('DESCRIPTION')} (EN)`}
            name={['description', 'en']}
            help={get(touched, 'description.en') && get(errors, 'description.en')}
            validateStatus={get(touched, 'description.en') && get(errors, 'description.en') ? 'error' : ''}
          >
            <Input disabled={formDisabled} onBlur={() => setFieldTouched('description.en', true)} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[4, 4]}>
        <Col sm={12} xs={24}>
          <label style={{ width: '100%' }}>
            {t('PARENT_ROLE')}
          </label>
          <SelectRole
            style={{ width: '100%' }}
            value={parentRole}
            excludedRoles={mode === ROLE_FORM_MODE.NEW ? [] : [initialValues._id]}
            mode="single"
            disabled={formDisabled}
            onChange={(newSelectedRole: { value: MongoIDType, label: string }) => {
              setFieldValue('parent', newSelectedRole?.value);
              setParentRole(newSelectedRole);
            }}
            labelInValue
          />
        </Col>
        {
          (mode === ROLE_FORM_MODE.DETAIL && values.createdAt) && (
            <Col sm={12} xs={24}>
              <Form.Item
                label={t('CREATED_AT')}
              >
                <Input disabled value={moment(values.createdAt).format('YYYY-MM-DD HH:mm')} />
              </Form.Item>
            </Col>
          )
        }
      </Row>
      <Row gutter={[4, 4]} style={{ display: 'flex', flexDirection: 'row-reverse' }}>
        {canAccessActions && getActionButtons()}
      </Row>
    </Form>
  );

  function getActionButtons() {
    if (mode === ROLE_FORM_MODE.DETAIL) {
      return (
        <Space>
          <Button
            htmlType="button"
            type="primary"
            disabled={disabled || isDeleteLoading}
            onClick={() => {
              setMode?.(ROLE_FORM_MODE.EDIT);
            }}
          >
            {t('EDIT')}
          </Button>
          <Can permKey={permKey.PAGE_ROLE_DETAIL_COMPONENT_DELETE_ROLE}>
            <Popconfirm
              onConfirm={onDelete}
              okText={t('button:YES')}
              cancelText={t('button:CANCEL')}
              title={t('CONFIRMATION.DELETE_ROLE')}
            >
              <Button
                htmlType="button"
                danger
                loading={isDeleteLoading}
                disabled={disabled}
              >
                {t('DELETE')}
              </Button>
            </Popconfirm>
          </Can>
        </Space>
      );
    }

    if (mode === ROLE_FORM_MODE.NEW) {
      return (
        <Space>
          <Button
            type="primary"
            htmlType="submit"
            loading={isActionLoading}
          >
            {t('CREATE')}
          </Button>
        </Space>
      );
    }

    return (
      <Space>
        <Button
          onClick={() => {
            setMode?.(ROLE_FORM_MODE.DETAIL);
            form.resetFields();
            resetForm();
          }}
          loading={isActionLoading}
        >
          {t('CANCEL')}
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          loading={isActionLoading}
        >
          {t('SAVE')}
        </Button>
      </Space>
    );
  }
};

export default RoleForm;

RoleForm.defaultProps = {
  initialParentRole: undefined,
  onDelete: undefined,
  isDeleteLoading: false,
  setMode: undefined,
  disabled: false,
};

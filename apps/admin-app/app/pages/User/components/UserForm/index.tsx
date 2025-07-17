import { Button, Checkbox, Col, Form, Input, Row, Select, Space } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { get, isEmpty } from 'lodash';

import { countriesSelector } from '@shared/redux/selectors/common';
import { USER_FORM_MODE } from '../../constants';
import { validationSchema } from './formHelpers';
import { getChangedValues } from '../../utils';
import { getSelectFilterOption } from '@shared/utils/common';
import { getCountryOptions } from '@shared/utils/formHelper';

type UserFormProps = {
  mode: string;
  initialValues: UserType;
  onSuccess: (values: Partial<UserType>) => void;
  isActionLoading: boolean;
  setMode?: (mode: string) => void | undefined;
  canAccessActions: boolean;
  disabled?: boolean | undefined;
}

const UserForm = ({
  mode,
  initialValues,
  onSuccess,
  isActionLoading,
  setMode,
  canAccessActions,
  disabled,
}: UserFormProps) => {
  const { t } = useTranslation('userPage');

  const allCountries = useSelector(countriesSelector.getData) as ICountry[];
  const countryOptions = getCountryOptions(allCountries, { showOldCountries: true });

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
        isNew: mode === USER_FORM_MODE.NEW,
      });

      if (!isEmpty(changedValues)) {
        onSuccess(changedValues);
      }
    },
  });

  const { setFieldValue, setFieldTouched, resetForm, values, errors, touched, handleSubmit } = formik;

  const formDisabled = mode === USER_FORM_MODE.DETAIL || disabled;

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onValuesChange={changedValues => {
        const changedKey = Object.keys(changedValues)[0];
        setFieldValue(changedKey, changedValues[changedKey]);

        if (changedKey === 'hasGlobalAccess' && changedValues[changedKey] === true) {
          setFieldValue('countries', []);
          form.setFieldsValue({ countries: [] });
        }
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
        <Col sm={12} xs={24}>
          <Form.Item
            label={t('EMAIL')}
            name="email"
            help={get(touched, 'email') && get(errors, 'email')}
            validateStatus={get(touched, 'email') && get(errors, 'email') ? 'error' : ''}
          >
            <Input disabled={formDisabled} onBlur={() => setFieldTouched('email', true)} />
          </Form.Item>

        </Col>
      </Row>
      <Row gutter={[4, 4]}>
        <Col sm={2} xs={6}>
          <Form.Item
            label={t('GLOBAL_ACCESS')}
            name="hasGlobalAccess"
            valuePropName="checked"
          >
            <Checkbox disabled={formDisabled} />
          </Form.Item>
        </Col>
        <Col sm={10} xs={18}>
          <Form.Item
            label={t('COUNTRIES')}
            name="countries"
          >
            <Select
              mode="multiple"
              disabled={formDisabled ?? values.hasGlobalAccess}
              options={countryOptions}
              showSearch
              filterOption={getSelectFilterOption}
            />

          </Form.Item>
        </Col>
        {
          (mode === USER_FORM_MODE.DETAIL && values.createdAt) && (
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
    if (mode === USER_FORM_MODE.DETAIL) {
      return (
        <Space>
          <Button
            htmlType="button"
            type="primary"
            disabled={disabled}
            onClick={() => {
              setMode?.(USER_FORM_MODE.EDIT);
            }}
          >
            {t('EDIT')}
          </Button>
        </Space>
      );
    }

    if (mode === USER_FORM_MODE.NEW) {
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
            setMode?.(USER_FORM_MODE.DETAIL);
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

export default UserForm;

UserForm.defaultProps = {
  setMode: undefined,
  disabled: false,
};

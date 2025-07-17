// library imports
import { useEffect, useCallback, memo, useState } from 'react';
// import { useDispatch } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Row, Col, Input, Button, Checkbox, Space, Badge } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { get, pick, isEmpty } from 'lodash';
import { useTheme } from 'react-jss';

// shared imports
import AntCard from '@shared/components/UI/AntCard';
import { validate } from '@shared/yup';

// local imports
import { businessConfigUpdateTypes } from '@app/pages/Market/BusinessConfig/constants';
import { Creators } from '@app/pages/Market/BusinessConfig/redux/actions';
import {
  getInitialValues,
  manipulateValuesAfterSubmit,
  globalConfigValidationSchema,
  countryBasedConfigValidationSchema,
} from './formHelper';
import {
  marketBusinessConfigsSelector,
  businessConfigSelector,
  businessCustomConfigSelector,
} from '@app/pages/Market/BusinessConfig/redux/selectors';

const MessageConfigDisplayEdit = ({
  businessConfigUpdateType = '',
  isEditEligible = false,
  formId = '',
  configUnit = '',
  languages = [],
}) => {
  const { t } = useTranslation(['businessConfig', 'global']);
  const [form] = Form.useForm();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [isFormEditable, setIsFormEditable] = useState(false);

  const formConfigKey = configUnit && configUnit.split('-')[1];
  const isFormGlobal = businessConfigUpdateType && businessConfigUpdateType === businessConfigUpdateTypes.GLOBAL;
  const validationSchema = isFormGlobal ? globalConfigValidationSchema : countryBasedConfigValidationSchema;
  const { configs } = useSelector(marketBusinessConfigsSelector.getData);

  const isPendingForGettingConfigs = useSelector(marketBusinessConfigsSelector.getIsPending);
  const isPendingForUpdatingConfig = useSelector(businessConfigSelector.getIsPending);
  const isPendingForUpdatingCustomConfig = useSelector(businessCustomConfigSelector.getIsPending);
  const isUpdatePending = isPendingForUpdatingConfig || isPendingForUpdatingCustomConfig;

  const [configRawData] = !isPendingForGettingConfigs && !isEmpty(configs) && configs.filter(config => config.key === formConfigKey);
  const configData = isFormGlobal ?
    pick(configRawData, ['key', 'type', 'value', 'isCustomEnabled']) :
    pick(configRawData, ['key', 'customValue']);

  const formik = useFormik({
    initialValues: getInitialValues({
      config: configData,
      isGlobal: isFormGlobal,
      configEligibleLanguages: languages,
    }),
    validate: validate(validationSchema),
    onSubmit: values => {
      const body = manipulateValuesAfterSubmit({ values, businessConfigUpdateType, formConfigKey });
      if (businessConfigUpdateType === businessConfigUpdateTypes.GLOBAL) {
        dispatch(Creators.updateBusinessConfigValueRequest({ configBody: body }));
      }

      if (businessConfigUpdateType === businessConfigUpdateTypes.COUNTRY_BASED) {
        dispatch(Creators.updateBusinessConfigCustomValueRequest({ configCustomBody: body }));
      }
      setIsFormEditable(false);
    },
  });

  const { handleSubmit, values, errors, setFieldValue } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  const handleLanguageInput = useCallback(
    event => {
      const value = get(event, 'target.value', '');
      setFieldValue(`${event.target.getAttribute('id')}`, value);
    },
    [setFieldValue],
  );

  const onCustomEnabledChange = useCallback(
    event => {
      const isChecked = get(event, 'target.checked', false);
      setFieldValue('isCustomEnabled', isChecked);
    },
    [setFieldValue],
  );

  const handleCancelClick = () => {
    setIsFormEditable(false);
  };

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  const FooterSaveButton = memo(() => {
    return (
      <Row justify="end" gutter={[theme.spacing(2)]}>
        {isFormEditable ? (
          <>
            <Col>
              <Form.Item className="mb-0 mt-0">
                <Button size="small" onClick={handleCancelClick}>
                  {t('button:CANCEL')}
                </Button>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item className="mb-0 mt-0">
                <Button
                  size="small"
                  form={formId}
                  type="primary"
                  htmlType="submit"
                  loading={isUpdatePending}
                >
                  {t('button:SAVE')}
                </Button>
              </Form.Item>
            </Col>
          </>
        ) : (
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button size="small" onClick={handleEditClick}>
                {t('button:EDIT')}
              </Button>
            </Form.Item>
          </Col>
        )}
      </Row>
    );
  });

  return (
    <AntCard
      footer={isEditEligible && <FooterSaveButton updateType={businessConfigUpdateType} />}
      bordered
      title={(
        <Space>
          {t(`${businessConfigUpdateType}`)}
          <Badge status={isEditEligible ? 'success' : 'error'} />
        </Space>
      )}
    >
      <Form
        form={form}
        id={formId}
        onFinish={handleSubmit}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        labelAlign="left"
        colon={false}
      >
        <Row align="bottom">
          <Col span={24}>
            {isFormGlobal && (
              <Form.Item
                help={get(errors, 'isCustomEnabled')}
                validateStatus={get(errors, 'isCustomEnabled') ? 'error' : 'success'}
                name="isCustomEnabled"
                label={t('IS_CUSTOM_ENABLED')}
              >
                <Checkbox
                  autoComplete="off"
                  disabled={isUpdatePending || !isFormEditable}
                  checked={values.isCustomEnabled}
                  onChange={onCustomEnabledChange}
                />
              </Form.Item>
            )}
            {languages && languages.map(language => {
              return (
                <Form.Item
                  key={language}
                  help={get(errors, `${language}`)}
                  validateStatus={get(errors, `${language}`) ? 'error' : 'success'}
                  name={[`${language}`]}
                  label={`${language.toUpperCase()}`}
                >
                  <Input
                    value={values[`${language}`]}
                    onChange={handleLanguageInput}
                    disabled={isUpdatePending || !isFormEditable}
                    autoComplete="off"
                  />
                </Form.Item>
              );
            })}
          </Col>
        </Row>
      </Form>
    </AntCard>
  );
};

export default MessageConfigDisplayEdit;

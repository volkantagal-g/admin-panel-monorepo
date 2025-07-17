// library imports
import { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Row, Col, Button, Checkbox, Space, Badge, InputNumber } from 'antd';
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
import { marketBusinessConfigsSelector } from '@app/pages/Market/BusinessConfig/redux/selectors';

// this component is exported outside the parent component definition in a hurry, so don't mind the weird param names
const FooterSaveButton = ({ isFormEditable, handleCancelClick, t, formId, isUpdatePending, handleEditClick }) => {
  const theme = useTheme();

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
};

const AggressionLevelConfigDisplayEdit = ({
  businessConfigUpdateType = '',
  isEditEligible = false,
  formId = '',
  configUnit = '',
}) => {
  const { t } = useTranslation(['businessConfig', 'global']);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [isFormEditable, setIsFormEditable] = useState(false);
  const isUpdatePending = false;

  const formConfigKey = configUnit && configUnit.split('-')[1];
  const isFormGlobal = businessConfigUpdateType && businessConfigUpdateType === businessConfigUpdateTypes.GLOBAL;
  const validationSchema = isFormGlobal ? globalConfigValidationSchema : countryBasedConfigValidationSchema;
  const { configs } = useSelector(marketBusinessConfigsSelector.getData);
  const isPendingForGettingConfigs = useSelector(marketBusinessConfigsSelector.getIsPending);

  const [configRawData] = !isPendingForGettingConfigs && !isEmpty(configs) && configs.filter(config => config.key === formConfigKey);
  const configData = isFormGlobal ?
    pick(configRawData, ['key', 'type', 'value', 'isCustomEnabled']) :
    pick(configRawData, ['key', 'customValue']);

  const formik = useFormik({
    initialValues: getInitialValues({
      config: configData,
      isGlobal: isFormGlobal,
    }),
    validate: validate(validationSchema),
    onSubmit: values => {
      const body = manipulateValuesAfterSubmit({ __v: get(configRawData, '__v'), values, businessConfigUpdateType, formConfigKey });
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

  const onCustomEnabledChange = useCallback(event => {
    const isChecked = get(event, 'target.checked', false);
    setFieldValue('isCustomEnabled', isChecked);
  }, [setFieldValue]);

  const onIsActiveChange = useCallback(event => {
    const isChecked = get(event, 'target.checked', false);
    setFieldValue('isActive', isChecked);
  }, [setFieldValue]);

  const onAgressionLevelChange = useCallback(value => {
    setFieldValue('aggressionLevel', value);
  }, [setFieldValue]);

  const onSameAggressionLevelActiveChange = useCallback(event => {
    const isChecked = get(event, 'target.checked', false);
    setFieldValue('isSameAggressionLevelActive', isChecked);
  }, [setFieldValue]);

  const handleCancelClick = () => {
    setIsFormEditable(false);
  };

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  return (
    <AntCard
      footer={
        isEditEligible && (
          <FooterSaveButton
            isFormEditable={isFormEditable}
            handleCancelClick={handleCancelClick}
            t={t}
            formId={formId}
            isUpdatePending={isUpdatePending}
            handleEditClick={handleEditClick}
          />
        )
      }
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
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 12 }}
        labelAlign="left"
        colon={false}
      >
        <Row align="bottom">
          <Col span={24}>
            {isFormGlobal && (
              <Form.Item
                help={get(errors, 'isCustomEnabled')}
                validateStatus={get(errors, 'isCustomEnabled') ? 'error' : 'success'}
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
            <Form.Item
              help={get(errors, 'isActive')}
              validateStatus={get(errors, 'isActive') ? 'error' : 'success'}
              label={t('IS_ACTIVE')}
            >
              <Checkbox
                autoComplete="off"
                disabled={isUpdatePending || !isFormEditable}
                checked={values.isActive}
                onChange={onIsActiveChange}
              />
            </Form.Item>
            <Form.Item
              help={get(errors, 'aggressionLevel')}
              validateStatus={get(errors, 'aggressionLevel') ? 'error' : 'success'}
              label={t('AGGRESSION_LEVEL')}
            >
              <InputNumber
                min={1}
                max={5}
                defaultValue={values.aggressionLevel}
                onChange={onAgressionLevelChange}
                disabled={isUpdatePending || !isFormEditable}
              />
            </Form.Item>
            {!isFormGlobal && (
              <Form.Item
                help={get(errors, 'isSameAggressionLevelActive')}
                validateStatus={get(errors, 'isSameAggressionLevelActive') ? 'error' : 'success'}
                label={t('IS_SAME_AGGRESSION_LEVEL_ACTIVE')}
              >
                <Checkbox
                  autoComplete="off"
                  disabled={isUpdatePending || !isFormEditable}
                  checked={values.isSameAggressionLevelActive}
                  onChange={onSameAggressionLevelActiveChange}
                />
              </Form.Item>
            )}
          </Col>
        </Row>
      </Form>
    </AntCard>
  );
};

export default AggressionLevelConfigDisplayEdit;

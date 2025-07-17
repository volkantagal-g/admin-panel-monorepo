import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Alert, Button, Input, Select, Typography, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get } from 'lodash';

import Card from '@shared/components/UI/AntCard';
import { CONFIG_TYPES } from '@app/pages/Config/constants';
import { validate } from '@shared/yup';

import { getBaseInputComponent, getConfigTypeSelectOptions, getInputType, getParsedValueByType } from '../../../utils';
import { Creators } from '../../redux/actions';
import { createConfigSelector } from '../../redux/selectors';
import { defaultValues, validationSchema } from './formHelper';

const configTypeSelectOptions = getConfigTypeSelectOptions();
const { Text } = Typography;

const NewConfigForm = () => {
  const { t } = useTranslation(['global', 'configPage']);

  const dispatch = useDispatch();
  const isPending = useSelector(createConfigSelector.getIsPending);

  const [form] = Form.useForm();
  const formik = useFormik({
    validateOnChange: true,
    validate: validate(validationSchema),
    initialValues: defaultValues,
    onSubmit: formValues => {
      const value = getParsedValueByType({ value: formValues.value, type: formValues.type });
      dispatch(Creators.createConfigRequest({
        configType: formValues.type,
        key: formValues.key,
        value,
        description: formValues.description,
        responsibleSquad: formValues.responsibleSquad,
      }));
    },
  });

  const { handleSubmit, values, errors, touched, setFieldValue, setFieldTouched } = formik;

  const getHandleBlur = fieldName => {
    return () => setFieldTouched(fieldName);
  };

  const handleTypeChange = type => {
    setFieldValue('type', type);
    if (type === CONFIG_TYPES.BOOLEAN) {
      setFieldValue('value', false);
    }
    else {
      setFieldValue('value', undefined);
    }
  };

  let valueInputComponent = null;
  if (values.type) {
    const inputType = getInputType({ type: values.type });
    valueInputComponent = getBaseInputComponent({
      inputType,
      value: undefined,
      isDisabled: false,
      onChange: value => setFieldValue('value', value),
      onBlur: () => setFieldTouched('value'),
    });
  }

  return (
    <Form form={form}>
      <Card
        footer={(
          <Button
            size="small"
            type="primary"
            loading={isPending}
            onClick={handleSubmit}
          >
            {t('button:SAVE')}
          </Button>
        )}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Text>{t('configPage:KEY')}</Text>
            <Form.Item
              help={get(touched, 'key') && get(errors, 'key')}
              validateStatus={get(touched, 'key') && get(errors, 'key') ? 'error' : 'success'}
              name="key"
              className={get(touched, 'key') && get(errors, 'key') ? '' : 'mb-2'}
            >
              <Input
                value={values.key}
                onChange={event => {
                  const value = get(event, 'target.value', '');
                  setFieldValue('key', value);
                }}
                onBlur={getHandleBlur('key')}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Alert message={t('configPage:WARNING_CONFIG_KEY_CONVENTION')} type="warning" />
          </Col>
          <Col span={24}>
            <Text>{t('configPage:SHORT_DESCRIPTION')}</Text>
            <Form.Item
              help={get(touched, 'description') && get(errors, 'description')}
              validateStatus={get(touched, 'description') && get(errors, 'description') ? 'error' : 'success'}
              name="description"
              className={get(touched, 'description') && get(errors, 'description') ? '' : 'mb-2'}
            >
              <Input
                value={values.description}
                onChange={event => {
                  const value = get(event, 'target.value', '');
                  setFieldValue('description', value);
                }}
                onBlur={getHandleBlur('description')}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Alert message={t('configPage:NOTICE_INFO_IN_ENGLISH')} type="info" />
          </Col>
          <Col span={24}>
            <Text>{t('configPage:RESPONSIBLE_SQUAD')}</Text>
            <Form.Item
              help={get(touched, 'responsibleSquad') && get(errors, 'responsibleSquad')}
              validateStatus={get(touched, 'responsibleSquad') && get(errors, 'responsibleSquad') ? 'error' : 'success'}
              name="responsibleSquad"
              className={get(touched, 'responsibleSquad') && get(errors, 'responsibleSquad') ? '' : 'mb-2'}
            >
              <Input
                value={values.responsibleSquad}
                onChange={event => {
                  const value = get(event, 'target.value', '');
                  setFieldValue('responsibleSquad', value);
                }}
                onBlur={getHandleBlur('responsibleSquad')}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Text>{t('global:TYPE')}</Text>
            <Form.Item
              help={get(touched, 'type') && get(errors, 'type')}
              validateStatus={get(touched, 'type') && get(errors, 'type') ? 'error' : 'success'}
              name="type"
              className={get(touched, 'type') && get(errors, 'type') ? '' : 'mb-2'}
            >
              <Select
                value={values.type}
                options={configTypeSelectOptions}
                autoComplete="off"
                className="w-100"
                onChange={handleTypeChange}
                onBlur={getHandleBlur('type')}
              />
            </Form.Item>
          </Col>
          {
            values.type && (
            <Col span={24}>
              <Text>{t('global:VALUE')}</Text>
              <br />
              <Form.Item
                help={get(touched, 'value') && get(errors, 'value')}
                validateStatus={get(touched, 'value') && get(errors, 'value') ? 'error' : 'success'}
                name="value"
                className={get(touched, 'value') && get(errors, 'value') ? '' : 'mb-2'}
              >
                {valueInputComponent}
              </Form.Item>
            </Col>
            )
          }
        </Row>
      </Card>
    </Form>
  );
};

export default NewConfigForm;

import { Button, Checkbox, Col, Form, Input, Row, Select } from 'antd';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import { CloseOutlined } from '@ant-design/icons';

import { getSelectFilterOption } from '@shared/utils/common';

import { PARAMETER_TYPE } from '../../../constants';
import DropDownExtra from './DropDownExtra';
import useStyles from './styles';

const parameterTypeOptions = Object.values(PARAMETER_TYPE).map(type => {
  return {
    value: type,
    label: type,
  };
});

export default function ParameterInput({ antdFieldName, formikFieldName, formik, getHandleChange, getHandleBlur, isReadonly, onClose }) {
  const { t } = useTranslation('reportsPage');
  const classes = useStyles();
  const { values, errors, touched } = formik;

  const getFormikFieldName = (parentFieldName, childFieldName) => `${parentFieldName}.${childFieldName}`;
  const getValidateStatus = fieldName => (
    get(touched, getFormikFieldName(formikFieldName, fieldName)) && get(errors, getFormikFieldName(formikFieldName, fieldName))
      ? 'error'
      : 'success'
  );

  const getHelp = fieldName => get(touched, getFormikFieldName(formikFieldName, fieldName)) && get(errors, getFormikFieldName(formikFieldName, fieldName));

  return (
    <Col sm={12} xs={24}>
      <div className={classes.parameterBox}>
        {!isReadonly && (
          <Row className={classes.parameterHeader}>
            <Button danger onClick={onClose}>
              <CloseOutlined height="12px" />
            </Button>
          </Row>
        )}
        <Row gutter={[2, 2]}>
          <Col span={12}>
            <Form.Item
              label={t('VARIABLE_TYPE')}
              name={[...antdFieldName, 'type']}
              help={getHelp('type')}
              validateStatus={getValidateStatus('type')}
              className={classes.formItem}
            >
              <Select
                value={get(values, getFormikFieldName(formikFieldName, 'type'))}
                options={parameterTypeOptions}
                placeholder={t('VARIABLE_TYPE')}
                onChange={getHandleChange(getFormikFieldName(formikFieldName, 'type'), 'select')}
                onBlur={getHandleBlur(getFormikFieldName(formikFieldName, 'type'))}
                optionFilterProp="label"
                filterOption={getSelectFilterOption}
                showSearch
                disabled={isReadonly}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t('VARIABLE_NAME')}
              name={[...antdFieldName, 'variableName']}
              help={getHelp('variableName')}
              validateStatus={getValidateStatus('variableName')}
              className={classes.formItem}
            >
              <Input
                value={get(values, getFormikFieldName(formikFieldName, 'variableName'))}
                type="text"
                placeholder={t('VARIABLE_NAME')}
                onChange={getHandleChange(getFormikFieldName(formikFieldName, 'variableName'))}
                onBlur={getHandleBlur(getFormikFieldName(formikFieldName, 'variableName'))}
                readOnly={isReadonly}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[2, 2]}>
          <Col span={12}>
            <Form.Item
              label={`${t('PARAMETER_NAME')} (TR)`}
              name={[...antdFieldName, 'name', 'tr']}
              help={getHelp('name.tr')}
              validateStatus={getValidateStatus('name.tr')}
              className={classes.formItem}
            >
              <Input
                value={get(values, getFormikFieldName(formikFieldName, 'name.tr'))}
                type="text"
                placeholder={`${t('PARAMETER_NAME')} (TR)`}
                onChange={getHandleChange(getFormikFieldName(formikFieldName, 'name.tr'))}
                onBlur={getHandleBlur(getFormikFieldName(formikFieldName, 'name.tr'))}
                readOnly={isReadonly}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={`${t('PARAMETER_NAME')} (EN)`}
              name={[...antdFieldName, 'name', 'en']}
              help={getHelp('name.en')}
              validateStatus={getValidateStatus('name.en')}
              className={classes.formItem}
            >
              <Input
                value={get(values, getFormikFieldName(formikFieldName, 'name.en'))}
                type="text"
                placeholder={`${t('PARAMETER_NAME')} (EN)`}
                onChange={getHandleChange(getFormikFieldName(formikFieldName, 'name.en'))}
                onBlur={getHandleBlur(getFormikFieldName(formikFieldName, 'name.en'))}
                readOnly={isReadonly}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[2, 2]}>
          <Col span={12}>
            <Form.Item label={t('IS_OPTIONAL')} name={[...antdFieldName, 'isOptional']}>
              <Checkbox
                checked={get(values, getFormikFieldName(formikFieldName, 'isOptional'))}
                onChange={getHandleChange(getFormikFieldName(formikFieldName, 'isOptional'), 'checkbox')}
                onBlur={getHandleBlur(getFormikFieldName(formikFieldName, 'isOptional'))}
                disabled={isReadonly}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            {get(values, getFormikFieldName(formikFieldName, 'type')) === PARAMETER_TYPE.dropdown && (
              <Form.Item label={t('IS_MULTISELECT')} name={[...antdFieldName, 'isMultiSelect']}>
                <Checkbox
                  checked={get(values, getFormikFieldName(formikFieldName, 'isMultiSelect'))}
                  onChange={getHandleChange(getFormikFieldName(formikFieldName, 'isMultiSelect'), 'checkbox')}
                  onBlur={getHandleBlur(getFormikFieldName(formikFieldName, 'isMultiSelect'))}
                  disabled={isReadonly}
                />
              </Form.Item>
            )}
          </Col>
          <Col span={24}>
            {get(values, getFormikFieldName(formikFieldName, 'type')) === PARAMETER_TYPE.date && (
              <Row>
                <Col span={12}>
                  <Form.Item label={t('INCLUDE_CURRENT_DAY')} name={[...antdFieldName, 'includeCurrentDay']}>
                    <Checkbox
                      checked={get(values, getFormikFieldName(formikFieldName, 'includeCurrentDay'))}
                      onChange={getHandleChange(getFormikFieldName(formikFieldName, 'includeCurrentDay'), 'checkbox')}
                      onBlur={getHandleBlur(getFormikFieldName(formikFieldName, 'includeCurrentDay'))}
                      disabled={isReadonly || get(values, getFormikFieldName(formikFieldName, 'isFutureDatesEnabled'))}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={t('SELECT_FUTURE_DATES')} name={[...antdFieldName, 'isFutureDatesEnabled']}>
                    <Checkbox
                      checked={get(values, getFormikFieldName(formikFieldName, 'isFutureDatesEnabled'))}
                      onChange={getHandleChange(getFormikFieldName(formikFieldName, 'isFutureDatesEnabled'), 'checkbox')}
                      onBlur={getHandleBlur(getFormikFieldName(formikFieldName, 'isFutureDatesEnabled'))}
                      disabled={isReadonly || get(values, getFormikFieldName(formikFieldName, 'includeCurrentDay'))}
                    />
                  </Form.Item>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
        {get(values, getFormikFieldName(formikFieldName, 'type')) === PARAMETER_TYPE.dropdown && (
          <DropDownExtra
            formik={formik}
            getHandleBlur={getHandleBlur}
            getHandleChange={getHandleChange}
            antdFieldName={antdFieldName}
            formikFieldName={formikFieldName}
            isReadonly={isReadonly}
          />
        )}
      </div>
    </Col>
  );
}

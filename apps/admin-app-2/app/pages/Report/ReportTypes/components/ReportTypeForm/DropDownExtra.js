import { CloseOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';

import { getSelectFilterOption } from '@shared/utils/common';

import { DROPDOWN_OPTION_TYPE } from '../../../constants';
import { getInitialDropdownValues } from './formUtils';
import useStyles from './styles';

const dropdownOptionTypeOptions = Object.values(DROPDOWN_OPTION_TYPE);
const getFormikFieldName = (parentFieldName, childFieldName) => `${parentFieldName}.${childFieldName}`;

export default function DropDownExtra({ formik, getHandleBlur, getHandleChange, antdFieldName, formikFieldName, isReadonly }) {
  const classes = useStyles();
  const { t } = useTranslation('reportsPage');

  const { values, errors, setFieldValue, touched, setFieldTouched, setFieldError } = formik;

  const dropDownOptionsFieldName = getFormikFieldName(formikFieldName, 'dropdownOptions');
  const getValidateStatus = fieldName =>
    get(touched, getFormikFieldName(formikFieldName, fieldName)) && get(errors, getFormikFieldName(formikFieldName, fieldName))
      ? 'error'
      : 'success';

  const getHelp = fieldName =>
    get(touched, getFormikFieldName(formikFieldName, fieldName)) && get(errors, getFormikFieldName(formikFieldName, fieldName));

  return (
    <Col span={24}>
      <Form.Item
        name={[...antdFieldName, 'dropdownOptions']}
        help={
          get(touched, dropDownOptionsFieldName) &&
          // general dropdown errors are string
          typeof get(errors, dropDownOptionsFieldName) === 'string' &&
          get(errors, dropDownOptionsFieldName)
        }
        validateStatus={get(touched, dropDownOptionsFieldName) && get(errors, dropDownOptionsFieldName) ? 'error' : 'success'}
      >
        <b>{t('DROPDOWN_OPTIONS')}</b>
      </Form.Item>
      {get(values, dropDownOptionsFieldName, []).map((option, index) => {
        const optionTypeFormikField = `dropdownOptions[${index}].optionType`;
        const optionNameFormikField = `dropdownOptions[${index}].optionName`;
        const optionValueFormikField = `dropdownOptions[${index}].optionValue`;

        return (
          <Row gutter={[1, 1]} key={option.fakeKey || option.optionName} className={classes.dropDownOptionsRow}>
            <Col span={7}>
              <Form.Item
                label={t('global:NAME')}
                name={[...antdFieldName, 'dropdownOptions', index, 'optionName']}
                help={getHelp(optionNameFormikField)}
                validateStatus={getValidateStatus(optionNameFormikField)}
                className={classes.formItem}
              >
                <Input
                  value={get(values, getFormikFieldName(formikFieldName, optionNameFormikField))}
                  type="text"
                  placeholder={t('VARIABLE_NAME')}
                  onChange={getHandleChange(getFormikFieldName(formikFieldName, optionNameFormikField))}
                  onBlur={getHandleBlur(getFormikFieldName(formikFieldName, optionNameFormikField))}
                  readOnly={isReadonly}
                />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item
                label={t('global:TYPE')}
                name={[...antdFieldName, 'dropdownOptions', index, 'optionType']}
                help={getHelp(optionTypeFormikField)}
                validateStatus={getValidateStatus(optionTypeFormikField)}
                className={classes.formItem}
              >
                <Select
                  value={get(values, getFormikFieldName(formikFieldName, optionTypeFormikField))}
                  options={dropdownOptionTypeOptions}
                  placeholder={t('global:TYPE')}
                  onChange={getHandleChange(getFormikFieldName(formikFieldName, optionTypeFormikField), 'select')}
                  onBlur={getHandleBlur(getFormikFieldName(formikFieldName, optionTypeFormikField))}
                  optionFilterProp="label"
                  filterOption={getSelectFilterOption}
                  showSearch
                  disabled={isReadonly}
                />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item
                label={t('global:VALUE')}
                name={[...antdFieldName, 'dropdownOptions', index, 'optionValue']}
                help={getHelp(optionValueFormikField)}
                validateStatus={getValidateStatus(optionValueFormikField)}
                className={classes.formItem}
              >
                <Input
                  value={get(values, getFormikFieldName(formikFieldName, optionValueFormikField))}
                  type="text"
                  placeholder={t('global:VALUE')}
                  onChange={getHandleChange(getFormikFieldName(formikFieldName, optionValueFormikField))}
                  onBlur={getHandleBlur(getFormikFieldName(formikFieldName, optionValueFormikField))}
                  readOnly={isReadonly}
                />
              </Form.Item>
            </Col>
            {!isReadonly && (
              <Col span={3}>
                <Button
                  size="small"
                  danger
                  onClick={() => {
                    const copiedValues = [...get(values, dropDownOptionsFieldName, [])];
                    const copiedTouched = [...get(touched, dropDownOptionsFieldName, [])];
                    const copiedErrors = [...get(errors, dropDownOptionsFieldName, [])];
                    // remove the element on that index
                    copiedValues.splice(index, 1);
                    copiedTouched.splice(index, 1);
                    copiedErrors.splice(index, 1);
                    setFieldValue(dropDownOptionsFieldName, copiedValues);
                    setFieldTouched(dropDownOptionsFieldName, copiedTouched, false);
                    setFieldError(dropDownOptionsFieldName, copiedErrors);
                  }}
                >
                  <CloseOutlined />
                </Button>
              </Col>
            )}
          </Row>
        );
      })}
      {!isReadonly && (
        <Row>
          <Button
            type="primary"
            size="small"
            onClick={() => {
              const prevOptions = get(values, dropDownOptionsFieldName, []);
              setFieldValue(dropDownOptionsFieldName, [...prevOptions, getInitialDropdownValues()]);
            }}
          >
            {t('ADD_DROPDOWN_OPTION')}
          </Button>
        </Row>
      )}
    </Col>
  );
}

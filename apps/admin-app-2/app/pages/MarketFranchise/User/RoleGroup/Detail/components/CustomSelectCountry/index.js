import { useCallback, useMemo } from 'react';
import { Col, Row, Typography, Checkbox, Space, Divider, Form } from 'antd';
import { useTranslation } from 'react-i18next';

import SelectCountry from '@shared/containers/Select/Country';
import useStyles from './styles';

const { Text } = Typography;

const CustomSelectCountry = ({ isDisabled, formik, form }) => {
  const { t } = useTranslation('marketFranchiseUserRoleGroupPage');
  const classes = useStyles();

  const { values, setFieldValue, errors } = formik;
  const { setFieldsValue } = form;

  const handleCountrySelect = selectedCountries => {
    setFieldValue('countries', selectedCountries);
  };

  const handleGlobalAccessCheckbox = useCallback(event => {
    setFieldValue('hasGlobalAccess', event.target.checked);
    setFieldValue('countries', []);
    setFieldsValue({ countries: [] });
  }, [setFieldValue, setFieldsValue]);

  const globalAccessCheckBox = useMemo(() => {
    return (
      <Checkbox
        checked={values.hasGlobalAccess}
        onChange={handleGlobalAccessCheckbox}
        disabled={isDisabled}
      >
        {t('GLOBAL_ACCESS')}
      </Checkbox>
    );
  }, [handleGlobalAccessCheckbox, values, isDisabled, t]);

  const getSelectCountryRenderMenu = useCallback(({ menu }) => {
    return (
      <>
        <Space className={classes.countryRenderSpace}>
          {globalAccessCheckBox}
        </Space>
        <Divider className={classes.countryRenderDivider} />
        {menu}
      </>
    );
  }, [classes.countryRenderDivider, classes.countryRenderSpace, globalAccessCheckBox]);

  return (
    <Col lg={24} xs={24} className={classes.countryContainer}>
      <Text>{t('COUNTRY')}</Text>
      <Row lg={24} xs={24} className={classes.countryInputsContainer}>
        <Col flex="auto">
          <Form.Item
            help={errors?.countries}
            validateStatus={errors?.countries ? 'error' : 'success'}
            name="countries"
          >
            <SelectCountry
              name="countries"
              mode="multiple"
              value={values.countries}
              disabled={isDisabled || values.hasGlobalAccess}
              onChange={handleCountrySelect}
              dropdownRender={menu => getSelectCountryRenderMenu({ menu })}
            />
          </Form.Item>
        </Col>
        <Col flex="none">
          <Space align="baseline">
            {globalAccessCheckBox}
          </Space>
        </Col>
      </Row>
    </Col>
  );
};

export default CustomSelectCountry;

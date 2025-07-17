import { useState } from 'react';
import { Card, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';

import { InputWrapper, SelectWrapper } from '@shared/components/UI/Form';
import SelectCountryDialingCode from '@shared/components/Select/CountryDialingCode';
import { getLangKey } from '@shared/i18n';
import { RELATION_TYPES } from '@shared/shared/constants';
import { relationTypes } from '@shared/shared/constantValues';
import { getCountryById } from '../../utils';
import { ANT_SPACING_12, DEFAULT_ROW_SPACING } from '../../constants';

function RelativeInformation({
  values = {},
  countries = [],
  handleChange = () => null,
  setFieldValue = () => null,
  errors = {},
  touched = {},
  isPending = false,
}) {
  const { t } = useTranslation('personPage');
  const [country, setCountry] = useState();

  const handleSelectChange = fieldName => {
    return selectedValue => {
      setFieldValue(fieldName, selectedValue);
    };
  };

  const handleCountryChange = countryId => {
    const selectedCountry = getCountryById(countryId, countries);
    setCountry(countryId);
    setFieldValue('relative.countryGsmCode', selectedCountry.dialingCode);
  };

  const renderDialingCodeAddon = () => (
    <SelectCountryDialingCode
      isDisabled
      isFirstOptionSelected={false}
      value={values.relative.countryGsmCode}
    />
  );

  return (
    <Card title={t('RELATIVE.TITLE')}>
      <Row gutter={DEFAULT_ROW_SPACING} align="top">
        <Col span={ANT_SPACING_12}>
          <InputWrapper
            inputKey="relative.name"
            label={t('NAME')}
            value={values.relative.name}
            hasError={get(errors, 'relative.name')}
            isTouched={get(touched, 'relative.name')}
            handleChange={handleChange}
            disabled={isPending}
            setDefaultValue={false}
          />
        </Col>
        <Col span={ANT_SPACING_12}>
          <SelectWrapper
            selectKey="relative.country"
            label={t('COUNTRY')}
            value={country}
            optionsData={countries}
            labelTranslationCallback={name => name[getLangKey()]}
            optionLabelProp="name"
            optionValueProp="_id"
            onChangeCallback={handleCountryChange}
            disabled={isPending}
          />
        </Col>
      </Row>
      <Row gutter={DEFAULT_ROW_SPACING} align="top">
        <Col span={ANT_SPACING_12}>
          <InputWrapper
            inputKey="relative.gsm"
            label={t('GSM')}
            value={values.relative.gsm}
            hasError={get(errors, 'relative.gsm')}
            isTouched={get(touched, 'relative.gsm')}
            handleChange={handleChange}
            additionalProps={{ addonBefore: renderDialingCodeAddon() }}
            disabled={isPending}
            setDefaultValue={false}
          />
        </Col>
        <Col span={ANT_SPACING_12}>
          <SelectWrapper
            selectKey="relative.relation"
            label={t('RELATIVE.RELATION_TYPE')}
            value={values.relation}
            hasError={get(errors, 'relative.relation')}
            isTouched={get(touched, 'relative.relation')}
            optionsData={RELATION_TYPES}
            labelTranslationCallback={relationId => relationTypes[relationId][getLangKey()]}
            onChangeCallback={handleSelectChange('relative.relation')}
            disabled={isPending}
          />
        </Col>
      </Row>
    </Card>
  );
}

export default RelativeInformation;

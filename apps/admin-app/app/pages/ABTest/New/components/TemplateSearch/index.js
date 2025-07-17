import { useCallback } from 'react';
import { Row, Col, Slider } from 'antd';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';

import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { SelectWrapper, InputWrapper } from '@shared/components/UI/Form';
import { VARIATIONS_PERCENTAGE_THRESHOLD } from '@app/pages/ABTest/constants';
import { mappedVariationsCounts, generateVariations } from '@app/pages/ABTest/utils';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';

import { getClientListTemplatesSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';

function TemplateSearch(props) {
  const { t } = useTranslation('abTestingPage');
  const theme = useTheme();
  const dispatch = useDispatch();

  const {
    values,
    errors,
    touched,
    isPending,
    handleFieldChange,
    handlePercentageFieldsChange,
    setFieldValue,
  } = props;

  const handleSearch = useCallback(name => {
    if (name.length < 3) return;
    dispatch(Creators.getClientListTemplatesRequest({ name }));
  }, [dispatch]);

  const { debouncedCallback: debouncedHandleSearch } = useDebouncedCallback({ callback: handleSearch, delay: DEFAULT_DEBOUNCE_MS });

  const templates = useSelector(getClientListTemplatesSelector.getData);
  const templatesIsPending = useSelector(getClientListTemplatesSelector.getIsPending);

  const handleVariationsCount = value => {
    handleFieldChange('variations')(generateVariations(value, false));
    return handleFieldChange('variationsCount')(value);
  };

  const handleVariationsFieldChange = variationFieldName => ({ target: { value } }) => {
    setFieldValue(variationFieldName, value);
  };

  const variationsWrapper = (variation, variationIndex) => {
    const { variationName, variationDescription } = variation;
    return (
      <Row key={`template-variation-${variationIndex}`} gutter={[theme.spacing(3)]} align="bottom">
        <Col span={12}>
          <InputWrapper
            setDefaultValue={false}
            inputKey={['variations', variationIndex, 'variationName']}
            label={`${t('global:VARIATION_AUDIENCE_PREFIX')} ${variationIndex + 1}`}
            value={variationName}
            isTouched={get(touched, `variations[${variationIndex}].variationName`)}
            hasError={get(errors, `variations[${variationIndex}].variationName`)}
            handleChange={handleVariationsFieldChange(`variations[${variationIndex}].variationName`)}
            disabled={isPending}
            additionalProps={{ placeholder: t('VARIATION_NAME') }}
          />
        </Col>
        <Col span={12}>
          <InputWrapper
            setDefaultValue={false}
            inputKey={['variations', variationIndex, 'variationDescription']}
            value={variationDescription}
            isTouched={get(touched, `variations[${variationIndex}].variationDescription`)}
            hasError={get(errors, `variations[${variationIndex}].variationDescription`)}
            handleChange={handleVariationsFieldChange(`variations[${variationIndex}].variationDescription`)}
            disabled={isPending}
            additionalProps={{ placeholder: t('VARIATION_DESCRIPTION') }}
          />
        </Col>
      </Row>
    );
  };

  const sliderMark = (index, value) => (
    <>
      <div>{`${t('global:VARIATION_AUDIENCE_PREFIX')} ${index + 1}`}</div>
      <div>{value}</div>
    </>
  );

  const sliderMarksWrapper = () => ({
    25: {
      style: { color: '#000' },
      label: sliderMark(0, values.controlGroupPercentage),
    },
    75: {
      style: { color: '#000' },
      label: sliderMark(1, values.testGroupPercentage),
    },
  });

  const renderVariations = variations => variations.map(variationsWrapper);

  return (
    <>
      <Row gutter={[theme.spacing(3)]} align="bottom">
        <Col span={12}>
          <SelectWrapper
            selectKey="templateId"
            label={t('TEMPLATE_SEARCH')}
            value={values.templateId}
            optionLabelProp="name"
            optionValueProp="_id"
            hasError={get(errors, 'templateId')}
            isTouched={get(touched, 'templateId')}
            optionsData={templates}
            onChangeCallback={handleFieldChange('templateId')}
            onSearch={debouncedHandleSearch}
          />
        </Col>
        <Col span={12}>
          <SelectWrapper
            selectKey="variationsCount"
            label={t('NUMBER_OF_AUDIENCE')}
            value={values.variationsCount}
            optionLabelProp="label"
            optionValueProp="value"
            hasError={get(errors, 'variationsCount')}
            isTouched={get(touched, 'variationsCount')}
            optionsData={mappedVariationsCounts()}
            onChangeCallback={handleVariationsCount}
            disabled={templatesIsPending}
          />
        </Col>
      </Row>
      {
        values.variationsCount !== VARIATIONS_PERCENTAGE_THRESHOLD ? null :
          (
            <Row gutter={[theme.spacing(3)]} align="bottom">
              <Col span={24}>
                <Slider
                  marks={sliderMarksWrapper(values.controlGroupPercentage, values.testGroupPercentage)}
                  defaultValue={values.controlGroupPercentage}
                  onChange={handlePercentageFieldsChange}
                  step={5}
                />
              </Col>
            </Row>
          )
      }
      {renderVariations(values.variations)}
    </>
  );
}

export default TemplateSearch;

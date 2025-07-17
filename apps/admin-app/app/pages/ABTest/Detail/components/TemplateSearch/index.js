import PropTypes from 'prop-types';
import { Row, Col, Slider } from 'antd';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { get } from 'lodash';

import { SelectWrapper, InputWrapper } from '@shared/components/UI/Form';
import { VARIATIONS_PERCENTAGE_THRESHOLD } from '@app/pages/ABTest/constants';
import { mappedVariationsCounts } from '@app/pages/ABTest/utils';

function TemplateSearch(props) {
  const { t } = useTranslation('abTestingPage');
  const theme = useTheme();
  const {
    values,
    errors,
    touched,
    isPending,
    handlePercentageFieldsChange,
  } = props;

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
            disabled
            additionalProps={{ placeholder: t('VARIATION_NAME') }}
          />
        </Col>
        <Col span={12}>
          <InputWrapper
            setDefaultValue={false}
            inputKey={['variations', variationIndex, 'variationDescription']}
            value={variationDescription}
            disabled
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

  const renderVariations = variations => variations && variations.map(variationsWrapper);

  if (isPending) {
    return null;
  }

  return (
    <>
      <Row gutter={[theme.spacing(3)]} align="bottom">
        <Col span={12}>
          <InputWrapper
            inputKey={['templateId', 'name']}
            label={t('TEMPLATE_SEARCH')}
            value={values.templateId?.name}
            disabled
            setDefaultValue
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
            disabled
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
                  disabled
                />
              </Col>
            </Row>
          )
      }
      {renderVariations(values.variations)}
    </>
  );
}

TemplateSearch.propTypes = {
  isPending: PropTypes.bool,
  handlePercentageFieldsChange: PropTypes.func,
};

TemplateSearch.defaultProps = {
  isPending: false,
  handlePercentageFieldsChange: () => {},
};

export default TemplateSearch;

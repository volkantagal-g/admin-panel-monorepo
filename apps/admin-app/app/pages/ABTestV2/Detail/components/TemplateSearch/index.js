import PropTypes from 'prop-types';
import { Row, Col, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import {
  TextInput,
  FormItem,
  TextEditor,
} from '@shared/components/GUI';
import useStyles from './styles';

import { mappedVariationsCounts } from '@app/pages/ABTestV2/utils';

function TemplateSearch(props) {
  const { t } = useTranslation('abTestingV2Page');
  const theme = useTheme();
  const classes = useStyles();

  const {
    values,
    isPending,
    disabled,
    handleFormValueChange,
    errors,
    testData,
  } = props;

  const variationsWrapper = (variation, variationIndex) => {
    const { variationName, variationDescription, variationMechanism } =
      variation;
    return (
      <>
        <div>{`${t('VARIATION_AUDIENCE_PREFIX')} ${variationIndex + 1}`}</div>
        <Divider className={classes.divider} />
        <Row
          key={`template-variation-${variationIndex}`}
          gutter={[theme.spacing(3)]}
          align="bottom"
          className={classes.row}
        >
          <Col span={8}>
            <FormItem name={['variations', variationIndex, 'variationName']}>
              <TextInput
                label={
                  <span className={classes.label}>{t('VARIATION_NAME')}</span>
                }
                value={variationName}
                defaultValue={variationName}
                disabled
              />
            </FormItem>
          </Col>
          <Col span={8}>
            <TextEditor
              errors={errors}
              name={`${`variations[${variationIndex}].variationMechanism`}`}
              disabled={disabled}
              originalValue={testData.variations[variationIndex]?.variationMechanism}
              value={variationMechanism}
              style={{ height: 120, marginBottom: 24 }}
              onChange={htmlValue => handleFormValueChange(
                ['variations', variationIndex, 'variationMechanism'],
                htmlValue,
              )}
              label={t('WORKING_MECHANISM')}
            />
          </Col>
          <Col span={8}>
            <TextEditor
              errors={errors}
              name={`${`variations[${variationIndex}].variationDescription`}`}
              disabled={disabled}
              originalValue={testData.variations[variationIndex]?.variationDescription}
              value={variationDescription}
              style={{ height: 120, marginBottom: 24 }}
              onChange={htmlValue => handleFormValueChange(
                ['variations', variationIndex, 'variationDescription'],
                htmlValue,
              )}
              label={t('VARIATION_DESCRIPTION')}
            />
          </Col>
        </Row>
      </>
    );
  };

  const renderVariations = variations => variations && variations.map(variationsWrapper);

  if (isPending) {
    return null;
  }

  return (
    <>
      <Row gutter={[theme.spacing(3)]} align="bottom" className={classes.row}>
        <Col span={12}>
          <FormItem
            label={
              <span className={classes.label}>{t('TEMPLATE_SEARCH')}</span>
            }
          >
            <TextInput
              inputKey="templateName"
              value={values.templateName}
              disabled
            />
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={t('NUMBER_OF_AUDIENCE')}>
            <TextInput
              inputKey="variationsCount"
              value={values?.variations?.length}
              optionLabelProp="label"
              optionValueProp="value"
              optionsData={mappedVariationsCounts()}
              disabled
            />
          </FormItem>
        </Col>
      </Row>
      {renderVariations(values?.variations)}
    </>
  );
}

TemplateSearch.propTypes = { isPending: PropTypes.bool };

TemplateSearch.defaultProps = { isPending: false };

export default TemplateSearch;

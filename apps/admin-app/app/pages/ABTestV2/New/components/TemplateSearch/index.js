import { useCallback } from 'react';
import { Row, Col, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { Select, TextInput, FormItem, TextEditor } from '@shared/components/GUI';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { mappedVariationsCounts, generateVariations } from '@app/pages/ABTestV2/utils';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';

import { getClientListTemplatesSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import { getTemplateSearchOptions } from './formHelper';
import useStyles from './styles';

function TemplateSearch(props) {
  const { t } = useTranslation('abTestingV2Page');
  const theme = useTheme();
  const dispatch = useDispatch();
  const classes = useStyles();

  const {
    values,
    isPending,
    handleFieldChange,
    handleFormValueChange,
    errors,
  } = props;

  const handleSearch = useCallback(name => {
    handleFormValueChange('templateId', name);
    if (name.length < 3) return;
    dispatch(Creators.getClientListTemplatesRequest({ name }));
  }, [dispatch, handleFormValueChange]);

  const { debouncedCallback: debouncedHandleSearch } = useDebouncedCallback({ callback: handleSearch, delay: DEFAULT_DEBOUNCE_MS });

  const templates = useSelector(getClientListTemplatesSelector.getData);
  const templatesIsPending = useSelector(getClientListTemplatesSelector.getIsPending);

  const handleVariationsCount = value => {
    handleFieldChange('variations')(generateVariations(value, false));
    return handleFieldChange('variationsCount')(value);
  };

  const handleVariationsFieldChange = variationFieldName => ({ target: { value } }) => {
    handleFormValueChange(variationFieldName, value);
  };

  const variationsWrapper = (variation, variationIndex) => {
    const { variationName, variationDescription, variationMechanism } = variation;
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
            <FormItem
              name={['variations', variationIndex, 'variationName']}
              rules={[{
                validator: async () => {
                  const variationNameList = [];
                  values?.variations?.forEach(element => {
                    if (variationNameList?.includes(element.variationName)) {
                      throw new Error(t('VARIANT_NAME_ALREADY_EXIST'));
                    }
                    variationNameList.push(element.variationName);
                    return Promise.resolve();
                  });
                },
                validationTrigger: 'onBlur, onChange',
              }]}
            >
              <TextInput
                name={`${`variations[${variationIndex}].variationName`}`}
                setDefaultValue={false}
                inputKey={['variations', variationIndex, 'variationName']}
                disabled={isPending}
                value={variationName}
                label={
                  <span className={classes.label}>{t('VARIATION_NAME')}</span>
                }
                onChange={handleVariationsFieldChange(
                  `variations[${variationIndex}].variationName`,
                )}
                autoComplete="off"
              />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              name={['variations', variationIndex, 'variationMechanism']}
            >
              <TextEditor
                errors={errors}
                name={`${`variations[${variationIndex}].variationMechanism`}`}
                disabled={isPending}
                defaultValue={variationMechanism}
                value={variationMechanism}
                style={{ height: 120, marginBottom: 24 }}
                onChange={htmlValue => handleFormValueChange(
                  ['variations', variationIndex, 'variationMechanism'],
                  htmlValue,
                )}
                label={t('WORKING_MECHANISM')}
              />
            </FormItem>
          </Col>
          <Col span={8}>
            <TextEditor
              errors={errors}
              name={`${`variations[${variationIndex}].variationDescription`}`}
              disabled={isPending}
              defaultValue={variationDescription}
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

  const renderVariations = variations => variations.map(variationsWrapper);

  return (
    <>
      <Row gutter={[theme.spacing(3)]} align="bottom" className={classes.row}>
        <Col span={12}>
          <Select
            selectKey="templateId"
            name="templateId"
            errors={errors}
            label={
              <span className={classes.label}>{t('TEMPLATE_SEARCH')}</span>
            }
            value={values.templateId}
            optionsData={getTemplateSearchOptions(templates)}
            onSearch={debouncedHandleSearch}
            onChange={(value, data) => {
              handleFormValueChange('templateId', value);
              handleFormValueChange('templateName', data.label);
            }}
            disabled={isPending}
            loading={templatesIsPending}
            shouldMapOptionsData
            showSearch
          />
        </Col>
        <Col span={12}>
          <Select
            label={
              <span className={classes.label}>{t('NUMBER_OF_AUDIENCE')}</span>
            }
            name="variationsCount"
            errors={errors}
            value={values.variationsCount}
            optionValueProp="value"
            optionsData={mappedVariationsCounts()}
            onChange={handleVariationsCount}
            disabled={templatesIsPending || isPending}
            shouldMapOptionsData
          />
        </Col>
      </Row>
      {renderVariations(values.variations)}
    </>
  );
}

export default TemplateSearch;

import { Row, Col, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { useDispatch } from 'react-redux';
import { get } from 'lodash';
import { FileDoneOutlined } from '@ant-design/icons';

import { SelectWrapper, InputWrapper } from '@shared/components/UI/Form';
import CsvImporter from '@shared/components/UI/CsvImporter';
import { mappedVariationsCounts, generateVariations } from '@app/pages/ABTest/utils';

import { Creators } from '../../redux/actions';
import { exampleCsv } from './config';
import useStyles from './styles';
import { CSV_UPLOAD_TEST_TYPE_MIN_FILE_SIZE } from '@app/pages/ABTest/constants';

function CSVUpload(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation('abTestingPage');
  const classes = useStyles();
  const theme = useTheme();
  const {
    values,
    errors,
    touched,
    isPending,
    handleFieldChange,
    setFieldValue,
    setFieldError,
    setFieldTouched,
  } = props;

  const handleVariationsCount = value => {
    handleFieldChange('variations')(generateVariations(value, true));
    return handleFieldChange('variationsCount')(value);
  };

  const handleVariationsFieldChange = variationFieldName => ({ target: { value } }) => {
    setFieldValue(variationFieldName, value);
  };

  const handleCsvImport = (variationIndex, variationDescription) => (loadedCsvData, _, loadedBase64File) => {
    dispatch(Creators.importVariationsCSVFileRequest({
      fileData: loadedBase64File,
      variationIndex,
      variationDescription,
      totalCount: loadedCsvData.data.length,
      callback: setFieldValue,
    }));
  };
  const handleShowModal = (variationIndex, variationDescription) => () => {
    if ((variationDescription).toString().trim().length === 0) {
      setFieldError(`variations[${variationIndex}].variationDescription`, true);
      setFieldTouched(`variations[${variationIndex}].variationDescription`, true);
    }
  };

  const variationsWrapper = (variation, variationIndex) => {
    const { variationName, variationDescription, variationFileURL } = variation;
    return (
      <Row key={`csv-variation-${variationIndex}`} gutter={[theme.spacing(3)]} align="middle">
        <Col span={12}>
          <InputWrapper
            setDefaultValue={false}
            inputKey={`variations.${variationIndex}.variationName`}
            label={`${t('global:VARIATION_AUDIENCE_PREFIX')} ${variationIndex + 1} ${t('global:NAME')}`}
            value={variationName}
            isTouched={get(touched, `variations[${variationIndex}].variationName`)}
            hasError={get(errors, `variations[${variationIndex}].variationName`)}
            handleChange={handleVariationsFieldChange(`variations[${variationIndex}].variationName`)}
            disabled={isPending}
            additionalProps={{ placeholder: t('VARIATION_NAME') }}
          />
        </Col>
        <Col span={10} className={classes.alignToMiddle}>
          <InputWrapper
            setDefaultValue={false}
            inputKey={`variations.${variationIndex}.variationDescription`}
            value={variationDescription}
            isTouched={get(touched, `variations[${variationIndex}].variationDescription`)}
            hasError={get(errors, `variations[${variationIndex}].variationDescription`)}
            handleChange={handleVariationsFieldChange(`variations[${variationIndex}].variationDescription`)}
            disabled={isPending}
            additionalProps={{ placeholder: t('VARIATION_DESCRIPTION') }}
          />
        </Col>
        <Col span={2}>
          <div className={classes.uploadWrapper}>
            <CsvImporter
              modalProps={{ width: 1000, title: t('global:UPLOAD_CSV_AND_EXECUTE'), okText: t('global:UPLOAD_CSV_AND_EXECUTE') }}
              onOkayClick={handleCsvImport(variationIndex, variationDescription)}
              exampleCsv={exampleCsv}
              handleShowModal={handleShowModal(variationIndex, variationDescription)}
              disabled={!variationDescription}
              warningText={t('CSV_UPLOAD_WARNING')}
            />
            <div>
              {
                variationFileURL && (
                  <Tooltip title={t('UPLOADED_ICON_TOOLTIP', { totalCount: (variation.totalCount || 0) })}>
                    <FileDoneOutlined style={{ fontSize: '22px' }} />
                  </Tooltip>
                )
              }
            </div>
          </div>
        </Col>
      </Row>
    );
  };

  const renderVariations = variations => variations.map(variationsWrapper);

  return (
    <>
      <Row gutter={[theme.spacing(3)]} align="bottom">
        <Col span={12}>
          <SelectWrapper
            selectKey="variationsCount"
            label={t('NUMBER_OF_FILES')}
            value={values.variationsCount}
            optionLabelProp="label"
            optionValueProp="value"
            hasError={get(errors, 'variationsCount')}
            isTouched={get(touched, 'variationsCount')}
            optionsData={mappedVariationsCounts(CSV_UPLOAD_TEST_TYPE_MIN_FILE_SIZE)}
            onChangeCallback={handleVariationsCount}
          />
        </Col>
      </Row>
      {renderVariations(values.variations)}
    </>
  );
}

export default CSVUpload;

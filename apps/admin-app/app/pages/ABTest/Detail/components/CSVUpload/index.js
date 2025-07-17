import PropTypes from 'prop-types';
import { Row, Col, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { FileDoneOutlined } from '@ant-design/icons';

import { SelectWrapper, InputWrapper } from '@shared/components/UI/Form';
import CsvImporter from '@shared/components/UI/CsvImporter';

import { exampleCsv } from './config';
import useStyles from './styles';
import { mappedVariationsCounts } from '@app/pages/ABTest/utils';
import { CSV_UPLOAD_TEST_TYPE_MIN_FILE_SIZE } from '@app/pages/ABTest/constants';

function CSVUpload({ values, isPending }) {
  const { t } = useTranslation('abTestingPage');
  const classes = useStyles();
  const theme = useTheme();

  const getFileTooltip = fileName => {
    return (fileName || '/').split('/')[1];
  };

  const variationsWrapper = (variation, variationIndex) => {
    const { variationName, variationDescription, variationFileURL } = variation;

    return (
      <Row key={`csv-variation-${variationIndex}`} gutter={[theme.spacing(3)]} align="middle">
        <Col span={12}>
          <InputWrapper
            setDefaultValue
            inputKey={`variations[${variationIndex}].variationName`}
            label={`${t('global:VARIATION_AUDIENCE_PREFIX')} ${variationIndex + 1} ${t('global:NAME')}`}
            value={variationName}
            disabled
            additionalProps={{ placeholder: t('VARIATION_NAME') }}
          />
        </Col>
        <Col span={10} className={classes.alignToMiddle}>
          <InputWrapper
            setDefaultValue
            inputKey={`variations[${variationIndex}].variationDescription`}
            value={variationDescription}
            disabled
            additionalProps={{ placeholder: t('VARIATION_DESCRIPTION') }}
          />
        </Col>
        <Col span={2}>
          <div className={classes.uploadWrapper}>
            <CsvImporter
              modalProps={{ width: 1000, title: t('global:UPLOAD_CSV_AND_EXECUTE'), okText: t('global:UPLOAD_CSV_AND_EXECUTE') }}
              exampleCsv={exampleCsv}
              disabled
            />
            <div>
              {
                variationFileURL && (
                  <Tooltip title={getFileTooltip(variationFileURL)}>
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

  if (isPending) {
    return null;
  }

  return (
    <>
      <Col span={12}>
        <SelectWrapper
          selectKey="variationsCount"
          label={t('NUMBER_OF_FILES')}
          value={values.variationsCount}
          optionLabelProp="label"
          optionValueProp="value"
          optionsData={mappedVariationsCounts(CSV_UPLOAD_TEST_TYPE_MIN_FILE_SIZE)}
          disabled
        />
      </Col>
      {renderVariations(values.variations)}
    </>
  );
}

CSVUpload.propTypes = { isPending: PropTypes.bool };

CSVUpload.defaultProps = { isPending: false };

export default CSVUpload;

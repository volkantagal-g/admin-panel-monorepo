import { memo } from 'react';

import { Col, Row, Tooltip } from 'antd';

import { useTranslation } from 'react-i18next';

import { isFinite } from 'lodash';

import { NumberInput, Select } from '@shared/components/GUI';
import { PRODUCT_PACKAGING_TYPE, unitMultipliers } from '@shared/shared/constants';
import useStyles from './styles';
import { getSelectFilterOption } from '@shared/utils/common';

export const PackagingRows = memo(
  function PackagingRows({ title, colId, fieldKey, formik, isImperialUnitUsed, disabled, isBarcodesRow, dimension, imperialTitle, dataTestId }) {
    const { t } = useTranslation('marketProductPageV2');
    const classes = useStyles();
    const packagingTypes = Object.values(PRODUCT_PACKAGING_TYPE);
    const fieldName = dimension ? ['dimension', fieldKey] : [fieldKey];
    const formField = dimension ? `dimension.${fieldKey}` : fieldKey;

    const getFormValue = (packagingType, isImperial) => {
      if (isImperial) {
        return dimension ? formik?.values?.imperialUnits?.[packagingType]?.dimension?.[fieldKey] :
          formik?.values?.imperialUnits?.[packagingType]?.[fieldKey];
      }
      return dimension ? formik?.values?.[packagingType]?.dimension?.[fieldKey] : formik?.values?.[packagingType]?.[fieldKey];
    };

    const handleChangeMetricValue = (value, packagingType) => {
      const newValue = isFinite(value) ? value : null;
      formik?.setFieldValue(`${packagingType}.${formField}`, newValue);
      if (PRODUCT_PACKAGING_TYPE.UNIT === packagingType) {
        formik?.setTouched({ ...formik.touched, [`${packagingType}.${formField}`]: true });
      }
    };

    const handleChangeImperialValue = (value, packagingType) => {
      const imperialValue = isFinite(value) ? value : null;
      const metricValue = isFinite(imperialValue) ? imperialValue * unitMultipliers.inchToCm.multiplier : null;
      formik?.setFieldValue(`imperialUnits.${packagingType}.${formField}`, imperialValue);
      formik?.setFieldValue(`${packagingType}.${fieldKey}`, metricValue);
      if (PRODUCT_PACKAGING_TYPE.UNIT === packagingType) {
        formik?.setTouched({ ...formik.touched, [`${packagingType}.${formField}`]: true });
      }
    };

    if (isBarcodesRow) {
      return (
        <Row gutter={[2, 2]} className="text-center">
          <Col span={4} className={classes.column}>
            {t('PACKAGING_INFO.BARCODES')}
          </Col>
          {packagingTypes.map(packagingType => (
            <Col id={colId} span={5} key={packagingType}>
              <Tooltip
                data-testid="barcode-tooltip"
                placement="bottom"
                title={packagingType === PRODUCT_PACKAGING_TYPE.UNIT && t('PACKAGING_INFO.WARNING_BARCODE')}
              >
                <Select
                  dataTestId={`${packagingType}-barcode-test`}
                  name={[packagingType, 'barcodes']}
                  mode="tags"
                  allowClear
                  value={formik?.values[packagingType].barcodes}
                  onChange={value => {
                    formik?.setFieldValue(`${packagingType}.barcodes`, value);
                  }}
                  disabled={packagingType === PRODUCT_PACKAGING_TYPE.UNIT || disabled}
                  showSearch
                  filterOption={getSelectFilterOption}
                  errors={formik?.errors}
                  usage="table"
                />
              </Tooltip>
            </Col>
          ))}
        </Row>
      );
    }
    return (
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Row gutter={[2, 2]} className="text-center">
            <Col span={4} className={classes.column}>
              {title}
            </Col>
            {packagingTypes.map(packagingType => (
              <Col id={colId} span={5} key={packagingType}>
                <NumberInput
                  data-testid={`${dataTestId}-test`}
                  errors={formik?.errors}
                  name={[packagingType, ...fieldName]}
                  value={getFormValue(packagingType, false)}
                  onChange={value => handleChangeMetricValue(value, packagingType)}
                  disabled={disabled}
                />
              </Col>
            ))}
          </Row>
        </Col>
        {isImperialUnitUsed && (
          <Col span={24}>
            <Row gutter={[2, 2]} className="text-center">
              <Col span={4} className={classes.column}>
                {imperialTitle}
              </Col>
              {packagingTypes.map(packagingType => (
                <Col span={5} key={packagingType}>
                  <NumberInput
                    data-testid={`${dataTestId}-imperial-test`}
                    name={['imperialUnits', packagingType, ...fieldName]}
                    errors={formik?.errors}
                    value={getFormValue(packagingType, true)}
                    onChange={value => handleChangeImperialValue(value, packagingType)}
                    disabled={disabled}
                  />
                </Col>
              ))}
            </Row>
          </Col>

        )}
      </Row>
    );
  },
);

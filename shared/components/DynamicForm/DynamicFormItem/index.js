import { Form, Col, Row, Button } from 'antd';
import { get } from 'lodash';
import moment from 'moment';

import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { uploadToS3 } from '@shared/api/upload';
import { getSelectFilterOption } from '@shared/utils/common';
import { t } from '@shared/i18n';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import useSelectables from '../useSelectables';
import useFilters from '../useFilters';
import { AVAILABLE_INPUT_TYPE } from '../constants';
import CsvImporter from '../../UI/CsvImporter';
import useStyles from './styles';

export default function DynamicFormItem({ config, formik, childDynamicFormItems }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  // each config
  const {
    // required + common
    fieldName,
    inputType,
    label,
    // common
    placeholder,
    disabled,
    readOnly,
    allowClear = true,
    siblingFilterConfigs,
    childFilterConfigs,
    // number specific
    min,
    max,
    // date specific
    dateFormat = 'YYYY-MM-DD',
    showTime = false,
    showNow = false,
    minMaxDate,
    // select specific
    mode = 'single',
    showSearch = true,
    optionFilterProp = 'label',
    maxTagCount = 10,
    showArrow = true,
    initialSelectables,
    mapSelectablesToOptions,
    showSelectAll = false,
    showCsvImport = false,
    // select + csv array
    exampleCsv,
    // csvArrayOfObjects specific
    csvItemToFieldValueFormatter,
    formItemClassName = classes.formItem,
    formItemWrapperClassName = classes.formItemWrapper,
    // s3 specific
    getSignedUrlApi,
    fileName,
  } = config;
  const { values, touched, errors, setFieldValue, setFieldTouched } = formik;

  const { localInitialSelectables, liveSelectables, selectablesLoading, setLiveSelectables } = useSelectables({
    initialSelectables,
    label,
  });

  // turn selectables into options for Select input
  const liveOptions = useMemo(() => {
    if (mapSelectablesToOptions && liveSelectables) {
      return mapSelectablesToOptions(liveSelectables);
    }
    return liveSelectables;
  }, [mapSelectablesToOptions, liveSelectables]);

  const { filterComponents } = useFilters({
    childFilterConfigs: readOnly ? undefined : childFilterConfigs,
    siblingFilterConfigs: readOnly ? undefined : siblingFilterConfigs,
    localInitialSelectables,
    setLiveSelectables,
    formik,
    label,
    fieldName,
    mapSelectablesToOptions,
    childDynamicFormItems,
  });

  const InputComponent = AVAILABLE_INPUT_TYPE[inputType].component;
  const inputProps = getInputProps();

  return (
    <Col sm={12} xs={24} className={classes.dynamicCol}>
      <div className={formItemWrapperClassName}>
        {filterComponents}
        <Row gutter={[2, 2]}>
          <Col span={24}>
            <Form.Item
              label={(
                <>
                  {label}
                  {showCsvImport && <CsvImporter {...getCsvProps(csvItemToFieldValueFormatter)} />}
                  {showSelectAll && (
                    <Button
                      size="small"
                      onClick={handleSelectAll}
                      loading={selectablesLoading}
                      disabled={readOnly || disabled || selectablesLoading}
                    >
                      {t('button:SELECT_ALL')}
                    </Button>
                  )}
                </>
              )}
              name={getAntdFieldNameFromFormikFieldName()}
              help={getHelp()}
              validateStatus={getValidateStatus()}
              className={formItemClassName}
              shouldUpdate
            >
              <InputComponent {...inputProps} />
            </Form.Item>
          </Col>
        </Row>
      </div>
    </Col>
  );

  function getInputProps() {
    const commonProps = {
      onChange: getHandleChange(inputType),
      onBlur: getHandleBlur(),
      disabled,
    };

    switch (inputType) {
      case AVAILABLE_INPUT_TYPE.text.name:
        return {
          ...commonProps,
          value: getValue(),
          type: 'text',
          readOnly,
          placeholder,
        };
      case AVAILABLE_INPUT_TYPE.textArea.name:
        return {
          ...commonProps,
          value: getValue(),
          readOnly,
          placeholder,
        };
      case AVAILABLE_INPUT_TYPE.number.name:
        return {
          ...commonProps,
          value: getValue(),
          type: 'number',
          min,
          max,
          readOnly,
          placeholder,
        };
      case AVAILABLE_INPUT_TYPE.checkbox.name:
        return {
          ...commonProps,
          checked: getValue() || false,
        };
      case AVAILABLE_INPUT_TYPE.date.name:
        return {
          ...commonProps,
          value: getValue(),
          format: dateFormat,
          disabled: disabled || readOnly,
          allowClear,
          showTime,
          showNow,
          disabledDate: selectedDate => {
            const [startLimit, endLimit] = minMaxDate;
            let isAfterStartLimit = true;
            let isBeforeEndLimit = true;
            if (startLimit) {
              isAfterStartLimit = moment(selectedDate).isAfter(moment(startLimit));
            }
            if (endLimit) {
              isBeforeEndLimit = moment(selectedDate).isBefore(endLimit);
            }
            return !isAfterStartLimit || !isBeforeEndLimit;
          },
        };
      case AVAILABLE_INPUT_TYPE.dateRange.name:
        return {
          ...commonProps,
          value: getValue(),
          format: dateFormat,
          disabled: disabled || readOnly,
          allowClear,
          showTime,
          showNow,
        };
      case AVAILABLE_INPUT_TYPE.select.name:
        return {
          ...commonProps,
          value: getValue(),
          placeholder,
          mode,
          showSearch,
          allowClear,
          maxTagCount,
          showArrow,
          loading: selectablesLoading,
          disabled: selectablesLoading || disabled || readOnly,
          options: liveOptions,
          optionFilterProp,
          filterOption: handleFilterOption,
        };
      case AVAILABLE_INPUT_TYPE.csvArrayOfObjects.name:
        return {
          ...getCsvProps(data => data),
          loaded: !!getValue()?.length,
          onDelete: () => setFieldValue(fieldName, []),
        };
      case AVAILABLE_INPUT_TYPE.s3Upload.name:
        return {
          exampleCsv,
          loaded: !!getValue()?.length,
          loadedFile: getValue(),
          onOkayClick: async (_, { type }, loadedBase64File) => {
            try {
              dispatch(ToastCreators.pending({
                message: t('global:LOADING_TIP'),
                toastOptions: { autoClose: 4000 },
              }));
              // Obtain a signed URL for the file upload
              const { url, fileKey } = await getSignedUrlApi({ fileName, contentType: type });

              // Upload the file to S3 using the signed URL
              await uploadToS3({ signedUrl: url, data: loadedBase64File });
              dispatch(ToastCreators.success({ message: t('global:LOADED') }));

              // Set the field value to the key associated with the uploaded file
              setFieldValue(fieldName, fileKey);
            }
            catch (error) {
              dispatch(ToastCreators.error({ message: error }));
            }
          },
        };
      default:
        return commonProps;
    }
  }

  function handleFilterOption(inputValue, option) {
    return getSelectFilterOption(inputValue, option, true);
  }

  function handleSelectAll() {
    setFieldValue(
      fieldName,
      liveOptions.map(s => s.value),
      true,
    );
  }

  function getCsvProps(formatter) {
    return {
      onOkayClick: csvData => setFieldValue(fieldName, csvData.data.map(formatter)),
      exampleCsv,
      disabled: readOnly || disabled || selectablesLoading,
    };
  }

  function getValue() {
    return get(values, fieldName);
  }
  function getHelp() {
    const help = get(touched, fieldName) && get(errors, fieldName);
    return help;
  }
  function getValidateStatus() {
    return get(touched, fieldName) && get(errors, fieldName) ? 'error' : 'success';
  }
  function getHandleChange(inputName = AVAILABLE_INPUT_TYPE.text.name) {
    return param => {
      if (inputName === AVAILABLE_INPUT_TYPE.select.name) {
        setFieldValue(fieldName, param);
      }
      else if (inputName === AVAILABLE_INPUT_TYPE.date.name) {
        setFieldValue(fieldName, param);
      }
      else if (inputName === AVAILABLE_INPUT_TYPE.dateRange.name) {
        setFieldValue(fieldName, param);
      }
      else if (inputName === AVAILABLE_INPUT_TYPE.checkbox.name) {
        setFieldValue(fieldName, param.target.checked);
      }
      else {
        setFieldValue(fieldName, param.target.value);
      }
    };
  }
  function getHandleBlur() {
    return () => setFieldTouched(fieldName);
  }

  // for nested fields, antd expects array, while formik uses dot notation
  function getAntdFieldNameFromFormikFieldName() {
    return fieldName.split('.');
  }
}

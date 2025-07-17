import { Button, Col, DatePicker, Form, Row, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';

import { useFormik } from 'formik';
import { get, uniqueId } from 'lodash';

import moment from 'moment-timezone';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { validate } from '@shared/yup';
import { DATE_RANGE_TYPES, DATE_FORMAT } from './constants';

import {
  defaultAnalysisForm,
  analysisFormValidationSchema,
} from './formHelper';
import { getLangKey } from '@shared/i18n';
import { SelectWrapper } from '@shared/components/UI/Form';

const AnalysisForm = props => {
  const {
    onFieldsChange,
    onFinish,
    analyticTypes,
    polygons,
    isFormDisabled,
  } = props;
  const [form] = useForm();
  const { t } = useTranslation('gisLocationIntelligencePage');

  const statOptions = useMemo(() => {
    if (analyticTypes) {
      const options = analyticTypes?.map(f => f.type);
      return options;
    }
    return [];
  }, [analyticTypes]);

  const selectAllStatOption = { type: 'selectAll' };
  const allStatOptions = [selectAllStatOption.type, ...statOptions];

  const formik = useFormik({
    initialValues: defaultAnalysisForm,
    validate: validate(analysisFormValidationSchema),
    onSubmit: () => {
      onFinish();
    },
    enableReinitialize: true,
  });

  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleSubmit,
  } = formik;

  const handleSelectChange = fieldName => {
    return selectedItems => {
      if (selectedItems[0] === 'selectAll') {
        setFieldValue(fieldName, statOptions);
        onFieldsChange({ [fieldName]: statOptions });
      }
      else {
        setFieldValue(fieldName, selectedItems);
        onFieldsChange({ [fieldName]: selectedItems });
      }
    };
  };

  const getIsDisabledDate = current => {
    const today = moment();
    const lastMonthStart = moment().subtract(1, 'month').startOf('month');
    if (current.isSame(today, 'day')) {
      return true;
    }
    return current && (current < lastMonthStart || current > today);
  };

  const handleDateRangeIntervalChange = selectedValue => {
    if (selectedValue) {
      const firstDay = moment(selectedValue)
        .startOf(values.dateRangeType)
        .format(DATE_FORMAT);
      const lastDay = moment(selectedValue)
        .endOf(values.dateRangeType)
        .format(DATE_FORMAT);
      const currentDay = moment()
        .format(DATE_FORMAT);
      const checkLastDate = moment(lastDay, DATE_FORMAT);

      setFieldValue('dateStart', firstDay);
      onFieldsChange({ dateStart: firstDay });
      if (checkLastDate.isAfter(currentDay)) {
        setFieldValue('dateEnd', currentDay);
        onFieldsChange({ dateEnd: currentDay });
        return;
      }
      setFieldValue('dateEnd', lastDay);
      onFieldsChange({ dateEnd: lastDay });
    }
  };

  const handleDateRangeDailyChange = value => {
    if (value) {
      const dateStart = moment(value[0]).utc().format(DATE_FORMAT);
      const dateEnd = moment(value[1]).utc().format(DATE_FORMAT);
      setFieldValue('dateStart', dateStart);
      setFieldValue('dateEnd', dateEnd);
      onFieldsChange({ dateStart });
      onFieldsChange({ dateEnd });
    }
  };

  const customLabelTranslation = path => {
    return label => {
      return t(`${path}:${label}`);
    };
  };

  useEffect(() => {
    if (polygons) {
      setFieldValue('polygonIds', polygons);
      onFieldsChange({ polygonIds: polygons });
    }
  }, [onFieldsChange, polygons, setFieldValue]);

  return (
    <Form
      id="form"
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
    >
      <Row gutter={[16]}>
        <Col span={24}>
          <Form.Item
            label={t('DATE_RANGE_TYPE_TITLE')}
            validateStatus={
              touched.dateRangeType && get(errors, 'dateRangeType') ?
                'error' : 'success'
            }
          >
            <Select
              showSearch
              filterOption
              optionFilterProp={`label.${getLangKey()}`}
              value={values.dateRangeType}
              placeholder={t('SELECT_DATE_RANGE_TYPE')}
              onChange={handleSelectChange('dateRangeType')}
              disabled={isFormDisabled}
            >
              {DATE_RANGE_TYPES.map(type => (
                <Select.Option
                  key={uniqueId()}
                  value={type.value}
                >
                  {type.label[getLangKey()]}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label={t('RANGE_PICKER_TITLE')}
            validateStatus={
              touched.dateEnd && get(errors, 'dateEnd') ?
                'error' : 'success'
            }
          >
            { values.dateRangeType !== 'day' ? (
              <DatePicker
                picker={values.dateRangeType}
                disabledDate={getIsDisabledDate}
                placeholder={t('SELECT_INTERVAL')}
                onChange={handleDateRangeIntervalChange}
                allowClear={false}
                disabled={isFormDisabled}
              />
            ) : (
              <DatePicker.RangePicker
                disabledDate={getIsDisabledDate}
                format={DATE_FORMAT}
                className="w-100"
                onChange={handleDateRangeDailyChange}
              />
            )}
          </Form.Item>
          <SelectWrapper
            selectKey="statTypes"
            placeholder={t('SELECT_STAT_TYPES')}
            label={t('STAT_TYPES_TITLE')}
            value={values.statTypes}
            hasError={get(errors, 'statTypes')}
            isTouched={!!get(touched, 'statTypes')}
            optionsData={allStatOptions}
            mode="multiple"
            onChangeCallback={handleSelectChange('statTypes')}
            labelTranslationCallback={customLabelTranslation('gisLocationIntelligencePage:STAT_TYPES')}
            disabled={isFormDisabled}
          />
        </Col>
      </Row>
      <Row gutter={[16]}>
        <Col span={24}>
          <Button
            block
            type="primary"
            htmlType="submit"
            disabled={isFormDisabled}
          >
            {t('FETCH_RESULT')}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AnalysisForm;

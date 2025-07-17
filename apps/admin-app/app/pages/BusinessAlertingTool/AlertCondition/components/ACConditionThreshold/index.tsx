import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash';
import { Button, Form, InputNumber, Select, Tooltip } from 'antd';
import { DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';

import useStyles from './styles';
import { THRESHOLD_FORMAT, THRESHOLD_OCCURENCES, THRESHOLD_OPERATORS_HUMAN_READABLE, THRESHOLD_PRIORITY } from '@app/pages/BusinessAlertingTool/constants';
import { convertConstantValueTranslationsToSelectOptions } from '@shared/utils/common';

function ACConditionThreshold({ formik, isFormEditable = true, form, isFormatInfoIconVisible = true }:
  // eslint-disable-next-line react/require-default-props
  { formik: any; isFormEditable: boolean | undefined; form?: any; isFormatInfoIconVisible?: boolean; }) {
  const classes = useStyles();
  const { t } = useTranslation(['batAlertConditionCommon']);
  const thresholdOccurencesSelectOptions = convertConstantValueTranslationsToSelectOptions({
    constants: THRESHOLD_OCCURENCES,
    translationBaseKey: 'batAlertConditionCommon:CONSTANT_VALUES.THRESHOLD_OCCURENCES',
  });
  const thresholdOperatorsHumanReadable = convertConstantValueTranslationsToSelectOptions({
    constants: THRESHOLD_OPERATORS_HUMAN_READABLE,
    translationBaseKey: 'batAlertConditionCommon:CONSTANT_VALUES.ALERT_THRESHOLD_OPERATORS_HUMAN_READABLE',
  });
  const thresholdFormatSelectOptions = convertConstantValueTranslationsToSelectOptions({
    constants: THRESHOLD_FORMAT,
    translationBaseKey: 'batAlertConditionCommon:CONSTANT_VALUES.THRESHOLD_FORMATS',
  });
  const thresholdPrioritySelectOptions = convertConstantValueTranslationsToSelectOptions({
    constants: THRESHOLD_PRIORITY,
    translationBaseKey: 'batAlertConditionCommon:THRESHOLD_PRIORITY',
  });

  const { setFieldValue, values } = formik;

  const isInfoIconVisible = (
    values?.conditions?.critical?.comparisonType === THRESHOLD_FORMAT.PERCENTAGE &&
    (isFormatInfoIconVisible || isFormEditable)
  );

  useEffect(() => {
    setFieldValue(['conditions', 'critical', 'priority'], 'critical');
    if (values?.conditions?.warning !== undefined) {
      setFieldValue(['conditions', 'warning', 'operator'], values?.conditions?.critical?.operator);
      setFieldValue(['conditions', 'warning', 'comparisonType'], values?.conditions?.critical?.comparisonType);
    }

    if (values?.conditions?.critical?.occurrences === 1) {
      setFieldValue(['conditions', 'critical', 'estimate']);
      form.setFieldsValue({ conditions: { critical: { estimate: undefined } } });
    }
    if (values?.conditions?.warning?.occurrences === 1) {
      setFieldValue(['conditions', 'warning', 'estimate']);
      form.setFieldsValue({ conditions: { warning: { estimate: undefined } } });
    }
  }, [form, setFieldValue, values]);

  return (
    <div className={classes.thresholdContainer}>
      {
        !isEmpty(values?.conditions) && (
          <div className={classes.thresholdRow}>
            <div>{t('THRESHOLD_TITLE.PRIORITY')}</div>
            <div>{t('THRESHOLD_TITLE.ABOVE_BELOW')}</div>
            {values?.queryInfo?.raw?.compareWithPast && (
              <div>
                {t('THRESHOLD_TITLE.FORMAT')}
                {isInfoIconVisible && (
                  <Tooltip title={t('THRESHOLD_TITLE.INFO_ICON_TOOLTIP')}>
                    &nbsp;
                    <InfoCircleOutlined className={classes.infoIcon} />
                  </Tooltip>
                )}
              </div>
            )}
            <div>{t('THRESHOLD_TITLE.VALUE')}</div>
            <div>{t('THRESHOLD_TITLE.OCCURENCES')}</div>
            <div>{t('THRESHOLD_TITLE.OCCURENCE_COUNT')}</div>
          </div>
        )
      }
      {
        Object.keys(values?.conditions || { critical: { priority: THRESHOLD_PRIORITY.CRITICAL } }).map(threshold => (
          <div className={classes.thresholdRow} key={threshold}>
            <div>
              <Form.Item
                name={['conditions', `${threshold}`, 'priority']}
                rules={[{ required: true, message: t('error:REQUIRED') }]}
              >
                <Select
                  className="w-100"
                  options={thresholdPrioritySelectOptions}
                  onChange={priority => handleOnChange({ threshold, key: 'priority', value: priority })}
                  disabled
                  showArrow={false}
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                name={['conditions', `${threshold}`, 'operator']}
                rules={[{ required: true, message: t('error:REQUIRED') }]}
              >
                <Select
                  className="w-100"
                  options={thresholdOperatorsHumanReadable}
                  onChange={operator => handleOnChange({ threshold, key: 'operator', value: operator })}
                  disabled={
                    !isFormEditable
                    || (values?.conditions?.warning?.priority === THRESHOLD_PRIORITY.WARNING && threshold === THRESHOLD_PRIORITY.WARNING)
                  }
                />
              </Form.Item>
            </div>
            {
              values?.queryInfo?.raw?.compareWithPast && (
                <div>
                  <Form.Item
                    name={['conditions', `${threshold}`, 'comparisonType']}
                    rules={[{ required: true, message: t('error:REQUIRED') }]}
                  >
                    <Select
                      className="w-100"
                      options={thresholdFormatSelectOptions}
                      onChange={comparisonType => handleOnChange({ threshold, key: 'comparisonType', value: comparisonType })}
                      disabled={
                        !isFormEditable
                        || (values?.conditions?.warning?.priority === THRESHOLD_PRIORITY.WARNING && threshold === THRESHOLD_PRIORITY.WARNING)
                      }
                    />
                  </Form.Item>
                </div>
              )
            }
            <div>
              <Form.Item
                name={['conditions', `${threshold}`, 'threshold']}
                rules={[{ required: true, message: t('error:REQUIRED') }]}
              >
                <InputNumber
                  className="w-100"
                  onChange={val => handleOnChange({ threshold, key: 'threshold', value: val })}
                  disabled={!isFormEditable}
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                name={['conditions', `${threshold}`, 'occurrences']}
                rules={[{ required: true, message: t('error:REQUIRED') }]}
              >
                <Select
                  className="w-100"
                  options={thresholdOccurencesSelectOptions}
                  onChange={occurrences => handleOnChange({ threshold, key: 'occurrences', value: occurrences })}
                  disabled={!isFormEditable}
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                name={['conditions', `${threshold}`, 'estimate']}
                rules={[{ required: values?.conditions?.[threshold]?.occurrences !== 1, message: t('error:REQUIRED') }]}
              >
                <InputNumber
                  className="w-100"
                  addonAfter={t('batAlertConditionCommon:TIMES')}
                  onChange={estimate => handleOnChange({ threshold, key: 'estimate', value: estimate })}
                  disabled={values?.conditions?.[threshold]?.occurrences === 1 || !isFormEditable}
                />
              </Form.Item>
            </div>
            {
              threshold !== THRESHOLD_PRIORITY.CRITICAL && (
                <div className={classes.thresholdActionButton}>
                  <Button
                    type="text"
                    size="small"
                    danger
                    onClick={() => setFieldValue(['conditions', `${threshold}`])}
                    disabled={!isFormEditable}
                  >
                    <DeleteOutlined />
                  </Button>
                </div>
              )
            }
          </div>
        ))
      }
      <div>
        <Button
          type="primary"
          onClick={handleAddThresholdOnClick}
          disabled={Object.keys(values?.conditions || {}).length === 2 || !isFormEditable}
        >
          {t('batAlertConditionCommon:ADD_THRESHOLD')}
        </Button>
      </div>
    </div>
  );

  function handleAddThresholdOnClick() {
    const conditionKeys = Object.keys(values?.conditions || {});
    if (isEmpty(conditionKeys)) return setFieldValue(['conditions', 'critical', 'priority'], 'critical');

    if (conditionKeys.includes('critical') && conditionKeys.includes('warning')) return conditionKeys;

    return setFieldValue(['conditions', 'warning', 'priority'], 'warning');
  }

  function handleOnChange({ threshold, key, value }: { threshold: string; key: string; value: any; }) {
    setFieldValue(['conditions', `${threshold}`, `${key}`], value);
  }
}

export default ACConditionThreshold;

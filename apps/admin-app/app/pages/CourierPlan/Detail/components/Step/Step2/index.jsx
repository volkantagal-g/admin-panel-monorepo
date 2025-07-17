import { Checkbox, Col, DatePicker, Row, Space, Typography } from 'antd';
import { get } from 'lodash';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { InputWrapper, SelectWrapper } from '@shared/components/UI/Form';
import { COUNTRY_CODES } from '@shared/shared/constants';
import { getLocalDateFormat } from '@shared/utils/localization';
import { validate } from '@shared/yup';
import CommonForm from '../CommonForm';
// eslint-disable-next-line no-unused-vars
import * as Types from '../../../type';

import {
  OPTIMAL_TTP_TYPE,
  TTP_TYPES,
  PLAN_TYPES,
} from '../../../../constants';
import {
  getDefaultFileList,
  getTTPRequestParams,
  warehouseDomainConstraints,
} from '../../../../utils';
import { Creators } from '../../../redux/actions';
import { defaultValues, validationSchema } from './formHelper';
import useStyles from './styles';

const { Text } = Typography;
const { RangePicker } = DatePicker;

export const getDefaultDateRanges = (isOptimalType = false) => {
  const today = moment();
  const twoWeeksAgo = moment().subtract(13, 'days');

  return isOptimalType ? [twoWeeksAgo, today] : [today, today];
};

/**
 * @param {Types.StepComponent} props
 * @returns () => JSX.Element
 */
export default function Step2(props) {
  const { step, plan, isPending } = props;
  const { warehouseDomainType, country } = plan.properties || {};
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation('courierPlanPage');

  const formikConfig = useMemo(() => {
    const init = step.data?.input?.ttp || {};
    return {
      validateOnChange: false,
      initialValues: {
        ...defaultValues,
        ...init,
        warehouseDomainType,
        countryCode: COUNTRY_CODES[country],
      },
      validate: validate(validationSchema),
      onSubmit: async formValues => {
        const requestParams = await getTTPRequestParams({
          planId: plan._id,
          step,
          data: formValues,
        });
        dispatch(Creators.updateTTPRequest(requestParams));
      },
    };
  }, [country, dispatch, plan, step, warehouseDomainType]);

  const handleFieldChange = (formik, fieldName) => value => formik.setFieldValue(fieldName, value);

  const selectOptionTranslate = path => label => t(`${path}.${label}`);

  return (
    <CommonForm
      {...props}
      toggleFileUploadVisibility={formik => formik?.values?.ttpType !== OPTIMAL_TTP_TYPE}
      formikConfig={formikConfig}
      renderAboveUpload={({ formik }) => (
        <Col xs={24}>
          <Row gutter={16} align="top">
            <Col sm={12} xs={24}>
              <SelectWrapper
                selectKey="warehouseDomainType"
                label={t('DOMAIN_TYPE')}
                value={get(formik.values, 'warehouseDomainType')}
                optionLabelProp="label"
                optionValueProp="value"
                optionsData={warehouseDomainConstraints(t)}
                mode="multiple"
                disabled
              />
            </Col>

            <Col sm={12} xs={24}>
              <InputWrapper
                label={t('global:COUNTRY')}
                inputKey="countryCode"
                value={get(formik.values, 'countryCode')}
                disabled
              />
            </Col>
          </Row>

          <Row gutter={[16]} align="top">
            <Col sm={12} xs={24}>
              <SelectWrapper
                selectKey="ttpType"
                label={t('TTP_TYPE')}
                value={get(formik.values, 'ttpType')}
                hasError={get(formik.errors, 'ttpType')}
                isTouched={get(formik.touched, 'ttpType')}
                optionsData={TTP_TYPES}
                labelTranslationCallback={selectOptionTranslate('TTP_TYPES')}
                onChangeCallback={ttpType => {
                  const isOptimalTtp = ttpType === OPTIMAL_TTP_TYPE;
                  const { fileName } = step.data?.input?.ttp || {};
                  formik.setValues({
                    ...formik.values,
                    ttpType,
                    ...(!isOptimalTtp &&
                      { fileList: getDefaultFileList(fileName) }
                    ),
                    ttpRefStartDate: getDefaultDateRanges(isOptimalTtp),
                  });
                }}
              />
            </Col>

            <Col sm={12} xs={24}>
              <Space
                direction="vertical"
                className={[classes.fullWidth, classes.marginBottom]}
              >
                <Text>{t('TTP_REFERENCE_DATE_1')}</Text>
                <RangePicker
                  className={classes.fullWidth}
                  value={get(formik.values, 'ttpRefStartDate')}
                  onChange={handleFieldChange(formik, 'ttpRefStartDate')}
                  format={getLocalDateFormat()}
                  allowClear={false}
                  disabled={isPending}
                />
              </Space>
            </Col>

          </Row>
        </Col>
      )}
      renderBelowUpload={({ formik }) => {
        const isOptimalTtp = formik.values.ttpType === OPTIMAL_TTP_TYPE;

        return (
          <>
            {!isOptimalTtp && (
              <Col xs={24}>
                <Row gutter={16} align="top">
                  <Col sm={12} xs={24}>
                    <InputWrapper
                      label={t('TTP_MAX')}
                      inputKey="maxTtp"
                      value={get(formik.values, 'maxTtp')}
                      isTouched={get(formik.touched, 'maxTtp')}
                      hasError={get(formik.errors, 'maxTtp')}
                      setFieldValue={(key, value) => handleFieldChange(formik, key)(value)}
                      disabled={isPending}
                      additionalProps={{ min: formik.values.minTtp }}
                      mode="number"
                      step={0.5}
                    />
                  </Col>

                  <Col sm={12} xs={24}>
                    <InputWrapper
                      label={t('TTP_MIN')}
                      inputKey="minTtp"
                      value={get(formik.values, 'minTtp')}
                      isTouched={get(formik.touched, 'minTtp')}
                      hasError={get(formik.errors, 'minTtp')}
                      setFieldValue={(key, value) => handleFieldChange(formik, key)(value)}
                      disabled={isPending}
                      additionalProps={{ max: formik.values.maxTtp }}
                      mode="number"
                      step={0.5}
                    />
                  </Col>
                </Row>
              </Col>
            )}

            <Col xs={24}>
              <Row gutter={16} align="middle">

                {
                  isOptimalTtp ? (
                    <>
                      <Col sm={12} xs={24}>
                        <InputWrapper
                          label={t('BUFFER_1')}
                          inputKey="buffer1"
                          value={get(formik.values, 'buffer1')}
                          isTouched={get(formik.touched, 'buffer1')}
                          hasError={get(formik.errors, 'buffer1')}
                          setFieldValue={(key, value) => handleFieldChange(formik, key)(value)}
                          disabled={isPending}
                          mode="number"
                          step={0.5}
                        />
                      </Col>

                      <Col sm={12} xs={24}>
                        <InputWrapper
                          label={t('BUFFER_2')}
                          inputKey="buffer2"
                          value={get(formik.values, 'buffer2')}
                          isTouched={get(formik.touched, 'buffer2')}
                          hasError={get(formik.errors, 'buffer2')}
                          setFieldValue={(key, value) => handleFieldChange(formik, key)(value)}
                          disabled={isPending}
                          mode="number"
                          step={0.5}
                        />
                      </Col>

                      <Col sm={12} xs={24}>
                        <SelectWrapper
                          selectKey="planType"
                          optionsData={PLAN_TYPES}
                          label={t('PLAN_TYPE')}
                          value={get(formik.values, 'planType')}
                          hasError={get(formik.errors, 'planType')}
                          isTouched={get(formik.touched, 'planType')}
                          labelTranslationCallback={selectOptionTranslate('PLAN_TYPES')}
                          onChangeCallback={handleFieldChange(formik, 'planType')}
                        />
                      </Col>
                    </>

                  ) : (
                    <>
                      <Col sm={12} xs={24}>
                        <InputWrapper
                          label={t('TTP_EXPAND_FACTOR')}
                          inputKey="expandFactor"
                          value={get(formik.values, 'expandFactor')}
                          isTouched={get(formik.touched, 'expandFactor')}
                          hasError={get(formik.errors, 'expandFactor')}
                          setFieldValue={(key, value) => handleFieldChange(formik, key)(value)}
                          disabled={isPending}
                          mode="number"
                          step={0.5}
                        />
                      </Col>

                      <Col sm={12} xs={24}>
                        <Checkbox
                          checked={get(formik.values, 'useSameAllDay')}
                          onChange={e => handleFieldChange(formik, 'useSameAllDay')(e.target.checked)}
                        >
                          {t('TTP_USE_SAME_ALL_DAY')}
                        </Checkbox>
                      </Col>
                    </>
                  )
                }

              </Row>
            </Col>
          </>
        );
      }}
    />
  );
}

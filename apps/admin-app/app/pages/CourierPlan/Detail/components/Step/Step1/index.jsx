import { Col } from 'antd';
import { get } from 'lodash';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { SelectWrapper } from '@shared/components/UI/Form';
import { validate } from '@shared/yup';

import CommonForm from '../CommonForm';
import {
  defaultValues,
  planTypeForecast,
  validationSchema,
} from './formHelper';
// eslint-disable-next-line no-unused-vars
import * as Types from '../../../type';

/**
 * @param {Types.StepComponent} props
 * @returns () => JSX.Element
 */
export default function Step1Form(props) {
  const { t } = useTranslation('courierPlanPage');

  const formikConfig = useMemo(() => {
    const { step } = props;
    const init = step.data?.input || {};
    return {
      initialValues: {
        ...defaultValues,
        ...init,
        type: init.type || defaultValues.type,
      },
      validate: validate(() => validationSchema(t)),
    };
  }, [t, props]);

  return (
    <CommonForm
      {...props}
      formikConfig={formikConfig}
      renderAboveUpload={({ formik, resetFileList }) => (
        <Col xs={12}>
          <SelectWrapper
            selectKey="type"
            label={t('FORECAST_TYPE')}
            placeholder={t('FORECAST_TYPE')}
            value={formik.values.type}
            optionLabelProp="label"
            optionValueProp="value"
            optionsData={planTypeForecast(t)}
            hasError={get(formik.errors, 'type')}
            isTouched={get(formik.touched, 'type')}
            onChangeCallback={forecastType => {
              resetFileList(); // reset filelist on forecast type change
              formik.setFieldValue('type', forecastType);
            }}
          />
        </Col>
      )}
    />
  );
}

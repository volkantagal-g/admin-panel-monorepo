import { Col, DatePicker, Form } from 'antd';
import { get } from 'lodash';
import moment from 'moment';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { getLocalDateFormat } from '@shared/utils/localization';
import { validate } from '@shared/yup';

import CommonForm from '../CommonForm';
import { defaultValues, validationSchema } from './formHelper';
// eslint-disable-next-line no-unused-vars
import * as Types from '../../../type';

/**
 * @param {Types.StepComponent} props
 * @returns () => JSX.Element
 */
export default function Step3Form(props) {
  const { step, isPending } = props;
  const { t } = useTranslation('courierPlanPage');

  const formikConfig = useMemo(() => {
    const init = step.data?.input || {};
    return {
      initialValues: {
        ...defaultValues,
        ...init,
        capDateRange:
          init.capDateRange?.map(m => (m ? moment(m) : null)) ||
          defaultValues.capDateRange,
      },
      validate: validate(() => validationSchema),
    };
  }, [step]);

  const handleCapDateChange = formik => range => {
    formik.setFieldValue('capDateRange', range);
  };

  return (
    <CommonForm
      {...props}
      formikConfig={formikConfig}
      renderBelowUpload={({ formik }) => (
        <Col xs={12}>
          <Form.Item
            labelCol={{ span: 24 }}
            label={t('CAP_DATE_RANGE')}
            name="capDateRange"
          >
            <DatePicker.RangePicker
              value={get(formik.values, 'capDateRange')}
              onChange={handleCapDateChange(formik)}
              format={getLocalDateFormat()}
              allowClear={false}
              disabled={isPending}
            />
          </Form.Item>
        </Col>
      )}
    />
  );
}

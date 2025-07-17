import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Form } from 'antd';

import { getAlertConditionDetailSelector } from '../../redux/selectors';

import BATCard from '@app/pages/BusinessAlertingTool/components/BATCard';
import ACMetricGroup from '../../../components/ACMetricGroup';

function UpdateMetricGroupForm() {
  const { metricGroup } = useSelector(getAlertConditionDetailSelector.getData);

  const [form] = Form.useForm();

  const formik = useFormik({
    initialValues: { metricGroup },
    enableReinitialize: true,
    onSubmit: () => {},
  });

  const { values } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  return (
    <Form form={form}>
      <BATCard>
        <ACMetricGroup formik={formik} isFormEditable={false} />
      </BATCard>
    </Form>
  );
}

export default UpdateMetricGroupForm;

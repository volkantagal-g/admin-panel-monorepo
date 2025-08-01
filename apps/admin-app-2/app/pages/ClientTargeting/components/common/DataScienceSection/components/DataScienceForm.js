import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'antd';
import { useFormik } from 'formik';

import { Creators } from '@app/pages/ClientTargeting/redux/actions';
import { getClientListData, getSelectedDataScienceModel } from '@app/pages/ClientTargeting/redux/selectors';
import { DynamicFormItems } from '@shared/components/DynamicForm/DynamicFormItems';
import {
  getInitialValues,
  getReportValidationFromReportType,
  convertModelToReportType,
  getDynamicFieldsForDataScienceModels,
} from '../utils';

import '../css.css';

const DataScienceForm = ({ section, activeKey, activeIndex }) => {
  if (!section) throw new Error('Section is required');

  const dispatch = useDispatch();

  const clientListData = useSelector(getClientListData(activeKey));

  const currentParam = clientListData.params[activeIndex];
  const currentModel = useSelector(getSelectedDataScienceModel(activeKey));

  const reportTypeModel = useMemo(() => convertModelToReportType(currentModel), [currentModel]);
  const validationSchema = useMemo(() => getReportValidationFromReportType(reportTypeModel), [reportTypeModel]);

  const initialValues = useMemo(
    () => getInitialValues({ model: currentModel, state: currentParam?.data }),
    [currentModel, currentParam?.data],
  );

  const [form] = Form.useForm();
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
  });

  const { handleSubmit, values } = formik;

  const configs = useMemo(() => getDynamicFieldsForDataScienceModels(currentModel?.inputList), [currentModel?.inputList]);

  useEffect(() => {
    const areValuesDifferentFromGlobalState = Object.keys(values).some(key => values?.[key] !== currentParam?.data?.[key]);
    if (!areValuesDifferentFromGlobalState) return;

    const dataScienceRequestBody = {
      ...currentParam,
      data: values,
    };
    dispatch(Creators.setDataScienceFields({ data: dataScienceRequestBody, section, activeKey, validationSchema }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  return (
    // eslint-disable-next-line no-unsafe-optional-chaining
    <Form form={form} id={currentModel?._id + activeIndex} onFinish={handleSubmit} layout="vertical">
      <DynamicFormItems formConfigs={configs} formik={formik} />
    </Form>
  );
};

export default DataScienceForm;

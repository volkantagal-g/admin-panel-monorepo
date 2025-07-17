import { Button, Col, Form, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { validate } from '@shared/yup';
import { SelectWrapper } from '@shared/components/UI/Form';
import Card from '@shared/components/UI/AntCard';
import { getLangKey } from '@shared/i18n';
import AntTable from '@shared/components/UI/AntTable';
import { tableColumns } from './config';
import { franchiseReportListSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import { getReportTableData, getFilteredReportList } from './utils';
import { defaultValues, validationSchema } from './formHelper';

const { useForm } = Form;

const AccessibleReports = ({ formik, isEditable }) => {
  const dispatch = useDispatch();
  const [form] = useForm();
  const { t } = useTranslation('marketFranchiseUserRoleGroupPage');

  const data = useSelector(franchiseReportListSelector.getData);
  const isPending = useSelector(franchiseReportListSelector.getIsPending);

  const tableData = useMemo(() => getReportTableData(formik.values.reports, data), [data, formik.values.reports]);
  const filteredReports = useMemo(() => getFilteredReportList(formik.values.reports, data), [data, formik.values.reports]);

  const addFormik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: values => {
      const newReports = [...formik.values.reports, values.report];
      formik.setFieldValue('reports', newReports);
      form.resetFields();
      addFormik.resetForm();
    },
  });
  const { handleSubmit, setFieldValue, values } = addFormik;

  const handleOnRemove = removedReportId => {
    const newReports = formik.values.reports.filter(report => report !== removedReportId);
    formik.setFieldValue('reports', newReports);
  };

  const handleFieldChange = fieldName => {
    return value => {
      setFieldValue(fieldName, value);
    };
  };

  useEffect(() => {
    dispatch(Creators.getFranchiseReportListRequest());
  }, [dispatch]);

  useEffect(() => {
    form.resetFields();
    addFormik.resetForm();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values, form]);

  return (
    <Card title={t('ACCESSIBLE_REPORTS')}>
      <AntTable
        data={tableData}
        columns={tableColumns({ t, handleOnRemove, isEditable })}
        loading={isPending}
        rowKey="_id"
        pagination={false}
      />
      <Form form={form}>
        {isEditable && (
          <Row gutter={[16, 16]} align="top">
            <Col lg={22} xs={20}>
              <SelectWrapper
                selectKey="report"
                value={values.report}
                hasError={get(addFormik.errors, 'report')}
                isTouched={get(addFormik.touched, 'report')}
                onChangeCallback={handleFieldChange('report')}
                disabled={isPending}
                optionsData={filteredReports}
                optionLabelProp={`name.${getLangKey()}`}
                optionValueProp="_id"
              />
            </Col>
            <Col lg={2} xs={4}>
              <Button type="primary" onClick={handleSubmit} icon={<PlusOutlined />} disabled={!isEditable} />
            </Col>
          </Row>
        )}
      </Form>
    </Card>
  );
};

AccessibleReports.propTypes = {
  formik: PropTypes.object,
  isEditable: PropTypes.bool,
};

export default AccessibleReports;

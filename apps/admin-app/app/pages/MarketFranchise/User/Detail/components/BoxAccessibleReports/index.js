import { useEffect, useMemo, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Row, Col, Typography, Select, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { cloneDeep, get, isEmpty } from 'lodash';

import AntCard from '@shared/components/UI/AntCard';
import { validate } from '@shared/yup';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { SelectWrapper } from '@shared/components/UI/Form';
import { getLangKey } from '@shared/i18n';
import { Creators } from '../../redux/actions';
import { reportsSelector, updateFranchiseUserReportsSelector } from '../../redux/selectors';
import { BOXES_DEFAULT_PROPS, BOXES_PROP_TYPES } from '../../constants';
import useStyles from './styles';
import { validationSchema } from './formHelper';
import Footer from '../BoxFooter';
import { tableColumns } from './config';

const { Text } = Typography;
const { Option } = Select;

const BoxAccesibleReports = ({ data, isPending, editPermKey }) => {
  const { t } = useTranslation(['marketFranchiseUserPage', 'error']);
  const classes = useStyles();
  const dispatch = useDispatch();

  const [isFormEditable, setIsFormEditable] = useState(false);

  const allReports = useSelector(reportsSelector.getData);
  const isPendingUpdateFranchiseUserReports = useSelector(updateFranchiseUserReportsSelector.getIsPending);
  const isSuccessUpdateFranchiseUserReports = useSelector(updateFranchiseUserReportsSelector.getIsSuccess);

  const validationFn = useMemo(() => validate(() => validationSchema({ t })), [t]);

  const [form] = Form.useForm();

  const formik = useFormik({
    enableReinitialize: true,
    validate: validationFn,
    initialValues: data,
    onSubmit: formValues => {
      dispatch(Creators.updateFranchiseUserReportsRequest({ reports: formValues.reports, userId: formValues._id }));
    },
  });

  const { handleSubmit, values, setValues, resetForm, setFieldValue } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form, allReports]);

  useEffect(() => {
    if (isSuccessUpdateFranchiseUserReports) setIsFormEditable(false);
  }, [isSuccessUpdateFranchiseUserReports]);

  const handleFieldChange = (fieldName, reportId) => {
    setFieldValue(fieldName, reportId);
  };

  const handleCancelClick = () => {
    const newValues = cloneDeep(data);
    form.resetFields();
    resetForm();
    form.setFieldsValue(newValues);
    setValues(newValues);
    setIsFormEditable(false);
  };

  const prepareTableData = () => allReports.filter(report => (values.reports?.includes(report._id)));

  const addReport = useCallback(() => {
    const newReports = values.reports ? [...values.reports, values.selectedReport] : [values.selectedReport];
    formik.resetForm();
    form.resetFields();
    formik.setFieldValue('reports', newReports);
  }, [values, form, formik]);

  const deleteReport = useCallback(reportId => {
    const newReports = values.reports.filter(reportItem => reportItem !== reportId);
    setFieldValue('reports', newReports);
  }, [values, setFieldValue]);

  const columns = useMemo(() => tableColumns(t, isFormEditable, deleteReport), [
    t,
    isFormEditable,
    deleteReport,
  ]);

  return (
    <Form form={form} layout="vertical">
      <AntCard
        footer={(
          <Footer
            handleCancelClick={handleCancelClick}
            isFormEditable={isFormEditable}
            setIsFormEditable={setIsFormEditable}
            permKey={editPermKey}
            isPending={isPendingUpdateFranchiseUserReports}
            handleSubmit={handleSubmit}
          />
        )}
        bordered={false}
        title={t('ACCESSIBLE_REPORTS')}
      >
        <AntTableV2
          data={prepareTableData()}
          columns={columns}
          loading={isPending}
        />
        {isFormEditable && (
          <Row gutter={[16, 16]} align="middle">
            <Col lg={22} xs={22}>
              <Text>{t('ACCESSIBLE_REPORTS')}</Text>
              <SelectWrapper
                selectKey="selectedReport"
                value={values.selectedReport}
                hasError={get(formik.errors, 'selectedReport')}
                isTouched={get(formik.touched, 'selectedReport')}
                onChangeCallback={reportId => handleFieldChange('selectedReport', reportId)}
                disabled={isPending}
                renderCustomItems={() => allReports
                  .filter(report => !values.reports?.includes(report._id))
                  .map(item => (
                    <Option key={item._id} value={item._id} label={item.name?.[getLangKey()]}>
                      <div>{item.name?.[getLangKey()]}</div>
                    </Option>
                  ))}
              />
            </Col>
            <Col lg={2} xs={2}>
              <div className={classes.buttonContainer}>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => addReport()}
                  disabled={!isFormEditable || isEmpty(values.selectedReport)}
                />
              </div>
            </Col>
          </Row>
        )}
      </AntCard>
    </Form>
  );
};

BoxAccesibleReports.defaultProps = BOXES_DEFAULT_PROPS;

BoxAccesibleReports.propTypes = BOXES_PROP_TYPES;

export default BoxAccesibleReports;

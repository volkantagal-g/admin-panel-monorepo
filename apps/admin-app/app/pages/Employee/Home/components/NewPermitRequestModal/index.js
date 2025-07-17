import { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Popconfirm, Row, Col, DatePicker, Form, Input, InputNumber, TimePicker, Alert } from 'antd';
import { useFormik } from 'formik';
import { get } from 'lodash';
import moment from 'moment';

import { Creators } from '../../redux/actions';
import { validate } from '@shared/yup';
import { getValidationSchema, getInitialValues, manipulateValuesAfterSubmit } from './formHelper';
import { EMPLOYEE_PERMIT_TYPES, EMPLOYEE_PERMIT_REASONS } from '../../../constants';
import { getCalculatedDatesOfPermitBySelectedDateRange } from '../../utils';
import SelectPermitType from '../../../components/Select/Permit/Type';
import SelectPermitReason from '../../../components/Select/Permit/Reason';
import { getUploadDocumentUrlSelector, newPermitRequestSelector } from '../../redux/selectors';
import useStyles from './styles';
import UploadDocument from './UploadDocument';

const { useForm } = Form;
const { RangePicker } = DatePicker;

const PermitRequestModal = ({ isVisible, onClose, permitRequestGroupType = 'OFF_SITE_WORK' }) => {
  const { t } = useTranslation(['global', 'employeePage']);
  const classes = useStyles();
  const dispatch = useDispatch();
  const isCreateSucceeded = useSelector(newPermitRequestSelector.getIsCreateSucceeded);
  const isNewPermitRequestPending = useSelector(newPermitRequestSelector.getIsPending);
  const isUploadDocumentUrlRequestPending = useSelector(getUploadDocumentUrlSelector.getIsPending);
  const uploadedFile = useSelector(getUploadDocumentUrlSelector.getFile);

  const [form] = useForm();
  const formik = useFormik({
    initialValues: getInitialValues({ permitRequestGroupType }),
    validate: validate(() => getValidationSchema({ permitRequestGroupType })),
    validateOnBlur: false,
    onSubmit: values => {
      const permit = manipulateValuesAfterSubmit(values, { permitRequestGroupType });
      dispatch(Creators.newPermitRequestRequest({ permit }));
    },
    enableReinitialize: true,
  });
  const { handleSubmit, values, setFieldValue, setFieldTouched, touched, resetForm, errors } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  const handleClose = useCallback(() => {
    form.resetFields();
    dispatch(Creators.resetUploadDocumentURL());
    resetForm();
    onClose();
  }, [dispatch, form, onClose, resetForm]);

  useEffect(() => {
    if (isCreateSucceeded) {
      handleClose();
    }
  }, [handleClose, isCreateSucceeded]);

  // in order to link antd form and formik form
  const getHandleBlur = fieldName => {
    return () => setFieldTouched(fieldName);
  };

  const handleSelectDateRange = ([startDate, endDate]) => {
    setFieldValue('startDateL', moment(startDate));
    setFieldValue('endDateL', moment(endDate));
    const { totalDay, totalWorkDay } = getCalculatedDatesOfPermitBySelectedDateRange({ startDate, endDate });
    setFieldValue('totalDay', totalDay);
    setFieldValue('totalWorkDay', totalWorkDay);
  };

  const handleSelectDate = startDate => {
    setFieldValue('startDateL', moment(startDate).startOf('day'));
    setFieldValue('endDateL', moment(startDate).endOf('day'));
    setFieldValue('totalDay', 1);
  };

  const handleSelectTimeRange = ([startTime, endTime]) => {
    const startDate = moment(values.startDateL).set({ hour: startTime.get('hour'), minute: 0, second: 0 });
    const endDate = moment(values.endDateL).set({ hour: endTime.get('hour'), minute: 0, second: 0 });
    setFieldValue('startDateL', startDate);
    setFieldValue('endDateL', endDate);
    setFieldValue('totalDay', undefined);
    setFieldValue('totalWorkDay', undefined);
    setFieldValue('requestedPermitHours', endTime.diff(startTime, 'hours'));
  };

  const getHandleChange = (fieldName, inputType = 'text') => {
    return param => {
      if (fieldName === 'permitType') {
        setFieldValue('reason', undefined);
        setFieldTouched('reason', false);
        setFieldValue('employeeDocument', undefined);

        dispatch(Creators.resetUploadDocumentURL());
      }

      if (inputType === 'select' || fieldName === 'employeeDocument' || inputType === 'number') {
        if (fieldName === 'employeeDocument') {
          setFieldTouched('employeeDocument', true);
        }
        setFieldValue(fieldName, param);
      }
      else if (inputType === 'text') {
        setFieldValue(fieldName, param?.target?.value);
      }
    };
  };

  const handleSave = async () => {
    if (values.employeeDocument) {
      dispatch(Creators.getUploadDocumentURLRequest({
        file: uploadedFile,
        callback: fileKey => {
          setFieldValue('employeeDocument', fileKey);
          handleSubmit();
        },
      }));
    }
    else {
      handleSubmit();
    }
    await setFieldTouched('employeeDocument', true);
  };

  if (permitRequestGroupType === 'REGULAR_LEAVE') {
    return (
      <Modal
        forceRender
        visible={isVisible}
        title={t('employeePage:NEW_PERMIT_REQUEST')}
        onCancel={handleClose}
        footer={[
          <Button key="back" disabled={isNewPermitRequestPending} onClick={handleClose}>
            {t('button:CANCEL')}
          </Button>,
          <Popconfirm
            disabled={isNewPermitRequestPending}
            title={t('global:COMMON_CONFIRM_TEXT')}
            okText={t('global:OK')}
            cancelText={t('global:CANCEL')}
            onConfirm={handleSave}
            key="approve"
          >
            <Button
              loading={isNewPermitRequestPending || isUploadDocumentUrlRequestPending}
              key=""
              type="success"
            >
              {t('global:SAVE')}
            </Button>
          </Popconfirm>,
        ]}
        closable
        destroyOnClose
      >
        {(values.reason === EMPLOYEE_PERMIT_REASONS.OTHER) && <Alert type="warning" message={t('employeePage:WARNING_OF_OTHER_TYPE_LEAVE')} />}
        <Form
          form={form}
          id="permitRequestForm"
          layout="vertical"
          disabled={isNewPermitRequestPending}
        >
          <Row gutter={[4, 4]}>
            <Col span={24}>
              <Form.Item
                label={t('global:TYPE')}
                className={classes.formItem}
                help={touched?.permitType && errors?.permitType}
                validateStatus={touched?.permitType && errors?.permitType ? 'error' : 'success'}
              >
                <SelectPermitType
                  allowClear={false}
                  permitRequestGroup={permitRequestGroupType}
                  value={get(values, 'permitType')}
                  onChange={getHandleChange('permitType', 'select')}
                  mode="single"
                  onBlur={getHandleBlur('permitType')}
                />
              </Form.Item>
            </Col>
            {
              values.permitType === EMPLOYEE_PERMIT_TYPES.OTHER && (
                <Col span={24}>
                  <Form.Item
                    label={t('global:REASON')}
                    className={classes.formItem}
                    help={touched?.reason && errors?.reason}
                    validateStatus={touched?.reason && errors?.reason ? 'error' : 'success'}
                  >
                    <SelectPermitReason
                      value={get(values, 'reason')}
                      permitType={values.permitType}
                      onChange={getHandleChange('reason', 'select')}
                      mode="single"
                      onBlur={getHandleBlur('reason')}
                    />
                  </Form.Item>
                </Col>
              )
            }
            {
              values.reason === EMPLOYEE_PERMIT_REASONS.OTHER && (
                <Col span={24}>
                  <Form.Item
                    label={t('global:DESCRIPTION')}
                    className={classes.formItem}
                    help={touched?.otherReasonDescription && errors?.otherReasonDescription}
                    validateStatus={touched?.otherReasonDescription && errors?.otherReasonDescription ? 'error' : 'success'}
                  >
                    <Input.TextArea
                      value={get(values, 'otherReasonDescription')}
                      onChange={getHandleChange('otherReasonDescription')}
                      onBlur={getHandleBlur('otherReasonDescription')}
                    />
                  </Form.Item>
                </Col>
              )
            }
            {values.permitType !== EMPLOYEE_PERMIT_TYPES.HOURLY_PTO ? (
              <>
                <Col span={24}>
                  <Form.Item
                    label={t('global:DATE')}
                    className={classes.formItem}
                  >
                    <RangePicker
                      className="w-100"
                      value={[values.startDateL, values.endDateL]}
                      onChange={handleSelectDateRange}
                      allowClear={false}
                      disabled={!values.permitType}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label={t('employeePage:TOTAL')}
                    className={classes.formItem}
                    help={errors?.totalDay}
                    validateStatus={errors?.totalDay ? 'error' : 'success'}
                  >
                    <Input
                      value={get(values, 'totalDay')}
                      disabled
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label={t('employeePage:ESTIMATED_WORK_DAY')}
                    tooltip={t('employeePage:ESTIMATED_WORK_DAY_INFORMATION_TEXT')}
                    className={classes.formItem}
                    help={errors?.totalWorkDay}
                    validateStatus={errors?.totalWorkDay ? 'error' : 'success'}
                  >
                    <Input
                      value={get(values, 'totalWorkDay')}
                      disabled
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label={t('employeePage:REQUESTED_DAY')}
                    tooltip={t('employeePage:REQUESTED_DAY_INFORMATION_TEXT')}
                    className={classes.formItem}
                    help={touched?.requestedPermitDay && errors?.requestedPermitDay}
                    validateStatus={touched?.requestedPermitDay && errors?.requestedPermitDay ? 'error' : 'success'}
                  >
                    <InputNumber
                      step={0.5}
                      value={get(values, 'requestedPermitDay')}
                      onChange={getHandleChange('requestedPermitDay', 'number')}
                      className="w-100"
                      onBlur={getHandleBlur('requestedPermitDay')}
                    />
                  </Form.Item>
                </Col>
              </>
            ) : (
              <>
                <Col span={24}>
                  <Row gutter={[8, 8]}>
                    <Col span={12}>
                      <Form.Item
                        label={t('global:DATE')}
                        className={classes.formItem}
                      >
                        <DatePicker
                          className="w-100"
                          value={values.startDateL}
                          onChange={handleSelectDate}
                          allowClear={false}
                          disabled={!values.permitType}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label={t('global:HOURS')}
                        className={classes.formItem}
                      >
                        <TimePicker.RangePicker
                          className="w-100"
                          value={[values.startDateL, values.endDateL]}
                          onChange={handleSelectTimeRange}
                          allowClear={false}
                          disabled={!values.permitType}
                          format="HH"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label={t('employeePage:REQUESTED_HOURS')}
                    className={classes.formItem}
                    help={touched?.requestedPermitHours && errors?.requestedPermitHours}
                    validateStatus={touched?.requestedPermitHours && errors?.requestedPermitHours ? 'error' : 'success'}
                  >
                    <Input
                      value={get(values, 'requestedPermitHours')}
                      disabled
                    />
                  </Form.Item>
                </Col>
              </>
            )}
            <Col span={24}>
              <Form.Item
                label={t('global:NOTE')}
                className={classes.formItem}
                help={touched?.employeeNote && errors?.employeeNote}
                validateStatus={touched?.employeeNote && errors?.employeeNote ? 'error' : 'success'}
              >
                <Input.TextArea
                  value={get(values, 'employeeNote')}
                  onChange={getHandleChange('employeeNote')}
                  onBlur={getHandleBlur('employeeNote')}
                />
              </Form.Item>
            </Col>
            {values.permitType && values.permitType !== EMPLOYEE_PERMIT_TYPES.ANNUAL_PERMIT && (
            <Col span={24}>
              <Form.Item
                name={['employeeDocument']}
                label={t('employeePage:DOCUMENT.LABEL')}
                tooltip={t('employeePage:DOCUMENT.TOOLTIP')}
                className={classes.formItem}
                help={touched?.employeeDocument && errors?.employeeDocument}
                validateStatus={touched?.employeeDocument && errors?.employeeDocument ? 'error' : 'success'}
              >
                <UploadDocument
                  value={get(values, 'employeeDocument')}
                  onChange={getHandleChange('employeeDocument')}
                />
              </Form.Item>
            </Col>
            )}
          </Row>
        </Form>
      </Modal>
    );
  }

  return (
    <Modal
      forceRender
      visible={isVisible}
      title={t('employeePage:NEW_OFF_SITE_WORK_REQUEST')}
      onCancel={handleClose}
      footer={[
        <Button key="back" disabled={isNewPermitRequestPending} onClick={handleClose}>
          {t('button:CANCEL')}
        </Button>,
        <Popconfirm
          disabled={isNewPermitRequestPending}
          title={t('global:COMMON_CONFIRM_TEXT')}
          okText={t('global:OK')}
          cancelText={t('global:CANCEL')}
          onConfirm={handleSave}
          key="approve"
        >
          <Button
            loading={isNewPermitRequestPending || isUploadDocumentUrlRequestPending}
            key=""
            type="success"
          >
            {t('global:SAVE')}
          </Button>
        </Popconfirm>,
      ]}
      closable
      destroyOnClose
    >
      <Form
        form={form}
        id="permitRequestForm"
        layout="vertical"
        disabled={isNewPermitRequestPending}
      >
        <Row gutter={[4, 4]}>
          <Col span={24}>
            <Form.Item
              label={t('global:TYPE')}
              className={classes.formItem}
              help={touched?.permitType && errors?.permitType}
              validateStatus={touched?.permitType && errors?.permitType ? 'error' : 'success'}
            >
              <SelectPermitType
                allowClear={false}
                permitRequestGroup={permitRequestGroupType}
                value={get(values, 'permitType')}
                onChange={getHandleChange('permitType', 'select')}
                mode="single"
                onBlur={getHandleBlur('permitType')}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label={t('global:REASON')}
              className={classes.formItem}
              help={touched?.reason && errors?.reason}
              validateStatus={touched?.reason && errors?.reason ? 'error' : 'success'}
            >
              <SelectPermitReason
                value={get(values, 'reason')}
                permitType={values.permitType}
                onChange={getHandleChange('reason', 'select')}
                mode="single"
                onBlur={getHandleBlur('reason')}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label={t('global:DATE')}
              className={classes.formItem}
            >
              <RangePicker
                className="w-100"
                value={[values.startDateL, values.endDateL]}
                onChange={handleSelectDateRange}
                allowClear={false}
                disabled={!values.permitType}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label={t('global:NOTE')}
              className={classes.formItem}
              help={touched?.employeeNote && errors?.employeeNote}
              validateStatus={touched?.employeeNote && errors?.employeeNote ? 'error' : 'success'}
            >
              <Input.TextArea
                value={get(values, 'employeeNote')}
                onChange={getHandleChange('employeeNote')}
                onBlur={getHandleBlur('employeeNote')}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name={['employeeDocument']}
              label={t('employeePage:DOCUMENT.LABEL')}
              tooltip={t('employeePage:DOCUMENT.TOOLTIP')}
              className={classes.formItem}
              help={touched?.employeeDocument && errors?.employeeDocument}
              validateStatus={touched?.employeeDocument && errors?.employeeDocument ? 'error' : 'success'}
            >
              <UploadDocument value={get(values, 'employeeDocument')} onChange={getHandleChange('employeeDocument')} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default PermitRequestModal;

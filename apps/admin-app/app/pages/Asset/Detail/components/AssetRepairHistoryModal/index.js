import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker, Form, Input, Modal, Row, Col, Select } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { get } from 'lodash';
import * as Yup from 'yup';
import moment from 'moment';

import { validate } from '@shared/yup';

import { AssetDetailSelector } from '../../redux/selectors';
import { DEFAULT_DATE_FORMAT } from '@shared/shared/constants';
import { toFakeLocalDate, reverseLocalTime } from '@shared/utils/dateHelper';
import useStyles from './styles';
import { ASSET_REPAIR_HISTORY_CURRENCY_SYMBOLS_OPTIONS } from '@app/pages/Asset/constants';
import { Creators } from '../../redux/actions';

const assetRepairHistorySchema = () => {
  return Yup.object()
    .shape({
      repairDate: Yup.date().required(),
      repairCostWholeNumber: Yup.number().nullable(true),
      repairCostFraction: Yup.lazy(value => (value === '' ? Yup.string() : Yup.number().nullable(true))),
      currencyType: Yup.number().nullable(true),
      repairInvoiceNumber: Yup.string(),
      repairNotes: Yup.string().required(),
    });
};

const getInitialValues = record => {
  if (record) {
    const [repairCostWholeNumber, repairCostFraction] = record.repairCost ? Number(record.repairCost).toFixed(2).toString().split('.') : [null, null];
    return {
      repairDate: record.repairDate ? moment.utc(reverseLocalTime(get(record, 'repairDate'))) : undefined,
      repairCostWholeNumber,
      repairCostFraction,
      currencyType: get(record, 'currencyType', null),
      repairInvoiceNumber: get(record, 'repairInvoiceNumber', ''),
      repairNotes: get(record, 'repairNotes', ''),
    };
  }
  return {
    repairDate: null,
    repairCostWholeNumber: null,
    repairCostFraction: null,
    currencyType: null,
    repairInvoiceNumber: '',
    repairNotes: '',
  };
};

const manipulateValuesBeforeSubmit = values => ({
  ...values,
  repairDate: values.repairDate ? toFakeLocalDate(values.repairDate).toISOString() : undefined,
  repairCost: (values.repairCostWholeNumber) ?
    +(Number([values.repairCostWholeNumber, +values.repairCostFraction].join('.')).toFixed(2))
    : undefined,
  currencyType: values.currencyType ? values.currencyType : undefined,
});

const AssetRepairHistoryModal = ({ assetId, isEditMode = false, record = {}, handleClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation(['assetPage', 'global']);
  const [form] = Form.useForm();
  const theme = useTheme();
  const classes = useStyles();
  const [isFormEditable, setIsFormEditable] = useState(false);

  const isPending = useSelector(AssetDetailSelector.getAssetDetailIsPending);

  const formik = useFormik({
    initialValues: isEditMode ? getInitialValues(record) : getInitialValues(),
    validate: validate(assetRepairHistorySchema),
    onSubmit: values => {
      if (isEditMode) {
        dispatch(Creators.updateAssetRepairHistoryRequest({ body: { ...manipulateValuesBeforeSubmit(values), id: record._id, assetId } }));
      }
      else {
        dispatch(Creators.createAssetRepairHistoryRequest({ body: { ...manipulateValuesBeforeSubmit(values), assetId } }));
      }
      handleClose();
    },
  });

  const { handleSubmit, values, errors, setFieldValue, touched, resetForm, setValues } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  const handleCloseModal = () => {
    resetForm();
    setValues(getInitialValues());
    handleClose();
  };

  const handleOk = () => {
    if (isEditMode && !isFormEditable) {
      setIsFormEditable(true);
      return;
    }
    if (Object.keys(errors).length) {
      return;
    }
    handleSubmit(values);
  };

  return (
    <Form form={form} id="repair-history" layout="vertical">
      <Modal
        centered
        title={t('REPAIR_HISTORY')}
        visible
        onOk={handleOk}
        okText={(isEditMode && !isFormEditable) ? t('button:EDIT') : t('button:SAVE')}
        cancelText={t('button:CANCEL')}
        onCancel={handleCloseModal}
        closable={!isPending}
      >
        <Row gutter={[theme.spacing(3)]} align="bottom">
          <Col span={24}>
            <Form.Item
              help={get(errors, 'repairDate')}
              validateStatus={touched.repairDate && get(errors, 'repairDate') ? 'error' : 'success'}
              name={['repairDate']}
              label={t('INVOICE_DATE')}
            >
              <DatePicker
                value={values.repairDate}
                onChange={date => setFieldValue('repairDate', date)}
                format={DEFAULT_DATE_FORMAT}
                placeholder={t('REPAIR_DATE')}
                className={classes.datePickerWidth}
                disabled={isPending || (isEditMode && !isFormEditable)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className={classes.costRow} gutter={[theme.spacing(3)]} align="bottom">
          <Col className={classes.inputCol12} span={12}>
            <Form.Item
              help={get(errors, 'repairCostWholeNumber')}
              validateStatus={touched.repairCostWholeNumber && get(errors, 'repairCostWholeNumber') ? 'error' : 'success'}
              name={['repairCostWholeNumber']}
              label={t('REPAIR_COST')}
            >
              <Input
                value={values.repairCostWholeNumber}
                onChange={e => setFieldValue('repairCostWholeNumber', e.target.value)}
                disabled={isPending || (isEditMode && !isFormEditable)}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
          <Col className={classes.inputCol12} span={1}>
            ,
          </Col>
          <Col className={classes.inputCol6} span={5}>
            <Form.Item
              help={get(errors, 'repairCostFraction')}
              validateStatus={touched.repairCostFraction && get(errors, 'repairCostFraction') ? 'error' : 'success'}
              name={['repairCostFraction']}
            >
              <Input
                value={values.repairCostFraction}
                onChange={e => setFieldValue('repairCostFraction', e.target.value)}
                disabled={isPending || (isEditMode && !isFormEditable)}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
          <Col className={classes.inputCol6} span={6}>
            <Form.Item
              help={get(errors, 'currencyType')}
              validateStatus={touched.currencyType && get(errors, 'currencyType') ? 'error' : 'success'}
              name={['currencyType']}
            >
              <Select
                allowClear
                disabled={isPending || (isEditMode && !isFormEditable)}
                value={values.currencyType}
                options={ASSET_REPAIR_HISTORY_CURRENCY_SYMBOLS_OPTIONS}
                onChange={value => setFieldValue('currencyType', value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[theme.spacing(3)]} align="bottom">
          <Col span={24}>
            <Form.Item
              help={get(errors, 'repairInvoiceNumber')}
              validateStatus={touched.repairInvoiceNumber && get(errors, 'repairInvoiceNumber') ? 'error' : 'success'}
              name={['repairInvoiceNumber']}
              label={t('REPAIR_INVOICE_NUMBER')}
            >
              <Input
                value={values.repairInvoiceNumber}
                onChange={e => setFieldValue('repairInvoiceNumber', e.target.value)}
                disabled={isPending || (isEditMode && !isFormEditable)}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[theme.spacing(3)]} align="bottom">
          <Col span={24}>
            <Form.Item
              help={get(errors, 'repairNotes')}
              validateStatus={touched.repairNotes && get(errors, 'repairNotes') ? 'error' : 'success'}
              name={['repairNotes']}
              label={t('REPAIR_NOTES')}
            >
              <Input
                value={values.repairNotes}
                onChange={e => setFieldValue('repairNotes', e.target.value)}
                disabled={isPending || (isEditMode && !isFormEditable)}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
        </Row>
      </Modal>
    </Form>
  );
};

export default AssetRepairHistoryModal;

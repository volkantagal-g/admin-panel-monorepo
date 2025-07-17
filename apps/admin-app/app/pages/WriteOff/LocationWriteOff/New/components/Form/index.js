import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Row, Col, Button, Divider } from 'antd';
import { useFormik } from 'formik';
import { get, isEmpty } from 'lodash';
import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';

import { exampleCsv } from './config';
import { defaultValues, validationSchema } from './formHelper';
import {
  DatePickerWrapper,
  SelectWrapper,
} from '@shared/components/UI/Form';
import { validate } from '@shared/yup';
import Card from '@shared/components/UI/AntCard';
import { Creators } from '../../redux/actions';
import { locationWriteOffReasons, locationWriteOffComments } from '@shared/shared/constantValues';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import Footer from '../Footer';
import CsvImporter from '@shared/components/UI/CsvImporter';
import useStyles from './styles';
import Products from '../Products';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import { getFilteredWarehousesSelector } from '@shared/redux/selectors/common';
import { locationsSelector } from '../../redux/selectors';
import { WAREHOUSE_LOCATION_STATES } from '@shared/shared/constants';

const { useForm } = Form;

function FormWrapper() {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const mainWarehouses = useSelector(getFilteredWarehousesSelector.getData) || [];
  const locations = useSelector(locationsSelector.getData) || [];
  const reasonsSelectOptions = convertConstantValuesToSelectOptions(locationWriteOffReasons);
  const commentSelectOptions = convertConstantValuesToSelectOptions(locationWriteOffComments, false);

  const [form] = useForm();
  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      dispatch(Creators.createLocationWriteOffRequest({ requestBody: values }));
    },
    enableReinitialize: true,
  });
  const [isCSVModalOpen, setIsCSVModalOpen] = useState(false);
  const [CSVProducts, setCSVProducts] = useState({});
  const [hasValidAmounts, setHasValidAmounts] = useState(false);
  const [hasValidComments, setHasValidComments] = useState(false);

  const { handleSubmit, values, errors, touched, setFieldValue, setFieldTouched, isValid } = formik;

  const locationBarcode = locations.find(location => location._id === values.warehouseLocationId)?.barcode;

  const handleCsvImport = ({ data }) => {
    setFieldTouched('warehouseId');
    setFieldTouched('warehouseLocationId');
    if (!values.warehouseId || !values.warehouseLocationId) {
      return;
    }
    let hasDuplicates = false;
    const csvProducts = data.reduce((acc, curr) => {
      if (curr.productId) {
        if (acc[curr.productId]) {
          hasDuplicates = true;
        }
        acc[curr.productId] = curr;
      }
      return acc;
    }, {});
    if (isEmpty(csvProducts)) {
      dispatch(ToastCreators.error({
        message:
          t('error:INVALID_CSV'),
      }));
      return;
    }
    if (hasDuplicates) {
      dispatch(ToastCreators.error({ message: t('writeOffPage:DUPLICATES_IN_CSV') }));
      return;
    }
    setCSVProducts(csvProducts);
  };

  const handleSelectChange = fieldName => {
    return fieldValue => {
      // Reset location field when warehouse is changed
      if (fieldName === 'warehouseId') {
        setFieldValue('warehouseLocationId', undefined);
        form.setFields([{ name: 'warehouseLocationId', value: undefined }]);
        dispatch(Creators.getLocationsRequest({ warehouseId: fieldValue, states: [WAREHOUSE_LOCATION_STATES.ACTIVE] }));
      }
      setFieldValue(fieldName, fieldValue);
      setCSVProducts({});
    };
  };

  const onUpdateProducts = useCallback((fieldValue, isAllAmountsValid, isAllCommentsValid) => {
    setHasValidAmounts(isAllAmountsValid);
    setHasValidComments(isAllCommentsValid);
    setFieldValue('products', fieldValue);
  }, [setFieldValue]);

  const disabledDate = current => {
    // Can not select days before previous month
    return current && (current < moment().subtract(1, 'month').startOf('month'));
  };

  return (
    <Card title={t('writeOffPage:LOCATION_WRITE_OFF')} bordered={false} footer={<Footer disabled={!(isValid && hasValidAmounts && hasValidComments)} />}>
      <Form
        id="new-location-write-off"
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Row gutter={[16]} align="top">
          <Col span={12}>
            <SelectWrapper
              selectKey="warehouseId"
              label={t('writeOffPage:LOCATION_WAREHOUSE')}
              placeholder={t('writeOffPage:SELECT_WAREHOUSE')}
              value={values.warehouseId}
              hasError={get(errors, 'warehouseId')}
              isTouched={get(touched, 'warehouseId')}
              optionsData={mainWarehouses}
              optionLabelProp="name"
              optionValueProp="_id"
              onChangeCallback={(handleSelectChange('warehouseId'))}
            />
          </Col>
        </Row>
        <Row gutter={[16]} align="top">
          <Col span={12}>
            <SelectWrapper
              selectKey="warehouseLocationId"
              label={t('writeOffPage:LOCATION')}
              placeholder={t('writeOffPage:SELECT_LOCATION')}
              value={values.warehouseLocationId}
              hasError={get(errors, 'warehouseLocationId')}
              isTouched={get(touched, 'warehouseLocationId')}
              optionsData={locations}
              optionLabelProp="barcode"
              optionValueProp="_id"
              onChangeCallback={(handleSelectChange('warehouseLocationId'))}
            />
          </Col>
        </Row>
        <Row gutter={[16]} align="top">
          <Col span={12}>
            <SelectWrapper
              selectKey="reason"
              label={t('writeOffPage:REASON')}
              placeholder={t('writeOffPage:SELECT_REASON')}
              value={values.reason}
              shouldMapOptionsData
              hasError={get(errors, 'reason')}
              isTouched={get(touched, 'reason')}
              optionsData={reasonsSelectOptions}
              onChangeCallback={(handleSelectChange('reason'))}
            />
          </Col>
        </Row>
        <Row gutter={[16]} align="top">
          <Col span={12}>
            <SelectWrapper
              selectKey="comment"
              label={t('writeOffPage:COMMENT')}
              placeholder={t('writeOffPage:SELECT_COMMENT')}
              value={values.comment}
              shouldMapOptionsData
              hasError={get(errors, 'comment')}
              isTouched={get(touched, 'comment')}
              optionsData={commentSelectOptions}
              onChangeCallback={(handleSelectChange('comment'))}
            />
          </Col>
        </Row>
        <Row gutter={[16]} align="top">
          <Col span={12}>
            <DatePickerWrapper
              selectKey="documentedDate"
              label={t('writeOffPage:DOCUMENTED_DATE')}
              disabledDate={disabledDate}
              value={values.documentedDate}
              hasError={get(errors, 'documentedDate')}
              isTouched={get(touched, 'documentedDate')}
              onChangeCallback={handleSelectChange('documentedDate')}
              setDefaultValue={false}
              allowClear
            />
          </Col>
        </Row>
        <Row gutter={[16]} align="top">
          <Col span={12}>
            <div className={classes.label}>{t('global:IMPORT_CSV')}</div>
            <Button onClick={() => setIsCSVModalOpen(true)}>
              <CsvImporter
                onOkayClick={handleCsvImport}
                hasNestedHeaderKeys
                exampleCsv={exampleCsv}
                isVisible={isCSVModalOpen}
                warningText={t('writeOffPage:CSV_EXAMPLE_WARNING')}
              />
            </Button>
          </Col>
        </Row>
      </Form>
      <Divider />
      <Products
        warehouseId={values.warehouseId}
        locationBarcode={locationBarcode}
        CSVProducts={CSVProducts}
        onCleanCSVProducts={() => setCSVProducts({})}
        onValidateFields={() => {
          setFieldTouched('warehouseId');
          setFieldTouched('warehouseLocationId');
        }}
        onUpdateProducts={onUpdateProducts}
      />
    </Card>
  );
}

export default FormWrapper;

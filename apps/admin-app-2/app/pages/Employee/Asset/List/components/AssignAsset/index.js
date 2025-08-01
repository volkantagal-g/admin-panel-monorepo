import { useState, useEffect } from 'react';
import { Button, Modal, Col, Form, DatePicker, Input, Select, Typography, Alert } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';
import * as Yup from 'yup';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';

import { validate } from '@shared/yup';
import { DEFAULT_DATE_FORMAT, COUNTRIES } from '@shared/shared/constants';
import useStyles from '../../styles';
import { Creators } from '../../redux/actions';
import { getAvailableAssetsSelector, employeeNonPrivateInformationSelector } from '../../redux/selectors';
import { convertSelectOptions } from '@shared/utils/common';
import { TODAY_START } from '@app/pages/Employee/constants';
import { ALL_ASSET_TYPE_OPTIONS, ASSET_CATEGORIES, ASSET_TYPES_BY_CATEGORY } from '@app/pages/Asset/constants';
import { getSelectedLanguage } from '@shared/redux/selectors/languageSelection';

const { Paragraph } = Typography;

const assignAssetSchema = () => {
  return Yup.object()
    .shape({
      assetType: Yup.string(),
      asset: Yup.string(),
      assignDate: Yup.date(),
      assignNote: Yup.string(),
    });
};

const getInitialValues = asset => {
  const initialValues = {
    deviceType: get(asset, 'deviceType', 1),
    asset: get(asset, 'asset', ''),
    assignNote: get(asset, 'assignNote', ''),
    assignDate: get(asset, 'assignDate') ? moment(get(asset, 'assignDate')) : TODAY_START,
  };
  return initialValues;
};

export const assetOptionMapper = ({ name, deviceType, deviceConfig, deviceSerialNumber, barcode = '', ...rest }) => {
  let label = `${deviceSerialNumber} - ${name}`;
  if (barcode) {
    label += ` - ${barcode}`;
  }

  if (deviceType === ASSET_TYPES_BY_CATEGORY[ASSET_CATEGORIES.IT].CELL_PHONE) {
    if (deviceConfig?.imei1) label += ` - ${deviceConfig.imei1}`;
  }

  return { label, ...rest };
};

export default function AssignAsset({ isAssetsPending }) {
  const { t } = useTranslation(['assetPage', 'employeePage', 'button']);
  const [form] = Form.useForm();
  const classes = useStyles();
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const [assetOptions, setAssetOptions] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState();
  const { id: employeeId } = useParams();

  const data = useSelector(getAvailableAssetsSelector.getData);
  const isPending = useSelector(getAvailableAssetsSelector.getIsPending);
  const employeeData = useSelector(employeeNonPrivateInformationSelector.getData);
  const employeeDataIsPending = useSelector(employeeNonPrivateInformationSelector.getIsPending);
  const selectedLanguage = useSelector(getSelectedLanguage);

  const formik = useFormik({
    initialValues: getInitialValues({}),
    validate: validate(assignAssetSchema),
    onSubmit: values => {
      form.setFieldsValue(getInitialValues({}));
      setVisible(false);
      dispatch(Creators.assignEmployeeAssetRequest({ ...values, employeeId, payrollCountryCode: employeeData?.payrollCountryCode, t }));
    },
  });

  const { handleSubmit, values, errors, setFieldValue, touched, setValues, resetForm } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  useEffect(() => {
    dispatch(Creators.getAvailableAssetsRequest({ deviceType: values.deviceType, t }));
  }, [values.deviceType, t, dispatch]);

  useEffect(() => {
    const transformedOptions = data.map(assetOptionMapper);
    const newOptions = convertSelectOptions(transformedOptions, { valueKey: '_id', labelKey: 'label', isData: true });
    setAssetOptions(newOptions);
  }, [data]);

  useEffect(() => {
    if (visible) {
      resetForm();
      setValues(getInitialValues({}));
    }
  }, [visible, resetForm, setValues]);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    if (errors) {
      return;
    }
    handleSubmit(values);
  };

  const handleCancel = () => {
    setVisible(false);
    resetForm();
    setValues(getInitialValues({}));
  };
  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        loading={isAssetsPending || isPending}
        icon={<PlusOutlined />}
      >
        {t('employeePage:BUTTONS.ADD_NEW_ASSET')}
      </Button>
      <Form form={form} id="assign-asset" onFinish={handleSubmit} layout="vertical">

        <Modal
          visible={visible}
          title="Assign Asset"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" htmlType="button" onClick={handleCancel}>
              {t('button:CANCEL')}
            </Button>,
            <Button
              form="assign-asset"
              htmlType="submit"
              key="submit"
              type="primary"
              onClick={handleOk}
              loading={employeeDataIsPending || !employeeData?.payrollCountryCode}
            >
              {t('button:SAVE')}
            </Button>,
          ]}
        >

          <Col span={24}>
            <Form.Item
              help={get(errors, 'deviceType')}
              validateStatus={get(errors, 'deviceType') && touched.deviceType ? 'error' : 'success'}
              name={['deviceType']}
              label={t('DEVICE_TYPE')}
            >
              <Select
                showSearch
                filterOption
                optionFilterProp="label"
                value={values.deviceType}
                options={ALL_ASSET_TYPE_OPTIONS(t)}
                placeholder={t('DEVICE_TYPE')}
                onChange={deviceType => {
                  setFieldValue('deviceType', deviceType);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={24} />
          <Col span={24}>
            <Form.Item
              help={get(errors, 'asset')}
              validateStatus={get(errors, 'asset') && touched.asset ? 'error' : 'success'}
              name={['asset']}
              label={t('employeePage:ASSET')}
            >
              <Select
                showSearch
                filterOption
                optionFilterProp="label"
                value={values.asset}
                options={assetOptions || []}
                loading={isPending}
                placeholder={t('ASSET')}
                onChange={asset => {
                  setFieldValue('asset', asset);
                  setSelectedAsset(asset ? assetOptions.find(option => option.value === asset)?.data : null);
                }}
              />
            </Form.Item>
          </Col>
          {
            selectedAsset?.country && employeeData?.payrollCountryCode?.toLowerCase() !== selectedAsset?.country?.toLowerCase() && (
              <Paragraph>
                <Alert
                  message={`${t('ASSET_COUNTRY_FILTERING_NOTE', { country: COUNTRIES[selectedAsset?.country?.toLowerCase()][selectedLanguage] })}`}
                  type="info"
                />
              </Paragraph>
            )
          }

          <Col span={24}>
            <Form.Item
              help={get(errors, 'assignNote')}
              validateStatus={get(errors, 'assignNote') ? 'error' : 'success'}
              name={['assignNote']}
              label={t('ASSIGNED_NOTE')}
            >
              <Input
                value={values.assignNote}
                onChange={event => {
                  const value = get(event, 'target.value', '');
                  setFieldValue('assignNote', value);
                }}
                autoComplete="off"
                placeholder={t('ASSIGNED_NOTE')}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              help={get(errors, 'assignDate')}
              validateStatus={get(errors, 'assignDate') ? 'error' : 'success'}
              name={['assignDate']}
              label={t('ASSIGNED_DATE')}
            >
              <DatePicker
                value={values.assignDate}
                onChange={_assignDate => {
                  setFieldValue('assignDate', _assignDate);
                }}
                format={DEFAULT_DATE_FORMAT}
                className={classes.datePickerWidth}
                placeholder={t('ASSIGNED_DATE')}
              />
            </Form.Item>
          </Col>
        </Modal>
      </Form>
    </>
  );
}

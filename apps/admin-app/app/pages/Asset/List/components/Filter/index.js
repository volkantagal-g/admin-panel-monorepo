import { useTranslation } from 'react-i18next';
import { Row, Col, Collapse, Space, Button, Input, Form, Select, Checkbox } from 'antd';

import { useSelector } from 'react-redux';

import { useFormik } from 'formik';

import { useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

import useStyles from './styles';
import SelectEmployee from '@shared/containers/Select/Employee';
import { EMPLOYMENT_STATUSES } from '@app/pages/Employee/constants';

import { employeeAssetListSelector } from '../../redux/selectors';
import { getInitialValues } from './filterHelper';
import {
  ASSET_ASSIGNMENT_STATUS_OPTIONS,
  ALL_ASSET_TYPE_OPTIONS,
  ASSET_COUNTRY_OPTIONS,
  ASSET_DEVICE_STATUS_OPTIONS,
} from '@app/pages/Asset/constants';

const { Panel } = Collapse;
const { Item } = Form;

const Filter = ({ filters, onFiltersChange }) => {
  const classes = useStyles();
  const [form] = Form.useForm();
  const { t } = useTranslation(['assetPage', 'global']);
  const [searchParams, setSearchParams] = useSearchParams();
  const assignedEmployeeName = searchParams.get('assignedEmployeeName');

  const isPending = useSelector(employeeAssetListSelector.getIsPending);

  const formik = useFormik({
    initialValues: getInitialValues(filters),
    enableReinitialize: true,
    onSubmit: values => {
      onFiltersChange({
        ...values,
        ...(values.assignedEmployeeExists ? { assignedEmployeeExists: true } : { assignedEmployeeExists: undefined }),
        ...(values.isBrandNew ? { isBrandNew: true } : { isBrandNew: undefined }),
      });
    },
  });

  const { handleSubmit, values, setFieldValue, handleReset } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  const handleOnClickReset = () => {
    handleReset();
    onFiltersChange(getInitialValues({}));
  };

  const handleAssignedEmployeeSearch = name => {
    searchParams.set('assignedEmployeeName', name);
    setSearchParams(searchParams);
  };

  const handleAssignedEmployeeExistsChange = event => {
    setFieldValue('assignedEmployeeExists', event.target.checked);
  };

  const handleBrandNewChange = event => {
    setFieldValue('isBrandNew', event.target.checked);
  };

  return (
    <Collapse defaultActiveKey={['1']} className={classes.root}>
      <Panel header={t('global:FILTER')} key="1">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Row gutter={[8, 8]}>
            <Col lg={{ span: 12 }} xs={{ span: 24 }}>
              <Item className={classes.formItem} label={t('NAME_OF_ASSET')}>
                <Input value={values.name} onChange={e => setFieldValue('name', e.target.value)} placeholder={t('NAME_OF_ASSET')} disabled={isPending} />
              </Item>
            </Col>
            <Col lg={{ span: 12 }} xs={{ span: 24 }}>
              <Item className={classes.formItem} label={t('DEVICE_TYPE')}>
                <Select
                  showSearch
                  filterOption
                  optionFilterProp="label"
                  disabled={isPending}
                  value={values.deviceType}
                  options={ALL_ASSET_TYPE_OPTIONS(t)}
                  placeholder={t('DEVICE_TYPE')}
                  onChange={deviceType => setFieldValue('deviceType', deviceType)}
                  allowClear
                />
              </Item>
            </Col>
          </Row>
          <Row gutter={[8, 8]}>

            <Col lg={{ span: 12 }} xs={{ span: 24 }}>
              <Item className={classes.formItem} label={t('ASSIGNMENT_STATUS')}>
                <Select
                  showSearch
                  filterOption
                  optionFilterProp="label"
                  disabled={isPending}
                  value={values.assignmentStatus}
                  options={ASSET_ASSIGNMENT_STATUS_OPTIONS(t)}
                  placeholder={t('ASSIGNMENT_STATUS')}
                  onChange={assignmentStatus => setFieldValue('assignmentStatus', assignmentStatus)}
                  allowClear
                />
              </Item>
            </Col>

            <Col lg={{ span: 12 }} xs={{ span: 24 }}>
              <Item className={classes.formItem} label={t('ASSIGNED_EMPLOYEE')}>
                <SelectEmployee
                  showSearch
                  filters={{ employmentStatuses: Object.values(EMPLOYMENT_STATUSES) }}
                  value={values.assignedEmployee}
                  onChange={assignedEmployee => setFieldValue('assignedEmployee', assignedEmployee)}
                  name="assignedEmployee"
                  disabled={isPending}
                  isFetchOptionsOnLoad
                  initialSearchTerm={assignedEmployeeName}
                  onSearch={handleAssignedEmployeeSearch}
                />
              </Item>
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col lg={{ span: 12 }} xs={{ span: 24 }}>
              <Item className={classes.formItem} label={t('BARCODE')}>
                <Input value={values.barcode} onChange={e => setFieldValue('barcode', e.target.value)} placeholder={t('BARCODE')} disabled={isPending} />
              </Item>
            </Col>
            <Col lg={{ span: 12 }} xs={{ span: 24 }}>
              <Item className={classes.formItem} label={`${t('DEVICE_SERIAL_NUMBER')} ${t('IMEI')}`}>
                <Input
                  value={values.deviceSerialNumberAndIMEI}
                  onChange={e => setFieldValue('deviceSerialNumberAndIMEI', e.target.value)}
                  placeholder={`${t('DEVICE_SERIAL_NUMBER')}, ${t('IMEI1')}, ${t('IMEI2')}`}
                  disabled={isPending}
                />
              </Item>
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col lg={{ span: 12 }} xs={{ span: 24 }}>
              <Item className={classes.formItem} label={t('INVOICE_NUMBER')}>
                <Input
                  value={values.invoiceNumber}
                  onChange={e => setFieldValue('invoiceNumber', e.target.value)}
                  placeholder={t('INVOICE_NUMBER')}
                  disabled={isPending}
                />
              </Item>
            </Col>
            <Col lg={{ span: 12 }} xs={{ span: 24 }}>
              <Item className={classes.formItem} label={t('DEVICE_MAC_ADDRESS')}>
                <Input
                  value={values.deviceMacAddress}
                  onChange={e => setFieldValue('deviceMacAddress', e.target.value)}
                  placeholder={t('DEVICE_MAC_ADDRESS')}
                  disabled={isPending}
                />
              </Item>
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col lg={{ span: 12 }} xs={{ span: 24 }}>
              <Item
                className={classes.formItem}
                name={['country']}
                label={t('COUNTRY')}
                tooltip={t('COUNTRY_FILTER_TOOLTIP')}
              >
                <Select
                  showSearch
                  filterOption
                  optionFilterProp="label"
                  disabled={isPending}
                  value={values.country}
                  options={ASSET_COUNTRY_OPTIONS(t)}
                  placeholder={t('COUNTRY')}
                  onChange={country => setFieldValue('country', country)}
                />
              </Item>
            </Col>
            <Col lg={{ span: 12 }} xs={{ span: 24 }}>
              <Item
                className={classes.formItem}
                name={['deviceStatuses']}
                label={t('DEVICE_STATUS')}
                tooltip={t('DEVICE_STATUS')}
              >
                <Select
                  showSearch
                  filterOption
                  allowClear
                  mode="multiple"
                  optionFilterProp="label"
                  disabled={isPending}
                  value={values.deviceStatuses}
                  options={ASSET_DEVICE_STATUS_OPTIONS(t)}
                  placeholder={t('COUNTRY')}
                  onChange={deviceStatuses => setFieldValue('deviceStatuses', deviceStatuses)}
                />
              </Item>
            </Col>
            <Col lg={{ span: 2 }} xs={{ span: 4 }}>
              <Item
                className={classes.formItem}
                name={['assignedEmployeeExists']}
                label={t('IS_ASSIGNED')}
              >
                <Checkbox
                  checked={values.assignedEmployeeExists}
                  onChange={handleAssignedEmployeeExistsChange}
                  disabled={isPending}
                />
              </Item>
            </Col>
            <Col lg={{ span: 2 }} xs={{ span: 4 }}>
              <Item
                className={classes.formItem}
                name={['isBrandNew']}
                label={t('BRAND_NEW')}
              >
                <Checkbox
                  checked={values.isBrandNew}
                  onChange={handleBrandNewChange}
                  disabled={isPending}
                />
              </Item>
            </Col>
          </Row>
          <Row gutter={[8, 8]} justify="end">
            <Space size="small">
              <Item className={classes.formItem}>
                <Button
                  onClick={handleOnClickReset}
                >{t('global:RESET')}
                </Button>
              </Item>
              <Item className={classes.formItem}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isPending}
                  onClick={handleSubmit}
                >{t('global:FILTER')}
                </Button>
              </Item>
            </Space>
          </Row>
        </Form>
      </Panel>
    </Collapse>
  );
};

export default Filter;

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Row, Col, Button, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useTheme } from 'react-jss';

import _get from 'lodash/get';

import { getSelectFilterOption } from '@shared/utils/common';

import { isAllowedToOperate } from '../../utils';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import {
  getSupplierByIdSelector,
  updateSupplierSelector,
} from '../../redux/selectors';
import { validationSchema, getInitialValues } from './formHelper';
import AntCard from '@shared/components/UI/AntCard';
import { usePrevious } from '@shared/hooks';
import { firmTypes } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';
import { validate } from '@shared/yup';
import { Creators } from '../../redux/actions';

import useStyles from './styles';

const { TextArea } = Input;
const { Option } = Select;

const SupplierDetailForm = () => {
  const dispatch = useDispatch();
  const supplier = useSelector(getSupplierByIdSelector.getData) || {};
  const isUpdatePending = useSelector(updateSupplierSelector.getIsPending);
  const [isFormEditable, setIsFormEditable] = useState(false);
  const { t } = useTranslation('supplierPage');
  const selectedCountry = useSelector(getSelectedCountryV2);
  const [form] = Form.useForm();
  const theme = useTheme();
  const prevIsUpdatePending = usePrevious(isUpdatePending);

  const classes = useStyles();

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues: getInitialValues(supplier),
    onSubmit: values => {
      // eslint-disable-next-line no-unused-vars
      const { county, ...submitValues } = values;
      dispatch(
        Creators.updateSupplierRequest({
          id: supplier._id,
          updateData: submitValues,
        }),
      );

      setIsFormEditable(false);
    },
  });

  const { handleSubmit, handleChange, values, errors, setFieldValue } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  useEffect(() => {
    if (prevIsUpdatePending && !isUpdatePending) {
      setIsFormEditable(false);
    }
  }, [isUpdatePending, prevIsUpdatePending]);

  const handleCancelClick = () => {
    setIsFormEditable(false);
  };

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  const handleSaveClick = () => {
    form.submit();
  };

  const cardFooter = (
    <Row justify="end" gutter={[theme.spacing(2)]}>
      {isFormEditable ? (
        <>
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button size="small" onClick={handleCancelClick}>
                {t('button:CANCEL')}
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button
                size="small"
                form="supplier-detail"
                type="primary"
                onClick={handleSaveClick}
                loading={isUpdatePending}
              >
                {t('button:SAVE')}
              </Button>
            </Form.Item>
          </Col>
        </>
      ) : (
        <Col>
          <Form.Item className="mb-0 mt-0">
            <Button
              size="small"
              onClick={handleEditClick}
              disabled={!isAllowedToOperate(selectedCountry)}
            >
              {t('button:EDIT')}
            </Button>
          </Form.Item>
        </Col>
      )}
    </Row>
  );

  const options = Object.entries(firmTypes).map(([key, value]) => {
    return (
      <Option key={key} value={key}>
        {value[getLangKey()]}
      </Option>
    );
  });

  return (
    <AntCard
      footer={cardFooter}
      bordered={false}
      title={
        (
          <span className={classes.title}>
            {t('SUPPLIER_INFO')}
            <span>
              {
                supplier.supplierReferenceId ?
                  `${t('SUPPLIER_REFERENCE_ID')} : ${supplier.supplierReferenceId}`
                  :
                  ''
              }
            </span>
          </span>
        )
      }
    >
      <Form
        form={form}
        id="supplier-detail"
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Row gutter={[theme.spacing(3)]}>
          <Col span={12}>
            <Form.Item
              help={_get(errors, 'name')}
              validateStatus={_get(errors, 'name') ? 'error' : 'success'}
              name="name"
              label={t('global:NAME_1')}
            >
              <Input
                value={values.name}
                onChange={handleChange}
                disabled={isUpdatePending || !isFormEditable}
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item
              help={_get(errors, 'shortName')}
              validateStatus={_get(errors, 'shortName') ? 'error' : 'success'}
              name="shortName"
              label={t('global:SHORT_NAME')}
            >
              <Input
                value={values.shortName}
                onChange={handleChange}
                disabled={isUpdatePending || !isFormEditable}
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item
              help={_get(errors, 'title')}
              validateStatus={_get(errors, 'title') ? 'error' : 'success'}
              name="title"
              label={t('global:TITLE1')}
            >
              <Input
                value={values.title}
                onChange={handleChange}
                disabled={isUpdatePending || !isFormEditable}
                autoComplete="off"
              />
            </Form.Item>
            <Row gutter={[theme.spacing(3)]}>
              <Col span={12}>
                <Form.Item
                  help={_get(errors, 'phone')}
                  validateStatus={_get(errors, 'phone') ? 'error' : 'success'}
                  name="phone"
                  label={t('global:PHONE')}
                >
                  <Input
                    value={values.phone}
                    onChange={handleChange}
                    disabled={isUpdatePending || !isFormEditable}
                    autoComplete="off"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  help={_get(errors, 'fax')}
                  validateStatus={_get(errors, 'fax') ? 'error' : 'success'}
                  name="fax"
                  label={t('global:FAX')}
                >
                  <Input
                    value={values.fax}
                    onChange={handleChange}
                    disabled={isUpdatePending || !isFormEditable}
                    autoComplete="off"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[theme.spacing(3)]}>
              <Col span={8}>
                <Form.Item
                  help={_get(errors, 'zipCode')}
                  validateStatus={
                    _get(errors, 'zipCode') ? 'error' : 'success'
                  }
                  name="zipCode"
                  label={t('global:ZIP_CODE')}
                >
                  <Input
                    value={values.zipCode}
                    onChange={handleChange}
                    disabled={isUpdatePending || !isFormEditable}
                    autoComplete="off"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  help={_get(errors, 'city')}
                  validateStatus={_get(errors, 'city') ? 'error' : 'success'}
                  name={['city']}
                  label={t('global:CITY')}
                >
                  <Input
                    value={values.city}
                    onChange={handleChange}
                    disabled={isUpdatePending || !isFormEditable}
                    autoComplete="off"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  help={_get(errors, 'district')}
                  validateStatus={
                    _get(errors, 'district') ? 'error' : 'success'
                  }
                  name={['district']}
                  label={t('global:DISTRICT')}
                >
                  <Input
                    value={values.district}
                    onChange={handleChange}
                    disabled={isUpdatePending || !isFormEditable}
                    autoComplete="off"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Form.Item
              help={_get(errors, 'address')}
              validateStatus={_get(errors, 'address') ? 'error' : 'success'}
              name="address"
              label={t('global:ADDRESS')}
            >
              <TextArea
                value={values.address}
                onChange={handleChange}
                disabled={isUpdatePending || !isFormEditable}
                autoComplete="off"
                rows={1}
              />
            </Form.Item>
            <Row gutter={[theme.spacing(3)]}>
              <Col span={8}>
                <Form.Item
                  help={_get(errors, 'cityPlate')}
                  validateStatus={
                    _get(errors, 'cityPlate') ? 'error' : 'success'
                  }
                  name="cityPlate"
                  label={t('global:CITY_PLATE')}
                >
                  <Input
                    value={values.cityPlate}
                    onChange={handleChange}
                    disabled={isUpdatePending || !isFormEditable}
                    autoComplete="off"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  help={_get(errors, 'vn')}
                  validateStatus={_get(errors, 'vn') ? 'error' : 'success'}
                  name="vn"
                  label={t('global:TAX_NUMBER')}
                >
                  <Input
                    value={values.vn}
                    onChange={handleChange}
                    disabled={isUpdatePending || !isFormEditable}
                    autoComplete="off"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  help={_get(errors, 'vd')}
                  validateStatus={_get(errors, 'vd') ? 'error' : 'success'}
                  name="vd"
                  label={t('global:TAX_OFFICE')}
                >
                  <Input
                    value={values.vd}
                    onChange={handleChange}
                    disabled={isUpdatePending || !isFormEditable}
                    autoComplete="off"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              help={_get(errors, 'types')}
              validateStatus={_get(errors, 'types') ? 'error' : 'success'}
              name="types"
              label={t('global:TYPE3')}
            >
              <Select
                value={values.types}
                onChange={value => {
                  setFieldValue('types', value);
                }}
                mode="multiple"
                allowClear
                disabled={isUpdatePending || !isFormEditable}
                autoComplete="off"
                showSearch
                filterOption={getSelectFilterOption}
              >
                {options}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </AntCard>
  );
};

export default SupplierDetailForm;

import { Form, Row, Switch, Col, Typography, DatePicker, Select, Upload } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get, isEqual } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';

import { validate } from '@shared/yup';
import { InputWrapper } from '@shared/components/UI/Form';
import Spinner from '@shared/components/Spinner';
import Card from '@shared/components/UI/AntCard';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { getLocalDateFormat } from '@shared/utils/localization';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { arrangeFileList } from '../../utils';
import { Creators } from '../../redux/actions';
import { announcementDetailData } from '../../redux/selectors';
import WarehousesSelect from '../../../components/WarehousesSelect';
import { defaultValues, validationSchema } from './formHelper';
import Footer from '../Footer';
import { WAREHOUSE, FRANCHISE } from '../../constants';
import useStyles from './styles';

const { Text } = Typography;
const { useForm } = Form;
const { RangePicker } = DatePicker;

const FormWrapper = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation('fieldAnnouncementPage');
  const { canAccess } = usePermission();
  const [form] = useForm();
  const { _id: selectedCountryId } = getSelectedCountry();

  const announcementDetail = useSelector(announcementDetailData.getData);
  const isPendingAnnouncementDetail = useSelector(announcementDetailData.isPending);
  const updateDetailError = useSelector(announcementDetailData.getError);

  const [isFormEditable, setIsFormEditable] = useState(false);

  const {
    warehouseIds,
    active,
    title,
    description,
    id,
    announcementType,
    dateRange,
    franchiseNames,
  } = announcementDetail;

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      dispatch(
        Creators.updateWarehouseAnnouncementDetailRequest({
          requestBody: {
            warehouseIds: values.warehouseIds,
            title: { en: values.titleEn, native: values.titleNative },
            description: { en: values.descriptionEn, native: values.descriptionNative },
            id,
          },
        }),
      );
      setIsFormEditable(false);
    },
    enableReinitialize: true,
  });

  const { handleSubmit, values, errors, setValues, touched, setFieldValue, handleChange } = formik;

  const handleResetForm = useCallback(() => {
    const initialProps = {
      warehouseIds,
      active,
      titleEn: title?.en,
      titleNative: title?.native,
      descriptionEn: description?.en,
      descriptionNative: description?.native,
    };

    if (isEqual(values, initialProps)) {
      return false;
    }

    setValues(initialProps);
    form.setFieldsValue(initialProps);
    return true;
  }, [active, description?.en, description?.native, form, setValues, title?.en, title?.native, values, warehouseIds]);

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  useEffect(() => {
    if (updateDetailError) {
      handleResetForm();
    }
  }, [handleResetForm, updateDetailError]);

  useEffect(() => {
    const detailValues = {
      warehouseIds,
      active,
      titleEn: title?.en,
      titleNative: title?.native,
      descriptionEn: description?.en,
      descriptionNative: description?.native,
    };
    form.setFieldsValue(detailValues);
    setValues(detailValues);
  }, [form, setValues, warehouseIds, active, title, description]);

  const handleSelectChange = fieldName => {
    return selectedItems => {
      setFieldValue(fieldName, selectedItems);
    };
  };

  const returnAnnouncementCardTitle = () => {
    if (announcementType === WAREHOUSE) return t('WAREHOUSE_ANNOUNCEMENT');
    if (announcementType === FRANCHISE) return t('FRANCHISE_ANNOUNCEMENT');
    return t('ANNOUNCEMENT');
  };

  return isPendingAnnouncementDetail ? (
    <Spinner />
  ) : (
    <Card title={returnAnnouncementCardTitle()} bordered={false}>
      <Form id="update-warehouse-announcement" form={form} onFinish={handleSubmit} autoComplete="off" layout="vertical">
        <Row gutter={[16]} align="top">
          {announcementType === WAREHOUSE ? (
            <Col span={24}>
              <Form.Item
                name="warehouseIds"
                label={t('WAREHOUSES')}
                help={get(touched, 'warehouseIds') && get(errors, 'warehouseIds')}
                validateStatus={get(touched, 'warehouseIds') && get(errors, 'warehouseIds') ? 'error' : 'success'}
              >
                <WarehousesSelect
                  value={values.warehouseIds}
                  onChange={handleSelectChange('warehouseIds')}
                  country={selectedCountryId}
                  disabled={!selectedCountryId || !isFormEditable}
                />
              </Form.Item>
            </Col>
          ) : (
            <Col md={12} sm={12} xs={24} className={classes.inputContainer}>
              <Text>{t('FRANCHISES')}</Text>
              <Select
                placeholder={t('FRANCHISES')}
                defaultValue={franchiseNames}
                className={classes.input}
                disabled
                mode="multiple"
              />
            </Col>
          )}
          {announcementType === FRANCHISE && (
            <Col md={12} sm={12} xs={24} className={classes.inputContainer}>
              <Text>{t('ANNOUNCEMENT_DATE')}</Text>
              <RangePicker
                value={dateRange}
                format={getLocalDateFormat()}
                className={classes.input}
                allowClear={false}
                disabled
              />
            </Col>
          )}
          <Col md={12} sm={12} xs={24}>
            <InputWrapper
              inputKey="titleNative"
              label={t('TITLE_NATIVE')}
              placeholder={t('TITLE_NATIVE')}
              value={values.titleNative}
              isTouched={get(touched, 'titleNative')}
              hasError={get(errors, 'titleNative')}
              handleChange={handleChange}
              disabled={!isFormEditable}
            />
          </Col>
          {announcementType === WAREHOUSE && (
            <Col md={12} sm={12} xs={24}>
              <InputWrapper
                inputKey="titleEn"
                label={t('TITLE_EN')}
                placeholder={t('TITLE_EN')}
                value={values.titleEn}
                isTouched={get(touched, 'titleEn')}
                hasError={get(errors, 'titleEn')}
                handleChange={handleChange}
                disabled={!isFormEditable}
              />
            </Col>
          )}
          <Col md={12} sm={12} xs={24}>
            <InputWrapper
              inputKey="descriptionNative"
              label={t('DESCRIPTION_NATIVE')}
              placeholder={t('DESCRIPTION_NATIVE')}
              value={values.descriptionNative}
              isTouched={get(touched, 'descriptionNative')}
              hasError={get(errors, 'descriptionNative')}
              handleChange={handleChange}
              mode="textarea"
              className={classes.textarea}
              additionalProps={{ autoSize: { minRows: 4, maxRows: 4 } }}
              disabled={!isFormEditable}
            />
          </Col>
          {announcementType === WAREHOUSE && (
            <Col md={12} sm={12} xs={24}>
              <InputWrapper
                inputKey="descriptionEn"
                label={t('DESCRIPTION_EN')}
                placeholder={t('DESCRIPTION_EN')}
                value={values.descriptionEn}
                isTouched={get(touched, 'descriptionEn')}
                hasError={get(errors, 'descriptionEn')}
                handleChange={handleChange}
                mode="textarea"
                className={classes.textarea}
                additionalProps={{ autoSize: { minRows: 4, maxRows: 4 } }}
                disabled={!isFormEditable}
              />
            </Col>
          )}
          <Col md={12} sm={12} xs={24}>
            <Form.Item name="active" label={t('ACTIVE')}>
              <Switch name="active" checked={values.active} onChange={e => setFieldValue('active', e)} disabled={!isFormEditable} />
            </Form.Item>
          </Col>
          {announcementType === FRANCHISE && announcementDetail?.announcementFiles?.length > 0 && (
            <Col md={12} sm={12} xs={24} className={classes.inputContainer}>
              <Text>{t('ATTACHMENTS')}</Text>
              <Upload
                listType="picture-card"
                width={120}
                fileList={arrangeFileList(announcementDetail?.announcementFiles)}
                onPreview={file => window.open(file.url)}
                disabled
              />
            </Col>
          )}
        </Row>
        {announcementType === WAREHOUSE && canAccess(permKey.PAGE_FIELD_ANNOUNCEMENT_DETAIL_COMPONENT_EDIT_ANNOUNCEMENT) && (
          <Row align="right">
            <Col span={24}>
              <Footer
                formButtonVisibilty={isFormEditable}
                setFormButtonVisibilty={setIsFormEditable}
                handleReset={handleResetForm}
                disabled={!values.active}
              />
            </Col>
          </Row>
        )}
      </Form>
    </Card>
  );
};

export default FormWrapper;

import { Form, Row, Switch, Col, DatePicker, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import moment from 'moment';

import { validate } from '@shared/yup';
import useStyles from './styles';
import Card from '@shared/components/UI/AntCard';
import { defaultValues, validationSchema } from './formHelper';
import Footer from '../Footer';
import { InputWrapper } from '@shared/components/UI/Form';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { Creators } from '../../redux/actions';
import WarehousesSelect from '../../../components/WarehousesSelect';
import CustomFranchisesSelect from '../../../components/CustomFranchisesSelect';
import { getLocalDateFormat } from '@shared/utils/localization';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { getRequestParamsToCreateAnnouncement } from '../../utils';
import { createFranchiseAnnouncementSelector, createWarehouseAnnouncementSelector } from '../../redux/selectors';
import CustomUpload from '../CustomUpload';

const { useForm } = Form;
const { RangePicker } = DatePicker;

function FormWrapper({ announcementType }) {
  const classes = useStyles();
  const [selectedStartDate, setSelectedStartDate] = useState();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const dispatch = useDispatch();

  const { _id: selectedCountryId } = getSelectedCountry();
  const { t } = useTranslation('fieldAnnouncementPage');
  const [form] = useForm();

  const isPendingCreateFranchiseAnnouncement = useSelector(createFranchiseAnnouncementSelector.getIsPending);
  const isPendingCreateWarehouseAnnouncement = useSelector(createWarehouseAnnouncementSelector.getIsPending);

  const isWarehouseAnnouncement = announcementType === 'warehouse';
  const isFranchiseAnnouncement = announcementType === 'franchise';

  const isVisibleForAllAnnouncementTypes = isWarehouseAnnouncement || isFranchiseAnnouncement;
  const isDisabledCreateButton = !isVisibleForAllAnnouncementTypes;
  const isPendingCreateButton = isPendingCreateFranchiseAnnouncement || isPendingCreateWarehouseAnnouncement;

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      const requestBody = getRequestParamsToCreateAnnouncement({ ...values, announcementType });
      dispatch(
        isWarehouseAnnouncement ?
          Creators.createWarehouseAnnouncementRequest({ requestBody }) :
          Creators.createFranchiseAnnouncementRequest({ requestBody }),
      );
    },
    enableReinitialize: true,
  });
  const { handleSubmit, values, errors, touched, setFieldValue, handleChange, resetForm } = formik;

  const handleSelectChange = fieldName => {
    return selectedItems => {
      setFieldValue(fieldName, selectedItems);
    };
  };

  useEffect(() => {
    dispatch(CommonCreators.getWarehousesRequest({ countryId: selectedCountryId }));
    setFieldValue('warehouseIds', []);
  }, [dispatch, setFieldValue, selectedCountryId]);

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  useEffect(() => {
    resetForm();
    setFieldValue('announcementType', announcementType);
  }, [announcementType, resetForm, setFieldValue]);

  const returnAnnouncementCardTitle = () => {
    if (isWarehouseAnnouncement) return t('WAREHOUSE_ANNOUNCEMENT');
    if (isFranchiseAnnouncement) return t('FRANCHISE_ANNOUNCEMENT');
    return t('ANNOUNCEMENT');
  };

  const handleNotificationChange = e => {
    setFieldValue('isNotification', e.target.checked);
    if (values.startEndDate[1]) {
      setFieldValue('startEndDate', [moment(), values.startEndDate[1]]);
    }
    else {
      setFieldValue('startEndDate', [moment()]);
    }
  };

  const disabledDate = current => {
    let disabledRange = '';
    if (selectedStartDate && current < moment()) {
      disabledRange = moment();
    }
    return disabledRange;
  };

  const onCalendarChange = val => {
    if (val[0] < moment()) {
      setSelectedStartDate(val[0]);
    }
    else {
      setSelectedStartDate(moment());
    }
  };

  const onFocus = event => {
    if (event?.target?.placeholder === 'end date') {
      setSelectedStartDate(moment());
    }
    else {
      setSelectedStartDate(null);
    }
  };

  useEffect(() => {
    const endDateInputEle = document.querySelector('input[placeholder="end date"]');
    if (!isCalendarOpen) {
      endDateInputEle.blur();
    }
  }, [isCalendarOpen]);

  const onCalendarClick = value => {
    setIsCalendarOpen(value);
    setSelectedStartDate(null);
  };

  const getIsDisabledAnnouncementDateInput = ({ isNotification }) => {
    if (!isFranchiseAnnouncement) return [true, true];

    return [isNotification, false];
  };

  return (
    <Card
      title={returnAnnouncementCardTitle()}
      bordered={false}
      footer={
        <Footer isPending={isPendingCreateButton} isDisabled={isDisabledCreateButton} />
      }
    >
      <Form id="new-warehouse-announcement" form={form} onFinish={handleSubmit} autoComplete="off" layout="vertical">
        <Row gutter={[16]} align="top">
          <Col md={12} sm={12} xs={24}>
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
                disabled={!isWarehouseAnnouncement}
              />
            </Form.Item>
          </Col>
          <Col md={12} sm={12} xs={24}>
            <Form.Item
              name="franchiseIds"
              label={t('FRANCHISES')}
              help={get(touched, 'franchiseIds') && get(errors, 'franchiseIds')}
              validateStatus={get(touched, 'franchiseIds') && get(errors, 'franchiseIds') ? 'error' : 'success'}
            >
              <CustomFranchisesSelect
                value={values.franchiseIds}
                onChange={handleSelectChange('franchiseIds')}
                disabled={!isFranchiseAnnouncement}
              />
            </Form.Item>
          </Col>
          <Col md={12} sm={12} xs={24}>
            <InputWrapper
              inputKey="titleNative"
              label={t('TITLE_NATIVE')}
              placeholder={t('TITLE_NATIVE')}
              value={values.titleNative}
              isTouched={get(touched, 'titleNative')}
              hasError={get(errors, 'titleNative')}
              handleChange={handleChange}
              disabled={!isVisibleForAllAnnouncementTypes}
            />
          </Col>
          <Col md={12} sm={12} xs={24}>
            <InputWrapper
              inputKey="titleEn"
              label={t('TITLE_EN')}
              placeholder={t('TITLE_EN')}
              value={values.titleEn}
              isTouched={get(touched, 'titleEn')}
              hasError={get(errors, 'titleEn')}
              handleChange={handleChange}
              disabled={!isWarehouseAnnouncement}
            />
          </Col>
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
              disabled={!isVisibleForAllAnnouncementTypes}
            />
          </Col>
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
              disabled={!isWarehouseAnnouncement}
            />
          </Col>
          <Col md={12} sm={12} xs={24}>
            <Form.Item
              name="startEndDate"
              label={t('ANNOUNCEMENT_DATE')}
              help={get(touched, 'startEndDate') && get(errors, 'startEndDate')}
              validateStatus={get(touched, 'startEndDate') && get(errors, 'startEndDate') ? 'error' : 'success'}
            >
              <RangePicker
                value={get(formik.values, 'startEndDate')}
                onChange={handleSelectChange('startEndDate')}
                showNow={false}
                format={getLocalDateFormat()}
                onCalendarChange={onCalendarChange}
                disabledDate={disabledDate}
                className={classes.label}
                allowClear={false}
                onOpenChange={onCalendarClick}
                placeholder={['start date', 'end date']}
                onFocus={onFocus}
                disabled={getIsDisabledAnnouncementDateInput({ isNotification: values.isNotification })}
              />
            </Form.Item>
          </Col>
          <Col md={12} sm={12} xs={24}>
            <Form.Item name="active" label={t('ACTIVE')}>
              <Switch
                name="active"
                checked={values.active}
                onChange={e => setFieldValue('active', e)}
                disabled={!isWarehouseAnnouncement}
              />
            </Form.Item>
          </Col>
          <Col span={12} sm={12} xs={24}>
            <Form.Item name="isNotification">
              <Checkbox disabled={!isFranchiseAnnouncement} checked={values.isNotification} onChange={handleNotificationChange}>
                {t('SEND_NOTIFICATION')}
              </Checkbox>
            </Form.Item>
          </Col>
          <Col md={12} sm={12} xs={24}>
            <Form.Item
              name="files"
              label={t('ATTACHMENTS')}
              help={get(touched, 'files') && get(errors, 'files')}
              validateStatus={get(touched, 'files') && get(errors, 'files') ? 'error' : 'success'}
            >
              <CustomUpload
                formik={formik}
                isDisabled={!isFranchiseAnnouncement}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

export default FormWrapper;

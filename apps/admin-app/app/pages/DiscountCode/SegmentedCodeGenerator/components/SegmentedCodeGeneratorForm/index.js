import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Checkbox, Col, DatePicker, Divider, Form, Input, Row, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useFormik } from 'formik';
import { get } from 'lodash';

import { Creators } from '../../redux/actions';
import { createSegmentedCodeByBulkSelector } from '../../redux/selectors';
import permKey from '@shared/shared/permKey.json';
import useStyles from './styles';
import { validationSchema } from './validationSchema';
import SegmentFormInput from './SegmentFormInput';
import AnnouncementFormInput from './AnnouncementFormInput';
import {
  getModifiedValuesBeforeSubmit,
  initialValues,
  isBeforeToday,
  CODE_ACTION_TYPES,
  DiscountCodeActionTypeOptions,
} from '@app/pages/DiscountCode/SegmentedCodeGenerator/components/SegmentedCodeGeneratorForm/utils';
import AntCard from '@shared/components/UI/AntCard';
import { getSelectedCountryTimeZones } from '@shared/redux/selectors/countrySelection';
import { DEFAULT_DATE_FORMAT } from '@shared/shared/constants';
import { usePermission } from '@shared/hooks';
import { getSelectFilterOption } from '@shared/utils/common';
import { SelectPromo } from '@shared/containers/Select/Promo';

const { RangePicker } = DatePicker;

const selectedCountryTimeZones = getSelectedCountryTimeZones();
const selectTimeZoneOptions = selectedCountryTimeZones.map(({ timezone }) => ({ value: timezone, label: timezone }));

const SegmentedDiscountCodeGenerator = () => {
  const { t } = useTranslation(['global', 'segmentedCodeGeneratorPage', 'discountCodeActionTypeComponent']);
  const dispatch = useDispatch();
  const classes = useStyles();

  const createSegmentedCodeByBulkIsPending = useSelector(createSegmentedCodeByBulkSelector.getIsPending);
  const { createdSegmentNumber } = useSelector(createSegmentedCodeByBulkSelector.getData);
  const { canAccess } = usePermission();
  const canGenerate = canAccess(permKey.PAGE_SEGMENTED_CODE_GENERATOR);

  const [form] = useForm();
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema(t),
    enableReinitialize: true,
    onSubmit: values => {
      const modifiedValues = getModifiedValuesBeforeSubmit(values);
      dispatch(Creators.createSegmentedCodeByBulkRequest({ params: modifiedValues }));
    },
  });

  const { handleSubmit, values, setFieldValue, setFieldTouched, touched, errors } = formik;

  // in order to link antd form and formik form
  const getHandleChange = (fieldName, inputType = 'text') => {
    return param => {
      if (inputType === 'select' || inputType === 'date') {
        setFieldValue(fieldName, param);
      }
      else if (inputType === 'checkbox') {
        setFieldValue(fieldName, param.target.checked);
      }
      else {
        setFieldValue(fieldName, param.target.value);
      }
    };
  };

  // in order to link antd form and formik form
  const getHandleBlur = fieldName => {
    return () => setFieldTouched(fieldName);
  };

  const selectedCodeActionType = get(values, 'actionType');

  return (
    <AntCard title={t('segmentedCodeGeneratorPage:SEGMENTED_CODE_GENERATOR_FORM')}>
      <Form
        initialValues={initialValues}
        form={form}
        id="SEGMENTED_CODE_GENERATOR_FORM"
        onFinish={handleSubmit}
        layout="horizontal"
        labelAlign="right"
        labelCol={{ span: 4 }}
        colon={false}
        wrapperCol={{ span: 20 }}
        className={classes.form}
        data-testid="SEGMENTED_CODE_GENERATOR_FORM"
      >
        <Row gutter={[16, 0]}>
          <Col xs={24} className="p-0">
            <Form.Item
              label={t('segmentedCodeGeneratorPage:TIMEZONE')}
              name={['_selectedTimeZone']}
              help={get(touched, '_selectedTimeZone') && get(errors, '_selectedTimeZone')}
              validateStatus={get(touched, '_selectedTimeZone') && get(errors, '_selectedTimeZone') ? 'error' : 'success'}
              className={classes.formItem}
            >
              <Select
                disabled={createSegmentedCodeByBulkIsPending}
                options={selectTimeZoneOptions}
                filterOption={getSelectFilterOption}
                onChange={getHandleChange('_selectedTimeZone', 'select')}
                placeholder={t('segmentedCodeGeneratorPage:SELECT_TIMEZONE')}
              />
            </Form.Item>
          </Col>
          <Col xs={24} className="p-0">
            <Form.Item
              label={t('segmentedCodeGeneratorPage:CODE.TITLE')}
              name={['title']}
              help={get(touched, 'title') && get(errors, 'title')}
              validateStatus={get(touched, 'title') && get(errors, 'title') ? 'error' : 'success'}
              className={classes.formItem}
            >
              <Input
                value={get(values, 'title')}
                type="text"
                placeholder={t('segmentedCodeGeneratorPage:CODE.TITLE')}
                onChange={getHandleChange('title')}
                onBlur={getHandleBlur('title')}
                disabled={createSegmentedCodeByBulkIsPending}
              />
            </Form.Item>
          </Col>
          <Col xs={24} className="p-0">
            <Form.Item
              label={t('segmentedCodeGeneratorPage:CODE.DESCRIPTION')}
              name={['description']}
              help={get(touched, 'description') && get(errors, 'description')}
              validateStatus={get(touched, 'description') && get(errors, 'description') ? 'error' : 'success'}
              className={classes.formItem}
            >
              <Input
                value={get(values, 'description')}
                type="text"
                placeholder={t('segmentedCodeGeneratorPage:CODE.DESCRIPTION')}
                onChange={getHandleChange('description')}
                onBlur={getHandleBlur('description')}
                disabled={createSegmentedCodeByBulkIsPending}
              />
            </Form.Item>
          </Col>
          <Divider className="mt-1 mb-3" />
          <Col xs={24} className="p-0">
            <Form.Item
              label={t('segmentedCodeGeneratorPage:CODE.VALIDITY_RANGE')}
              name={['validRanges']}
              help={get(touched, 'validRanges') && get(errors, 'validRanges')}
              validateStatus={get(touched, 'validRanges') && get(errors, 'validRanges') ? 'error' : 'success'}
              className={classes.formItem}
            >
              <RangePicker
                format={DEFAULT_DATE_FORMAT}
                onChange={getHandleChange('validRanges', 'date')}
                onBlur={getHandleBlur('validRanges')}
                disabled={createSegmentedCodeByBulkIsPending}
                style={{ width: '100%' }}
                allowClear={false}
                disabledDate={isBeforeToday}
              />
            </Form.Item>
          </Col>
          <Col xs={24} className="p-0">
            <Form.Item
              label={t('segmentedCodeGeneratorPage:CODE.COUNT')}
              name={['count']}
              help={get(touched, 'count') && get(errors, 'count')}
              validateStatus={get(touched, 'count') && get(errors, 'count') ? 'error' : 'success'}
              className={classes.formItem}
            >
              <Input
                type="number"
                placeholder={t('segmentedCodeGeneratorPage:CODE.COUNT')}
                onChange={getHandleChange('count')}
                onBlur={getHandleBlur('count')}
                disabled={createSegmentedCodeByBulkIsPending}
              />
            </Form.Item>
          </Col>
          <Col xs={24} className="p-0">
            <Form.Item
              label={t('segmentedCodeGeneratorPage:CODE.PREFIX')}
              name={['prefix']}
              help={get(touched, 'prefix') && get(errors, 'prefix')}
              validateStatus={get(touched, 'prefix') && get(errors, 'prefix') ? 'error' : 'success'}
              className={classes.formItem}
            >
              <Input
                value={get(values, 'prefix')}
                type="text"
                placeholder={t('segmentedCodeGeneratorPage:CODE.PREFIX')}
                onChange={getHandleChange('prefix')}
                onBlur={getHandleBlur('prefix')}
                disabled={createSegmentedCodeByBulkIsPending}
              />
            </Form.Item>
          </Col>
          <Col xs={24} className="p-0">
            <Form.Item
              label={t('segmentedCodeGeneratorPage:CODE.SYLLABLE_COUNT')}
              name={['syllableCount']}
              help={get(touched, 'syllableCount') && get(errors, 'syllableCount')}
              validateStatus={get(touched, 'syllableCount') && get(errors, 'syllableCount') ? 'error' : 'success'}
              className={classes.formItem}
            >
              <Input
                type="number"
                placeholder={t('segmentedCodeGeneratorPage:CODE.SYLLABLE_COUNT')}
                onChange={getHandleChange('syllableCount')}
                onBlur={getHandleBlur('syllableCount')}
                disabled={createSegmentedCodeByBulkIsPending}
              />
            </Form.Item>
          </Col>
          <Col xs={24} className="p-0">
            <Form.Item
              label={t('segmentedCodeGeneratorPage:CODE.USE_LIMIT')}
              name={['useLimit']}
              help={get(touched, 'useLimit') && get(errors, 'useLimit')}
              validateStatus={get(touched, 'useLimit') && get(errors, 'useLimit') ? 'error' : 'success'}
              className={classes.formItem}
            >
              <Input
                type="number"
                placeholder={t('segmentedCodeGeneratorPage:CODE.USE_LIMIT')}
                onChange={getHandleChange('useLimit')}
                onBlur={getHandleBlur('useLimit')}
                disabled={createSegmentedCodeByBulkIsPending}
              />
            </Form.Item>
          </Col>
          <Divider className="mt-1 mb-3" />
          <Col xs={24} className="p-0">
            <Form.Item
              label={t('segmentedCodeGeneratorPage:SELECT_CODE_ACTION_TYPE')}
              name={['actionType']}
              help={get(touched, 'actionType') && get(errors, 'actionType')}
              validateStatus={get(touched, 'actionType') && get(errors, 'actionType') ? 'error' : 'success'}
              className={classes.formItem}
            >
              <Select
                disabled={createSegmentedCodeByBulkIsPending}
                options={DiscountCodeActionTypeOptions(t)}
                filterOption={getSelectFilterOption}
                onChange={getHandleChange('actionType', 'select')}
                placeholder={t('segmentedCodeGeneratorPage:SELECT_CODE_ACTION_TYPE')}
              />
            </Form.Item>
          </Col>
          {
            selectedCodeActionType === CODE_ACTION_TYPES.ASSIGN_SEGMENT && (
              <Col xs={24} className="p-0">
                <SegmentFormInput formik={formik} />
              </Col>
            )
          }
          {
            selectedCodeActionType === CODE_ACTION_TYPES.DEFINE_PROMOTION && (
              <>
                <Col xs={24} className="p-0">
                  <Form.Item
                    name="promo"
                    rules={[{ required: true, message: t('error:REQUIRED') }]}
                    label={t('segmentedCodeGeneratorPage:CODE.SEARCH_PROMO')}
                  >
                    <SelectPromo
                      slice="segmented-code-generator"
                      onChange={promoId => setFieldValue('promo', promoId)}
                      placeholder={t('segmentedCodeGeneratorPage:CODE.SEARCH_PROMO')}
                      allowClear
                      disabled={createSegmentedCodeByBulkIsPending}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} className="p-0">
                  <Form.Item
                    name="isAlreadySold"
                    rules={[{ required: true, message: t('error:REQUIRED') }]}
                    label={t('segmentedCodeGeneratorPage:THIS_CODE_IS_SOLD')}
                  >
                    <Checkbox
                      onChange={getHandleChange('isAlreadySold', 'checkbox')}
                      onBlur={getHandleBlur('isAlreadySold')}
                      disabled={createSegmentedCodeByBulkIsPending}
                    />
                  </Form.Item>
                </Col>
              </>
            )
          }
          {
            selectedCodeActionType === CODE_ACTION_TYPES.SHOW_ANNOUNCEMENT && (
              <Col xs={24} className="p-0">
                <AnnouncementFormInput formik={formik} />
              </Col>
            )
          }
        </Row>
        {canGenerate && (
          <Row gutter={[10, 4]}>
            <Col span={24} className={classes.formActionButtonContainer}>
              <Button
                type="primary"
                htmlType="submit"
                key="save"
                loading={createSegmentedCodeByBulkIsPending}
              >
                {t('global:CREATE')}
              </Button>
            </Col>
          </Row>
        )}
        {
          createdSegmentNumber && (
            <Row className="mt-2">
              <Col span={24}>
                <Alert
                  message={t('global:SUCCESS')}
                  description={t('segmentedCodeGeneratorPage:SEGMENT_CREATED', { createdSegmentNumber })}
                  type="success"
                  showIcon
                />
              </Col>
            </Row>
          )
        }
      </Form>
    </AntCard>
  );
};

export default SegmentedDiscountCodeGenerator;

import { memo, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { useFormik } from 'formik';
import { Button, Col, Collapse, Form, Row, Select } from 'antd';

import {
  getResponsibleDepartmentsSelector,
  updateClassificationSelector,
} from '@app/pages/Promo/Detail/redux/selectors';
import {
  getOnlyModifiedValuesBeforeSubmit,
  getPromoBenefitGroupTypesOptions,
  getPromoClassOptions,
  getPromoDaypartTypesOptions,
  getPromoFunnelSegmentTypesOptions,
  getPromoLocationTypesOptions,
  getPromoOccasionTypesOptions,
  getPromoProductTLGroupTypesOptions,
  getPromoTargetOptions,
  getPromoWeekpartTypesOptions,
  getResponsibleDepartmentsOptions,
} from './formHelper';
import { canSubmit } from '@shared/utils/formHelper';
import permKey from '@shared/shared/permKey.json';
import { usePermission, usePrevious } from '@shared/hooks';
import { Creators } from '../../redux/actions';
import { getSelectFilterOption } from '@shared/utils/common';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';
import { CopyClassificationModal } from '@app/pages/Promo/Detail/components/OverwriteModal/CopyClassificationModal/CopyClassificationModal';

const { Panel } = Collapse;

const ClassificationForm = () => {
  const dispatch = useDispatch();
  const { canAccess } = usePermission();
  const canEdit = canAccess(permKey.PAGE_PROMO_DETAIL_EDIT);
  const usedOrderCount = useSelector(PromoDetailSlice.selectors.usedOrderCount);
  const initialValues = useSelector(PromoDetailSlice.selectors.classificationFormInitialValues);
  const responsibleDepartments = useSelector(getResponsibleDepartmentsSelector.getData);
  const isUpdatePending = useSelector(updateClassificationSelector.getIsPending);
  const updateError = useSelector(updateClassificationSelector.getError);

  const [isFormEditable, setIsFormEditable] = useState(false);
  const [promoTargetOptions, setPromoTargetOptions] = useState(null);
  const { t } = useTranslation('promoPage');
  const [form] = Form.useForm();
  const theme = useTheme();
  const prevIsUpdatePending = usePrevious(isUpdatePending);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: values => {
      const body = getOnlyModifiedValuesBeforeSubmit({ initialValues, values });
      return dispatch(
        Creators.updateClassificationRequest({ body }),
      );
    },
  });

  const { handleSubmit, values, setFieldValue, setValues } = formik;
  const canBeSubmittable = useMemo(
    () => canSubmit({ initialValues, values }),
    [initialValues, values],
  );

  useEffect(() => {
    if (prevIsUpdatePending && !isUpdatePending) {
      if (updateError) {
        setValues(initialValues);
      }
      setIsFormEditable(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdatePending, initialValues]);

  useEffect(() => {
    if (values?.promoClass) {
      const promoClass = values.promoClass?.value || values.promoClass;
      setPromoTargetOptions(getPromoTargetOptions(+promoClass));
    }
  }, [values?.promoClass]);

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  const handleCancelClick = () => {
    setValues(initialValues);
    setIsFormEditable(false);
  };

  const handleEditClick = () => {
    setValues(initialValues);
    setIsFormEditable(true);
  };

  let footer = isFormEditable && (
    <>
      <Col>
        <Form.Item className="mb-0 mt-0">
          <CopyClassificationModal />
        </Form.Item>
      </Col>
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
            form="classification-form"
            type="primary"
            htmlType="submit"
            loading={isUpdatePending}
            disabled={!canBeSubmittable}
          >
            {t('button:SAVE')}
          </Button>
        </Form.Item>
      </Col>
    </>
  );

  if (!isFormEditable && !usedOrderCount) {
    footer = (
      <Col>
        <Form.Item className="mb-0 mt-0">
          <Button size="small" onClick={handleEditClick}>
            {t('button:EDIT')}
          </Button>
        </Form.Item>
      </Col>
    );
  }

  const cardFooter = (
    <Row justify="end" gutter={[theme.spacing(2)]}>
      {footer}
    </Row>
  );

  return (
    <Form
      form={form}
      id="classification-form"
      onFinish={handleSubmit}
      layout="vertical"
    >
      <Row gutter={theme.spacing(3)} className="mb-3">
        <Col span={24}>
          <Form.Item label={t('CLASSIFICATION.PROMO_CLASS')}>
            <Select
              placeholder={t('CLASSIFICATION.PROMO_CLASS')}
              className="w-100"
              labelInValue
              value={values?.promoClass}
              options={getPromoClassOptions()}
              disabled={isUpdatePending || !isFormEditable}
              onChange={promoClass => {
                setFieldValue('promoClass', promoClass);
                setFieldValue('objective', '');
              }}
              autoComplete="off"
              allowClear
              showSearch
              filterOption={getSelectFilterOption}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label={t('CLASSIFICATION.RESPONSIBLE_DEPARTMENT')}>
            <Select
              placeholder={t('CLASSIFICATION.RESPONSIBLE_DEPARTMENT')}
              className="w-100"
              labelInValue
              value={values?.responsibleDepartment}
              disabled={isUpdatePending || !isFormEditable}
              options={getResponsibleDepartmentsOptions(responsibleDepartments)}
              onChange={responsibleDepartment => {
                setFieldValue('responsibleDepartment', responsibleDepartment);
              }}
              autoComplete="off"
              allowClear
              showSearch
              filterOption={getSelectFilterOption}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label={t('CLASSIFICATION.PROMO_TARGET')}>
            <Select
              placeholder={t('CLASSIFICATION.PROMO_TARGET')}
              className="w-100"
              labelInValue
              value={values?.objective}
              disabled={isUpdatePending || !isFormEditable}
              options={promoTargetOptions}
              onChange={objective => {
                setFieldValue('objective', objective);
              }}
              autoComplete="off"
              allowClear
              showSearch
              filterOption={getSelectFilterOption}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label={t('CLASSIFICATION.OCCASION')}>
            <Select
              placeholder={t('CLASSIFICATION.OCCASION')}
              className="w-100"
              labelInValue
              value={values?.occasion}
              disabled={isUpdatePending || !isFormEditable}
              options={getPromoOccasionTypesOptions()}
              onChange={occasion => {
                setFieldValue('occasion', occasion);
              }}
              autoComplete="off"
              allowClear
              showSearch
              filterOption={getSelectFilterOption}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label={t('CLASSIFICATION.DAYPART')}>
            <Select
              placeholder={t('CLASSIFICATION.DAYPART')}
              className="w-100"
              labelInValue
              value={values?.daypart}
              disabled={isUpdatePending || !isFormEditable}
              options={getPromoDaypartTypesOptions()}
              onChange={daypart => {
                setFieldValue('daypart', daypart);
              }}
              autoComplete="off"
              allowClear
              showSearch
              filterOption={getSelectFilterOption}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label={t('CLASSIFICATION.WEEKPART')}>
            <Select
              placeholder={t('CLASSIFICATION.WEEKPART')}
              className="w-100"
              labelInValue
              value={values?.weekpart}
              disabled={isUpdatePending || !isFormEditable}
              options={getPromoWeekpartTypesOptions()}
              onChange={weekpart => {
                setFieldValue('weekpart', weekpart);
              }}
              autoComplete="off"
              allowClear
              showSearch
              filterOption={getSelectFilterOption}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label={t('CLASSIFICATION.FUNNEL_SEGMENT')}>
            <Select
              placeholder={t('CLASSIFICATION.FUNNEL_SEGMENT')}
              className="w-100"
              labelInValue
              value={values?.funnelSegment}
              disabled={isUpdatePending || !isFormEditable}
              options={getPromoFunnelSegmentTypesOptions()}
              onChange={funnelSegment => {
                setFieldValue('funnelSegment', funnelSegment);
              }}
              autoComplete="off"
              allowClear
              showSearch
              filterOption={getSelectFilterOption}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label={t('CLASSIFICATION.BENEFIT_GROUP')}>
            <Select
              placeholder={t('CLASSIFICATION.BENEFIT_GROUP')}
              className="w-100"
              labelInValue
              value={values?.benefitGroup}
              disabled={isUpdatePending || !isFormEditable}
              options={getPromoBenefitGroupTypesOptions()}
              onChange={benefitGroup => {
                setFieldValue('benefitGroup', benefitGroup);
              }}
              autoComplete="off"
              allowClear
              showSearch
              filterOption={getSelectFilterOption}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label={t('CLASSIFICATION.PRODUCT_TL_GROUP')}>
            <Select
              placeholder={t('CLASSIFICATION.PRODUCT_TL_GROUP')}
              className="w-100"
              labelInValue
              value={values?.productTLGroup}
              disabled={isUpdatePending || !isFormEditable}
              options={getPromoProductTLGroupTypesOptions()}
              onChange={productTLGroup => {
                setFieldValue('productTLGroup', productTLGroup);
              }}
              autoComplete="off"
              allowClear
              showSearch
              filterOption={getSelectFilterOption}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label={t('CLASSIFICATION.LOCATION')}>
            <Select
              placeholder={t('CLASSIFICATION.LOCATION')}
              className="w-100"
              labelInValue
              value={values?.location}
              disabled={isUpdatePending || !isFormEditable}
              options={getPromoLocationTypesOptions()}
              onChange={location => {
                setFieldValue('location', location);
              }}
              autoComplete="off"
              allowClear
              showSearch
              filterOption={getSelectFilterOption}
            />
          </Form.Item>
        </Col>
      </Row>
      {canEdit && cardFooter}
    </Form>
  );
};

const ClassificationSection = memo(function ClassificationSection() {
  const { t } = useTranslation('promoPage');

  const isParent = useSelector(PromoDetailSlice.selectors.isParent);

  if (isParent) {
    return null;
  }

  return (
    <Collapse className="mb-2">
      <Panel header={t('CLASSIFICATION.TITLE')} key={1}>
        <ClassificationForm />
      </Panel>
    </Collapse>
  );
});

export default ClassificationSection;

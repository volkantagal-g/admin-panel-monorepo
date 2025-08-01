import { memo, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { useFormik } from 'formik';
import { get, toString } from 'lodash';
import { Button, Col, Collapse, Form, Row } from 'antd';

import { updatePromoContentSelector } from '@app/pages/Promo/Detail/redux/selectors';

import {
  getContentSectionOptions,
  getInitialValues,
  getOnlyModifiedValuesBeforeSubmit,
  validationSchema,
} from './formHelper';
import permKey from '@shared/shared/permKey.json';
import { canSubmit } from '@shared/utils/formHelper';
import { usePermission, usePrevious } from '@shared/hooks';
import { Creators } from '../../redux/actions';
import { validate } from '@shared/yup';
import MultiLanguageInput from '@shared/components/UI/MultiLanguage/Input';
import { getSelectFilterOption } from '@shared/utils/common';
import { getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';
import AntSelect from '@shared/components/UI/AntSelect';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';

const { Panel } = Collapse;

const PromoContentForm = () => {
  const dispatch = useDispatch();
  const { canAccess } = usePermission();

  const canEdit = canAccess(permKey.PAGE_PROMO_DETAIL_EDIT);
  const promo = useSelector(PromoDetailSlice.selectors.promo);
  const isListingPromo = useSelector(PromoDetailSlice.selectors.isListingPromo);
  const isUpdatePending = useSelector(updatePromoContentSelector.getIsPending);
  const updateError = useSelector(updatePromoContentSelector.getError);
  const countryLanguages = getSelectedCountryLanguages();

  const [isFormEditable, setIsFormEditable] = useState(false);
  const { t } = useTranslation('promoPage');
  const [form] = Form.useForm();
  const theme = useTheme();
  const prevIsUpdatePending = usePrevious(isUpdatePending);

  const initialValues = useMemo(() => getInitialValues(promo), [promo]);

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema(promo, isListingPromo)),
    initialValues,
    onSubmit: values => {
      const body = getOnlyModifiedValuesBeforeSubmit({ values });
      return dispatch(
        Creators.updatePromoContentRequest({
          id: get(promo, '_id'),
          body,
        }),
      );
    },
  });

  const { handleSubmit, values, setValues, setFieldValue, errors } = formik;

  const canBeSubmittable = useMemo(() => canSubmit({ initialValues, values }) && !Object.keys(errors).length, [errors, initialValues, values]);

  useEffect(() => {
    if (prevIsUpdatePending && !isUpdatePending) {
      if (updateError) {
        setValues(initialValues);
      }
      setIsFormEditable(false);
    }
  }, [prevIsUpdatePending, setIsFormEditable, setValues, updateError, isUpdatePending, initialValues]);

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, promo, form]);

  const handleCancelClick = () => {
    setValues(initialValues);
    setIsFormEditable(false);
  };

  const handleEditClick = () => {
    setValues(initialValues);
    setIsFormEditable(true);
  };

  const updateAccessibilityLabel = () => {
    setFieldValue('accessibilityLabel', values.title);
  };

  const cardFooter = (
    <Row justify="end" gutter={[theme.spacing(2)]}>
      {
        isFormEditable ? (
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
                  form="promo-content"
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
        ) : (
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button size="small" onClick={handleEditClick}>
                {t('button:EDIT')}
              </Button>
            </Form.Item>
          </Col>
        )
      }
    </Row>
  );
  return (
    <Form form={form} id="promo-content" onFinish={handleSubmit} layout="vertical">
      <MultiLanguageInput
        label={t('PROMO_CONTENT.TITLE')}
        fieldPath={['title']}
        formik={formik}
        disabled={isUpdatePending || !isFormEditable}
        onBlur={updateAccessibilityLabel}
      />
      <MultiLanguageInput
        label={t('PROMO_CONTENT.DESCRIPTION')}
        fieldPath={['description']}
        formik={formik}
        disabled={isUpdatePending || !isFormEditable}
      />
      <MultiLanguageInput
        label={t('PROMO_CONTENT.ACCESSIBILITY_LABEL')}
        fieldPath={['accessibilityLabel']}
        formik={formik}
        disabled={isUpdatePending || !isFormEditable}
      />
      <Row
        gutter={[theme.spacing(3)]}
        align="top"
        className="mb-3"
      >
        <Col span={24} className="mb-2">{t('PROMO_CONTENT.PROMO_CONTENT_SECTION')}</Col>
        {countryLanguages.map((countryLanguage, countryIndex) => {
          return (
            <Col
              span={12}
              key={toString(countryIndex)}
            >
              <Form.Item
                help={get(errors, 'promoContentSectionTitle')}
                validateStatus={get(errors, 'promoContentSectionTitle') ? 'error' : 'success'}
                className={get(errors, 'promoContentSectionTitle') ? '' : 'mb-2'}
              >
                <AntSelect
                  placeholder={t('PROMO_CONTENT.PROMO_CONTENT_SECTION')}
                  className="w-100"
                  value={values?.promoContentSectionTitle?.[countryLanguage]}
                  disabled={isUpdatePending || !isFormEditable}
                  options={getContentSectionOptions(countryLanguage)}
                  onChange={val => {
                    const updatedValues = {
                      ...values.promoContentSectionTitle,
                      [countryLanguage]: val.value,
                    };
                    setFieldValue('promoContentSectionTitle', updatedValues);
                  }}
                  autoComplete="off"
                  addonAfter={countryLanguage.toUpperCase()}
                  allowClear
                  showSearch
                  filterOption={getSelectFilterOption}
                />
              </Form.Item>
            </Col>
          );
        })}
      </Row>
      {canEdit && cardFooter}
    </Form>
  );
};

const PromoContentSection = memo(function PromoContentSection() {
  const { t } = useTranslation('promoPage');

  return (
    <Collapse className="mb-2">
      <Panel header={t('PROMO_CONTENT.HEADER_TITLE')} key={1}>
        <PromoContentForm />
      </Panel>
    </Collapse>
  );
});

export default PromoContentSection;

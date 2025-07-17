import { memo, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Col, Collapse, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { useFormik } from 'formik';

import { BannerActionForm } from '@app/pages/Promo/Detail/components/ButtonAction/BannerActionForm';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';
import { Creators } from '../../redux/actions';
import { Creators as MarketProductSelectCreators } from '@shared/containers/Marketing/Select/MarketProductSelect/redux/actions';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { getLanguageValues } from '../../utils';
import { getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';
import { updatePromoButtonAction } from '@app/pages/Promo/Detail/redux/selectors';
import { canSubmit } from '@shared/utils/formHelper';
import { ButtonActionFormType, getOnlyModifiedValuesBeforeSubmit } from './formHelper';
import { LanguageGlobal } from '@app/pages/Promo/types';

const { Panel } = Collapse;

const PromoButtonActionForm = () => {
  const dispatch = useDispatch();
  const { canAccess } = usePermission();
  const { t } = useTranslation('promoPage');

  const canEdit = canAccess(permKey.PAGE_PROMO_DETAIL_EDIT);
  const initialValues = useSelector(PromoDetailSlice.selectors.buttonActionFormInitialValues);
  const isUpdatePending = useSelector(updatePromoButtonAction.getIsPending);
  const [isFormEditable, setIsFormEditable] = useState(false);

  const formik = useFormik<ButtonActionFormType>({
    initialValues,
    onSubmit: values => {
      const countryLanguages = getSelectedCountryLanguages() as (keyof LanguageGlobal)[];
      const {
        type,
        data,
        service,
        ownerService,
        isConfirmationPopupEnabled,
        confirmationPopup,
        text,
      } = getOnlyModifiedValuesBeforeSubmit({ values, countryLanguages });

      dispatch(
        Creators.updatePromoButtonActionRequest({
          body: {
            type,
            data,
            service,
            ownerService,
            confirmationPopup,
            isConfirmationPopupEnabled,
            text: text ? getLanguageValues(countryLanguages, text) : undefined,
          },
        }),
      );
    },
  });

  const canBeSubmittable = useMemo(() => canSubmit({
    initialValues,
    values: formik.values,
  }), [initialValues, formik.values]);

  useEffect(() => {
    dispatch(MarketProductSelectCreators.getMarketProductsRequest({
      filters: {
        isActive: true,
        fields: 'name fullName',
        populate: [],
      },
    }));
    dispatch(CommonCreators.getMarketProductsRequest({ fields: ['fullName'] }));
  }, [dispatch]);

  const handleCancelClick = () => {
    formik.setValues(initialValues);
    setIsFormEditable(false);
  };

  const handleEditClick = () => {
    formik.setValues(initialValues);
    setIsFormEditable(true);
  };

  const cardFooter = (
    <Row justify="end" gutter={[8, 8]}>
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
                type="primary"
                loading={isUpdatePending}
                disabled={!canBeSubmittable}
                onClick={() => formik.handleSubmit()}
              >
                {t('button:SAVE')}
              </Button>
            </Form.Item>
          </Col>
        </>
      ) : (
        <Col>
          <Form.Item className="mb-0 mt-0">
            <Button size="small" onClick={handleEditClick} id="gen-info_edit">
              {t('button:EDIT')}
            </Button>
          </Form.Item>
        </Col>
      )}
    </Row>
  );
  return (
    <div>
      <BannerActionForm
        formik={formik}
        disabled={isUpdatePending || !isFormEditable}
      />
      {canEdit && cardFooter}
    </div>
  );
};

const PromoButtonActionSection = memo(function PromoButtonActionSection() {
  const { t } = useTranslation('promoPage');

  const isMaster = useSelector(PromoDetailSlice.selectors.isMaster);

  if (isMaster) {
    return null;
  }

  return (
    <Col xs={24}>
      <Collapse className="mb-2">
        <Panel header={t('PROMO_BUTTON_ACTION.HEADER_TITLE')} key={1}>
          <PromoButtonActionForm />
        </Panel>
      </Collapse>
    </Col>
  );
});

export default PromoButtonActionSection;

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Col, Form, Row } from 'antd';

import React, { useEffect, useMemo } from 'react';

import { marketProductSelector } from '@shared/containers/Marketing/Select/PromoProductSelect/redux/selectors';
import { getSuppliersSelector } from '@shared/redux/selectors/common';
import { updateBenefitTypeSelector } from '@app/pages/Promo/Detail/redux/selectors';
import { SupplierProjection } from '@app/pages/Promo/types';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';

type CardFooterProps = {
  isFormEditable: boolean,
  handleCancelClick: () => void,
  canBeSubmittable: boolean,
  handleEditClick: () => void,
  handleSubmit: () => void
}

export function CardFooter({
  handleEditClick,
  handleCancelClick,
  isFormEditable,
  canBeSubmittable,
  handleSubmit,
}: CardFooterProps) {
  const { t } = useTranslation('promoPage');
  const { canAccess } = usePermission();
  const canEdit = canAccess(permKey.PAGE_PROMO_DETAIL_EDIT);
  const isMarketProductsPending = useSelector(marketProductSelector.getIsPending);
  const isSuppliersPending = useSelector(getSuppliersSelector.getIsPending);
  const isUpdatePending = useSelector(updateBenefitTypeSelector.getIsPending);

  if (!canEdit) {
    return null;
  }

  return (
    <Row justify="end" gutter={[8, 8]}>
      {isFormEditable ? (
        <>
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button size="small" onClick={handleCancelClick} id="benefit-type_cancel">
                {t('button:CANCEL')}
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button
                size="small"
                form="benefit-type"
                type="primary"
                loading={isUpdatePending}
                disabled={!canBeSubmittable}
                id="benefit-type_save"
                onClick={handleSubmit}
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
              disabled={isMarketProductsPending || isSuppliersPending}
              id="benefit-type_edit"
            >
              {t('button:EDIT')}
            </Button>
          </Form.Item>
        </Col>
      )}
    </Row>
  );
}

export function useValidSuppliers() {
  const dispatch = useDispatch();
  const suppliers: SupplierProjection[] = useSelector(getSuppliersSelector.getData);

  useEffect(() => {
    dispatch(CommonCreators.getSuppliersRequest());
  }, [dispatch]);

  return useMemo(() => {
    return suppliers.filter(supplier => !!supplier.supplierReferenceId);
  }, [suppliers]);
}

import { Button, Col, Form, Input, Modal, Row, Select } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { getSelectFilterOption } from '@shared/utils/common';
import {
  CREATE_PROMO_FORM_INITIAL_VALUES,
  CreatePromoFormType,
  getDiscountReasonOptions,
  getPromoHierarchyOptions,
  getPromoMechanicOptions,
} from './formHelper';
import { NewPromotionSlice } from '@app/pages/Promo/New/redux/slice';
import { DiscountReason, PromoHierarchy } from '@app/pages/Promo/types';
import { useInitAndDestroyPage } from '@shared/hooks';

type PropTypes = {
  visible: boolean;
  onCancel: () => void;
}

export default function AddModalForm({ visible, onCancel }: PropTypes) {
  const { t } = useTranslation('promoPage');
  const [promoMechanicOptions, setPromoMechanicOptions] = useState(getPromoMechanicOptions(false, t));
  const dispatch = useDispatch();
  const isPending = useSelector(NewPromotionSlice.selectors.selectLoading);
  const [form] = Form.useForm();
  const [isParentPromo, setIsParentPromo] = useState(false);

  useInitAndDestroyPage({ dispatch, Creators: NewPromotionSlice.actions });

  const handleCancel = () => {
    form.resetFields();
    onCancel();
    setPromoMechanicOptions(getPromoMechanicOptions(false, t));
  };

  const handleSubmit = (values: CreatePromoFormType) => {
    return dispatch(NewPromotionSlice.actions.createPromoRequest(values));
  };

  const onHierarchySelect = (value: PromoHierarchy) => {
    const isParent = value === PromoHierarchy.Parent;
    const isMaster = value === PromoHierarchy.Master;
    setIsParentPromo(isParent);
    setPromoMechanicOptions(getPromoMechanicOptions(isMaster, t));
    if (isParent) {
      form.setFieldsValue({ promoMechanic: 4, discountReason: DiscountReason.General });
    }
    else if (isMaster) {
      form.setFieldsValue({ promoMechanic: null });
    }
  };

  return (
    <Modal
      centered
      title={t('NEW_PROMO.TITLE')}
      visible={visible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form<CreatePromoFormType>
        form={form}
        id="create-promo"
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={CREATE_PROMO_FORM_INITIAL_VALUES}
      >
        <Row>
          <Col span={24}>
            <Form.Item<CreatePromoFormType> label={t('PROMO_HIERARCHY')} name="hierarchy">
              <Select
                onSelect={onHierarchySelect}
                id="promo-hierarchy"
                options={getPromoHierarchyOptions()}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item<CreatePromoFormType>
              label={t('DISCOUNT_REASON')}
              name="discountReason"
              rules={[{ required: true, message: t('baseYupError:MIXED.REQUIRED') }]}
            >
              <Select
                id="discount-reason"
                disabled={isParentPromo}
                options={getDiscountReasonOptions()}
                filterOption={getSelectFilterOption}
              />
            </Form.Item>
          </Col>
        </Row>
        {!isParentPromo && (
        <Row>
          <Col span={24}>
            <Form.Item<CreatePromoFormType>
              name="promoMechanic"
              label={t('PROMO_TYPE')}
              rules={[{ required: true, message: t('baseYupError:MIXED.REQUIRED') }]}
            >
              <Select
                id="promo-mechanic"
                options={promoMechanicOptions}
                showSearch
                filterOption={getSelectFilterOption}
                listHeight={300}
              />
            </Form.Item>
          </Col>
        </Row>
        )}
        <Row>
          <Col span={24}>
            <Form.Item<CreatePromoFormType>
              name="promoCode"
              label={t('GENERAL_INFO.PROMO_CODE')}
              rules={[{ required: true, message: t('baseYupError:MIXED.REQUIRED') }]}
            >
              <Input
                className="w-100"
                disabled={false}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end" gutter={[8, 8]}>
          <Col>
            <Button key="back" onClick={handleCancel}>
              {t('button:CANCEL')}
            </Button>
          </Col>
          <Col>
            <Button
              id="btn-create-promo"
              key="submit"
              type="primary"
              form="create-promo"
              htmlType="submit"
              loading={isPending}
            >
              {t('button:CREATE')}
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

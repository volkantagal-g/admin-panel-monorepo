import React, { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Checkbox, Col, Collapse, Divider, Form, Input, Row, Tag, Typography } from 'antd';

import { useDispatch, useSelector } from 'react-redux';

import { MultiLanguageFormItem } from '@app/pages/Promo/components/MultiLanguage/MultiLanguageFormItem';
import { useTermsAndConditionsStyle } from '@app/pages/Promo/Detail/components/TermsAndConditions/styles';
import * as Constants from '@app/pages/Promo/Detail/components/TermsAndConditions/constants';
import { Promo, PromoMechanicsSet, TermsAndConditions as ITermsAndConditions } from '@app/pages/Promo/types';
import { getPromoMechanicsSet } from '@app/pages/Promo/utils';
import { Footer } from '@app/pages/Promo/Detail/components/Footer';

import permKey from '@shared/shared/permKey.json';
import { DefaultTermsAndConditions } from '@app/pages/Promo/constantValues';
import { MultiLanguageReadOnly } from '@app/pages/Promo/components/MultiLanguage/MultiLanguageReadOnly';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';
import { TermsAndConditionsSlice } from '@app/pages/Promo/Detail/components/TermsAndConditions/slice';
import { injected } from '@shared/utils/injected';
import { termsAndConditionsSaga } from '@app/pages/Promo/Detail/components/TermsAndConditions/saga';
import { useInitAndDestroyPage } from '@shared/hooks';

type SectionProps = {
  disabled?: boolean
}

type CampaignDetailsProps = { mechanicSet: Promo['promoMechanicsSet'], } & SectionProps

function CampaignDetails({ mechanicSet, disabled }: CampaignDetailsProps) {
  return (
    <Col span={24}>
      <Row gutter={[16, 8]}>
        {
          mechanicSet !== PromoMechanicsSet.Tab && (
            <>
              <MultiLanguageReadOnly translations={DefaultTermsAndConditions.campaignDetails.autoApply}>
                <Input disabled />
              </MultiLanguageReadOnly>
              <MultiLanguageReadOnly translations={DefaultTermsAndConditions.campaignDetails.canBeCombined}>
                <Input disabled />
              </MultiLanguageReadOnly>
            </>
          )
        }
        {
          mechanicSet === PromoMechanicsSet.Tab && (
            <>
              <MultiLanguageReadOnly translations={DefaultTermsAndConditions.campaignDetails.checkoutApply}>
                <Input disabled />
              </MultiLanguageReadOnly>
              <MultiLanguageReadOnly translations={DefaultTermsAndConditions.campaignDetails.mustSelect}>
                <Input disabled />
              </MultiLanguageReadOnly>
            </>
          )
        }
        <MultiLanguageFormItem
          name={['campaignDetails', 'minBasket']}
          prefix={{
            width: '32.4px',
            node: (
              <Form.Item
                name={['checkboxes', 'isMinBasketEnabled']}
                valuePropName="checked"
              >
                <Checkbox disabled={disabled} />
              </Form.Item>
            ),
          }}
          rules={Constants.getMaxLenRules(1000)}
        >
          <Input disabled={disabled} />
        </MultiLanguageFormItem>
        <MultiLanguageFormItem
          name={['campaignDetails', 'maxBenefit']}
          prefix={{
            width: '32.4px',
            node: (
              <Form.Item name={['checkboxes', 'isMaxBenefitEnabled']} valuePropName="checked">
                <Checkbox disabled={disabled} />
              </Form.Item>
            ),
          }}
          rules={Constants.getMaxLenRules(1000)}
        >
          <Input disabled={disabled} />
        </MultiLanguageFormItem>
        <MultiLanguageFormItem
          name={['campaignDetails', 'freeDelivery']}
          prefix={{
            width: '32.4px',
            node: (
              <Form.Item name={['checkboxes', 'isFreeDeliveryEnabled']} valuePropName="checked">
                <Checkbox disabled={disabled} />
              </Form.Item>
            ),
          }}
          rules={Constants.getMaxLenRules(1000)}
        >
          <Input disabled={disabled} />
        </MultiLanguageFormItem>
        <MultiLanguageFormItem
          name={['campaignDetails', 'validDates']}
          prefix={{
            width: '32.4px',
            node: (
              <Form.Item name={['checkboxes', 'isValidDatesEnabled']} valuePropName="checked">
                <Checkbox disabled={disabled} />
              </Form.Item>
            ),
          }}
          rules={Constants.getMaxLenRules(1000)}
        >
          <Input disabled={disabled} />
        </MultiLanguageFormItem>
      </Row>
    </Col>
  );
}

function ExampleUsages({ disabled }: SectionProps) {
  return (
    <Col span={24}>
      <Row gutter={[16, 8]}>
        <MultiLanguageFormItem
          name={['exampleUsages']}
          prefix={{
            width: '32.4px',
            node: (
              <Form.Item name={['checkboxes', 'isExampleUsagesEnabled']} valuePropName="checked">
                <Checkbox disabled={disabled} />
              </Form.Item>
            ),
          }}
          rules={Constants.getMaxLenRules(1000)}
        >
          <Input.TextArea disabled={disabled} />
        </MultiLanguageFormItem>
      </Row>
    </Col>
  );
}

function ExcludedProducts({ disabled }: SectionProps) {
  return (
    <Col span={24}>
      <Row gutter={[16, 8]}>
        <MultiLanguageFormItem
          name={['excludedProducts']}
          prefix={{
            width: '32.4px',
            node: (
              <Form.Item name={['checkboxes', 'isExcludedProductsEnabled']} valuePropName="checked">
                <Checkbox disabled={disabled} />
              </Form.Item>
            ),
          }}
          rules={Constants.getMaxLenRules(1000)}
        >
          <Input.TextArea disabled={disabled} />
        </MultiLanguageFormItem>
      </Row>
    </Col>
  );
}

type ConditionsProps = {
  mechanicSet: Promo['promoMechanicsSet'],
} & SectionProps

function Conditions({ mechanicSet, disabled }: ConditionsProps) {
  return (
    <Col span={24}>
      <Row gutter={[16, 8]}>
        <MultiLanguageReadOnly translations={DefaultTermsAndConditions.conditions.exclusion}>
          <Input disabled />
        </MultiLanguageReadOnly>
        {
          mechanicSet !== PromoMechanicsSet.Tab && (
            <MultiLanguageReadOnly translations={DefaultTermsAndConditions.conditions.stockAvailability}>
              <Input disabled />
            </MultiLanguageReadOnly>
          )
        }
        <MultiLanguageReadOnly
          prefix={{
            width: '32.4px',
            node: (
              <Form.Item name={['checkboxes', 'isValidityEnabled']} valuePropName="checked">
                <Checkbox disabled={disabled} />
              </Form.Item>
            ),
          }}
          translations={DefaultTermsAndConditions.conditions.validity}
        >
          <Input disabled />
        </MultiLanguageReadOnly>
        <MultiLanguageFormItem
          name={['conditions', 'legal']}
          prefix={{
            width: '32.4px',
            node: (
              <Form.Item name={['checkboxes', 'isLegalEnabled']} valuePropName="checked">
                <Checkbox disabled={disabled} />
              </Form.Item>
            ),
          }}
          rules={Constants.getMaxLenRules(10000)}
        >
          <Input.TextArea rows={5} disabled={disabled} />
        </MultiLanguageFormItem>
      </Row>
    </Col>
  );
}

const TermsAndConditions = injected(function TermsAndConditions() {
  const { t } = useTranslation('promoPage');
  const [form] = Form.useForm<ITermsAndConditions>();
  const styles = useTermsAndConditionsStyle();
  const { promoMechanic, useLimit } = useSelector(PromoDetailSlice.selectors.promo);
  const isPending = useSelector(TermsAndConditionsSlice.selectors.isPending);
  const isEditing = useSelector(TermsAndConditionsSlice.selectors.isEditing);
  const termsAndConditions: ITermsAndConditions = useSelector(PromoDetailSlice.selectors.termsAndConditions);
  const dispatch = useDispatch();

  const mechanicSet = useMemo(() => getPromoMechanicsSet(promoMechanic), [promoMechanic]);
  const [chips, setChips] = useState(Constants.getTCChips({ promoMechanic, useLimit, termsAndConditions }));
  const disabled = useMemo(() => isPending || !isEditing, [isPending, isEditing]);
  const initialValues = useMemo(() => Constants.getInitialValues(termsAndConditions), [termsAndConditions]);

  useInitAndDestroyPage({ dispatch, Creators: TermsAndConditionsSlice.actions });

  function onValuesChange(_: void, newValues: ITermsAndConditions) {
    setChips(Constants.getTCChips({ promoMechanic, useLimit, termsAndConditions: newValues }));
  }

  function handleSubmit(data: ITermsAndConditions) {
    const payload = Constants.getModifiedValuesBeforeSubmit(data);
    dispatch(TermsAndConditionsSlice.actions.update(payload));
  }

  function onCancel() {
    form.setFieldsValue(termsAndConditions);
    setChips(Constants.getTCChips({ promoMechanic, useLimit, termsAndConditions }));
  }

  function setEditMode(open: boolean) {
    dispatch(TermsAndConditionsSlice.actions.setEditMode(open));
  }

  return (
    <Form<ITermsAndConditions>
      form={form}
      className={styles.wrapper}
      initialValues={initialValues}
      onFinish={handleSubmit}
      onValuesChange={onValuesChange}
    >
      <Row gutter={[16, 8]}>
        <Col span={24}>
          <Row justify="start" className="mb-n2">
            {chips.map(chip => (
              <Tag key={chip} className="mb-2">{t(`TERMS_AND_CONDITIONS.${chip}`)}</Tag>))}
          </Row>
        </Col>
        <Divider />
        <Col span={24}>
          <Typography.Title level={4}>
            {t('TERMS_AND_CONDITIONS.PROMO_USAGE')}
          </Typography.Title>
        </Col>
        <CampaignDetails mechanicSet={mechanicSet} disabled={disabled} />
        <Divider />
        <Col span={24}>
          <Typography.Title level={4}>
            {t('TERMS_AND_CONDITIONS.EXAMPLE_USAGES')}
          </Typography.Title>
        </Col>
        <ExampleUsages disabled={disabled} />
        <Divider />
        <Col span={24}>
          <Typography.Title level={4}>
            {t('TERMS_AND_CONDITIONS.EXCLUDED_PRODUCTS')}
          </Typography.Title>
        </Col>
        <ExcludedProducts disabled={disabled} />
        <Divider />
        <Col span={24}>
          <Typography.Title level={4}>
            {t('TERMS_AND_CONDITIONS.CONDITIONS')}
          </Typography.Title>
        </Col>
        <Conditions mechanicSet={mechanicSet} disabled={disabled} />
        <Col span={24}>
          <Footer permKey={permKey.PAGE_PROMO_DETAIL_EDIT} open={isEditing} setOpen={setEditMode} disabled={isPending} onCancel={onCancel} />
        </Col>
      </Row>
    </Form>
  );
}, {
  key: TermsAndConditionsSlice.reducerPath,
  reducer: TermsAndConditionsSlice.reducer,
  saga: termsAndConditionsSaga,
});

const TermsAndConditionsSection = memo(function TermsAndConditionsSection() {
  const { t } = useTranslation('promoPage');

  return (
    <Col xs={24}>
      <Collapse className="mb-2">
        <Collapse.Panel header={t('TERMS_AND_CONDITIONS.TITLE')} key={1}>
          <TermsAndConditions />
        </Collapse.Panel>
      </Collapse>
    </Col>
  );
});

export default TermsAndConditionsSection;

import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Collapse, Form, Row, Select, Space } from 'antd';

import { useDispatch, useSelector } from 'react-redux';

import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { LinkedPromotionsSlice } from '@app/pages/Promo/Detail/components/LinkedPromotions/slice';
import { linkedPromotionsSaga } from '@app/pages/Promo/Detail/components/LinkedPromotions/saga';
import { Hint } from '../Hint';
import { Footer } from '../Footer';
import permKey from '@shared/shared/permKey.json';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';
import { SelectPromo } from '@shared/containers/Select/Promo';
import { useInitAndDestroyPage } from '@shared/hooks';

const { Panel } = Collapse;

type FormType = {
  linkedPromo?: MongoIDType,
}

const PageSkeleton = memo(function PageSkeleton() {
  const loading = useSelector(LinkedPromotionsSlice.selectors.selectLoading);

  return (
    <Row gutter={[12, 12]}>
      <Col span={12}>
        <Select loading={loading} disabled className="w-100" />
      </Col>
      <Col span={12}>
        <Select loading={loading} disabled className="w-100" />
      </Col>
    </Row>
  );
});

function LinkedPromotionsForm() {
  const { t } = useTranslation('promoPage');
  const { linkedPromos, dependentPromos } = useSelector(PromoDetailSlice.selectors.linkedAndDependentPromos);
  const isEditing = useSelector(LinkedPromotionsSlice.selectors.isEditing);
  const loading = useSelector(LinkedPromotionsSlice.selectors.selectLoading);
  const dispatch = useDispatch();

  const promoId = useSelector(PromoDetailSlice.selectors.promoId);

  const handleFinish = useCallback((values: FormType) => {
    dispatch(LinkedPromotionsSlice.actions.updateLinkedPromotionsRequest(values.linkedPromo));
  }, [dispatch]);

  function setIsEditing(newIsEditing: boolean) {
    dispatch(LinkedPromotionsSlice.actions.setIsEditing(newIsEditing));
  }

  function onCancel() {
    setIsEditing(false);
  }

  useInitAndDestroyPage({ dispatch, Creators: LinkedPromotionsSlice.actions });

  if (linkedPromos && dependentPromos) {
    return (
      <Form<FormType>
        layout="vertical"
        aria-label="Linked Promotions Form"
        initialValues={{ linkedPromo: linkedPromos.at(0) }}
        onFinish={handleFinish}
      >
        <Row gutter={[12, 0]}>
          <Col span={12}>
            <Form.Item<FormType>
              name="linkedPromo"
              aria-label={t('GENERAL_INFO.PROMO_CODE_TO_LINK')}
              label={(
                <Space align="center">
                  {t('GENERAL_INFO.PROMO_CODE_TO_LINK')}
                  <Hint translationKey="promoPage:HINT.NO_ZERO_SEGMENT" placement="topLeft" />
                </Space>
              )}
            >
              <SelectPromo
                slice="linked-promos"
                showIds
                excludedOptions={[promoId]}
                disabled={!isEditing || loading}
                placeholder={t('GENERAL_INFO.PROMO_CODE_TO_LINK')}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FormType>
              label={t('GENERAL_INFO.PROMOS_LINKED_TO_THIS_PROMO')}
            >
              <SelectPromo
                readOnly
                slice="dependent-promos"
                showIds
                value={dependentPromos}
                disabled={!isEditing || !dependentPromos.length || loading}
                placeholder={dependentPromos.length ? undefined : t('global:NO_DATA')}
              />
            </Form.Item>
          </Col>
        </Row>
        <Footer
          permKey={permKey.PAGE_PROMO_DETAIL_EDIT}
          setOpen={setIsEditing}
          open={isEditing}
          loading={loading}
          disabled={loading}
          onCancel={onCancel}
        />
      </Form>
    );
  }

  return (<PageSkeleton />);
}

const LinkedPromotionsSection = memo(function ConditionProductsSection() {
  const { t } = useTranslation('promoPage');

  const isListingPromo = useSelector(PromoDetailSlice.selectors.isListingPromo);

  useInjectReducer({ key: LinkedPromotionsSlice.reducerPath, reducer: LinkedPromotionsSlice.reducer });
  useInjectSaga({ key: LinkedPromotionsSlice.reducerPath, saga: linkedPromotionsSaga });

  const isParent = useSelector(PromoDetailSlice.selectors.isParent);

  if (isParent) {
    return null;
  }

  return (
    <Col xs={24} lg={isListingPromo ? 12 : 24}>
      <Collapse className="mb-2">
        <Panel header={t('LINKED_PROMOTIONS.HEADER_TITLE')} key={1}>
          <LinkedPromotionsForm />
        </Panel>
      </Collapse>
    </Col>
  );
});

export default LinkedPromotionsSection;

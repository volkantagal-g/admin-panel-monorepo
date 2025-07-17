import { Form } from 'antd';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { get } from 'lodash';

import AntCard from '@shared/components/UI/AntCard';
import { CreateCardActionButtons } from '@app/pages/GetirWater/Campaigns/utils/createCardActionButtons';
import createCampaignBody from '../../../../utils/createCampaignBody';

import { Creators } from '../../../redux/actions';

import { promoTypes } from '../../../../utils/promoTypes';
import { Discount, PayXGetY } from './components';

const PromoDetail = ({ promoType, availableTimes, values }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [promoDetailForm] = Form.useForm();

  useEffect(() => {
    promoDetailForm.setFieldsValue({
      ...values,
      // dailyUsageLimit: _.get(values, 'dailyUsageLimit', undefined),
      products: get(values, 'products')
        ? values.products.map(product => ({ key: product.productId, value: product.productId, label: product.productName }))
        : undefined,
      excludeProducts: get(values, 'excludeProducts')
        ? values.excludeProducts.map(product => ({ key: product.productId, value: product.productId, label: product.productName }))
        : undefined,
    });
  }, [values, promoDetailForm]);

  const { cardFooter, cardTitle, isEditable } = CreateCardActionButtons('FORM.PROMO_DETAIL.TITLE', 'edit-promo-detail');

  const onFinishPromoDetail = formValues => {
    const resultData = createCampaignBody(formValues, availableTimes, 'promoDetail');
    dispatch(
      Creators.updateCampaignRequest({
        data: { promoTypeDetailSection: resultData },
        campaignId: id,
      }),
    );
  };

  return (
    <Form id="edit-promo-detail" onFinish={onFinishPromoDetail} layout="vertical" form={promoDetailForm}>
      <AntCard footer={cardFooter} bordered={false} title={cardTitle}>
        {promoType === promoTypes.DISCOUNT && <Discount isEditable={isEditable} />}
        {promoType === promoTypes.PAY_X_GET_Y && <PayXGetY isEditable={isEditable} />}
      </AntCard>
    </Form>
  );
};

export default PromoDetail;

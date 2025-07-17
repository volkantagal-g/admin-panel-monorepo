import PromotionSelect from '@shared/containers/Marketing/Select/PromotionSelect';
import { GETIR_FOOD_DOMAIN_TYPE } from '@shared/shared/constants';
import { rules } from '@shared/containers/Marketing/ClientAppActions/helpers';

const RestaurantPromoAction = ({ fieldName, disabled, form }) => {
  return (
    <PromotionSelect fieldName={fieldName} disabled={disabled} targetServiceId={GETIR_FOOD_DOMAIN_TYPE} form={form} rules={rules.restaurantPromoList} />
  );
};

export default RestaurantPromoAction;

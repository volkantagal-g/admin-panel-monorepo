import PromotionSelect from '@shared/containers/Marketing/Select/PromotionSelect';
import { rules } from '@shared/containers/Marketing/ClientAppActions/helpers';

const PromoAction = ({ fieldName, targetServiceId, form, disabled }) => {
  return (
    <PromotionSelect fieldName={fieldName} targetServiceId={targetServiceId} form={form} disabled={disabled} rules={rules.promoRule} />
  );
};

export default PromoAction;

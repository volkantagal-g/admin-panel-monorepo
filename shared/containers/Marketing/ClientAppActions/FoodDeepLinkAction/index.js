import { rules } from '@shared/containers/Marketing/ClientAppActions/helpers';

import FoodDeepLinkSelect from '@shared/containers/Marketing/Select/FoodDeepLinkSelect';

const FoodDeepLinkAction = ({ fieldName, targetServiceId, form, disabled }) => {
  return (
    <FoodDeepLinkSelect fieldName={fieldName} targetServiceId={targetServiceId} form={form} disabled={disabled} rules={rules.foodDeepLinkId} />
  );
};

export default FoodDeepLinkAction;

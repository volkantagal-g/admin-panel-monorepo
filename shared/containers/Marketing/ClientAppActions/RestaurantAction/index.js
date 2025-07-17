import RestaurantSelect from '@shared/containers/Marketing/Select/RestaurantSelect';
import { rules } from '@shared/containers/Marketing/ClientAppActions/helpers';

const RestaurantAction = ({ fieldName, disabled }) => {
  return (
    <RestaurantSelect disabled={disabled} fieldName={fieldName} rules={rules.restaurantId} />
  );
};

export default RestaurantAction;

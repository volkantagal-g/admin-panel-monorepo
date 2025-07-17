import { rules } from '@shared/containers/Marketing/ClientAppActions/helpers';
import ProductCategorySelect from '@shared/containers/Marketing/Select/ProductCategorySelect';

const CategoryAction = ({ fieldName, disabled }) => {
  return (
    <ProductCategorySelect fieldName={fieldName} rules={rules.category} disabled={disabled} />
  );
};

export default CategoryAction;

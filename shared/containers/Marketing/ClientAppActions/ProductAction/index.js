import MarketProductSelect from '@shared/containers/Marketing/Select/MarketProductSelect';
import { rules } from '@shared/containers/Marketing/ClientAppActions/helpers';

const ProductAction = ({ fieldName, onChange, disabled }) => {
  return (
    <MarketProductSelect fieldName={fieldName} disabled={disabled} onChange={onChange} rules={rules.productAction} />
  );
};

export default ProductAction;

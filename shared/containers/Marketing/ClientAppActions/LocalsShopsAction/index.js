import { rules } from '@shared/containers/Marketing/ClientAppActions/helpers';
import LocalsShopSelect from '@shared/containers/Marketing/Select/LocalsShopSelect';

const LocalsShopsAction = ({ fieldName, disabled, form }) => {
  return (
    <LocalsShopSelect
      form={form}
      hasLabel={false}
      mode="single"
      selectWrapperProps={{ md: 24, xs: 24 }}
      rules={rules.localsShop}
      fieldName={fieldName}
      disabled={disabled}
    />
  );
};

export default LocalsShopsAction;

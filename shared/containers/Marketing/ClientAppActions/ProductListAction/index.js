import MarketProductSelect from '@shared/containers/Marketing/Select/MarketProductSelect';

const ProductListAction = ({ fieldName, onChange, disabled, form }) => {
  return (
    <MarketProductSelect fieldName={fieldName} disabled={disabled} onChange={onChange} hasCsvImport form={form} />
  );
};

export default ProductListAction;

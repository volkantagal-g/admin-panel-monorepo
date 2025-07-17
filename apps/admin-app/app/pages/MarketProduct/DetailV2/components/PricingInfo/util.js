import { VAT_VALUES } from '@shared/shared/constants';

export const getSupplierAndManufacturerOptions = (data = []) => data?.map(({ _id, name }) => ({
  'data-testid': 'supplier-option',
  value: _id,
  label: name,
}));

export const getFamilyOptions = (data = []) => data?.map(({ id, name }) => ({
  value: id,
  label: name,
}));

export const extractSupplierAndManufacturer = data => {
  const supplier = data?.filter(({ types }) => types?.includes('supplier'));
  const manufacturer = data?.filter(({ types }) => types?.includes('manufacturer'));

  return { supplier, manufacturer };
};

export const shapeSupplierAccounts = supplier => supplier?.accounts?.map(account => ({ ...account, name: supplier?.name }));

export const getSupplierAccountsOptions = supplierAcoounts => supplierAcoounts?.map(({ name, code }) => ({
  value: code,
  label: `${name} (${code})`,
}));

export const getSupplierAccounts = ({
  supplier,
  selectedSupplierId,
}) => {
  const selectedSupplier = supplier?.find(({ _id }) => _id === selectedSupplierId);

  return getSupplierAccountsOptions(shapeSupplierAccounts(selectedSupplier));
};

export const getVatOptions = () => {
  return Object.values(VAT_VALUES).map(vat => {
    return {
      value: vat,
      label: vat,
    };
  });
};

export const getSelllingPriceFilterObject = (target, filteredValues, formValues) => {
  if (target === 'warehouseIds') {
    const [startDate, endDate] = formValues?.dateRanges ?? [];
    return {
      warehouseIds: filteredValues,
      startDate,
      endDate,
    };
  }
  if (target === 'dateRanges') {
    const [startDate, endDate] = filteredValues ?? [];
    return {
      warehouseIds: formValues?.warehouseIds,
      startDate,
      endDate,
    };
  }
  return {};
};

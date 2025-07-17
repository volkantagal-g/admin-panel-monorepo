import axios from '@shared/axios/common';

export const getSuppliers = async ({ fields } = {}) => {
  const { data } = await axios({
    method: 'POST',
    url: '/supplier/getSuppliers',
    data: { fields },
  });
  return data;
};

export const getSupplierById = async ({ id }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/supplier/getSupplier',
    data: { id },
  });
  return data;
};

export const createSupplier = async ({ body }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/supplier/createSupplier',
    data: body,
  });
  return data;
};

export const createSupplierAccount = async ({ body }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/supplier/createSupplierAccount',
    data: body,
  });
  return data;
};

export const updateDCBonusForLogoAccount = async ({ id, updateData }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/supplier/updateDCBonusForLogoAccount',
    data: {
      id,
      account: updateData,
    },
  });
  return data;
};

export const updateSupplierProductMappingBarcodeAndCode = async ({ id, updateData }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/supplier/updateSupplierProductMappingBarcodeAndCode',
    data: {
      id,
      updateData,
    },
  });
  return data;
};

export const updateSupplier = async ({ id, updateData }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/supplier/updateSupplier',
    data: {
      id,
      updateData,
    },
  });
  return data;
};

export const updateSupplierCustomSettings = async ({ id, updateData }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/supplier/updateSupplierCustomSettings',
    data: {
      id,
      updateData,
    },
  });
  return data;
};

export const mapSupplierProducts = async ({ id }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/supplier/mapSupplierProducts',
    data: { id },
  });
  return data;
};

export const mapSupplierWarehouses = async () => {
  const { data } = await axios({
    method: 'POST',
    url: '/supplier/mapSupplierWarehouses',
    data: {},
  });
  return data;
};

export const getSupplierProductMappings = async ({ id }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/supplier/getSupplierProductMappings',
    data: { id },
  });
  return data;
};

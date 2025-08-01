export const mapPaginationForTable = pagination => {
  return {
    current: (pagination?.number || 1),
    pageSize: pagination.size,
    total: pagination.totalElements,
  };
};

export const mapDataForTable = (data = []) => {
  if (data) {
    if (data.length < 1) return [];
    return data?.map(banner => ({
      promoId: banner?.promoId,
      promoCode: banner?.promoCode,
      assets: banner?.assets,
      status: banner?.status,
    }));
  }
  return [];
};

export const manipulateFiltersBeforeSubmit = configs => {
  const { pagination } = configs;
  return {
    size: pagination?.pageSize,
    page: (pagination?.current || 1),
  };
};

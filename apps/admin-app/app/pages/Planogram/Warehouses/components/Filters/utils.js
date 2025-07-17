export const selectFormatterForWarehouses = data => data?.map(item => ({ value: item?.id, label: item?.name }));
export const selectFormatter = data => data?.map(item => ({ value: item.id, label: item.name }));

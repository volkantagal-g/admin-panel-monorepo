// Note: this fn is different from the common one in the app
// as it uses field names in line with antd's Table.
export const getLimitAndOffset = pagination => {
  const { current, pageSize } = pagination;

  const offset = (current - 1) * pageSize;
  const limit = pageSize;

  return { offset, limit };
};

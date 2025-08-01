export const dataConverter = indexList => {
  const data = [
    {
      key: 1,
      name: 'category_roles',
      index: parseFloat(indexList.indexOf('category_roles')),
    },
    {
      key: 2,
      name: 'category',
      index: parseFloat(indexList.indexOf('category')),
    },
    {
      key: 3,
      name: 'subcategory',
      index: parseFloat(indexList.indexOf('subcategory')),
    },
    {
      key: 4,
      name: 'kvi_fg_bg',
      index: parseFloat(indexList.indexOf('kvi_fg_bg')),
    },
  ];
  return data;
};

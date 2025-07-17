import { getLangKey, t } from '@shared/i18n';

export const getFormattedWarehouseInfo = warehouse => {
  if (!warehouse) return [];

  const { name, city, id } = warehouse;

  return [
    {
      key: 1,
      label: t('NAME_1'),
      value: name,
    },
    {
      key: 2,
      label: t('CITY'),
      value: city.name[getLangKey()],
    },
    {
      key: 3,
      label: t('ID'),
      value: id,
    },
  ];
};

export const columns = [
  {
    key: 'label',
    dataIndex: 'label',
    width: '25px',
    render: val => <b>{val}</b>,
  },
  {
    key: 'value',
    dataIndex: 'value',
    width: '75px',
  },
];

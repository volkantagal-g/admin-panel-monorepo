import { get } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { foodRestaurantUserRoles } from '@shared/shared/constants';

export const generateColumns = ({ t }) => [
  {
    title: t('GETIR_FOOD_TABLE.NAME'),
    dataIndex: 'name',
    key: 'name',
    width: 100,
  },
  {
    title: t('GETIR_FOOD_TABLE.EMAIL'),
    dataIndex: 'email',
    key: 'email',
    width: 100,
  },
  {
    title: t('GETIR_FOOD_TABLE.GSM'),
    dataIndex: 'gsm',
    key: 'gsm',
    width: 100,
  },
  {
    title: t('GETIR_FOOD_TABLE.ROLE'),
    dataIndex: 'role',
    key: 'role',
    width: 100,
    render: role => get(foodRestaurantUserRoles[role], getLangKey(), ''),
  },
];

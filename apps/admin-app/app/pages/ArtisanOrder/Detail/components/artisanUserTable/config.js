import { t, getLangKey } from '@shared/i18n';
import { artisanUserRoles } from '@shared/shared/constants';

export const tableColumns = [
  {
    title: t('artisanOrderPage:ARTISAN_TABLE.NAME'),
    dataIndex: 'name',
    key: 'name',
    width: 100,
    render: name => {
      return name;
    },
  },
  {
    title: t('artisanOrderPage:ARTISAN_TABLE.EMAIL'),
    dataIndex: 'email',
    key: 'email',
    width: 100,
    render: email => {
      return email;
    },
  },
  {
    title: t('artisanOrderPage:ARTISAN_TABLE.GSM'),
    dataIndex: 'gsm',
    key: 'gsm',
    width: 100,
    render: gsm => {
      return gsm;
    },
  },
  {
    title: t('artisanOrderPage:ARTISAN_TABLE.ROLE'),
    dataIndex: 'role',
    key: 'role',
    width: 100,
    render: role => {
      return role <= 4 ? artisanUserRoles[role][getLangKey()] : null;
    },
  },
];

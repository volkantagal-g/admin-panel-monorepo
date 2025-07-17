import { get } from 'lodash';

import { ROUTE } from '@app/routes';
import { Button, Tag } from '@shared/components/GUI';

export const tableColumns = t => {
  return [
    {
      title: t('TITLES.TABLE.FAMILY_NAME'),
      key: 'name',
      render: ({ name }) => name ?? '-',
    },
    {
      title: t('TITLES.TABLE.FAMILY_STATUS'),
      key: 'isActive',
      render: ({ isActive }) => {
        const tagColor = isActive ? 'active' : 'danger';
        const statusText = isActive ? t('ACTIVE') : t('INACTIVE');
        return (
          <Tag key={tagColor} color={tagColor}>
            {statusText}
          </Tag>
        );
      },
    },
    {
      title: t('global:ACTION'),
      key: 'action',
      align: 'center',
      fixed: 'right',
      width: 80,
      render: record => {
        const action = {
          onDetailClick: () => {
            const marketProductFamilyId = get(record, 'id', '');
            const path = ROUTE.MARKET_PRODUCT_FAMILY_DETAIL.path.replace(':id', marketProductFamilyId);
            window.open(path, '_blank');
          },
        };

        return (
          <Button type="default" size="small" onClick={action.onDetailClick}>
            {t('global:DETAIL')}
          </Button>
        );
      },
    },
  ];
};

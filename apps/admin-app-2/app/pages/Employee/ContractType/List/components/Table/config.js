import { DetailButton } from '@shared/components/UI/List';
import { t } from '@shared/i18n';
import { ROUTE } from '@app/routes';

export const tableColumns = canAccessDetailPage => {
  const columns = [
    {
      title: t('NAME'),
      dataIndex: 'name',
    },
  ];

  if (canAccessDetailPage) {
    columns.push({
      title: t('global:ACTION'),
      align: 'right',
      dataIndex: '_id',
      width: 100,
      render: _id => {
        const path = ROUTE.WORKFORCE_CONTRACT_DETAIL.path.replace(':id', '');

        return (
          <DetailButton urlPath={path} _id={_id} />
        );
      },
    });
  }

  return columns;
};

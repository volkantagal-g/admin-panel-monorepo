import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { clientsSelector } from '@app/pages/Client/List/redux/selectors';
import AntCard from '@shared/components/UI/AntCard';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { usePermission } from '@shared/hooks';
import { tableColumns } from '@app/pages/Client/List/components/Table/config';

const Table = () => {
  const { canAccess } = usePermission();
  const { t } = useTranslation(['global']);

  const isClientsPending = useSelector(clientsSelector.getIsPending);
  const clients = useSelector(clientsSelector.getData);

  return (
    <AntCard
      title={t('PAGE_TITLE.CLIENT_LIST')}
    >
      <AntTableV2
        data={clients}
        columns={tableColumns({ t, canAccess })}
        loading={isClientsPending}
        pagination={false}
      />
    </AntCard>
  );
};

export default Table;

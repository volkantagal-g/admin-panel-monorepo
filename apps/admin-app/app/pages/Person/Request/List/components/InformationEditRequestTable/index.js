import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AntTable from '@shared/components/UI/AntTable';
import { informationEditRequestListSelector } from '@app/pages/Person/Request/List/redux/selectors';
import { _tableColumns } from './config';

const InformationEditRequestTable = ({ pagination, handlePaginationChange }) => {
  const { t } = useTranslation('personRequestPage');

  const data = useSelector(informationEditRequestListSelector.getData);
  const total = useSelector(informationEditRequestListSelector.getTotal);
  const isPending = useSelector(informationEditRequestListSelector.getIsPending);

  return (
    <>
      <AntTable
        data={data}
        total={total}
        columns={_tableColumns({ t })}
        loading={isPending}
        pagination={pagination}
        totalBadge={{ total, label: t('INFORMATION_EDIT_REQUESTS') }}
        onPaginationChange={handlePaginationChange}
      />
    </>
  );
};

export default InformationEditRequestTable;

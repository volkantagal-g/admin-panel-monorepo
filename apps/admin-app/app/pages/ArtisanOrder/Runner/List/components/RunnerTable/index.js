import { useTranslation } from 'react-i18next';

import React from 'react';

import { useSelector } from 'react-redux';

import { tableColumns } from './config';

import { usePermission } from '@shared/hooks';
import { getRunnersSelector } from '../../redux/selectors';
import AntTableV2 from '@shared/components/UI/AntTableV2';

function RunnerTable({ pagination, onPaginationChange }) {
  const { t } = useTranslation(['runnerListPage', 'global']);
  const runners = useSelector(getRunnersSelector.getData);
  const isPending = false;
  const { canAccess } = usePermission();

  return (
    <div className="mt-4">
      <AntTableV2
        data={runners}
        columns={tableColumns({ t, canAccess })}
        loading={isPending}
        pagination={pagination}
        onPaginationChange={onPaginationChange}
      />
    </div>
  );
}

export default React.memo(RunnerTable);

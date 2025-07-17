import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AntTable from '@shared/components/UI/AntTable';
import { useEffectSkipInitialRender } from '@shared/hooks';
import { getMarketFranchisesSelector } from '@shared/redux/selectors/common';
import { createMap } from '@shared/utils/common';
import { getWarehousesSelector } from '@shared/containers/Select/Warehouse/redux/selectors';
import { personCandidateListSelector, updateAssigneeSelector } from '../../redux/selector';
import { Creators } from '../../redux/actions';
import { getPersonCandidateListRequestParams } from '../../utils';
import { _getTableColumns } from './config';
import ActionHistoryModal from '../ActionHistoryModal';
import { DEFAULT_PAGINATION_VALUES } from '../../constants';

const Table = ({ filters, onExport }) => {
  const { t } = useTranslation('personCandidatePage');
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION_VALUES);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState();

  const data = useSelector(personCandidateListSelector.getData);
  const total = useSelector(personCandidateListSelector.getTotal);
  let isPending = useSelector(personCandidateListSelector.getIsPending);
  const franchisesData = useSelector(getMarketFranchisesSelector.getData);

  const isPendingAssignee = useSelector(updateAssigneeSelector.getIsPending);

  const isPendingWarehouses = useSelector(getWarehousesSelector.getIsPending);
  const warehouses = useSelector(getWarehousesSelector.getData);
  const warehousesMap = useMemo(() => createMap(warehouses), [warehouses]);
  isPending = isPending || isPendingWarehouses;

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  const handleAssignClick = ({ candidateId }) => {
    const requestParams = getPersonCandidateListRequestParams({
      ...filters,
      ...pagination,
    });

    dispatch(Creators.updateAssigneeRequest({ candidateId, ...requestParams }));
  };

  const handleLogHistoryClick = ({ candidate }) => {
    setSelectedCandidate(candidate);
    setIsModalVisible(true);
  };

  const getPersonCandidateList = () => {
    const requestParams = getPersonCandidateListRequestParams({
      ...filters,
      ...pagination,
    });
    dispatch(Creators.getPersonCandidateListRequest(requestParams));
  };

  useEffectSkipInitialRender(() => {
    const { currentPage } = pagination;
    const { currentPage: defaultCurrentPage } = DEFAULT_PAGINATION_VALUES;

    if (currentPage !== defaultCurrentPage) {
      setPagination({ ...pagination, currentPage: defaultCurrentPage });
    }
    else {
      getPersonCandidateList();
    }
  }, [filters]);

  useEffect(() => {
    getPersonCandidateList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.currentPage, pagination.rowsPerPage]);

  return (
    <>
      <AntTable
        data={data}
        total={total}
        columns={_getTableColumns({
          franchises: franchisesData,
          handleAssignClick,
          handleLogHistoryClick,
          isPending: isPendingAssignee,
          warehousesMap,
          t,
        })}
        loading={isPending}
        pagination={pagination}
        totalBadge={{ total, label: t('CANDIDATE_LIST_REQUEST') }}
        onPaginationChange={handlePaginationChange}
        onExport={onExport}
      />
      <ActionHistoryModal
        candidate={selectedCandidate}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
};

export default Table;

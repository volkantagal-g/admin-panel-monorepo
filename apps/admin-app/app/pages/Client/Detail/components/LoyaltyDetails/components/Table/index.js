import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { Spin } from 'antd';

import { get } from 'lodash';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { tableColumns, DEFAULT_PAGINATION_CONFIG } from './config';
import Filters from './Filters';
import { clientSelector, loyaltyStampsSelector } from '@app/pages/Client/Detail/redux/selectors';
import { Creators } from '@app/pages/Client/Detail/redux/actions';
import Title from './Title';
import { getLoyaltyTypes } from './Filters/config';
import { getLangKey } from '@shared/i18n';
import { tableDataMapper } from './utils';

const Table = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('clientDetail');
  const loyaltyStamps = useSelector(loyaltyStampsSelector.getStamps);
  const isPending = useSelector(loyaltyStampsSelector.getIsPending);
  const client = useSelector(clientSelector.getClient);
  const langKey = getLangKey();

  const [tableData, setTableData] = useState(undefined);
  const [filters, setFilters] = useState({ loyaltyType: {} });
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION_CONFIG);

  const dataTableColumn = tableColumns({ t });

  useEffect(() => {
    if (client?._id) {
      dispatch(Creators.getClientLoyaltyStampsRequest({ clientId: client._id }));
    }
  }, [dispatch, client]);

  useEffect(() => {
    if (loyaltyStamps?.length) {
      setTableData(tableDataMapper({
        loyaltyStamps,
        filters,
        pagination,
        t,
      }));
    }
  }, [filters, loyaltyStamps, pagination, t]);

  useEffect(() => {
    if (loyaltyStamps?.length) {
      setFilters(prevState => ({ ...prevState, loyaltyType: getLoyaltyTypes(loyaltyStamps, langKey)[0] }));
    }
  }, [langKey, loyaltyStamps]);

  useEffect(() => {
    if (filters?.loyaltyType) {
      setPagination({ currentPage: 1, rowsPerPage: filters.loyaltyType.totalStampCount });
    }
  }, [filters]);

  const tableTitle = useMemo(() => {
    if (!tableData?.cycleStatus) {
      return undefined;
    }

    return <Title cycleStatus={tableData.cycleStatus} />;
  }, [tableData]);

  return (
    <Spin spinning={isPending}>
      <Filters filters={filters} setFilters={setFilters} />
      <AntTableV2
        title={tableTitle}
        data={get(tableData, 'filteredTableData', [])}
        columns={dataTableColumn}
        pagination={pagination}
        onPaginationChange={filters?.loyaltyType.totalStampCount && setPagination}
        pageSizeOptions={[filters?.loyaltyType.totalStampCount]}
        total={tableData?.totalDataSize}
      />
    </Spin>
  );
};

export default Table;

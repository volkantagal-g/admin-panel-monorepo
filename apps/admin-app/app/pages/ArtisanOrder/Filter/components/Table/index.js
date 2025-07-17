import { memo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { generateArtisanTableColumns } from '@app/pages/ArtisanOrder/Filter/components/Table/config';
import AntTable from '@shared/components/UI/AntTable';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { Creators } from '@app/pages/ArtisanOrder/Filter/redux/actions';
import {
  resultsSelector,
  filtersSelector,
  artisanOrderRootSelector,
} from '@app/pages/ArtisanOrder/Filter/redux/selectors';
import { mapDataForTable } from '@app/pages/ArtisanOrder/Filter/utils';

const ArtisanOrderFilterTable = () => {
  const { t } = useTranslation('artisanOrderFilterPage');
  const dispatch = useDispatch();
  const isPending = useSelector(resultsSelector.isPending);
  const data = useSelector(resultsSelector.getResults);
  const filters = useSelector(filtersSelector.getFilters);
  const cities = useSelector(artisanOrderRootSelector.getCities);

  const [tableColumns, setTableColumns] = useState(generateArtisanTableColumns(t));
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch(CommonCreators.getCitiesRequest());
    dispatch(Creators.getPaymentMethods({ data: { includeOnline: true } }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(Creators.getResultsRequest({ data: filters }));
  }, [dispatch, filters]);

  useEffect(() => {
    if (!isPending) {
      setTableData(mapDataForTable(data, cities));
      setTableColumns(generateArtisanTableColumns(t));
    }
  }, [data, cities, isPending, t]);

  const handlePaginationChange = meta =>
    dispatch(Creators.setFilters({ data: { ...filters, page: meta.currentPage, count: meta.rowsPerPage } }));

  return (
    <AntTable
      data={tableData}
      columns={tableColumns}
      loading={isPending}
      scroll={{ x: 'max-content' }}
      pagination={{ currentPage: filters.page, rowsPerPage: filters.count }}
      onPaginationChange={handlePaginationChange}
      bordered
    />
  );
};

export default memo(ArtisanOrderFilterTable);

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { generateTableColumns } from './config';
import AntTable from '@shared/components/UI/AntTable';
import { Creators } from '../../redux/actions';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { getWarehousesSelector, getMarketFranchisesSelector } from '@shared/redux/selectors/common';
import {
  resultsSelector,
  pointsSelector,
  dtsCategoriesSelector,
  filteredResultsSelector,
} from '@app/pages/Dts/Summary/redux/selectors';
import { mapDataForTable } from '../../utils';
import useStyles from './styles';

const DtsTable = () => {
  const { t } = useTranslation('dtsSummaryPage');
  const dispatch = useDispatch();
  const warehouses = useSelector(getWarehousesSelector.getData);
  const dtsCategories = useSelector(dtsCategoriesSelector.getDtsCategories);
  const franchises = useSelector(getMarketFranchisesSelector.getData);
  const data = useSelector(resultsSelector.getResults);
  const filteredData = useSelector(filteredResultsSelector.getResults);
  const isResultsPending = useSelector(resultsSelector.getResultsIsPending);
  const isPointsPending = useSelector(pointsSelector.getPointsIsPending);
  const isDtsCategoriesPending = useSelector(dtsCategoriesSelector.getDtsCategoriesIsPending);
  const isGetWarehousesPending = useSelector(getWarehousesSelector.getIsPending);
  const isMarketFranchisesPending = useSelector(getMarketFranchisesSelector.getIsPending);

  const isPending = isResultsPending ||
    isPointsPending ||
    isGetWarehousesPending ||
    isDtsCategoriesPending ||
    isMarketFranchisesPending;

  const [tableColumns, setTableColumns] = useState(() => generateTableColumns([]));

  const classes = useStyles();

  useEffect(() => {
    dispatch(Creators.getDtsCategoriesRequest());
    dispatch(CommonCreators.getWarehousesRequest());
    dispatch(CommonCreators.getCitiesRequest());
    dispatch(CommonCreators.getMarketFranchisesRequest());
  }, [dispatch]);

  useEffect(() => {
    if (!isPending) {
      const mappedData = mapDataForTable(data, warehouses, franchises, dtsCategories);
      dispatch(Creators.setFilteredResults({ data: mappedData }));
      setTableColumns(generateTableColumns(dtsCategories));
    }
  }, [data, dispatch, dtsCategories, franchises, isPending, warehouses]);

  return (
    <div className={classes.container}>
      <AntTable
        title={t('TITLE')}
        data={filteredData}
        columns={tableColumns}
        loading={isPending}
        className={{}}

      />
    </div>
  );
};

export default DtsTable;

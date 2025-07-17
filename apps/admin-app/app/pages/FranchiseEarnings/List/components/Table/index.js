import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AntTable from '@shared/components/UI/AntTable';
import { earningsSelector, voyagerEarningsSelector } from '@app/pages/FranchiseEarnings/List/redux/selectors';
import { getTableColumns } from './config';
import { Creators } from '../../redux/actions';
import { getSelectedMonthKeys } from '../../utils';

const EarningsTable = ({ filters }) => {
  const dispatch = useDispatch();

  const { selectedRequestTimeRange, selectedTaxType } = filters;

  const earnings = useSelector(earningsSelector.getTableData);
  const earningsIsPending = useSelector(earningsSelector.getIsPending);
  const voyagerEarnings = useSelector(voyagerEarningsSelector.getTableData);
  const voyagerEarningsIsPending = useSelector(voyagerEarningsSelector.getIsPending);

  const [selectedMonthKeys, setSelectedMonthKeys] = useState(getSelectedMonthKeys(selectedRequestTimeRange));
  const [columns, setColumns] = useState(getTableColumns(selectedMonthKeys));

  useEffect(() => {
    dispatch(Creators.changeTaxType({ taxType: selectedTaxType }));
  }, [selectedTaxType, dispatch]);

  useEffect(() => {
    const monthKeys = getSelectedMonthKeys(selectedRequestTimeRange);
    setSelectedMonthKeys(monthKeys);
    setColumns(getTableColumns(monthKeys));
  }, [earnings, voyagerEarnings]);

  return (
    <AntTable
      data={[...earnings, ...voyagerEarnings]}
      columns={columns}
      loading={earningsIsPending || voyagerEarningsIsPending}
      scroll={{ x: 'max-content', y: 500 }}
      expandRowByClick
    />
  );
};

export default EarningsTable;

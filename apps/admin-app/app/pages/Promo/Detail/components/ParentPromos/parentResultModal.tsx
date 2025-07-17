import { useDispatch, useSelector } from 'react-redux';

import React from 'react';

import { BulkOperationResultTable } from '@app/pages/Promo/components/BulkOperationResultTable';
import { BulkOpMessage, RelationalBulkOperation } from '@app/pages/Promo/types';
import { ResultTableFooter } from '@app/pages/Promo/components/BulkOperationResultTable/ResultTableFooter';
import { ParentPromosSlice } from '@app/pages/Promo/Detail/components/ParentPromos/slice';

export function ParentResultModal() {
  const dispatch = useDispatch();
  const data = useSelector(ParentPromosSlice.selectors.result);

  const onCancel = () => {
    dispatch(ParentPromosSlice.actions.hideResultTable());
  };

  const onChange = (message: BulkOpMessage[] | null) => {
    dispatch(ParentPromosSlice.actions.setAddRemoveOptionsFilter(message));
  };

  const isVisible = useSelector(ParentPromosSlice.selectors.resultModalVisible);
  const filter = useSelector(ParentPromosSlice.selectors.addRemoveOptionsFilter);

  return (
    <BulkOperationResultTable
      operation={RelationalBulkOperation.AddRemove}
      onCancel={onCancel}
      onFilter={onChange}
      isVisible={isVisible}
      data={data}
      footer={<ResultTableFooter data={data} filter={filter} />}
    />
  );
}

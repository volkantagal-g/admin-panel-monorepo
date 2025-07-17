import { useDispatch, useSelector } from 'react-redux';

import React from 'react';

import { BulkOperationResultTable } from '@app/pages/Promo/components/BulkOperationResultTable';
import { ChildrenPromosSlice } from '@app/pages/Promo/Detail/components/ChildPromos/slice';
import { BulkOpMessage } from '@app/pages/Promo/types';
import { ResultTableFooter } from '@app/pages/Promo/components/BulkOperationResultTable/ResultTableFooter';

export function ChildrenResultModal() {
  const dispatch = useDispatch();
  const operation = useSelector(ChildrenPromosSlice.selectors.operation);
  const data = useSelector(ChildrenPromosSlice.selectors.result);

  const onCancel = () => {
    dispatch(ChildrenPromosSlice.actions.hideAddChildrenResultTable());
  };

  const onChange = (message: BulkOpMessage[] | null) => {
    dispatch(ChildrenPromosSlice.actions.setAddRemoveOptionsFilter(message));
  };

  const isVisible = useSelector(ChildrenPromosSlice.selectors.resultModalVisible);
  const filter = useSelector(ChildrenPromosSlice.selectors.addRemoveOptionsFilter);

  return (
    <BulkOperationResultTable
      operation={operation}
      onCancel={onCancel}
      onFilter={onChange}
      isVisible={isVisible}
      data={data}
      footer={<ResultTableFooter data={data} filter={filter} />}
    />
  );
}

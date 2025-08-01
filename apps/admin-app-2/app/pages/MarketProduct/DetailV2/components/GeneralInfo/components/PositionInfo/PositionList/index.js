import { useSelector } from 'react-redux';
import { useMemo } from 'react';

import { xor } from 'lodash';

import {
  addMarketCategoryPositionSelector,
  getMarketProductByIdSelector,
  deleteMarketCategoryPositionSelector,
  updateMainCategorySelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { getPositionTableColumns } from './config';
import { Table } from '@shared/components/GUI';
import { MARKET_PRODUCT_CATEGORY_STATUS } from '@shared/shared/constants';

const PositionList = ({
  isMainCategoryFunc,
  makeMainCategory,
  deleteCategoryPosition,
  isTableEditable,
}) => {
  const positions = useSelector(getMarketProductByIdSelector.getPositions);
  const isGetPending = useSelector(getMarketProductByIdSelector.getIsPending);
  const isAddPending = useSelector(addMarketCategoryPositionSelector.getIsPending);
  const isDeletePending = useSelector(deleteMarketCategoryPositionSelector.getIsPending);
  const isUpdateMainPending = useSelector(updateMainCategorySelector.getIsPending);
  const isPending = isGetPending || isAddPending || isDeletePending || isUpdateMainPending;

  const sortedPositions = useMemo(() => [
    ...positions.filter(
      position => position?.category?.status === MARKET_PRODUCT_CATEGORY_STATUS.ACTIVE
        && position?.subCategory?.status === MARKET_PRODUCT_CATEGORY_STATUS.ACTIVE,
    ),
    ...positions.filter(position => xor(
      [position?.category?.status],
      [position?.subCategory?.status],
    ).length > 0),
    ...positions.filter(
      position => position?.category?.status === MARKET_PRODUCT_CATEGORY_STATUS.INACTIVE
        && position?.subCategory?.status === MARKET_PRODUCT_CATEGORY_STATUS.INACTIVE,
    ),
  ], [positions]);

  return (
    <Table
      data={sortedPositions}
      columns={getPositionTableColumns({
        isMainCategoryFunc,
        makeMainCategory,
        deleteCategoryPosition,
        isTableEditable,
      })}
      loading={isPending}
      data-testid="positions-list"
    />
  );
};

export default PositionList;

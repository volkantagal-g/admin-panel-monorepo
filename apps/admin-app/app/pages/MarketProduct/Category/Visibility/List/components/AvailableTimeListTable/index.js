import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal, Button, Row, Col } from 'antd';
import { useTheme } from 'react-jss';

import { createMap } from '@shared/utils/common';
import { Creators } from '../../redux/actions';
import {
  deleteMarketProductCategoryAvailableTimesSelector,
  getMarketProductCategoryAvailableTimesSelector,
} from '../../redux/selectors';
import AntTable from '@shared/components/UI/AntTable';
import { getTableColumns } from './config';
import {
  getMarketProductCategoriesSelector,
  getFilteredWarehousesSelector, getCitiesSelector,
} from '@shared/redux/selectors/common';
import { usePrevious } from '@shared/hooks';
import { initialFilters } from '@app/pages/MarketProduct/Category/Visibility/List/components/utils';

const AvailableTimeListTable = ({ onSetFilters, selectedCategoryAvailableTimeIds, onSetSelectedCategoryAvailableTimeIds }) => {
  const dispatch = useDispatch();
  const categoryAvailableTimes = useSelector(getMarketProductCategoryAvailableTimesSelector.getData);
  const isCategoryAvailableTimesPending = useSelector(getMarketProductCategoryAvailableTimesSelector.getIsPending);
  const warehouses = useSelector(getFilteredWarehousesSelector.getData);
  const isCitiesPending = useSelector(getCitiesSelector.getIsPending);
  const isWarehousesPending = useSelector(getFilteredWarehousesSelector.getIsPending);
  const marketProductCategories = useSelector(getMarketProductCategoriesSelector.getData);
  const isCategoriesPending = useSelector(getMarketProductCategoriesSelector.getIsPending);
  const isDeleteBulkPending = useSelector(deleteMarketProductCategoryAvailableTimesSelector.getIsPending);
  const deleteBulkError = useSelector(deleteMarketProductCategoryAvailableTimesSelector.getError);
  const prevIsDeleteBulkPending = usePrevious(isDeleteBulkPending);
  const categoriesMap = createMap(marketProductCategories);
  const { t } = useTranslation('marketProductCategoryVisibilityPage');
  const [removeBulkConfirmation, removeBulkConfirmationModalContext] = Modal.useModal();
  const isAnyPending = isWarehousesPending || isCitiesPending || isCategoryAvailableTimesPending || isDeleteBulkPending || isCategoriesPending;
  const theme = useTheme();

  const warehousesMap = useMemo(
    () => createMap(warehouses),
    [warehouses],
  );

  const selectAll = selectedRowKeys => {
    onSetSelectedCategoryAvailableTimeIds(selectedRowKeys);
  };

  const unselectAll = useCallback(() => {
    onSetSelectedCategoryAvailableTimeIds([]);
  }, [onSetSelectedCategoryAvailableTimeIds]);

  useEffect(() => {
    if (prevIsDeleteBulkPending && !isDeleteBulkPending && !deleteBulkError) {
      unselectAll();
    }
  }, [prevIsDeleteBulkPending, isDeleteBulkPending, deleteBulkError, unselectAll]);

  const handleBulkDelete = () => {
    const modalConfig = {
      content: (
        <>
          {t('REMOVE_BULK_CONFIRMATION', { count: `(${selectedCategoryAvailableTimeIds?.length})` })}
        </>
      ),
      icon: null,
      okText: t('button:DELETE_SELECTED_ROWS', { count: selectedCategoryAvailableTimeIds?.length ? `(${selectedCategoryAvailableTimeIds?.length})` : '' }),
      okButtonProps: { danger: true },
      cancelText: t('button:CANCEL'),
      onOk: () => {
        dispatch(Creators.deleteMarketProductCategoryAvailableTimesRequest({ ids: selectedCategoryAvailableTimeIds }));
        onSetFilters({ ...initialFilters });
      },
      centered: true,
    };
    removeBulkConfirmation.confirm(modalConfig);
  };

  const rowSelection = {
    selectedRowKeys: selectedCategoryAvailableTimeIds,
    onChange: selectedRowKeys => selectAll(selectedRowKeys),
  };

  const areAllCatsSelected = categoryAvailableTimes?.length && categoryAvailableTimes.length === selectedCategoryAvailableTimeIds?.length;

  return (
    <>
      <AntTable
        title={t('CATEGORY_BASED_VISIBILITY_LIST')}
        data={categoryAvailableTimes}
        columns={getTableColumns({ warehousesMap, categoriesMap })}
        loading={isAnyPending}
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        rightElement={(
          <Row gutter={theme.spacing(2)}>
            <Col>
              <Button
                disabled={!categoryAvailableTimes?.length}
                size="small"
                onClick={() => {
                  if (areAllCatsSelected) {
                    unselectAll();
                  }
                  else {
                    const ids = categoryAvailableTimes.filter(item => item?._id).map(item => item?._id);
                    selectAll(ids);
                  }
                }}
                loading={isAnyPending}
              >
                {areAllCatsSelected ? t('button:UNSELECT_ALL') : t('button:SELECT_ALL')}
              </Button>
            </Col>
            <Col>
              <Button
                danger
                disabled={!selectedCategoryAvailableTimeIds?.length}
                size="small"
                onClick={event => {
                  event.stopPropagation();
                  handleBulkDelete();
                }}
                loading={isAnyPending}
              >
                {t('button:DELETE_SELECTED_ROWS', { count: selectedCategoryAvailableTimeIds?.length ? `(${selectedCategoryAvailableTimeIds?.length})` : '' })}
              </Button>
            </Col>
          </Row>
        )}
      />
      {removeBulkConfirmationModalContext}
    </>
  );
};

export default AvailableTimeListTable;

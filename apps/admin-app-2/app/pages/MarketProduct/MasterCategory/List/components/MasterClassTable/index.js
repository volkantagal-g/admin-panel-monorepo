import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import _ from 'lodash';
import { Row, Col, Button, Tooltip } from 'antd';
import { useTheme } from 'react-jss';

import arrayMove from '@shared/utils/arrayMove';
import { Creators } from '../../redux/actions';
import { getMasterClassesSelector, bulkUpdateMarketProductMasterCategoriesSelector } from '../../redux/selectors';
/* eslint-disable-next-line import/no-cycle */
import { getTableColumns } from './config';
import AntTable from '@shared/components/UI/AntTable';
import { getDiffObj, getLimitAndOffset } from '@shared/utils/common';
import { usePrevious } from '@shared/hooks';
import AntCard from '@shared/components/UI/AntCard';

const SortableItem = SortableElement(props => <tr {...props} />);
const SortableList = SortableContainer(props => <tbody {...props} />);

const MasterClassTable = ({ queryText }) => {
  const [isSortable, setIsSortable] = useState(false);
  const dispatch = useDispatch();
  const masterClasses = useSelector(getMasterClassesSelector.getData);
  const [data, setData] = useState([]);
  const [editedCategoryIds, setEditedCategoryIds] = useState([]);
  const isPending = useSelector(getMasterClassesSelector.getIsPending);
  const isBulkUpdatePending = useSelector(bulkUpdateMarketProductMasterCategoriesSelector.getIsPending);
  const { t } = useTranslation('marketProductMasterCategoryPage');
  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });
  const theme = useTheme();
  const prevIsUpdatePending = usePrevious(isBulkUpdatePending);

  useEffect(() => {
    if (masterClasses) {
      setData(_.cloneDeep(masterClasses));
    }
  }, [masterClasses]);

  useEffect(() => {
    if (prevIsUpdatePending && !isBulkUpdatePending) {
      setIsSortable(false);
      setEditedCategoryIds([]);
    }
  }, [isBulkUpdatePending]);

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMove([].concat(data), oldIndex, newIndex).filter(el => !!el);
      const { newValues: diffObject } = getDiffObj(masterClasses, newData);
      const pickingOrderStartNumber = (pagination.currentPage - 1) * pagination.rowsPerPage;
      const newEditedCategoryIds = Object.entries(diffObject).map(([key, masterCategory]) => {
        _.set(newData, [key, 'pickingOrder'], pickingOrderStartNumber + Number(key) + 1);
        return _.get(masterCategory, '_id');
      });
      setEditedCategoryIds(newEditedCategoryIds);
      setData(newData);
    }
  };

  const DraggableContainer = props => {
    return (
      <SortableList
        axis="xy"
        disableAutoscroll
        helperClass="row-dragging"
        onSortEnd={onSortEnd}
        {...props}
      />
    );
  };

  const DraggableBodyRow = ({ className, style, ...restProps }) => {
    const index = data.findIndex(item => item._id === restProps['data-row-key']);
    return <SortableItem key={_.toString(index)} index={index} disabled={!isSortable} {...restProps} />;
  };

  useEffect(() => {
    dispatch(Creators.getMasterClassesRequest({ ...getLimitAndOffset(pagination), queryText }));
  }, [pagination.currentPage, pagination.rowsPerPage, queryText]);

  const handleEditPickingOrder = () => {
    setIsSortable(true);
  };

  const handleCancelClick = () => {
    setData(_.cloneDeep(masterClasses));
    setIsSortable(false);
  };

  const categoriesToUpdate = useMemo(
    () => {
      const newCategoriesToUpdate = data
        .filter(item => editedCategoryIds.includes(item._id))
        .map(item => {
          return {
            id: item._id,
            pickingOrder: item.pickingOrder,
          };
        });
      return newCategoriesToUpdate || [];
    },
    [data, editedCategoryIds],
  );

  const handleBulkUpdate = () => {
    dispatch(Creators.bulkUpdateMarketProductMasterCategoriesRequest({
      categories: categoriesToUpdate,
      queryText,
      ...getLimitAndOffset(pagination),
    }));
  };

  useEffect(() => {
    if (queryText && isSortable) {
      setIsSortable(false);
    }
  }, [queryText]);

  const tableFooter = (
    <Row justify="end" gutter={[theme.spacing(3)]}>
      {isSortable ? (
        <>
          <Col>
            <Button size="small" onClick={handleCancelClick}>
              {t('button:CANCEL')}
            </Button>
          </Col>
          <Col>
            <Button
              onClick={handleBulkUpdate}
              disabled={categoriesToUpdate.length < 1}
              size="small"
              type="primary"
              htmlType="submit"
              loading={isBulkUpdatePending}>
              {t('button:SAVE')}
            </Button>
          </Col>
        </>
      ) : (
        <Tooltip title={queryText ? t('CLEAR_SEARCH_BAR') : ''}>
          <Button disabled={queryText} size="small" type="default" onClick={handleEditPickingOrder}>
            {t('EDIT_PICKING_ORDER')}
          </Button>
        </Tooltip>
      )}
    </Row>
  );

  return (
    <AntCard footer={tableFooter} bordered={false} className="card-wrapper-for-table">
      <AntTable
        title={t('MASTER_CLASSES')}
        data={isSortable ? data : masterClasses}
        columns={getTableColumns(isSortable)}
        loading={isPending}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
        pageSizeOptions={[10, 25, 50, 100, 1000]}
        components={{
          body: {
            wrapper: DraggableContainer,
            row: DraggableBodyRow,
          },
        }}
      />
    </AntCard>
  );
};

export default MasterClassTable;

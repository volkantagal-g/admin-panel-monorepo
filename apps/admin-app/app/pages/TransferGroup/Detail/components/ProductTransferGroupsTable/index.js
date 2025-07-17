import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { Creators } from '../../redux/actions';
import { getTransferGroupByIdSelector, productTransferGroupsSelector } from '../../redux/selectors';
import { getTableColumns, exampleCsv } from './config';
import AntTable from '@shared/components/UI/AntTable';
import { getLimitAndOffset } from '@shared/utils/common';

const ProductTransferGroupsTable = () => {
  const dispatch = useDispatch();
  const transferGroup = useSelector(getTransferGroupByIdSelector.getData) || {};
  const productTransferGroups = useSelector(productTransferGroupsSelector.getData) || [];
  const isGetTransferGroupsPending = useSelector(productTransferGroupsSelector.getIsPending);
  const isGetTranferGroupPending =  useSelector(getTransferGroupByIdSelector.getIsPending);
  const isPending = isGetTransferGroupsPending || isGetTranferGroupPending;
  const { t } = useTranslation('transferGroupPage');
  const { id: transferGroupId } = useParams();

  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  useEffect(() => {
    dispatch(Creators.getProductTransferGroupsByFilterRequest({
      transferGroup: transferGroupId,
      ...getLimitAndOffset(pagination),
    }));
  }, [pagination.currentPage, pagination.rowsPerPage, dispatch]);

  const handleExport = () => {
    dispatch(Creators.exportProductTransferGroupsByFilterRequest({
      transferGroups: [transferGroupId],
      transferGroup,
    }));
  };

  const handleCsvImport = ({ data: csvData }) => {
    const productIds = csvData
      .map(item => {
        return _.get(item, 'product_id', '');
      })
      .filter(id => {
        return !!id;
      });
    dispatch(Creators.updateTransferGroupOfProductsBulkRequest({ products: productIds, transferGroup: transferGroupId }));
  };

  return (
    <div className="mt-10px">
      <AntTable
        title={t('PRODUCTS')}
        data={productTransferGroups}
        columns={getTableColumns()}
        loading={isPending}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
        importerProps={{
          onOkayClick: handleCsvImport,
          exampleCsv,
        }}
        onExport={handleExport}
      />
    </div>
  );
};

export default ProductTransferGroupsTable;

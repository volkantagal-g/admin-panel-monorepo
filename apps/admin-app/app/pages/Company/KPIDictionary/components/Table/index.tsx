import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Row,
  Card,
} from 'antd';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getLangKey } from '@shared/i18n';
import { Creators } from '../../redux/actions';
import { filterSelector, kpiDictionarySelector } from '../../redux/selectors';
import useParentStyle from '../../styles';
import { getTableColumns } from './config';

const Filter = () => {
  const { t } = useTranslation(['employeePage', 'global']);
  const dispatch = useDispatch();
  const parentClasses = useParentStyle();
  const langKey = getLangKey();

  const tableData = useSelector(kpiDictionarySelector.getData);
  const isTableDataPending = useSelector(kpiDictionarySelector.getIsPending);
  const totalCount = useSelector(kpiDictionarySelector.getTotalCount);
  const pagination = useSelector(filterSelector.getPagination);

  const handlePaginationChange = (paginationInfo: any) => {
    dispatch(Creators.updateFilters({
      filters: {
        pagination: {
          currentPage: paginationInfo.currentPage,
          rowsPerPage: paginationInfo.rowsPerPage,
        },
      },
    }));

    dispatch(Creators.getKPIDictionaryRequest({}));
  };

  const tableColumns = getTableColumns({ t, langKey });

  return (
    <Card
      className={[parentClasses.cardContainer, parentClasses.tableCardContainer].join(' ')}
    >
      <Row gutter={[16, 16]}>
        <AntTableV2
          data={tableData}
          columns={tableColumns}
          pagination={pagination}
          total={totalCount}
          onPaginationChange={handlePaginationChange}
          loading={isTableDataPending}
        />
      </Row>
    </Card>
  );
};

export default Filter;

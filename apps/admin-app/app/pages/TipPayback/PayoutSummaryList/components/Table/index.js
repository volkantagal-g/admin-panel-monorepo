import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Footer from '@shared/components/UI/AntTable/components/Footer';
import defaultOptions from '@shared/components/UI/AntTable/defaultOptions';

import { columns } from './config';
import { calculateSelector, summariesSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { sortByColumn } from '@app/pages/TipPayback/utils';

function Table({ filters, pagination, setPagination }) {
  const { t } = useTranslation(['payoutSummaryPage', 'global']);
  const dispatch = useDispatch();

  const summariesSelectorData = useSelector(summariesSelector.getData);
  const summariesIsPending = useSelector(summariesSelector.getIsPending);
  const summariesTotalDataCount = useSelector(summariesSelector.getTotalDataCount);
  const calculateSelectorIsPending = useSelector(calculateSelector.getIsPending);

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };
  const [sort, setSort] = useState(filters.sort);

  const { currentPage, rowsPerPage } = pagination;

  const handleChange = (_pagination, _filters, sorter) => {
    const sortingValue = sortByColumn(sorter);
    setSort(sortingValue);
  };

  useEffect(() => {
    const { startDate, finishDate } = filters;
    dispatch(
      Creators.getSummariesRequest({
        startDate,
        finishDate,
        sort,
        pageNo: currentPage,
        pageSize: rowsPerPage,
      }),
    );
  }, [dispatch, filters, currentPage, rowsPerPage, sort]);

  return (
    <Row>
      <Col span={24}>
        <AntTableV2
          title={t('REPORTS')}
          data={summariesSelectorData}
          columns={columns(t, filters)}
          onChange={handleChange}
          loading={summariesIsPending || calculateSelectorIsPending}
          rowKey={record => record.id}
          footer={(
            <Footer
              total={summariesTotalDataCount}
              currentPage={currentPage}
              rowsPerPage={rowsPerPage}
              pageSizeOptions={defaultOptions.pageSizeOptions}
              onPaginationChange={handlePaginationChange}
            />
          )}
        />
      </Col>
    </Row>
  );
}

export default Table;

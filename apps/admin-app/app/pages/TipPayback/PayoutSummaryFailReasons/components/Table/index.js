import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import Footer from '@shared/components/UI/AntTable/components/Footer';
import defaultOptions from '@shared/components/UI/AntTable/defaultOptions';
import { columns } from './config';
import { summaryFailReasonsSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { sortByColumn } from '@app/pages/TipPayback/utils';
import { CopyToClipboard } from '@shared/components/UI/CopyToClipboard';
import useStyles from '../styles';

function Table({ filters, pagination, setPagination }) {
  const { t } = useTranslation(['payoutSummaryPage', 'global']);
  const dispatch = useDispatch();
  const [sort, setSort] = useState('createdAt,desc');
  const { id } = useParams();
  const classes = useStyles();

  const summaryFailReasonsSelectorData = useSelector(summaryFailReasonsSelector.getData);
  const summaryFailReasonsIsPending = useSelector(summaryFailReasonsSelector.getIsPending);
  const summaryFailReasonsTotalDataCount = useSelector(summaryFailReasonsSelector.getTotalDataCount);

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  const { currentPage, rowsPerPage } = pagination;

  const handleChange = (_pagination, _filters, sorter) => {
    const sortingValue = sortByColumn(sorter);
    setSort(sortingValue);
  };

  const expandedRow = record => (
    <div className={classes.expandedTipColumn}>
      { record?.tips?.map(tip => (
        <div className={classes.margin8}>
          <CopyToClipboard key={tip} message={tip} />
        </div>
      ))}
    </div>
  );

  useEffect(() => {
    const { personName, person, taxNum } = filters;
    dispatch(
      Creators.getSummaryFailReasonsRequest({
        id,
        personName,
        sort,
        person,
        taxNum,
        pageNo: currentPage,
        pageSize: rowsPerPage,
      }),
    );
  }, [dispatch, filters, currentPage, rowsPerPage, id, sort]);

  return (
    <Row>
      <Col span={24}>
        <AntTableV2
          title={t('REPORTS')}
          data={summaryFailReasonsSelectorData}
          columns={columns(t)}
          onChange={handleChange}
          loading={summaryFailReasonsIsPending}
          rowKey={record => record.person}
          expandable={{ expandedRowRender: expandedRow }}
          footer={(
            <Footer
              total={summaryFailReasonsTotalDataCount}
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

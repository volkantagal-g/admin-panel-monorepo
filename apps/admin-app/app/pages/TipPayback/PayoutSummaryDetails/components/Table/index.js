import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useParams } from 'react-router-dom';

import Footer from '@shared/components/UI/AntTable/components/Footer';
import defaultOptions from '@shared/components/UI/AntTable/defaultOptions';
import { columns } from './config';
import { summaryDetailsSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { sortByColumn } from '@app/pages/TipPayback/utils';
import useStyles from '../styles';
import { CopyToClipboard } from '@shared/components/UI/CopyToClipboard';

function Table({ filters, pagination, setPagination }) {
  const { t } = useTranslation(['payoutSummaryPage', 'global']);
  const dispatch = useDispatch();
  const [sort, setSort] = useState('createdAt,desc');
  const classes = useStyles();

  const { id } = useParams();
  const summaryDetailsSelectorData = useSelector(summaryDetailsSelector.getData);
  const summaryDetailsIsPending = useSelector(summaryDetailsSelector.getIsPending);
  const summaryDetailsTotalDataCount = useSelector(summaryDetailsSelector.getTotalDataCount);

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
      <div className={classes.expandedCard}>
        { record?.tips?.map(tip => (
          <div className={classes.margin8}>
            <CopyToClipboard key={tip} message={tip} />
          </div>
        ))}
      </div>
    </div>
  );

  useEffect(() => {
    const { payoutStatus, personName, person, taxNum } = filters;
    dispatch(
      Creators.getSummaryDetailsRequest({
        id,
        payoutStatus,
        personName,
        person,
        sort,
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
          data={summaryDetailsSelectorData}
          columns={columns(t)}
          loading={summaryDetailsIsPending}
          onChange={handleChange}
          rowKey={record => record.id}
          expandable={{ expandedRowRender: expandedRow }}
          footer={(
            <Footer
              total={summaryDetailsTotalDataCount}
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

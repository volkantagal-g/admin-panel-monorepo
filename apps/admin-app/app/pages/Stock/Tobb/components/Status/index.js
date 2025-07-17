import { Progress, Row, Col, Button, Typography } from 'antd';
import { RedoOutlined, DownloadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Creators } from '../../redux/actions';
import {
  getTobbGibRequestSelector,
  exportTobbGibRequestSuccessRequestsSelector,
  exportTobbGibRequestFailedRequestsSelector,
  exportTobbGibRequestInvalidRequestsSelector,
} from '../../redux/selectors';

const Status = () => {
  const { t } = useTranslation(['tobb', 'global']);
  const dispatch = useDispatch();
  const ids = useSelector(getTobbGibRequestSelector.getIds);
  const data = useSelector(getTobbGibRequestSelector.getData);
  const failedRequests = useSelector(getTobbGibRequestSelector.getFailedRequests);
  const invalidRequests = useSelector(getTobbGibRequestSelector.getInvalidRequests);
  const processedRequests = useSelector(getTobbGibRequestSelector.getProcessedRequests);

  const isPending = useSelector(getTobbGibRequestSelector.getIsPending);
  const isSuccessPending = useSelector(exportTobbGibRequestSuccessRequestsSelector.getIsPending);
  const isFailedPending = useSelector(exportTobbGibRequestFailedRequestsSelector.getIsPending);
  const isInvalidPending = useSelector(exportTobbGibRequestInvalidRequestsSelector.getIsPending);
  const isLoading = isPending || isSuccessPending || isFailedPending || isInvalidPending;

  const totalIdsCount = ids.length;
  const totalProcessedIdsCount = processedRequests.length;
  const percent = Math.ceil((totalProcessedIdsCount / totalIdsCount) * 100);

  const handleSuccessRequestsExportCSV = () => {
    dispatch(Creators.exportTobbGibRequestSuccessRequestsRequest({ data }));
  };

  const handleInvalidRequestsExportCSV = () => {
    dispatch(Creators.exportTobbGibRequestInvalidRequestsRequest({ data: invalidRequests }));
  };

  const handleFailedRequestsExportCSV = () => {
    dispatch(Creators.exportTobbGibRequestFailedRequestsRequest({ data: failedRequests }));
  };

  const handleRetryFailedRequests = () => {
    dispatch(Creators.getTobbGibRequestRequest({ ids: failedRequests, isRetryFailedRequests: true }));
  };

  return (
    <div>
      <div className="mx-2 my-2 px-2">
        {totalIdsCount && percent !== 100
          ? (
            <div>
              {isLoading && <Typography>{t('PROCESSING')}</Typography>}
              <Progress percent={percent} status="active" strokeColor="#5D3EBD" strokeWidth={6} />
              <Typography>{`${totalProcessedIdsCount} / ${totalIdsCount}`}</Typography>
            </div>
          ) : null}
      </div>
      <Row gutter={8} justify="end" className="my-2">
        {failedRequests?.length ? (
          <Col>
            <Row gutter={8}>
              <Col>
                <Button icon={<RedoOutlined />} onClick={handleRetryFailedRequests} disabled={isLoading}>
                  {t('RETRY_FAILED_VKNS', { count: failedRequests.length })}
                </Button>
              </Col>
              <Col>
                <Button icon={<DownloadOutlined />} onClick={handleFailedRequestsExportCSV} disabled={isLoading}>
                  {t('EXPORT_FAILED_VKNS', { count: failedRequests.length })}
                </Button>
              </Col>
            </Row>
          </Col>
        ) : null}
        {invalidRequests?.length ? (
          <Col>
            <Button icon={<DownloadOutlined />} onClick={handleInvalidRequestsExportCSV} disabled={isLoading}>
              {t('EXPORT_INVALID_VKNS', { count: invalidRequests.length })}
            </Button>
          </Col>
        ) : null}
        <Col>
          {data?.length ? (
            <Col>
              <Button icon={<DownloadOutlined />} onClick={handleSuccessRequestsExportCSV} disabled={isLoading}>
                {t('EXPORT_SUCCEED_VKNS', { count: data.length })}
              </Button>
            </Col>
          ) : null}
        </Col>
      </Row>
    </div>
  );
};

export default Status;

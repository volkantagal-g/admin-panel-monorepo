import { memo, useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Table, Modal } from 'antd';

import { LoadingOutlined } from '@ant-design/icons';

import { Creators } from '@app/pages/CommunicationHistory/redux/actions';
import {
  resultsSelector,
  signedUrlSelector,
  getVisibilitySelector,
  signedUrlHtmlSelector,
} from '@app/pages/CommunicationHistory/redux/selectors';
import { generateColumns } from '@app/pages/CommunicationHistory/components/CommunicationHistoryTable/config';
import { mapPaginationForTable, manipulateFiltersBeforeSubmit, mapDataForTable }
  from '@app/pages/CommunicationHistory/components/CommunicationHistoryTable/utils';

const DashboardTable = ({ communicationType }) => {
  const { t } = useTranslation('communicationHistoryPage');
  const dispatch = useDispatch();
  const isPending = useSelector(resultsSelector.isPending);
  const { content, number, size, totalElements } = useSelector(resultsSelector.getResults);
  const signedUrl = useSelector(signedUrlSelector.getSignedUrl);
  const signedUrlIsPending = useSelector(signedUrlSelector.isPending);
  const getSignedUrlHtml = useSelector(signedUrlHtmlSelector.getSignedUrlHtml);
  const getSignedUrlHtmlIsPending = useSelector(signedUrlHtmlSelector.isPending);
  const visibility = useSelector(getVisibilitySelector.getData);

  const iframeRef = useRef();
  const [height, setHeight] = useState('0px');

  useEffect(() => {
    if (signedUrl) {
      dispatch(Creators.getSignedUrlHtmlRequest({ signedUrl }));
    }
  }, [signedUrl, dispatch]);

  const handleTableChange = (pagination, tableFilters, sorter, extra) => {
    const { currentDataSource } = extra;
    const tableConfigs = manipulateFiltersBeforeSubmit({ pagination, tableFilters, sorter, communicationType, currentDataSource });
    dispatch(Creators.setTableFilters({ filters: tableConfigs, communicationType }));
  };

  const onLoadIframe = () => {
    setHeight(`${iframeRef.current.contentWindow.document.body.scrollHeight}px`);
  };

  return (
    <>
      <Modal
        centered
        visible={visibility}
        onCancel={() => {
          dispatch(Creators.setModalVisibilityRequest({ visibility: false }));
        }}
        footer={null}
      >
        {signedUrlIsPending || getSignedUrlHtmlIsPending ?
          <LoadingOutlined className="w-100" spin />
          : (
            <iframe
              ref={iframeRef}
              onLoad={onLoadIframe}
              height={height}
              title="htmlFrame"
              srcDoc={getSignedUrlHtml}
              width="100%"
              frameBorder="0"
            />
          )}
      </Modal>

      <Table
        scroll={{ x: 'max-content' }}
        loading={isPending}
        onChange={handleTableChange}
        pagination={mapPaginationForTable({ totalElements, size, number })}
        dataSource={mapDataForTable(content, communicationType)}
        columns={generateColumns({ t, dispatch, communicationType })}
      />
    </>
  );
};

export default memo(DashboardTable);

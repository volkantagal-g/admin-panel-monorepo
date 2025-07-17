import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'antd';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getTableColumns } from '@app/pages/Config/Log/components/History/config';

import { Creators } from '@app/pages/Config/Log/redux/actions';
import { getConfigLogSelector } from '@app/pages/Config/Log/redux/selectors';
import useStyles from './styles';

const INIT_PAGINATION_CONFIG = { currentPage: 1, rowsPerPage: 50 };

const History = () => {
  const { t } = useTranslation('configPage');
  const dispatch = useDispatch();
  const { key } = useParams();
  const classes = useStyles();

  const [pagination, setPagination] = useState(INIT_PAGINATION_CONFIG);
  const configLog = useSelector(getConfigLogSelector.getData);
  const configLogIsPending = useSelector(getConfigLogSelector.getIsPending);

  const [isJsonModalVisible, setIsJsonModalVisible] = useState(false);
  const [jsonModalData, setJsonModalData] = useState({});

  useEffect(() => {
    dispatch(Creators.getConfigLogRequest({ key, limit: INIT_PAGINATION_CONFIG.rowsPerPage }));
  }, [dispatch, key]);

  const onClickShowJSONModal = config => {
    setJsonModalData({
      title: `${config.actionType} - ${config.createdAt} - ${config.createdBy}`,
      oldData: config?.oldValue || null,
      newData: config?.currentValue || null,
    });
    setIsJsonModalVisible(true);
  };

  const onPaginationChange = useCallback(({ currentPage, rowsPerPage }) => {
    dispatch(Creators.getConfigLogRequest({ key, limit: rowsPerPage, offset: (currentPage - 1) * rowsPerPage }));
    setPagination({ currentPage, rowsPerPage });
  }, [dispatch, key]);

  return (
    <>
      <AntTableV2
        data={configLog?.changeLogs}
        isPending={configLogIsPending}
        columns={getTableColumns({ t, onClickShowJSONModal })}
        pagination={pagination}
        onPaginationChange={onPaginationChange}
      />
      <Modal
        centered
        title={jsonModalData.title}
        wrapClassName={classes.modalWrapper}
        visible={isJsonModalVisible}
        onCancel={() => setIsJsonModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsJsonModalVisible(false)}>
            {t('button:CANCEL')}
          </Button>,
        ]}
      >
        <table className={classes.diffTable}>
          <thead>
            <tr>
              <th>{t('OLD_VALUE')}</th>
              <th>{t('NEW_VALUE')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <pre>{JSON.stringify(jsonModalData.oldData, null, 2)}</pre>
              </td>
              <td>
                <pre>{JSON.stringify(jsonModalData.newData, null, 2)}</pre>
              </td>
            </tr>
          </tbody>
        </table>
      </Modal>
    </>
  );
};

export default History;

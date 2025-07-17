import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'antd';

import { useParams } from 'react-router-dom';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getTableColumns } from '@app/pages/CourierGamification/components/TaskHistory/config';

import { Creators } from '@app/pages/CourierGamification/components/TaskHistory/redux/actions';
import { getTaskHistorySelector } from '@app/pages/CourierGamification/components/TaskHistory/redux/selector';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInitAndDestroyPage, useToggle } from '@shared/hooks';
import { REDUX_KEY } from '@shared/shared/constants';

import saga from './redux/saga';
import reducer from './redux/reducer';
import useStyles from './styles';
import { getLangKey } from '@shared/i18n';
import { DATE_TEXT_OPTIONS } from '@app/pages/CourierGamification/constant';

const INIT_PAGINATION_TASK_HISTORY = { currentPage: 1, rowsPerPage: 50 };
const reduxKey = REDUX_KEY.COURIER_GAMIFICATION_TASK.HISTORY;

const TaskHistory = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const taskHistory = useSelector(getTaskHistorySelector.getData);
  const taskHistoryIsPending = useSelector(getTaskHistorySelector.getIsPending);
  const { id } = useParams();
  const { t } = useTranslation('courierGamificationPage');
  const classes = useStyles();

  const [pagination, setPagination] = useState(INIT_PAGINATION_TASK_HISTORY);

  const [isJsonModalVisible, setIsJsonModalVisible] = useToggle();
  const [jsonModalData, setJsonModalData] = useState({});

  useEffect(() => {
    dispatch(
      Creators.getTaskHistoryRequest(
        {
          id,
          limit: INIT_PAGINATION_TASK_HISTORY.rowsPerPage,
          offset: (INIT_PAGINATION_TASK_HISTORY.currentPage - 1) * INIT_PAGINATION_TASK_HISTORY.rowsPerPage,
        },
      ),
    );
  }, [dispatch, id]);

  const onClickShowJSONModal = history => {
    setJsonModalData({
      newData: JSON.parse(history?.newValue) || null,
      oldData: history?.oldValue && history.oldValue !== '' ? JSON.parse(history.oldValue) : null,
      title: `${t(`TASK_HISTORY.ACTION_TYPES.${history.actionType?.toUpperCase()}`)} - \
              ${new Date(history.createdAt).toLocaleString(getLangKey(), DATE_TEXT_OPTIONS)} - \
              ${history.createdBy}`,
    });
    setIsJsonModalVisible(true);
  };

  const onPaginationChange = useCallback(({ currentPage, rowsPerPage }) => {
    dispatch(Creators.getTaskHistoryRequest({ id, limit: rowsPerPage, offset: (currentPage - 1) * rowsPerPage }));
    setPagination({ currentPage, rowsPerPage });
  }, [dispatch, id]);

  return (
    <>
      <AntTableV2
        title={t('courierGamificationPage:TASK_HISTORY.TITLE')}
        data={taskHistory}
        isPending={taskHistoryIsPending}
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

export default TaskHistory;

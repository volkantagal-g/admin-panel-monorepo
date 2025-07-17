import { Modal, Button } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useParams } from 'react-router-dom';

import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInjectReducer } from '@shared/utils/injectReducer';

import { getLimitAndOffset, convertLimitOffsetToRowsPerPageAndCurrentPage } from '@shared/utils/common';

import AntCard from '@shared/components/UI/AntCard';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import ChangeLogsCardTitle from './ChangeLogsCardTitle';

import saga from '../../redux/saga';
import reducer from '../../redux/reducer';
import { Creators } from '../../redux/actions';
import { CHANGE_LOG_TYPE_ENUM } from '../../../constants';
import {
  companyChangeLogsSelector,
  companyCredentialsChangeLogsSelector,
  changeLogTableUISelector,
} from '../../redux/selectors';
// eslint-disable-next-line import/no-unresolved
import { getTableColumns } from './config';
import useStyles from './styles';

const reduxKey = REDUX_KEY.THIRD_PARTY_COMPANY.DETAIL;

interface IChangeLogJSONViewData {
  title: string;
  oldData: DynamicObjectType;
  newData: DynamicObjectType;
}
interface IPageUrlParams {
  id: string | undefined;
}

const ThirdPartyCompanyDetailChangeLogs: FC = () => {
  const [t] = useTranslation(['thirdPartyCompany', 'global', 'button']);
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  const classes = useStyles();

  const [isChangeLogJSONViewVisible, setIsChangeLogJSONViewVisible] = useState(false);
  const [changeLogJSONViewData, setChangeLogJSONViewData] = useState<IChangeLogJSONViewData>({ title: '', oldData: {}, newData: {} });

  const { id: companyId } = useParams<IPageUrlParams>();

  const currentChangeLogType = useSelector(changeLogTableUISelector.getCurrentChangeLogType);
  const currentPagination = useSelector(changeLogTableUISelector.getCurrentPagination);
  const antdTablePagination = convertLimitOffsetToRowsPerPageAndCurrentPage(currentPagination);
  const companyChangeLogs = useSelector(companyChangeLogsSelector.getData);
  const isCompanyChangeLogsPending = useSelector(companyChangeLogsSelector.getIsPending);
  const companyCrendentialsChangeLogs = useSelector(companyCredentialsChangeLogsSelector.getData);
  const isCompanyCredentialsChangeLogsPending = useSelector(companyCredentialsChangeLogsSelector.getIsPending);

  useEffect(() => {
    if (companyId) {
      dispatch(Creators.getCompanyChangeLogsRequest({ companyId }));
    }
  }, [companyId, dispatch]);

  const displayedData = currentChangeLogType === CHANGE_LOG_TYPE_ENUM.COMPANY ? companyChangeLogs : companyCrendentialsChangeLogs;
  const isPending = currentChangeLogType === CHANGE_LOG_TYPE_ENUM.COMPANY ? isCompanyChangeLogsPending : isCompanyCredentialsChangeLogsPending;

  const handleClickShowJSONModal = (changeLog: DynamicObjectType) => {
    setChangeLogJSONViewData({
      title: `${moment.utc(changeLog?.createdAt).toISOString()} - ${changeLog?.createdBy}`,
      oldData: changeLog?.oldValue || null,
      newData: changeLog?.currentValue || null,
    });
    setIsChangeLogJSONViewVisible(true);
  };

  const handlePaginationChange = ({ currentPage, rowsPerPage }: { currentPage: number, rowsPerPage: number }) => {
    dispatch(Creators.companyChangeLogTablePaginationChanged(getLimitAndOffset({ currentPage, rowsPerPage })));
  };

  return (
    <>
      <AntCard
        title={<ChangeLogsCardTitle />}
      >
        <AntTableV2
          data={displayedData}
          columns={getTableColumns({ t, onClickShowJSONModal: handleClickShowJSONModal })}
          loading={isPending}
          pagination={antdTablePagination}
          onPaginationChange={handlePaginationChange}
        />
      </AntCard>
      <Modal
        centered
        title={changeLogJSONViewData.title}
        wrapClassName={classes.modalWrapper}
        visible={isChangeLogJSONViewVisible}
        onCancel={() => setIsChangeLogJSONViewVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsChangeLogJSONViewVisible(false)}>
            {t('button:CANCEL')}
          </Button>,
        ]}
      >
        <table className={classes.diffTable}>
          <thead>
            <tr>
              <th>{t('thirdPartyCompany:OLD_VALUE')}</th>
              <th>{t('thirdPartyCompany:NEW_VALUE')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <pre>{JSON.stringify(changeLogJSONViewData.oldData, null, 2)}</pre>
              </td>
              <td>
                <pre>{JSON.stringify(changeLogJSONViewData.newData, null, 2)}</pre>
              </td>
            </tr>
          </tbody>
        </table>

      </Modal>
    </>
  );
};

export default ThirdPartyCompanyDetailChangeLogs;

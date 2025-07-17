import { memo, useEffect } from 'react';
import { Collapse, Button, Tooltip, Spin, Popconfirm } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Creators } from '@app/pages/Client/Detail/redux/actions';
import { clientSelector, getirJobsSelector } from '@app/pages/Client/Detail/redux/selectors';
import useStyles from './styles';

import permKey from '@shared/shared/permKey.json';
import RedirectButtonV2 from '@shared/components/UI/RedirectButtonV2';

const { Panel } = Collapse;

const COLLAPSE_KEY_PREFIX = 'CLIENT_DETAIL_GETIR_FINANCE_TABLE_COMPONENT_COLLAPSE_';

const TooltipConfirmButton = ({
  clientStatus,
  okText,
  cancelText,
  tipTitle,
  confirmTitle,
  onConfirm,
  deleteText,
  confirmDescription,
  translation,
}) => {
  const classes = useStyles();

  if (!clientStatus.isExist) {
    return (
      <Tooltip placement="top" title={tipTitle}>
        <span className={classes.closedStatus}>{translation('GETIR_JOBS.CLOSED')}</span>
        {clientStatus.deletedBy && (
          <>
            <span className={classes.closedStatus}>{translation('GETIR_JOBS.DELETED_BY')}: </span>
            <RedirectButtonV2
              text={clientStatus.deletedBy.name}
              to={`/user/detail/${clientStatus.deletedBy.id}`}
              permKey={permKey.PAGE_CLIENT_DETAIL}
              target="_blank"
              data-testid="client-detail-link"
              size="small"
            />
          </>
        )}
      </Tooltip>
    );
  }

  return (
    <Popconfirm
      onConfirm={onConfirm}
      okText={okText}
      cancelText={cancelText}
      title={(
        <>
          <b>{confirmTitle}</b>
          <div>{confirmDescription}</div>
        </>
      )}
    >
      <span className={classes.activeStatus}>{translation('GETIR_JOBS.ACTIVE')}</span>
      <Button
        type="primary"
        size="small"
        danger
        disabled={!clientStatus.isExist}
      >
        {deleteText}
      </Button>
    </Popconfirm>
  );
};

const GetirJobs = () => {
  const { t } = useTranslation('clientDetail');

  const { _id: clientId } = useSelector(clientSelector.getClient) || {};
  const clientStatus = useSelector(getirJobsSelector.getClient) || {};
  const isPending = useSelector(getirJobsSelector.getIsPending);
  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    if (clientId) {
      dispatch(Creators.getClientStatusGetirJobsRequest({ clientId }));
    }
  }, [dispatch, clientId]);

  const deleteGetirJobsClient = () => {
    dispatch(Creators.deleteClientGetirJobsRequest({
      clientId,
      onSuccess: () => {
        dispatch(Creators.getClientStatusGetirJobsRequest({ clientId }));
      },
    }));
  };

  return (
    <Spin spinning={!clientId || isPending}>
      <Collapse activeKey={`${COLLAPSE_KEY_PREFIX}1`}>
        <Panel
          showArrow={false}
          header={t('GETIR_JOBS.TITLE')}
          className={classes.noPanelPadding}
          key={`${COLLAPSE_KEY_PREFIX}1`}
          extra={(
            <TooltipConfirmButton
              onConfirm={deleteGetirJobsClient}
              okText={t('button:YES')}
              cancelText={t('button:CANCEL')}
              confirmTitle={t('GETIR_JOBS.CONFIRM_TITLE')}
              confirmDescription={t('GETIR_JOBS.CONFIRM_DESCRIPTION')}
              clientStatus={clientStatus}
              deleteText={t('GETIR_JOBS.DELETE_BUTTON')}
              tipTitle={t('GETIR_JOBS.DELETE_TIP')}
              translation={t}
            />
          )}
        />
      </Collapse>
    </Spin>
  );
};

export default memo(GetirJobs);

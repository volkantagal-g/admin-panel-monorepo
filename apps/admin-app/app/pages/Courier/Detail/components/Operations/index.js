import { Button, Card, Input, Space, Modal, Switch, Typography } from 'antd';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from 'antd/es/tooltip';
import moment from 'moment';

import AnalyticsService from '@shared/services/analytics';
import {
  courierOperationSelector,
  courierSelector,
  getResetCourierPasswordSelector,
  setGeofenceByCourierIdSelector,
} from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import useStyles from './styles';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { isNullOrEmpty } from '@shared/utils/common';
import CourierFeedback from './courierFeedback';
import { getLangKey } from '@shared/i18n';
import { COURIER_DETAIL_EVENTS } from '../../mixPanelEvents';

function Operations({ data }) {
  const { confirm } = Modal;
  const { Text } = Typography;
  const language = getLangKey();
  const { picURL, name, _id, mduDiagnosticLogInfo, isGeoFenceDisabled = false } = data;
  const classes = useStyles();
  const dispatch = useDispatch();
  const isPending = useSelector(courierOperationSelector.getIsPending);
  const courierDetail = useSelector(courierSelector.getData);
  const { password } = useSelector(getResetCourierPasswordSelector.getData) || '';
  const isGeofenceRequestFailed = useSelector(setGeofenceByCourierIdSelector.getError);
  const geoFenceData = useSelector(setGeofenceByCourierIdSelector.getData);
  const [pushMessage, setPushMessage] = useState('');
  const { Can, canAccess } = usePermission();
  const [isForceModalOpen, setIsForceModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isGeofenceActive, setIsGeofenceActive] = useState(!isGeoFenceDisabled);
  const hasFinanceEmployeeRole = canAccess(permKey.PAGE_COURIER_DETAIL_COMPONENT_GETIR_FINANCE_EMPLOYEE);

  const showModal = () => {
    setIsForceModalOpen(true);
  };

  const handleOk = () => {
    setIsForceModalOpen(false);
    dispatch(Creators.forceLogoutRequest({ courierId: _id }));
  };

  const handleCancel = () => {
    setIsForceModalOpen(false);
  };

  const { t } = useTranslation(['courierPage']);

  const handlePushMessage = () => {
    dispatch(
      Creators.sendNotificationMessageRequest({
        id: _id,
        title: t('NOTIFICATION_TITLE'),
        message: pushMessage,
      }),
    );
    setPushMessage('');
  };

  const handleFeedback = () => {
    setShowFeedback(true);
  };

  const closeFeedback = () => {
    setShowFeedback(false);
  };

  const handleCourierLogs = () => {
    dispatch(Creators.getCourierLogsRequest({ courierId: _id }));
  };

  useEffect(() => {
    dispatch(
      Creators.getCommonFeedbackRequest({
        filterOptions: { courierName: courierDetail?.name },
        language,
        limit: 10,
        pageNumber: 1,
      }),
    );
  }, [dispatch, courierDetail?.name, language]);

  useEffect(() => {
    if (password) {
      setIsResetPasswordModalOpen(true);
    }
  }, [password]);

  const checkExpireDate = () => {
    if (mduDiagnosticLogInfo?.expireDate?.length) {
      return moment().isAfter(mduDiagnosticLogInfo.expireDate);
    }
    return true;
  };

  const showConfirm = () => {
    confirm({
      title: t('RESET_PASSWORD_CONFIRM_MSG'),
      onOk() {
        dispatch(Creators.resetCourierPasswordRequest({ courierId: _id }));
        AnalyticsService.track(COURIER_DETAIL_EVENTS.BUTTON_CLICK, { button: COURIER_DETAIL_EVENTS.BUTTON.RESET_PASSWORD });
      },
    });
  };

  const handleGeofenceSwitchChange = checked => {
    setIsGeofenceActive(checked);

    dispatch(Creators.setGeofenceByCourierIdRequest({ courierId: _id, isGeoFenceDisabled: !checked }));
  };

  useEffect(() => {
    if (isGeofenceRequestFailed || !geoFenceData?.success) {
      setIsGeofenceActive(!isGeoFenceDisabled);
    }
  }, [isGeofenceRequestFailed, isGeoFenceDisabled, geoFenceData]);

  const isDownloadButtonDisabled = isPending || checkExpireDate();

  return (
    <>
      <Card>
        <img src={picURL} alt={name} className={classes.image} />
      </Card>

      { !hasFinanceEmployeeRole && (
        <>
          <Can permKey={permKey.PAGE_COURIER_DETAIL_COMPONENT_SET_GEOFENCE}>
            <div className={classes.switchWrapper}>
              <Text>{t('GEOFENCE')}: </Text>
              <Switch
                className={classes.switch}
                checked={isGeofenceActive}
                onChange={handleGeofenceSwitchChange}
              />
            </div>
          </Can>
          <Space direction="vertical" className={classes.buttonWrapper}>
            <Can permKey={permKey.PAGE_COURIER_DETAIL_RESTART_MDU}>
              <Button
                disabled={isPending}
                block
                type="default"
                onClick={() => dispatch(Creators.restartCourierMduRequest({ id: _id }))}
              >
                {t('RESTART')}
              </Button>
            </Can>
            <Can permKey={permKey.PAGE_COURIER_DETAIL_NOTIFICATION_MDU}>
              <Button
                disabled={isPending}
                block
                type="default"
                onClick={() => dispatch(Creators.sendPullAppsNotificationRequest({ id: _id }))}
              >
                {t('PULL_APPS')}
              </Button>
            </Can>
            <Button
              disabled={isPending}
              block
              type="default"
              onClick={() => handleFeedback()}
            >
              {t('FEEDBACKS')}
            </Button>
            <CourierFeedback
              courierName={courierDetail?.name}
              closeModal={closeFeedback}
              visible={showFeedback}
            />
            <Can permKey={permKey.PAGE_COURIER_DETAIL_NOTIFICATION_MDU}>
              <Button
                disabled={isPending}
                block
                type="default"
                onClick={() => dispatch(Creators.sendCheckServicesNotificationRequest({ id: _id }))}
              >
                {t('CHECK_SERVICES')}
              </Button>
            </Can>
            <Can permKey={permKey.PAGE_COURIER_DETAIL_NOTIFICATION_MDU}>
              <Button
                disabled={isPending}
                block
                type="default"
                onClick={() => dispatch(Creators.sendStartServicesNotificationRequest({ id: _id }))}
              >
                {t('START_SERVICES')}
              </Button>
            </Can>
            <Can permKey={permKey.PAGE_COURIER_DETAIL_STATUS}>
              <Button
                disabled={isPending}
                block
                type="default"
                onClick={() => dispatch(Creators.removeCourierFromSystemRequest({ id: _id }))}
              >
                {t('REMOVE_FROM_SYSTEM')}
              </Button>
            </Can>
            <Can permKey={permKey.PAGE_COURIER_DETAIL_COMPONENT_RESET_PASSWORD}>
              <Button
                block
                type="default"
                onClick={showConfirm}
              >
                {t('RESET_PASSWORD')}
              </Button>
              <Modal
                title={t('RESET_PASSWORD_SUCCESS_TITLE')}
                visible={isResetPasswordModalOpen}
                onCancel={() => setIsResetPasswordModalOpen(false)}
                footer={[
                  <Button key="ok" type="primary" onClick={() => setIsResetPasswordModalOpen(false)}>
                    {t('OK')}
                  </Button>,
                ]}
              >
                <p>{t('RESET_PASSWORD_SUCCESS_MSG_FIRST_PART')} <b>{password}</b> {t('RESET_PASSWORD_SUCCESS_MSG_SECOND_PART')}</p>
              </Modal>
            </Can>
            <>
              <Button disabled={isPending} block type="default" onClick={showModal}>
                {t('FORCE_LOGOUT')}
              </Button>
              <Modal
                title={t('CONFIRMATION')}
                visible={isForceModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <p>{t('FORCE_LOGOUT_MESSAGE')}</p>
              </Modal>
            </>
            <Can permKey={permKey.PAGE_COURIER_DETAIL_COMPONENT_MDU_DIAGNOSTIC_LOGS}>
              <Tooltip placement="left" title={t('COLLECT_COURIER_LOGS_TOOLTIP')}>
                <Button
                  disabled={isPending}
                  block
                  type="default"
                  onClick={handleCourierLogs}
                >
                  {t('COLLECT_COURIER_LOGS')}
                </Button>
              </Tooltip>
            </Can>
            <Can permKey={permKey.PAGE_COURIER_DETAIL_COMPONENT_MDU_DIAGNOSTIC_LOGS}>
              <Tooltip
                placement="left"
                title={t('DOWNLOAD_LOG_TOOLTIP', {
                  date: mduDiagnosticLogInfo?.expireDate ? moment(mduDiagnosticLogInfo.expireDate).format('DD-MM-YYYY')
                    : t('EMPTY_LOG_INFORMATION'),
                })}
              >
                <Button
                  disabled={isDownloadButtonDisabled}
                  block
                  type="default"
                  onClick={() => window.open(mduDiagnosticLogInfo?.url, '_blank')}
                >
                  {t('DOWNLOAD_LOG')}
                </Button>
              </Tooltip>
            </Can>
          </Space>
          <Can permKey={permKey.PAGE_COURIER_DETAIL_NOTIFICATION_MDU}>
            <Input.Group compact>
              <Input
                className={classes.pushMessageInput}
                placeholder={t('WRITE_A_PUSH_MESSAGE')}
                value={pushMessage}
                onInput={e => setPushMessage(e.currentTarget.value)}
              />
              <Button
                disabled={isPending || isNullOrEmpty(pushMessage)}
                className={classes.pushButton}
                type="primary"
                onClick={handlePushMessage}
              >
                {t('PUSH')}
              </Button>
            </Input.Group>
          </Can>
        </>
      )}
    </>
  );
}

export default Operations;

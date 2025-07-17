import { useTranslation } from 'react-i18next';
import { Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

type PropsTypes = {
  isOnLeave: boolean;
  hasNoShowExcuse: boolean;
  employeeLeaveDetails?: {
    type: number;
    note: string;
  };
  employeeNoShowExcuseDetails?: {
    reason: number;
    note: string;
  };
};

const RemoteReasonType = (
  {
    isOnLeave,
    hasNoShowExcuse,
    employeeLeaveDetails,
    employeeNoShowExcuseDetails,
  }: PropsTypes,
): JSX.Element => {
  const { t } = useTranslation(['officeAttendanceTracking', 'employeePage', 'global']);

  if (isOnLeave) {
    return (
      employeeLeaveDetails?.type ? (
        <Tooltip
          title={(
            <div>
              <div>{t('global:TYPE')}: {t(`employeePage:PERMIT_TYPES.${employeeLeaveDetails?.type}`)}</div>
              {
                employeeLeaveDetails?.note && (
                <div>{t('global:NOTE')}: {employeeLeaveDetails?.note}</div>
                )
              }
            </div>
          )}
        >
          <InfoCircleOutlined />
        </Tooltip>
      ) : <div />
    );
  }

  if (hasNoShowExcuse) {
    return (
      employeeNoShowExcuseDetails?.reason ? (
        <Tooltip
          title={(
            <div>
              <div>{t('global:REASON')}: {t(`employeePage:PERMIT_REASONS.${employeeNoShowExcuseDetails?.reason}`)}</div>
              {
                employeeNoShowExcuseDetails?.note && (
                <div>{t('global:NOTE')}: {employeeNoShowExcuseDetails?.note}</div>
                )
              }
            </div>
          )}
        >
          <InfoCircleOutlined />
        </Tooltip>
      ) : <div />
    );
  }

  return <> </>;
};

RemoteReasonType.defaultProps = {
  employeeLeaveDetails: {},
  employeeNoShowExcuseDetails: {},
};

export default RemoteReasonType;

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col, Tooltip } from 'antd';

import { isScreenSizeLarge } from '@shared/utils/common';

import useStyles from './styles';
import { ValuesType as CommonFiltersValuesType } from '../CommonFilters/formHelper';
import { filtersSelector } from '../../redux/selectors';
import {
  getAttendanceRatioText,
  getAverageDurationSpentAtTheOfficeText,
  getCurrentRatioText,
  getNoShowRatioText,
  getOnSiteTooltipTexts,
} from '../../utils';

type PropsTypes = {
  isSingleDay?: boolean;
  isToday?: boolean;
  data?: {
    onSite: {
      atAnotherOffice: number,
      atInvitedOffice: number,
      invitedAnotherOffice: number,
      onSiteButNotInvited: number,
      onSiteButCheckedInIrregularOffice: number,
      total: number,
    },
    employeesAtTheOfficeCount: number;
    totalOfficeDurationAsSeconds: number;
    totalInvitedOfficeDurationAsSeconds: number;
    uniqueEmployeeVisitingDayCount: number;
    invited: number;
    noShow: number;
    noShowExcuse: number;
    onLeave: number;
  }
};

const EmployeeOfficeAttendanceTrackingDashboardStats = ({
  isSingleDay,
  isToday,
  data,
}: PropsTypes) => {
  const { t } = useTranslation(['officeAttendanceTracking']);
  const isLargeScreen = isScreenSizeLarge();
  const classes = useStyles({ theme: { isLargeScreen } });
  const commonFilters: CommonFiltersValuesType = useSelector(filtersSelector.getCommonFilters);

  const averageDurationSpentAtTheOfficeText: string = getAverageDurationSpentAtTheOfficeText({
    invited: data?.invited ?? 0,
    onLeave: data?.onLeave ?? 0,
    noShowExcuse: data?.noShowExcuse ?? 0,
    noShow: data?.noShow ?? 0,
    totalInvitedOfficeDurationAsSeconds: data?.totalInvitedOfficeDurationAsSeconds ?? 0,
  });

  const attendanceRatioText: string = getAttendanceRatioText({
    invited: data?.invited ?? 0,
    onLeave: data?.onLeave ?? 0,
    noShowExcuse: data?.noShowExcuse ?? 0,
    noShow: data?.noShow ?? 0,
  });

  const currentRatioText: string = getCurrentRatioText({
    invited: data?.invited ?? 0,
    employeesAtTheOfficeCount: data?.employeesAtTheOfficeCount ?? 0,
    onLeave: data?.onLeave ?? 0,
    noShowExcuse: data?.noShowExcuse ?? 0,
  });

  const noShowRatioText: string = getNoShowRatioText({
    invited: data?.invited ?? 0,
    onLeave: data?.onLeave ?? 0,
    noShow: data?.noShow ?? 0,
    noShowExcuse: data?.noShowExcuse ?? 0,
  });

  const onSiteTooltipTexts = getOnSiteTooltipTexts({
    officeFilterExists: !!(commonFilters?.office),
    atInvitedOffice: data?.onSite?.atInvitedOffice,
    atAnotherOffice: data?.onSite?.atAnotherOffice,
    invitedAnotherOffice: data?.onSite?.invitedAnotherOffice,
    onSiteButNotInvited: data?.onSite?.onSiteButNotInvited,
    total: data?.onSite?.total,
  });

  return (
    <Row gutter={[6, 6]} className="w-100 justify-content-around">
      <Col xs={12} sm={12} md={6} lg={4}>
        <div className={classes.customCard}>
          <h5>{t('officeAttendanceTracking:INVITED')}</h5>
          <Tooltip
            placement="bottom"
            title={
              t(
                'officeAttendanceTracking:TOOLTIP.INVITED',
                { invited: data?.invited || 0, onLeave: data?.onLeave || 0, noShowExcuse: data?.noShowExcuse || 0 },
              )
            }
          >
            <p>{((data?.invited || 0) - (data?.onLeave || 0) - (data?.noShowExcuse || 0)) || 0}</p>
          </Tooltip>
        </div>
      </Col>
      <Col className="gutter-row" xs={12} sm={12} md={6} lg={4}>
        <div className={classes.customCard}>
          <h5>{t('officeAttendanceTracking:ON_SITE')}</h5>
          <Tooltip
            placement="bottom"
            title={(
              <>
                {
                  onSiteTooltipTexts?.atInvitedOfficeText ? (
                    <p style={{ margin: 0 }}>
                      {onSiteTooltipTexts?.atInvitedOfficeText}
                    </p>
                  ) : undefined
                }
                {
                  onSiteTooltipTexts?.atAnotherOfficeText ? (
                    <p style={{ margin: 0 }}>
                      {onSiteTooltipTexts?.atAnotherOfficeText}
                    </p>
                  ) : undefined
                }
                {
                  onSiteTooltipTexts?.invitedAnotherOfficeText ? (
                    <p style={{ margin: 0 }}>
                      {onSiteTooltipTexts?.invitedAnotherOfficeText}
                    </p>
                  ) : undefined
                }
                {
                  onSiteTooltipTexts?.onSiteButNotInvitedText ? (
                    <p style={{ margin: 0 }}>
                      {onSiteTooltipTexts?.onSiteButNotInvitedText}
                    </p>
                  ) : undefined
                }
                {
                  onSiteTooltipTexts?.total ? (
                    <p style={{ margin: 0 }}>
                      {onSiteTooltipTexts?.total}
                    </p>
                  ) : undefined
                }
              </>
            )}
          >
            <p>
              {((data?.invited || 0) - (data?.onLeave || 0) - (data?.noShowExcuse || 0) - (data?.noShow || 0)) || 0}
              <small>({attendanceRatioText ?? 0})</small>
            </p>
          </Tooltip>
        </div>
      </Col>
      <Col className="gutter-row" xs={12} sm={12} md={6} lg={4}>
        <div className={classes.customCard}>
          <h5>{t('officeAttendanceTracking:NO_SHOW')}</h5>
          <p>{data?.noShow || 0} <small>({noShowRatioText})</small></p>
        </div>
      </Col>
      {
        isSingleDay && isToday && (
          <Col className="gutter-row" xs={12} sm={12} md={6} lg={4}>
            <div className={classes.customCard}>
              <h5>{t('officeAttendanceTracking:STATS.EMPLOYEES_CURRENTLY_AT_THE_OFFICE_COUNT')}</h5>
              <p>{data?.employeesAtTheOfficeCount} <small>({currentRatioText})</small></p>
            </div>
          </Col>
        )
      }
      <Col className="gutter-row" xs={12} sm={12} md={6} lg={4}>
        <div className={classes.customCard}>
          <h5>{t('officeAttendanceTracking:ON_LEAVE')}</h5>
          <Tooltip title={t('officeAttendanceTracking:TOOLTIP.ONLY_INVITED_AND_ON_LEAVE_PEOPLE_COUNTED')}>
            <p>{data?.onLeave || 0}</p>
          </Tooltip>
        </div>
      </Col>
      <Col className="gutter-row" xs={12} sm={12} md={6} lg={4}>
        <div className={classes.customCard}>
          <h5>{t('officeAttendanceTracking:STATS.AVERAGE_DURATION_SPENT_AT_THE_OFFICE')}</h5>
          <Tooltip
            placement="bottom"
            title={t('officeAttendanceTracking:TOOLTIP.AVERAGE_DURATION')}
          >
            <p>{averageDurationSpentAtTheOfficeText}</p>
          </Tooltip>
        </div>
      </Col>
    </Row>
  );
};

EmployeeOfficeAttendanceTrackingDashboardStats.defaultProps = {
  isSingleDay: false,
  isToday: false,
  data: {},
};

export default EmployeeOfficeAttendanceTrackingDashboardStats;

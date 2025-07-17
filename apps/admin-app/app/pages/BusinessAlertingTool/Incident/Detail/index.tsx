import { useEffect, useState } from 'react';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'antd';

import { useInitAndDestroyPage, usePageViewAnalytics, usePermission } from '@shared/hooks';
import injectReducer from '@shared/utils/injectReducer';
import injectSaga from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';
import permKey from '@shared/shared/permKey.json';
import RedirectButtonV2 from '@shared/components/UI/RedirectButtonV2';
import { getUserRolesSelector } from '@shared/redux/selectors/common';
import { getUser } from '@shared/redux/selectors/auth';
import { Creators as CommonCreators } from '@shared/redux/actions/common';

import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';

import BATHeader from '../../components/BATHeader';
import BATCard from '../../components/BATCard';

import useStyles from './styles';
import { incidentSelector } from './redux/selectors';
import IncidentInfoBox from './components/IncidentInfoBox';
import DetailInfoBox from './components/DetailInfoBox';
import { hasPermission } from '../../utils';

const reduxKey = REDUX_KEY.BUSINESS_ALERTING_TOOL.INCIDENT.DETAIL;

function BATIncidentDetailPage() {
  const classes = useStyles();
  const { t } = useTranslation(['batIncidentDetailPage']);
  const dispatch = useDispatch();
  const incident = useSelector(incidentSelector.getData);
  const { canAccess } = usePermission();

  usePageViewAnalytics({
    name: ROUTE.BUSINESS_ALERTING_TOOL_INCIDENT_DETAIL.name,
    squad: ROUTE.BUSINESS_ALERTING_TOOL_INCIDENT_DETAIL.squad,
  });
  useInitAndDestroyPage({ dispatch, Creators });

  const userRoles = useSelector(getUserRolesSelector.getData);
  const user = getUser();
  const [canUserViewMetric, setCanUserViewMetric] = useState<boolean>(false);
  // If users are not in the permitted roles,
  // they can still see the insights if they have the permission to view breakdown
  const hasAccessToViewMetric: boolean = canAccess(permKey.PAGE_BUSINESS_ALERTING_TOOL_INCIDENT_DETAIL_COMPONENT_VIEW_PERMISSION_FOR_METRIC);

  useEffect(() => {
    if (user._id) {
      dispatch(CommonCreators.getUserRolesRequest({ userId: user._id }));
    }
  }, [dispatch, user._id]);

  useEffect(() => {
    if (!userRoles.length) return;

    const userDetailInsightPermission = hasPermission({
      createdBy: incident?.alertCondition?.createdBy,
      userId: user._id,
      permittedRoles: incident?.alertCondition?.permittedRoles,
      userRoles: userRoles.map((userRole: any) => userRole._id),
    });

    setCanUserViewMetric(userDetailInsightPermission || hasAccessToViewMetric);
  }, [hasAccessToViewMetric, incident, user, userRoles]);

  return (
    <>
      <PageTitleHeader title={t('batIncidentDetailPage:PAGE_TITLE.INCIDENT.DETAIL')} />
      <div className={classes.pageContainer}>
        <BATHeader title={t('batIncidentDetailPage:PAGE_TITLE.INCIDENT.DETAIL')}>
          <RedirectButtonV2
            text={t('batIncidentDetailPage:ACTIONS.VISIT_ALERT_CONDITION_DETAIL')}
            to={`/businessAlertingTool/alertCondition/detail/${incident?.alertCondition?._id}`}
            permKey={permKey.PAGE_BUSINESS_ALERTING_TOOL_ALERT_CONDITION_DETAIL}
            target="_blank"
            type="primary"
            iconComponent
          />
        </BATHeader>
        <Row gutter={[24, 24]}>
          <Col xs={24}>
            <BATCard>
              <IncidentInfoBox />
            </BATCard>
          </Col>
          {canUserViewMetric && <DetailInfoBox />}
        </Row>
      </div>
    </>
  );
}

const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(BATIncidentDetailPage);

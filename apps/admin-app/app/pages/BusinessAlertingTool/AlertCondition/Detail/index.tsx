import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Col, Row, Switch } from 'antd';

import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { ROUTE } from '@app/routes';
import { REDUX_KEY } from '@shared/shared/constants';

// Redux
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { getAlertConditionDetailSelector } from './redux/selectors';

// Common Components
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

// Form Components
import UpdateMetaDataForm from './components/UpdateMetaDataForm';
import UpdateMetricGroupForm from './components/UpdateMetricGroupForm';
import UpdateQueryForm from './components/UpdateQueryForm';
import UpdateRunningHoursForm from './components/UpdateRunningHoursForm';
import UpdateNotificationsForm from './components/UpdateNotificationsForm';
import UpdatePermittedRolesForm from './components/UpdatePermittedRolesForm';

import useStyles from './styles';
import useUserEditPermission from '../../hooks';

const reduxKey = REDUX_KEY.BUSINESS_ALERTING_TOOL.ALERT_CONDITION.DETAIL;

type QueryParams = {
  alertConditionId: string;
}

function BATAlertConditionDetailPage() {
  const classes = useStyles();
  const { alertConditionId } = useParams<QueryParams>();
  const dispatch = useDispatch();
  const { t } = useTranslation(['global', 'batAlertConditionDetailPage']);

  useEffect(() => {
    dispatch(CommonCreators.getCitiesRequest());
    dispatch(CommonCreators.getAvailableDomainTypesForCountrySelectorRequest());
  }, [dispatch]);

  usePageViewAnalytics({
    name: ROUTE.BUSINESS_ALERTING_TOOL_ALERT_CONDITION_DETAIL.name,
    squad: ROUTE.BUSINESS_ALERTING_TOOL_ALERT_CONDITION_DETAIL.squad,
  });
  useInitAndDestroyPage({ dispatch, Creators });

  const alertConditionDetail = useSelector(getAlertConditionDetailSelector.getData);
  const isPending = useSelector(getAlertConditionDetailSelector.getIsPending);

  useEffect(() => {
    dispatch(CommonCreators.getCitiesRequest());
  }, [dispatch]);

  useEffect(() => {
    if (alertConditionId) {
      dispatch(Creators.getAlertConditionDetailRequest({ conditionId: alertConditionId }));
    }
  }, [dispatch, alertConditionId]);

  const { canUserEdit } = useUserEditPermission({
    createdBy: alertConditionDetail?.createdBy?._id,
    permittedRoles: alertConditionDetail?.permittedRoles,
  });

  return (
    <>
      <PageTitleHeader title={t('batAlertConditionDetailPage:PAGE_TITLE.ALERT_CONDITION.DETAIL')} isDeviceMobile={false} />
      <div className={classes.pageContainer}>
        <header className={classes.header}>
          <span>{t('batAlertConditionDetailPage:PAGE_TITLE.ALERT_CONDITION.DETAIL')}</span>
          {
            !canUserEdit ? null :
              (
                <div>
                  <Switch
                    checked={alertConditionDetail.status === 100}
                    checkedChildren={t('global:ACTIVE')}
                    unCheckedChildren={t('global:INACTIVE')}
                    onChange={handleStatusSwitchOnChange}
                    disabled={isPending}
                  />
                </div>
              )
          }
        </header>
        <Row gutter={[24, 24]}>
          <Col xs={24}>
            <UpdateMetaDataForm />
          </Col>

          <Col xs={24}>
            <UpdateMetricGroupForm />
          </Col>

          <Col xs={24}>
            <UpdateQueryForm />
          </Col>

          <Col xs={24}>
            <UpdateRunningHoursForm />
          </Col>

          <Col xs={24}>
            <UpdateNotificationsForm />
          </Col>

          <Col xs={24}>
            <UpdatePermittedRolesForm />
          </Col>
        </Row>
      </div>
    </>
  );

  function handleStatusSwitchOnChange(status: boolean) {
    if (status) {
      return dispatch(Creators.activateAlertConditionRequest({ conditionId: alertConditionId }));
    }

    return dispatch(Creators.deactivateAlertConditionRequest({ conditionId: alertConditionId }));
  }
}

const withReducer = injectReducer({ key: reduxKey, reducer });
const withSaga = injectSaga({ key: reduxKey, saga });

export default compose(withReducer, withSaga)(BATAlertConditionDetailPage);

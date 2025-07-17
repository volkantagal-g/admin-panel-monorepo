import { useEffect } from 'react';
import { get } from 'lodash';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Skeleton, Typography } from 'antd';
import { useParams } from 'react-router-dom';

import { INCIDENT_PRIORITIES, incidentConditions, THRESHOLD_OPERATORS_HUMAN_READABLE } from '@app/pages/BusinessAlertingTool/constants';
import { getLangKey } from '@shared/i18n';
import { LOCAL_DATE_TIME_FORMAT } from '@shared/shared/constants';

import { Creators } from '../../redux/actions';
import { incidentSelector } from '../../redux/selectors';

import useStyles from './styles';
import { getIncidentDurationWithFormat } from '../../../List/components/IncidentTable/utils';
import { convertConstantValueTranslationsToSelectOptions } from '@shared/utils/common';

const { Title } = Typography;

function IncidentInfoBox() {
  const { incidentId }: { incidentId: string } = useParams();
  const { t } = useTranslation(['batIncidentDetailPage', 'batAlertConditionCommon']);
  const dispatch = useDispatch();
  const langKey = getLangKey();
  const classes = useStyles();

  const incident = useSelector(incidentSelector.getData);
  const isIncidentPending = useSelector(incidentSelector.getIsPending);
  const getIncidentPriorityOptions = convertConstantValueTranslationsToSelectOptions({
    constants: INCIDENT_PRIORITIES,
    translationBaseKey: 'batAlertConditionCommon:CONSTANT_VALUES.INCIDENT_PRIORITIES',
  });
  const getThresholdOperatorsHumanReadableOptions = convertConstantValueTranslationsToSelectOptions({
    constants: THRESHOLD_OPERATORS_HUMAN_READABLE,
    translationBaseKey: 'batAlertConditionCommon:CONSTANT_VALUES.ALERT_THRESHOLD_OPERATORS_HUMAN_READABLE',
  });

  useEffect(() => {
    dispatch(Creators.getIncidentByIdRequest({ incidentId }));
  }, [dispatch, incidentId]);

  if (!incident || isIncidentPending) { // need to do early
    return <Skeleton active loading />;
  }

  const getIncidentTitle = () => (`
    ${t(`batAlertConditionCommon:CONSTANT_VALUES.INCIDENT_PRIORITIES.${incident.priority}`)} ${t('batIncidentDetailPage:PLACEHOLDERS:INCIDENT')} -
    ${t(`batAlertConditionCommon:CONSTANT_VALUES.INCIDENT_STATUSES.${incident.status}`)}
  `);

  const getIncidentPriority = () => (`
  ${t(`batAlertConditionCommon:CONSTANT_VALUES.INCIDENT_PRIORITIES.${incident.priority}`)} ${t('batAlertConditionCommon:PLACEHOLDERS:PRIORITY')}
    ${t('batIncidentDetailPage:TEXT_TEMPLATE:ISSUE_CREATED_ON')
      .replace('{0}', moment(incident.createdAt).format(LOCAL_DATE_TIME_FORMAT[langKey.toUpperCase()]))}
  `);

  const getIncidentCloseAt = () => {
    if (!incident.closedAt) {
      return null;
    }

    return (`
      ${t('batIncidentDetailPage:TEXT_TEMPLATE:CLOSED')}:
      ${moment(incident?.closedAt).format(LOCAL_DATE_TIME_FORMAT[langKey.toUpperCase()])}
    `);
  };

  const getIncidentDuration = () => (`
    ${t('batIncidentDetailPage:TEXT_TEMPLATE:DURATION')}:
    ${getIncidentDurationWithFormat(incident.createdAt, incident.closedAt)}
  `);

  const getIncidentAlertConditionThreshold = () => {
    let thresholdText = '';
    const condition = incidentConditions[get(incident, 'priority')];
    const operator = get(incident, ['alertCondition', 'conditions', condition, 'operator']);
    thresholdText += t('batIncidentDetailPage:TEXT_TEMPLATE:QUERY_RESULT_INFO')
      .replace('{0}', get(incident, ['alertCondition', 'name', langKey]))
      .replace('{1}', t(`batAlertConditionCommon:CONSTANT_VALUES.ALERT_THRESHOLD_OPERATORS_HUMAN_READABLE.${operator}`).toLowerCase())
      .replace('{2}', get(incident, ['alertCondition', 'conditions', condition, 'threshold']));
    if (get(incident, ['alertCondition', 'conditions', condition, 'estimate'])) {
      thresholdText += ` ${t('batIncidentDetailPage:TEXT_TEMPLATE:FOR')} ${get(incident, ['alertCondition', 'conditions', condition, 'estimate'])} minutes`;
    }
    return thresholdText;
  };

  const getIncidentAlertConditionDescription = () => (`
  ${t('batAlertConditionCommon:ALERT_CONDITION_DESCRIPTION')} :
    ${get(incident, ['alertCondition', 'description', langKey])}
  `);

  return (
    <div className={classes.fullWidth}>
      <Title level={4}>{getIncidentTitle()}</Title>
      <div>{getIncidentPriority()}</div>
      <div>{getIncidentCloseAt()}</div>
      <div>{getIncidentDuration()}</div>
      <div>{getIncidentAlertConditionThreshold()}</div>
      <div>{getIncidentAlertConditionDescription()}</div>
    </div>
  );
}

export default IncidentInfoBox;

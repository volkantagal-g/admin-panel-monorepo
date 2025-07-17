import { useEffect, useState } from 'react';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Row, Col, Collapse } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { GETIR_WORKING_HOURS_DOMAIN_TYPES, REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import permKey from '@shared/shared/permKey.json';
import { usePageViewAnalytics, usePermission } from '@shared/hooks';
import WorkingHoursSelect from '@shared/components/UI/WorkingHoursSelect';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { ROUTE } from '@app/routes';
import sagas from './redux/sagas';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { workingHoursSelector } from './redux/selectors';
import Filter from './components/Filter';
import { WORKING_HOURS_MINS_RANGE } from './constants';

const { Title } = Typography;

const List = () => {
  usePageViewAnalytics({ name: ROUTE.CONFIG_WORKING_HOURS.name, squad: ROUTE.CONFIG_WORKING_HOURS.squad });
  const dispatch = useDispatch();
  const { canAccess } = usePermission();
  const workingHours = useSelector(workingHoursSelector.getData);
  const selectedCountry = useSelector(getSelectedCountry);
  const [timezone, setTimezone] = useState('');
  const hasAccessToEditWorkingHours = canAccess(permKey.PAGE_CONFIG_WORKING_HOURS_EDIT_HOURS);
  const hasAccessToEditWorkingHoursMessage = canAccess(permKey.PAGE_CONFIG_WORKING_HOURS_EDIT_MESSAGE);
  const { t } = useTranslation(['configPage', 'warehousePage']);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(CommonCreators.getOperationalCountriesRequest());
    return () => {
      dispatch(Creators.destroyPage());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const countryId = _.get(selectedCountry, '_id');
      const tempTimezone = _.get(selectedCountry, '0.timezones.0.timezone', '');
      dispatch(Creators.setCountry({ countryId }));
      setTimezone(tempTimezone);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isInRange = (source, value) => {
    return source.some(timeObject => {
      return value > timeObject.startMin && timeObject.endMin >= value;
    });
  };

  const getAvailableTimes = availableTimes => {
    return Array.from({ length: (7 * 24 * 60) / WORKING_HOURS_MINS_RANGE }).reduce((sumObject, tempValue, tempIndex) => {
      const timeValue = (tempIndex * WORKING_HOURS_MINS_RANGE) + WORKING_HOURS_MINS_RANGE;
      return {
        ...sumObject,
        [tempIndex]: isInRange(availableTimes, timeValue),
      };
    }, {});
  };

  const handleWorkingHoursSubmit = updateData => {
    dispatch(Creators.updateWorkingHoursRequest(updateData));
  };

  const handleWorkingHoursMessageSubmit = updateData => {
    dispatch(Creators.updateWorkingHoursMessageRequest(updateData));
  };

  const handleCreateWorkingHoursForDomains = (workingHoursType, countryId, cityId, regionId) => {
    dispatch(Creators.createWorkingHoursRequest({ workingHours, countryId, workingHoursType, cityId, regionId }));
  };

  const renderWorkingHoursSelectByDomainTypes = () => {
    const getirMarketDomainTypes = new Set(GETIR_WORKING_HOURS_DOMAIN_TYPES);

    return workingHours.map(workingHour => {
      if (getirMarketDomainTypes.has(workingHour.domainType)) {
        const panelHeader = t(`global:GETIR_MARKET_DOMAIN_TYPES:${workingHour.domainType}`);
        return (
          <WorkingHoursSelect
            id={workingHour._id}
            key={workingHour._id}
            header={panelHeader}
            subtitle={t('warehousePage:WORKING_HOURS')}
            subtitleMessage={t('warehousePage:WORKING_HOURS_MESSAGES')}
            availableTimes={getAvailableTimes(workingHour.hours.availableTimes)}
            collapsePanelKey={panelHeader}
            submitWorkingHours={handleWorkingHoursSubmit}
            submitWorkingHoursMessage={handleWorkingHoursMessageSubmit}
            messageObject={workingHour.message}
            domainType={workingHour.domainType}
            timezone={timezone}
            hasAccessToEditWorkingHours={hasAccessToEditWorkingHours}
            hasAccessToEditWorkingHoursMessage={hasAccessToEditWorkingHoursMessage}
            isEditable
            mins={WORKING_HOURS_MINS_RANGE}
            headerSelectable
          />
        );
      }
      return null;
    });
  };

  const pageTitle = t('PAGE_TITLE.CONFIG.WORKING_HOURS');

  return (
    <>
      <Row justify="end" align="middle">
        <Col span={24}>
          <Title level={3}>{pageTitle}</Title>
        </Col>
      </Row>
      <Filter onCreateWorkingHours={handleCreateWorkingHoursForDomains} />
      <Collapse>
        {renderWorkingHoursSelectByDomainTypes()}
      </Collapse>
    </>
  );
};

const reduxKey = REDUX_KEY.CONFIG.WORKING_HOURS;
const withSaga = injectSaga({ key: reduxKey, saga: sagas });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(
  withReducer,
  withSaga,
)(List);

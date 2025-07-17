import { compose } from 'redux';
import { Typography, Row, Col, Collapse } from 'antd';
import { useTranslation } from 'react-i18next';

import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import permKey from '@shared/shared/permKey.json';

import Filter from './components/Filter';
import sagas from './redux/sagas';
import reducer from './redux/reducer';
import { GETIR_MARKET_DOMAIN_TYPES, REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics, usePermission } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { PEAK_HOURS_MINS_RANGE } from './constants';
import { isInRange } from './utils';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { Creators } from './redux/actions';
import { peakHoursSelector } from './redux/selectors';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import WorkingHoursSelect from '@shared/components/UI/WorkingHoursSelect';

const { Title } = Typography;

const PeakHours = () => {
  const { canAccess } = usePermission();
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.CONFIG_PEAK_HOURS.name, squad: ROUTE.CONFIG_PEAK_HOURS.squad });
  const { t } = useTranslation(['configPage', 'warehousePage']);
  const pageTitle = t('PAGE_TITLE.CONFIG.PEAK_HOURS');
  const peakHours = useSelector(peakHoursSelector.getData);
  const selectedCountry = useSelector(getSelectedCountry);
  const [timezone, setTimezone] = useState('');
  const hasAccessToEditPeakHours = canAccess(permKey.PAGE_CONFIG_PEAK_HOURS_EDIT_HOURS);
  const hasAccessToEditPeakHoursMessage = canAccess(permKey.PAGE_CONFIG_PEAK_HOURS_EDIT_MESSAGE);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(CommonCreators.getOperationalCountriesRequest());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  useEffect(() => {
    if (selectedCountry) {
      const tempTimezone = _.get(selectedCountry, '0.timezones.0.timezone', '');
      setTimezone(tempTimezone);
    }
  }, [dispatch, selectedCountry]);

  const getAvailableTimes = availableTimes => {
    return Array.from({ length: (7 * 24 * 60) / PEAK_HOURS_MINS_RANGE }).reduce((sumObject, tempValue, tempIndex) => {
      const timeValue = (tempIndex * PEAK_HOURS_MINS_RANGE) + PEAK_HOURS_MINS_RANGE;
      return {
        ...sumObject,
        [tempIndex]: isInRange(availableTimes, timeValue),
      };
    }, {});
  };

  const handlePeakHoursSubmit = updateData => {
    dispatch(Creators.updatePeakHoursRequest(updateData));
  };

  const handlePeakHoursMessageSubmit = updateData => {
    dispatch(Creators.updatePeakHoursMessageRequest(updateData));
  };

  const handleCreatePeakHoursForDomains = (peakHoursType, cityId, regionId) => {
    dispatch(Creators.createPeakHoursRequest({ peakHours, peakHoursType, cityId, regionId }));
  };

  const renderWorkingHoursSelectByDomainTypes = () => {
    const getirMarketDomainTypes = new Set(GETIR_MARKET_DOMAIN_TYPES);

    return peakHours.map(peakHour => {
      if (getirMarketDomainTypes.has(peakHour.domainType)) {
        const panelHeader = t(`global:GETIR_MARKET_DOMAIN_TYPES:${peakHour.domainType}`);
        return (
          <WorkingHoursSelect
            id={peakHour._id}
            key={peakHour._id}
            subtitle={t('warehousePage:PEAK_HOURS')}
            subtitleMessage={t('warehousePage:PEAK_HOURS_MESSAGES')}
            header={panelHeader}
            availableTimes={getAvailableTimes(peakHour.hours.availableTimes)}
            collapsePanelKey={panelHeader}
            submitWorkingHours={handlePeakHoursSubmit}
            submitWorkingHoursMessage={handlePeakHoursMessageSubmit}
            messageObject={peakHour.message}
            domainType={peakHour.domainType}
            timezone={timezone}
            hasAccessToEditWorkingHours={hasAccessToEditPeakHours}
            hasAccessToEditWorkingHoursMessage={hasAccessToEditPeakHoursMessage}
            isEditable
            mins={PEAK_HOURS_MINS_RANGE}
            headerSelectable
          />
        );
      }
      return null;
    });
  };

  return (
    <>
      <Row justify="end" align="middle">
        <Col span={24}>
          <Title level={3}>{pageTitle}</Title>
        </Col>
      </Row>
      <Filter onCreatePeakHours={handleCreatePeakHoursForDomains} />
      <Collapse>
        {renderWorkingHoursSelectByDomainTypes()}
      </Collapse>
    </>
  );
};

const reduxKey = REDUX_KEY.CONFIG.PEAK_HOURS;
const withSaga = injectSaga({ key: reduxKey, saga: sagas });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(
  withReducer,
  withSaga,
)(PeakHours);

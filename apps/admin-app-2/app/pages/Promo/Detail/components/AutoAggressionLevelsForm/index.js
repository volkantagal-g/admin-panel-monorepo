import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';

import { Col, Collapse } from 'antd';

import { Creators } from '../../redux/actions';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { getSelectedCountryTimeZones } from '@shared/redux/selectors/countrySelection';
import { WORKING_HOURS_MINS_RANGE } from '@app/pages/Promo/constantValues';
import WorkingHoursSelect from '@app/pages/Promo/Detail/components/AvailableTimesForm/WorkingHoursSelect';
import { getAvailableTimes } from '@app/pages/Promo/Detail/utils';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';

const { Panel } = Collapse;

const AutoAggressionLevelsForm = () => {
  const dispatch = useDispatch();
  const workingHours = useSelector(PromoDetailSlice.selectors.autoAggressionLevels);
  const promoId = useSelector(PromoDetailSlice.selectors.promoId);
  const { t } = useTranslation('promoPage');
  const { canAccess } = usePermission();
  const hasAccessToEditWorkingHours = canAccess(permKey.PAGE_PROMO_DETAIL_EDIT);
  const [isFormEditable, setIsFormEditable] = useState(false);
  const timezone = getSelectedCountryTimeZones()?.[0]?.timezone;
  const [availableTimes, setAvailableTimes] = useState(getAvailableTimes(workingHours));

  const handleWorkingHoursSubmit = updateData => {
    const autoAggressionLevels = updateData?.updateData?.hours?.availableTimes.map(availableTime => {
      return {
        ...availableTime,
        aggressionLevel: 0,
      };
    });
    dispatch(
      Creators.updateWorkingHoursRequest({ id: updateData.id, body: { autoAggressionLevels } }),
    );
    setIsFormEditable(false);
  };

  return (
    <WorkingHoursSelect
      id={promoId}
      key={promoId}
      subtitle={t('WORKING_HOURS')}
      availableTimes={availableTimes}
      setAvailableTimes={setAvailableTimes}
      submitWorkingHours={handleWorkingHoursSubmit}
      isEditable={!isFormEditable}
      timezone={timezone}
      hasAccessToEditWorkingHours={hasAccessToEditWorkingHours}
      mins={WORKING_HOURS_MINS_RANGE}
    />
  );
};

const AutoAggressionLevelsSection = memo(function AutoAggressionLevelsSection() {
  const { t } = useTranslation('promoPage');

  const isMaster = useSelector(PromoDetailSlice.selectors.isMaster);
  const isParent = useSelector(PromoDetailSlice.selectors.isParent);

  if (isParent || isMaster) {
    return null;
  }

  return (
    <Col xs={24}>
      <Collapse className="mb-2">
        <Panel header={t('AGGRESSION_LEVELS.HEADER_TITLE')} key={1}>
          <AutoAggressionLevelsForm />
        </Panel>
      </Collapse>
    </Col>
  );
});

export default AutoAggressionLevelsSection;

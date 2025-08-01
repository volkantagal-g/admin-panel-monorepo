import { Checkbox, Col, Divider, Row } from 'antd';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

import TemplateFilters from '../TemplateFilters';
import CapacityDetail from '../Detail';
import AttendanceLegend from '../AttendanceLegend';
import { Creators } from '../../redux/actions';
import { isMobile } from '@shared/utils/common';

function Capacity() {
  const dispatch = useDispatch();
  const { t } = useTranslation('officeAttendanceTracking');

  useEffect(() => {
    dispatch(Creators.getPublicHolidaysRequest());
  }, [dispatch]);

  return (
    <>
      <div className="w-100">
        <TemplateFilters />
      </div>
      <Divider className="mt-2 mb-2" />
      <AttendanceLegend />
      {renderExclusionCheckboxes()}
      <CapacityDetail />
    </>
  );

  function onExclusionFilterChangeHandler(e: CheckboxChangeEvent) {
    const { name: fieldName, checked } = e.target;

    dispatch(Creators.setExclusionFilters({ filters: { [fieldName]: checked } }));
  }

  function renderExclusionCheckboxes() {
    const checkboxes = [
      <Checkbox name="excludePastData" onChange={onExclusionFilterChangeHandler}>{t('EXCLUDE_PAST_DATA')}</Checkbox>,
      <Checkbox name="excludeWeekends" onChange={onExclusionFilterChangeHandler}>{t('EXCLUDE_WEEKENDS')}</Checkbox>,
      <Checkbox name="excludePublicHolidays" onChange={onExclusionFilterChangeHandler}>{t('EXCLUDE_PUBLIC_HOLIDAYS')}</Checkbox>,
    ];

    const mobileView = (
      <>
        <Divider className="mt-2 mb-2" />
        <Col className="mb-2">
          {checkboxes.map(checkbox => <Row>{checkbox}</Row>)}
        </Col>
      </>
    );

    const otherViews = (
      <Divider orientation="right">{checkboxes.map(checkbox => checkbox)}</Divider>
    );

    return isMobile() ? mobileView : otherViews;
  }
}

export default Capacity;

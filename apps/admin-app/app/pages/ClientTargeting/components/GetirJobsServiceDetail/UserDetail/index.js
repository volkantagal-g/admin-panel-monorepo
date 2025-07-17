import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';
// import MultipleSelect from '../../common/MultipleSelect';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import CheckboxSelect from '../../common/CheckboxSelect';
import { clientListSections, getGetirJobsDateTypesForUserDetail, getGetirJobsProfileStatusOptions } from '../../../constants';
import { getClientListData, getGetirJobsDrivingLicensesSelector } from '../../../redux/selectors';
import SingleSelect from '../../common/SingleSelect';
import MultipleSelect from '../../common/MultipleSelect';
import GetirJobsJobTitleSelect from '../../common/GetirJobsJobTitleSelect';
import MinMaxInput from '../../common/MinMaxInput';
// import { getCitiesSelector } from '@shared/redux/selectors/common';

const subSectionName = 'user';
const activeKey = `${clientListSections.getirJobServiceDetail}.${subSectionName}`;

const UserDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));
  const getirJobsDrivingLicensesData = useSelector(getGetirJobsDrivingLicensesSelector.getData);
  const getirJobsPDrivingLicensesIsPending = useSelector(getGetirJobsDrivingLicensesSelector.getIsPending);
  // const cities = useSelector(getCitiesSelector.getOperationalOrWasOperationalCities);

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const dateTypesSelectOptions = getGetirJobsDateTypesForUserDetail();
  const getirJobssProfileStatusOption = getGetirJobsProfileStatusOptions();

  const minAgeKey = 'minAge';
  const maxAgeKey = 'maxAge';

  return (
    <CollapsePanel header={t('GETIR_JOBS_USER_DETAIL')} activeKey={activeKey}>
      <ActiveParamButtons
        activeKey={activeKey}
        activeParamIndex={clientListData.activeIndex}
        paramsLength={clientListData.params.length}
      />
      <Row justify="space-between">
        <Col span={11}>
          {/* TODO: Remove commented code in this page, when city filter ready from data side */}
          {/* Also uncomment parts from initialState.js and prepareParams.js files */}
          {/* <MultipleSelect
            activeKey={activeKey}
            value={data.cities}
            label={t('global:CITY')}
            clientListKey="cities"
            selectable={cities}
            placeholder={t('global:CITY')}
            showCSVImporter
            disabled={data.cityDisabled}
            isSelectAllCountriesVisible={false}
          /> */}
          <MultipleSelect
            activeKey={activeKey}
            label={t('clientTargetingPage:GETIR_JOBS_PROFILE_STATUS.TITLE')}
            clientListKey="profileStatus"
            value={data.profileStatus}
            selectable={getirJobssProfileStatusOption}
            tagValue="label"
            tagKey="value"
          />
          <GetirJobsJobTitleSelect
            showCSVImporter={false}
            activeKey={activeKey}
            label={t('clientTargetingPage:GETIR_JOB_EXPERIENCE_DETAILS')}
            clientListKey="experienceDetails"
            value={data.experienceDetails}
            selectable={data.getJobTitlesByFilters.data}
            isLoading={data.getJobTitlesByFilters.isPending}
          />
          <MultipleSelect
            activeKey={activeKey}
            label={t('clientTargetingPage:GETIR_JOB_DRIVING_LICENSE')}
            clientListKey="drivingLicenses"
            value={data.drivingLicenses}
            selectable={getirJobsDrivingLicensesData}
            isLoading={getirJobsPDrivingLicensesIsPending}
            tagValue="label"
            tagKey="value"
          />
          <MinMaxInput
            activeKey={activeKey}
            minCount={data[minAgeKey]}
            maxCount={data[maxAgeKey]}
            minCountKey={minAgeKey}
            maxCountKey={maxAgeKey}
            label={t('AGE')}
          />
          <Row gutter={[8, 8]}>
            <Col sm={12}>
              <CheckboxSelect
                activeKey={activeKey}
                label={t('clientTargetingPage:EXCLUDE_SHADOW_BANNED_USERS')}
                value={data.excludeShadowBannedUser}
                clientListKey="excludeShadowBannedUser"
              />
            </Col>
            <Col sm={12}>
              <CheckboxSelect
                activeKey={activeKey}
                label={t('clientTargetingPage:EXCLUDE_USERS')}
                value={data.excludeUser}
                clientListKey="excludeUser"
                description={t('clientTargetingPage:EXCLUDE_USERS_INFO')}
              />
            </Col>
          </Row>
        </Col>
        <Col span={11}>
          <SingleSelect
            activeKey={activeKey}
            label={t('DATE_TYPE')}
            clientListKey="dateType"
            value={data.dateType}
            selectable={dateTypesSelectOptions}
            tagValue="label"
            tagKey="value"
          />
          <SelectDateOrXDaysBeforeToday
            activeKey={activeKey}
            label={t('USER_DETAIL_DATE_RANGE')}
            startDate={data.startDate}
            startDateType={data.startDateType}
            startDayBeforeToday={data.startDayBeforeToday}
            endDate={data.endDate}
            endDateType={data.endDateType}
            endDayBeforeToday={data.endDayBeforeToday}
          />
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default UserDetail;

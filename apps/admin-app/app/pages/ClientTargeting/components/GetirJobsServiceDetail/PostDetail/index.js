import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';
import MultipleSelect from '../../common/MultipleSelect';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import MinMaxInput from '../../common/MinMaxInput';
import SingleSelect from '../../common/SingleSelect';
import GetirJobsJobTitleSelect from '../../common/GetirJobsJobTitleSelect';
import CheckboxSelect from '../../common/CheckboxSelect';
import {
  clientListSections,
  getEmploymentTypeOptions,
  getGetirJobsDateTypes,
  getGetirJobsPostStatusOptions,
  getGetirJobsDeletedStatusOptions,
} from '../../../constants';
import { getClientListData, getGetirJobsPostTypesSelector, getGetirJobsCategoriesSelector } from '../../../redux/selectors';
import { getCitiesSelector } from '@shared/redux/selectors/common';

const subSectionName = 'totalPost';
const activeKey = `${clientListSections.getirJobServiceDetail}.${subSectionName}`;

const PostDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));
  const cities = useSelector(getCitiesSelector.getOperationalOrWasOperationalCities);
  const getirJobsPostTypesData = useSelector(getGetirJobsPostTypesSelector.getData);
  const getirJobsPostTypesIsPending = useSelector(getGetirJobsPostTypesSelector.getData);
  const getirJobsCategoriesData = useSelector(getGetirJobsCategoriesSelector.getData);
  const getirJobsPCategoriesIsPending = useSelector(getGetirJobsCategoriesSelector.getIsPending);

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const dateTypesSelectOptions = getGetirJobsDateTypes();
  const getirJobsPostStatusOptions = getGetirJobsPostStatusOptions();
  const getirJobsDeletedStatusOptions = getGetirJobsDeletedStatusOptions();

  const minCountKey = 'minPostCount';
  const maxCountKey = 'maxPostCount';

  return (
    <CollapsePanel header={t('GETIR_JOBS_POST_DETAIL')} activeKey={activeKey}>
      <ActiveParamButtons
        activeKey={activeKey}
        activeParamIndex={clientListData.activeIndex}
        paramsLength={clientListData.params.length}
      />
      <Row justify="space-between">
        <Col span={11}>
          {/* City */}
          <MultipleSelect
            activeKey={activeKey}
            value={data.cities}
            label={t('global:CITY')}
            clientListKey="cities"
            selectable={cities}
            placeholder={t('global:CITY')}
            showCSVImporter
            disabled={data.cityDisabled}
            isSelectAllCountriesVisible={false}
          />
          <SingleSelect
            activeKey={activeKey}
            label={t('clientTargetingPage:POST_TYPE')}
            clientListKey="postType"
            value={data.postType}
            selectable={getirJobsPostTypesData}
            isLoading={getirJobsPostTypesIsPending}
            allowClear
          />
          <MultipleSelect
            activeKey={activeKey}
            label={t('clientTargetingPage:POST_STATUS.TITLE')}
            clientListKey="postStatus"
            value={data.postStatus}
            selectable={getirJobsPostStatusOptions}
            tagValue="label"
            tagKey="value"
          />
          <SingleSelect
            activeKey={activeKey}
            label={t('clientTargetingPage:GETIR_JOBS_DELETED_STATUS.TITLE')}
            clientListKey="deletedStatus"
            value={data.deletedStatus}
            selectable={getirJobsDeletedStatusOptions}
            tagValue="label"
            tagKey="value"
          />
          <GetirJobsJobTitleSelect
            single
            allowClear
            activeKey={activeKey}
            value={data.jobTitleId}
            label={t('clientTargetingPage:JOB_TITLE')}
            clientListKey="jobTitleId"
            selectable={data.getJobTitlesByFilters.data}
            isLoading={data.getJobTitlesByFilters.isPending}
          />
          <MultipleSelect
            activeKey={activeKey}
            label={t('clientTargetingPage:GETIR_JOBS_SECTOR')}
            clientListKey="sector"
            value={data.sector}
            selectable={getirJobsCategoriesData}
            isLoading={getirJobsPCategoriesIsPending}
            tagValue="label"
            tagKey="value"
          />
          {/* Employment Type */}
          <SingleSelect
            activeKey={activeKey}
            label={t('EMPLOYMENT_TYPE')}
            clientListKey="employmentType"
            value={data.employmentType}
            selectable={getEmploymentTypeOptions()}
            tagValue="label"
            tagKey="value"
          />
          <CheckboxSelect
            activeKey={activeKey}
            label={t('clientTargetingPage:EXCLUDE_USERS')}
            value={data.excludeUser}
            clientListKey="excludeUser"
            description={t('clientTargetingPage:EXCLUDE_USERS_INFO')}
          />
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
            label={t('POST_DETAIL_DATE_RANGE')}
            startDate={data.startDate}
            startDateType={data.startDateType}
            startDayBeforeToday={data.startDayBeforeToday}
            endDate={data.endDate}
            endDateType={data.endDateType}
            endDayBeforeToday={data.endDayBeforeToday}
          />
          <MinMaxInput
            activeKey={activeKey}
            minCount={data[minCountKey]}
            maxCount={data[maxCountKey]}
            minCountKey={minCountKey}
            maxCountKey={maxCountKey}
            label={t('POST_COUNT')}
          />
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default PostDetail;

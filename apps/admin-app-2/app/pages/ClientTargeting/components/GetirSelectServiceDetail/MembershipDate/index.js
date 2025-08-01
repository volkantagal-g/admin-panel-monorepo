import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { clientListSections, getGetirSelectMembershipDateOptions } from '../../../constants';
import { getClientListData } from '../../../redux/selectors';
import SingleSelect from '../../common/SingleSelect';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';

const subSectionName = 'membershipDate';
const activeKey = `${clientListSections.getirSelectServiceDetail}.${subSectionName}`;

const MembershipDate = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const getirSelectMembershipDateOptions = getGetirSelectMembershipDateOptions();

  return (
    <CollapsePanel header={t('GETIR_SELECT_MEMBERSHIP.DATE_DETAIL')} activeKey={activeKey}>
      <ActiveParamButtons
        activeKey={activeKey}
        activeParamIndex={clientListData.activeIndex}
        paramsLength={clientListData.params.length}
      />
      <Row>
        <Col xs={22} md={11}>
          <SingleSelect
            activeKey={activeKey}
            label={t('DATE_TYPE')}
            clientListKey="dateType"
            value={data.dateType}
            selectable={getirSelectMembershipDateOptions}
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

export default MembershipDate;

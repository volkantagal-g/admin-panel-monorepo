import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';
import { clientListSections, getMembershipDetailDateTypes } from '../../../constants';
import { getClientListData } from '../../../redux/selectors';
import SingleSelect from '../../common/SingleSelect';
import CheckboxSelect from '../../common/CheckboxSelect';

const subSectionName = 'membershipDetail';
const activeKey = `${clientListSections.getirDriveServiceDetail}.${subSectionName}`;

const MembershipDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const membershipDetailDateOptions = getMembershipDetailDateTypes(t);

  return (
    <CollapsePanel header={t('GETIR_DRIVE_MEMBERSHIP_DETAIL')} activeKey={activeKey}>
      <ActiveParamButtons
        activeKey={activeKey}
        activeParamIndex={clientListData.activeIndex}
        paramsLength={clientListData.params.length}
      />
      <Row justify="space-between">
        <Col span={11}>
          <SingleSelect
            activeKey={activeKey}
            label={t('DATE_TYPE')}
            clientListKey="dateType"
            value={data.dateType}
            selectable={membershipDetailDateOptions}
            tagValue="label"
            tagKey="value"
          />
          <CheckboxSelect
            activeKey={activeKey}
            label={t('EXCLUDE_CLIENTS')}
            description={t('EXCLUDE_CLIENTS_DESCRIPTION')}
            value={data.excludeClients}
            clientListKey="excludeClients"
          />
        </Col>
        <Col span={11}>
          <SelectDateOrXDaysBeforeToday
            activeKey={activeKey}
            label={t('DATE_INTERVAL')}
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

export default MembershipDetail;

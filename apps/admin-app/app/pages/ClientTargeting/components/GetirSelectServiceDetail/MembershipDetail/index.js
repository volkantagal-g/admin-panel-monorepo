import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { clientListSections, getGetirSelectMembershipHasRightStatusOptions, getGetirSelectMembershipHasNoRightStatusOptions } from '../../../constants';
import { getClientListData } from '../../../redux/selectors';
import MultipleSelect from '../../common/MultipleSelect';
import CheckboxSelect from '../../common/CheckboxSelect';
import RadioButtonGroup from '../../common/RadioButtonGroup';
import { YES_NO_OPTIONS } from '@shared/shared/constantValues';

const subSectionName = 'membershipStatus';
const activeKey = `${clientListSections.getirSelectServiceDetail}.${subSectionName}`;

const MembershipDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));

  const [hasRightToUse, setHasRightToUse] = useState(false);

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const handleOnChange = value => {
    setHasRightToUse(value.target.value);
    data.status = [];
  };

  const options = YES_NO_OPTIONS;

  const getirSelectMembershipHasRightStatusOptions = getGetirSelectMembershipHasRightStatusOptions();
  const getirSelectMembershipHasNoRightStatusOptions = getGetirSelectMembershipHasNoRightStatusOptions();

  return (
    <CollapsePanel header={t('GETIR_SELECT_MEMBERSHIP.DETAIL')} activeKey={activeKey}>
      <ActiveParamButtons
        activeKey={activeKey}
        activeParamIndex={clientListData.activeIndex}
        paramsLength={clientListData.params.length}
      />
      <Row>
        <Col xs={22} md={11}>
          <RadioButtonGroup
            onChange={handleOnChange}
            value={hasRightToUse}
            options={options}
            name={t('GETIR_SELECT_MEMBERSHIP.STATUS.HAS_RIGHT_TO_USE')}
          />
          <MultipleSelect
            activeKey={activeKey}
            selectable={hasRightToUse ? getirSelectMembershipHasRightStatusOptions : getirSelectMembershipHasNoRightStatusOptions}
            tagValue="label"
            tagKey="value"
            value={data.status}
            label={t('GETIR_SELECT_MEMBERSHIP.STATUS.TITLE')}
            clientListKey="status"
            placeholder={t('GETIR_SELECT_MEMBERSHIP.STATUS.TITLE')}
          />
          <CheckboxSelect
            activeKey={activeKey}
            label={t('clientTargetingPage:EXCLUDE_USERS')}
            value={data.excludeUser}
            clientListKey="excludeUser"
            description={t('clientTargetingPage:EXCLUDE_USERS_INFO')}
          />
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default MembershipDetail;

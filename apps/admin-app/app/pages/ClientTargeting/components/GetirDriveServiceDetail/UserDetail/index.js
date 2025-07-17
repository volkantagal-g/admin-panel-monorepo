import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import CheckboxSelect from '../../common/CheckboxSelect';
import MinMaxInput from '../../common/MinMaxInput';
import { clientListSections } from '../../../constants';
import { getClientListData } from '../../../redux/selectors';

const subSectionName = 'userDetail';
const activeKey = `${clientListSections.getirDriveServiceDetail}.${subSectionName}`;

const UserDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const minCountKey = 'minAge';
  const maxCountKey = 'maxAge';

  return (
    <CollapsePanel header={t('GETIR_DRIVE_USER_DETAIL')} activeKey={activeKey}>
      <ActiveParamButtons
        activeKey={activeKey}
        activeParamIndex={clientListData.activeIndex}
        paramsLength={clientListData.params.length}
      />
      <Row justify="space-between">
        <Col span={11}>
          <MinMaxInput
            activeKey={activeKey}
            minCount={data[minCountKey]}
            maxCount={data[maxCountKey]}
            minCountKey={minCountKey}
            maxCountKey={maxCountKey}
            label={t('AGE')}
          />
          <CheckboxSelect
            activeKey={activeKey}
            label={t('clientTargetingPage:KVKK_FILTER')}
            value={data.kvkk}
            clientListKey="kvkk"
          />
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default UserDetail;

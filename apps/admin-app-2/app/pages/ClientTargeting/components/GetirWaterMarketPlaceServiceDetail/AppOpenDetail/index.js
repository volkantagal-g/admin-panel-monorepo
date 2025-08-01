import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections } from '../../../constants';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData } from '../../../redux/selectors';
import VendorSelect from '../../common/VendorSelect';

const subSectionName = 'vendorHexagon';
const activeKey = `${clientListSections.getirWaterMarketPlaceServiceDetail}.${subSectionName}`;

const AppOpenDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));
  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  return (
    <CollapsePanel header={t('GWMP_APP_OPEN_DETAIL')} activeKey={activeKey}>
      <ActiveParamButtons activeKey={activeKey} activeParamIndex={clientListData.activeIndex} paramsLength={clientListData.params.length} />
      <Row justify="space-between">
        <Col span={11}>
          <VendorSelect
            activeKey={activeKey}
            value={data.vendors}
          />
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default AppOpenDetail;

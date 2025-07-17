import { memo } from 'react';
import { Row, Col } from 'antd';

import GetirGlobalRulesetPane from '@app/pages/Popup/List/components/GlobalRuleset/GetirRulesetPane';

const PopupGlobalRuleset = () => {
  // Initial global rule set on component mount

  return (
    <Row gutter={24}>
      <Col span={24}>
        <GetirGlobalRulesetPane />
      </Col>
    </Row>
  );
};

export default memo(PopupGlobalRuleset);

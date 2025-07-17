import { Col, Row } from 'antd';
import { isArray } from 'lodash';

const DEFAULT_GUTTER = [12, 12];
const responsiveColumnSpans = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 24,
  xl: 12,
};

const TwoColumnLayout = ({ leftColumn, rightColumn, gutter = DEFAULT_GUTTER, columnSpans = responsiveColumnSpans }) => {
  return (
    <Row gutter={isArray(gutter) ? gutter : DEFAULT_GUTTER} className="my-3">
      <Col key="two_column_layout_left_column" {...columnSpans}>
        {leftColumn}
      </Col>
      <Col key="two_column_layout_right_column" {...columnSpans}>
        {rightColumn}
      </Col>
    </Row>
  );
};

export default TwoColumnLayout;

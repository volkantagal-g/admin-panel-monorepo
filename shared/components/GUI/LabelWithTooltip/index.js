import { Row, Col, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useTheme } from 'react-jss';
import PropTypes from 'prop-types';
import { memo } from 'react';

export const LabelWithTooltip = memo(function LabelWithTooltip({
  label,
  tooltipTitle,
}) {
  const theme = useTheme();
  return (
    <Row gutter={[theme.spacing(2)]}>
      <Col>
        {label}
      </Col>
      <Col className="d-flex text-align-center justify-content-between align-items-center">
        <Tooltip title={tooltipTitle} overlayInnerStyle={{ whiteSpace: 'pre-line', width: '300px' }}>
          <InfoCircleOutlined style={{ pointerEvents: 'auto' }} className="icon-type2" />
        </Tooltip>
      </Col>
    </Row>
  );
});

LabelWithTooltip.propTypes = {
  label: PropTypes.string,
  tooltipTitle: PropTypes.string,
};
LabelWithTooltip.defaultProps = {
  label: undefined,
  tooltipTitle: undefined,
};

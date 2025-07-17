import { Tooltip } from 'antd';

const ShowTooltip = ({ show, tooltipProps, children }) => (
  show ? <Tooltip {...tooltipProps}>{children}</Tooltip> : children
);

export default ShowTooltip;

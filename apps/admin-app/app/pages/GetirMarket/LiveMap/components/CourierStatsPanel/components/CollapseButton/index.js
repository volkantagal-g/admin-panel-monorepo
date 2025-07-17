import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import useStyles from './styles';

const CollapseButton = ({ isCollapsed, onCollapseClick }) => {
  const classes = useStyles();

  return (
    <div className={classes.collapseButtonWrapper}>
      <Button
        className={classes.collapseButton}
        onClick={onCollapseClick}
        icon={isCollapsed ? <LeftOutlined /> : <RightOutlined />}
      />
    </div>
  );
};

export default CollapseButton;

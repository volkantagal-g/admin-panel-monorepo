import { Tabs as TabsAntd } from 'antd';
import { memo } from 'react';
import PropTypes from 'prop-types';

import { guiTheme } from '@shared/components/GUI/styles/guiThemes';
import useStyles from './styles';

const borderDirections = {
  top: 'borderBottom',
  bottom: 'borderTop',
  left: 'borderRight',
  right: 'borderLeft',
};

export const Tabs = memo(function Tabs({ items, tabPosition, ...otherProps }) {
  const borderDirection = borderDirections[tabPosition];
  const classes = useStyles();
  return (
    <TabsAntd
      className={classes.tabs}
      tabBarStyle={{ [borderDirection]: guiTheme.borders.divider }}
      tabPosition={tabPosition}
      {...otherProps}
    >
      {items?.map(({ label, children, key, title }) => (
        <TabsAntd.TabPane tab={<div title={title ?? ''}>{label}</div>} key={key}>
          {children}
        </TabsAntd.TabPane>
      ))}
    </TabsAntd>
  );
});

Tabs.propTypes = {
  defaultActiveKey: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    key: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  })).isRequired,
  onChange: PropTypes.func,
  onTabClick: PropTypes.func,
  size: PropTypes.oneOf(['small', 'middle', 'large']),
  tabPosition: PropTypes.oneOf(['top', 'bottom', 'right', 'left']),
};

Tabs.defaultProps = {
  defaultActiveKey: undefined,
  onChange: undefined,
  onTabClick: undefined,
  size: 'middle',
  tabPosition: 'top',
};

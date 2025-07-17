import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import useStyles from './styles';

export default function SidebarToggler({ isSidebarCollapsed, toggleSidebar }) {
  const classes = useStyles();
  const props = {
    className: 'trigger',
    style: { fontSize: '20px' },
    onClick: () => toggleSidebar(),
  };

  if (isSidebarCollapsed) {
    return (
      <div className={classes.toggleWrapper}>
        <MenuUnfoldOutlined {...props} />
      </div>
    );
  }

  return (
    <div className={classes.toggleWrapper}>
      <MenuFoldOutlined {...props} />
    </div>
  );
}

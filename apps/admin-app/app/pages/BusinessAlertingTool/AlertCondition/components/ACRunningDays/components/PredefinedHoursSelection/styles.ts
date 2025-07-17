import { createUseStyles } from 'react-jss';

export default createUseStyles({
  buttonContainer: {
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
  },
  hourSelectionMenu: {
    '& .ant-dropdown-menu-title-content': { display: 'flex', alignItems: 'center' },
    '& .ant-dropdown-menu-submenu-title': { display: 'flex' },
  },
});

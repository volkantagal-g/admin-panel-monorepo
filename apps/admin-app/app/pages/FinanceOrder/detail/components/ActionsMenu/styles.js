import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return { menuItem: { '&.ant-dropdown-menu-item-disabled': { opacity: 0.5 } } };
});

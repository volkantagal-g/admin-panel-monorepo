import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
  checkBoxGroup: { '& .ant-checkbox-group-item span': { fontSize: 14 } },
  fieldRequired: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: 700,
    color: theme.color.red,
  },
}));

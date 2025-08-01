import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    manualRefundButton: {
      backgroundColor: theme.color.status.warning,
      borderColor: theme.color.status.warning,
      '&:hover:not([disabled])': {
        backgroundColor: theme.color.status.warning,
        borderColor: theme.color.status.warning,
      },
      '&:active:not([disabled])': {
        backgroundColor: theme.color.status.warning,
        borderColor: theme.color.status.warning,
      },
      '&.ant-btn-primary:focus:not([disabled]), &:focus:not([disabled])': {
        backgroundColor: theme.color.status.warning,
        borderColor: theme.color.status.warning,
      },
      '&.ant-btn-primary.ant-btn-clicked:not([disabled])': {
        backgroundColor: theme.color.status.warning,
        borderColor: theme.color.status.warning,
      },
    },
  };
});

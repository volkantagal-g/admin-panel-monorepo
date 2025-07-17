import { createUseStyles } from 'react-jss';

export const useCopyableTextStyles = createUseStyles<'wrapper'>({
  wrapper: {
    '& .ant-btn-icon-only': {
      width: 'auto',
      height: 'auto',
      lineHeight: 'unset',
      padding: 0,
    },
  },
});

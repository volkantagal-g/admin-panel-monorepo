import { createUseStyles } from 'react-jss';

import JssTheme from '@shared/jssTheme';

export const usePromoTagStyles = createUseStyles<'tag', { textColor?: string }, typeof JssTheme>(
  theme => ({
    tag: {
      '& .ant-tag': {
        color: props => props.textColor || theme.color.white,
        marginRight: 0,
      },
      '& .ant-btn-icon-only': {
        width: 'auto',
        height: 'auto',
        lineHeight: 'unset',
        padding: 0,
      },
    },
  }),
);

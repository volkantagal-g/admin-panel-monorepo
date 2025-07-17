import { createUseStyles } from 'react-jss';

import jssTheme from '@shared/jssTheme';

export const useHintStyles = createUseStyles((theme: typeof jssTheme) => ({
  content: {
    maxWidth: 300,
    wordBreak: 'break-word',
    whiteSpace: 'pre-line',
  },
  icon: { color: theme.color.primary },
}));

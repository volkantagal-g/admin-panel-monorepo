import { createUseStyles } from 'react-jss';

import JssTheme from '@shared/jssTheme';

export const useGenerationOptionStyles = createUseStyles<'container' | 'title' | 'iconContainer', {
  color: string
}, typeof JssTheme>(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    border: 'none',
    height: 'auto',
    flex: 1,
  },
  title: {
    color: theme.color.primary,
    fontSize: 16,
    fontWeight: 500,
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 16,
    backgroundColor: props => props?.color,
    color: theme.color.white,
    '& .anticon': { fontSize: 48 },
  },
}));

export const useGenerationModalStyles = createUseStyles<'optionsWrapper' | 'button', undefined, typeof JssTheme>(theme => ({
  optionsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  button: {
    backgroundColor: theme.color.edit,
    fontWeight: 500,
    color: theme.color.white,
    border: 'none',
    '&:hover, &:focus, &:active': {
      backgroundColor: theme.color.getir.yellow,
      color: theme.color.white,
    },
  },
}));

export const useEmptyDomainsStyles = createUseStyles<'wrapper'>({
  wrapper: {
    '& svg.ant-empty-img-simple': {
      width: 24,
      height: 24,
    },
    '& .ant-space-item:first-child': { height: 24 },
  },
});

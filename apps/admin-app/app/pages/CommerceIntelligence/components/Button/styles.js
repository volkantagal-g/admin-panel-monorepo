import { createUseStyles } from 'react-jss';

import { colors, fontSizes, fontWeights, spacing } from '@app/pages/CommerceIntelligence/styleVariables';

export default createUseStyles({
  button: {
    borderRadius: '8px',
    fontWeight: `${fontWeights.bold} !important`,
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    outline: 'none',
    textDecoration: 'none',
    textShadow: 'none',
    boxShadow: 'none',
    '&:focus': { outline: 'none' },
    '& span': { fontWeight: `${fontWeights.bold} !important` },
    '& .ant-btn': { fontWeight: `${fontWeights.bold} !important` },
  },
  // Button Types
  primary: {
    backgroundColor: colors.purple,
    color: colors.backgroundWhite,
    '&:hover': {
      backgroundColor: colors.secondaryPurple,
      color: colors.backgroundWhite,
    },
    '&:focus': {
      backgroundColor: colors.secondaryPurple,
      color: colors.backgroundWhite,
    },
    '&:active': {
      backgroundColor: colors.inputFocus,
      color: colors.backgroundWhite,
    },
  },
  secondary: {
    backgroundColor: colors.lightPurple,
    color: colors.purple,
    border: `1px solid ${colors.lightPurple}`,
    '&:hover': {
      backgroundColor: colors.lightPurple,
      color: colors.secondaryPurple,
      borderColor: colors.lightPurple,
    },
    '&:focus': {
      backgroundColor: colors.lightPurple,
      color: colors.secondaryPurple,
      borderColor: colors.lightPurple,
    },
    '&:active': {
      backgroundColor: colors.lightPurple,
      color: colors.secondaryPurple,
      borderColor: colors.lightPurple,
    },
  },
  outline: {
    backgroundColor: 'transparent',
    color: colors.purple,
    border: `1px solid ${colors.purple}`,
    '&:hover': {
      backgroundColor: 'transparent',
      color: colors.secondaryPurple,
      borderColor: colors.secondaryPurple,
    },
    '&:focus': {
      backgroundColor: 'transparent',
      color: colors.secondaryPurple,
      borderColor: colors.secondaryPurple,
    },
    '&:active': {
      backgroundColor: 'transparent',
      color: colors.secondaryPurple,
      borderColor: colors.secondaryPurple,
    },
  },
  disabled: {
    backgroundColor: colors.inputGray,
    color: colors.disabledGray,
    cursor: 'not-allowed',
    '&:hover': {
      backgroundColor: colors.inputGray,
      color: colors.disabledGray,
      cursor: 'not-allowed',
    },
    '&:focus': {
      backgroundColor: colors.inputGray,
      color: colors.disabledGray,
      boxShadow: 'none',
      cursor: 'not-allowed',
    },
    '&:active': {
      backgroundColor: colors.inputGray,
      color: colors.disabledGray,
      cursor: 'not-allowed',
    },
  },
  // Button Sizes
  large: {
    padding: `${spacing.md} ${spacing.lg}`,
    fontSize: fontSizes.sm,
    minHeight: '52px',
    gap: spacing.sm,
  },
  medium: {
    padding: `${spacing.sd} ${spacing.md}`,
    fontSize: fontSizes.sm,
    minHeight: '44px',
    gap: spacing.xs,
  },
  small: {
    padding: `${spacing.md} ${spacing.sm}`,
    fontSize: fontSizes.xs,
    minHeight: '36px',
    gap: spacing.xs,
  },
});

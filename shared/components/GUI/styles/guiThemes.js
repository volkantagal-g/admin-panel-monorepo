export const active = '#05751F';
export const activeBg = '#EBF6ED';
export const danger = '#FF4D4F';
export const dangerBg = '#FFEFEF';
export const grey = '#D4D4D4';
export const inactive = '#F0F1F3';
export const placeholder = '#697488';
export const primary = '#5D3EBC';
export const primaryText = '#191919';
export const secondary = '#F3F0FE';
export const white = '#FFFFFF';
export const disabledBg = '#F5F5F5';
export const ternary = '#FF9800';
export const warning = '#F57C17';
export const warningBg = '#F6DBC4';
export const info = '#1890FF';

export const guiTheme = {
  borders: {
    divider: `1px solid ${grey}`,
    imageBorder: '1px solid #F6F6F6',
    galleryContainer: `1px solid ${grey}`,
  },
  common: {
    inputStyles: {
      height: '48px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '18px',
    },
    countryLanguageText: {
      fontWeight: 600,
      fontSize: '14px',
      color: primary,
    },
  },
  colors:
    {
      active: {
        color: active,
        backgroundColor: activeBg,
        borderColor: activeBg,
      },
      active_switch: {
        backgroundColor: '#008C20',
        color: white,
      },
      close: {
        backgroundColor: grey,
        color: primaryText,
      },
      danger: {
        color: danger,
        backgroundColor: dangerBg,
        borderColor: dangerBg,
      },
      default: {
        color: primary,
        backgroundColor: white,
        borderColor: primary,
      },
      defaultWithoutBorder: {
        color: primary,
        backgroundColor: white,
        borderColor: white,
      },
      inactive: {
        color: primaryText,
        backgroundColor: inactive,
        borderColor: inactive,
      },
      primary: {
        color: white,
        backgroundColor: primary,
      },
      secondary: {
        color: primary,
        backgroundColor: secondary,
        borderColor: secondary,
      },
      success: {
        color: active,
        backgroundColor: activeBg,
        borderColor: activeBg,
      },
      warning: {
        color: warning,
        backgroundColor: warningBg,
        borderColor: warningBg,
      },
      ternary: {
        color: white,
        backgroundColor: ternary,
        borderColor: ternary,
      },
      page_background: { backgroundColor: '#F0F2F5' },
      info: {
        color: white,
        backgroundColor: info,
        borderColor: info,
      },
      active_contrast: {
        backgroundColor: active,
        borderColor: active,
        color: white,
      },
    },
  size: {
    medium: {
      switch: { minWidth: '48px', height: '30px', circle: '26px' },
      tag: { padding: '4px 8px' },
      button: { padding: '12px 16px', doesHaveOnlyIconPadding: '16px' },
      table: { padding: '8px 8px' },
    },
    small: {
      switch: { minWidth: '36px', height: '24px', circle: '20px' },
      tag: { padding: '2px 6px' },
      button: { padding: '8px 16px', doesHaveOnlyIconPadding: '8px' },
      table: { padding: '12px 10px' },
    },
    'extra-small': {
      button: { padding: '2.5px 8px', doesHaveOnlyIconPadding: '6px' },
      tag: { padding: '1.5px 4px' },
    },
  },
  fontSize: {
    'extra-small': {
      button: { fontSize: '10px' },
      tag: { fontSize: '10px' },
    },
  },
};

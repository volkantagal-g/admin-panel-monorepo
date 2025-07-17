const primaryColor = '#5D3EBC';

const theme = {
  color: {
    primary: '#5D3EBC',
    disabledPrimary: '#BCAEE4',
    lightPrimary: '#7d64c9',
    darkPrimary: '#332267',
    getir: {
      purple: '#5D3EBC',
      yellow: '#FFD10D',
    },
    title: '#333333',
    lightGray: '#fafafa',
    edit: '#FFA726',
    error: '#ff4d4f',
    errorBgColor: '#ffccc7',
    disabled: 'rgba(0, 0, 0, 0.65)',
    success: '#01CC78',
    status: {
      success: '#5cb85c',
      warning: '#f0ad4e',
      artisan: '#1E7C38',
      danger: '#FF4D44',
    },
    white: '#FFFFFF',
    red: '#FF4D44',
    green: '#1E7C38',
    background: '#f0f2f5',
    offWhite: '#f7f7f759',
    secondaryText: '#58666e8c',
  },
  spacing: value => {
    return (4 * (value || 1));
  },
  height: {
    headerAndFooter: 48,
    scrollableTableBody: 400,
  },
  layout: { sidebarAndHeaderSize: 39 },
  border: { type1: '1px solid #f0f0f0' },
  iconButton: {
    type1: {
      cursor: 'pointer',
      color: '#757575',
      fontSize: 24,
      '&:hover, &:active': { color: primaryColor },
    },
  },
};

export default theme;

import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    bankCardSpace: { marginTop: '0px', width: '100%' },
    bankAccountInfo: { borderBottom: '1px solid #5D3EBC' },
    card: {
      '& .ant-card': { height: '100%' },
      '& .ant-card-body': { height: '100%' },
      height: '100%',
      '& .ant-collapse-arrow': { position: 'absolute', left: '-12px !important', fontSize: '14px !important', color: '#5D3EBC !important' },
      '& .ant-collapse-borderless': { backgroundColor: '#ffffff' },
      '& .ant-collapse-item': { borderBottom: 'none !important' },
      '& .ant-collapse-header': { padding: '0 !important' },
      '& .ant-collapse-content-box': { paddingRight: '0 !important' },
    },
    tooltip: { marginLeft: '4px' },
    panelHeader: { width: '100%' },
    panelHeaderTitle: { marginLeft: '4px' },
  };
});

import { createUseStyles } from 'react-jss';

export default createUseStyles({
  bottomLeft: {
    position: 'absolute',
    bottom: '0px',
    zIndex: '1001',
    height: '140px',
    marginBottom: '10px',
  },
  activeOrderAreaWrapper: {
    boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)',
    position: 'absolute',
    bottom: 45,
    borderRadius: '0 10px 0px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'center',
    backgroundColor: '#ffffff !important',
    '& .ant-collapse-item-active > .ant-collapse-content > .ant-collapse-content-box': { padding: '4px !important' },
  },
  headerSwitchArea: {
    height: '30px',
    borderBottom: '1px solid #dee5e7',
    padding: '5px 10px',
  },
  headerSwitchText: { paddingRight: '5px' },
});

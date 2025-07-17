import { createUseStyles } from 'react-jss';

export default createUseStyles({
  root: {
    weight: '100%',
    height: '100%',
    marginBottom: 0,
    backgroundColor: '#fff',
    '& span.ant-upload': { position: 'relative' },
    '& span.ant-upload:after': {
      position: 'absolute',
      zIndex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: '#00000080',
      opacity: 0,
      transition: 'all .3s ease-in',
      content: "''",
    },
    '&:hover span.ant-upload:after': { opacity: 1 },
    '&:hover svg': { opacity: 1 },
    '& .ant-upload.ant-upload-select-picture-card': {
      height: 100,
      width: 100,
      margin: '0 16px 0 0',
      padding: 0,
      borderRadius: 8,
      overflow: 'hidden',
    },
    '& img': { height: '100%' },
    '& svg': {
      width: 40,
      height: 40,
    },
  },
  icon: {
    zIndex: 10,
    margin: '0 4px',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all .3s ease-in',
    position: 'absolute',
    '& svg': { opacity: 0 },
  },
  uploadIcon: {
    '& svg': {
      width: 50,
      height: 50,
    },
  },
});

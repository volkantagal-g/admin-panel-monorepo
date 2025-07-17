import { createUseStyles } from 'react-jss';

export default createUseStyles({

  card: { borderRadius: '5px', boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.5)', marginBottom: '10px' },
  topDetailItem: { marginBottom: '5px' },
  compLink: {
    marginRight: '5px',
    '&:last-child': { marginRight: '0px' },
    '&:after': { content: '" ,"' },
    '&:last-child:after': { content: '""' },
  },
  filesCard: {
    composes: '$card',
    '& .ant-card-body': {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      '& > *': {
        marginRight: '10px',
        marginBottom: '10px',
        '&:last-child': { marginRight: '0px' },
      },
    },
  },
  fileTag: {
    '& > a': {
      display: 'flex !important',
      alignItems: 'center !important',
      justifyContent: 'center !important',
      padding: '8px !important',
      color: '#5D3EBC !important',
    },
    backgroundColor: 'rgba(93, 62, 188, 0.05);',
    '& > a > *': { marginRight: '15px' },
    '& > a > *:last-child': { marginRight: '0px' },
  },
  langKeys: {
    display: 'flex',
    alignItems: 'center',
    '& > *': {
      marginRight: '5px',
      padding: '2px 5px',
      borderRadius: '8px',
      backgroundColor: '#5D3EBC',
      color: 'white',
    },
  },
});

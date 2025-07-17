import { createUseStyles } from 'react-jss';

export default createUseStyles({
  pageContainer: {
    width: '100%',
    '&  h1': { fontSize: '2.5em' },
    '&  h2': { fontSize: '1.5em' },
  },
  guidesCard: {
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
    '& > .ant-card-head': { fontWeight: 'bold', minHeight: 'unset' },
    '& > .ant-card-head .ant-card-head-title': { padding: '0.5rem' },
    '& > .ant-card-body': { padding: '0.5rem' },
    minHeight: '100px',
  },
  guide: {
    width: 250,
    height: 270,
    display: 'flex',
    flexDirection: 'column',
    filter: 'drop-shadow(0px 14px 24px rgba(105, 116, 136, 0.2))',
    boxShadow: 'rgba(0, 0, 0, 0.55) 0px 2px 4px',
    '& .ant-card-head': { minHeight: 'auto !important' },
    '& .ant-card-body': {
      height: '100% !important',
      paddingBottom: 0,
    },
    '& .ant-card-extra': { minHeight: 'auto !important', display: 'flex', alignItems: 'center', padding: '4px' },
    '& .ant-card-actions': { borderTop: 'none' },
    '& .ant-card-meta-title': { fontSize: 16, whiteSpace: 'unset' },
  },
  noGuides: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailButton: {
    padding: '0 6px',
    '& > button': { borderRadius: 6 },
  },
});

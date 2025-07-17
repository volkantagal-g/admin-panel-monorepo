import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 24,
    marginBottom: 24,
    gap: 12,

    '& .ant-alert-message': { fontWeight: 700 },
    '& .ant-alert-description': { fontSize: 13 },
  },
  title: {
    textAlign: 'center',
    color: theme.color.title,
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: 1.6,
    borderBottom: '1px solid rgba(0 0 0 / 0.1)',
    position: 'relative',

    '&:before': {
      content: '""',
      display: 'inline-block',
      width: 48,
      height: '2px',
      backgroundColor: theme.color.primary,
      position: 'absolute',
      bottom: -1,
      left: '50%',
      transform: 'translateX(-50%)',
    },
  },
  rules: {
    color: theme.color.title,
    marginTop: 12,
    fontWeight: 400,
    fontSize: 13,

    '& h2': {
      textAlign: 'center',
      fontWeight: 700,
      fontSize: '16px',
      lineHeight: 1.6,
    },
  },
  timeline: {
    alignSelf: 'center',
    '& .ant-timeline-item-tail': { borderLeft: '2px solid rgba(0 0 0 / 0.1)' },
  },
  callStatus: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 2,
    columnGap: 4,
    borderRadius: 8,
    backgroundColor: theme.color.lightGray,
    padding: 8,

    '& :nth-child(odd)': { fontWeight: 700 },
  },
  alertDescription: {
    fontSize: 13,

    '& h3': { fontSize: 'inherit' },
  },
}));

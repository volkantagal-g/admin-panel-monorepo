import { createUseStyles } from 'react-jss';

import { DEVELOPMENT_BG_COLOR } from '../../constants';

export default createUseStyles(theme => ({
  button: {
    display: 'flex',
    '@media (max-width: 768px)': { display: props => (props.isSidebarCollapsed ? 'flex' : 'none') },
    alignItems: 'center',
    justifyContent: 'center',
    '& > :not(:last-child)': { marginRight: '0.25rem' },
  },
  numberPending: { '& .ant-spin-dot-item': { backgroundColor: 'white' } },
  numberOfDocs: {
    backgroundColor: 'white',
    color: props => (props.isDev ? DEVELOPMENT_BG_COLOR : theme.color.primary),
    borderRadius: '50%',
    padding: '0 0.35rem',
  },
  noNumberOfDocs: { width: '18px' },
  docsTabs: {
    padding: '4px 8px',
    backgroundColor: '#fff',
    borderRadius: '2px',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
    zIndex: '12',
    border: '1px solid #e8e8e8',
    maxWidth: '90vw',
    width: '500px',
  },
  docsMenu: {
    maxHeight: '275px',
    overflowY: 'auto',
    paddingRight: '8px',
    '& .ant-list-item': {
      paddingTop: '6px',
      paddingRight: '6px',
    },
  },
  menuItem: {
    fontSize: '12px !important',
    '& .ant-list-item-meta-avatar': { marginRight: '4px' },
    '& .ant-list-item-meta-content': { marginLeft: 12 },
  },
  menuItemIcon: {
    fontSize: '20px',
    color: theme.color.getir.purple,
  },
  lastUpdatedText: {
    fontSize: 11,
    textAlign: 'end',
    marginRight: 8,
  },
  allDocumentsLink: {
    position: 'absolute',
    color: '#58666E',
    zIndex: 1,
    top: 16,
    right: 8,
  },
  pageOwnersSkeleton: {
    display: 'inline-block',
    height: 15.5,
    width: 350,
    padding: 4,
  },
}));

import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
  buttonAddField: {
    position: 'absolute',
    bottom: theme.spacing(3),
    right: '0',
  },
  buttonDeleteField: {
    '&:hover': {
      color: theme.color.red,
      borderColor: theme.color.red,
    },
  },
  fieldRow: {
    position: 'relative',
    padding: `0 0 ${theme.spacing(9)}px 0`,
    margin: `${theme.spacing(3)} 0 0 0`,
    '&:before': {
      content: '""',
      width: '100%',
      position: 'absolute',
      height: '1px',
      background: '#D9D9D9',
      display: 'block',
      bottom: theme.spacing(6),
    },
    '& $buttonAddField': { display: 'none' },
    '&:hover $buttonAddField': { display: 'block' },
  },
  fieldRowSummaryContent: { opacity: 1 },
  fieldRowFlaggedForDeletion: { '& $fieldRowSummaryContent': { opacity: '0.5' } },
  fieldRowHasError: {
    '& .button-edit-field': {
      color: theme.color.red,
      borderColor: theme.color.red,
    },
  },
  fieldActionsDropdown: {
    '& .ant-dropdown-menu-item-disabled': {
      color: 'rgba(0, 0, 0, .25)',
      cursor: 'not-allowed',
    },
  },
  formIsEditing: { '& $fieldRow:hover $buttonAddField': { display: 'none' } },
}));

import { createUseStyles } from 'react-jss';

export default createUseStyles({
  formError: { textAlign: 'left', color: 'red' },
  feedbackTitle: { border: '1px solid transparent' },
  modalTitleResolveText: {
    color: '#52c41a',
    paddingLeft: '5px',
    '& span': { paddingLeft: '2px' },
  },
  createdDetailsText: { textAlign: 'center' },
});

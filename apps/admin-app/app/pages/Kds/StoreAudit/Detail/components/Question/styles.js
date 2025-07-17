import { createUseStyles } from 'react-jss';

export default createUseStyles({
  questionWrapper: { margin: '10px 0' },
  questionTextWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  questionText: { marginLeft: '10px' },
  answerOptionsContainer: { '&>div': { margin: '10px' } },
  auditNoteContainer: { margin: '10px' },
  auditImageUploadContainer: { margin: '10px' },
  photoForcedIconContainer: { marginRight: '5px' },
  error: { border: '1px solid red !important' },
  infoIcon: { color: '#67a7e7' },
  checkIcon: { color: '#52c41a' },
  warningIcon: { color: '#F39B11' },
  questionHeaderAnswer: { margin: '0 10px', padding: '0 6px', border: '1px solid #D9D9D9', borderRadius: '4px' },
  questionHeaderAnswerIsHighlighted: { color: '#991b1b', background: '#fee2e2', borderColor: '#991b1b' },
});

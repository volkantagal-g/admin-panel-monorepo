import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    added: { background: 'rgba(56, 158, 13, 0.2)' },
    updated: { background: 'rgba(255, 230, 0, 0.2)' },
    deleted: { background: 'rgba(252, 0, 0, 0.2)' },
    scrollArea: { maxHeight: 300, overflow: 'scroll' },
  };
});

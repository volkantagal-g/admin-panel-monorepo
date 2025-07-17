const TYPE = {
  DEFAULT: 'default',
  DANGER: 'danger',
  PRIMARY: 'primary',
  MUTED: 'muted',
};

const TYPE_COLORS = {
  [TYPE.DEFAULT]: { background: '#FFFFFF', text: '' },
  [TYPE.PRIMARY]: { background: 'rgba(93, 62, 188, 0.2)', text: '#332267' },
  [TYPE.DANGER]: { background: 'rgba(226, 55, 55, 0.2)', text: '#7C1E1E' },
  [TYPE.MUTED]: { background: 'rgba(25, 59, 103, 0.05)', text: '#1B2B41B0' },
};

export { TYPE, TYPE_COLORS };

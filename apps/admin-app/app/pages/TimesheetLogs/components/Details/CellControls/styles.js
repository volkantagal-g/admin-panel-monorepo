import { createUseStyles } from 'react-jss';

export default createUseStyles({
  wrapperCommon: {
    display: 'grid',
    gap: 5,
    alignItems: 'center',
    padding: 5,
    borderRadius: 2,
  },
  wrapperReadOnlyStyle: { gridTemplateColumns: '1fr 1fr auto' },
  fullwidth: {
    gridColumn: '1/-1',
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    width: '100%',
  },
  borderRed: { border: '1px solid red' },
  readOnlyBreakInfo: {
    display: 'flex',
    gridColumn: '1/-1',
    justifyContent: 'space-between',
  },
  iconButton: { cursor: 'default' },
});

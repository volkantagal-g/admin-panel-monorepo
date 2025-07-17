import { createUseStyles } from 'react-jss';

export default createUseStyles({
  // outer div so that we can pin the arrows absolutely
  outerDiv: {
    position: 'relative',
    overflow: 'hidden',
  },
  container: {
    width: 'calc(100% - 8px)',
    display: 'flex',
    alignItems: 'stretch',
    flexShrink: 0,
    padding: '8px',
    margin: '8px 4px',
    border: '2px solid rgb(240, 240, 240)',
    borderRadius: '4px',
    backgroundColor: 'rgb(250, 250, 250)',
    overflowX: 'auto',
    // we have arrows for scroll, hide scrollbar
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': { display: 'none' },

    '& > :not(button)': { flexShrink: 0, marginRight: '10px' },
    '& > :not(button):first-of-type': { marginLeft: '8px' },
    '& > :not(button):last-of-type': { marginRight: '8px' },
    '& > button:first-child': {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
    },
    '& > button:last-child': {
      position: 'absolute',
      top: '50%',
      transform: props => `translate(calc(${props.containerClientWidth - 16}px - 100%), -50%)`,
    },
  },
  item: { flexShrink: 0 },
  arrowButton: {
    border: 'none',
    backgroundColor: 'transparent',
    display: props => (props.isScrollable ? 'block' : 'none'),
    zIndex: 500,
    padding: 0,
    '& > *': {
      color: 'rgba(0,0,0,0.4)',
      cursor: 'pointer',
    },
  },
});

import { useCallback, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  backdrop: {
    display: props => (props.desktopVisible ? 'block' : 'none'),
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: props => props.bgColor,
    zIndex: props => props.zIndex,
    '@media (max-width: 768px)': { display: props => (props.mobileVisible ? 'block' : 'none') },
  },
});

export const MEDIA_TYPES = {
  DESKTOP: 'desktop',
  MOBILE: 'mobile',
  ALL: 'all',
};

// Full viewport modal overlay, use a z-index which is below modal's z-index
export default function useModalBackdrop({ isShown, zIndex, media = MEDIA_TYPES.ALL, bgColor = 'rgba(0, 0, 0, 0.5)' }) {
  if (zIndex == null) {
    throw new Error('zIndex is required');
  }
  const [deferredIsShown, setDeferredIsShown] = useState(false);

  useEffect(() => {
    if (isShown) {
      setDeferredIsShown(true);
    }
    else {
      // dissappear should be delayed
      // so that the mouse click interaction doesn't happen with background when clicking on the backdrop
      setTimeout(() => {
        setDeferredIsShown(false);
      }, 100);
    }
  }, [isShown]);

  const desktopVisible = deferredIsShown && (media === MEDIA_TYPES.DESKTOP || media === MEDIA_TYPES.ALL);
  const mobileVisible = deferredIsShown && (media === MEDIA_TYPES.MOBILE || media === MEDIA_TYPES.ALL);

  const classes = useStyles({ desktopVisible, mobileVisible, zIndex, media, bgColor });

  const BackdropComponent = useCallback(() => <div className={classes.backdrop} />, [classes.backdrop]);

  return { BackdropComponent };
}

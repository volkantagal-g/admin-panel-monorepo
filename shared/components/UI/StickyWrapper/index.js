import { useEffect, useState } from "react";

import useStyles from './styles';

function StickyWrapper(props) {
  const {
    children,
    targetItemID,
  } = props;
  const classes = useStyles();

  const [isSticky, setIsSticky] = useState(false);

  const handlePosition = () => {
    const _scrollPosition = window.scrollY;
    const _targetNodePosition = document.getElementById(targetItemID)?.offsetTop;
    if (_scrollPosition + window.innerHeight > _targetNodePosition) {
      setIsSticky(false);
    }
    else {
      setIsSticky(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handlePosition);
    return () => {
      window.removeEventListener("scroll", handlePosition);
    };
  }, []);

  return (
    <div
      className={isSticky ? classes.stickyContainer : classes.unStickyPosition}>
      {children}
    </div>
  );
}

export default StickyWrapper;

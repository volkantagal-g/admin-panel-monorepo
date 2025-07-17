import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useLayoutEffect, useRef, useState } from 'react';

import useStyles from './styles';

// 5px approximation
const ROUND_ERROR_EPSILON = 5;

export default function CarouselSlider({ children, ...containerProps }) {
  const [isScrollable, setIsScrollable] = useState(false);
  const [containerClientWidth, setClientWidth] = useState(360);
  const [containerScollLeft, setContainerScrollLeft] = useState(0);
  const classes = useStyles({ isScrollable, containerClientWidth });

  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const resizeObserver = new ResizeObserver(() => {
      const { clientWidth, scrollWidth, scrollLeft } = container;
      const isScrollable1 = scrollWidth > clientWidth + ROUND_ERROR_EPSILON;

      setIsScrollable(isScrollable1);
      setClientWidth(clientWidth);
      setContainerScrollLeft(scrollLeft);
    });
    resizeObserver.observe(container);

    const listener = () => {
      setContainerScrollLeft(container.scrollLeft);
    };

    container.addEventListener('scroll', listener);
    return () => {
      resizeObserver.disconnect();
      container.removeEventListener('scroll', listener);
    };
  }, []);

  // if there is only one child, it is not an array, so convert it
  const childItems = Array.isArray(children) ? children : [children];

  return (
    <div className={classes.outerDiv}>
      <div
        className={classes.container}
        {...containerProps}
        ref={containerRef}
      >
        <button type="button" className={classes.arrowButton} onClick={onLeftButtonClick}>
          <LeftOutlined style={{ fontSize: '3rem' }} />
        </button>
        {childItems.map(child => {
          if (child.key == null) {
            throw new Error('CarouselSlider children must have a key');
          }

          return (
            <div key={child.key} className={classes.item}>
              {child}
            </div>
          );
        })}
        <button type="button" className={classes.arrowButton} onClick={onRightButtonClick}>
          <RightOutlined style={{ fontSize: '3rem' }} />
        </button>
      </div>
    </div>

  );

  function onLeftButtonClick() {
    const container = containerRef.current;
    container.scroll({ left: containerScollLeft - (containerClientWidth / 3), behavior: 'smooth' });
  }

  function onRightButtonClick() {
    const container = containerRef.current;
    container.scroll({ left: containerScollLeft + (containerClientWidth / 3), behavior: 'smooth' });
  }
}

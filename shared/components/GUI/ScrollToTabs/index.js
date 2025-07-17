import PropTypes from 'prop-types';
import { createRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button } from '@shared/components/GUI/Button';
import { Space } from '@shared/components/GUI/Space';

import useStyles from './styles';

export const ScrollToTabs = ({ items }) => {
  const isFirstLoad = useRef(true);
  const [queryParams, setQueryParams] = useSearchParams();
  const scrollToTab = queryParams.get('scrollToTab');
  const [activeTabDimensions, setActiveTabDimensions] = useState();
  const classes = useStyles({ ...activeTabDimensions });
  const tabRefs = useMemo(
    () => (items.reduce((acc, value) => {
      acc[value.id] = createRef();
      return acc;
    }, {})),
    [items],
  );
  const tabContentRefs = useMemo(() => items.reduce((acc, value) => {
    acc[value.id] = createRef();
    return acc;
  }, {}), [items]);

  const handleScrollToTab = useCallback(
    id => {
      tabContentRefs[id]?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    },
    [tabContentRefs],
  );

  const handleOnClickTab = id => {
    const { offsetWidth, offsetLeft } = tabRefs[id].current;
    queryParams.set('scrollToTab', id);
    setQueryParams(queryParams);
    setActiveTabDimensions({ offsetWidth, offsetLeft });
    handleScrollToTab(id);
  };

  useEffect(() => {
    if (isFirstLoad.current) {
      handleScrollToTab(scrollToTab);
      const itemRef = (tabRefs[scrollToTab] || tabRefs[items?.[0]?.id]);
      const item = itemRef?.current;
      if (item) {
        const { offsetWidth } = item.querySelector('span');
        const { offsetLeft } = item;
        setActiveTabDimensions({ offsetWidth, offsetLeft });
      }
    }

    return () => {
      isFirstLoad.current = false;
    };
  }, [handleScrollToTab, items, scrollToTab, tabRefs]);

  if (!items?.length) return null;

  return (
    <div>
      <div className={classes.tabs}>
        {items.map(({ id, label }) => (
          <div key={id} ref={tabRefs[id]} className={classes.tab}>
            <Button
              type="text"
              color="defaultWithoutBorder"
              onClick={() => handleOnClickTab(id)}
            >
              {label}
            </Button>
          </div>
        ))}
        <div className={classes.line} />
      </div>
      <div className={classes.tabContent}>
        {items.map(({ children, id }) => <div key={id} ref={tabContentRefs[id]}><Space>{children}</Space></div>)}
      </div>
    </div>
  );
};

const TabItem = {
  id: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.node,
};

ScrollToTabs.propTypes = { items: PropTypes.arrayOf(PropTypes.shape(TabItem)).isRequired };

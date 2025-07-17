import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from 'antd';

import { Creators as CoreCreators } from '@shared/redux/actions/core';
import { searchPanelDocsSelector } from '@shared/redux/selectors/core';
import { usePermission } from '@shared/hooks';

import { getFormattedPanelDoc } from './utils';
import useStyles from './styles';

export default function PanelDocList({ validatedSearchText, isActive }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { canAccess } = usePermission();

  const lastFetchedSearchText = useRef(null);

  const panelDocs = useSelector(searchPanelDocsSelector.getData);
  const panelDocsPending = useSelector(searchPanelDocsSelector.getIsPending);

  useEffect(() => {
    if (!validatedSearchText || !isActive) return;
    if (lastFetchedSearchText.current === validatedSearchText) return;
    lastFetchedSearchText.current = validatedSearchText;
    dispatch(CoreCreators.searchPanelDocsRequest({ searchText: validatedSearchText }));
  }, [dispatch, validatedSearchText, isActive]);

  const shownPanelDocs = validatedSearchText ? panelDocs : [];

  return (
    <div className={classes.panelDocsContainer}>
      <Skeleton loading={panelDocsPending} active>
        <div className={classes.panelDocList}>
          { shownPanelDocs.map(p => getFormattedPanelDoc(p, canAccess)) }
        </div>
      </Skeleton>
    </div>
  );
}

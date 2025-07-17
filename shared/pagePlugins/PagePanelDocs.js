import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { usePermission } from '@shared/hooks';
import { Creators } from '@shared/redux/actions/common';
import permKey from '@shared/shared/permKey.json';

import { getCurrentPageDocsSelector, getCurrentPagePermKeySelector, getCurrentPageSelector } from '@shared/redux/selectors/common';

const WAIT_MS = 1000;

function PagePanelDocs({ routeKey }) {
  const dispatch = useDispatch();
  const { getPagePermKey } = usePermission();

  const pagePermKey = getPagePermKey(routeKey);
  const currentPagePermKey = useSelector(getCurrentPagePermKeySelector);

  useEffect(() => {
    // after route change, set the current page's permKey to redux
    if (pagePermKey !== currentPagePermKey) {
      dispatch(Creators.setCurrentPagePermKey({ permKey: pagePermKey }));
    }
  }, [dispatch, pagePermKey, currentPagePermKey]);

  const currentPage = useSelector(getCurrentPageSelector.getData);
  const currentPageDocs = useSelector(getCurrentPageDocsSelector.getData);

  useEffect(() => {
    let isMounted = true;
    // Try not to block page data requests, docs can wait
    setTimeout(() => {
      // if we already visited and fetched, don't fetch again
      if (!currentPage) {
        if (!isMounted) return;
        dispatch(Creators.getCurrentPageRequest({ permKey: pagePermKey }));
      }
    }, WAIT_MS);

    return () => {
      isMounted = false;
    };
  }, [dispatch, currentPage, pagePermKey]);

  useEffect(() => {
    // If we already visited a route don't bother fetching
    if (currentPage?.permKey === pagePermKey && !currentPageDocs) {
      dispatch(Creators.getCurrentPageDocsRequest({ pageId: currentPage._id, permKey: pagePermKey }));
    }
  }, [dispatch, currentPage, currentPageDocs, pagePermKey]);

  return null;
}

export default function PermissionWrapper(props) {
  const { Can } = usePermission();

  return (
    // Only fetch documents for users with permission to see them
    <Can permKey={permKey.PAGE_PANEL_DOC_SEARCH}>
      <PagePanelDocs {...props} />
    </Can>
  );
}

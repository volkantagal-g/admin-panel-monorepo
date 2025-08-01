import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { selectProductLoading } from '@app/pages/MarketProductChainManagement/Products/Detail/redux/reducer';
import useStyles from './styles';

const Content = ({ pageContent, loading: propLoading }) => {
  const classes = useStyles();
  const [isVisible, setIsVisible] = useState(false);

  // Get all loading states from reducer
  const {
    fetch: isFetching,
    darkStores: isDarkStoresLoading,
    suppliers: isSuppliersLoading,
    warehouses: isWarehousesLoading,
  } = useSelector(selectProductLoading);

  // Check if any loading state is true
  const isLoading = isFetching || isDarkStoresLoading || isSuppliersLoading || isWarehousesLoading || propLoading;

  useEffect(() => {
    if (isLoading) {
      setIsVisible(true);
      return undefined;
    }

    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [isLoading]);

  return (
    <div className={classNames(classes.content, { loading: isLoading })}>
      <div className={classNames(classes.loadingIndicator, { visible: isVisible })} />
      {pageContent}
    </div>
  );
};

export default Content;

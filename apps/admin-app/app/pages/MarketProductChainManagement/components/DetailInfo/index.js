import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import InfoCard from './components/InfoCard';
import { useDetailInfo } from './hooks/useDetailInfo';
import useStyles from './styles';

/**
 * Skeleton loader for DetailInfo cards
 * @param {Object} props - Component props
 * @param {string} props.detailType - Type of detail being displayed
 * @param {string} props.className - Additional class names
 * @returns {React.ReactElement} Skeleton loader component
 */
const DetailInfoSkeleton = React.memo(({ detailType, className }) => {
  const SKELETON_COUNT = 6;
  const skeletonArray = Array.from({ length: SKELETON_COUNT }, (_, i) => `${detailType}-skeleton-${i}`);

  return (
    <div className={className} data-testid="detail-info-skeleton">
      {skeletonArray.map(uniqueId => (
        <InfoCard
          key={uniqueId}
          loading
          title="loading"
          content=""
        />
      ))}
    </div>
  );
});

DetailInfoSkeleton.propTypes = {
  detailType: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

DetailInfoSkeleton.displayName = 'DetailInfoSkeleton';

/**
 * Content section for DetailInfo cards
 * @param {Object} props - Component props
 * @param {Array} props.items - Array of items to display
 * @param {string} props.className - Additional class names
 * @returns {React.ReactElement} Content component
 */
const DetailInfoContent = React.memo(({ items, className }) => (
  <div className={className} data-testid="detail-info">
    {items.map(({ key, icon, title, content }) => (
      <InfoCard
        key={key}
        icon={icon}
        title={title}
        content={content}
        loading={false}
      />
    ))}
  </div>
));

DetailInfoContent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    content: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
  })).isRequired,
  className: PropTypes.string.isRequired,
};

DetailInfoContent.displayName = 'DetailInfoContent';

/**
 * DetailInfo component displays information cards in a grid layout
 * @param {Object} props - Component props
 * @param {Object} props.data - Data to be displayed
 * @param {string} props.detailType - Type of detail being displayed
 * @returns {React.ReactElement} DetailInfo component
 */
const DetailInfo = ({ data, detailType }) => {
  const classes = useStyles();
  const { items, hasReducedItems } = useDetailInfo(data, detailType);
  const isLoading = !data || !Object.keys(data).length;

  const wrapperClassName = classNames(classes.rowWrapper, { reducedItems: hasReducedItems });

  if (isLoading) {
    return (
      <DetailInfoSkeleton
        detailType={detailType}
        className={wrapperClassName}
      />
    );
  }

  return (
    <DetailInfoContent
      items={items}
      className={wrapperClassName}
    />
  );
};

DetailInfo.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ tr: PropTypes.string, en: PropTypes.string }),
    ]),
    domainTypes: PropTypes.arrayOf(PropTypes.number),
    demographies: PropTypes.arrayOf(PropTypes.number),
    sizes: PropTypes.arrayOf(PropTypes.number),
    category: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ tr: PropTypes.string, en: PropTypes.string }),
    ]),
    segment: PropTypes.number,
    isLocal: PropTypes.bool,
    warehouseType: PropTypes.number,
  }),
  detailType: PropTypes.string.isRequired,
};

DetailInfo.defaultProps = { data: null };

DetailInfo.displayName = 'DetailInfo';

export default React.memo(DetailInfo);

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Skeleton } from 'antd';
import classNames from 'classnames';

import useStyles from './styles';

/**
 * InfoCard component displays information with icon and content
 * @param {Object} props - Component props
 * @param {string} props.icon - Icon URL
 * @param {string} props.title - Card title
 * @param {string|number|boolean|Array} props.content - Card content
 * @param {boolean} props.loading - Loading state
 * @returns {React.ReactElement} InfoCard component
 */
const InfoCard = ({ icon, title, content, loading }) => {
  const { t } = useTranslation('marketProductChainManagement');
  const classes = useStyles();

  const translatedTitle = t(`COLUMNS.${title}`);
  const imageAlt = t(`COLUMNS.${title}`);

  const renderContent = () => {
    if (Array.isArray(content)) {
      return content.map(item => (
        <span key={item} className={classes.domainTag}>
          {item}
        </span>
      ));
    }
    return content;
  };

  return (
    <div className={classes.cardContainer} data-testid="info-card">
      <div className={classNames(classes.contentWrapper, { [classes.loading]: loading })}>
        {loading ? (
          <div className={classes.skeletonLayer}>
            <Skeleton.Avatar
              active
              size={40}
              shape="circle"
              className={classes.skeletonAvatar}
            />
            <div className={classes.skeletonContent}>
              <Skeleton.Input
                active
                size="small"
                className={classes.skeletonTitle}
              />
              <Skeleton.Input
                active
                size="small"
                className={classes.skeletonValue}
              />
            </div>
          </div>
        ) : (
          <div className={classes.contentLayer}>
            <div className={classes.iconSection}>
              {icon ? (
                <div className={classes.imageWrapper}>
                  <img src={icon} alt={imageAlt} className={classes.icon} />
                </div>
              ) : (
                <div className={classes.placeholderIcon}>
                  {translatedTitle.charAt(0)}
                </div>
              )}
            </div>
            <div className={classes.textSection}>
              <div className={classes.title}>{translatedTitle}</div>
              <div className={classes.content}>{renderContent()}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

InfoCard.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  loading: PropTypes.bool,
};

InfoCard.defaultProps = {
  icon: null,
  loading: false,
};

InfoCard.displayName = 'InfoCard';

export default React.memo(InfoCard);

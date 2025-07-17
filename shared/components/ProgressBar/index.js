import PropTypes from 'prop-types';
import { Tooltip } from 'antd';

import useStyles from '@shared/components/ProgressBar/styles';

const ProgressBar = ({ progressBarItems }) => {
  const classes = useStyles();

  const isLastItem = index => progressBarItems.length > 1 && index === progressBarItems.length - 1;

  const handleMouseEnter = e => {
    const element = e.currentTarget;
    const text = element.firstChild;
    const elementWidth = element.offsetWidth;
    const textWidth = text.offsetWidth;

    if (textWidth > elementWidth) {
      element.style.width = `${textWidth + 20}px`;
    }
  };

  const handleMouseLeave = (e, percentage) => {
    e.currentTarget.style.width = `${percentage}%`;
  };

  return (
    <div className={classes.progressBar}>
      {
        progressBarItems.map(({ color, percentage, tooltipText, text, key }, i) => (
          <div
            key={key}
            className={classes.progressBarItem}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={e => handleMouseLeave(e, percentage)}
            style={{
              width: `${percentage}%`,
              ...(color && { backgroundColor: color }),
            }}
          >
            {
              tooltipText ? (
                <Tooltip title={tooltipText} placement={isLastItem(i) ? 'bottomRight' : 'bottom'}>
                  {text}
                </Tooltip>
              ) : <span>{text}</span>
            }
          </div>
        ))
      }
    </div>
  );
};

ProgressBar.propTypes = {
  progressBarItems: PropTypes.arrayOf(
    PropTypes.shape({
      percentage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      color: PropTypes.string,
      tooltipText: PropTypes.string,
      text: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default ProgressBar;

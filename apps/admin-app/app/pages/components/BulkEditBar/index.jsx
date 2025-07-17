import { Button } from 'antd';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import CircleMatchIcon from '@app/pages/CommerceIntelligence/assets/icons/circleMatch.svg';
import GrayCloseIcon from '@app/pages/CommerceIntelligence/assets/icons/grayClose.svg';
import GrayTrashIcon from '@app/pages/CommerceIntelligence/assets/icons/grayTrash.svg';
import { TRANSLATION_NAMESPACE } from '@app/pages/CommerceIntelligence/constants';
import useStyles from './styles';

const BulkEditBar = ({
  selectedCount,
  onCancel,
  onDelete,
  onMatch,
}) => {
  const classes = useStyles();
  const { t } = useTranslation(TRANSLATION_NAMESPACE);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (selectedCount > 0 && !shouldRender) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
      return undefined;
    }

    if (selectedCount === 0 && shouldRender) {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 200);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [selectedCount, shouldRender]);

  const handleCancel = () => {
    setIsVisible(false);
    setTimeout(() => {
      onCancel();
    }, 200);
  };

  const handleDelete = () => {
    onDelete();
  };

  const handleMatch = () => {
    onMatch();
  };

  if (!shouldRender) return null;

  return (
    <div className={classes.wrapper}>
      <div className={classNames(classes.container, { [classes.visible]: isVisible })}>
        <div className={classes.content}>
          <div className={classes.info}>
            <span className={classes.count}>{selectedCount}</span>
            <span className={classes.text}>{t('MATCHINGS_SELECTED')}</span>
          </div>
          <div className={classes.actions}>
            <Button
              onClick={handleDelete}
              className={classes.deleteButton}
            >
              <img src={GrayTrashIcon} alt="delete" />
              {t('DELETE')}
            </Button>
            <Button
              onClick={handleMatch}
              className={classes.matchButton}
            >
              <img src={CircleMatchIcon} alt="match" />
              {t('DIRECT_MATCH')}
            </Button>
          </div>
          <div className={classes.closeButton}>
            <div
              onClick={handleCancel}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleCancel();
                }
              }}
              tabIndex={0}
              role="button"
            >
              <img src={GrayCloseIcon} alt="close" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkEditBar;

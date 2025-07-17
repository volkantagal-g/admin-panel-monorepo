import { Button } from 'antd';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import CircleMatchIcon from '@app/pages/CommerceIntelligence/assets/icons/circleMatch.svg';
import GrayCloseIcon from '@app/pages/CommerceIntelligence/assets/icons/grayClose.svg';
import GrayTrashIcon from '@app/pages/CommerceIntelligence/assets/icons/grayTrash.svg';
import { TRANSLATION_NAMESPACE } from '@app/pages/CommerceIntelligence/constants';
import useStyles from './styles';

const ANIMATION_DURATION = 200;

const BulkEditBar = ({
  selectedCount,
  onCancel,
  onDelete,
  onMatch,
}) => {
  const classes = useStyles();
  const { t } = useTranslation(TRANSLATION_NAMESPACE);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldMount, setShouldMount] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (selectedCount > 0 && !shouldMount) {
      setShouldMount(true);
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
      return undefined;
    }

    if (selectedCount === 0 && shouldMount) {
      setIsVisible(false);
      timerRef.current = setTimeout(() => {
        setShouldMount(false);
      }, ANIMATION_DURATION);
      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      };
    }
    return undefined;
  }, [selectedCount, shouldMount]);

  const handleCancel = () => {
    setIsVisible(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      onCancel();
    }, ANIMATION_DURATION);
  };

  const handleDelete = () => {
    onDelete();
  };

  const handleMatch = () => {
    onMatch();
  };

  if (!shouldMount) return null;

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
              <img src={GrayTrashIcon} alt={t('DELETE')} />
              {t('DELETE')}
            </Button>
            <Button
              onClick={handleMatch}
              className={classes.matchButton}
            >
              <img src={CircleMatchIcon} alt={t('MATCH')} />
              {t('MATCH')}
            </Button>
          </div>
          <button
            type="button"
            onClick={handleCancel}
            className={classes.closeButton}
            aria-label={t('CLOSE')}
          >
            <img src={GrayCloseIcon} alt={t('CLOSE')} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkEditBar;

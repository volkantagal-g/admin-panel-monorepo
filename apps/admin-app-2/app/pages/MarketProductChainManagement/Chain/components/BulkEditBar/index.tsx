import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import BulkEditDrawer from '../BulkEditDrawer';
import useStyles from './styles';
import { Creators } from '../../redux/actions';
import { REDUX_STORE_KEYS } from '@app/pages/MarketProductChainManagement/constants';

interface BulkEditBarProps {
  selectedCount: number;
  onCancel: () => void;
}

const BulkEditBar: React.FC<BulkEditBarProps> = ({
  selectedCount,
  onCancel,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation('marketProductChainManagement');
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // Redux state'i kullan
  const isBulkEditMode = useSelector((state: any) => state[REDUX_STORE_KEYS.CHAIN]?.isBulkEditMode || false);

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

  const handleEdit = () => {
    // Drawer'ı açmak için redux action'ı dispatch et
    dispatch(Creators.openBulkEditDrawer());
  };

  if (!shouldRender) return null;

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classNames(classes.container, { [classes.visible]: isVisible })}>
          <div className={classes.content}>
            <div className={classes.info}>
              <span className={classes.count}>{selectedCount}</span>
              <span className={classes.text}>{t('CHAINS_SELECTED')}</span>
            </div>
            <div className={classes.actions}>
              <Button
                onClick={handleCancel}
                type="default"
              >
                {t('BUTTONS.CANCEL')}
              </Button>
              <Button
                onClick={handleEdit}
                type="primary"
              >
                {t('BUTTONS.EDIT')}
                <EditOutlined />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* BulkEditDrawer artık isBulkEditMode state'i ile kontrol ediliyor */}
      <BulkEditDrawer
        selectedCount={selectedCount}
      />
    </>
  );
};

export default BulkEditBar;

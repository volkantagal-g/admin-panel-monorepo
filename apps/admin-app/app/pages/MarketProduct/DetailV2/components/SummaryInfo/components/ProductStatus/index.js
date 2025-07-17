import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';

import { Switch } from '@shared/components/GUI';
import {
  getMarketProductByIdSelector,
  updateMarketProductSelector, getActivateProductsSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import useConfirmationModal from '@app/pages/MarketProduct/DetailV2/hooks/useConfirmationModal';
import { usePermission } from '@shared/hooks';

import permKey from '@shared/shared/permKey.json';
import { MARKET_PRODUCT_STATUS } from '@shared/shared/constants';

import useStyles from './styles';
import { ARCHIVE_ENABLED_COUNTRY_CODES } from '@app/pages/MarketProduct/constants';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';

const ProductStatus = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('marketProductPageV2');
  const marketProduct = useSelector(getMarketProductByIdSelector.getData);
  const countryCode = get(useSelector(getSelectedCountryV2), 'code.alpha2');
  const isActivateProductPending = useSelector(getActivateProductsSelector.getIsPending);
  const isUpdatePending = useSelector(updateMarketProductSelector.getIsPending);
  const isGetPending = useSelector(getMarketProductByIdSelector.getIsPending);
  const [showConfirmationModal, confirmationModal] = useConfirmationModal();
  const { canAccess } = usePermission();
  const classes = useStyles();

  const isActive = marketProduct.status === MARKET_PRODUCT_STATUS.ACTIVE;
  const isArchived = marketProduct.status === MARKET_PRODUCT_STATUS.ARCHIVED;
  const isArchiveFeatureEnabled = ARCHIVE_ENABLED_COUNTRY_CODES.includes(countryCode);
  const hasPermissionToChangeArchivedStatus = canAccess(permKey.PAGE_MARKET_PRODUCT_DETAIL_COMPONENT_TOGGLE_ARCHIVED_STATUS);
  const hasPermissionToChangeActiveStatus = canAccess(permKey.PAGE_MARKET_PRODUCT_DETAIL_COMPONENT_TOGGLE_ACTIVE_STATUS);
  const isPending = isUpdatePending || isGetPending;

  const handleSwitchClick = (key, currentValue, message) => {
    const body = { [key]: !currentValue };

    showConfirmationModal({
      message,
      okText: t('button:YES'),
      onOk: () => {
        dispatch(Creators.updateMarketProductRequest({
          id: get(marketProduct, '_id'),
          body,
        }));
      },
    });
  };

  const handleActiveStatusChange = newIsActive => {
    const newStatus = newIsActive ? MARKET_PRODUCT_STATUS.ACTIVE : MARKET_PRODUCT_STATUS.INACTIVE;

    const message = newIsActive ?
      t('PRODUCT_DETAILS.PRODUCT_STATUS.ACTIVE_CONFIRMATION_MODAL.MESSAGE_POSITIVE') :
      t('PRODUCT_DETAILS.PRODUCT_STATUS.ACTIVE_CONFIRMATION_MODAL.MESSAGE_NEGATIVE');

    showConfirmationModal({
      message,
      onOk: () => {
        if (newIsActive) {
          dispatch(Creators.activateProductsRequest({ ids: [marketProduct._id] }));
        }
        else {
          dispatch(Creators.updateMarketProductRequest({
            id: get(marketProduct, '_id'),
            body: { status: newStatus },
          }));
        }
      },
    });

    return null;
  };

  const handleArchiveStatusChange = newIsArchived => {
    const newStatus = newIsArchived ? MARKET_PRODUCT_STATUS.ARCHIVED : MARKET_PRODUCT_STATUS.INACTIVE;

    const message = newIsArchived ?
      t('PRODUCT_DETAILS.PRODUCT_STATUS.ARCHIVED_CONFIRMATION_MODAL.MESSAGE_POSITIVE') :
      t('PRODUCT_DETAILS.PRODUCT_STATUS.ARCHIVED_CONFIRMATION_MODAL.MESSAGE_NEGATIVE');

    showConfirmationModal({
      message,
      onOk: () => {
        dispatch(Creators.updateMarketProductRequest({
          id: get(marketProduct, '_id'),
          body: { status: newStatus },
        }));
      },
    });

    return null;
  };

  const archivedToggleTooltip = useMemo(() => {
    if (!hasPermissionToChangeArchivedStatus) {
      return t('PRODUCT_DETAILS.PRODUCT_STATUS.ERRORS.NO_ARCHIVE_PERMISSION');
    }

    if (isActive) {
      return t('PRODUCT_DETAILS.PRODUCT_STATUS.ERRORS.CANNOT_BE_ARCHIVED_WHEN_ACTIVATED');
    }

    return null;
  }, [t, isActive, hasPermissionToChangeArchivedStatus]);

  const activeToggleTooltip = useMemo(() => {
    if (isArchived) {
      return t('PRODUCT_DETAILS.PRODUCT_STATUS.ERRORS.CANNOT_BE_ACTIVATED_WHEN_ARCHIVED');
    }

    return null;
  }, [t, isArchived]);

  const isArchiveToggleDisabled = isActive || !hasPermissionToChangeArchivedStatus || isPending;
  const isActiveToggleDisabled = isActivateProductPending || isPending || isArchived || !hasPermissionToChangeActiveStatus;

  return (
    <>
      <p className={classes.title}>{t('PRODUCT_DETAILS.PRODUCT_STATUS.TITLE')}</p>
      <Row className="justify-content-end">
        {isArchiveFeatureEnabled && (
          <Tooltip placement="topRight" title={archivedToggleTooltip}>
            <label>
              <span className="mr-2">{t('PRODUCT_DETAILS.PRODUCT_STATUS.ARCHIVED')}</span>
              <Switch
                checked={isArchived}
                onClick={handleArchiveStatusChange}
                checkedChildren="ON"
                unCheckedChildren="OFF"
                disabled={isArchiveToggleDisabled}
              />
            </label>
          </Tooltip>
        )}

        <Tooltip placement="topRight" title={activeToggleTooltip}>
          <label className="ml-3">
            <span className="mr-2">{t('PRODUCT_DETAILS.PRODUCT_STATUS.ACTIVE')}</span>
            <Switch
              checked={isActive}
              onClick={handleActiveStatusChange}
              checkedChildren="ON"
              unCheckedChildren="OFF"
              disabled={isActiveToggleDisabled}
            />
          </label>
        </Tooltip>

        <label className="ml-3">
          <span className="mr-2">{t('PRODUCT_DETAILS.PRODUCT_STATUS.ENABLED')}</span>
          <Switch
            checked={marketProduct.isEnabled}
            onClick={() => {
              handleSwitchClick(
                'isEnabled',
                marketProduct.isEnabled,
                marketProduct.isEnabled ?
                  t('PRODUCT_DETAILS.PRODUCT_STATUS.ENABLED_CONFIRMATION_MODAL.MESSAGE_NEGATIVE') :
                  t('PRODUCT_DETAILS.PRODUCT_STATUS.ENABLED_CONFIRMATION_MODAL.MESSAGE_POSITIVE'),
              );
            }}
            checkedChildren="ON"
            unCheckedChildren="OFF"
            disabled={isPending}
          />
        </label>

        <label className="ml-3">
          <span className="mr-2">{t('PRODUCT_DETAILS.PRODUCT_STATUS.SHOW_ON_APP')}</span>
          <Switch
            checked={marketProduct.isVisible}
            onClick={() => {
              handleSwitchClick(
                'isVisible',
                marketProduct.isVisible,
                marketProduct.isVisible ?
                  t('PRODUCT_DETAILS.PRODUCT_STATUS.SHOW_ON_APP_CONFIRMATION_MODAL.MESSAGE_NEGATIVE') :
                  t('PRODUCT_DETAILS.PRODUCT_STATUS.SHOW_ON_APP_CONFIRMATION_MODAL.MESSAGE_POSITIVE'),
              );
            }}
            checkedChildren="ON"
            unCheckedChildren="OFF"
            disabled={isPending}
          />
        </label>
      </Row>
      {confirmationModal}
    </>
  );
};

export default ProductStatus;

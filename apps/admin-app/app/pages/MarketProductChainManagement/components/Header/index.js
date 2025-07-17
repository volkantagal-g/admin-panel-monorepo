import {
  AppstoreAddOutlined,
  HomeOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CsvImporter from '@shared/components/UI/CsvImporter';
import { MIME_TYPE, REDUX_KEY } from '@shared/shared/constants';
import { useInjectSaga } from '@shared/utils/injectSaga';

import { Button } from '@shared/components/GUI';
import actionsIcon from '@app/pages/MarketProductChainManagement/assets/Icons/actions.svg';
import configurationIcon from '@app/pages/MarketProductChainManagement/assets/Icons/cog-6-tooth.svg';
import exportIcon from '@app/pages/MarketProductChainManagement/assets/Icons/export.svg';
import importIcon from '@app/pages/MarketProductChainManagement/assets/Icons/import.svg';
import editIcon from '@app/pages/MarketProductChainManagement/assets/Icons/pencil.svg';
import AddPlatformModal from '@app/pages/MarketProductChainManagement/components/Modals/AddPlatformModal';

import { Creators } from '@app/pages/MarketProductChainManagement/redux/actions';
import { chainManagementReducer } from '@app/pages/MarketProductChainManagement/redux/reducer';

import useStyles from '@app/pages/MarketProductChainManagement/components/Header/styles';
import { useInjectReducer } from '@shared/utils/injectReducer';

import rootSaga from '@app/pages/MarketProductChainManagement/redux/saga';

export const exampleCsv = {
  productId: 'xxxxxxxxxxxxxxx',
  demographies: '[premium, upper premium]',
  sizes: '[mini, maxi]',
  domains: '[g10, g30]',
  warehouseTypes: '[regular warehouse]',
};

export const exampleDarkStoreCsv = {
  warehouseId: 'xxxxxxxxxxxxxxx',
  demography: 'premium',
  size: 'mini',
  domains: '[g10, g30]',
};

const Header = ({
  title,
  configurationButton,
  importButton,
  exportButton,
  actionButton,
  editButton,
  onEditClick,
  saveButton,
  onSaveClick,
  dsConfigurationButton,
  cancelButton,
  onCancelClick,
  productId,
  onDSConfigClick,
  buttons = [],
  onImportClick,
  onExportClick,
  pageType,
  loading,
}) => {
  const { t } = useTranslation('marketProductChainManagement');
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAddPlatformModalOpen = useSelector(state => state[REDUX_KEY.MARKET_PRODUCT_CHAIN_MANAGEMENT.ROOT]?.isAddPlatformModalOpen ?? false);

  useInjectReducer({
    key: REDUX_KEY.MARKET_PRODUCT_CHAIN_MANAGEMENT.ROOT,
    reducer: chainManagementReducer,
  });

  useInjectSaga({
    key: REDUX_KEY.MARKET_PRODUCT_CHAIN_MANAGEMENT.ROOT,
    saga: rootSaga,
  });

  const handleImport = useCallback((csvData, loadedFile, loadedBase64File) => {
    if (onImportClick) {
      onImportClick(loadedBase64File);
    }
  }, [onImportClick]);

  const handleExportClick = useCallback(e => {
    e?.preventDefault();
    if (onExportClick) {
      onExportClick();
    }
  }, [onExportClick]);

  const handleActionClick = useCallback(e => {
    if (e?.key === 'add-platform') {
      dispatch(Creators.setAddPlatformModalOpen(true));
    }
    else if (e?.key === 'central-warehouse-supplier') {
      window.open('/chainManagement/warehouses/matchSupplier/default?country=tr', '_blank');
    }
    else if (e?.key === 'dark-store-central-warehouse') {
      window.open('/chainManagement/matchDarkstore/default?country=tr', '_blank');
    }
    else if (e?.domEvent) {
      e.domEvent.preventDefault();
    }
  }, [dispatch]);

  const handleEditClick = useCallback(e => {
    e.preventDefault();
    onEditClick?.();
  }, [onEditClick]);

  const handleSaveClick = useCallback(e => {
    e.preventDefault();
    onSaveClick?.();
  }, [onSaveClick]);

  const handleCancelClick = useCallback(e => {
    e.preventDefault();
    onCancelClick?.();
  }, [onCancelClick]);

  const handleCloseAddPlatformModal = useCallback(() => {
    dispatch(Creators.setAddPlatformModalOpen(false));
  }, [dispatch]);

  const actionMenu = useMemo(() => (
    <Menu className={classes.menu}>
      <Menu.Item
        key="central-warehouse-supplier"
        onClick={handleActionClick}
      >
        <div className={classes.menuItemContent}>
          <ShopOutlined className={classes.antIcon} />
          <span className={classes.menuText}>{t('CENTRAL_WAREHOUSE_AND_SUPPLIER')}</span>
        </div>
      </Menu.Item>
      <Menu.Item
        key="dark-store-central-warehouse"
        onClick={handleActionClick}
      >
        <div className={classes.menuItemContent}>
          <HomeOutlined className={classes.antIcon} />
          <span className={classes.menuText}>{t('DARK_STORE_AND_CENTRAL_WAREHOUSE')}</span>
        </div>
      </Menu.Item>
      <Menu.Item
        key="add-platform"
        onClick={handleActionClick}
      >
        <div className={classes.menuItemContent}>
          <AppstoreAddOutlined className={classes.antIcon} />
          <span className={classes.menuText}>{t('ADD_A_PLATFORM')}</span>
        </div>
      </Menu.Item>
    </Menu>
  ), [classes.menu, classes.menuItemContent, classes.antIcon, classes.menuText, t, handleActionClick]);

  const buttonsConfig = useMemo(
    () => [
      {
        condition: configurationButton,
        onClick: () => navigate(`/chainManagement/configuration/${productId}?country=tr`),
        icon: <img src={configurationIcon} alt="configuration" />,
        text: t('BUTTONS.CONFIGURATION'),
        color: 'default',
        type: 'default',
      },
      {
        condition: editButton,
        onClick: handleEditClick,
        icon: <img src={editIcon} alt="edit" />,
        text: t('BUTTONS.EDIT'),
        color: 'primary',
        type: 'primary',
      },
      {
        condition: cancelButton,
        onClick: handleCancelClick,
        text: t('BUTTONS.CANCEL'),
        color: 'default',
      },
      {
        condition: saveButton,
        onClick: handleSaveClick,
        text: t('BUTTONS.SAVE'),
        color: 'primary',
        type: 'primary',
        loading,
      },
      {
        condition: importButton,
        component: (
          <div key="import-button" className={classes.linkButton}>
            <img src={importIcon} alt="import" />
            <CsvImporter
              modalProps={{ width: 800 }}
              onOkayClick={handleImport}
              exampleCsv={pageType === 'PRODUCT' ? exampleCsv : exampleDarkStoreCsv}
              hasNestedHeaderKeys
              importButtonText={t('BUTTONS.IMPORT_CSV')}
              accept={MIME_TYPE.XLSX}
              className={classes.csvImporter}
            />
          </div>
        ),
      },
      {
        condition: exportButton,
        component: (
          <div
            key="export-button"
            className={classes.linkButton}
            onClick={handleExportClick}
            onKeyDown={e => e.key === 'Enter' && handleExportClick(e)}
            role="button"
            tabIndex={0}
          >
            <img src={exportIcon} alt="export" />
            {t('BUTTONS.EXPORT_CSV')}
          </div>
        ),
      },
      {
        condition: actionButton,
        component: (
          <Dropdown key="actions-dropdown" overlay={actionMenu} trigger={['click']}>
            <Button
              onClick={handleActionClick}
              icon={<img src={actionsIcon} alt={t('BUTTONS.ACTIONS')} />}
              type="text"
            >
              {t('BUTTONS.ACTIONS')}
            </Button>
          </Dropdown>
        ),
      },
      {
        condition: dsConfigurationButton,
        onClick: onDSConfigClick,
        icon: <img src={configurationIcon} alt="configuration" />,
        text: t('BUTTONS.CONFIGURATION'),
        color: 'default',
        type: 'default',
      },
      ...buttons.filter(button => button.condition),
    ],
    [
      t,
      editButton,
      handleEditClick,
      cancelButton,
      handleCancelClick,
      saveButton,
      handleSaveClick,
      importButton,
      handleImport,
      exportButton,
      handleExportClick,
      actionButton,
      actionMenu,
      handleActionClick,
      dsConfigurationButton,
      onDSConfigClick,
      configurationButton,
      navigate,
      productId,
      buttons,
      classes.csvImporter,
      classes.linkButton,
      pageType,
      loading,
    ],
  );

  return (
    <div className={classes.header}>
      <div className={classes.body}>
        <div className={classes.titleWrapper}>
          <span className={classes.title}>{title}</span>
        </div>
        <div className={classes.buttonWrapper}>
          {buttonsConfig.map(button => button.condition && (
            button.component || (
              <Button
                key={`${button.text}-${button.color}`}
                color={button.color}
                className={`${classes.button} ${button.className || ''}`}
                onClick={button.onClick}
                type={button.type}
                disabled={button.disabled}
                icon={button.icon}
                loading={button.loading}
              >
                {button.text}
                {button.additionalContent}
              </Button>
            )
          ))}
        </div>
      </div>
      <AddPlatformModal
        openAddPlatformModal={isAddPlatformModalOpen}
        setOpenAddPlatformModal={handleCloseAddPlatformModal}
      />
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  configurationButton: PropTypes.bool,
  importButton: PropTypes.bool,
  exportButton: PropTypes.bool,
  actionButton: PropTypes.bool,
  editButton: PropTypes.bool,
  onEditClick: PropTypes.func,
  saveButton: PropTypes.bool,
  onSaveClick: PropTypes.func,
  dsConfigurationButton: PropTypes.bool,
  cancelButton: PropTypes.bool,
  onCancelClick: PropTypes.func,
  productId: PropTypes.string,
  onDSConfigClick: PropTypes.func,
  buttons: PropTypes.arrayOf(PropTypes.shape({
    condition: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
    text: PropTypes.string,
    type: PropTypes.oneOf(['default', 'primary', 'text']),
    icon: PropTypes.node,
    color: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    additionalContent: PropTypes.node,
    component: PropTypes.node,
  })),
  onImportClick: PropTypes.func,
  onExportClick: PropTypes.func,
  pageType: PropTypes.string,
  loading: PropTypes.bool,
};

Header.defaultProps = {
  buttons: [],
  configurationButton: false,
  importButton: false,
  exportButton: false,
  actionButton: false,
  editButton: false,
  saveButton: false,
  dsConfigurationButton: false,
  cancelButton: false,
  onEditClick: () => {},
  onSaveClick: () => {},
  onCancelClick: () => {},
  onDSConfigClick: () => {},
  onImportClick: () => {},
  onExportClick: () => {},
  productId: null,
  pageType: '',
  loading: false,
};

export default Header;

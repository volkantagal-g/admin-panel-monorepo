import { Dropdown, Spin, Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { SolutionOutlined } from '@ant-design/icons';
import React from 'react';

import { getLangKey } from '@shared/i18n';
import { usePermission } from '@shared/hooks';
import { ROUTE } from '@app/routes';

import { Creators } from '../../redux/actions';
import { panelDocsByFilterSelector, resultShownSelector } from '../../redux/selectors';
import useStyles from './styles';

export default function SearchResult() {
  const isResultShown = useSelector(resultShownSelector);
  const dispatch = useDispatch();
  const { getRouteKeyFromPermKey } = usePermission();
  const { t } = useTranslation('panelDocSearchPage');
  const panelDocs = useSelector(panelDocsByFilterSelector.getData);
  const arePanelDocsPending = useSelector(panelDocsByFilterSelector.getIsPending);
  const classes = useStyles();

  const close = () => {
    dispatch(Creators.setResultShown({ isResultShown: false }));
  };

  return (
    <Dropdown
      overlay={getMenu()}
      trigger={['click']}
      visible={isResultShown}
      onVisibleChange={close}
      overlayClassName={classes.selectDropdown}
    >
      <div className={classes.dropdownHiddenTrigger} />
    </Dropdown>
  );

  function getMenu() {
    if (arePanelDocsPending) {
      return (
        <Menu className={classes.menuNoData}>
          <Menu.Item key="spinner"><Spin /></Menu.Item>
        </Menu>
      );
    }

    if (!panelDocs?.length) {
      return (
        <Menu className={classes.menuNoData}>
          <Menu.Item key="no-results">{t('NO_RESULTS')}</Menu.Item>
        </Menu>
      );
    }

    return (
      <Menu className={classes.menuWithData}>
        {panelDocs.map(panelDoc => (
          <React.Fragment key={panelDoc._id}>
            <Menu.Item className={classes.menuItem} key={panelDoc._id}>
              <SolutionOutlined className={classes.menuItemIcon} />
              <a href={ROUTE.PANEL_DOC_PREVIEW.path.replace(':id', panelDoc._id)} className={classes.menuItemLinkWithInfo}>
                <div>
                  <span className={classes.docName}>{panelDoc.name[getLangKey()]}</span>
                  {/* active docs must have description */}
                  <span>{panelDoc.description?.[getLangKey()] || '-'}</span>
                </div>
                <div>
                  <span>
                    <span className={classes.boldLabel}>{t('PAGE')}:</span>
                    <span>{panelDoc.page.name[getLangKey()]}</span>
                  </span>
                  <span>
                    <span className={classes.boldLabel}>{t('SQUAD')}:</span>
                    <span>{ROUTE[getRouteKeyFromPermKey(panelDoc.page.permKey)]?.squad || '-' }</span>
                  </span>
                </div>
              </a>
            </Menu.Item>
            <Menu.Divider />
          </React.Fragment>
        ))}
      </Menu>
    );
  }
}

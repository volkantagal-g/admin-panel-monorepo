import { Layout } from 'antd';
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { useOnClickOutside } from '@shared/hooks';
import useWindowSize from '@shared/shared/hooks/useWindowSize';
import { MOBILE_WIDTH_IN_PX, REDUX_KEY } from '@shared/shared/constants';

import useStyles from './styles';
import Logo from './Logo';
import Menu from './Menu';

import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInjectReducer } from '@shared/utils/injectReducer';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';

const { Sider } = Layout;

const reduxKey = REDUX_KEY.SIDEBAR;

export default function Sidebar({ sidebarWidth, isSidebarCollapsed, setIsSidebarCollapsed }) {
  const classes = useStyles({ sidebarWidth });
  const siderRef = useRef(null);
  const { width } = useWindowSize();
  const isMobileWidth = width < MOBILE_WIDTH_IN_PX;

  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useLayoutEffect(() => {
    dispatch(Creators.initSidebar());
    return () => {
      dispatch(Creators.destroySidebar());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(Creators.getFavoritePagesRequest());
  }, [dispatch]);

  const outsideClickHandler = useCallback(() => {
    // clicking outside should close the sidebar
    setIsSidebarCollapsed(true);
  }, [setIsSidebarCollapsed]);

  useOnClickOutside({ ref: siderRef, handler: outsideClickHandler, skip: !isMobileWidth });

  const collapseClassName = isSidebarCollapsed ? classes.collapsed : '';
  const classNames = [classes.appSidebar, collapseClassName];

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={isSidebarCollapsed}
      className={classNames}
      ref={siderRef}
    >
      <Logo />
      <Menu isSidebarCollapsed={isSidebarCollapsed} />
    </Sider>
  );
}

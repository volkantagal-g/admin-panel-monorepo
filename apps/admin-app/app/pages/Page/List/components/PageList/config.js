import { Tag, Button, Row } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { LinkOutlined } from '@ant-design/icons';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { ROUTE } from '@app/routes';
import { isMobile } from '@shared/utils/common';
import { getRouteConfigByPermKey } from '@app/pages/Page/utils';

export const TAB_PANE_KEY = {
  ALL_PAGES: 'allPages',
  MY_PAGES: 'myPages',
};

export const handlePageNavigation = ({ routeConfig, t, navigate, dispatch }) => {
  const navigationPath = routeConfig?.path;

  if (!navigationPath) {
    return dispatch(ToastCreators.error({ message: t('PAGE_CONFIG_NOT_FOUND') }));
  }

  return navigate(navigationPath);
};

export const tableColumns = (
  langKey,
  {
    hasAccessToPageDetailPage,
    hasAccessToComponentDetailPage,
    canAccess,
    userOwnedPages,
    t,
    navigate,
    dispatch,
  },
) => {
  const columns = [
    {
      title: t('pagePage:PERMISSION_LEVEL'),
      dataIndex: '_id',
      key: '_id',
      align: 'center',
      width: 170,
      sorter: (a, b) => {
        const aPermKey = a.permKey;
        const bPermKey = b.permKey;

        const aPageId = a.page || a._id;
        const bPageId = b.page || b._id;
        // owner early, permitted later, unauthorized last

        const aIsOwner = userOwnedPages.includes(aPageId);
        if (aIsOwner) return -1;

        const bIsOwner = userOwnedPages.includes(bPageId);
        if (bIsOwner) return 1;

        const aHasAccess = canAccess(aPermKey);
        if (aHasAccess) return -1;

        const bHasAccess = canAccess(bPermKey);
        if (bHasAccess) return 1;

        return 0;
      },

      render: (_id, { permKey, page }) => {
        // if page exists it's component and we want the id of the page
        const pageId = page || _id;
        const isComponent = !!page;
        const hasAccessToPageOrComponent = canAccess(permKey);

        const isTheUserOwnerOfThePage = userOwnedPages.includes(pageId);
        let text = t('pagePage:UNAUTHORIZED');
        if (isTheUserOwnerOfThePage) {
          text = t('pagePage:PAGE_OWNER');
        }
        else if (hasAccessToPageOrComponent) {
          text = t('pagePage:AUTHORIZED');
        }

        const routeConfig = getRouteConfigByPermKey({ permKey });
        const hasPermissionToViewPage = isTheUserOwnerOfThePage || hasAccessToPageOrComponent;
        const hasPathParam = routeConfig?.path?.includes(':');
        const isPageNavigationButtonVisible = routeConfig && hasPermissionToViewPage && !hasPathParam;

        const pageNavigationButton = (
          <Button
            type="text"
            size="small"
            icon={<LinkOutlined />}
            onClick={() => handlePageNavigation({
              routeConfig,
              navigate,
              dispatch,
              t,
            })}
          />
        );

        return (
          <Row align="middle">
            <Tag style={{ border: isComponent ? '1px solid black' : undefined }}>
              {text}
            </Tag>
            {isPageNavigationButtonVisible && pageNavigationButton}
          </Row>
        );
      },
    },
    {
      title: t('global:NAME'),
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => {
        const nameA = a.name[langKey];
        const nameB = b.name[langKey];
        return nameA.localeCompare(nameB);
      },
      defaultSortOrder: 'ascend',
      width: isMobile() ? 150 : 250,
      render: (name = {}) => {
        return name[langKey];
      },
    },
    {
      title: t('global:DESCRIPTION'),
      dataIndex: 'description',
      key: 'description',
      width: isMobile() ? 200 : undefined,
      render: (description = {}) => {
        return description[langKey];
      },
    },
    {
      title: t('global:CREATED_AT'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      sorter: (a, b, sortOrder) => {
        const aCreated = a?.createdAt;
        const bCreated = b?.createdAt;

        // if there is no createdAt date, put it at the end of the list in each case
        if (!aCreated) return sortOrder === 'ascend' ? 1 : -1;
        if (!bCreated) return sortOrder === 'ascend' ? -1 : 1;

        const aDate = new Date(aCreated);
        const bDate = new Date(!bCreated);
        return aDate - bDate;
      },

      render: createdAt => {
        return createdAt ? moment(createdAt).format('YYYY-MM-DD') : 'N/A';
      },
    },
  ];

  if (hasAccessToPageDetailPage || hasAccessToComponentDetailPage) {
    columns.push({
      title: t('global:ACTION'),
      align: 'center',
      width: 80,
      render: ({ _id, page }) => {
        let path;
        if (page && hasAccessToComponentDetailPage) { // if page exists it's component
          path = ROUTE.COMPONENT_DETAIL.path.replace(':id', _id);
        }
        else if (!page && hasAccessToPageDetailPage) {
          path = ROUTE.PAGE_DETAIL.path.replace(':id', _id);
        }

        if (path) {
          return (
            <Link to={path}>
              <Button type="default" size="small">
                {t('global:DETAIL')}
              </Button>
            </Link>
          );
        }

        return undefined;
      },
    });
  }

  return columns;
};

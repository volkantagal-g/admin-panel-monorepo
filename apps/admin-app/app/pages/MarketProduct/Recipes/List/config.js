import { get } from 'lodash';

import { Tooltip } from 'antd';

import { CheckCircleFilled, WarningFilled } from '@ant-design/icons';

import { getLangKey } from '@shared/i18n';
import { ROUTE } from '@app/routes';
import { getirMarketDomainTypes } from '@app/pages/MarketProduct/constantValues';
import { Button, Tag } from '@shared/components/GUI';
import { RECIPE_STATUSES, RECIPE_STATUSES_LABELS, DOMAIN_TYPES_LABELS } from '../constants';

const statusTagColor = {
  [RECIPE_STATUSES.ACTIVE]: 'active',
  [RECIPE_STATUSES.INACTIVE]: 'danger',
};

export const getStatusIcon = (record, classes) => {
  const hasWarning = get(record, 'hasWarning', false);
  const hasError = get(record, 'hasError', false);

  if (hasError) {
    return <WarningFilled className={classes.errorIcon} />;
  }
  if (hasWarning) {
    return <WarningFilled className={classes.warningIcon} />;
  }
  return <CheckCircleFilled className={classes.successIcon} />;
};

export const tableColumns = (t, classes) => {
  return [
    {
      title: t('LIST_TABLE.PANEL_NAME'),
      dataIndex: 'panelName',
      key: 'panelName',
    },
    {
      title: t('LIST_TABLE.NAME'),
      dataIndex: 'name',
      key: 'name',
      render: name => {
        return get(name, [getLangKey()], '');
      },
    },
    {
      title: t('LIST_TABLE.STATUS'),
      dataIndex: 'status',
      key: 'status',
      render: status => {
        const tagColor = get(statusTagColor, status, 'default');
        const statusText = get(RECIPE_STATUSES_LABELS, [status, getLangKey()], '');
        return (
          <Tag key={status} color={tagColor}>
            {statusText}
          </Tag>
        );
      },
    },
    {
      title: t('LIST_TABLE.DOMAINS'),
      dataIndex: 'domainTypes',
      key: 'domainTypes',
      render: (domainTypes = []) => {
        return domainTypes.map(domainType => {
          const domainTypeText = get(getirMarketDomainTypes, [domainType, getLangKey()], '');
          return (
            <Tag key={domainType} color="secondary">{domainTypeText}</Tag>
          );
        });
      },
    },
    {
      title: t('LIST_TABLE.SEGMENTS'),
      dataIndex: 'segments',
      key: 'segments',
      render: (segments = []) => {
        return segments.map(segment => (
          <Tag key={segment} color="inactive">{segment}</Tag>
        ));
      },
    },
    {
      title: t('LIST_TABLE.ORDERS'),
      dataIndex: 'orders',
      key: 'orders',
      render: (orders = []) => {
        return orders.map(order => {
          return (
            <Tag key={order.domainType + order.order} color="secondary">{DOMAIN_TYPES_LABELS?.[order.domainType]?.[getLangKey()]}: {order.order || '-'}</Tag>
          );
        });
      },
    },
    {
      title: t('LIST_TABLE.ERRORS'),
      key: 'errors',
      render: record => {
        const errorMessage = get(record, 'errorMessage', '');
        const warningMessage = get(record, 'warningMessage', '');

        return (
          <Tooltip title={errorMessage || warningMessage}>
            {getStatusIcon(record, classes)}
          </Tooltip>
        );
      },
    },
    {
      title: t('LIST_TABLE.ACTION'),
      align: 'center',
      fixed: 'right',
      width: 80,
      render: record => {
        const action = {
          onDetailClick: () => {
            const recipeId = get(record, '_id', '');
            const path = ROUTE.MARKET_PRODUCT_RECIPES_DETAIL.path.replace(':id', recipeId);
            window.open(path, '_blank');
          },
        };

        return (
          <Button type="default" size="small" onClick={action.onDetailClick}>
            {t('global:DETAIL')}
          </Button>
        );
      },
    },
  ];
};

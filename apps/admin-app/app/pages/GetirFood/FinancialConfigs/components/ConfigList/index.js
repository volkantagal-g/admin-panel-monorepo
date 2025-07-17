import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Empty } from 'antd';

import permKey from '@shared/shared/permKey.json';

import { Creators } from '../../redux/actions';
import { financialConfigsSelector } from '../../redux/selectors';
import { usePermission } from '@shared/hooks';
import ConfigItem from '../ConfigItem';
import useStyles from './styles';

import Spinner from '@shared/components/Spinner';
import { t } from '@shared/i18n';

const ConfigList = ({ vertical }) => {
  const dispatch = useDispatch();
  const { Can, canAccess } = usePermission();
  const classes = useStyles();

  const verticalDomains = useSelector(
    financialConfigsSelector.getDomainsByVertical,
  );
  const isPendingVerticalDomains = useSelector(
    financialConfigsSelector.getIsPendingDomainsByVertical,
  );

  // should display all domains if user has `PAGE_GETIR_FOOD_FINANCIAL_CONFIGS_COMPONENT_DEFAULT` permission
  const hasAccessToAllDomains = canAccess(
    permKey.PAGE_GETIR_FOOD_FINANCIAL_CONFIGS_COMPONENT_DEFAULT,
  );

  useEffect(() => {
    dispatch(
      Creators.getFinancialConfigsDomainsByVerticalRequest({ vertical }),
    );
  }, [dispatch, vertical]);

  if (isPendingVerticalDomains) return <Spinner />;

  if (!verticalDomains || verticalDomains.length === 0) return <Empty description={t('global:NOT_FOUND')} />;

  return (
    <div className={classes.configItemContainer}>
      {verticalDomains?.map(domain => (hasAccessToAllDomains ? (
        <ConfigItem vertical={vertical} domain={domain} key={domain?.name} />
      ) : (
        <Can
          permKey={domain?.permissionCode}
          key={domain}
        >
          <ConfigItem vertical={vertical} domain={domain} key={domain?.name} />
        </Can>
      )))}
    </div>
  );
};

export default ConfigList;

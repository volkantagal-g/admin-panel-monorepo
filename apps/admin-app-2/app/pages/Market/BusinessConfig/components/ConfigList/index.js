// library imports
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { Collapse, List } from 'antd';

// shared imports
import AntCard from '@shared/components/UI/AntCard';
import { usePermission } from '@shared/hooks';
import Spinner from '@shared/components/Spinner';

// local imports
import {
  getBusinessConfigFields,
  getBusinessConfigDomains,
  getBusinessConfigKeysByDomains,
  getAllConfigKeyTypePairs,
} from '@app/pages/Market/BusinessConfig/utils';
import { marketBusinessConfig } from '@app/pages/Market/BusinessConfig/constants';
import { Creators } from '@app/pages/Market/BusinessConfig/redux/actions';
import { marketBusinessConfigsSelector } from '@app/pages/Market/BusinessConfig/redux/selectors';
import ConfigItem from '@app/pages/Market/BusinessConfig/components/ConfigItem';

// constants
const { Panel } = Collapse;

const ConfigList = () => {
  const dispatch = useDispatch();
  const isMarketBusinessConfigsPending = useSelector(marketBusinessConfigsSelector.getIsPending);

  const marketBusinessConfigFieldCards = getBusinessConfigFields();
  const marketBusinessConfigDomainPanels = getBusinessConfigDomains();
  const { canAccess } = usePermission();

  const configKeys = useMemo(() => getAllConfigKeyTypePairs(), []);

  useEffect(() => {
    dispatch(Creators.getMarketBusinessConfigsRequest({ configKeys }));
  }, [configKeys, dispatch]);

  if (isMarketBusinessConfigsPending) return <Spinner />;

  return (
    <>
      {marketBusinessConfigFieldCards.map(marketBusinessConfigFieldCard => {
        const marketBusinessConfigField = marketBusinessConfig[marketBusinessConfigFieldCard.key];
        return (
          canAccess(marketBusinessConfigField.permissionKey) && (
          <AntCard
            key={marketBusinessConfigFieldCard.key}
            title={(marketBusinessConfigFieldCard.description)}
          >
            <Collapse>
              {marketBusinessConfigDomainPanels.map(marketBusinessConfigDomainPanel => {
                const marketBusinessConfigDomain = marketBusinessConfigField.configKeys[marketBusinessConfigDomainPanel.key];
                const marketBusinessConfigDomainConfigKeys = getBusinessConfigKeysByDomains({ configKeys: marketBusinessConfigDomain.configKeys });
                return (
                  <Panel key={marketBusinessConfigDomainPanel.key} header={marketBusinessConfigDomainPanel.description}>
                    <List
                      grid={{ gutter: 16, column: 1 }}
                      dataSource={marketBusinessConfigDomainConfigKeys}
                      renderItem={marketBusinessConfigDomainConfigKey => (
                        <List.Item>
                          <ConfigItem
                            isEditEligible={canAccess(marketBusinessConfigDomain.permissionKey)}
                            configField={marketBusinessConfigFieldCard.key}
                            configKeyForDomain={marketBusinessConfigDomainConfigKey}
                          />
                        </List.Item>
                      )}
                    />
                  </Panel>
                );
              })}
            </Collapse>
          </AntCard>
          )
        );
      })}
    </>
  );
};

export default ConfigList;

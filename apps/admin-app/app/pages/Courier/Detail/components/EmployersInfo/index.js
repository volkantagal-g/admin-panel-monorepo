import { useTranslation } from 'react-i18next';
import { useEffect, useMemo } from 'react';
import { get } from 'lodash';
import { List } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Card from '@shared/components/UI/AntCard';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { getMarketFranchisesSelector } from '@shared/redux/selectors/common';
import { createMap } from '@shared/utils/common';
import { workTypes } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';

function EmployersInfo({ data }) {
  const { t } = useTranslation('courierPage');
  const dispatch = useDispatch();
  const franchises = useSelector(getMarketFranchisesSelector.getData);
  const franchisesIsPending = useSelector(
    getMarketFranchisesSelector.getIsPending,
  );

  const marketEmployers = useMemo(
    () => get(data, 'person.marketEmployers', []),
    [data],
  );
  const franchiseMap = useMemo(() => createMap(franchises), [franchises]);

  useEffect(() => {
    dispatch(CommonCreators.getMarketFranchisesRequest());
  }, [dispatch]);

  const renderListItem = item => (
    <List.Item>
      <List.Item.Meta
        title={(
          <>
            <strong>{franchiseMap[item.franchise]?.name}</strong>&nbsp;-&nbsp;
            {workTypes[item.workType][getLangKey()]}
          </>
        )}
        description={
          franchiseMap[item.franchise]?.warehouses?.length ? (
            <>
              <strong>{t('WAREHOUSES')}:&nbsp;</strong>
              <span>
                {franchiseMap[item.franchise]?.warehouses
                  .map(warehouse => warehouse.name)
                  .join(', ')}
              </span>
            </>
          ) : ('')
        }
      />
    </List.Item>
  );

  return (
    <Card title={t('EMPLOYERS_INFORMATION')} loading={franchisesIsPending}>
      <List
        dataSource={marketEmployers}
        size="small"
        split
        renderItem={renderListItem}
      />
    </Card>
  );
}

EmployersInfo.defaultProps = { data: {} };
EmployersInfo.propTypes = { data: PropTypes.shape({}) };

export default EmployersInfo;

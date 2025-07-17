import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getCitiesSelector } from '@shared/redux/selectors/common';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { tableColumns } from './config';
import { usePermission } from '@shared/hooks';

import useStyles from './styles';

const CityList = () => {
  const { t } = useTranslation('gisCountryCityManagementPage');
  const { Can } = usePermission();
  const classes = useStyles();

  const citiesData = useSelector(getCitiesSelector.getData);

  const columns = useMemo(() => tableColumns(t, Can), [t, Can]);

  return (
    <div className={classes.tableColumn}>
      <AntTableV2
        data-testid="city-table"
        data={citiesData}
        columns={columns}
        isScrollableToTop={false}
      />
    </div>
  );
};

export default CityList;

import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useMemo, useEffect } from 'react';
import { TreeSelect } from 'antd';

import useStyles from './styles';
import { getWarehousesSelector } from '@shared/redux/selectors/common';
import { getLangKey } from '@shared/i18n';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { warehouseTypes } from '@shared/shared/constantValues';

const { SHOW_CHILD } = TreeSelect;

function WarehousesSelect({ value, onChange, country, disabled }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();

  const warehouses = useSelector(getWarehousesSelector.getData);
  const warehousesLoading = useSelector(getWarehousesSelector.getIsPending);
  const warehousesData = useMemo(() => {
    const currentLanguage = getLangKey();
    const dataByWarehouseObject = Object.keys(warehouseTypes).reduce(
      (acc, key) => {
        acc[key] = {
          value: key,
          title: warehouseTypes[key][currentLanguage],
          cityObject: {},
        };
        return acc;
      },
      {},
    );
    warehouses?.forEach(warehouse => {
      const cityId = warehouse.city?._id || 'noCity';
      const { warehouseType } = warehouse;

      dataByWarehouseObject[warehouseType] = {
        ...dataByWarehouseObject[warehouseType],
        cityObject: {
          ...dataByWarehouseObject[warehouseType].cityObject,
          [cityId]: {
            ...dataByWarehouseObject[warehouseType].cityObject[cityId],
            title:
            warehouse.city?.name[currentLanguage] ||
            t('fieldAnnouncementPage:NO_CITY'),
            value: cityId,
            children: [
              ...(dataByWarehouseObject[warehouseType].cityObject[cityId]?.children || []),
              { title: warehouse.name, value: warehouse.id },
            ],
          },
        },
      };
    });
    if (!warehouses?.length) {
      return [];
    }
    return Object.values(dataByWarehouseObject).map(warehouseType => {
      return {
        value: warehouseType.value,
        title: warehouseType.title,
        children: Object.values(warehouseType.cityObject).map(city => {
          return {
            title: city.title,
            value: `${warehouseType.value}${city.value}`,
            children: city.children,
          };
        }),
      };
    }).filter(warehouse => warehouse.children.length);
  }, [t, warehouses]);

  useEffect(() => {
    if (country) {
      dispatch(CommonCreators.getWarehousesRequest({ countryId: country }));
    }
  }, [country, dispatch]);

  return (
    <TreeSelect
      mode="multiple"
      showSearch
      treeNodeFilterProp="title"
      treeData={warehousesData}
      value={value}
      loading={warehousesLoading}
      onChange={onChange}
      treeCheckable
      showCheckedStrategy={SHOW_CHILD}
      placeholder={t('fieldAnnouncementPage:SELECT_WAREHOUSES')}
      filterTreeNode
      maxTagCount={20}
      allowClear
      autoClearSearchValue={false}
      className={classes.width}
      disabled={disabled}
      showArrow
    />
  );
}

export default WarehousesSelect;

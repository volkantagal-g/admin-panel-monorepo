import { Button, Tag } from 'antd';
import _get from 'lodash/get';
import { Link } from 'react-router-dom';

import { getLangKey, t } from '@shared/i18n';
import { ROUTE } from '@app/routes';
import { firmTypes } from '@shared/shared/constantValues';
import { STORE_CONVERSION_SHORT_LABEL_TEXT, TAG_COLORS } from '@shared/shared/constants';

export const tableColumns = [
  {
    title: t('global:NAME'),
    key: 'name',
    width: '%60',
    render: ({ name, isStoreConversionSupplier }) => {
      const tagComponent = isStoreConversionSupplier ? (
        <Tag color={TAG_COLORS.default}>{STORE_CONVERSION_SHORT_LABEL_TEXT}</Tag>
      ) : null;

      return (
        <>
          {name}
          {tagComponent}
        </>
      );
    },
  },
  {
    title: t('global:PHONE'),
    dataIndex: 'phone',
    key: 'phone',
    width: 120,
    render: phone => {
      return phone;
    },
  },
  {
    title: t('global:TAX_NUMBER'),
    dataIndex: 'vn',
    key: 'vn',
    width: 120,
    render: vn => {
      return vn;
    },
  },
  {
    title: t('global:TAX_OFFICE'),
    dataIndex: 'vd',
    key: 'vd',
    width: 240,
    render: vd => {
      return vd;
    },
  },
  {
    title: t('global:TYPE3'),
    dataIndex: 'types',
    key: 'types',
    width: 200,
    render: types => {
      const firmTypeNames = (types || []).map(firmType => {
        return _get(firmTypes, [firmType, getLangKey()], []);
      });
      return firmTypeNames.map(firmType => {
        return (
          <Tag key={firmType} color="processing">{firmType}</Tag>
        );
      });
    },
  },
  {
    title: t('global:ACTION'),
    align: 'right',
    width: 80,
    render: record => {
      const supplierId = _get(record, '_id', '');
      const path = ROUTE.SUPPLIER_DETAIL.path.replace(':id', supplierId);

      return (
        <Link to={path}>
          <Button type="default" size="small">
            {t('global:DETAIL')}
          </Button>
        </Link>
      );
    },
  },
];

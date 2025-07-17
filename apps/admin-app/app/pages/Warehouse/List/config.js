import { getLangKey, t } from '@shared/i18n';
import ListTag from './components/ListTag';
import { CopyToClipboard } from '@shared/components/UI/CopyToClipboard';
import DetailButton from './components/DetailButton';
import { DOMAIN_TYPES, WAREHOUSE_STATUS_TYPES, STATES } from '@shared/shared/constants';
import { warehouseTypes } from '@shared/shared/constantValues';

export const tableColumns = [
  {
    title: t('global:ID'),
    dataIndex: '_id',
    key: '_id',
    width: '200px',
    render: id => {
      return <CopyToClipboard message={id} />;
    },
  },
  {
    title: t('global:NAME'),
    dataIndex: 'name',
    key: 'name',
    width: '200px',
  },
  {
    title: t('global:CITY'),
    dataIndex: ['city', 'name', getLangKey()],
    key: 'cityName',
    width: '120px',
  },
  {
    title: t('global:REGION'),
    dataIndex: ['region', 'name', getLangKey()],
    key: 'regionName',
    width: '120px',
  },
  {
    title: t('global:DOMAIN_TYPE'),
    dataIndex: 'domainTypes',
    key: 'domainTypes',
    width: '120px',
    render: domainCode => {
      return domainCode?.map(domain => {
        return (ListTag({
          key: domain.toString(36) + domain,
          tagCode: domain,
          tagType: DOMAIN_TYPES,
        }));
      });
    },
  },
  {
    title: t('global:WAREHOUSE_TYPE'),
    dataIndex: 'warehouseType',
    key: 'warehouseType',
    width: '120px',
    render: warehouseType => {
      return (<span>{ warehouseType ? warehouseTypes[warehouseType][getLangKey()] : ''}</span>);
    },
  },
  {
    title: t('global:STATE'),
    dataIndex: 'state',
    key: 'state',
    width: '120px',
    render: stateCode => {
      return ListTag({
        tagCode: stateCode,
        tagType: STATES,
      });
    },
  },
  {
    title: t('global:STATUS'),
    dataIndex: 'status',
    key: 'status',
    width: '120px',
    render: statusCode => {
      return ListTag({
        tagCode: statusCode,
        tagType: WAREHOUSE_STATUS_TYPES,
      });
    },
  },
  {
    title: '',
    key: '_id',
    width: '140px',
    render: obj => {
      return DetailButton({
        _id: obj._id,
        urlPath: '/warehouse/detail/',
        toLat: obj.location?.coordinates[1],
        toLng: obj.location?.coordinates[0],
      });
    },
  },
];

import moment from 'moment';

import DetailButton from './components/DetailButton';
import { getLocalDateFormat } from '@shared/utils/localization';
import { renderTagForDomainTypes, renderTagForStep } from '../utils';

export const tableColumns = ({ isPending, handleDelete, t }) => [
  {
    title: t('PLAN_NAME'),
    dataIndex: 'name',
    key: 'name',
    width: 150,
  },
  {
    title: t('PLAN_DATE'),
    dataIndex: 'planDate',
    key: 'planDate',
    width: 85,
    render: planDate => {
      return (
        <>
          {moment(planDate[0]).format(getLocalDateFormat())}
          <br />
          {moment(planDate[1]).format(getLocalDateFormat())}
        </>
      );
    },
  },
  {
    title: t('DOMAIN_TYPE'),
    dataIndex: ['properties', 'warehouseDomainType'],
    key: 'propertiesWarehouseDomainType',
    width: 150,
    render: domainCode => renderTagForDomainTypes({ domainCode, t }),
  },
  {
    title: t('CURRENT_STEP'),
    dataIndex: 'currentStep',
    key: 'currentStep',
    width: 180,
    render: step => renderTagForStep({ step, t }),
  },
  {
    title: t('REFERENCE_DAY_1'),
    dataIndex: ['properties', 'referenceDay1'],
    key: 'propertiesReferenceDay1',
    width: 85,
    render: date => {
      return (
        <>
          {moment(date[0]).format(getLocalDateFormat())}
          <br />
          {moment(date[1]).format(getLocalDateFormat())}
        </>
      );
    },
  },
  {
    title: t('REFERENCE_DAY_2'),
    dataIndex: ['properties', 'referenceDay2'],
    key: 'propertiesReferenceDay2',
    width: 85,
    render: date => {
      return date?.length ? (
        <>
          {moment(date[0]).format(getLocalDateFormat())}
          <br />
          {moment(date[1]).format(getLocalDateFormat())}
        </>
      ) : (
        '-'
      );
    },
  },
  {
    title: t('RATE_1'),
    dataIndex: ['properties', 'rate1'],
    key: 'propertiesRate1',
    width: 100,
  },
  {
    title: t('RATE_2'),
    dataIndex: ['properties', 'rate2'],
    key: 'propertiesRate2',
    width: 100,
  },
  {
    title: t('GETIR_FOOD_RATE'),
    dataIndex: ['properties', 'getirFoodRate'],
    key: 'propertiesGetirFoodRate',
    width: 110,
  },
  {
    title: t('GETIR_LOCALS_RATE'),
    dataIndex: ['properties', 'getirLocalsRate'],
    key: 'propertiesGetirLocalsRate',
    width: 110,
  },
  {
    title: '',
    key: '_id',
    fixed: 'right',
    width: 130,
    render: obj => (
      <DetailButton
        id={obj._id}
        isPending={isPending}
        handleDelete={handleDelete}
      />
    ),
  },
];

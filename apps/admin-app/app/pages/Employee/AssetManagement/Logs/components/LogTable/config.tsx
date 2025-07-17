import { TFunction } from 'react-i18next';

import moment from 'moment';

import { getLangKey } from '@shared/i18n.ts';
import { getFormattedTableValue, getEffectedField } from '../../../utils';
import { LOCAL_DATE_TIME_FORMAT } from '../../../constants';

export const getTableColumns = ({ t }: {
  t: TFunction,
}) => {
  const langKey = getLangKey();
  return [
    {
      title: t('assetManagement:TIMESTAMP'),
      key: 'createdAt',
      dataIndex: 'createdAt',
      width: 90,
      align: 'left',
      render: (createdAt: moment.Moment | undefined) => moment(createdAt).format(LOCAL_DATE_TIME_FORMAT[langKey.toUpperCase()]) || '-',
    },
    {
      title: t('assetManagement:EFFECTED_LICENCE_NO'),
      dataIndex: ['relatedAsset', 'uniqueIdentifier'],
      key: 'relatedAsset',
      width: 100,
      align: 'left',
    },
    {
      title: t('assetManagement:ACTION_BY.ID'),
      dataIndex: ['actionBy', 'id'],
      key: 'actionById',
      width: 120,
      align: 'left',
    },
    {
      title: t('assetManagement:ACTION_BY.NAME'),
      dataIndex: ['actionBy', 'name'],
      key: 'actionByName',
      width: 100,
      align: 'left',
    },
    {
      title: t('assetManagement:EFFECTED_FIELD'),
      key: 'fieldPath',
      width: 100,
      align: 'left',
      render: (data: any) => {
        return getEffectedField(t, data);
      },
    },
    {
      title: t('assetManagement:PREVIOUS_VALUE'),
      dataIndex: 'oldValue',
      key: 'oldValue',
      align: 'left',
      width: 180,
      render: (oldValue: string, {
        fieldPath,
        model,
        modelType,
      }: { fieldPath: string, model: string, modelType: string }) => {
        return getFormattedTableValue(oldValue, { fieldPath, model, modelType });
      },
    },
    {
      title: t('assetManagement:LATEST_VALUE'),
      dataIndex: 'newValue',
      key: 'newValue',
      align: 'left',
      width: 180,
      render: (newValue: string, {
        fieldPath,
        model,
        modelType,
      }: { fieldPath: string, model: string, modelType: string }) => {
        return getFormattedTableValue(newValue, { fieldPath, model, modelType });
      },
    },
  ];
};

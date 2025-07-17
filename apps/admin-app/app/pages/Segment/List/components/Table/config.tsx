import React, { FunctionComponent } from 'react';
import { Button, Popconfirm, Tag, Tooltip, Typography } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';

import { getLocalDateTimeFormat } from '@shared/utils/localization';
import { ROUTE } from '@app/routes';
import { getSelectedLanguage } from '@shared/redux/selectors/languageSelection';
import permKey from '@shared/shared/permKey.json';

import { Creators } from '../../redux/actions';
import CsvImport from '../CsvImport';
import { Segment } from '../../../types';
import { COUNTRIES_GLOBAL_ACCESS, DOMAIN_TYPE_ALL_DOMAINS } from '@app/pages/Segment/components/Selector';

const { Text } = Typography;

type ColumnParameters = {
  t: (s: string) => string;
  dispatch: Dispatch;
  countriesMap: Record<string, ICountry>;
  Can: FunctionComponent;
  isResetClientsOfSegmentDisabled: boolean;
};

export const columns = ({ t, dispatch, countriesMap, Can, isResetClientsOfSegmentDisabled }: ColumnParameters) => [
  {
    title: t('SEGMENT'),
    dataIndex: 'segment',
    key: 'segment',
    width: 75,
    render: (segment: number) => segment || '-',
  },
  {
    title: t('DESCRIPTION'),
    dataIndex: 'description',
    key: 'description',
    render: (description: string) => (
      <Tooltip title={description} overlayStyle={{ pointerEvents: 'none' }}>
        <Text ellipsis>
          {description}
        </Text>
      </Tooltip>
    ),
  },
  {
    title: t('DOMAIN_TYPES'),
    dataIndex: 'domainTypes',
    key: 'domainTypes',
    render: (domainTypes?: number[]) => {
      if (domainTypes?.length && domainTypes[0] === DOMAIN_TYPE_ALL_DOMAINS) return t('ALL_DOMAIN_TYPES');

      return domainTypes?.map(domainType => <Tag>{t(`GETIR_MARKET_DOMAIN_TYPES.${domainType}`)}</Tag>);
    },
  },
  {
    title: t('COUNTRIES'),
    dataIndex: 'countryCodes',
    key: 'countryCodes',
    render: (countryCodes?: string[]) => {
      if (countryCodes?.length && countryCodes[0] === COUNTRIES_GLOBAL_ACCESS) return `🌐 - ${t('GLOBAL_ACCESS')}`;

      return (
        countryCodes?.map(code => {
          const countryName = countriesMap[code]?.name[getSelectedLanguage()];
          const countryCode = countriesMap[code]?.code.alpha3;
          const countryFlag = countriesMap[code]?.flag;
          return (
            <Tooltip
              title={countryName}
              key={countryCode}
            >
              <Tag>
                {countryFlag}
              </Tag>
            </Tooltip>
          );
        })
      );
    },
  },
  {
    title: t('CREATED_AT'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (createdAt: string) => moment(createdAt).format(getLocalDateTimeFormat()),
    width: 125,
  },
  {
    title: t('UPDATED_AT'),
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    render: (updatedAt: string) => moment(updatedAt).format(getLocalDateTimeFormat()),
    width: 125,
  },
  {
    title: t('EXPIRES_AT'),
    dataIndex: 'expireAt',
    key: 'expireAt',
    render: (expirationDate: string) => expirationDate && moment(expirationDate).format(getLocalDateTimeFormat()),
    width: 125,
  },
  {
    title: t('ACTION'),
    width: 250,
    render: (segment: Segment) => {
      return (
        <>
          <Can permKey={permKey.PAGE_SEGMENT_DETAIL}>
            <Link to={ROUTE.SEGMENT_DETAIL.path.replace(':segment', segment.segment?.toString())}>
              <Button size="small" disabled={!segment.segment}>
                {t('DETAIL')}
              </Button>
            </Link>&nbsp;
          </Can>
          <Can permKey={permKey.PAGE_SEGMENT_DETAIL_COMPONENT_EDIT_SEGMENT}>
            <CsvImport segment={segment} />&nbsp;
            <Popconfirm
              title={t('CONFIRM.RESET_CLIENTS_OF_SEGMENT')}
              onConfirm={() => dispatch(Creators.resetClientsOfSegmentRequest({ segment: segment?.segment }))}
            >
              <Button
                size="small"
                danger
                type="dashed"
                disabled={isResetClientsOfSegmentDisabled || !segment.segment}
              >
                {t('RESET_CLIENTS_OF_SEGMENT')}
              </Button>&nbsp;
            </Popconfirm>
          </Can>

          <Can permKey={permKey.PAGE_SEGMENT_DETAIL_COMPONENT_DELETE_SEGMENT}>
            <Popconfirm
              title={t('COMMON_CONFIRM_TEXT')}
              onConfirm={() => dispatch(Creators.deleteSegmentRequest({ segment: segment?.segment }))}
              disabled={!segment.segment}
            >
              <Button size="small" danger disabled={!segment.segment}>{t('DELETE')}</Button>
            </Popconfirm>
          </Can>
        </>
      );
    },
  },
];

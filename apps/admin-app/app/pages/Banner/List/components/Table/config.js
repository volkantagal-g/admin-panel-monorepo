import { Popover, Select, Tag } from 'antd';
import moment from 'moment';

import { get } from 'lodash';

import { Creators } from '@app/pages/Banner/List/redux/actions';
import { PROCESS_STATUS, BANNER_ACTIONS, BANNER_STATUS, BANNER_TYPE } from '@app/pages/Banner/constants';
import { getSelectedCountryTimeZones } from '@shared/redux/selectors/countrySelection';
import { bannerTypes } from '@app/pages/Banner/constantValues';
import { getLangKey } from '@shared/i18n';

const STATUS_MAP = {
  [BANNER_STATUS.ACTIVE]: {
    value: 'ACTIVE',
    color: 'green',
  },
  [BANNER_STATUS.INACTIVE]: {
    value: 'INACTIVE',
    color: 'magenta',
  },
};

// cancellable mapping
const INACTIVE_CANCELLABLES = [
  PROCESS_STATUS.CREATED,
  PROCESS_STATUS.PRE_PROCESS,
  PROCESS_STATUS.READY,
];

const CANCELLABLES = [
  PROCESS_STATUS.CREATED,
  PROCESS_STATUS.PRE_PROCESS,
  PROCESS_STATUS.READY,
  PROCESS_STATUS.IN_PROCESS,
];

const getEligibleActions = ({ status, processStatus, type }) => {
  const actions = [BANNER_ACTIONS.DETAIL];
  const eligibleActions = {
    [BANNER_STATUS.ACTIVE]() {
      if (CANCELLABLES.includes(processStatus)) {
        actions.push(BANNER_ACTIONS.CANCEL);
      }
    },
    [BANNER_STATUS.INACTIVE]() {
      if (INACTIVE_CANCELLABLES.includes(processStatus)) {
        actions.push(BANNER_ACTIONS.CANCEL);
      }
    },
  };
  (eligibleActions[status])();

  // Advert banners can not duplicate/edit on global panel
  if (type !== BANNER_TYPE.ADVERT) {
    actions.push(BANNER_ACTIONS.DUPLICATE);
  }

  return actions;
};

const actionOptions = ({ t, status, processStatus, type }) => getEligibleActions({ status, processStatus, type })
  .map(value => ({ label: t(value), value }));

const actionHandler = ({ id, dispatch, type, advertPanelUrl }) => action => {
  const actions = {
    [BANNER_ACTIONS.DETAIL]() {
      // If advert banner redirect to advert panel
      if (type === BANNER_TYPE.ADVERT) {
        window.location.replace(advertPanelUrl);
      }
      window.open(`/banner/detail/${id}`);
    },
    [BANNER_ACTIONS.CANCEL]() {
      dispatch(Creators.cancelRequest({ id }));
    },
    [BANNER_ACTIONS.DUPLICATE]() {
      dispatch(Creators.duplicateRequest({ id }));
    },
  };
  (actions[action])();
};

export const getTableColumns = (t, classes) => {
  const selectedCountryPrimaryTimeZone = getSelectedCountryTimeZones()[0]?.timezone;

  return [
    {
      title: t('BANNER_IMAGE'),
      key: 'image',
      width: 150,
      render: banner => {
        const { picBackgroundUrl, picUrl } = banner;

        const imageHolder = (
          <div className={classes.imageHolder}>
            {picBackgroundUrl && <img src={picBackgroundUrl} alt="PicUrl" className="foreground-image" />}
            {picUrl && <img src={picUrl} alt="PicUrl" className="main-image" />}
          </div>
        );

        return (
          <Popover content={<div className={classes.popover}>{imageHolder}</div>}>
            <div className="w-full">
              {imageHolder}
            </div>
          </Popover>

        );
      },
    },
    {
      title: t('BANNER_ID'),
      dataIndex: 'id',
      key: 'id',
      width: 200,
    },
    {
      title: t('CUSTOM_LABEL'),
      dataIndex: 'customTag',
      key: 'customTag',
      sorter: true,
      width: 150,
    },
    {
      title: t('TITLE'),
      dataIndex: 'title',
      key: 'title',
      width: 100,
    },
    {
      title: t('DESCRIPTION'),
      dataIndex: 'description',
      key: 'description',
      width: 200,
      minWidth: 150,
    },
    {
      title: t('START_DATE'),
      dataIndex: 'startDate',
      key: 'startDate',
      width: 150,
      sorter: true,
      render: startDate => moment.utc(startDate).tz(selectedCountryPrimaryTimeZone).format('DD.MM.YYYY HH:mm'),
    },
    {
      title: t('END_DATE'),
      dataIndex: 'endDate',
      key: 'endDate',
      width: 150,
      sorter: true,
      render: endDate => moment.utc(endDate).tz(selectedCountryPrimaryTimeZone).format('DD.MM.YYYY HH:mm'),
    },
    {
      title: t('TARGET_SERVICE'),
      dataIndex: 'targetDomain',
      key: 'targetDomain',
      sorter: true,
      width: 130,
    },
    {
      title: t('COMPONENT_TYPE'),
      dataIndex: 'componentType',
      key: 'componentType',
      sorter: true,
      width: 170,
    },
    {
      title: t('BANNER_TYPE'),
      key: 'type',
      width: 100,
      render: ({ type }) => (get(bannerTypes[type], getLangKey(), '')),
    },
    {
      title: t('PRIORITY'),
      dataIndex: 'priority',
      key: 'priority',
      sorter: true,
      width: 50,
    },
    {
      title: t('STATUS'),
      key: 'status',
      width: 100,
      render: banner => (
        <Tag color={STATUS_MAP[banner.status]?.color}>
          {t(`global:${STATUS_MAP[banner.status]?.value}`)}
        </Tag>
      ),
    },
  ];
};

export const generateTableColumns = ({ t, dispatch, filters, selectedHeaders, classes }) => {
  let tableColumns = getTableColumns(t, classes);
  if (selectedHeaders.length !== 0) {
    tableColumns = tableColumns.filter(header => {
      return selectedHeaders.includes(header.key);
    });
  }
  const actionColumn = {
    title: t('ACTION'),
    key: 'action',
    width: 150,
    fixed: 'right',
    render: ({ id, status, processStatus, type, advertPanelUrl }) => {
      return (
        <Select
          className="w-100"
          placeholder={t('ACTION')}
          value={null}
          options={actionOptions({ t, status, processStatus, type })}
          onSelect={actionHandler({ id, dispatch, filters, type, advertPanelUrl })}
        />
      );
    },
  };

  return [...tableColumns, actionColumn];
};

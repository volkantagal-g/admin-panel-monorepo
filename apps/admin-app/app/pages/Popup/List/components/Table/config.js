/* eslint-disable no-inline-styles/no-inline-styles */
import { Popover, Select, Tag, Tooltip } from 'antd';
import moment from 'moment-timezone';

import history from '@shared/utils/history';
import { POPUP_ACTION, POPUP_STATUS_TYPE } from '@app/pages/Popup/constants';
import { Creators } from '@app/pages/Popup/List/redux/actions';
import { getSelectedCountryTimeZones } from '@shared/redux/selectors/countrySelection';

const getEligibleActions = ({ status }) => {
  const actions = [POPUP_ACTION.DETAIL, POPUP_ACTION.DUPLICATE];

  const eligibleActions = {
    [POPUP_STATUS_TYPE.ACTIVE]() {
      // Action conditions will append on phase 2
    },
    [POPUP_STATUS_TYPE.INACTIVE]() {
      // Action conditions will append on phase 2
    },
  };

  (eligibleActions[status])();
  return actions;
};

const actionOptions = ({ t, status, processStatus }) => getEligibleActions({ status, processStatus })
  .map(value => ({ label: t(value), value }));

const actionHandler = ({ id, dispatch }) => action => {
  const actions = {
    [POPUP_ACTION.DETAIL]() {
      history.push(`/popup/detail/${id}`);
    },
    [POPUP_ACTION.DUPLICATE]() {
      dispatch(Creators.duplicatePopup({ id }));
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
        const { picUrl } = banner;

        const imageHolder = (
          <div className={classes.imageHolder}>
            {picUrl && <img src={picUrl} alt="PicUrl" />}
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
      title: t('POPUP_ID'),
      dataIndex: 'id',
      key: 'id',
      width: 160,
    },
    {
      title: t('POPUP_TYPE'),
      dataIndex: 'type',
      key: 'type',
      width: 100,
    },
    {
      title: t('POPUP_TITLE'),
      dataIndex: 'title',
      key: 'title',
      width: 200,
      ellipsis: { showTitle: false },
      sorter: true,
      minWidth: 150,
      render: title => (
        <Tooltip placement="topLeft" title={title}>
          {title}
        </Tooltip>
      ),
    },
    {
      title: t('TARGET_SERVICE'),
      dataIndex: 'domainType',
      key: 'domainType',
      sorter: true,
      width: 130,
    },
    {
      title: t('STARTING_DATE'),
      dataIndex: 'validFrom',
      key: 'validFrom',
      sorter: true,
      width: 150,
      render: validFrom => moment.utc(validFrom).tz(selectedCountryPrimaryTimeZone).format('DD.MM.YYYY HH:mm'),
    },
    {
      title: t('FINISH_DATE'),
      dataIndex: 'validUntil',
      key: 'validUntil',
      sorter: true,
      width: 120,
      render: validUntil => moment.utc(validUntil).tz(selectedCountryPrimaryTimeZone).format('DD.MM.YYYY HH:mm'),
    },
    {
      title: t('PRIORITY'),
      dataIndex: 'priority',
      key: 'priority',
      sorter: true,
      width: 70,
    },
    {
      title: t('VIEW_COUNT'),
      dataIndex: 'shownCount',
      key: 'shownCount',
      width: 110,
    },
    {
      title: t('STATUS'),
      key: 'status',
      width: 100,
      render: popup => {
        return (
          <Tag color={popup.status === POPUP_STATUS_TYPE.ACTIVE ? 'green' : 'magenta'}>
            {popup.status === POPUP_STATUS_TYPE.ACTIVE ?
              t('global:ACTIVE') :
              t('global:INACTIVE')}
          </Tag>
        );
      },
    },
  ];
};

export const generatePopupColumns = ({ t, dispatch, selectedHeaders, classes }) => {
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
    render: ({ id, status, processStatus }) => (
      <Select
        className="w-100"
        placeholder={t('SELECT')}
        options={actionOptions({ t, status, processStatus })}
        onChange={actionHandler({ id, dispatch })}
      />
    ),
  };
  return [...tableColumns, actionColumn];
};

import { Button, Checkbox, Popconfirm, Tag, Tooltip, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';

import { isString, isEmpty } from 'lodash';

import { CopyToClipboard } from '@shared/components/UI/CopyToClipboard';
import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import { getSelectedLanguage } from '@shared/redux/selectors/languageSelection';

const { Text } = Typography;

const displayDescription = description => {
  if (!description) return null;
  if (isString(description)) return description;
  return description[getSelectedLanguage()];
};

export const getTableColumns = ({
  t,
  hasPermissionToConfigEdit,
  onClickShowJSONModalBtn: handleClickShowJSONModalBtn,
  onClickEditConfigBtn: handeClickEditConfigBtn,
  onClickDelete,
  deleteConfigIsPending,
  Can,
}) => {
  return [
    {
      title: t('KEY'),
      dataIndex: 'key',
      key: 'key',
      width: 400,
      render: val => {
        const maxLength = 50;
        if (val.length <= maxLength) return <CopyToClipboard message={val} />;

        const inner = `${val.substr(0, maxLength - 3)}...`;
        return (
          <Tooltip
            overlayStyle={{ pointerEvents: 'none' }}
            title={val}
            placement="top"
          >
            {/* wrapper is needed for the tooltip to work */}
            <div>
              <CopyToClipboard message={val} inner={inner} />
            </div>
          </Tooltip>
        );
      },
    },
    {
      title: t('SHORT_DESCRIPTION'),
      dataIndex: 'description',
      key: 'description',
      width: 250,
      render: val => {
        const display = displayDescription(val);
        return (
          <Tooltip
            overlayStyle={{ pointerEvents: 'none' }}
            trigger="hover focus"
            title={display}
            placement="top"
          ><Text ellipsis>{display}</Text>
          </Tooltip>
        );
      },
    },
    {
      title: t('TYPE'),
      dataIndex: 'type',
      key: 'type',
      width: 80,
      render: (val, { isChild }) => {
        if (isChild) {
          return undefined;
        }
        return <Tag>{val}</Tag>;
      },
    },
    {
      title: t('VALUE'),
      dataIndex: 'value',
      key: 'value',
      width: 100,
      render: (value, config) => {
        if (['object', 'text', 'array'].includes(config.inputType)) {
          if (isEmpty(config.rawValue)) {
            return undefined;
          }
          return (
            <Button size="small" onClick={() => handleClickShowJSONModalBtn(config)}>
              {t('global:SHOW_AS_JSON')}
            </Button>
          );
        }
        if (config.inputType === 'checkbox') {
          return <Checkbox disabled checked={!!value} />;
        }

        return value;
      },
    },
    {
      title: t('COUNTRY_BASED'),
      dataIndex: 'isCustomEnabled',
      key: 'isCustomEnabled',
      align: 'center',
      width: 100,
      render: (val, { isChild }) => {
        if (isChild) {
          return undefined;
        }
        return <Checkbox disabled checked={!!val} />;
      },
    },
    {
      title: t('RESPONSIBLE_SQUAD'),
      dataIndex: 'responsibleSquad',
      key: 'responsibleSquad',
      width: 150,
      render: val => (
        <Tooltip
          overlayStyle={{ pointerEvents: 'none' }}
          trigger="hover focus"
          title={val}
          placement="top"
        ><Text ellipsis>{val}</Text>
        </Tooltip>
      ),
    },
    {
      title: t('ACTION'),
      dataIndex: 'key',
      key: 'actions',
      align: 'center',
      width: 190,
      render: (_val, config) => {
        return (
          <>
            {hasPermissionToConfigEdit && (
            <Button size="small" type="ghost" onClick={() => handeClickEditConfigBtn(config)}>
              {t('global:EDIT')}
            </Button>
            )}
            {/* child country level rows shouldn't have log detail button */}
            {!config?.parentConfig && (
              <Can permKey={permKey.PAGE_CONFIG_LOG}>
                <Link className="ml-1" to={ROUTE.CONFIG_LOG.path.replace(':key', config.key)}>
                  <Button size="small" type="ghost">
                    {t('LOGS')}
                  </Button>
                </Link>
              </Can>
            ) }
            {!config?.parentConfig && (
              <Can permKey={permKey.PAGE_CONFIG_LIST_COMPONENT_DELETE_CONFIG}>
                <Popconfirm
                  title={t('global:COMMON_CONFIRM_TEXT')}
                  onConfirm={() => onClickDelete(config)}
                  okText={t('global:YES')}
                  cancelText={t('global:NO')}
                >
                  <Button
                    size="small"
                    className="ml-1"
                    type="danger"
                    loading={deleteConfigIsPending}
                    icon={<DeleteOutlined />}
                  >
                    {t('global:DELETE')}
                  </Button>
                </Popconfirm>
              </Can>
            )}
          </>
        );
      },
    },
  ];
};

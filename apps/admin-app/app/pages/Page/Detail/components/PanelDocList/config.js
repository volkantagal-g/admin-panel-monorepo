import { Link } from 'react-router-dom';
import { Popconfirm, Button, Switch, Tooltip } from 'antd';
import moment from 'moment';
import { UserDeleteOutlined } from '@ant-design/icons';
import { get } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { ROUTE } from '@app/routes';
import { getValidationSchema } from '@app/pages/PanelDoc/Detail/components/PanelDocForm/formHelper';
import AnalyticsService from '@shared/services/analytics';
import { PANEL_EVENTS } from '@shared/shared/analyticsConstants';

const DATE_FORMAT = 'YYYY.MM.DD';

export const getTableColumns = ({
  t,
  handleRemovePanelDocItem,
  hasAccessToUserPanelDocDetail,
  hasAccessToUserPanelDocRemove,
  classes,
  handleActivenessChange,
  isPendingUpdateActiveness,
  isRemoveDocPending,
}) => {
  return [
    {
      title: '#',
      key: '_index',
      width: 50,
      render: (text, record, index) => index + 1,
    },
    {
      title: t('COMPONENTS.PAGE_DETAIL.PANEL_DOCUMENTATION_TABLE.NAME'),
      dataIndex: 'name',
      key: 'name',
      width: 230,
      render: name => {
        return name[getLangKey()] || '-';
      },
    },
    {
      title: t('COMPONENTS.PAGE_DETAIL.PANEL_DOCUMENTATION_TABLE.DESCRIPTION'),
      dataIndex: 'description',
      key: 'description',
      width: 230,
      render: description => {
        return description?.[getLangKey()] || '-';
      },
    },
    {
      title: t('COMPONENTS.PAGE_DETAIL.PANEL_DOCUMENTATION_TABLE.NUMBER_OF_FILES'),
      dataIndex: 'files',
      key: 'files',
      width: 80,
      align: 'right',
      render: files => {
        if (files.length <= 0) return '-';
        return files.length;
      },
    },
    {
      title: t('COMPONENTS.PAGE_DETAIL.PANEL_DOCUMENTATION_TABLE.CREATED_BY'),
      dataIndex: 'createdBy',
      key: 'createdBy',
      width: 100,
      render: createdBy => {
        return get(createdBy, 'name', '-');
      },
    },
    {
      title: t('COMPONENTS.PAGE_DETAIL.PANEL_DOCUMENTATION_TABLE.CREATED_DATE'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 100,
      render: createdAt => {
        return moment(createdAt).format(DATE_FORMAT) || ' ';
      },
    },
    {
      title: t('COMPONENTS.PAGE_DETAIL.PANEL_DOCUMENTATION_TABLE.UPDATED_BY'),
      dataIndex: 'updatedBy',
      key: 'updatedBy',
      width: 100,
      render: updatedBy => {
        return get(updatedBy, 'name', '-');
      },
    },
    {
      title: t('COMPONENTS.PAGE_DETAIL.PANEL_DOCUMENTATION_TABLE.LAST_UPDATED'),
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 100,
      render: updatedAt => {
        return moment(updatedAt).format(DATE_FORMAT) || ' ';
      },
    },
    {
      title: t('COMPONENTS.PAGE_DETAIL.PANEL_DOCUMENTATION_TABLE.ACTIVENESS'),
      dataIndex: 'isActive',
      key: 'isActive',
      align: 'center',
      width: 80,
      render: (isActive, row) => {
        let isDisabled = !hasAccessToUserPanelDocRemove;

        if (!isActive) {
          const fakePanelDoc = { ...row, isActive: true };
          const isValidToActivate = getValidationSchema({ panelDocData: fakePanelDoc, t }).isValidSync(fakePanelDoc);
          isDisabled = !isValidToActivate || isDisabled;
        }

        // show the tooltip for only page owners when it is disabled
        const title = (hasAccessToUserPanelDocRemove && isDisabled)
          ? t('COMPONENTS.PAGE_DETAIL.PANEL_DOCUMENTATION_TABLE.ACTIVENESS_TOOLTIP_TITLE')
          : undefined;
        return (
          <Tooltip title={title}>
            <Switch
              loading={isPendingUpdateActiveness || isRemoveDocPending}
              checkedChildren={t('ACTIVE')}
              unCheckedChildren={t('INACTIVE')}
              checked={isActive}
              disabled={isDisabled}
              onChange={checked => {
                handleActivenessChange({ checked, panelDocId: row._id });
              }}
            />
          </Tooltip>
        );
      },
    },
    {
      title: t('COMPONENTS.PAGE_DETAIL.PANEL_DOCUMENTATION_TABLE.ACTION'),
      dataIndex: '_id',
      key: '_id',
      width: 140,
      align: 'center',
      render: (id, record) => {
        return (
          <>
            {
              (hasAccessToUserPanelDocRemove && !record.isActive) && (
                <Popconfirm
                  title={t('COMPONENTS.PAGE_DETAIL.PANEL_DOCUMENTATION_TABLE.REMOVE_TITLE')}
                  okText={t('button:YES')}
                  cancelText={t('button:CANCEL')}
                  onConfirm={() => {
                    handleRemovePanelDocItem({ panelDocId: id });
                  }}
                >
                  <Button
                    size="small"
                    type="danger"
                    loading={isPendingUpdateActiveness || isRemoveDocPending}
                    className={classes.actionButton}
                    icon={<UserDeleteOutlined />}
                  >
                    {t('button:REMOVE')}
                  </Button>
                </Popconfirm>
              )
            }
            {
              hasAccessToUserPanelDocDetail ? (
                <Link to={ROUTE.PANEL_DOC_DETAIL.path.replace(':id', id)}>
                  <Button
                    size="small"
                    type="ghost"
                    className={classes.actionButton}
                    loading={isPendingUpdateActiveness || isRemoveDocPending}
                    onClick={() => AnalyticsService.track(PANEL_EVENTS.PAGE_DETAIL.EVENT_NAME, { button: PANEL_EVENTS.PAGE_DETAIL.BUTTON.DOC_INFO_DETAIL })}
                  >
                    {t('global:DETAIL')}
                  </Button>
                </Link>
              ) : undefined
            }
          </>
        );
      },
    },
  ];
};

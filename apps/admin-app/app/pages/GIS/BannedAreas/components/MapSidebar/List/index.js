import { Card, List, Button, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useCallback, useMemo } from 'react';

import { orderBy } from 'lodash';

import { Creators } from '@app/pages/GIS/BannedAreas/redux/actions';
import useStyles from './styles';

function BannedAreasList({ isScheduledBanList, bannedAreas, isPending }) {
  const dispatch = useDispatch();
  const { t } = useTranslation('gisBannedAreasPage');
  const classes = useStyles();
  const { confirm } = Modal;

  const deactivateBan = useCallback(item => {
    if (isScheduledBanList) {
      return dispatch(Creators.deactivateScheduledBannedAreaRequest({ scheduledBannedAreaId: item.id }));
    }
    return dispatch(Creators.deactivateBannedAreaRequest({ id: item.id, polygonType: item.type }));
  }, [dispatch, isScheduledBanList]);

  function showConfirm(item) {
    confirm({
      title: t('CONFIRM_DELETE_BAN'),
      icon: <ExclamationCircleOutlined />,
      content: item.name,
      onOk() {
        deactivateBan(item);
      },
    });
  }

  const sortedBannedAreas = useMemo(() => {
    const sortingField = isScheduledBanList ? 'polygonType' : 'type';
    const sortingList = isScheduledBanList ? bannedAreas.features.map(item => item.properties) : bannedAreas;
    return orderBy(sortingList, ['createDate', sortingField], ['asc', 'asc']);
  }, [bannedAreas, isScheduledBanList]);

  return (
    <Card
      title={t('BANNED_AREAS')}
      className={classes.cardWrapper}
      data-testid="banned-areas-sidebar-card"
    >
      <List
        size="small"
        className={classes.listWrapper}
        itemLayout="horizontal"
        dataSource={sortedBannedAreas}
        data-testid="banned-areas-list"
        loading={isPending}
        renderItem={item => (
          <List.Item key={item.id}>
            <List.Item.Meta title={item.name} />
            <Button
              type="primary"
              className={classes.deleteButton}
              danger
              size="small"
              icon={<DeleteOutlined />}
              onClick={() => showConfirm(item)}
            >
              {t('button:DELETE')}
            </Button>
          </List.Item>
        )}
      />
    </Card>
  );
}

export default BannedAreasList;

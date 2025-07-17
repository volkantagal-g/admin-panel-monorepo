import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useMemo, useCallback, useRef } from 'react';
import { Badge, Avatar, Row, Col, Button, Tooltip } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import AntTable from '@shared/components/UI/AntTableV2';
import Card from '@shared/components/UI/AntCard';
import { tableColumns } from './config';
import Spinner from '@shared/components/Spinner';
import { orderReturnsSelector } from '../../redux/selectors';
import hand from '@shared/assets/markers/artisan_order_hand.png';
import checkCircle from '@shared/assets/markers/artisan_order_checkcircle.png';
import clipboardCheck from '@shared/assets/markers/artisan_order_clipboardcheck.png';
import home from '@shared/assets/markers/artisan_order_home.png';
import officeBuilding from '@shared/assets/markers/artisan_order_officebuilding.png';
import done from '@shared/assets/markers/artisan_order_done.png';
import canceled from '@shared/assets/markers/artisan_order_canceled.png';
import useStyles from '@app/pages/ArtisanOrder/Detail/styles';
import { formatDate } from '@shared/utils/dateHelper';
import {
  COURIER_TASKS_ICON_OPACITY,
  COURIER_TASK_STATUS,
  COURIER_TASKS_ICON_NAME,
  COURIER_TASK_TYPE,
  COURIER_RETURN_STATUS_CANCELED,
  COURIER_STATUS_FREE,
  COURIER_RETURN_TASKS_ICON_INDEX,
  COURIER_RETURN_STATUS_ONWAY_TO_PICKUP,
  COURIER_RETURN_STATUS_PICKUP_FROM_CLIENT,
  COURIER_RETURN_STATUS_ONWAY_TO_DELIVER,
  COURIER_RETURN_STATUS_DELIVER_TO_SHOP,
  COURIER_RETURN_HISTORY,
} from '@shared/shared/constants';
import {
  calculateDiffTime,
  getIndex,
  getBackgroundColor,
  batchedIconMarginLeft,
  batchedIconOpacity,
  batchedIconPosition,
  batchIndexStyle,
} from '@app/pages/ArtisanOrder/Detail/util';

const BatchedReturnsTable = ({
  orderDetailId,
  returnId,
  isPendingCourierTasks,
  courier,
  courierReturnTasks,
  isPendingOrderDetail,
  returnDetailsWithReturnIdsData,
}) => {
  const classes = useStyles();
  const [t] = useTranslation('artisanOrderPage');
  const { returnHistory, selectedSlotDate, selectedSlotTime } = useSelector(orderReturnsSelector.getData);

  const ref = useRef(null);

  const scroll = scrollOffset => {
    ref.current.scrollLeft += scrollOffset;
  };

  const getOpacity = (index, icon, carrier) => {
    let opacity = COURIER_TASKS_ICON_OPACITY.TRANSPARENT;
    if (carrier?.status === COURIER_RETURN_STATUS_CANCELED) {
      opacity = COURIER_TASKS_ICON_OPACITY.TRANSPARENT;
    }
    else {
      switch (index) {
        case COURIER_RETURN_TASKS_ICON_INDEX.VERIFIED:
          if ((icon.status <= carrier?.status) ||
          carrier?.status === COURIER_RETURN_STATUS_ONWAY_TO_PICKUP) {
            opacity = COURIER_TASKS_ICON_OPACITY.NOT_TRANSPARENT;
          }
          break;
        case COURIER_RETURN_TASKS_ICON_INDEX.REACHED_TO_CLIENT:
          if ((icon.status <= carrier?.status) ||
          carrier?.status === COURIER_RETURN_STATUS_PICKUP_FROM_CLIENT) {
            opacity = COURIER_TASKS_ICON_OPACITY.NOT_TRANSPARENT;
          }
          break;
        case COURIER_RETURN_TASKS_ICON_INDEX.RECEIVED:
          if ((icon.status <= carrier?.status) ||
          carrier?.status === COURIER_RETURN_STATUS_ONWAY_TO_DELIVER) {
            opacity = COURIER_TASKS_ICON_OPACITY.NOT_TRANSPARENT;
          }
          break;
        case COURIER_RETURN_TASKS_ICON_INDEX.REACHED_TO_SHOP:
          if ((icon.status <= carrier?.status) ||
          carrier?.status === COURIER_RETURN_STATUS_DELIVER_TO_SHOP) {
            opacity = COURIER_TASKS_ICON_OPACITY.NOT_TRANSPARENT;
          }
          break;
        default:
          opacity = COURIER_TASKS_ICON_OPACITY.TRANSPARENT;
          break;
      }
    }
    return opacity;
  };

  const isVisible = (index, icon, carrier) => {
    let isVisibled = false;
    if (carrier?.status === COURIER_RETURN_STATUS_CANCELED) {
      isVisibled = true;
    }
    else {
      switch (index) {
        case COURIER_RETURN_TASKS_ICON_INDEX.VERIFIED:
          if ((icon.status <= carrier?.status) ||
          carrier?.status === COURIER_RETURN_STATUS_ONWAY_TO_PICKUP) {
            isVisibled = true;
          }
          break;
        case COURIER_RETURN_TASKS_ICON_INDEX.REACHED_TO_CLIENT:
          if ((icon.status <= carrier?.status) ||
          carrier?.status === COURIER_RETURN_STATUS_PICKUP_FROM_CLIENT) {
            isVisibled = true;
          }
          break;
        case COURIER_RETURN_TASKS_ICON_INDEX.RECEIVED:
          if ((icon.status <= carrier?.status) ||
          carrier?.status === COURIER_RETURN_STATUS_ONWAY_TO_DELIVER) {
            isVisibled = true;
          }
          break;
        case COURIER_RETURN_TASKS_ICON_INDEX.REACHED_TO_SHOP:
          if ((icon.status <= carrier?.status) ||
          carrier?.status === COURIER_RETURN_STATUS_DELIVER_TO_SHOP) {
            isVisibled = true;
          }
          break;
        default:
          isVisibled = false;
          break;
      }
    }
    return isVisibled;
  };

  const getHappenedDate = useCallback(iconName => {
    let date = '';
    switch (iconName) {
      case COURIER_TASKS_ICON_NAME.CLIPBOARD_CHECK_ICON:
        date = returnHistory ? returnHistory.find(history => history.what === COURIER_RETURN_HISTORY.ON_WAY)?.happenedDate : '';
        break;
      case COURIER_TASKS_ICON_NAME.HOME_ICON:
        date = returnHistory ? returnHistory.find(history => history.what === COURIER_RETURN_HISTORY.REACHED_TO_CUSTOMER)?.happenedDate : '';
        break;
      case COURIER_TASKS_ICON_NAME.HAND_ICON:
        date = returnHistory ? returnHistory.find(history => history.what === COURIER_RETURN_HISTORY.RECEIVED_RETURN)?.happenedDate : '';
        break;
      case COURIER_TASKS_ICON_NAME.OFFICE_BUILDING_ICON:
        date = returnHistory ? returnHistory.find(history => history.what === COURIER_RETURN_HISTORY.REACHED_TO_SHOP)?.happenedDate : '';
        break;
      case COURIER_TASKS_ICON_NAME.CHECK_CIRCLE_ICON:
        date = returnHistory ? returnHistory.find(history => history.what === COURIER_RETURN_HISTORY.DELIVER_TO_SHOP)?.happenedDate : '';
        break;
      default:
        date = '';
        break;
    }
    return date;
  }, [returnHistory]);

  const iconProps = useMemo(() => {
    return [
      {
        icon: clipboardCheck,
        iconName: COURIER_TASKS_ICON_NAME.CLIPBOARD_CHECK_ICON,
        type: COURIER_TASK_TYPE.PICKUP,
        status: COURIER_RETURN_STATUS_ONWAY_TO_PICKUP,
        tooltipText: t('RETURN_DETAILS_BATCHED_TIMELINE.RETURN_VERIFIED'),
        date: formatDate(getHappenedDate(COURIER_TASKS_ICON_NAME.CLIPBOARD_CHECK_ICON)),
      },
      {
        icon: home,
        iconName: COURIER_TASKS_ICON_NAME.HOME_ICON,
        type: COURIER_TASK_TYPE.PICKUP,
        status: COURIER_RETURN_STATUS_PICKUP_FROM_CLIENT,
        tooltipText: t('RETURN_DETAILS_BATCHED_TIMELINE.REACHED'),
        date: formatDate(getHappenedDate(COURIER_TASKS_ICON_NAME.HOME_ICON)),
        diffTime: calculateDiffTime(
          getHappenedDate(COURIER_TASKS_ICON_NAME.CLIPBOARD_CHECK_ICON),
          getHappenedDate(COURIER_TASKS_ICON_NAME.HOME_ICON),
        ),
      },
      {
        icon: hand,
        iconName: COURIER_TASKS_ICON_NAME.HAND_ICON,
        type: COURIER_TASK_TYPE.PICKUP,
        status: COURIER_RETURN_STATUS_ONWAY_TO_DELIVER,
        tooltipText: t('RETURN_DETAILS_BATCHED_TIMELINE.HANDOVER'),
        date: formatDate(getHappenedDate(COURIER_TASKS_ICON_NAME.HAND_ICON)),
        diffTime: calculateDiffTime(
          getHappenedDate(COURIER_TASKS_ICON_NAME.HOME_ICON),
          getHappenedDate(COURIER_TASKS_ICON_NAME.HAND_ICON),
        ),
      },
      {
        icon: officeBuilding,
        iconName: COURIER_TASKS_ICON_NAME.OFFICE_BUILDING_ICON,
        type: COURIER_TASK_TYPE.DELIVERY,
        status: COURIER_RETURN_STATUS_DELIVER_TO_SHOP,
        tooltipText: t('RETURN_DETAILS_BATCHED_TIMELINE.REACHED_TO_SHOP'),
        date: formatDate(getHappenedDate(COURIER_TASKS_ICON_NAME.OFFICE_BUILDING_ICON)),
        diffTime: calculateDiffTime(
          getHappenedDate(COURIER_TASKS_ICON_NAME.HAND_ICON),
          getHappenedDate(COURIER_TASKS_ICON_NAME.OFFICE_BUILDING_ICON),
        ),
      },
      {
        icon: checkCircle,
        iconName: COURIER_TASKS_ICON_NAME.CHECK_CIRCLE_ICON,
        type: COURIER_TASK_TYPE.DELIVERY,
        status: COURIER_STATUS_FREE,
        tooltipText: t('RETURN_DETAILS_BATCHED_TIMELINE.DELIVERED'),
        date: formatDate(getHappenedDate(COURIER_TASKS_ICON_NAME.CHECK_CIRCLE_ICON)),
        diffTime: calculateDiffTime(
          getHappenedDate(COURIER_TASKS_ICON_NAME.OFFICE_BUILDING_ICON),
          getHappenedDate(COURIER_TASKS_ICON_NAME.CHECK_CIRCLE_ICON),
        ),
      },
    ];
  }, [getHappenedDate, t]);

  const getArrangedReturnData = useMemo(() => {
    const arrangedData = [];
    if (courierReturnTasks.length > 0) {
      courierReturnTasks.forEach((task, taskIndex) => {
        const createTempObj = (iconProp, extraFieldObj, style) => {
          if (extraFieldObj.type === task.type) {
            const tempObj = {
              index: getIndex(task, courierReturnTasks),
              style: {
                backgroundColor: getBackgroundColor(arrangedData, task, courierReturnTasks),
                marginLeft: batchedIconMarginLeft,
                position: batchedIconPosition,
                opacity: style?.opacity || 1,
                ...style,
              },
              tooltipText: iconProp.tooltipText,
              icon: iconProp.icon,
              status: task.status,
              id: task.orderId,
              ...extraFieldObj,
            };
            arrangedData.push(tempObj);
          }
        };
        if (task.status === COURIER_TASK_STATUS.COMPLETED) {
          iconProps.forEach(iconProp => {
            const { iconName, type, diffTime } = iconProp;
            createTempObj(iconProp, { iconName, type, isVisible: true, diffTime });
          });
        }
        else if (task.status === COURIER_TASK_STATUS.ASSIGNED) {
          iconProps.forEach((iconProp, index) => {
            const { iconName, type, diffTime } = iconProp;
            createTempObj(
              iconProp,
              { iconName, type, isVisible: isVisible(index, iconProp, courier, task), diffTime },
              { opacity: getOpacity(index, iconProp, courier) },
            );
          });
        }
        else if (task.status === COURIER_TASK_STATUS.PENDING) {
          iconProps.forEach(iconProp => {
            const { type, diffTime } = iconProp;
            createTempObj(
              iconProp,
              { type, isVisible: false, diffTime },
              { opacity: batchedIconOpacity },
            );
          });
        }
        else if (task.status === COURIER_TASK_STATUS.CANCELLED) {
          iconProps.forEach(iconProp => {
            const { iconName, type, diffTime } = iconProp;
            createTempObj(
              iconProp,
              {
                iconName,
                type,
                isVisible: true,
                diffTime,
                isNextTaskCancelAlert: (
                  courierReturnTasks.slice(taskIndex + 1).find(el => el.orderId === task.orderId)?.status ===
                  COURIER_TASK_STATUS.CANCEL_ALERT
                ),
              },
              { opacity: batchedIconOpacity },
            );
          });
        }
        else if (task.status === COURIER_TASK_STATUS.CANCEL_ALERT) {
          iconProps.forEach(iconProp => {
            const { type, diffTime } = iconProp;
            createTempObj(
              iconProp,
              { type, isVisible: true, diffTime },
              { opacity: batchedIconOpacity },
            );
          });
        }
      });
      return arrangedData;
    }
    return [];
  }, [courier, courierReturnTasks, iconProps]);

  const arrangedTableData = useMemo(() => {
    if (courierReturnTasks?.length > 0) {
      const resultData = [...new Map(courierReturnTasks.map(task => [task.orderId, task])).values()].map((task, index) => (
        { ...task, batchIndex: index + 1 }
      ));
      returnDetailsWithReturnIdsData.forEach(returnDetail => {
        if (returnDetail?.orderId && returnDetail?.requestedDate) {
          const result = resultData.find(res => res.orderId === returnDetail.uid);
          if (result) {
            result.orderId = returnDetail.orderId;
            result.requestedDate = returnDetail.requestedDate;
          }
        }
      });
      return resultData;
    }
    return [];
  }, [courierReturnTasks, returnDetailsWithReturnIdsData]);

  const uniqCourierTaskIcons = [...new Map(getArrangedReturnData.map(o => [JSON.stringify(o), o])).values()];

  if (isPendingCourierTasks || isPendingOrderDetail) {
    return <Spinner />;
  }
  return (
    <>
      {
        (courierReturnTasks?.length > 0) && (
          <Card>
            <div className={classes.timelineTitleContent}>
              <b className={classes.timelineTitle}>{t('BATCHED_RETURN_TIMELINE')}</b>
              <div className={classes.scrollButtonGroup}>
                <Button className={classes.scrollButton} onClick={() => scroll(-56)}>
                  <LeftOutlined />
                </Button>
                <Button className={classes.scrollButton} onClick={() => scroll(56)}>
                  <RightOutlined />
                </Button>
              </div>
            </div>
            <Row justify="center">
              <Col span={20}>
                <div
                  className={classes.batchedOrdersTimelineMultiOrder}
                  ref={ref}
                >
                  {
                    uniqCourierTaskIcons.map((icon, i) => (
                      <div key={`icon_${icon.index}_${icon.tooltipText}`}>
                        <Tooltip
                          placement="top"
                          title={
                            (
                              <span>
                                {
                                  (icon.status === COURIER_TASK_STATUS.CANCELLED && !icon.isNextTaskCancelAlert) && (
                                    <b>{ `${t('RETURN_DETAILS_BATCHED_TIMELINE.RETURN')} 
                                    ${icon.index + 1} - ${t('RETURN_DETAILS_BATCHED_TIMELINE.CANCELLED_RETURN')}`}
                                    </b>
                                  )
                                }
                                {
                                  (icon.status !== COURIER_TASK_STATUS.CANCELLED || icon.isNextTaskCancelAlert) && (
                                    <b>{ `${t('RETURN_DETAILS_BATCHED_TIMELINE.RETURN')} 
                                    ${icon.index + 1} - ${icon.tooltipText}`}
                                    </b>
                                  )
                                }
                                <br />
                                {returnId === icon.id && iconProps.find(el => el.iconName === icon.iconName)?.date}
                              </span>
                            )
                          }
                        >
                          <Badge
                            size="small"
                            key={icon.index}
                            count={icon.index + 1}
                            style={batchIndexStyle}
                          >
                            <Avatar
                              key={`avatar_${icon.index}_${icon.iconName}`}
                              shape="square"
                              style={icon.style}
                            >
                              <img src={icon.icon} alt="" />
                            </Avatar>
                            {
                              icon.isVisible && (
                                <img
                                  src={
                                    (icon.status === COURIER_TASK_STATUS.CANCELLED ||
                                    icon.status === COURIER_TASK_STATUS.CANCEL_ALERT ||
                                    (icon.status === COURIER_TASK_STATUS.ASSIGNED && courier?.status === COURIER_RETURN_STATUS_CANCELED)) ?
                                      canceled : done
                                  }
                                  className={classes.avatarLeftCorner}
                                  alt=""
                                />
                              )
                            }
                            <span
                              className={classes.triangle}
                              style={{ borderTopColor: icon.style.backgroundColor, opacity: icon.style.opacity }}
                            />
                            {
                              i !== 0 && (
                                <div className={classes.progressBar}>
                                  {
                                    ((icon.status === COURIER_TASK_STATUS.COMPLETED ||
                                      icon.status === COURIER_TASK_STATUS.CANCELLED ||
                                      (icon.status === COURIER_TASK_STATUS.ASSIGNED && icon.style.opacity === 1) ||
                                      (icon.status === COURIER_TASK_STATUS.ASSIGNED && courier?.status === COURIER_RETURN_STATUS_CANCELED)) &&
                                      returnId === icon.id && icon?.diffTime) && (
                                      <span className={classes.progress}>
                                        {icon.diffTime + t('MINUTE_SHORT').toLowerCase()}
                                      </span>
                                    )
                                  }
                                </div>
                              )
                            }
                          </Badge>
                        </Tooltip>
                      </div>
                    ))
                  }
                </div>
              </Col>
            </Row>
            <div className={classes.tableTitleContent}>
              <b className={classes.tableTitle}>{t('RETURNS')}</b>
              <span className={classes.tableTitle}>
                <span className={classes.slot}>{t('SLOT')}</span> <br />
                {
                  (selectedSlotDate && selectedSlotTime) && (
                    <span className={classes.slotDate}>{`${selectedSlotDate} - ${selectedSlotTime}`}</span>
                  )
                }
              </span>
            </div>
            <AntTable
              data={arrangedTableData}
              columns={tableColumns({ orderDetailId, returnId, courierReturnTasks, t })}
              loading={isPendingCourierTasks}
            />
          </Card>
        )
      }
      <div />
    </>
  );
};
export default BatchedReturnsTable;

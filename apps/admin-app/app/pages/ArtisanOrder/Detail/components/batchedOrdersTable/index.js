import { useTranslation } from 'react-i18next';
import { useMemo, useCallback, useRef } from 'react';
import { Badge, Avatar, Row, Col, Button, Tooltip } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import AntTable from '@shared/components/UI/AntTableV2';
import Card from '@shared/components/UI/AntCard';

import {
  COURIER_TASKS_ICON_OPACITY,
  COURIER_TASKS_ICON_INDEX,
  COURIER_TASK_STATUS,
  COURIER_TASKS_ICON_NAME,
  COURIER_TASK_TYPE,
  COURIER_STATUS_PREPARING,
  COURIER_STATUS_VERIFYING,
  COURIER_STATUS_CANCELED,
  COURIER_STATUS_REACHED_TO_RESTAURANT,
  GETIR_LOCALS_DOMAIN_TYPE,
} from '@shared/shared/constants';
import {
  calculateDiffTime,
  batchedIconMarginLeft,
  batchedIconOpacity,
  batchedIconPosition,
  batchIndexStyle,
  iconColors,
} from '@app/pages/ArtisanOrder/Detail/util';
import Spinner from '@shared/components/Spinner';
import { tableColumns } from './config';
import hand from '@shared/assets/markers/artisan_order_hand.png';
import checkCircle from '@shared/assets/markers/artisan_order_checkcircle.png';
import clipboardCheck from '@shared/assets/markers/artisan_order_clipboardcheck.png';
import home from '@shared/assets/markers/artisan_order_home.png';
import officeBuilding from '@shared/assets/markers/artisan_order_officebuilding.png';
import done from '@shared/assets/markers/artisan_order_done.png';
import canceled from '@shared/assets/markers/artisan_order_canceled.png';
import useStyles from '@app/pages/ArtisanOrder/Detail/styles';
import { formatDate } from '@shared/utils/dateHelper';

const BatchedOrdersTable = ({
  orderDetailId,
  courier,
  courierVerifyAfterCheckoutDate,
  courierReachedToShopDate,
  courierVerifyDate,
  reachDate,
  deliverDate,
  courierOrderTasks,
  isPendingCourierTasks,
  isPendingOrderDetail,
  isInQueue,
}) => {
  const classes = useStyles();
  const [t] = useTranslation('artisanOrderPage');
  const ref = useRef(null);
  const { normalFont } = classes;

  const scroll = scrollOffset => {
    ref.current.scrollLeft += scrollOffset;
  };

  const getIndex = useCallback(task => {
    return [...new Map(courierOrderTasks.map(courierTask => [courierTask.orderId, courierTask])).values()].findIndex(uniqueCourierTask => {
      return uniqueCourierTask.orderId === task.orderId;
    });
  }, [courierOrderTasks]);

  const getBackgroundColor = useCallback((prevState, task) => {
    let color = '';
    if (prevState.find(order => order.id === task.orderId)) {
      color = prevState.find(order => order.id === task.orderId).style.backgroundColor;
    }
    else {
      const colorIndex = [...new Map(courierOrderTasks.map(courierTask => [courierTask.orderId, courierTask])).values()].findIndex(uniqueCourierTask => {
        return uniqueCourierTask.orderId === task.orderId;
      });
      color = iconColors[colorIndex];
    }
    return color;
  }, [courierOrderTasks]);

  const getOpacity = useCallback((index, icon, carrier, task) => {
    let opacity = COURIER_TASKS_ICON_OPACITY.TRANSPARENT;
    if (carrier?.status === COURIER_STATUS_CANCELED) {
      opacity = COURIER_TASKS_ICON_OPACITY.TRANSPARENT;
    }
    else {
      switch (index) {
        case COURIER_TASKS_ICON_INDEX.REACHED_TO_SHOP:
          if ((icon.status <= carrier?.status && carrier?.status !== COURIER_STATUS_PREPARING) ||
          carrier?.status === COURIER_STATUS_VERIFYING) {
            opacity = COURIER_TASKS_ICON_OPACITY.NOT_TRANSPARENT;
          }
          break;
        case COURIER_TASKS_ICON_INDEX.RECEIVED:
          if (
            icon.status <= carrier?.status &&
            carrier?.status !== COURIER_STATUS_PREPARING &&
            carrier?.status !== COURIER_STATUS_REACHED_TO_RESTAURANT) {
            opacity = COURIER_TASKS_ICON_OPACITY.NOT_TRANSPARENT;
          }
          break;
        case COURIER_TASKS_ICON_INDEX.REACHED_TO_CLIENT:
          if (icon.status <= carrier?.status) {
            opacity = COURIER_TASKS_ICON_OPACITY.NOT_TRANSPARENT;
          }
          break;
        case COURIER_TASKS_ICON_INDEX.DELIVERED:
          if (icon.status === carrier?.status) {
            opacity = COURIER_TASKS_ICON_OPACITY.NOT_TRANSPARENT;
          }
          break;
        case COURIER_TASKS_ICON_INDEX.VERIFIED:
          if (courierVerifyAfterCheckoutDate && task.orderId === orderDetailId) {
            opacity = COURIER_TASKS_ICON_OPACITY.NOT_TRANSPARENT;
          }
          else if (icon.status <= carrier?.status && carrier?.status !== COURIER_STATUS_PREPARING) {
            opacity = COURIER_TASKS_ICON_OPACITY.NOT_TRANSPARENT;
          }
          break;
        default:
          opacity = COURIER_TASKS_ICON_OPACITY.TRANSPARENT;
          break;
      }
    }
    return opacity;
  }, [courierVerifyAfterCheckoutDate, orderDetailId]);

  const isVisible = useCallback((index, icon, carrier, task) => {
    let isVisibleIcon = false;
    if (carrier?.status === COURIER_STATUS_CANCELED) {
      isVisibleIcon = true;
    }
    else {
      switch (index) {
        case COURIER_TASKS_ICON_INDEX.REACHED_TO_SHOP:
          if ((icon.status <= carrier?.status && carrier?.status !== COURIER_STATUS_PREPARING) ||
          carrier?.status === COURIER_STATUS_VERIFYING) {
            isVisibleIcon = true;
          }
          break;
        case COURIER_TASKS_ICON_INDEX.RECEIVED:
          if (
            icon.status <= carrier?.status &&
            carrier?.status !== COURIER_STATUS_PREPARING &&
            carrier?.status !== COURIER_STATUS_REACHED_TO_RESTAURANT) {
            isVisibleIcon = true;
          }
          break;
        case COURIER_TASKS_ICON_INDEX.REACHED_TO_CLIENT:
          if (icon.status <= carrier?.status) {
            isVisibleIcon = true;
          }
          break;
        case COURIER_TASKS_ICON_INDEX.DELIVERED:
          if (icon.status === carrier?.status) {
            isVisibleIcon = true;
          }
          break;
        case COURIER_TASKS_ICON_INDEX.VERIFIED:
          if (courierVerifyAfterCheckoutDate && task.orderId === orderDetailId) {
            isVisibleIcon = true;
          }
          else if (icon.status <= carrier?.status && carrier?.status !== COURIER_STATUS_PREPARING) {
            isVisibleIcon = true;
          }
          break;
        default:
          isVisibleIcon = false;
          break;
      }
    }
    return isVisibleIcon;
  }, [courierVerifyAfterCheckoutDate, orderDetailId]);

  const iconProps = useMemo(() => {
    return [
      {
        icon: clipboardCheck,
        iconName: COURIER_TASKS_ICON_NAME.CLIPBOARD_CHECK_ICON,
        type: COURIER_TASK_TYPE.PICKUP,
        status: 400,
        tooltipText: t('ORDER_DETAILS_BATCHED_TIMELINE.CHECKOUT'),
        date: formatDate(courierVerifyAfterCheckoutDate),
      },
      {
        icon: officeBuilding,
        iconName: COURIER_TASKS_ICON_NAME.OFFICE_BUILDING_ICON,
        type: COURIER_TASK_TYPE.PICKUP,
        status: 450,
        tooltipText: t('ORDER_DETAILS_BATCHED_TIMELINE.REACHED_TO_SHOP'),
        date: formatDate(courierReachedToShopDate),
        diffTime: (courierVerifyAfterCheckoutDate && courierReachedToShopDate) ?
          calculateDiffTime(courierVerifyAfterCheckoutDate, courierReachedToShopDate) : '',
      },
      {
        icon: hand,
        iconName: COURIER_TASKS_ICON_NAME.HAND_ICON,
        type: COURIER_TASK_TYPE.PICKUP,
        status: 700,
        tooltipText: t('ORDER_DETAILS_BATCHED_TIMELINE.HANDOVER'),
        date: formatDate(courierVerifyDate),
        diffTime: (courierReachedToShopDate && courierVerifyDate) ? calculateDiffTime(courierReachedToShopDate, courierVerifyDate) : '',
      },
      {
        icon: home,
        iconName: COURIER_TASKS_ICON_NAME.HOME_ICON,
        type: COURIER_TASK_TYPE.DELIVERY,
        status: 800,
        tooltipText: t('ORDER_DETAILS_BATCHED_TIMELINE.REACHED'),
        date: formatDate(reachDate),
        diffTime: (courierVerifyDate && reachDate) ? calculateDiffTime(courierVerifyDate, reachDate) : '',
      },
      {
        icon: checkCircle,
        iconName: COURIER_TASKS_ICON_NAME.CHECK_CIRCLE_ICON,
        type: COURIER_TASK_TYPE.DELIVERY,
        status: 900,
        tooltipText: t('ORDER_DETAILS_BATCHED_TIMELINE.DELIVERED'),
        date: formatDate(deliverDate),
        diffTime: (reachDate && deliverDate) ? calculateDiffTime(reachDate, deliverDate) : '',
      },
    ];
  }, [courierVerifyAfterCheckoutDate, courierReachedToShopDate, courierVerifyDate, reachDate, deliverDate, t]);

  const getArrangedData = useMemo(() => {
    const arrangedData = [];
    if (courierOrderTasks?.length > 0) {
      courierOrderTasks.forEach((task, taskIndex) => {
        const createTempObj = (iconProp, extraFieldObj, style) => {
          if ((iconProp.iconName !== COURIER_TASKS_ICON_NAME.CLIPBOARD_CHECK_ICON) ||
            (iconProp.iconName === COURIER_TASKS_ICON_NAME.CLIPBOARD_CHECK_ICON &&
            (task?.domainType === GETIR_LOCALS_DOMAIN_TYPE || !task?.domainType))) {
            if (extraFieldObj.type === task.type) {
              const tempObj = {
                index: getIndex(task),
                style: {
                  backgroundColor: getBackgroundColor(arrangedData, task),
                  marginLeft: batchedIconMarginLeft,
                  position: batchedIconPosition,
                  opacity: style?.opacity || 1,
                  ...style,
                },
                icon: iconProp.icon,
                status: task.status,
                id: task.orderId,
                tooltipText: iconProp.tooltipText,
                ...extraFieldObj,
              };
              arrangedData.push(tempObj);
            }
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
              { opacity: getOpacity(index, iconProp, courier, task) },
            );
          });
        }
        else if (task.status === COURIER_TASK_STATUS.PENDING) {
          iconProps.forEach(iconProp => {
            const { type } = iconProp;
            createTempObj(iconProp, { type, isVisible: false }, { opacity: batchedIconOpacity });
          });
        }
        else if (task.status === COURIER_TASK_STATUS.CANCELLED) {
          iconProps.forEach(iconProp => {
            const { type, iconName, diffTime } = iconProp;
            createTempObj(iconProp, {
              type,
              iconName,
              isVisible: true,
              diffTime,
              isNextTaskCancelAlert:
              (courierOrderTasks.slice(taskIndex + 1).find(el => el.orderId === task.orderId)?.status ===
              COURIER_TASK_STATUS.CANCEL_ALERT),
            }, { opacity: batchedIconOpacity });
          });
        }
        else if (task.status === COURIER_TASK_STATUS.CANCEL_ALERT) {
          iconProps.forEach(iconProp => {
            const { type } = iconProp;
            createTempObj(iconProp, { type, isVisible: true }, { opacity: batchedIconOpacity });
          });
        }
      });
      return arrangedData;
    }
    return [];
  }, [courier, courierOrderTasks, getBackgroundColor, getIndex, getOpacity, iconProps, isVisible]);

  const arrangedTableData = useMemo(() => {
    if (courierOrderTasks?.length > 0) {
      return [...new Map(courierOrderTasks.map(task => [task.orderId, task])).values()].map((task, index) => ({ ...task, batchIndex: index + 1 }));
    }
    return [];
  }, [courierOrderTasks]);

  const uniqCourierTasksIcons = [...new Map(getArrangedData.map(courierTaskIcon => [JSON.stringify(courierTaskIcon), courierTaskIcon])).values()];

  if (isPendingCourierTasks || isPendingOrderDetail) {
    return <Spinner />;
  }
  return (
    <>
      {
        (!isInQueue) && (
        <Card>
          <div className={classes.timelineTitleContent}>
            <b className={classes.timelineTitle}>{t('BATCHED_ORDER_TIMELINE')}</b>
            <div className={classes.scrollButtonGroup}>
              <Button className={classes.scrollButton} onClick={() => scroll(-100)}>
                <LeftOutlined />
              </Button>
              <Button className={classes.scrollButton} onClick={() => scroll(100)}>
                <RightOutlined />
              </Button>
            </div>
          </div>
          <Row justify="center">
            <Col span={20}>
              <div className={classes.batchedOrdersTimelineMultiOrder} ref={ref}>
                {
                  uniqCourierTasksIcons.map((icon, i) => (
                    <div key={`icon_${icon.index}_${icon.tooltipText}`}>
                      <Tooltip
                        placement="top"
                        title={(
                          <span>
                            {
                              (icon.status === COURIER_TASK_STATUS.CANCELLED && !icon.isNextTaskCancelAlert) && (
                              <b>{ `${t('ORDER_DETAILS_BATCHED_TIMELINE.ORDER')} 
                              ${icon.index + 1} - ${t('ORDER_DETAILS_BATCHED_TIMELINE.CANCELLED_ORDER')}`}
                              </b>
                              )
                            }
                            {
                              (icon.status !== COURIER_TASK_STATUS.CANCELLED || icon.isNextTaskCancelAlert) && (
                              <b>{ `${t('ORDER_DETAILS_BATCHED_TIMELINE.ORDER')} 
                              ${icon.index + 1} - ${icon.tooltipText}`}
                              </b>
                              )
                            }
                            <br />
                            {orderDetailId === icon.id && iconProps.find(iconProp => iconProp.iconName === icon.iconName)?.date}
                          </span>
                        )}
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
                              src={(icon.status === COURIER_TASK_STATUS.CANCELLED ||
                                icon.status === COURIER_TASK_STATUS.CANCEL_ALERT ||
                                (icon.status === COURIER_TASK_STATUS.ASSIGNED && courier?.status === COURIER_STATUS_CANCELED)) ?
                                canceled : done}
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
                                  (icon.status === COURIER_TASK_STATUS.ASSIGNED && courier?.status === COURIER_STATUS_CANCELED)) &&
                                  orderDetailId === icon.id && icon?.diffTime) && (
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
            <b className={classes.tableTitle}>{t('BATCHED_WITH_ORDERS')}</b>
          </div>
          <AntTable
            data={arrangedTableData}
            columns={tableColumns({ orderDetailId, t, normalFont })}
            loading={isPendingCourierTasks}
          />
        </Card>
        )
      }
      <div />
    </>
  );
};

export default BatchedOrdersTable;

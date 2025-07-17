import moment from 'moment';
import { get } from 'lodash';

import {
  activeOrderLabels,
  marketVehicleTypes,
} from '@shared/shared/constantValues';
import { msToString, toFakeLocalMoment } from '@shared/utils/dateHelper';
import { getLangKey } from '@shared/i18n';
import {
  GETIR_MARKET_FRANCHISE_TYPE,
  REGULAR_MARKET_FRANCHISE_TYPE,
  STORE_CONVERSION_MARKET_FRANCHISE_TYPE,
  WORK_STATUS_SHIFT,
  WORK_STATUS_SUPPORT,
  DEFAULT_MAP_COORDINATES,
  DEFAULT_MAP_ZOOM,
  COURIER_TASK_STATUS,
  COURIER_TASKS_ICON_NAME,
  COURIER_TASK_TYPE,
  COURIER_STATUS_PREPARING,
  COURIER_STATUS_REACHED_TO_RESTAURANT,
  COURIER_STATUS_VERIFYING,
  COURIER_STATUS_REACHED,
  COURIER_STATUS_RETURNING,
  COURIER_TASKS_ICON_OPACITY,
  COURIER_TASK_METHOD,
  COURIER_RETURN_STATUS_ONWAY_TO_PICKUP,
  COURIER_RETURN_STATUS_PICKUP_FROM_CLIENT,
  COURIER_RETURN_STATUS_ONWAY_TO_DELIVER,
  COURIER_RETURN_STATUS_DELIVER_TO_SHOP,
  COURIER_TASK_STATUS_NAME,
  COURIER_SERVICE_DOMAIN_TYPES,
  LOCALS_ORDER_STATUS_COLOR_MAP,
  LOCALS_ORDER_STATUS,
  LOCALS_RETURN_STATUS,
  GETIR_10_DOMAIN_TYPE,
  GETIR_LOCALS_DOMAIN_TYPE,
  CALLER_TYPES,
  GETIR_FINANCE_DOMAIN_TYPE,
  GETIR_MARKET_DOMAIN_TYPE,
  GETIR_FOOD_DOMAIN_TYPE,
  COURIER_STATUS_GATHERING,
  GETIR_VOYAGER_DOMAIN_TYPE,
} from '@shared/shared/constants';
import { createMap, convertSelectOptions, convertConstantValuesToSelectOptions, getLimitAndOffset } from '@shared/utils/common';
import { ENVIRONMENT } from '@shared/config';
import { WORK_STATUS_OPTIONS, DOMAIN_TYPE_OPTIONS, COURIER_RETURN_TASK_METHOD, CALLER_TYPES_TRANSLATIONS } from './constants';
import { ROUTE } from '@app/routes';
import { iconColors } from '@app/pages/ArtisanOrder/Detail/util';

import clipboardCheck from '@shared/assets/markers/artisan_order_clipboardcheck.png';
import officeBuilding from '@shared/assets/markers/artisan_order_officebuilding.png';
import hand from '@shared/assets/markers/artisan_order_hand.png';
import home from '@shared/assets/markers/artisan_order_home.png';
import checkCircle from '@shared/assets/markers/artisan_order_checkcircle.png';
import { getLocalDateTimeFormat } from '@shared/utils/localization';

export const getDurationText = date => {
  const text = msToString({ duration: moment().diff(date) });
  return text;
};

export const getLastBusyOptionText = (busyOptionsList, optionId) => {
  if (!busyOptionsList) return '';
  return busyOptionsList.find(option => option._id === optionId)?.messages?.[getLangKey()];
};

export const getStoreInformationDetails = (
  franchiseList,
  warehouseList,
  selectedWarehouse,
  courierData,
) => {
  let isGetirEmployee = false;
  let isFranchiseEmployee = false;
  let isCurrentEmployerEditable = false;
  let isWorkStatusEditable = false;
  let currentMarketEmployer = null;
  let workStatus = null;
  const franchiseMap = createMap(franchiseList);
  const warehouseMap = createMap(warehouseList);
  const courierMarketEmployers = get(courierData, 'person.marketEmployers', []);
  courierMarketEmployers.forEach(employer => {
    const franchise = franchiseMap[employer.franchise];
    if (franchise.franchiseType === GETIR_MARKET_FRANCHISE_TYPE) {
      isGetirEmployee = true;
    }
    if (
      [
        REGULAR_MARKET_FRANCHISE_TYPE,
        STORE_CONVERSION_MARKET_FRANCHISE_TYPE,
      ].indexOf(franchise.franchiseType) > -1
    ) {
      isFranchiseEmployee = true;
    }
  });
  if (isGetirEmployee && isFranchiseEmployee) {
    isCurrentEmployerEditable = true;
    isWorkStatusEditable = true;
  }
  else if (isGetirEmployee && !isFranchiseEmployee) {
    currentMarketEmployer = courierMarketEmployers[0].franchise;
    if (
      warehouseMap[selectedWarehouse._id].franchise ===
      ENVIRONMENT.GETIR_MARKET_FRANCHISE_ID
    ) {
      workStatus = WORK_STATUS_SHIFT;
    }
    else {
      workStatus = WORK_STATUS_SUPPORT;
    }
  }
  else if (!isGetirEmployee && isFranchiseEmployee) {
    if (courierMarketEmployers.length === 1) {
      const currentEmployer = courierMarketEmployers[0];
      currentMarketEmployer = currentEmployer.franchise;

      let isWarehouseOwned = false;
      if (currentEmployer.franchise === selectedWarehouse.franchise) {
        isWarehouseOwned = true;
      }
      if (isWarehouseOwned) {
        workStatus = WORK_STATUS_SHIFT;
      }
      else {
        workStatus = WORK_STATUS_SUPPORT;
      }
    }
    else {
      const currentEmployer = courierMarketEmployers.find(
        _courierEmployer => _courierEmployer.franchise === selectedWarehouse.franchise,
      );
      if (currentEmployer) {
        isCurrentEmployerEditable = true;
        isWorkStatusEditable = true;
      }
      else {
        isCurrentEmployerEditable = true;
        workStatus = WORK_STATUS_SUPPORT;
      }
    }
  }
  else {
    return {};
  }

  return {
    isCurrentEmployerEditable,
    currentMarketEmployer,
    isWorkStatusEditable,
    workStatus,
  };
};

export const getWorkStatusByEmployer = (employerId, selectedWarehouse) => {
  let workStatus = null;
  if (
    employerId === ENVIRONMENT.GETIR_MARKET_FRANCHISE_ID &&
    selectedWarehouse.franchise === ENVIRONMENT.GETIR_MARKET_FRANCHISE_ID
  ) {
    workStatus = WORK_STATUS_SHIFT;
  }
  else {
    const hasWarehouse = selectedWarehouse.franchise === employerId;
    if (hasWarehouse) {
      workStatus = WORK_STATUS_SHIFT;
    }
    else {
      workStatus = WORK_STATUS_SUPPORT;
    }
  }
  return workStatus;
};

export const getSaveStoreInformationParams = ({
  courier,
  selectedWarehouse,
  currentMarketEmployer,
  workType,
  franchiseList,
  workStatus,
}) => {
  const franchiseMap = createMap(franchiseList);
  return {
    courierId: courier._id,
    warehouseId: selectedWarehouse._id,
    warehouseFranchiseId: selectedWarehouse.franchise,
    currentMarketEmployer: {
      franchise: currentMarketEmployer,
      workType,
      franchiseType: franchiseMap[currentMarketEmployer].franchiseType,
    },
    workStatus,
  };
};

export const convertedWorkStatusOptions = convertSelectOptions(
  WORK_STATUS_OPTIONS,
  {
    labelKey: 'label',
    valueKey: 'value',
    isTranslation: true,
  },
);

export const getDefaultMapState = ({ location }) => {
  const tempCoordinates = get(location, 'coordinates', DEFAULT_MAP_COORDINATES);
  return {
    center: [tempCoordinates[1], tempCoordinates[0]],
    zoom: DEFAULT_MAP_ZOOM,
    controls: [],
  };
};

export const convertedDomainTypeOptions = convertSelectOptions(
  DOMAIN_TYPE_OPTIONS,
  {
    labelKey: 'label',
    valueKey: 'value',
    isTranslation: true,
  },
);

export const vehicleConstraintTypeOptions =
  convertConstantValuesToSelectOptions(marketVehicleTypes);

export const getPersonalInfo = courierDetail => ({
  uniqueIdentifier: courierDetail.person?.uniqueIdentifier || courierDetail.tc,
  iban: courierDetail.iban,
  countryGsmCode: courierDetail.countryGsmCode
    ? parseInt(courierDetail.countryGsmCode, 10)
    : null,
  personalGsm: courierDetail.personalGsm,
});

export const getRelativeInfo = courierDetail => ({
  name: courierDetail.relative ? courierDetail.relative.name : '',
  gsm: courierDetail.relative ? courierDetail.relative.gsm : '',
  countryGsmCode: courierDetail.person?.relative?.countryGsmCode
    ? parseInt(courierDetail.person.relative.countryGsmCode, 10)
    : null,
  relation: courierDetail.relative?.relation,
});

export const getCourierOrderDetails = (courier, t, returnOrderId = '') => {
  let redirectUrl = '';
  if (courier?.order) {
    redirectUrl = ROUTE.GETIR_MARKET_ORDER_DETAIL.path.replace(
      ':orderId',
      courier.order._id,
    );
    return {
      label: t('ACTIVE_GETIR10_ORDER'),
      value: courier.order._id,
      redirect: `${redirectUrl}?domainType=${GETIR_10_DOMAIN_TYPE}`,
    };
  }
  if (courier?.foodOrder) {
    redirectUrl = ROUTE.GETIR_FOOD_ORDER_DETAIL.path.replace(
      ':orderDetailId',
      courier.foodOrder,
    );
    return {
      label: t('ACTIVE_FOOD_ORDER'),
      value: courier.foodOrder,
      redirect: redirectUrl,
    };
  }
  if (courier?.marketOrder) {
    if (courier.currentDomainType) {
      const marketOrderLabel = activeOrderLabels[courier.currentDomainType][getLangKey()];
      redirectUrl = courier.currentDomainType === GETIR_FINANCE_DOMAIN_TYPE ? ROUTE.GETIR_FINANCE_ORDER_DETAIL.path.replace(
        ':orderId',
        courier.marketOrder,
      ) : ROUTE.GETIR_MARKET_ORDER_DETAIL.path.replace(
        ':orderId',
        courier.marketOrder,
      );
      return {
        label: marketOrderLabel,
        value: courier.marketOrder,
        redirect: `${redirectUrl}?domainType=${courier.currentDomainType}`,
      };
    }
    return {
      label: 'Error: missing property',
      value: courier.marketOrder,
      redirect: 'error',
    };
  }
  if (courier?.artisanOrder) {
    redirectUrl = ROUTE.ARTISAN_ORDER_DETAIL.path.replace(
      ':orderDetailId',
      courier.artisanOrder,
    );
    return {
      label: t('ACTIVE_ARTISAN_ORDER'),
      value: courier.artisanOrder,
      redirect: redirectUrl,
    };
  }
  if (courier?.returnOrder && returnOrderId) {
    redirectUrl = ROUTE.ARTISAN_ORDER_DETAIL.path.replace(
      ':orderDetailId',
      returnOrderId,
    );
    return {
      label: t('ACTIVE_ARTISAN_RETURN'),
      value: returnOrderId,
      redirect: redirectUrl,
    };
  }
  return null;
};

const courierBatchOrderTimelineIcons = [
  {
    iconUrl: clipboardCheck,
    iconName: COURIER_TASKS_ICON_NAME.CLIPBOARD_CHECK_ICON,
    type: COURIER_TASK_TYPE.PICKUP,
    status: COURIER_STATUS_PREPARING,
    method: COURIER_TASK_METHOD.COURIER_VERIFY_AFTER_CHECKOUT_DATE,
  },
  {
    iconUrl: officeBuilding,
    iconName: COURIER_TASKS_ICON_NAME.OFFICE_BUILDING_ICON,
    type: COURIER_TASK_TYPE.PICKUP,
    status: COURIER_STATUS_REACHED_TO_RESTAURANT,
    method: COURIER_TASK_METHOD.COURIER_REACHED_TO_RESTAURANT,
  },
  {
    iconUrl: hand,
    iconName: COURIER_TASKS_ICON_NAME.HAND_ICON,
    type: COURIER_TASK_TYPE.PICKUP,
    status: COURIER_STATUS_VERIFYING,
    method: COURIER_TASK_METHOD.COURIER_VERIFY_FOOD_ORDER,
  },
  {
    iconUrl: home,
    iconName: COURIER_TASKS_ICON_NAME.HOME_ICON,
    type: COURIER_TASK_TYPE.DELIVERY,
    status: COURIER_STATUS_REACHED,
    method: COURIER_TASK_METHOD.COURIER_REACHED_TO_CLIENT,
  },
  {
    iconUrl: checkCircle,
    iconName: COURIER_TASKS_ICON_NAME.CHECK_CIRCLE_ICON,
    type: COURIER_TASK_TYPE.DELIVERY,
    status: COURIER_STATUS_RETURNING,
    method: COURIER_TASK_METHOD.COURIER_DELIVERED_TO_CLIENT,
  },
];

const courierBatchOrderTimelineMarketIcons = [
  {
    iconUrl: clipboardCheck,
    iconName: COURIER_TASKS_ICON_NAME.CLIPBOARD_CHECK_ICON,
    type: COURIER_TASK_TYPE.PICKUP,
    status: COURIER_STATUS_VERIFYING,
    method: COURIER_TASK_METHOD.MARKET_COURIER_VERIFYING,
  },
  {
    iconUrl: hand,
    iconName: COURIER_TASKS_ICON_NAME.HAND_ICON,
    type: COURIER_TASK_TYPE.PICKUP,
    status: COURIER_STATUS_GATHERING,
    method: COURIER_TASK_METHOD.MARKET_COURIER_GATHERING,
  },
  {
    iconUrl: home,
    iconName: COURIER_TASKS_ICON_NAME.HOME_ICON,
    type: COURIER_TASK_TYPE.DELIVERY,
    status: COURIER_STATUS_REACHED,
    method: COURIER_TASK_METHOD.MARKET_COURIER_REACHED,
  },
  {
    iconUrl: checkCircle,
    iconName: COURIER_TASKS_ICON_NAME.CHECK_CIRCLE_ICON,
    type: COURIER_TASK_TYPE.DELIVERY,
    status: COURIER_STATUS_RETURNING,
    method: COURIER_TASK_METHOD.MARKET_COURIER_DELIVERED,
  },
];

const courierBatchOrderTimelineFinanceIcons = [
  {
    iconUrl: clipboardCheck,
    iconName: COURIER_TASKS_ICON_NAME.CLIPBOARD_CHECK_ICON,
    type: COURIER_TASK_TYPE.PICKUP,
    status: COURIER_STATUS_VERIFYING,
    method: COURIER_TASK_METHOD.FINANCE_COURIER_VERIFYING,
  },
  {
    iconUrl: hand,
    iconName: COURIER_TASKS_ICON_NAME.HAND_ICON,
    type: COURIER_TASK_TYPE.PICKUP,
    status: COURIER_STATUS_GATHERING,
    method: COURIER_TASK_METHOD.FINANCE_COURIER_GATHERING,
  },
  {
    iconUrl: home,
    iconName: COURIER_TASKS_ICON_NAME.HOME_ICON,
    type: COURIER_TASK_TYPE.DELIVERY,
    status: COURIER_STATUS_REACHED,
    method: COURIER_TASK_METHOD.FINANCE_COURIER_REACHED,
  },
  {
    iconUrl: checkCircle,
    iconName: COURIER_TASKS_ICON_NAME.CHECK_CIRCLE_ICON,
    type: COURIER_TASK_TYPE.DELIVERY,
    status: COURIER_STATUS_RETURNING,
    method: COURIER_TASK_METHOD.FINANCE_COURIER_DELIVERED,
  },
];

const courierBatchReturnTimelineIcons = [
  {
    iconUrl: clipboardCheck,
    iconName: COURIER_TASKS_ICON_NAME.CLIPBOARD_CHECK_ICON,
    type: COURIER_TASK_TYPE.PICKUP,
    status: COURIER_RETURN_STATUS_ONWAY_TO_PICKUP,
  },
  {
    iconUrl: home,
    iconName: COURIER_TASKS_ICON_NAME.HOME_ICON,
    type: COURIER_TASK_TYPE.PICKUP,
    status: COURIER_RETURN_STATUS_PICKUP_FROM_CLIENT,
  },
  {
    iconUrl: hand,
    iconName: COURIER_TASKS_ICON_NAME.HAND_ICON,
    type: COURIER_TASK_TYPE.PICKUP,
    status: COURIER_RETURN_STATUS_ONWAY_TO_DELIVER,
  },
  {
    iconUrl: officeBuilding,
    iconName: COURIER_TASKS_ICON_NAME.OFFICE_BUILDING_ICON,
    type: COURIER_TASK_TYPE.DELIVERY,
    status: COURIER_RETURN_STATUS_DELIVER_TO_SHOP,
  },
  {
    iconUrl: checkCircle,
    iconName: COURIER_TASKS_ICON_NAME.CHECK_CIRCLE_ICON,
    type: COURIER_TASK_TYPE.DELIVERY,
    status: COURIER_STATUS_RETURNING,
  },
];

const checkIconsVisibilityByDomainType = (task, iconName) => {
  const isMarketDomain = task?.domainType === GETIR_10_DOMAIN_TYPE ||
    task?.domainType === GETIR_FINANCE_DOMAIN_TYPE ||
    task?.domainType === GETIR_MARKET_DOMAIN_TYPE ||
    task?.domainType === GETIR_VOYAGER_DOMAIN_TYPE;

  const isLocalsDomain = task?.domainType === GETIR_LOCALS_DOMAIN_TYPE || !task?.domainType;

  const isFoodDomain = task?.domainType === GETIR_FOOD_DOMAIN_TYPE;

  if (isLocalsDomain) return true;
  if (isFoodDomain && (iconName !== COURIER_TASKS_ICON_NAME.CLIPBOARD_CHECK_ICON)) return true;
  if (isMarketDomain) return true;
  return false;
};

const getTimelineIcons = task => {
  const isMarketDomain = task?.domainType === GETIR_10_DOMAIN_TYPE ||
    task?.domainType === GETIR_MARKET_DOMAIN_TYPE || task?.domainType === GETIR_VOYAGER_DOMAIN_TYPE;

  const isFinanceDomain = task?.domainType === GETIR_FINANCE_DOMAIN_TYPE;

  if (isMarketDomain) return courierBatchOrderTimelineMarketIcons;
  if (isFinanceDomain) return courierBatchOrderTimelineFinanceIcons;
  return courierBatchOrderTimelineIcons;
};

export const getCourierBatchOrderAvatars = (taskList, batchOrders, logDiff) => {
  let avatars = [];
  if (taskList?.length > 0 && batchOrders?.length > 0) {
    taskList.forEach(task => {
      const batchTimelineIcons = getTimelineIcons(task);

      const createTempObj = (iconUrl, iconName, type, opacity, isVisible) => {
        if (checkIconsVisibilityByDomainType(task, iconName) && type === task.type) {
          const tempObj = {
            iconUrl,
            iconName,
            type,
            backgroundColor: iconColors[batchOrders.findIndex(order => order?.orderId === task?.orderId)],
            index: batchOrders.find(order => order?.orderId === task?.orderId)?.batchIndex,
            duration: '',
            method: '',
            createdAtL: '',
            statusName: '',
            taskStatus: task.status,
            orderId: task.orderId,
            opacity,
            isVisible,
          };
          avatars.push(tempObj);
        }
      };

      if (task.status === COURIER_TASK_STATUS.COMPLETED) {
        batchTimelineIcons.forEach(({ type, iconName, iconUrl }) => {
          createTempObj(iconUrl, iconName, type, 1, true);
        });
      }
      else {
        batchTimelineIcons.forEach(({ type, iconName, iconUrl }) => {
          createTempObj(
            iconUrl,
            iconName,
            type,
            0.5,
            !(task.status === COURIER_TASK_STATUS.ASSIGNED || task.status === COURIER_TASK_STATUS.PENDING),
          );
        });
      }
    });

    let prevCreatedAtL = '';

    logDiff.forEach((log, index) => {
      avatars = avatars.map(avatar => {
        const newAvatar = { ...avatar };

        const opacityLevel = avatar.taskStatus === COURIER_TASK_STATUS.CANCELLED ?
          COURIER_TASKS_ICON_OPACITY.TRANSPARENT :
          COURIER_TASKS_ICON_OPACITY.NOT_TRANSPARENT;

        const createdAtLocalTime = moment(log?.createdAt).format(getLocalDateTimeFormat()) || '';
        const durationDiff = ((new Date(log?.createdAtL).getTime() - new Date(prevCreatedAtL).getTime()) / (1000 * 60))?.toFixed(1) || 0;

        const updateAvatar = (methodName, statusName, duration) => {
          newAvatar.method = methodName;
          newAvatar.isVisible = true;
          newAvatar.createdAtL = createdAtLocalTime;
          newAvatar.statusName = statusName;
          newAvatar.opacity = opacityLevel;
          newAvatar.duration = duration;
          prevCreatedAtL = log?.createdAtL;
        };

        const isPreviousMarketOrderDelivered = (log?.data?.method === COURIER_TASK_METHOD.MARKET_COURIER_DELIVERED ||
          log?.data?.method === COURIER_TASK_METHOD.FINANCE_COURIER_DELIVERED) && logDiff[index - 1]?.marketOrder === avatar.orderId;

        const isPreviousMarketOrderDeparted = (log?.data?.method === COURIER_TASK_METHOD.MARKET_COURIER_GATHERING ||
          log?.data?.method === COURIER_TASK_METHOD.FINANCE_COURIER_GATHERING) && logDiff[index - 1]?.marketOrder === avatar.orderId;

        if (log?.data?.foodOrder && log?.data?.foodOrder === avatar.orderId) {
          if (avatar.taskStatus === COURIER_TASK_STATUS.COMPLETED ||
              avatar.taskStatus === COURIER_TASK_STATUS.ASSIGNED ||
              avatar.taskStatus === COURIER_TASK_STATUS.CANCELLED
          ) {
            if (avatar.iconName === COURIER_TASKS_ICON_NAME.CLIPBOARD_CHECK_ICON &&
              log?.data?.method === COURIER_TASK_METHOD.COURIER_VERIFY_AFTER_CHECKOUT_DATE) {
              const duration = index === 0 ? logDiff[index].diff.toFixed(1) : logDiff[index - 1].diff.toFixed(1);
              updateAvatar(log?.data?.method, COURIER_TASK_STATUS_NAME.COURIER_VERIFY_STATUS, duration);
            }
            else if (avatar.iconName === COURIER_TASKS_ICON_NAME.OFFICE_BUILDING_ICON &&
              log?.data?.method === COURIER_TASK_METHOD.COURIER_REACHED_TO_RESTAURANT) {
              updateAvatar(log?.data?.method, COURIER_TASK_STATUS_NAME.COURIER_REACHED_TO_SHOP_STATUS, durationDiff);
            }
            else if (avatar.iconName === COURIER_TASKS_ICON_NAME.HAND_ICON &&
              log?.data?.method === COURIER_TASK_METHOD.COURIER_VERIFY_FOOD_ORDER) {
              updateAvatar(log?.data?.method, COURIER_TASK_STATUS_NAME.COURIER_HANDOVER_STATUS, durationDiff);
            }
            else if (avatar.iconName === COURIER_TASKS_ICON_NAME.HOME_ICON &&
              log?.data?.method === COURIER_TASK_METHOD.COURIER_REACHED_TO_CLIENT) {
              updateAvatar(log?.data?.method, COURIER_TASK_STATUS_NAME.COURIER_REACHED_STATUS, durationDiff);
            }
            else if (avatar.iconName === COURIER_TASKS_ICON_NAME.CHECK_CIRCLE_ICON &&
              log?.data?.method === COURIER_TASK_METHOD.COURIER_DELIVERED_TO_CLIENT) {
              const duration = logDiff[index - 1].diff.toFixed(1);
              updateAvatar(log?.data?.method, COURIER_TASK_STATUS_NAME.COURIER_DELIVERED_STATUS, duration);
            }
          }
        }
        else if (log?.marketOrder && (log?.marketOrder === avatar.orderId || isPreviousMarketOrderDelivered || isPreviousMarketOrderDeparted)) {
          if (
            avatar.taskStatus === COURIER_TASK_STATUS.COMPLETED ||
            avatar.taskStatus === COURIER_TASK_STATUS.ASSIGNED ||
            avatar.taskStatus === COURIER_TASK_STATUS.CANCELLED
          ) {
            if (
              avatar.iconName === COURIER_TASKS_ICON_NAME.CLIPBOARD_CHECK_ICON &&
              (log?.data?.method === COURIER_TASK_METHOD.MARKET_COURIER_VERIFYING || log?.data?.method === COURIER_TASK_METHOD.FINANCE_COURIER_VERIFYING)) {
              const duration = index === 0 ? logDiff[index].diff.toFixed(1) : logDiff[index - 1].diff.toFixed(1);
              updateAvatar(log?.data?.method, COURIER_TASK_STATUS_NAME.COURIER_VERIFY_STATUS, duration);
            }
            else if (avatar.iconName === COURIER_TASKS_ICON_NAME.HAND_ICON &&
              ((log?.data?.method === COURIER_TASK_METHOD.MARKET_COURIER_GATHERING || log?.data?.method === COURIER_TASK_METHOD.FINANCE_COURIER_GATHERING)
              && (log[index - 1]?.marketOrder === avatar.orderId || isPreviousMarketOrderDeparted))
            ) {
              updateAvatar(log?.data?.method, COURIER_TASK_STATUS_NAME.COURIER_HANDOVER_STATUS, durationDiff);
            }
            else if (avatar.iconName === COURIER_TASKS_ICON_NAME.HOME_ICON &&
              (log?.data?.method === COURIER_TASK_METHOD.MARKET_COURIER_REACHED || log?.data?.method === COURIER_TASK_METHOD.FINANCE_COURIER_REACHED)) {
              updateAvatar(log?.data?.method, COURIER_TASK_STATUS_NAME.COURIER_REACHED_STATUS, durationDiff);
            }
            else if (
              avatar.iconName === COURIER_TASKS_ICON_NAME.CHECK_CIRCLE_ICON &&
              ((log?.data?.method === COURIER_TASK_METHOD.MARKET_COURIER_DELIVERED || log?.data?.method === COURIER_TASK_METHOD.FINANCE_COURIER_DELIVERED)
              && (log[index - 1]?.marketOrder === avatar.orderId || isPreviousMarketOrderDelivered))
            ) {
              const duration = logDiff[index - 1].diff.toFixed(1);
              updateAvatar(log?.data?.method, COURIER_TASK_STATUS_NAME.COURIER_DELIVERED_STATUS, duration);
            }
          }
        }
        return newAvatar;
      });
    });
  }
  return avatars;
};

export const getCourierBatchReturnAvatars = (taskList, batchReturns = [], logDiff) => {
  let avatars = [];
  if (taskList && batchReturns.length > 0) {
    taskList.forEach((task, taskIndex) => {
      const createTempObj = (type, iconUrl, iconName, isVisible, opacity, extraFieldObj = {}) => {
        if (type === task.type) {
          const tempObj = {
            iconUrl,
            iconName,
            type,
            backgroundColor: iconColors[batchReturns.findIndex(refund => refund.id === task.orderId)],
            index: batchReturns.find(refund => refund.id === task.orderId)?.batchIndex,
            opacity,
            duration: '',
            method: '',
            createdAtL: '',
            statusName: '',
            taskStatus: task.status,
            returnId: task.orderId,
            isVisible,
            ...extraFieldObj,
          };
          avatars.push(tempObj);
        }
      };

      if (task.status === COURIER_TASK_STATUS.COMPLETED) {
        courierBatchReturnTimelineIcons.forEach(({ type, iconUrl, iconName }) => {
          createTempObj(type, iconUrl, iconName, true, 1);
        });
      }
      else if (task.status === COURIER_TASK_STATUS.ASSIGNED || task.status === COURIER_TASK_STATUS.PENDING) {
        courierBatchReturnTimelineIcons.forEach(({ type, iconUrl, iconName }) => {
          createTempObj(type, iconUrl, iconName, false, 0.5);
        });
      }
      else if (task.status === COURIER_TASK_STATUS.CANCELLED) {
        courierBatchReturnTimelineIcons.forEach(({ type, iconUrl, iconName }) => {
          createTempObj(type, iconUrl, iconName, true, 0.5, {
            isNextTaskCancelAlert: (taskList.slice(taskIndex + 1).find(el => el.orderId === task.orderId)?.status ===
              COURIER_TASK_STATUS.CANCEL_ALERT),
          });
        });
      }
      else if (task.status === COURIER_TASK_STATUS.CANCEL_ALERT) {
        courierBatchReturnTimelineIcons.forEach(({ type, iconUrl, iconName }) => {
          createTempObj(type, iconUrl, iconName, true, 0.5);
        });
      }
    });
    let prevCreatedAtL = '';
    logDiff.forEach((log, index) => {
      avatars = avatars.map(avatar => {
        const newAvatar = { ...avatar };
        if (log.data?.returnId) {
          if (log.data.returnId === avatar.returnId) {
            if (
              avatar.taskStatus === COURIER_TASK_STATUS.COMPLETED ||
              avatar.taskStatus === COURIER_TASK_STATUS.ASSIGNED ||
              avatar.taskStatus === COURIER_TASK_STATUS.CANCELLED
            ) {
              if (
                avatar.iconName === COURIER_TASKS_ICON_NAME.CLIPBOARD_CHECK_ICON &&
                log.data.method === COURIER_RETURN_TASK_METHOD.COURIER_ON_WAY
              ) {
                newAvatar.duration = logDiff[index - 1].diff.toFixed(1);
                newAvatar.opacity =
                  avatar.taskStatus === COURIER_TASK_STATUS.CANCELLED
                    ? COURIER_TASKS_ICON_OPACITY.TRANSPARENT
                    : COURIER_TASKS_ICON_OPACITY.NOT_TRANSPARENT;
                newAvatar.isVisible = true;
                newAvatar.createdAtL = moment(log.createdAt).format(getLocalDateTimeFormat());
                newAvatar.statusName =
                  COURIER_TASK_STATUS_NAME.COURIER_VERIFY_STATUS;
                prevCreatedAtL = log.createdAtL;
              }
              else if (
                avatar.iconName === COURIER_TASKS_ICON_NAME.HOME_ICON &&
                log.data.method === COURIER_RETURN_TASK_METHOD.COURIER_REACHED_TO_CUSTOMER
              ) {
                newAvatar.duration = (
                  (new Date(log.createdAtL).getTime() -
                    new Date(prevCreatedAtL).getTime()) /
                  (1000 * 60)
                ).toFixed(1);
                newAvatar.opacity =
                  avatar.taskStatus === COURIER_TASK_STATUS.CANCELLED
                    ? COURIER_TASKS_ICON_OPACITY.TRANSPARENT
                    : COURIER_TASKS_ICON_OPACITY.NOT_TRANSPARENT;
                newAvatar.isVisible = true;
                newAvatar.createdAtL = moment(log.createdAt).format(getLocalDateTimeFormat());
                newAvatar.statusName = COURIER_TASK_STATUS_NAME.COURIER_REACHED_STATUS;
                prevCreatedAtL = log.createdAtL;
              }
              else if (
                avatar.iconName === COURIER_TASKS_ICON_NAME.HAND_ICON &&
                log.data.method === COURIER_RETURN_TASK_METHOD.COURIER_RECEIVED_RETURN
              ) {
                newAvatar.duration = (
                  (new Date(log.createdAtL).getTime() -
                    new Date(prevCreatedAtL).getTime()) /
                  (1000 * 60)
                ).toFixed(1);
                newAvatar.opacity =
                  avatar.taskStatus === COURIER_TASK_STATUS.CANCELLED
                    ? COURIER_TASKS_ICON_OPACITY.TRANSPARENT
                    : COURIER_TASKS_ICON_OPACITY.NOT_TRANSPARENT;
                newAvatar.isVisible = true;
                newAvatar.createdAtL = moment(log.createdAt).format(getLocalDateTimeFormat());
                newAvatar.statusName = COURIER_TASK_STATUS_NAME.COURIER_HANDOVER_STATUS;
                prevCreatedAtL = log.createdAtL;
              }
              else if (
                avatar.iconName === COURIER_TASKS_ICON_NAME.OFFICE_BUILDING_ICON &&
                log.data.method === COURIER_RETURN_TASK_METHOD.COURIER_REACHED_TO_SHOP
              ) {
                newAvatar.duration = (
                  (new Date(log.createdAtL).getTime() -
                    new Date(prevCreatedAtL).getTime()) /
                  (1000 * 60)
                ).toFixed(1);
                newAvatar.opacity =
                  avatar.taskStatus === COURIER_TASK_STATUS.CANCELLED
                    ? COURIER_TASKS_ICON_OPACITY.TRANSPARENT
                    : COURIER_TASKS_ICON_OPACITY.NOT_TRANSPARENT;
                newAvatar.isVisible = true;
                newAvatar.createdAtL = moment(log.createdAt).format(getLocalDateTimeFormat());
                newAvatar.statusName = COURIER_TASK_STATUS_NAME.COURIER_REACHED_TO_SHOP_STATUS;
                prevCreatedAtL = log.createdAtL;
              }
              else if (
                avatar.iconName === COURIER_TASKS_ICON_NAME.CHECK_CIRCLE_ICON &&
                log.data.method === COURIER_RETURN_TASK_METHOD.COURIER_OR_RUNNER_DELIVER_TO_SHOP
              ) {
                newAvatar.duration = logDiff[index - 1].diff.toFixed(1);
                newAvatar.opacity =
                  avatar.taskStatus === COURIER_TASK_STATUS.CANCELLED
                    ? COURIER_TASKS_ICON_OPACITY.TRANSPARENT
                    : COURIER_TASKS_ICON_OPACITY.NOT_TRANSPARENT;
                newAvatar.isVisible = true;
                newAvatar.createdAtL = moment(log.createdAt).format(getLocalDateTimeFormat());
                newAvatar.statusName = COURIER_TASK_STATUS_NAME.COURIER_DELIVERED_STATUS;
                prevCreatedAtL = log.createdAtL;
              }
            }
          }
        }
        return newAvatar;
      });
    });
  }
  return avatars;
};

export const setDiffForLogs = ({ logDiff, endDate }) => {
  const logs = [...logDiff];
  for (let i = 0; i < logs.length; i++) {
    let diff = 0;
    if (i !== logs.length - 1) {
      diff = ((new Date(logs[i + 1].createdAtL)).getTime() - (new Date(logs[i].createdAtL)).getTime()) / (1000 * 60);
    }
    else {
      const now = toFakeLocalMoment(moment().valueOf());
      if (now.isBefore(moment(endDate))) {
        const end = toFakeLocalMoment(moment().valueOf());
        diff = (end.toDate().getTime() - (new Date(logs[i].createdAtL)).getTime()) / (1000 * 60);
      }
      else {
        const end = moment(endDate);
        diff = (end.toDate().getTime() - (new Date(logs[i].createdAtL)).getTime()) / (1000 * 60);
      }
    }
    logs[i].diff = diff;
  }
  return logs;
};

export const isCourierDomainTypeGetirLocals = courierDetail => {
  return (
    courierDetail.domainTypes?.includes(
      COURIER_SERVICE_DOMAIN_TYPES.GETIR_LOCALS,
    ) ||
    courierDetail.serviceDomainTypes?.includes(
      COURIER_SERVICE_DOMAIN_TYPES.GETIR_LOCALS,
    )
  );
};

export const getOrderStatusColor = status => {
  if (status <= LOCALS_ORDER_STATUS.BROWSING) {
    return LOCALS_ORDER_STATUS_COLOR_MAP.DEFAULT;
  }

  if (status > LOCALS_ORDER_STATUS.BROWSING && status <= LOCALS_ORDER_STATUS.RATED) {
    return LOCALS_ORDER_STATUS_COLOR_MAP.SUCCESS;
  }

  if (status >= LOCALS_ORDER_STATUS.RATED) {
    return LOCALS_ORDER_STATUS_COLOR_MAP.DANGER;
  }

  return LOCALS_ORDER_STATUS_COLOR_MAP.DEFAULT;
};

export const getReturnStatusColor = status => {
  if (status <= LOCALS_RETURN_STATUS.COURIER_ON_WAY) {
    return LOCALS_ORDER_STATUS_COLOR_MAP.DEFAULT;
  }

  if (status > LOCALS_RETURN_STATUS.COURIER_ON_WAY && status <= LOCALS_RETURN_STATUS.APPROVED_BY_SHOP_PARTIALLY) {
    return LOCALS_ORDER_STATUS_COLOR_MAP.SUCCESS;
  }

  if (status >= LOCALS_RETURN_STATUS.APPROVED_BY_SHOP_PARTIALLY) {
    return LOCALS_ORDER_STATUS_COLOR_MAP.DANGER;
  }

  return LOCALS_ORDER_STATUS_COLOR_MAP.DEFAULT;
};

export const getOrderListRequestParams = ({ courierId, pagination, domainType }) => {
  const requestData = {
    ...{ courierId, domainType },
    ...getLimitAndOffset(pagination),
  };

  return requestData;
};

const domainsWithAnalyticsServers = {
  1: { en: 'Getir10', tr: 'Getir10' },
  3: { en: 'GetirMore', tr: 'GetirBüyük' },
  4: { en: 'GetirWater', tr: 'GetirSu' },
  14: { en: 'GetirFinance', tr: 'GetirFinans' },
};

export const getirFinanceDomainTypeOption = [{
  value: 14,
  label: getLangKey() === 'en' ? 'GetirFinance' : 'GetirFinans',
}];

export const domainTypes = Object.keys(domainsWithAnalyticsServers).reduce(
  (a, value) => [
    ...a,
    {
      value,
      label: domainsWithAnalyticsServers[value][getLangKey()],
    },
  ],
  [],
);

export const getCourierNextArtisanOrderId = (courier, t) => {
  let redirectUrl = '';
  if (courier?.nextArtisanOrder && courier?.artisanOrder && courier?.taskGroupId) {
    redirectUrl = ROUTE.ARTISAN_ORDER_DETAIL.path.replace(
      ':orderDetailId',
      courier.nextArtisanOrder,
    );
    return {
      label: t('ACTIVE_ARTISAN_NEXT_ORDER'),
      value: courier.nextArtisanOrder,
      redirect: redirectUrl,
    };
  }
  return null;
};

export const getCallerTypeTranslation = (callerType, langKey) => {
  if (callerType && Object.values(CALLER_TYPES).includes(callerType)) {
    return CALLER_TYPES_TRANSLATIONS[callerType][langKey];
  }

  return undefined;
};

export const getRefreshInterval = () => (process.env.JEST_WORKER_ID !== undefined ? 5000 : 120 * 1000);

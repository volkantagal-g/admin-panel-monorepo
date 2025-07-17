import { useTranslation } from 'react-i18next';
import { Button, Spin } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useMemo, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { Creators } from '../../redux/actions';

import AntCard from '@shared/components/UI/AntCard';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import useStyles from './styles';
import { getCourierBatchReturnAvatars } from '../../utils';
import {
  statusLogsSelector,
  courierTasksSelector,
  returnDetailsWithReturnIdListSelector,
} from '../../redux/selectors';
import done from '@shared/assets/markers/artisan_order_done.png';
import canceled from '@shared/assets/markers/artisan_order_canceled.png';
import { tableColumns } from './config';
import { COURIER_TASK_STATUS } from '@shared/shared/constants';
import { usePermission } from '@shared/hooks';
import { PICKUP } from '@app/pages/ArtisanOrder/Detail/util';

function ActiveReturns({ data, permKey }) {
  const { t } = useTranslation('courierPage');
  const dispatch = useDispatch();
  const classes = useStyles();
  const batchRef = useRef(null);
  const courierStatusLogs = useSelector(statusLogsSelector.getBatchData);
  const isPendingCourierStatusLogs = useSelector(statusLogsSelector.getIsPending);
  const courierReturnTasks = useSelector(courierTasksSelector.getData)?.data;
  const returnDetailsWithReturnIdsData = useSelector(returnDetailsWithReturnIdListSelector.getData);

  const { Can } = usePermission();

  const batchReturns = useMemo(() => {
    if (courierReturnTasks?.length > 0) {
      const filteredTasks = courierReturnTasks.filter(task => (task.type === PICKUP));
      const returns = filteredTasks.map((task, index) => {
        const returnDetailData = returnDetailsWithReturnIdsData?.length > 0 ?
          returnDetailsWithReturnIdsData.find(returnDetail => returnDetail.uid === task.orderId) : '';
        if (returnDetailData) {
          return {
            ...task,
            batchIndex: index + 1,
            isNewModel: true,
            checkoutDate: task.acceptedDate,
            id: task.orderId,
            orderId: returnDetailData.orderId,
            requestedDate: returnDetailData.requestedDate,
          };
        }
        return {
          ...task,
          batchIndex: index + 1,
          isNewModel: true,
          checkoutDate: task.acceptedDate,
          id: task.orderId,
          orderId: task.orderId,
          requestedDate: task.acceptedDate,
        };
      });
      return returns;
    }
    return [];
  }, [courierReturnTasks, returnDetailsWithReturnIdsData]);

  const batchReturnAvatars = useMemo(
    () => getCourierBatchReturnAvatars(courierReturnTasks, batchReturns, courierStatusLogs),
    [courierStatusLogs, batchReturns, courierReturnTasks],
  );

  useEffect(() => {
    if (courierReturnTasks?.length > 0) {
      const returnIds = courierReturnTasks.map(returnTask => {
        return returnTask.orderId;
      });
      dispatch(Creators.getReturnDetailsWithReturnIdListRequest({ returnIds }));
    }
  }, [courierReturnTasks, dispatch]);

  const columns = useMemo(() => tableColumns(t), [t]);

  const scroll = scrollOffset => {
    batchRef.current.scrollLeft += scrollOffset;
  };

  const handleNextBatchReturn = () => scroll(56);
  const handlePrevBatchReturn = () => scroll(-56);

  const renderBatchCarouselArrows = () => (
    <>
      <Button
        className="mr-2"
        type="default"
        shape="circle"
        icon={<ArrowLeftOutlined />}
        onClick={handlePrevBatchReturn}
      />
      <Button
        type="default"
        shape="circle"
        icon={<ArrowRightOutlined />}
        onClick={handleNextBatchReturn}
      />
    </>
  );

  return (
    <Can permKey={permKey}>
      {data?.returnOrder && batchReturns?.length > 0 ? (
        <AntCard
          title={t('BATCHED_RETURNS_TIMELINE')}
          extra={renderBatchCarouselArrows()}
        >
          {isPendingCourierStatusLogs ? (<Spin className={classes.spinContent} />) : (
            <div className={classes.batchTimeline} ref={batchRef}>
              {batchReturnAvatars?.map((avatar, index) => (
                <div>
                  <div
                    className={classes.batchBadge}
                    style={{
                      backgroundColor: avatar.backgroundColor,
                      opacity: avatar.opacity,
                    }}
                  >
                    <span className="tooltip">
                      <b>
                        {t('RETURN')} {avatar.index} - {avatar.statusName && t(`ACTIVE_ORDER_STATUS.${avatar.statusName}`)}
                      </b>
                      <br />
                      {avatar.createdAtL}
                    </span>
                    <img
                      className="batch-left-corner-icon"
                      alt="icon"
                      style={{ opacity: (avatar.isVisible && 1) || 0 }}
                      src={
                        avatar.taskStatus !== COURIER_TASK_STATUS.CANCELLED &&
                    avatar.taskStatus !== COURIER_TASK_STATUS.CANCEL_ALERT
                          ? done
                          : canceled
                      }
                    />
                    <span className="batch-right-corner-icon">{avatar.index}</span>
                    <img src={avatar.iconUrl} alt="icon" />
                    <span
                      className="batch-badge-arrow"
                      style={{ borderTopColor: avatar.backgroundColor }}
                    />
                    {index !== 0 && (
                    <div className="batch-timeline-progress-bar">
                      {avatar.duration !== '' && (
                      <span
                        className={`batch-timeline-progress hover_${avatar.index}}`}
                      >
                        {avatar.duration} {t('MINUTE_SHORT')}
                      </span>
                      )}
                    </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          <AntTableV2
            data={batchReturns}
            columns={columns}
          />
        </AntCard>
      ) : null}
    </Can>
  );
}

ActiveReturns.defaultProps = {
  data: {},
  permKey: '',
};

ActiveReturns.propTypes = {
  data: PropTypes.shape({}),
  permKey: PropTypes.string,
};

export default ActiveReturns;

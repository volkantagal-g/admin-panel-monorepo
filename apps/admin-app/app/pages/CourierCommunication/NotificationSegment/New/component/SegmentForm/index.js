import { Steps, Modal } from 'antd';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import SegmentDetails from '@app/pages/CourierCommunication/NotificationSegment/New/component/SegmentForm/segmentDetails';
import KpiFilters from '@app/pages/CourierCommunication/NotificationSegment/New/component/SegmentForm/filters';
import AllDetails from '@app/pages/CourierCommunication/NotificationSegment/New/component/SegmentForm/AllDetails';
import Footer from '@app/pages/CourierCommunication/NotificationSegment/New/component/SegmentForm/footer/index';
import { Creators } from '@app/pages/CourierCommunication/NotificationSegment/New/redux/actions';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { ROUTE } from '@app/routes';
import { REDUX_KEY } from '@shared/shared/constants';
import reducer from '@app/pages/CourierCommunication/NotificationSegment/New/redux/reducer';
import saga from '@app/pages/CourierCommunication/NotificationSegment/New/redux/saga';
import { createSegment } from '@app/pages/CourierCommunication/NotificationSegment/New/redux/selector';
import { CLIENT_TYPE, SEGMENT_TYPE } from '../../constants';

import useStyles from './styles';

const reduxKey = REDUX_KEY.COURIER_COMMUNICATION_SEGMENT.CREATE;
const SegmentForm = () => {
  usePageViewAnalytics({ name: ROUTE.COURIER_NOTIFICATION_CREATE_SEGMENT.name, squad: ROUTE.COURIER_NOTIFICATION_CREATE_SEGMENT.squad });
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  const { t } = useTranslation(['courierSegment', 'global']);
  const classes = useStyles();
  const [current, setCurrent] = useState(0);
  const [segmentDetailsData, setSegmentDetailsData] = useState();
  const [modal, setModal] = useState(false);
  const [filter, setFilter] = useState();
  const [prevFilter, setPrevFilter] = useState();
  const courierIds = useSelector(createSegment?.getCourierIdsData);

  const handleFilters = useCallback(data => {
    setFilter(data);
  }, [setFilter]);

  const next = () => {
    if (current === 1) {
      setModal(!modal);
    }
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const handleSegmentDetails = data => {
    const value = { segmentDetails: data };
    setSegmentDetailsData(value);
  };

  const { Step } = Steps;

  const handlePreviousData = data => {
    setPrevFilter(data);
  };

  const steps = [
    { content: <SegmentDetails prevData={segmentDetailsData} handleData={handleSegmentDetails} /> },
    { content: <KpiFilters prevData={prevFilter} getFilters={handleFilters} current={current} /> },
    { content: <AllDetails segmentDetailsData={segmentDetailsData} filter={filter} prevFilterData={handlePreviousData} /> },
  ];

  const hideModal = () => {
    setModal(!modal);
    prev();
  };

  const okModal = () => {
    setModal(!modal);
  };

  const handleCreateSegment = () => {
    const targetIds = [];
    if (courierIds?.stats?.records.length > 0) {
      const ids = courierIds?.stats?.records;
      ids.forEach(id => {
        targetIds.push({
          target: id[0].courierId,
          type: CLIENT_TYPE.COURIER,
        });
      });
    }
    dispatch(
      Creators.newSegment({
        name: segmentDetailsData?.segmentDetails?.title,
        segmentType: SEGMENT_TYPE.DYNAMIC,
        filter,
        targetIds,
        client: CLIENT_TYPE.COURIER,
      }),
    );
  };

  if (modal) {
    dispatch(
      Creators.getCourierIds({ general: filter?.general, courierStarRating: filter?.courierStarRating, totalOrderCount: filter?.totalOrderCount }),
    );
    return (
      <Modal
        title={t('MODAL_TITLE')}
        visible={modal}
        onOk={() => {
          okModal();
        }}
        onCancel={() => {
          hideModal();
        }}
      >
        {t('MODAL_TEXT')}
      </Modal>
    );
  }

  return (
    <div className={classes.segmentForm}>
      <Steps className={classes.steps} current={current}>
        <Step title={t('SEGMENT_DETAILS')} />
        <Step title={t('KPI_FILTERS')} />
        <Step title={t('FINAL')} />
      </Steps>
      <div className={classes.content}>{steps[current].content}</div>
      <Footer
        handleSegment={handleCreateSegment}
        steps={steps}
        prev={prev}
        next={next}
        current={current}
      />
    </div>
  );
};
export default SegmentForm;

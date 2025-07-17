import { useEffect } from 'react';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'antd';
import { useParams } from 'react-router-dom';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from '../../redux/sagas';
import reducer from '../../redux/reducer';
import { Creators } from '../../redux/actions';
import {
  getLotteryByIdSelector,
  getLotterySegmentsByIdSelector,
  updateLotterySelector,
  createLotterySegmentsSelector,
} from '../../redux/selectors';
import GeneralInfoForm from '@app/pages/Lottery/common/GeneralInfoForm';
import SegmentsForm from '@app/pages/Lottery/common/SegmentsForm';

// This is the smart component containing all forms in the /new page. Similar one will be written for /detail page.
const FormWrapper = ({ isDetail = false }) => {
  const dispatch = useDispatch();
  const lottery = useSelector(getLotteryByIdSelector.getData);
  const isUpdateLotteryPending = useSelector(updateLotterySelector.getIsPending);
  const isCreateLotterySegmentsPending = useSelector(createLotterySegmentsSelector.getIsPending);
  const isCreateLotterySegmentsError = useSelector(createLotterySegmentsSelector.getError);
  const lotterySegments = useSelector(getLotterySegmentsByIdSelector.getData);
  const { id } = useParams();

  useEffect(() => {
    Creators.initPage();

    if (id) {
      // fetching general lottery info
      dispatch(Creators.getLotteryByIdRequest({ id }));
      dispatch(Creators.getLotterySegmentsByIdRequest({ id }));
    }

    return () => {
      Creators.destroyPage();
    };
  }, [id, dispatch]);

  // GENERAL INFO FORM
  const handleGeneralInfoSubmit = body => {
    if (!id) {
      dispatch(Creators.createLotteryRequest({ body }));
    }
    else {
      body.id = id; // eslint-disable-line no-param-reassign
      dispatch(Creators.updateLotteryRequest({ body }));
    }
  };

  // SEGMENTS FORM
  const handleSegmentsSubmit = body => {
    dispatch(Creators.createLotterySegmentsRequest({ body }));
  };

  const generalInfoFormProps = {
    submitHandler: handleGeneralInfoSubmit,
    isDetail,
    lottery,
    lotterySegments,
    isUpdateLotteryPending,
  };

  const segmentsFormProps = {
    submitHandler: handleSegmentsSubmit,
    isDetail,
    lotteryId: id,
    lotterySegments,
    isCreateLotterySegmentsPending,
    isCreateLotterySegmentsError,
  };

  return (
    <Row>
      <Col xs={24} lg={21} xl={18} xxl={15}>
        <>
          <GeneralInfoForm {...generalInfoFormProps} />
          {isDetail && <SegmentsForm {...segmentsFormProps} />}
        </>
      </Col>
    </Row>
  );
};

const reduxKey = REDUX_KEY.LOTTERY.NEW;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(FormWrapper);

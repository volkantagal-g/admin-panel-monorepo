import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { compose } from 'redux';
import { Col, Form, Row, Select } from 'antd';

import { get } from 'lodash';

import { Creators } from '@shared/containers/Marketing/Select/NotifSoundTypeSelect/redux/actions';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import saga from '@shared/containers/Marketing/Select/NotifSoundTypeSelect/redux/saga';
import injectReducer from '@shared/utils/injectReducer';
import reducer from '@shared/containers/Marketing/Select/NotifSoundTypeSelect/redux/reducer';
import { getNotifSoundTypeSelector } from '@shared/containers/Marketing/Select/NotifSoundTypeSelect/redux/selectors';
import { t } from '@shared/i18n';

const NotifSoundTypeSelect = ({ fieldName, disabled, label }) => {
  const dispatch = useDispatch();
  // Set ref
  const audioRef = useRef(null);
  const notifSoundTypes = useSelector(getNotifSoundTypeSelector.getData || []);
  const isNotifSoundTypesPending = useSelector(getNotifSoundTypeSelector.getIsPending || []);

  const [activeNotifSoundCdnUrl, setActiveNotifSoundCdnUrl] = useState('');

  useEffect(() => {
    dispatch(Creators.initContainer());
    dispatch(Creators.getNotifSoundTypesRequest());

    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch]);

  const setAudioResource = selectedSoundType => {
    setActiveNotifSoundCdnUrl(get(notifSoundTypes, 'value', []).find(item => item.value === selectedSoundType)?.cdnUrl);
    audioRef?.current?.load();
    audioRef?.current?.play();
  };

  return (
    <Row gutter={24}>
      <Col lg={12}>
        <Form.Item name={fieldName} label={label} rules={[{ required: true, message: t('error:REQUIRED') }]}>
          <Select
            onChange={selectedSoundType => {
              setAudioResource(selectedSoundType);
            }}
            disabled={disabled || isNotifSoundTypesPending}
            options={notifSoundTypes?.value}
            loading={isNotifSoundTypesPending}
          />
        </Form.Item>

      </Col>
      {activeNotifSoundCdnUrl && (
        <Col lg={12}>
          <audio controls className="float-left" ref={audioRef}>
            <track kind="captions" />
            <source src={activeNotifSoundCdnUrl} type="audio/ogg" />
            <source src={activeNotifSoundCdnUrl} type="audio/wow" />
          </audio>
        </Col>
      )}

    </Row>
  );
};

const reduxKey = REDUX_KEY.MARKETING.SELECT.NOTIF_SOUND_TYPE;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(NotifSoundTypeSelect);
